/**
 * API VERBS for 'Users' resource
 *
 * Accessible by: 'Admin' and 'normies' when the want to create an account.
 *
 * --------------------------------------------------
 * | GET    | Index     | View all the Users        |
 * | POST   | Create    | Make a new Users          |
 * --------------------------------------------------
 **/
import { isHttpError, json } from '@sveltejs/kit';
import { getUsers, createUser } from '$lib/server/repositories/user.repository';
import { hashPassword, requireRole } from '$lib/server/auth.js';
import type { InsertUser } from '$lib/server/db/schema/users.js';
import { UserCreateSchema } from '$lib/schemas/userSchema.js';
//
export async function GET() {
    try {
        requireRole('Admin');
        //
        const users = await getUsers();
        //
        return json(users);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export type UserResponse = Omit<InsertUser, 'hashedPassword'>;
//
export async function POST({ request }) {
    try {
        //
        const body = await request.json();
        //
        if (
            !body.firstName ||
            !body.lastName ||
            !body.email ||
            !body.password
        ) {
            throw new Error('Missing required fields');
        }
        //
        const newUser = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
        };
        const checkedUser = UserCreateSchema.parse(newUser);
        //
        const hashedPassword = await hashPassword(checkedUser.password);
        console.log('hashedPassword', hashedPassword);
        //
        const user = await createUser({
            firstName: checkedUser.firstName,
            lastName: checkedUser.lastName,
            email: checkedUser.email,
            hashedPassword,
        } satisfies InsertUser);
        //
        if (!user) {
            throw new Error('Could not create user');
        }
        //
        return json(
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            } satisfies UserResponse,
            { status: 201 },
        );
    } catch (err) {
        throw new Error('something went the bad');
    }
}
//
