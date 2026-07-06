/**
 * Server Side Skills INDEX page
 **/
import z from 'zod/v4';
import { SkillWithIdSchema } from '$lib/schemas/skillSchema.js';

//
export async function load({ fetch, params }) {
    //
    try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        const skills = z.array(SkillWithIdSchema).parse(result);
        // ToDo:// Determine if each skill is/has 'isActive' boolean and add that to the data.
        //
        return {
            skills,
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
