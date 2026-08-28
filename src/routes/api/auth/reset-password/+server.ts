/**
 * API VERBS for Resetting password/authentication
 **/
import { ResetPasswordSchema } from '$lib/schemas/resetPasswordSchema.js';
import { makeToken } from '$lib/server/auth.js';
import { createResetPasswordToken } from '$lib/server/repositories/passwordReset.repository';
import { getUserByEmail } from '$lib/server/repositories/user.repository.js';
import argon2 from 'argon2';

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
        const user = await getUserByEmail(checkedBody.email);
        // Return success always. - avoids email enumeration
        if (user) {
            const token = makeToken();
            const tokenHash = await argon2.hash(token);
            //
            await createResetPasswordToken(tokenHash, (await user).id);
            // Send email
            // ToDo:// set this up
            //  await sendResetPasswordEmail(checkedBody.email, token);
        }
        //
        return new Response(null, { status: 204 });
    } catch (err) {
        throw new Error(`Err was ${err}`);
    }
}
