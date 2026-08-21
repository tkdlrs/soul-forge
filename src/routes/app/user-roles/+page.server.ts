/**
 * APP Server Side 'UserRoles' INDEX page
 **/
import z from 'zod/v4';
import { error } from '@sveltejs/kit';
import { UserRolesBridgedWithIdSchema } from '$lib/schemas/userRolesSchema.js';
//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/user-roles`);
        if (!response.ok) {
            const body = await response.json();
            error(response.status, body);
        }
        const result = await response.json();
        const userRolesBridged = z
            .array(UserRolesBridgedWithIdSchema)
            .parse(result);
        //
        return {
            userRolesBridged,
            isLoading: false,
        };
    } catch (err) {
        throw err;
    }
}
//
