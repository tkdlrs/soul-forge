/**
 * API VERBS for logging out/authentication
 **/
import { handleLogout } from '$lib/server/auth.js';
//
export async function POST({ cookies }) {
    await handleLogout(cookies);
    //
    return new Response(null, {
        status: 303,
        headers: {
            Location: '/',
        },
    });
}
//
