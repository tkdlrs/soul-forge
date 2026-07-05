/**
 * Skill Session Repository.
 * Functions for interacting with 'Skill Sessions' in the database
 **/
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import {
    SkillSessionSchema,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema';

// ToDo:// also add in filtering by userId -later
export async function getSkillSessions(
    conditions: any[],
): Promise<SkillSession[]> {
    const query = db.select().from(skillSessionsTable);
    if (conditions.length > 0) {
        query.where(and(...conditions));
    }
    //
    const sessions = await query;
    //
    return sessions;
}
//
export async function getSkillSession(skillSessionId: string) {
    const [skillSession] = await db
        .select()
        .from(skillSessionsTable)
        .where(eq(skillSessionsTable.id, skillSessionId));
    //
    // const skillSessionData = SkillSessionSchema.parse(skillSession);
    // if (!skillSession) {
    //     throw new Error('skill session is missin');
    // }
    return skillSession;
}
//
async function createSkillSession(data: SkillSession) {
    try {
        console.log('Attempting to createSkillSession');
        //
        const newSkillSession = await db
            .insert(skillSessionsTable)
            .values({ ...data });
        return newSkillSession;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function updateSkillSession(id: string, data: SkillSession) {
    if (!id) {
        throw new Error('Nope. Need an id. ');
    }
    if (!data.id) {
        throw new Error('data needs an id');
    }
    if (!data.endDateTime) {
        data.endDateTime = null;
    }
    console.log('='.repeat(100));
    console.log(`Updated Skill Session called`);
    // look for in database
    const skillSessionData = await getSkillSession(data.id);
    console.log('skillSessionData', skillSessionData);
    // if doesn't exist we create.
    if (!skillSessionData) {
        console.log('if not skillSessionData then we call create');
        await createSkillSession(data);
    }
    // if exists to this
    else {
        await db
            .update(skillSessionsTable)
            .set(data)
            .where(eq(skillSessionsTable.id, id));
    }
    //
    console.log('='.repeat(100));
    return;
}
//
