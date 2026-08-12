/**
 * User Role Repository.
 * Function for interacting with 'User Roles' in database.
 **/
import {
    UserRoleCreateSchema,
    type UserRoleCreate,
} from '$lib/schemas/userRolesSchema';
import { db } from '$lib/server/db';
import { randomUUID } from 'crypto';
import { userRolesTable } from '../db/schema/user-roles';
import { usersTable } from '../db/schema/users';
import { eq } from 'drizzle-orm';
import { rolesTable } from '../db/schema/roles';

// ToDo:// use and outer join to get the user name and role name from the other tables.
export async function getUserRoles() {
    return db.select().from(userRolesTable);
}
//
export async function getUserRolesBridged() {
    return db
        .select({
            id: userRolesTable.id,
            userId: userRolesTable.userId,
            userFirstName: usersTable.firstName,
            userLastName: usersTable.lastName,
            roleId: userRolesTable.roleId,
            roleName: rolesTable.name,
        })
        .from(userRolesTable)
        .innerJoin(usersTable, eq(userRolesTable.userId, usersTable.id))
        .innerJoin(rolesTable, eq(userRolesTable.roleId, rolesTable.id));
}
//
export async function getSpecificUsersRoles(userId: number) {
    return await db
        .select({
            roleId: userRolesTable.roleId,
            roleName: rolesTable.name,
        })
        .from(userRolesTable)
        .innerJoin(rolesTable, eq(userRolesTable.roleId, rolesTable.id))
        .where(eq(userRolesTable.userId, userId));
}
//
export async function createUserRole(data: UserRoleCreate) {
    try {
        const result = UserRoleCreateSchema.parse(data);
        const newUserRole = await db
            .insert(userRolesTable)
            .values({
                ...result,
                id: randomUUID(),
            })
            .returning();
        //
        return newUserRole[0];
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
