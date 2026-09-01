/**
 * APP ServerSide 'Reset Password' page: UPDATE
 **/
import { sha256 } from '$lib/server/auth.js';
import { getResetPasswordToken } from '$lib/server/repositories/passwordReset.repository.js';
import { error } from '@sveltejs/kit';
//
export async function load({ params }) {
    try {
        const tokenHash = await sha256(params.token);
        const record = await getResetPasswordToken(tokenHash);
        if (!record || record.expiresAt < new Date()) {
            error(400, 'Reset link invalid/expired.');
        }
        //
        return {
            updatePassword: {
                password: '',
                confirmPassword: '',
                userId: record.userId,
            },
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
