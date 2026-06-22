import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import type { SkillSesssionCreate } from '$lib/app/schemas/skillSessionSchema';

// ToDo:// also add in filtering by userId -later
export async function getSkillSessions(skillId: string) {
    return db
        .select()
        .from(skillSessionsTable)
        .where(eq(skillSessionsTable.skillId, skillId));
}
//
export async function updateSkillSession(
    id: string,
    data: Partial<SkillSesssionCreate>,
) {
    //
}
//
