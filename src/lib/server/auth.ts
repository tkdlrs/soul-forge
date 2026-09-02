import { BadRequestError, UserNotAuthenticatedError } from '$lib/errors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import crypto, { createHash } from 'crypto';
import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
//
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { refreshTokensTable } from './db/schema/refresh-tokens';
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
    // ToDo:// the thing. Where the roles get added to this.
    // OR maybe do it where it gets the user and their roles then assigns it
    // (instead of putting roles in the JWT )
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
interface RefreshResult {
    accessToken: string;
    refreshToken: string;
    user: { id: number; email: string };
}
//
interface LoginResult {
    accessToken: string;
    refreshToken: string;
    user: { id: number; email: string };
}
//
let refreshPromise: Promise<RefreshResult | null> | null = null;
//
export async function refreshTokens(
    refreshToken: string,
): Promise<RefreshResult | null> {
    if (!refreshPromise) {
        refreshPromise = doRefresh(refreshToken);
        void clearRefreshPromiseWhenSettled(refreshPromise);
    }
    return refreshPromise;
}
//
async function clearRefreshPromiseWhenSettled(
    promise: Promise<RefreshResult | null>,
): Promise<void> {
    try {
        await promise;
    } finally {
        refreshPromise = null;
    }
}
//
async function doRefresh(refreshToken: string): Promise<RefreshResult | null> {
    const res = await fetch(`/api/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    return res.json();
}
// ToDo:// Not convinced that I need this... Do some figuring
// export async function login(
//     email: string,
//     password: string,
// ): Promise<LoginResult | null> {
//     const res = await fetch(`/api/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) return null;
//     return res.json();
// }
//
export function setAuthCookies(
    cookies: Cookies,
    result: RefreshResult | LoginResult,
): void {
    // Setting cookies.
    cookies.set('accessToken', result.accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // 'lax' // ToDo:// figure out the difference between 'lax' and 'strict'
        maxAge: 60 * 3, // 3 min // ToDo:// change to 15 min after learning. ToDo:// test this out and see it expire while you're logged in. Just to get a feel for it.
    });
    cookies.set('refreshToken', result.refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // 'lax' // ToDo:// figure out the difference between 'lax' and 'strict'
        maxAge: 60 * 60 * 24 * 30, // thirty (30) days
    });
}
export function clearAuthCookies(event: RequestEvent): void {
    event.cookies.delete('accessToken', { path: '/' });
    event.cookies.delete('refreshToken', { path: '/' });
}
//
export async function revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
    } catch (err) {
        //
        console.error(err);
    }
}
//
