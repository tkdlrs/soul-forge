/**
 * API VERBS for Skills [ ID ] resource
 * Working on a specified Skill
 **/
import { updateSkill } from '$lib/server/repositories/skill.repository';
import { getSkillSessions } from '$lib/server/repositories/skillSession.repository';
import { json } from '@sveltejs/kit';

// Get all the sessions for a single skill that belongs to a single user
export async function GET({ params, request }) {
    console.log('params:', params);
    console.log('request:', request);
    const something = await getSkillSessions(params.skillId);
    //
    const thing = json(something);
    console.log('thing', thing);
    return thing;
}
//
// Allow user to Edit/ Update the skill name and icon.
// export async function PUT({ params, request }) {
//     //
//     const body = await request.json();
//     //
//     const skill = await updateSkill(id, {
//         name: body.name,
//         icon: body.icon,
//     });
// }
