/**
 *
 * Refresh Token Reposity.
 * Functions for interacting with the 'Refresh Tokens' in the database
 *
 **/
import { config } from '../../../config';
import { db } from '../db';
import { refreshTokensTable } from '../db/schema/refresh-tokens';
import { usersTable } from '../db/schema/users';
import { eq, isNull, and, gt } from 'drizzle-orm';
//
export async function saveRefreshToken(userID: number, token: string) {
    const rows = await db
        .insert(refreshTokensTable)
        .values({
            userId: userID,
            token: token,
            expiresAt: new Date(Date.now() + config.jwt.refreshDuration),
            revokedAt: null,
        })
        .returning();
    //
    return rows.length > 0;
}
//
export async function userForRefreshToken(token: string) {
    const [result] = await db
        .select({ user: usersTable })
        .from(usersTable)
        .innerJoin(
            refreshTokensTable,
            eq(usersTable.id, refreshTokensTable.userId),
        )
        .where(
            and(
                eq(refreshTokensTable.token, token),
                isNull(refreshTokensTable.revokedAt),
                gt(refreshTokensTable.expiresAt, new Date()),
            ),
        )
        .limit(1);
    //
    return result;
}
// ToDo:// set up revoke
export async function revokeRefreshToken(token: string) {
    const rows = await db
        .update(refreshTokensTable)
        .set({ revokedAt: new Date() })
        .where(eq(refreshTokensTable.token, token))
        .returning();
    //
    if (rows.length === 0) {
        throw new Error('Unable to revoke token.');
    }
}
//
