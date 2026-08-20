/**
 * API VERBS for 'Roles' [ ID ] resource
 * Working on a specified Role.
 *
 * Accessible by: 'Admin'
 *
 * --------------------------------------------------
 * | GET    | Show      | view a Role               |
 * | PUT    | Edit      | change the data in a Role |
 * | DELETE | Remove    | kill a role.              |
 * --------------------------------------------------
 *
 **/
import z from 'zod/v4';
import {
    RoleSchema,
    RoleWithIdSchema,
    type RoleWithId,
} from '$lib/schemas/roleSchema.js';
import {
    deleteRole,
    getRole,
    updateRole,
} from '$lib/server/repositories/roles.repository';
import { error, isHttpError, json } from '@sveltejs/kit';
import { requireRole } from '$lib/server/auth.js';
//
export async function GET({ params }) {
    try {
        requireRole('Admin');
        //
        let roleData: RoleWithId = {
            id: '',
            name: '',
        };
        //
        const roleId = params.roleId;
        const checkedRoleId = z.uuid().parse(roleId);
        //
        roleData = await getRole(checkedRoleId);
        //
        const checkedRoleData = RoleWithIdSchema.parse(roleData);
        //
        return json(checkedRoleData, {
            status: 200,
        });
    } catch (err) {
        console.log('caught: ', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
// Allow user to Edit/ Update the role name.
// ToDo:// fix Authorization
export async function PUT({ params, request }) {
    try {
        requireRole('Admin');
        //
        const body = await request.json();
        const role = { name: body.name };
        //
        const roleId = params.roleId;
        const checkedRoleId = z.uuid().parse(roleId);
        //
        const checkedUpdatedRole = RoleSchema.parse(role);
        //
        await updateRole(checkedRoleId, checkedUpdatedRole);
        //
        return new Response(null, {
            status: 204,
        });
    } catch (err) {
        console.log('caught: ', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params }) {
    try {
        requireRole('Admin');
        //
        const roleId = params.roleId;
        //
        await deleteRole(roleId);
        //
        return new Response(null, {
            status: 204,
        });
    } catch (err) {
        console.log('caught: ', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
