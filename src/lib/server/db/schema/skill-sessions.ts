import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
import { skillsTable } from './skills';
//
export const skillSessionsTable = sqliteTable('skill_sessions', {
    id: text('id').primaryKey(), // UUID
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
    skillId: text('skill_id')
        .notNull()
        .references(() => skillsTable.id),
    //
    startDateTime: integer('start_datetime', {
        mode: 'timestamp',
    }).notNull(),
    endDateTime: integer('end_datetime', {
        mode: 'timestamp',
    }),
});

export type InsertSkillSession = typeof skillSessionsTable.$inferInsert;
export type SelectSkillSession = typeof skillSessionsTable.$inferSelect;
//
