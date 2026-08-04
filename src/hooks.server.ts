import type { Handle } from '@sveltejs/kit';
//
import { extractBearerToken, validateJWT } from '$lib/server/auth';
import { config } from '../src/config';
import { getUser } from '$lib/server/repositories/user.repository';

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
            //
            event.locals.user = user;
            // event.locals.accessToken = authToken;
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
//
//
// streak... preservation...
