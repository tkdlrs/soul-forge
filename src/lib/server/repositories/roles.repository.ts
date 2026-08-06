/**
 * Roles Repository.
 * Functions for interacting with the 'Roles' table in the database.
 **/
import { db } from '$lib/server/db';
import { rolesTable } from '$lib/server/db/schema/roles';
//
export async function getRoles() {
    return db.select().from(rolesTable);
}
