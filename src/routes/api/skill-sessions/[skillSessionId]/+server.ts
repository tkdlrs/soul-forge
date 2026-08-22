/**
 * API VERBS for 'Skill Sessions' [ ID ] resource
 * Working on a specified Skill Sessions.
 *
 * Accessible by: 'User'
 *
 * --------------------------------------------------------------
 * | GET    | Show      | View a Skill Session                  |
 * | PUT    | Edit      | change the data of a Skill session    |
 * --------------------------------------------------------------
 *
 **/
import { SkillSessionCreateSchema } from '$lib/schemas/skillSessionSchema.js';
import { requireRole } from '$lib/server/auth.js';
import {
    getSkillSession,
    updateSkillSession,
} from '$lib/server/repositories/skillSession.repository.js';
import { isHttpError, json } from '@sveltejs/kit';

// ToDo:// Test out the authorization manually
export async function GET({ params, locals }) {
    try {
        // requireRole('User');
        // ToDo:// add a check that this skill session belongs to current user.
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        // ToDo:// ZOD CHECK
        //
        const skillSession = await getSkillSession(
            params.skillSessionId,
            user.id,
        );
        //
        return json(skillSession);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function PUT({ request }) {
    try {
        // requireRole('User');
        // ToDo:// add a check that this skill session belongs to current user.
        //
        const body = await request.json();
        const bodyChecked = SkillSessionCreateSchema.parse(body);
        //
        // ToDo:// ZOD CHECK
        const skillSession = await updateSkillSession(
            bodyChecked.id,
            bodyChecked,
        );
        // not sure what status code to use...
        return json(skillSession, {
            status: 200,
        });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw new Error(`Error was ${err}`);
    }
}
//
