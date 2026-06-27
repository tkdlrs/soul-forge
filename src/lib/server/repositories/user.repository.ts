/**
 * User Repository.
 * Functions for interacting with 'Users' in database.
 **/
import { UserSchema, type UserCreateData } from '$lib/schemas/userSchema';
import { db } from '$lib/server/db';
import { usersTable, type InsertUser } from '$lib/server/db/schema/users';
import { eq } from 'drizzle-orm';

//
export async function getUsers() {
    return db.select().from(usersTable);
}
//
export async function createUser(data: InsertUser) {
    try {
        const result = UserSchema.parse(data);
        const newUser = await db.insert(usersTable).values(result);
        return newUser;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function getUser(id: number) {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));
    //
    return result[0] ?? null;
}
//
export async function updateUser(id: number, data: Partial<UserCreateData>) {
    await db.update(usersTable).set(data).where(eq(usersTable.id, id));

    return getUser(id);
}
//
export async function deleteUser(id: number) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
}
//
