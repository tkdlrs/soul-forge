/**
 * APP ServerSide Skill [id] SHOW
 *
 * Working with a specific 'Skill' (id) to create 'Skill Sessions' for that particular skill
 *
 **/
import {
    SkillSessionWithIdSchema,
    type SkillSessionsPageData,
    type SkillSessionWithId,
} from '$lib/schemas/skillSessionSchema.js';
import { db } from '$lib/server/db/index.js';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { SkillWithIdSchema } from '$lib/schemas/skillSchema.js';

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
export async function load({ fetch, params }): Promise<SkillSessionsPageData> {
    try {
        // USER ID ToDo:// -somehow we must know this. For real. Not just a hard-coded number 1.
        const userId = 1;

        console.log('train params:', params);
        //
        const skillId = params.skillId;
        z.uuid().parse(skillId);
        //
        const response = await fetch(`/api/skills/${skillId}`);
        const result = await response.json();
        //
        let skillSessions: SkillSessionWithId[] = [];
        if (result.length > 0) {
            skillSessions = z.array(SkillSessionWithIdSchema).parse(result);
        }
        // Get additional information about the skill itself.
        const skillsRequest = await fetch(`/api/skills`);
        const skillsResponse = await skillsRequest.json();
        console.log('skillsResponse', skillsResponse);
        //
        const skillsData = z.array(SkillWithIdSchema).parse(skillsResponse);
        console.log('skillsData', skillsData);
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
            isLoading: false,
            userId,
            currentSessionId: crypto.randomUUID(),
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
