/**
 * APP ServerSide Skill [id] SHOW
 *
 * Working with a specific 'Skill' (id) to create 'Skill Sessions' for that particular skill
 *
 **/
import z from 'zod/v4';
import { SkillWithIdSchema } from '$lib/schemas/skillSchema.js';
import {
    SkillSessionSchema,
    type TrainSkillPageData,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema.js';
import { withId } from '$lib/schemas/_shared.js';

//
export async function load({
    fetch,
    params,
    locals,
}): Promise<TrainSkillPageData> {
    try {
        // USER ID
        const userId = locals.user?.id;
        if (!userId) {
            throw new Error('user id not provided. Unable to continue');
        }
        //
        console.log('train params:', params);
        // Use the 'Skill Name' to figure out the Skill's ID
        const skillName = params.skillName;
        const skillsResponse = await fetch(`/api/skills`);
        if (!skillsResponse.ok) {
            console.log('the Skill request was not okay');
            throw new Error('the Skill request was not okay');
        }
        //
        const skillsList = await skillsResponse.json();
        const skillsListCheck = z.array(SkillWithIdSchema).parse(skillsList);
        const skillData = skillsListCheck.find(
            (item) => item.name.toLowerCase() === skillName,
        );
        if (!skillData) {
            throw new Error('Skill not found');
        }
        //
        const skillId = skillData.id;
        const skillSessionId = params.skillSessionId;
        // throws error if data shape issue
        const checkedSkillSessionId = z.uuid().parse(skillSessionId);
        //
        const response = await fetch(`/api/skill-sessions?skillId=${skillId}`);
        const result = await response.json();
        console.log('app skills [skill name] train [id] result:', result);
        // ...has all data for all 'Skill Sessions'...
        let skillSessions: SkillSession[] = [];
        if (result.length > 0) {
            skillSessions = z.array(SkillSessionSchema).parse(result);
        }

        //
        return {
            skillSessions,
            skillId,
            skillName: skillData.name,
            isLoading: false,
            userId,
            currentSessionId: checkedSkillSessionId,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
