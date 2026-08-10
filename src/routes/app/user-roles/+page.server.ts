/**
 * Server Side User Roles INDEX page
 **/
import z from 'zod/v4';
import { UserRoleSchema } from '$lib/schemas/userRolesSchema.js';

//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/user-roles`);
        const result = await response.json();
        const userRoles = z.array(UserRoleSchema).parse(result);
        //
        return {
            userRoles,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
