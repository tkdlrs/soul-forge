import { z } from 'zod/v4';
import { trimStrings } from './_preprocessing';
//
export const UserSchema = z.object({
    firstName: z
        .string({ error: 'The "First Name" field is required' })
        .min(2, 'First Name is too short.')
        .max(150, 'First name must be under 150 characters'),
    lastName: z
        .string({ error: 'The "Last Name" field is required' })
        .min(2, 'Last Name is too short.')
        .max(150, 'Last name must be under 150 characters'),
});
//
export const UserCreateSchema = z.preprocess(trimStrings, UserSchema);
export type UserCreateData = z.infer<typeof UserCreateSchema>;

//
