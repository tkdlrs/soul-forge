/**
 * Server Side Users INDEX page
 **/
import z from 'zod/v4';
import { UserWithIdSchema } from '$lib/schemas/userSchema';

//
export async function load({ fetch }) {
    try {
        const response = await fetch(`/api/users`);
        const result = await response.json();
        const users = z.array(UserWithIdSchema).parse(result);
        //
        return {
            users,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
