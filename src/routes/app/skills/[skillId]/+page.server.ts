import { SkillSessionWithIdSchema } from '$lib/app/schemas/skillSessionSchema.js';
import { db } from '$lib/server/db/index.js';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import z from 'zod';

//
export const actions = {
    startSession: async ({ params }) => {
        // ToDo:// HOW USER ID?
        //
        await db.insert(skillSessionsTable).values({
            id: randomUUID(),
            skillId: params.skillId,
            userId: 1, // user.id,
            startDateTime: new Date(),
        });
    },
    //
    stopSession: async ({ request }) => {
        const data = await request.formData();
        //
        await db
            .update(skillSessionsTable)
            .set({
                endDateTime: new Date(),
            })
            .where(eq(skillSessionsTable.id, String(data.get('sessionId'))));
    },
};

//
const paramsSchema = z.object({
    skillId: z.uuid(),
});
//
export async function load({ fetch, params }) {
    try {
        console.log('params:', params);
        const { skillId } = paramsSchema.parse(params);
        //
        const response = await fetch(`/api/skills/${skillId}`);
        const result = await response.json();
        const skillSessions = z.array(SkillSessionWithIdSchema).parse(result);
        //
        return {
            skillSessions,
            skillId,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
