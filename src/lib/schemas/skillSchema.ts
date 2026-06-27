/**
 * Zod Schema for a Skill
 **/
import { z } from 'zod/v4';
import { trimStrings } from './_preprocessing';
import { withId } from './_shared';
//
export const SkillSchema = z.object({
    name: z.string(),
    icon: z.string(),
    userId: z.number(),
});
//
export const SkillCreateSchema = z.preprocess(trimStrings, SkillSchema);
export type SkillCreate = z.infer<typeof SkillCreateSchema>;

//
export const SkillWithIdSchema = withId(SkillSchema);
export type SkillWithId = z.infer<typeof SkillWithIdSchema>;
//
/**
 * ERROR TYPES
 **/
export type SkillErrors = {
    name?: string | null;
    icon?: string | null;
    userId?: string | null;
} | null;
