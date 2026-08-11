/**
 * Server Side UserRoles INDEX page
 **/
import z from 'zod/v4';
import {
    UserRolesBridgedWithIdSchema,
    UserRoleWithIdSchema,
} from '$lib/schemas/userRolesSchema.js';

//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/user-roles`);
        const result = await response.json();
        console.log('result', result);
        //
        const userRolesBridged = z
            .array(UserRolesBridgedWithIdSchema)
            .parse(result);
        //
        return {
            userRolesBridged,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
