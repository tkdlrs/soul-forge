/**
 * API VERBS for 'UserRole' [ ID ] resource
 * Working on a specified 'UserRole'
 *
 * Accessible by: 'Admin'
 *
 * --------------------------------------------------
 * | DELETE | Remove | get rid of a user role.
 * --------------------------------------------------
 *
 **/
import { requireRole } from '$lib/server/auth';
import { isHttpError, json } from '@sveltejs/kit';

// ToDo://
export async function DELETE({ params }) {
    try {
        requireRole('Admin');
        //
        // ToDo:// Add logics here
        //
        return json(null, { status: 204 });
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
