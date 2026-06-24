import {
    SkillSessionWithIdSchema,
    type SkillSessionsPageData,
} from '$lib/app/schemas/skillSessionSchema.js';
import { db } from '$lib/server/db/index.js';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { SkillWithIdSchema } from '$lib/app/schemas/skillSchema.js';

//
export const actions = {
    startSession: async ({ params }) => {
        // ToDo:// HOW USER ID?

        //
        const skillSessionId = randomUUID();
        //
        const session = await db
            .insert(skillSessionsTable)
            .values({
                id: skillSessionId,
                skillId: params.skillId,
                userId: 1, // user.id,
                startDateTime: new Date(),
            })
            .returning();
        //
        console.log('session is ', session);
        console.log('session[0] is', session[0]);
        //
        return {
            skillSessionId,
            session: session[0],
        };
    },
    //
    stopSession: async ({ request }) => {
        const data = await request.formData();
        //
        const session = await db
            .update(skillSessionsTable)
            .set({
                endDateTime: new Date(),
            })
            .where(eq(skillSessionsTable.id, String(data.get('sessionId'))))
            .returning();
        //
        return {
            session: session[0],
        };
    },
};

//
const paramsSchema = z.object({
    skillId: z.uuid(),
});
//
export async function load({ fetch, params }): Promise<SkillSessionsPageData> {
    try {
        console.log('params:', params);
        //
        const { skillId } = paramsSchema.parse(params);
        //
        const response = await fetch(`/api/skills/${skillId}`);
        const result = await response.json();
        //
        const skillSessions = z.array(SkillSessionWithIdSchema).parse(result);
        // Get additional information about the skill itself.
        const skillsRequest = await fetch(`/api/skills`);
        const skillsResponse = await skillsRequest.json();
        const skillsData = z.array(SkillWithIdSchema).parse(skillsResponse);
        //
        const skillsSearch = skillsData.find((item) => item.id === skillId);
        let skillName = '';
        if (skillsSearch) {
            skillName = skillsSearch.name;
        } else {
            skillName = 'SKILL NOT FOUND';
        }
        //
        return {
            skillSessions,
            skillId,
            skillName,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
