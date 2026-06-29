/**
 *  APP ServerSide Skill EDIT page.
 **/
import { SkillWithIdSchema } from '$lib/schemas/skillSchema';
import z from 'zod';
//
export async function load({ fetch, params }) {
    try {
        const skillId = params.skillId;
        console.log('hi');
        z.uuid().parse(skillId);
        console.log('hee');
        //
        const response = await fetch(`/api/skills/${skillId}`);
        const result = await response.json();
        //
        // SkillWithIdSchema.parse(result);
        //
        return {
            skill: result,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
