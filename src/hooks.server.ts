import type { Handle } from '@sveltejs/kit';
//
import {
    validateJWT,
    refreshTokens,
    setAuthCookies,
    clearAuthCookies,
} from '$lib/server/auth';
import { config } from '../src/config';
import { getUser } from '$lib/server/repositories/user.repository';
import { getSpecificUsersRoles } from '$lib/server/repositories/userRoles.repository';

//
export async function handle({
    event,
    cookies,
    resolve,
}: Parameters<Handle>[0]) {
    //
    console.log('='.repeat(100));
    console.log('='.repeat(100));
    console.log('='.repeat(100));
    console.log('handle from hooks.sever.ts ran');
    const accessToken = event.cookies.get('accessToken');
    const refreshToken = event.cookies.get('refreshToken');
    console.log('auth token is', accessToken);
    console.log('refresh token is', refreshToken);
    console.log('='.repeat(100));
    //
    event.locals.user = null;
    event.locals.user = { id: 0, email: '', roles: [] };
    // event.locals.accessToken = null;
    //
    if (accessToken) {
        console.log('authToken before trying to get bearer?', accessToken);
        try {
            const userId = validateJWT(accessToken, config.jwt.secret);
            console.log('userId (from validateJWT call)', userId);
            // get the user from their id
            const user = await getUser(Number(userId));
            if (!user) {
                throw new Error('No user found');
            }
            //
            event.locals.user.id = user.id;
            event.locals.user.email = user.email;
            //
            const userRoles = await getSpecificUsersRoles(user.id);
            event.locals.user.roles = userRoles.map((item) => item.roleName);
            console.log('event.locals.user.roles', event.locals.user.roles);
            //
        } catch (err) {
            event.locals.user = null;
            // Invalid token; leave locals unathenticated.
            throw new Error('Invalid token');
        }
    }
    //
    if (refreshToken) {
        try {
            const result = await refreshTokens(refreshToken);
            if (result) {
                setAuthCookies(cookies, result);
                event.locals.user.id = result.user.id;
                event.locals.user.email = result.user.email;
            } else {
                clearAuthCookies(event);
            }
        } catch (err) {
            throw new Error('Issue with refresh Token');
        }
    }
    //
    return resolve(event);
}
//

// ToDo:// idk need to look at this or something.
//
