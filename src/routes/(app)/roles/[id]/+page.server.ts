/**
 * App ServerSide 'Roles' : SHOW and EDIT
 **/
import { error } from '@sveltejs/kit';
import { RoleWithIdSchema } from '$lib/schemas/roleSchema.js';
//
export async function load({ params, fetch }) {
    try {
        const roleId = params.id;
        //
        const response = await fetch(`/api/roles/${roleId}`);
        if (!response.ok) {
            const body = await response.json();
            error(response.status, body);
        }
        const result = await response.json();
        const role = RoleWithIdSchema.parse(result);
        //
        return {
            role,
            isLoading: false,
        };
    } catch (err) {
        throw err;
    }
}
//
