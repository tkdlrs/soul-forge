/**
 * Reset Password  Repository.
 * Function for interacting with 'Reset Password Tokens' in database.
 *
 **/
import { db } from '../db';
import { resetPasswordTokensTable } from '../db/schema/reset-password-tokens';
import { eq } from 'drizzle-orm';
//
export async function createResetPasswordToken(
    tokenHash: string,
    userId: number,
) {
    try {
        await db.insert(resetPasswordTokensTable).values({
            token: tokenHash,
            userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 min
        });
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function deleteResetPasswordToken(userId: number) {
    try {
        await db
            .delete(resetPasswordTokensTable)
            .where(eq(resetPasswordTokensTable.userId, userId))
            .returning();
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function getResetPasswordToken(tokenHash: string) {
    try {
        const [result] = await db
            .select()
            .from(resetPasswordTokensTable)
            .where(eq(resetPasswordTokensTable.token, tokenHash))
            .limit(1);
        //
        return result;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
