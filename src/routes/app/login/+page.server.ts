import type { LoginPageData } from '$lib/schemas/loginSchema.js';

//
export async function load({ fetch, params }): Promise<LoginPageData> {
    try {
        //
        return {
            login: {
                password: '',
                email: '',
            },
            //
            isLoading: false,
        };
    } catch (err) {
        //
        throw new Error(`Error was ${err}`);
    }
}
