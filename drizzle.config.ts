import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
//
config({ path: '.env' });
//
//

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
//
export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'turso',
    dbCredentials: {
        authToken: process.env.DATABASE_AUTH_TOKEN,
        url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
