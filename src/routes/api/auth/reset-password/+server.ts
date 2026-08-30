/**
 * API VERBS for Resetting password/authentication
 *
 * This part sends an email to request getting to change
 * your password
 *
 **/
import { ResetPasswordSchema } from '$lib/schemas/resetPasswordSchema.js';
import { makeToken, sha256 } from '$lib/server/auth.js';
import { createResetPasswordToken } from '$lib/server/repositories/passwordReset.repository';
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
        const user = await getUserByEmail(checkedBody.email);
        // Return success always. - avoids email enumeration
        if (user) {
            const token = makeToken();
            console.log('+'.padEnd(100, '+'));
            console.log(`Is first token ${token}`);
            const tokenHash = sha256(token);
            console.log('tokenHash', tokenHash);
            console.log('+'.padEnd(100, '+'));
            //
            await createResetPasswordToken(tokenHash, user.id);
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
