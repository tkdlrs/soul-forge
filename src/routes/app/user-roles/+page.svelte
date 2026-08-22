<script lang="ts">
    /**
     * App Frontend 'UserRole'
     **/
    import { currentAppURI } from '$lib/helpers/navigators';
    import type { UserRolesBridgedWithId } from '$lib/schemas/userRolesSchema.js';
    //
    let { data } = $props();
    //
    let userRolesBridged = $state<UserRolesBridgedWithId[]>(
        data.userRolesBridged,
    );
    //
    async function deleteUserRole(id: string) {
        if (confirm(`Are you certain you want to delete this UserRole?`)) {
            try {
                const response = await fetch(`/api/user-roles/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const body = await response.json();
                    alert(`${response.status} - ${body.message}`);
                    //
                    return window.location.reload();
                }
                //
                return window.location.assign(`${currentAppURI}/user-roles/`);
            } catch (err) {
                alert('ERROR');
                console.error(err);
            }
        }
    }
</script>

<!--  -->
<section class="p-5">
    <div class="row">
        <div class="col-12 mb-5">
            <h1>User Roles</h1>
        </div>
        <div class="col-12 d-flex mb-5">
            <div class="flex-sm grow-1">
                <p>This would be an INDEX page for listing out User Roles</p>
            </div>
            <div class="ms-auto">
                <a
                    href="{currentAppURI}/user-roles/create"
                    class="btn btn-success"
                >
                    Create &ldquo;User Role&rdquo;
                </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-bordered table-sm table-hover">
                    <thead>
                        <tr>
                            <th scope="col"> Id </th>
                            <th scope="col"> User Name </th>
                            <th scope="col"> User Id </th>
                            <th scope="col"> Role Name </th>
                            <th scope="col"> Role Id </th>
                            <th scope="col"> Options </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each userRolesBridged as urb}
                            <tr>
                                <td> {urb.id} </td>
                                <td>
                                    {urb.userFirstName}&nbsp;{urb.userLastName}
                                </td>
                                <td> {urb.userId} </td>
                                <td> {urb.roleName} </td>
                                <td> {urb.roleId} </td>
                                <td>
                                    <div>
                                        <button
                                            class="btn btn-sm btn-danger"
                                            onclick={() => {
                                                deleteUserRole(urb.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
