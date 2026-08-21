/**
 * API VERBS for 'Users' [ ID ] resource
 * Working on a specified 'Users'
 *
 * Accessible by: 'Admin'
 *
 * --------------------------------------------------
 * | GET    | Show      | view a User               |
 * | PUT    | Edit      | change the data of a User |
 * | DELETE | Remove    | get rid of a User         |
 * --------------------------------------------------
 *
 **/
import { isHttpError, json } from '@sveltejs/kit';
import {
    getUser,
    updateUser,
    deleteUser,
} from '$lib/server/repositories/user.repository';
import { requireRole } from '$lib/server/auth.js';
import { UserEditSchema } from '$lib/schemas/userSchema.js';
//
//
export async function GET({ params }) {
    try {
        requireRole('Admin');
        //
        const id = Number(params.id);
        if (Number.isNaN(id)) {
            return json({ error: 'Invalid user id' }, { status: 400 });
        }
        //
        const user = await getUser(id);
        if (!user) {
            return json({ message: 'User not found' }, { status: 404 });
        }
        //
        return json(user);
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
//
export async function PUT({ params, request }) {
    try {
        requireRole('Admin');
        //
        const id = Number(params.id);
        if (Number.isNaN(id)) {
            return json({ error: 'Invalid user id' }, { status: 404 });
        }
        //
        const body = await request.json();
        if (!body.firstName || !body.lastName || !body.email) {
            return json(
                { message: `Missing required fields. Unable to update 'user'` },
                { status: 400 },
            );
        }
        //
        const modifiedUser = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
        };
        const checkedUser = UserEditSchema.parse(modifiedUser);
        const user = await updateUser(id, checkedUser);
        //
        return json(user);
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params }) {
    try {
        requireRole('Admin');
        //
        const id = Number(params.id);
        if (Number.isNaN(id)) {
            return json({ error: 'Invalid user id' }, { status: 400 });
        }
        //
        await deleteUser(id);
        //
        return json(null, {
            status: 204,
        });
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
//
