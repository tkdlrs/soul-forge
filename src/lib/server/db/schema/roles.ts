/**
 * Roles database schema
 **/
import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

//
export const rolesTable = sqliteTable('roles', {
    id: text('id').primaryKey(),
    //
    name: text('name').notNull().unique(),
    //
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
        () => new Date(),
    ),
    //
});
//
export type InsertRole = typeof rolesTable.$inferInsert;
export type SelectRole = typeof rolesTable.$inferSelect;
//
