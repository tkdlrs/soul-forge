/**
 * Zod schema for Update Password
 **/
import z from 'zod/v4';
//
export const UpdatePasswordSchema = z
    .object({
        password: z.string(),
        confirmPassword: z.string(),
        userId: z.number(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            });
        }
    });
//
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
//
export const UpdatePasswordPageDataSchema = z.object({
    updatePassword: UpdatePasswordSchema,
    isLoading: z.boolean(),
});
export type UpdatePasswordPageData = z.infer<
    typeof UpdatePasswordPageDataSchema
>;
/**
 * ERROR TYPES
 **/
export type UpdatePasswordErrors = {
    password?: string | null;
    confirmPassword?: string | null;
} | null;
//
