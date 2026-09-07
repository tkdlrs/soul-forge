import { BadRequestError, UserNotAuthenticatedError } from '$lib/errors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import crypto, { createHash } from 'crypto';
import { getRequestEvent } from '$app/server';
import { error, redirect } from '@sveltejs/kit';
//
import type { Cookies } from '@sveltejs/kit';
import {
    revokeRefreshToken,
    saveRefreshToken,
    userForRefreshToken,
} from './repositories/refresh.repository';
import type { InsertUser } from './db/schema/users';
import { getUserByEmail } from './repositories/user.repository';
import { config } from '../../config';

//
const TOKEN_ISSUER = 'soulforge';
//
export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
}
//
export async function checkPasswordHash(password: string, hash: string) {
    if (!password) return false;
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        return false;
    }
}
//
type payload = Pick<JwtPayload, 'iss' | 'sub' | 'iat' | 'exp'>;
//
export function makeJWT(
    userID: number,
    expiresIn: number,
    secret: string,
): string {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + expiresIn;
    //
    const token = jwt.sign(
        {
            iss: TOKEN_ISSUER,
            sub: String(userID),
            iat: issuedAt,
            exp: expiresAt,
        } satisfies payload,
        secret,
        { algorithm: 'HS256' },
    );
    //
    return token;
}
//
export function validateJWT(tokenString: string, secret: string): string {
    let decoded: payload;
    try {
        decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch (err) {
        throw new UserNotAuthenticatedError('Invalid token');
    }
    //
    if (decoded.iss !== TOKEN_ISSUER) {
        throw new UserNotAuthenticatedError('Invalid issuer');
    }
    //
    if (!decoded.sub) {
        throw new UserNotAuthenticatedError('No user ID in token');
    }
    //
    return decoded.sub;
}
//
export function getBearerToken() {
    const { locals } = getRequestEvent();
    //
    if (!locals.accessToken) {
        throw new UserNotAuthenticatedError('Malformed authorization header');
    }
    //
    return locals.accessToken;
}
//
export function getCurrentUser() {
    const { locals } = getRequestEvent();
    console.log('locals from calling "getCurrentUser()"', locals);
    //
    if (!locals.user) {
        throw new UserNotAuthenticatedError('Malformed authorization header');
    }
    //
    return locals.user;
}
//
export function extractBearerToken(header: string) {
    const splitAuth = header.split(' ');
    if (splitAuth.length < 2 || splitAuth[0] !== 'Bearer') {
        throw new BadRequestError('Malformed authorization header');
    }
    //
    return splitAuth[1];
}
//
export function makeToken() {
    return crypto.randomBytes(32).toString('hex');
}
//
export function requireRole(...roles: string[]) {
    const { locals } = getRequestEvent();
    //
    if (!locals.user || locals.user === null) throw error(401, 'Unauthorized');
    if (!locals.user.roles) throw error(401, 'Unauthorized');
    //
    if (!roles.every((role) => locals.user?.roles.includes(role)))
        throw error(403, 'Forbidden');
    //
    return locals.user;
}
// For password reset.
// Do NOT use for encrypting password.
// That is what Argon2 is for
export function sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}
//
type TokenWithExpiration = {
    token: string;
    expiresAt: Date;
};
//
export type RefreshResponse = UserResponse & {
    accessToken: string;
    refreshToken: TokenWithExpiration;
};
//
export type UserResponse = Omit<InsertUser, 'hashedPassword'>;
//
export type LoginResponse = UserResponse & {
    accessToken: string;
    refreshToken: TokenWithExpiration;
};
//
let refreshPromise: Promise<RefreshResponse | null> | null = null;
//
export async function handleRefresh(
    refreshToken: string,
    cookies: Cookies,
): Promise<RefreshResponse | null> {
    try {
        console.log('handle Refresh');
        if (!refreshPromise) {
            refreshPromise = refreshTokens(refreshToken, cookies);
            void clearRefreshPromiseWhenSettled(refreshPromise);
        }
        return refreshPromise;
    } catch (err) {
        console.log('caught the error in the handle refresh?');
        throw err;
    }
}
//
async function clearRefreshPromiseWhenSettled(
    promise: Promise<RefreshResponse | null>,
): Promise<void> {
    try {
        await promise;
    } catch (err) {
        console.log(`Did this err?:::`, err);
        throw err;
    } finally {
        refreshPromise = null;
    }
}
//
async function refreshTokens(
    refreshToken: string,
    cookies: Cookies,
): Promise<RefreshResponse | null> {
    console.log('refresh Tokens ');
    //
    const result = await userForRefreshToken(refreshToken);
    if (!result) {
        console.error('Invalid refresh token. Clearing cookies');
        clearAuthCookies(cookies);
        throw new Error('Invalid refresh token');
    }
    //
    const { hashedPassword, ...unhashedUser } = result.user;
    //
    const accessToken = makeJWT(
        unhashedUser.id,
        config.jwt.defaultDuration,
        config.jwt.secret,
    );
    //
    return {
        ...unhashedUser,
        accessToken,
        refreshToken: {
            token: refreshToken,
            expiresAt: result.expiresAt,
        },
    };
}
//
export async function handleLogin(
    email: string,
    password: string,
): Promise<LoginResponse> {
    // get user with email
    const user = await getUserByEmail(email);
    if (!user) {
        throw new UserNotAuthenticatedError('incorrect email');
    }
    const { hashedPassword, ...unhashedUser } = user;
    //
    const matching = await checkPasswordHash(password, hashedPassword);
    if (!matching) {
        throw new UserNotAuthenticatedError('incorrect password');
    }
    //
    const accessToken = makeJWT(
        user.id,
        config.jwt.defaultDuration,
        config.jwt.secret,
    );
    //
    const refreshToken = makeToken();
    //
    // console.log('accessToken (server/auth.ts)', accessToken);
    // console.log('refreshToken (server/auth.ts)', refreshToken);
    //
    const saved = await saveRefreshToken(user.id, refreshToken);
    if (!saved) {
        throw new UserNotAuthenticatedError('Could not save refresh token');
    }
    //
    return {
        ...unhashedUser,
        accessToken,
        refreshToken: {
            token: saved.token,
            expiresAt: saved.expiresAt,
        },
    };
}
//
export async function handleLogout(cookies: Cookies) {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
        await handleRevokeRefreshToken(refreshToken);
    }
    clearAuthCookies(cookies);
}
//
export function setAuthCookies(
    cookies: Cookies,
    result: RefreshResponse | LoginResponse,
): void {
    console.log('Set some cookies');
    // Setting cookies.
    cookies.set('accessToken', result.accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 min
    });
    // Expiration time should match what the database has
    cookies.set('refreshToken', result.refreshToken.token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        // maxAge: ,
        expires: result.refreshToken.expiresAt,
    });
}
export function clearAuthCookies(cookies: Cookies): void {
    if (cookies.get('accessToken') !== undefined) {
        cookies.delete('accessToken', { path: '/' });
    }
    if (cookies.get('refreshToken') !== undefined) {
        cookies.delete('refreshToken', { path: '/' });
    }
}
// ToDo:// figure out 'revoke' endpoint in API -So they can me manualy revoked if needed?
export async function handleRevokeRefreshToken(
    refreshToken: string,
): Promise<void> {
    try {
        await revokeRefreshToken(refreshToken);
        // send 204 status...
        return;
    } catch (err) {
        //
        console.error(err);
    }
}
//
