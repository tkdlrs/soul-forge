/**
 * API VERBS for Resetting password/authentication
 **/

import { UserNotAuthenticatedError } from '$lib/errors.js';
import { ResetPasswordSchema } from '$lib/schemas/resetPasswordSchema.js';
import { getUserByEmail } from '$lib/server/repositories/user.repository.js';

//
export async function POST({ request }) {
    try {
        //
        const body = await request.json();
        if (!body.email) {
            throw new Error('Missing required fields');
        }
        const checkedBody = ResetPasswordSchema.parse(body);
        //
        const user = getUserByEmail(checkedBody.email);
        if (!user) {
            throw new UserNotAuthenticatedError('incorrect email');
        }
        //
        return;
    } catch (err) {
        throw new Error(`Err was ${err}`);
    }
}
