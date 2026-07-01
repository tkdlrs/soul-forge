export async function load({ params, fetch }) {
    try {
        const userId = String(params.id);
        //
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        //
        const result = await response.json();
        //
        //
        //
        return {
            user: result,
            isLoading: false,
        };
        //
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
