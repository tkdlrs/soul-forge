/**
 * APP Server Side 'Users' INDEX page
 **/
import z from 'zod/v4';
import { error } from '@sveltejs/kit';
import { UserWithIdSchema } from '$lib/schemas/userSchema';
//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/users`);
        if (!response.ok) {
            const body = await response.json();
            error(response.status, body);
        }
        const result = await response.json();
        const users = z.array(UserWithIdSchema).parse(result);
        //
        return {
            users,
            isLoading: false,
        };
    } catch (err) {
        throw err;
    }
}
//
