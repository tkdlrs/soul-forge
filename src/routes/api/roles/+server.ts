/**
 * API VERBS for Roles resource
 **/
import type { Role } from '$lib/schemas/roleSchema';
import { requireRole } from '$lib/server/auth';
import type { InsertRole } from '$lib/server/db/schema/roles.js';
import {
    createRole,
    getRoles,
} from '$lib/server/repositories/roles.repository';
import { isHttpError, json, error } from '@sveltejs/kit';
//
export async function GET() {
    try {
        requireRole('Admin');
        //
        const roles = await getRoles();
        //
        return json(roles);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
        // if (isHttpError(err)) throw err;
        // console.error(err);
        // error(500, 'Something went wrong');
    }
    //
}
//
export async function POST({ request }) {
    const body = await request.json();
    //
    if (!body.name && typeof body.name !== 'string') {
        throw new Error('Missing required fields');
    }
    //
    const role = await createRole({
        name: body.name,
    } satisfies Role);
    if (!role) {
        throw new Error('Could not create role');
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
}
