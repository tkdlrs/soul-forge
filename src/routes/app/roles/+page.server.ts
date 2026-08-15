/**
 * APP Server Side Roles INDEX page
 **/
import z from 'zod/v4';
import { RoleWithIdSchema } from '$lib/schemas/roleSchema';
import { error } from '@sveltejs/kit';
//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/roles`);
        console.log('response', response);
        console.log('response.body', response.body);
        if (!response.ok) {
            const body = await response.json();
            error(response.status, body);
            //
        }
        const result = await response.json();
        const roles = z.array(RoleWithIdSchema).parse(result);
        //
        return {
            roles,
            isLoading: false,
        };
    } catch (err) {
        // console.log(`I caught the err. But I didn't catch no deputy. ${err}`);
        throw err;
    }
}

//
