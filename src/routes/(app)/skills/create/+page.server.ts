/**
 *  APP ServerSide Skill CREATE page.
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
