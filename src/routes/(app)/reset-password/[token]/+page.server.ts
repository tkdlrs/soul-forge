/**
 * APP ServerSide 'Reset Password' page: UPDATE
 **/
import { getResetPasswordToken } from '$lib/server/repositories/passwordReset.repository.js';
import argon2 from 'argon2';
import { error } from 'console';
//
export async function load({ params }) {
    try {
        console.log('params.token:', params.token);
        const tokenHash = await argon2.hash(params.token);
        console.log('tokenHash:', tokenHash);
        const record = await getResetPasswordToken(tokenHash);
        console.log('record', record);
        if (!record || record.expiresAt < new Date()) {
            error(400, 'Reset link invalid/expired.');
        }
        //
        return {
            resetPassword: {
                password: '',
                confirmPassword: '',
            },
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
