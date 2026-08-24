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
import z from 'zod/v4';
import {
    SkillSessionCreateSchema,
    SkillSessionSchema,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema.js';
import { requireRole } from '$lib/server/auth.js';
import {
    deleteSkillSession,
    getSkillSession,
    updateSkillSession,
} from '$lib/server/repositories/skillSession.repository.js';
import { isHttpError, json } from '@sveltejs/kit';

//
export async function GET({ params, locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        //
        const skillSessionId = params.skillSessionId;
        const checkedSkillSessionId = z.uuid().parse(skillSessionId);
        //
        let skillSession: SkillSession = {
            id: checkedSkillSessionId,
            userId: user.id,
            skillId: '',
            startDateTime: new Date(0),
            endDateTime: null,
        };
        //
        skillSession = await getSkillSession(params.skillSessionId, user.id);
        const checkedSkillSession = SkillSessionSchema.parse(skillSession);
        //
        return json(checkedSkillSession);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function PUT({ request, locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        //
        const body = await request.json();
        const bodyChecked = SkillSessionCreateSchema.parse(body);
        //
        if (bodyChecked.userId != user.id) {
            throw new Error('Incorrect user ');
        }
        //
        const skillSession = await updateSkillSession(
            bodyChecked.id,
            bodyChecked,
        );
        //
        return json(skillSession);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params, locals }) {
    try {
        // ToDo:// See this in the console at least once before removing.
        console.log('WHATS LOVE GOT TO DO GOTTA DO WITH IT?');
        //
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        //
        const skillSessionId = params.skillSessionId;
        const checkSkillSessionId = z.uuid().parse(skillSessionId);
        //
        await deleteSkillSession(checkSkillSessionId, user.id);
        //
        return new Response(null, { status: 204 });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
