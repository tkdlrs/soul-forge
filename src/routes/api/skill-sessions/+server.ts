/**
 * API VERBS for 'Skill Sessions' resource
 **/
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { getSkillSessions } from '$lib/server/repositories/skillSession.repository';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
    let skillId = url.searchParams.get('skillId');
    //
    const conditions = [];
    if (skillId != '') {
        conditions.push(eq(skillSessionsTable.skillId, skillId));
    }
    //
    const skillSessions = await getSkillSessions(conditions);
    //
    return json(skillSessions);
}
