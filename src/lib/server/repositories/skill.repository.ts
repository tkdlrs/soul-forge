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
export async function getSkills(conditions: any[]): Promise<SkillWithId[]> {
    try {
        const query = db.select().from(skillsTable);
        if (conditions.length > 0) {
            query.where(and(...conditions));
        }
        //
        const skills = await query;
        //
        return skills;
    } catch (err) {
        throw new Error(`Error getting skills. ${err}`);
    }
}
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
export async function getSkill(id: string, userId: number) {
    try {
        const result = await db
            .select()
            .from(skillsTable)
            .where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId)));
        //
        return result[0] ?? null;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function getSkillByName(name: string, userId: number) {
    try {
        const result = await db
            .select()
            .from(skillsTable)
            .where(
                and(
                    sql`lower(${skillsTable.name}) = lower(${name})`,
                    eq(skillsTable.userId, userId),
                ),
            )
            .limit(1);
        //
        return result[0] ?? null;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function updateSkill(id: string, data: Partial<SkillCreate>) {
    try {
        if (!data.userId) {
            throw new Error('No user id provided. Unable to continue');
        }
        //
        await db
            .update(skillsTable)
            .set(data)
            .where(
                and(
                    eq(skillsTable.id, id),
                    eq(skillsTable.userId, data.userId),
                ),
            );
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
export async function deleteSkill(id: string, userId: number) {
    try {
        await db
            .delete(skillsTable)
            .where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId)))
            .returning();
        //
        return;
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
//
