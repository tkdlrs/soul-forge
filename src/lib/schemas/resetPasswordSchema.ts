/**
 * Zod schema for Reset Password
 **/
import z from 'zod/v4';
//
export const ResetPasswordSchema = z.object({
    email: z.email(),
});
//
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
//
export const ResetPasswordPageDataSchema = z.object({
    resetPassword: ResetPasswordSchema,
    isLoading: z.boolean(),
});
export type ResetPasswordPageData = z.infer<typeof ResetPasswordPageDataSchema>;
/**
 * ERROR TYPES
 **/
export type ResetPasswordErrors = {
    email?: string | null;
} | null;
//
