/**
 * App ServerSide 'Roles' : SHOW and EDIT
 **/
export async function load({ params, fetch }) {
    try {
        const roleId = params.id;
        //
        const response = await fetch(`/api/roles/${roleId}`);
        if (!response.ok) {
            throw new Error('Role not found');
        }
        //
        const result = await response.json();
        //
        return {
            role: result,
            isLoading: false,
        };
        //
    } catch (err) {
        throw new Error(`Error was ${err}`);
    }
}
