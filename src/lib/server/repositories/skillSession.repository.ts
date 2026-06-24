import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import {
    SkillSessionWithIdSchema,
    type SkillSessionWithId,
} from '$lib/app/schemas/skillSessionSchema';

// ToDo:// also add in filtering by userId -later
export async function getSkillSessions(
    skillId: string,
): Promise<SkillSessionWithId[]> {
    return await db
        .select()
        .from(skillSessionsTable)
        .where(eq(skillSessionsTable.skillId, skillId));
}
//
export async function getSkillSession(skillSessionId: string) {
    const [skillSession] = await db
        .select()
        .from(skillSessionsTable)
        .where(eq(skillSessionsTable.id, skillSessionId));
    //
    // const skillSessionData = SkillSessionWithIdSchema.parse(skillSession);
    if (!skillSession) {
        throw new Error('skill session is missin');
    }
    return skillSession;
} // //
// export async function updateSkillSession(
//     id: string,
//     data: Partial<SkillSesssionCreate>,
// ) {
//     //
// }
// //
