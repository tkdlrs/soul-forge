/**
 * API VERBS for Skill Sessions [ ID ] resource
 * Working on a specified Skill Session.
 **/
import {
    SkillSessionCreateSchema,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema.js';
import {
    getSkillSession,
    updateSkillSession,
} from '$lib/server/repositories/skillSession.repository.js';
import { json } from '@sveltejs/kit';

//
export async function GET({ params, request }) {
    // console.log(`params:`, params);
    // console.log(`request:`, request);
    //
    const skillSession = await getSkillSession(params.skillSessionId);
    return json(skillSession);
}
// ToDo:// finish this
export async function PUT({ params, request }) {
    try {
        console.log('HI PUT PUT PUT.');
        //
        const body = await request.json();
        const bodyChecked = SkillSessionCreateSchema.parse(body);
        console.log('the bodyChecked', bodyChecked);
        //
        const skillSession = await updateSkillSession(
            bodyChecked.id,
            bodyChecked,
        );
        // not sure what status code to use...
        return json(skillSession, {
            status: 200,
        });
    } catch (err) {
        //
        throw new Error(`Error was ${err}`);
    }
}
