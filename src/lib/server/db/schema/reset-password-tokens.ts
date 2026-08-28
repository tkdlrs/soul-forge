/**
 * Reset Password Tokens database schema
 **/
import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
/**
 *  Continue with repository for interacting with resource.
 **/
export const resetPasswordTokensTable = sqliteTable('reset_password_tokens', {
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
});
//
export type InsertResetPasswordToken =
    typeof resetPasswordTokensTable.$inferInsert;
export type SelectResetPasswordToken =
    typeof resetPasswordTokensTable.$inferSelect;
//
