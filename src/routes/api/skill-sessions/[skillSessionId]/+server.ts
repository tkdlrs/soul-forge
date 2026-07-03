/**
 * API VERBS for Skill Sessions [ ID ] resource
 * Working on a specified Skill Session.
 **/
import type { SkillSession } from '$lib/schemas/skillSessionSchema.js';
import {
    getSkillSession,
    updateSkillSession,
} from '$lib/server/repositories/skillSession.repository.js';
import { json } from '@sveltejs/kit';

//
export async function GET({ params, request }) {
    console.log(`params:`, params);
    console.log(`request:`, request);
    //
    const skillSession = await getSkillSession(params.skillSessionId);
    return json(skillSession);
}
// ToDo:// finish this
export async function PUT({ params, request }) {
    try {
        //
        const body = await request.json();
        //
        const skillSession = await updateSkillSession(body.id, body);
        //
        return json(skillSession, {
            status: 201,
        });
    } catch (err) {
        //
        throw new Error(`Error was ${err}`);
    }
}
