import { BadRequestError, UserNotAuthenticatedError } from '$lib/errors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
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
export function makeRefreshToken() {
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
