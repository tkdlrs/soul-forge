/**
 * API VERBS for Roles resource
 **/
import { getRoles } from '$lib/server/repositories/roles.repository';
import { json } from '@sveltejs/kit';

//
export async function GET() {
    const roles = await getRoles();
    //
    return json(roles);
}
