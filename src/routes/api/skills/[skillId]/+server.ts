/**
 * API VERBS for 'Skills' [ ID ] resource
 * Working on a specified Skills
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
import { error, isHttpError, json } from '@sveltejs/kit';
import { requireRole } from '$lib/server/auth.js';

// ToDo:// Add Authorization and test it manually
// Get all the sessions for a single skill that belongs to a single user
export async function GET({ params }) {
    try {
        // requireRole('User');
        // ToDo:// add a check that this skill belongs to current user.
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
            skillData = await getSkill(skillId);
        } else {
            skillData = await getSkillByName(skillId);
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
//
// Allow user to Edit/ Update the skill name and icon.
export async function PUT({ params, request }) {
    try {
        // requireRole('User');
        //
        const body = await request.json();
        const skill = { name: body.name, icon: body.icon };
        //
        const skillId = params.skillId;
        const checkedSkillId = z.uuid().parse(skillId);
        //
        const checkedSkill = SkillEditSchema.parse(skill);
        //
        await updateSkill(checkedSkillId, checkedSkill);
        //
        return json(null, {
            status: 204,
        });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
//
export async function DELETE({ params }) {
    try {
        // requireRole('User');
        //
        const skillId = params.skillId;
        //
        console.log(`Delete things skill id be ${skillId}`);
        const checkedSkillId = z.uuid().parse(skillId);
        //
        await deleteSkill(checkedSkillId);
        //
        return json(null, {
            status: 204,
        });
    } catch (err) {
        console.log('caught:', err, 'is HttpError:', isHttpError(err));
        throw err;
    }
}
