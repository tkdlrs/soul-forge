/**
 * Roles Repository.
 * Functions for interacting with the 'Roles' table in the database.
 **/
import { RoleSchema, type Role } from '$lib/schemas/roleSchema';
import { rolesTable, type InsertRole } from '$lib/server/db/schema/roles';
import { db } from '$lib/server/db';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
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
//
export async function getRole(id: string) {
    const result = await db
        .select()
        .from(rolesTable)
        .where(eq(rolesTable.id, id));
    //
    return result[0] ?? null;
}
//
export async function updateRole(id: string, data: Partial<Role>) {
    await db.update(rolesTable).set(data).where(eq(rolesTable.id, id));
    //
    return getRole(id);
}
//
export async function deleteRole(id: string) {
    try {
        await db.delete(rolesTable).where(eq(rolesTable.id, id)).returning();
        //
        return;
    } catch (err) {
        console.error('issue');
        throw err;
    }
}
