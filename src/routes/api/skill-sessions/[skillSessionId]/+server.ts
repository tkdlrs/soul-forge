import type { SkillSessionWithId } from '$lib/app/schemas/skillSessionSchema.js';
import { getSkillSession } from '$lib/server/repositories/skillSession.repository.js';
import { json } from '@sveltejs/kit';

//
export async function GET({ params, request }) {
    console.log(`params:`, params);
    console.log(`request:`, request);
    //
    const skillSession = await getSkillSession(params.skillSessionId);
    return json(skillSession);
}
// //
// export async function PUT({ params, request }) {
//     try {
//         //
//     } catch (err) {
//         //
//         throw new Error(`Error was ${err}`);
//     }
// }
