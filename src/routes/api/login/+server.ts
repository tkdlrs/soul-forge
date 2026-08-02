/**
 * API VERBS for logging in/authentication
 **/
import { json } from '@sveltejs/kit';
import { UserNotAuthenticatedError } from '$lib/errors.js';
import {
    checkPasswordHash,
    makeJWT,
    makeRefreshToken,
} from '$lib/server/auth.js';
import { saveRefreshToken } from '$lib/server/repositories/refresh.repository.js';
import { getUserByEmail } from '$lib/server/repositories/user.repository';
import { config } from '../../../config.js';
import type { UserResponse } from '../users/+server.js';
//
type LoginResponse = UserResponse & {
    token: string;
    refreshToken: string;
};
//
export async function POST({ request }) {
    type Parameters = {
        password: string;
        email: string;
    };
    //
    const body: Parameters = await request.json();
    console.log('body', body);
    console.log('body.email', body.email);
    console.log('body.password', body.password);
    //
    if (!body.email || !body.password) {
        throw new Error('Missing required fields');
    }
    // get user with email
    const user = await getUserByEmail(body.email);
    if (!user) {
        throw new UserNotAuthenticatedError('incorrect email');
    }
    //
    const matching = await checkPasswordHash(
        body.password,
        user.hashedPassword,
    );
    if (!matching) {
        throw new UserNotAuthenticatedError('incorrect password');
    }
    //
    const accessToken = makeJWT(
        user.id,
        config.jwt.defaultDuration,
        config.jwt.secret,
    );
    const refreshToken = makeRefreshToken();
    //
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    //
    const saved = await saveRefreshToken(user.id, refreshToken);
    if (!saved) {
        throw new UserNotAuthenticatedError('Could not save refresh token');
    }
    //
    return json(
        {
            id: user?.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
            token: accessToken,
            refreshToken: refreshToken,
        } satisfies LoginResponse,
        { status: 200 },
    );
}
//
