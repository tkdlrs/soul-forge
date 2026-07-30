type Config = {
    db: DBConfig;
    jwt: JWTConfig;
};
//
type DBConfig = {
    url: string;
    authToken: string;
};
//
type JWTConfig = {
    defaultDuration: number;
    refreshDuration: number;
    secret: string;
    issuer: string;
};
//
process.loadEnvFile();
//
function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environmental variable ${key} is not set`);
    }
    return value;
}
//
export const config: Config = {
    db: {
        url: envOrThrow('DATABASE_URL'),
        authToken: envOrThrow('DATABASE_AUTH_TOKEN'),
    },
    jwt: {
        defaultDuration: 60 * 60, // 1 hour in seconds
        refreshDuration: 60 * 60 * 24 * 60 * 1000, // 60 days in milliseconds
        secret: envOrThrow('JWT_SECRET'),
        issuer: 'soulforge',
    },
};
