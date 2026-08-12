import type { Handle } from '@sveltejs/kit';
//
import { extractBearerToken, validateJWT } from '$lib/server/auth';
import { config } from '../src/config';
import { getUser } from '$lib/server/repositories/user.repository';
import { getSpecificUsersRoles } from '$lib/server/repositories/userRoles.repository';

//
export async function handle({ event, resolve }: Parameters<Handle>[0]) {
    //
    console.log('handle from hooks.sever.ts ran');
    const authToken = event.cookies.get('accessToken');
    console.log('auth is', authToken);
    console.log('='.repeat(100));
    //
    event.locals.user = null;
    // event.locals.accessToken = null;
    //
    if (authToken) {
        console.log('authToken before trying to get bearer?', authToken);
        try {
            const userId = validateJWT(authToken, config.jwt.secret);
            console.log('userId (from validateJWT call)', userId);
            // get the user from their id
            const user = await getUser(Number(userId));
            if (!user) {
                throw new Error('No user found');
            }
            //
            event.locals.user = { id: 0, email: '', roles: [] };
            event.locals.user.id = user.id;
            event.locals.user.email = user.email;
            //
            const userRoles = await getSpecificUsersRoles(user.id);
            event.locals.user.roles = userRoles.map((item) => item.roleName);
            console.log('event.locals.user.roles', event.locals.user.roles);
        } catch (err) {
            event.locals.user = null;
            // Invalid token; leave locals unathenticated.
            throw new Error('Invalid token');
        }
    }
    //
    return resolve(event);
}
//
//
