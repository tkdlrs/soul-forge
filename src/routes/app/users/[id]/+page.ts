export async function load({ params, fetch }) {
    const response = await fetch(`/api/users/${params.id}`);
    //
    if (!response.ok) {
        throw new Error('User not found');
    }
    //
    return {
        user: await response.json(),
    };
    //
}
