/**
 * Zod Schema for a User Role
 **/

import z from 'zod';
import { withId } from './_shared';

//
export const UserRoleSchema = z.object({
    userId: z.uuid(),
    roleId: z.uuid(),
});
//
export type UserRole = z.infer<typeof UserRoleSchema>;
//
export const UserRoleWithIdSchema = withId(UserRoleSchema);
export type UserRoleWithId = z.infer<typeof UserRoleWithIdSchema>;
/**
 * ERROR TYPES
 **/
export type UserRoleErrors = {
    userId?: string | null;
    roleId?: string | null;
} | null;
//
