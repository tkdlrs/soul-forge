/**
 * API VERBS for logging in/authentication
 **/
import { json } from '@sveltejs/kit';
import {
    handleLogin,
    setAuthCookies,
    type LoginResponse,
} from '$lib/server/auth.js';
//
export async function POST({ request, cookies }) {
    type Parameters = {
        password: string;
        email: string;
    };
    //
    const body: Parameters = await request.json();
    console.log('body', body);
    //
    if (!body.email || !body.password) {
        throw new Error('Missing required fields');
    }
    //
    const loginResult: LoginResponse = await handleLogin(
        body.email,
        body.password,
    );
    if (!loginResult) {
        throw new Error('Unable to get login result');
    }
    // Setting cookies.
    setAuthCookies(cookies, loginResult);
    //
    return json(loginResult, { status: 200 });
}
//
