/**
 * Skills database schema
 **/
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

//
export const skillsTable = sqliteTable('skills', {
    id: text('id').primaryKey(), // Random UUID
    //
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id),
    //
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    //
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
        () => new Date(),
    ),
    //
});

export type InsertSkill = typeof skillsTable.$inferInsert;
export type SelectSkill = typeof skillsTable.$inferSelect;
//
