/**
 * Zod Schema for a Login
 **/
import z from 'zod/v4';
//
export const LoginSchema = z.object({
    email: z.email(),
    password: z.string(),
});
//
export type Login = z.infer<typeof LoginSchema>;
//
export const LoginPageDataSchema = z.object({
    login: LoginSchema,
    //
    isLoading: z.boolean(),
});
export type LoginPageData = z.infer<typeof LoginPageDataSchema>;
/**
 * ERROR TYPES
 **/
export type LoginErrors = {
    email?: string | null;
    password?: string | null;
} | null;
