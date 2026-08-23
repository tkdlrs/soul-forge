/**
 * API VERBS for 'Skill Sessions' resource
 *
 * Accessible by: 'User'
 *
 * ----------------------------------------------------------------------------------
 * | GET    | Index     | View all the Skill Sessions entries (for current user)    |
 * ----------------------------------------------------------------------------------
 *
 **/
import { requireRole } from '$lib/server/auth.js';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { getSkillSessions } from '$lib/server/repositories/skillSession.repository';
import { isHttpError, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url, locals }) {
    try {
        requireRole('User');
        // ToDo:// add a check that this skill session belongs to current user.
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        const conditions = [];
        conditions.push(eq(skillSessionsTable.userId, user.id));
        //
        let skillId = url.searchParams.get('skillId');
        if (!skillId) {
            skillId = '';
        }
        //
        if (skillId != '') {
            conditions.push(eq(skillSessionsTable.skillId, skillId));
        }
        //
        const skillSessions = await getSkillSessions(conditions);
        //
        return json(skillSessions);
    } catch (err) {
        console.log('caught:', err, 'is HttpError', isHttpError(err));
        throw err;
    }
}
