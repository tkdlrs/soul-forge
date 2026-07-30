// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import bootstrap from 'bootstrap';
//
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: {
                id: number;
                email: string;
            } | null;
            //
            accessToken: string | null;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
