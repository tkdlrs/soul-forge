import { json } from '@sveltejs/kit';
import {
    getUser,
    updateUser,
    deleteUser,
} from '$lib/server/repositories/user.repository';
//
//
export async function GET({ params }) {
    const id = Number(params.id);
    //
    if (Number.isNaN(id)) {
        return json({ error: 'Invalid user id' }, { status: 400 });
    }
    //
    const user = await getUser(id);
    //
    if (!user) {
        return json({ message: 'User not found' }, { status: 404 });
    }
    //
    return json(user);
}
//
export async function PUT({ params, request }) {
    const id = Number(params.id);
    //
    if (Number.isNaN(id)) {
        return json({ error: 'Invalid user id' }, { status: 404 });
    }
    const body = await request.json();
    //
    const user = await updateUser(id, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
    });
    //
    return json(user);
}
//
export async function DELETE({ params }) {
    const id = Number(params.id);
    //
    if (Number.isNaN(id)) {
        return json({ error: 'Invalid user id' }, { status: 400 });
    }
    //
    await deleteUser(id);
    //
    return new Response(null, {
        status: 204,
    });
}
//
