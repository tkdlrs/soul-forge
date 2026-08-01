import { config } from '../../../config';
import { db } from '../db';
import { refreshTokensTable } from '../db/schema/refresh-tokens';

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
