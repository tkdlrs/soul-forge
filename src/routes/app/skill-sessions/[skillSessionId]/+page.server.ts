/**
 * Server Side Skill Sessions INDEX page
 **/
import z from 'zod/v4';
import { type SkillSessionPageData } from '$lib/schemas/skillSessionSchema.js';
//
export const actions = {
    editSession: async ({ params }) => {
        //
        console.log('trying to edit a skill session');
        console.log(`params are ${params}`);
    },
};
//
export async function load({ fetch, params }): Promise<SkillSessionPageData> {
    try {
        const { skillSessionId } = z
            .object({ skillSessionId: z.uuid() })
            .parse(params);
        //
        console.log(`load says the skillSessionId is ${skillSessionId}`);
        //
        const response = await fetch(`/api/skill-sessions/${skillSessionId}`);
        const result = await response.json();
        console.log(`result from skill session id load function is: `, result);
        //
        // const skillSessionData = SkillSessionWithIdSchema.parse(result);
        const skillSessionData = result;
        //
        return {
            skillSession: skillSessionData,
            isLoading: false,
        };
    } catch (err) {
        //
        throw new Error(`Error was ${err}`);
    }
}
