import type { Handle } from '@sveltejs/kit';
//
import { extractBearerToken, validateJWT } from '$lib/server/auth';
import { config } from '../src/config';
import { getUser } from '$lib/server/repositories/user.repository';

//
export async function handle({ event, resolve }: Parameters<Handle>[0]) {
    //
    console.log('handle from hooks.sever.ts ran');
    const auth = event.request.headers.get('Authorization');
    console.log('auth is', auth);
    console.log('='.repeat(100));
    //
    event.locals.user = null;
    event.locals.accessToken = null;
    //
    if (auth?.startsWith('Bearer ')) {
        const token = extractBearerToken(auth);
        try {
            const userId = validateJWT(token, config.jwt.secret);
            console.log('userId (from validateJWT call)', userId);
            // get the user from their id
            const user = await getUser(Number(userId));
            //
            event.locals.user = user;
            event.locals.accessToken = token;
        } catch (err) {
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
