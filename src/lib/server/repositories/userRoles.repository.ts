/**
 * User Role Repository.
 * Function for interacting with 'User Roles' in database.
 **/
import { db } from '$lib/server/db';
import { userRolesTable } from '../db/schema/user-roles';

//
export async function getUserRoles() {
    return db.select().from(userRolesTable);
}
