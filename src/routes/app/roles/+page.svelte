<script lang="ts">
    /**
     * App Frontend 'Roles' INDEX
     **/
    import { resolve } from '$app/paths';
    import { currentAppURI } from '$lib/helpers/navigators';
    import { type RoleWithId } from '$lib/schemas/roleSchema.js';
    //
    let { data } = $props();
    //
    let roles = $state<RoleWithId[]>(data.roles);
    //
    async function deleteRole(id: string) {
        if (confirm('Are you certain you want to delete this Role?')) {
            try {
                const response = await fetch(`/api/roles/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const body = await response.json();
                    alert(`${response.status} - ${body.message}`);
                    //
                    return window.location.reload();
                }
                //
                return window.location.assign(`${currentAppURI}/roles/`);
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    }
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Roles</h1>
        </div>
        <div class="col-12 d-flex mb-5">
            <div class="flex-sm-grow-1">
                <p>This would be an index page for listing out Roles.</p>
            </div>
            <div class="ms-auto">
                <a href="{currentAppURI}/roles/create" class="btn btn-primary">
                    Create Role
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
                                    <!-- <th scope="col"> # </th> -->
                                    <th scope="col"> Name </th>
                                    <th scope="col"> Options </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each roles as role}
                                    <tr>
                                        <!-- <th scope="row"> {role.id} </th> -->
                                        <td> {role.name}</td>
                                        <td>
                                            <a
                                                href={resolve(
                                                    `/app/roles/${role.id}`,
                                                )}
                                                class="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                class="btn btn-sm btn-danger"
                                                onclick={() =>
                                                    deleteRole(role.id)}
                                            >
                                                Delete
                                            </button>
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
