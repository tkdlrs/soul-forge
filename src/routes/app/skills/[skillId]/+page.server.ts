import { db } from '$lib/server/db/index.js';
import { skillSessionsTable } from '$lib/server/db/schema/skill-sessions';
import { randomUUID } from 'crypto';
import { userInfo } from 'os';

//
export const actions = {
    startSession: async ({ params }) => {
        await db.insert(skillSessionsTable).values({
            id: randomUUID(),
            skillId: params.skillId,
            userId: user.id,
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
            .where(eq(skillSessionsTable.id, data.get('sessionId')));
    },
};
