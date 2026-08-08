/**
 * API VERBS for 'Skills' resource
 **/
import {
    createSkill,
    getSkills,
    getUsersSkills,
} from '$lib/server/repositories/skill.repository';
import { randomUUID } from 'crypto';
import { json } from '@sveltejs/kit';
import { getCurrentUser } from '$lib/server/auth.js';
//
//
export async function GET() {
    const user = getCurrentUser();
    //
    try {
        const skills = (await getUsersSkills(user.id)) || [];
        //
        return json(skills);
    } catch (err) {
        throw new Error(
            `Error from GET method on 'skills' Index (limits to user) ${err} `,
        );
    }
}
//
export async function POST({ request }) {
    const body = await request.json();
    //
    const skill = await createSkill({
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
