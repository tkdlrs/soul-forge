import argon2 from 'argon2';

//
class AuthState {
    // Vars
    // Const
    constructor() {
        //
    }
    // Methods
}

//
export const authStore = new AuthState();

//
export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
}
//
export async function checkPasswordHash(password: string, hash: string) {
    if (!password) return false;
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        return false;
    }
}
