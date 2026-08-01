import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
//
export const refreshTokensTable = sqliteTable('refresh_tokens', {
    token: text('token', { length: 256 }).primaryKey().notNull(),
    //
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
        () => new Date(),
    ),
    //
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id),
    //
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    revokedAt: integer('revoked_at', { mode: 'timestamp' }),
});
//
export type InsertRefreshToken = typeof refreshTokensTable.$inferInsert;
export type SelectRefreshToken = typeof refreshTokensTable.$inferSelect;
//
