/**
 * Skill Repository.
 * Functions for interacting with 'Skills' in database.
 **/
import { SkillSchema, type SkillCreate } from '$lib/schemas/skillSchema';
import { db } from '$lib/server/db';
import { skillsTable, type InsertSkill } from '$lib/server/db/schema/skills';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
//
//
export async function getSkills() {
    return db.select().from(skillsTable);
}
//
export async function createSkill(data: InsertSkill) {
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
export async function updateSkill(id: string, data: Partial<SkillCreate>) {
    await db.update(skillsTable).set(data).where(eq(skillsTable.id, id));
    //
    return getSkill(id);
}
//
export async function deleteSkill(id: string) {
    try {
        console.log('database id:', id);
        const deleted = await db
            .delete(skillsTable)
            .where(eq(skillsTable.id, id))
            .returning();
        console.log('AFTER DATABASE CALL');
        console.log('deleted', deleted);
        return;
    } catch (err) {
        console.error('deleteSkill failed:', err);
    }
}
//
