/**
 * API VERBS for 'Skill Sessions' [ ID ] resource
 * Working on a specified Skill Sessions.
 *
 * Accessible by: 'User'
 *
 * --------------------------------------------------------------
 * | GET    | Show      | View a Skill Session                  |
 * | PUT    | Edit      | change the data of a Skill session    |
 * | DELETE | Remove    | kill a skill session.                 |
 * --------------------------------------------------------------
 *
 **/
import { SkillSessionCreateSchema } from '$lib/schemas/skillSessionSchema.js';
import { requireRole } from '$lib/server/auth.js';
import {
    deleteSkillSession,
    getSkillSession,
    updateSkillSession,
} from '$lib/server/repositories/skillSession.repository.js';
import { isHttpError, json } from '@sveltejs/kit';
import z from 'zod';

//
export async function GET({ params, locals }) {
    try {
        requireRole('User');
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
export async function PUT({ request, locals }) {
    try {
        requireRole('User');
        // ToDo:// add a check that this skill session belongs to current user.
        //
        const body = await request.json();
        const bodyChecked = SkillSessionCreateSchema.parse(body);
        //
        const skillSession = await updateSkillSession(
            bodyChecked.id,
            bodyChecked,
        );
        // not sure what status code to use...
        return json(skillSession);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params, locals }) {
    try {
        //
        console.log('WHATS LOVE GOT TO DO GOTTA DO WITH IT?');
        //
        requireRole('User');
        // ToDo:// add a check that this skill session belongs to current user.
        //
        const skillSessionId = params.skillSessionId;
        const checkSkillSessionId = z.uuid().parse(skillSessionId);
        //
        await deleteSkillSession(checkSkillSessionId);
        //
        return new Response(null, { status: 204 });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
