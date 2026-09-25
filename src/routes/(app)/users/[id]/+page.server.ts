/**
 * App Serverside 'Users' : SHOW and EDIT
 **/
import {
    UserWithIdSchema,
    type UserPageData,
} from '$lib/schemas/userSchema.js';
//
export async function load({ params, fetch }): Promise<UserPageData> {
    try {
        const userId = String(params.id);
        //
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        //
        const result = await response.json();
        const checkedUser = UserWithIdSchema.parse(result);
        //
        return {
            user: checkedUser,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
