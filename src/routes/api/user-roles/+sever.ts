/**
 * API VERBS for UserRoles resource
 **/

import { error, json } from '@sveltejs/kit';

//
export async function GET({ params, request }) {
    try {
        //
        return json();
    } catch (err) {
        throw error(404, 'Data not found');
    }
}
