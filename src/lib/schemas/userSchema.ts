/**
 * Zod Schema for a User
 **/
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
    email: z.email(),
});
//
export const UserCreateSchema = z.preprocess(
    trimStrings,
    UserSchema.extend({
        password: z.string(),
    }),
);
export type UserCreateData = z.infer<typeof UserCreateSchema>;
//
export const UserInsertToDatabaseSchema = UserSchema.extend({
    hashedPassword: z.string(),
});
export type UserInsertToDatabase = z.infer<typeof UserInsertToDatabaseSchema>;
//
export const UserWithIdSchema = UserSchema.extend({ id: z.number() });
export type UserWithId = z.infer<typeof UserWithIdSchema>;
//
export const UserEditSchema = z.preprocess(trimStrings, UserSchema);
export type UserEdit = z.infer<typeof UserEditSchema>;
/**
 *  ERROR TYPES
 **/
export type UserErrors = {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
} | null;
