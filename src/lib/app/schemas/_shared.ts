import { z } from 'zod/v4';
//
export const withId = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
    schema.extend({ id: z.string() });
//
