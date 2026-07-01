<script lang="ts">
    /**
     * App Frontend Users INDEX
     **/
    import { resolve } from '$app/paths';
    import { type UserWithId } from '$lib/schemas/userSchema';
    import { currentAppURI } from '$lib/helpers/navigators';
    //
    let { data } = $props();
    //
    let users = $state<Array<UserWithId>>(data.users);
    //
    async function deleteUser(id: number) {
        try {
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
            //
            return window.location.assign(`${currentAppURI}/users/`);
        } catch (err) {
            alert(`ERROR`);
            console.error(err);
        }
    }
    //
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12"><h1>Users</h1></div>
        <div class="col-12 d-flex mb-5">
            <div class="flex-sm-grow-1">
                <p>This would be an index page for listing out</p>
            </div>
            <div class="ms-auto">
                <a href="{currentAppURI}/users/create" class="btn btn-primary">
                    Create User
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <!--  -->
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-8">
                        <!--  -->
                        <div class="table-responsive">
                            <table
                                class="table table-bordered table-sm table-hover"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col"> # </th>
                                        <th scope="col"> First Name </th>
                                        <th scope="col"> Last Name </th>
                                        <th scope="col"> Email </th>
                                        <th scope="col"> Options </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each users as user}
                                        <tr>
                                            <th scope="row"> {user.id} </th>
                                            <td> {user.firstName} </td>
                                            <td> {user.lastName} </td>
                                            <td> {user.email} </td>
                                            <td class="d-grid gap-2">
                                                <a
                                                    class="btn btn-sm btn-warning"
                                                    href={resolve(
                                                        `/app/users/${user.id}`,
                                                    )}
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    class="btn btn-sm btn-danger"
                                                    onclick={() =>
                                                        deleteUser(
                                                            Number(user.id),
                                                        )}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                        <!--  -->
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</section>
