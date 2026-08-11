/**
 * Zod Schema for a User Role
 **/
import z from 'zod/v4';
import { withId } from './_shared';
import { trimStrings } from './_preprocessing';
//
export const UserRoleSchema = z.object({
    userId: z.coerce.number(),
    roleId: z.uuid(),
});
//
export type UserRole = z.infer<typeof UserRoleSchema>;
//
export const UserRoleCreateSchema = z.preprocess(trimStrings, UserRoleSchema);
export type UserRoleCreate = z.infer<typeof UserRoleCreateSchema>;
//
export const UserRoleWithIdSchema = withId(UserRoleSchema);
export type UserRoleWithId = z.infer<typeof UserRoleWithIdSchema>;
//
export const UserRolesBridgedWithIdSchema = UserRoleWithIdSchema.extend({
    userFirstName: z.string(),
    userLastName: z.string(),
    roleName: z.string(),
});
export type UserRolesBridgedWithId = z.infer<
    typeof UserRolesBridgedWithIdSchema
>;
/**
 * ERROR TYPES
 **/
export type UserRoleErrors = {
    userId?: string | null;
    roleId?: string | null;
} | null;
//
