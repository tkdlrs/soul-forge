/**
 * Roles Repository.
 * Functions for interacting with the 'Roles' table in the database.
 **/
import { RoleSchema, type Role } from '$lib/schemas/roleSchema';
import { rolesTable, type InsertRole } from '$lib/server/db/schema/roles';
import { db } from '$lib/server/db';
import { randomUUID } from 'crypto';
//
export async function getRoles() {
    return db.select().from(rolesTable);
}
//
export async function createRole(data: Role) {
    try {
        const result = RoleSchema.parse(data);
        const newRole = await db
            .insert(rolesTable)
            .values({ ...result, id: randomUUID() })
            .returning();
        return newRole[0];
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
