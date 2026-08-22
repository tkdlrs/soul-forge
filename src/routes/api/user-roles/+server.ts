/**
 * API VERBS for 'UserRoles' resource
 *
 * Accessible by: 'Admin'
 *
 * ------------------------------------------------------
 * | GET    | Index     | View all the 'UserRoles'      |
 * | POST   | Create    | Assign a user a role          |
 * -------------------------------------------------------
 *
 **/
import z from 'zod/v4';
import { isHttpError, json } from '@sveltejs/kit';
import { requireRole } from '$lib/server/auth.js';
import {
    UserRoleCreateSchema,
    UserRolesBridgedWithIdSchema,
} from '$lib/schemas/userRolesSchema.js';
import type { InsertUserRole } from '$lib/server/db/schema/user-roles.js';
import {
    createUserRole,
    getUserRolesBridged,
} from '$lib/server/repositories/userRoles.repository.js';
//
export async function GET() {
    try {
        requireRole('Admin');
        //
        const userRoles = (await getUserRolesBridged()) || [];
        const checkedUserRoles = z
            .array(UserRolesBridgedWithIdSchema)
            .parse(userRoles);
        //
        return json(checkedUserRoles);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function POST({ request }) {
    try {
        requireRole('Admin');
        //
        const body = await request.json();
        if (!body.userId || !body.roleId) {
            return json(
                {
                    message: `Missing required fields. Unable to create 'userRole'.`,
                },
                { status: 400 },
            );
        }
        //
        const newUserRole = {
            userId: body.userId,
            roleId: body.roleId,
        };
        const checkedUserRole = UserRoleCreateSchema.parse(newUserRole);
        //
        const userRole = (await createUserRole(
            checkedUserRole,
        )) satisfies InsertUserRole;
        //
        if (!userRole) {
            return json(
                { error: `Could not create 'userRole'` },
                { status: 400 },
            );
        }
        //
        return json(
            {
                id: userRole.id,
                userId: userRole.userId,
                roleId: userRole.roleId,
                createdAt: userRole.createdAt,
                updatedAt: userRole.updatedAt,
            } satisfies InsertUserRole,
            { status: 201 },
        );
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
