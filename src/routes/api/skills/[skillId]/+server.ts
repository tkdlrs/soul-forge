/**
 * API VERBS for 'Skills' [ ID ] resource
 * Working on a specified 'Skills'
 *
 * Accessible by: 'User'
 *
 * ---------------------------------------------------
 * | GET    | Show      | view a Skill               |
 * | PUT    | Edit      | change the data of a Skill |
 * | DELETE | Remove    | kill a skill.              |
 * ---------------------------------------------------
 **/
import z from 'zod/v4';
import {
    SkillEditSchema,
    SkillWithIdSchema,
    type SkillWithId,
} from '$lib/schemas/skillSchema.js';
import {
    deleteSkill,
    getSkill,
    getSkillByName,
    updateSkill,
} from '$lib/server/repositories/skill.repository';
import { isHttpError, json } from '@sveltejs/kit';
import { requireRole } from '$lib/server/auth.js';

// Get all the sessions for a single skill that belongs to a single user
export async function GET({ params, locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error('User not found');
        }
        //
        let skillData: SkillWithId = {
            id: '',
            userId: 0,
            name: '',
            icon: '',
        };
        //
        const skillId = params.skillId;
        const typeTest = z.uuid().safeParse(skillId);
        //
        if (typeTest.success) {
            skillData = await getSkill(skillId, user.id);
        } else {
            skillData = await getSkillByName(skillId, user.id);
        }
        //
        const checkedSkillData = SkillWithIdSchema.parse(skillData);
        //
        return json(checkedSkillData);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
// Allow user to Edit/ Update the skill name and icon.
export async function PUT({ params, request }) {
    try {
        requireRole('User');
        //
        const body = await request.json();
        const modifiedSkill = { name: body.name, icon: body.icon };
        const checkedSkill = SkillEditSchema.parse(modifiedSkill);
        //
        const skillId = params.skillId;
        const checkedSkillId = z.uuid().parse(skillId);
        const skill = await updateSkill(checkedSkillId, checkedSkill);
        //
        return json(skill);
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params, locals }) {
    try {
        requireRole('User');
        //
        const user = locals.user;
        if (!user) {
            throw new Error(`User not found`);
        }
        //
        const skillId = params.skillId;
        const checkedSkillId = z.uuid().parse(skillId);
        //
        await deleteSkill(checkedSkillId, user.id);
        //
        return new Response(null, { status: 204 });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
