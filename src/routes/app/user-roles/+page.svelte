<script lang="ts">
    /**
     * App Frontend 'UserRole'
     **/
    import { currentAppURI } from '$lib/helpers/navigators';
    //
    let { data } = $props();
    //
    let userRoles = $state<any[]>(data.userRoles);
    //
    async function deleteUserRole(id: string) {
        try {
            console.log(`You tried to delte ${id}`);
            alert(`set up delete`);
        } catch (err) {
            alert('ERROR');
            console.error(err);
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
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <div class="table-responsive">
                        <table
                            class="table table-bordered table-sm table-hover"
                        >
                            <thead>
                                <tr>
                                    <th scope="col"> Id </th>
                                    <th scope="col">
                                        User
                                        <small>
                                            (name figure with outer join)
                                        </small>
                                    </th>
                                    <th scope="col">
                                        Role
                                        <small>
                                            (name figure with outer join)
                                        </small>
                                    </th>
                                    <th scope="col"> Options </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each userRoles as ur}
                                    <tr>
                                        <td> {ur.id} </td>
                                        <td> {ur.UserId} </td>
                                        <td> {ur.RoleId} </td>
                                        <td>
                                            <div>
                                                <button
                                                    class="btn btn-sm btn-danger"
                                                    onclick={() => {
                                                        deleteUserRole(ur.id);
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
        </div>
    </div>
</section>
