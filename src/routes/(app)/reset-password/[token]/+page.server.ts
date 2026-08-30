/**
 * APP ServerSide 'Reset Password' page: UPDATE
 **/
import { sha256 } from '$lib/server/auth.js';
import { getResetPasswordToken } from '$lib/server/repositories/passwordReset.repository.js';
import { error } from '@sveltejs/kit';
//
export async function load({ params }) {
    try {
        console.log('-'.padEnd(100, '-'));
        console.log('params.token:', params.token);
        const tokenHash = await sha256(params.token);
        console.log('tokenHash:', tokenHash);
        const record = await getResetPasswordToken(tokenHash);
        console.log('record', record);
        if (!record || record.expiresAt < new Date()) {
            error(400, 'Reset link invalid/expired.');
        }
        console.log('-'.padEnd(100, '-'));
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
