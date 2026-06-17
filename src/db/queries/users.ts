import { eq } from 'drizzle-orm';
import { db } from '../index';
import { type InsertUser, type SelectUser, usersTable } from '../schema';
//
export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
}
//
export async function getUsers(): Promise<
    Array<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }>
> {
    return db.select().from(usersTable);
}
