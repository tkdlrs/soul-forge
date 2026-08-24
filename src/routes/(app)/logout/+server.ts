export async function POST({ cookies }) {
    cookies.delete('accessToken', {
        path: '/',
    });
    //
    return new Response(null, {
        status: 303,
        headers: {
            Location: '/',
        },
    });
}
