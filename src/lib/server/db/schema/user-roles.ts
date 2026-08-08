/**
 * User_Roles database schema
 **/
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { usersTable } from './users';
import { rolesTable } from './roles';

//
export const userRolesTable = sqliteTable('user_roles', {
    id: text('id').primaryKey(),
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
        .references(() => usersTable.id, {
            onDelete: 'cascade',
        }),
    roleId: text('role_id')
        .notNull()
        .references(() => rolesTable.id, {
            onDelete: 'cascade',
        }),
    //
});
//
export type InsertUserRole = typeof userRolesTable.$inferInsert;
export type SelectUserRole = typeof userRolesTable.$inferSelect;
