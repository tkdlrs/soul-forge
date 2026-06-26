import z from 'zod/v4';
import { SkillWithIdSchema } from '$lib/schemas/skillSchema.js';

//
export async function load({ fetch, params }) {
    //
    try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        const skills = z.array(SkillWithIdSchema).parse(result);
        //
        return {
            skills,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
