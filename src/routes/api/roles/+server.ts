/**
 * API VERBS for 'Roles' resource
 *
 * Accessible by: 'Admin'
 *
 * --------------------------------------------------
 * | GET    | Index     | View all the Role entries |
 * | POST   | Create    | Make a new Role entrie    |
 * --------------------------------------------------
 *
 **/
import z from 'zod/v4';
import { RoleWithIdSchema, type Role } from '$lib/schemas/roleSchema';
import { requireRole } from '$lib/server/auth';
import type { InsertRole } from '$lib/server/db/schema/roles.js';
import {
    createRole,
    getRoles,
} from '$lib/server/repositories/roles.repository';
import { isHttpError, json } from '@sveltejs/kit';
//
export async function GET() {
    try {
        requireRole('Admin');
        //
        const roles = (await getRoles()) || [];
        const checkedRolesData = z.array(RoleWithIdSchema).parse(roles);
        //
        return json(checkedRolesData);
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
        //
        if (!body.name && typeof body.name !== 'string') {
            return json(
                {
                    message: `Missing required fields. Unable to create 'Role'.`,
                },
                { status: 400 },
            );
        }
        //
        const role = await createRole({
            name: body.name,
        } satisfies Role);
        if (!role) {
            return json(
                { message: `Could not create 'Role'.` },
                { status: 400 },
            );
        }
        //
        return json(
            {
                id: role.id,
                name: role.name,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
            } satisfies InsertRole,
            { status: 201 },
        );
    } catch (err) {
        console.log('caught: ', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
