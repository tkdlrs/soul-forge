import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

//
export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    email: text('email').unique().notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),

    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
        () => new Date(),
    ),
    // hashedPassword: text('hashed_password', { length: 256 })
    //     .notNull()
    //     .default('unset'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

//
