/**
 * Server Side Roles INDEX page
 **/
import z from 'zod/v4';
import { RoleWithIdSchema } from '$lib/schemas/roleSchema';
//
export async function load({ fetch }) {
    try {
        const repsonse = await fetch(`/api/roles`);
        const result = await repsonse.json();
        const roles = z.array(RoleWithIdSchema).parse(result);
        //
        return {
            roles,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
