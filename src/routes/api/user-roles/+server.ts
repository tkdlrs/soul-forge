/**
 * API VERBS for UserRoles resource
 **/
import { getUserRoles } from '$lib/server/repositories/userRoles.repository.js';
import { error, json } from '@sveltejs/kit';

//
export async function GET({ params, request }) {
    try {
        const userRoles = (await getUserRoles()) || [];
        //
        return json(userRoles);
    } catch (err) {
        throw error(404, 'Data not found');
    }
}
