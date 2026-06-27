/**
 * API VERBS for Users resource
 **/
import { json } from '@sveltejs/kit';
import { getUsers, createUser } from '$lib/server/repositories/user.repository';

export async function GET() {
    const users = await getUsers();
    //
    return json(users);
}
//
export async function POST({ request }) {
    const body = await request.json();
    //
    const user = await createUser({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
    });
    //
    return json(user, { status: 201 });
}
//
