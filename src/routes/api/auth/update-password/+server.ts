import { UpdatePasswordSchema } from '$lib/schemas/updatePasswordSchema.js';
import { hashPassword } from '$lib/server/auth.js';
import { deleteResetPasswordToken } from '$lib/server/repositories/passwordReset.repository.js';
import {
    updateUser,
    updateUserPassword,
} from '$lib/server/repositories/user.repository';

/**
 * API VERBS for Updating a password/authentication
 *
 * This part happens after confirming a Reset request
 *
 **/
export async function POST({ request }) {
    try {
        //
        const body = await request.json();
        if (!body.password || !body.confirmPassword || !body.userId) {
            throw new Error('Missing required fields');
        }
        const checkedBody = UpdatePasswordSchema.parse(body);
        // ToDo:// update password
        const hashedNewPassword = await hashPassword(checkedBody.password);
        await updateUserPassword(checkedBody.userId, hashedNewPassword);
        // cleanup reset password tokens
        await deleteResetPasswordToken(checkedBody.userId);
        // ToDo:// Also find way to invalidate all other 'sessions'
        // ToDo:// check this... Or at least re-look at it.
        return new Response(null, { status: 204 });
    } catch (err) {
        throw new Error(`Err was ${err}`);
    }
}
