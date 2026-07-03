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
    type SkillSessionsPageData,
    type SkillSession,
} from '$lib/schemas/skillSessionSchema.js';

//
// export const actions = {
//     startSession: async ({ params }) => {
//         // ToDo:// HOW USER ID?

//         //
//         const skillSessionId = randomUUID();
//         //
//         const session = await db
//             .insert(skillSessionsTable)
//             .values({
//                 id: skillSessionId,
//                 skillId: params.skillId,
//                 userId: 1, // user.id,
//                 startDateTime: new Date(),
//             })
//             .returning();
//         //
//         console.log('session is ', session);
//         console.log('session[0] is', session[0]);
//         //
//         return {
//             skillSessionId,
//             session: session[0],
//         };
//     },
//     //
//     stopSession: async ({ request }) => {
//         const data = await request.formData();
//         //
//         const session = await db
//             .update(skillSessionsTable)
//             .set({
//                 endDateTime: new Date(),
//             })
//             .where(eq(skillSessionsTable.id, String(data.get('sessionId'))))
//             .returning();
//         //
//         return {
//             session: session[0],
//         };
//     },
// };
//
export async function load({ fetch, params }): Promise<SkillSessionsPageData> {
    try {
        // USER ID ToDo:// -somehow we must know this. For real. Not just a hard-coded number 1.
        const userId = 1;
        //
        console.log('train params:', params);
        // Use the 'Skill Name' to figure out the Skill's ID
        const skillName = params.skillName;
        // z.uuid().parse(skillId);
        const skillsRequest = await fetch(`/api/skills`);
        const skillsResponse = await skillsRequest.json();
        //
        const skillsCheck = z.array(SkillWithIdSchema).parse(skillsResponse);
        console.log('skillsCheck', skillsCheck);
        //
        const skillData = skillsCheck.find(
            (item) => item.name.toLowerCase() === skillName,
        );
        if (!skillData) {
            throw new Error('Skill not found');
        }
        // ToDo:// This is wrong. would need to get the skill-sessions with a skillId key of the skill Id
        // that we are looking at.
        const skillId = skillData.id;
        const skillSessionId = params.skillSessionId;
        // throws error if data shape issue
        z.uuid().parse(skillSessionId);
        //
        const response = await fetch(`/api/skill-sessions?skillId=${skillId}`);
        const result = await response.json();
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
            currentSessionId: params.skillSessionId,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
