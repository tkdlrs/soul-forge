/**
 * Skill Repository.
 * Functions for interacting with 'Skills' in database.
 *
 **/
import {
    SkillSchema,
    type SkillCreate,
    type SkillWithId,
} from '$lib/schemas/skillSchema';
import { db } from '$lib/server/db';
import { skillsTable } from '$lib/server/db/schema/skills';
import { randomUUID } from 'crypto';
import { and, eq, sql } from 'drizzle-orm';
//
//
export async function getSkills(conditions: any[]): Promise<SkillWithId[]> {
    const query = db.select().from(skillsTable);
    if (conditions.length > 0) {
        query.where(and(...conditions));
    }
    //
    const skills = await query;
    //
    return skills;
}
//

//
export async function createSkill(data: SkillCreate) {
    try {
        const result = SkillSchema.parse(data);
        const newSkill = await db
            .insert(skillsTable)
            .values({ ...result, id: randomUUID() });
        return newSkill;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function getSkill(id: string) {
    const result = await db
        .select()
        .from(skillsTable)
        .where(eq(skillsTable.id, id));
    //
    return result[0] ?? null;
}
//
export async function getSkillByName(name: string) {
    const result = await db
        .select()
        .from(skillsTable)
        .where(sql`lower(${skillsTable.name}) = lower(${name})`)
        .limit(1);
    //
    return result[0] ?? null;
}
//
export async function updateSkill(id: string, data: Partial<SkillCreate>) {
    await db.update(skillsTable).set(data).where(eq(skillsTable.id, id));
    //
    return getSkill(id);
}
//
export async function deleteSkill(id: string) {
    try {
        await db.delete(skillsTable).where(eq(skillsTable.id, id)).returning();
        //
        return;
    } catch (err) {
        console.error('deleteSkill failed:', err);
    }
}
//
