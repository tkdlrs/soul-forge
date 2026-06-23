import z from 'zod';
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
export type SkillSessionWithId = z.infer<typeof SkillSessionSchema>;
//
