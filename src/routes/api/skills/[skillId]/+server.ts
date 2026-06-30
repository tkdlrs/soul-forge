/**
 * API VERBS for Skills [ ID ] resource
 * Working on a specified Skill
 **/
import { SkillEditSchema } from '$lib/schemas/skillSchema.js';
import {
    deleteSkill,
    getSkill,
    updateSkill,
} from '$lib/server/repositories/skill.repository';
import { error, json } from '@sveltejs/kit';
import z from 'zod';

// Get all the sessions for a single skill that belongs to a single user
export async function GET({ params, request }) {
    try {
        console.log('params:', params);
        console.log('request:', request);
        //
        const skillId = params.skillId;
        z.uuid().parse(skillId);
        //
        const skillData = await getSkill(skillId);
        //
        return json(skillData);
    } catch (err) {
        throw error(404, `Data not found`);
    }
}
//
// Allow user to Edit/ Update the skill name and icon.
export async function PUT({ params, request }) {
    try {
        //
        const body = await request.json();
        const skill = { name: body.name, icon: body.icon };
        SkillEditSchema.parse(skill);
        //
        const skillId = params.skillId;
        z.uuid().parse(skillId);
        //
        await updateSkill(skillId, skill);
        //
        return json(null, {
            status: 204,
        });
    } catch (err) {
        throw error(404, `Error was ${err}`);
    }
}
//
export async function DELETE({ params, request }) {
    try {
        // console.log('request:', request);
        console.log('params:', params);
        //
        const skillId = params.skillId;
        console.log(`Dellete things skill id be ${skillId}`);
        // z.uuid().parse(skillId);
        //
        console.log(`next is to call delete skill with skill id ${skillId}`);
        await deleteSkill(skillId);
        console.log('after awaited skill delete');
        //
        return json(null, {
            status: 204,
        });
    } catch (err) {
        throw error(400, `Error was ${err}`);
    }
}
