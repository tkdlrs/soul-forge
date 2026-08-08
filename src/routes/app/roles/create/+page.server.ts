/**
 * APP ServerSide Roles page
 **/
export async function load() {
    try {
        return {
            isLoading: false,
        };
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
