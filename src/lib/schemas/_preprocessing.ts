// Preprocessing
export const trimStrings = (input: unknown) => {
    if (typeof input === 'object' && input !== null) {
        return Object.entries(input).reduce((acc, [key, value]) => {
            acc[key] = typeof value === 'string' ? value.trim() : value;
            return acc;
        }, {} as any);
    }
    return input;
};
