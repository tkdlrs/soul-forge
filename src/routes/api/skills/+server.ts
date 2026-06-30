/**
 * API VERBS for Skills resource
 **/
import {
    createSkill,
    getSkills,
} from '$lib/server/repositories/skill.repository';
import { randomUUID } from 'crypto';
import { json } from '@sveltejs/kit';
//
//
export async function GET() {
    const skills = await getSkills();
    //
    return json(skills);
}
//
export async function POST({ request }) {
    const body = await request.json();
    //
    const skill = await createSkill({
        id: randomUUID(),
        name: body.name,
        icon: body.icon,
        userId: body.userId,
    });
    //
    return json(skill, {
        status: 201,
    });
}
//
// export async function DELETE({ request }) {
//     console.log('this was hit instead?');
//     return;
// }
