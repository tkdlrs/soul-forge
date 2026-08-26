/**
 * APP Server Side Reset Password page
 **/
//
export async function load({}) {
    try {
        return {
            resetPassword: {
                email: '',
            },
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
