/**
 * API VERBS for UserRoles resource
 **/
import type { InsertUserRole } from '$lib/server/db/schema/user-roles.js';
import {
    createUserRole,
    getUserRolesBridged,
} from '$lib/server/repositories/userRoles.repository.js';
import { error, json } from '@sveltejs/kit';
//
export async function GET({ params, request }) {
    try {
        const userRoles = (await getUserRolesBridged()) || [];
        //
        return json(userRoles);
    } catch (err) {
        throw error(404, 'Data not found');
    }
}
//
export async function POST({ request }) {
    const body = await request.json();
    //
    if (!body.userId || !body.roleId) {
        throw new Error('Missing reuqired fields');
    }
    //
    const userRole = (await createUserRole({
        userId: body.userId,
        roleId: body.roleId,
    })) satisfies InsertUserRole;
    //
    if (!userRole) {
        throw new Error(`Could not create userRole`);
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
}
