/**
 * Zod Schema for a Role
 **/
import z from 'zod/v4';
import { withId } from './_shared';

//
export const RoleSchema = z.object({
    name: z
        .string()
        .min(2, 'Name is too short')
        .max(150, 'Name must be under 150 characters'),
});
//
export type Role = z.infer<typeof RoleSchema>;
//
export const RoleWithIdSchema = withId(RoleSchema);
export type RoleWithId = z.infer<typeof RoleWithIdSchema>;
/**
 * ERROR TYPES
 **/
export type RoleErrors = {
    name?: string | null;
} | null;
//
