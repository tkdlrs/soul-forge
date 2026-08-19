/**
 * API VERBS for 'Skills' resource
 *
 * Accessible by: 'User'
 *
 * ----------------------------------------------------------------------
 * | GET    | Index     | View all the Skill entries (for current user) |
 * | POST   | Create    | Make a new Skill (for current user)           |
 * |
 * ----------------------------------------------------------------------
 *
 **/
import z from 'zod/v4';
import {
    createSkill,
    getUsersSkills,
} from '$lib/server/repositories/skill.repository';
import { isHttpError, json } from '@sveltejs/kit';
import { getCurrentUser, requireRole } from '$lib/server/auth.js';
import {
    SkillCreateSchema,
    SkillWithIdSchema,
} from '$lib/schemas/skillSchema.js';
//
//
export async function GET({ locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        // const user = getCurrentUser(); // remove this after confirming it works.
        const skills = (await getUsersSkills(user.id)) || [];
        const checkedSkills = z.array(SkillWithIdSchema).parse(skills);
        //
        return json(checkedSkills);
    } catch (err) {
        console.log(`Error from GET method on 'skills' Index (limits to user)`);
        //
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function POST({ request, locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        //
        const body = await request.json();
        const newSkill = {
            name: body.name,
            icon: body.icon,
            userId: user.id,
        };
        const checkedSkill = SkillCreateSchema.parse(newSkill);
        //
        const skill = await createSkill(checkedSkill);
        //
        return json(skill, {
            status: 201,
        });
    } catch (err) {
        console.log('caught: ', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
// export async function DELETE({ request }) {
//     console.log('this was hit instead?');
//     return;
// }
