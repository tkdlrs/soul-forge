/**
 * API VERBS for Users resource
 **/
import { json } from '@sveltejs/kit';
import { getUsers, createUser } from '$lib/server/repositories/user.repository';
import { hashPassword } from '$lib/server/auth.js';
import type { InsertUser } from '$lib/server/db/schema/users.js';

export async function GET() {
    const users = await getUsers();
    //
    return json(users);
}
//
export type UserResponse = Omit<InsertUser, 'hashedPassword'>;
//
export async function POST({ request }) {
    try {
        const body = await request.json();
        console.log('body', body);
        console.log('body.firstName', body.firstName);
        console.log('body.lastName', body.lastName);
        console.log('body.email', body.email);
        console.log('body.password', body.password);
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
        const hashedPassword = await hashPassword(body.password);
        console.log('hashedPassword', hashedPassword);
        //
        const user = await createUser({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
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
