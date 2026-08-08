/**
 * Tasks database schema
 **/
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
//
export const task = sqliteTable('task', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    priority: integer('priority').notNull().default(1),
    //
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
        () => new Date(),
    ),
});
//
