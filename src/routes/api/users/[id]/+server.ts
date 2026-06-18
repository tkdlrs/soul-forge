import { json } from '@sveltejs/kit';
import {
    getUser,
    updateUser,
    deleteUser,
} from '$lib/server/repositories/user.repository';

export async function GET({ params }) {
    const user = await getUser(params.id);

    const id = Number(params.id);

    if (Number.isNaN(id)) {
        return json({ error: 'Invalid user id' }, { status: 400 });
    }

    if (!user) {
        return json({ message: 'User not found' }, { status: 404 });
    }

    return json(user);
}

export async function PUT({ params, request }) {
    const body = await request.json();

    const user = await updateUser(params.id, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
    });

    return json(user);
}

export async function DELETE({ params }) {
    await deleteUser(params.id);

    return new Response(null, {
        status: 204,
    });
}
