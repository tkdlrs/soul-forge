import { db } from '$lib/server/db';
import { usersTable, type InsertUser } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
//
export async function getUsers() {
    return db.select().from(usersTable);
}
//
export async function createUser(data: InsertUser) {
    const user = {
        ...data,
    };
    const newUser = await db.insert(usersTable).values(user);
    return newUser;
}
//
export async function getUser(id: number) {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

    return result[0] ?? null;
}
//
export async function updateUser(
    id: number,
    data: Partial<{
        firstName: string;
        lastName: string;
        email: string;
    }>,
) {
    await db.update(usersTable).set(data).where(eq(usersTable.id, id));

    return getUser(id);
}

export async function deleteUser(id: number) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
}
