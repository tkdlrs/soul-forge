/**
 * Zod Schema for a Skill Session
 **/
import z from 'zod/v4';
import { trimStrings } from './_preprocessing';
import { withId } from './_shared';

//
export const SkillSessionSchema = z.object({
    id: z.uuid(),
    userId: z.number(),
    skillId: z.string(),
    startDateTime: z.coerce.date(),
    endDateTime: z.coerce.date().nullable(),
});
//
export const SkillSesssionCreateSchema = z.preprocess(
    trimStrings,
    SkillSessionSchema,
);
export type SkillSession = z.infer<typeof SkillSesssionCreateSchema>;

//
export const SkillSessionsPageDataSchema = z.object({
    skillSessions: z.array(SkillSessionSchema),
    skillId: z.string(),
    skillName: z.string(),
    isLoading: z.boolean(),
    userId: z.number(),
    currentSessionId: z.string(),
});
export type SkillSessionsPageData = z.infer<typeof SkillSessionsPageDataSchema>;
//
export const SkillSessionPageDataSchema = z.object({
    skillSession: SkillSessionSchema,
    isLoading: z.boolean(),
});
export type SkillSessionPageData = z.infer<typeof SkillSessionPageDataSchema>;
/**
 * ERROR TYPES
 **/
export type SkillSessionErrors = {
    userId?: string | null;
    skillId?: string | null;
    startDateTime?: string | null;
    endDateTime?: string | null;
} | null;
