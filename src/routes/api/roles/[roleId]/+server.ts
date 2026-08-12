/**
 * API VERBS for Roles [ ID ] resource
 * Working on a specified Role
 **/
import z from 'zod/v4';
import { RoleSchema, type RoleWithId } from '$lib/schemas/roleSchema.js';
import { getRole, updateRole } from '$lib/server/repositories/roles.repository';
import { error, json } from '@sveltejs/kit';
import { requireRole } from '$lib/server/auth.js';
//
export async function GET({ params, request }) {
    //
    requireRole('Admin');
    //
    try {
        //
        let roleData: RoleWithId = {
            id: '',
            name: '',
        };
        //
        const roleId = params.roleId;
        roleData = await getRole(roleId);
        //
        return json(roleData);
    } catch (err) {
        throw error(404, 'Data not found');
    }
}
//
// Allow user to Edit/ Update the role name.
export async function PUT({ params, request }) {
    try {
        //
        const body = await request.json();
        const role = { name: body.name };
        RoleSchema.parse(role);
        //
        const roleId = params.roleId;
        z.uuid().parse(roleId);
        //
        await updateRole(roleId, role);
        //
        return json(null, {
            status: 204,
        });
        //
    } catch (err) {
        throw error(404, `Error was ${err} `);
    }
}
//
