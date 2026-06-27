/**
 * Zod Schema for a Skill Session
 **/
import z from 'zod/v4';
import { trimStrings } from './_preprocessing';
import { withId } from './_shared';

//
export const SkillSessionSchema = z.object({
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
export type SkillSesssionCreate = z.infer<typeof SkillSesssionCreateSchema>;
//
export const SkillSessionWithIdSchema = withId(SkillSessionSchema);
export type SkillSessionWithId = z.infer<typeof SkillSessionWithIdSchema>;
//
export const SkillSessionsPageDataSchema = z.object({
    skillSessions: z.array(SkillSessionWithIdSchema),
    skillId: z.string(),
    skillName: z.string(),
});
export type SkillSessionsPageData = z.infer<typeof SkillSessionsPageDataSchema>;
//
export const SkillSessionPageDataSchema = z.object({
    skillSession: SkillSessionWithIdSchema,
    isLoading: z.boolean(),
});
export type SkillSessionPageData = z.infer<typeof SkillSessionPageDataSchema>;
//
