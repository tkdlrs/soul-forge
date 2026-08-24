/**
 * Skill Session Repository.
 * Functions for interacting with 'Skill Sessions' in the database
 **/
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { type SkillSession } from '$lib/schemas/skillSessionSchema';

//
export async function getSkillSessions(
    conditions: any[],
): Promise<SkillSession[]> {
    try {
        const query = db.select().from(skillSessionsTable);
        if (conditions.length > 0) {
            query.where(and(...conditions));
        }
        //
        const sessions = await query;
        //
        return sessions;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function getSkillSession(skillSessionId: string, userId: number) {
    try {
        const [skillSession] = await db
            .select()
            .from(skillSessionsTable)
            .where(
                and(
                    eq(skillSessionsTable.id, skillSessionId),
                    eq(skillSessionsTable.userId, userId),
                ),
            );
        //
        return skillSession;
    } catch (err) {
        throw new Error(`Error ${err}`);
    }
}
//
async function createSkillSession(data: SkillSession) {
    try {
        const newSkillSession = await db
            .insert(skillSessionsTable)
            .values({ ...data });
        //
        return newSkillSession;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function updateSkillSession(id: string, data: SkillSession) {
    try {
        if (!id) {
            throw new Error('Nope. Need an id.');
        }
        if (!data.id) {
            throw new Error('data needs an id.');
        }
        if (!data.endDateTime) {
            data.endDateTime = null;
        }
        // look for in database
        const skillSessionData = await getSkillSession(data.id, data.userId);
        // if doesn't exist we create.
        if (!skillSessionData) {
            await createSkillSession(data);
        }
        // if exists do this
        else {
            await db
                .update(skillSessionsTable)
                .set(data)
                .where(
                    and(
                        eq(skillSessionsTable.id, id),
                        eq(skillSessionsTable.userId, data.userId),
                    ),
                );
        }
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function deleteSkillSession(id: string, userId: number) {
    try {
        await db
            .delete(skillSessionsTable)
            .where(
                and(
                    eq(skillSessionsTable.id, id),
                    eq(skillSessionsTable.userId, userId),
                ),
            )
            .returning();
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
