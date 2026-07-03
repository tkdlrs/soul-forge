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
    if (!skillSession) {
        throw new Error('skill session is missin');
    }
    return skillSession;
}
//
export async function updateSkillSession(
    id: string,
    data: Partial<SkillSession>,
) {
    //
    await db
        .update(skillSessionsTable)
        .set(data)
        .where(eq(skillSessionsTable.id, id));
    //
    return;
}
//
