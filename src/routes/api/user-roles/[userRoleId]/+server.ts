/**
 * API VERBS for 'UserRoles' [ ID ] resource
 * Working on a specified 'UserRoles'
 *
 * Accessible by: 'Admin'
 *
 * --------------------------------------------------
 * | DELETE | Remove | get rid of a user role.
 * --------------------------------------------------
 *
 **/
import z from 'zod/v4';
import { requireRole } from '$lib/server/auth';
import { deleteUserRole } from '$lib/server/repositories/userRoles.repository.js';
import { isHttpError } from '@sveltejs/kit';

//
export async function DELETE({ params }) {
    try {
        requireRole('Admin');
        //
        const userRoleId = params.userRoleId;
        const checkedUserRoleId = z.uuid().parse(userRoleId);
        //
        await deleteUserRole(checkedUserRoleId);
        //
        return new Response(null, { status: 204 });
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
