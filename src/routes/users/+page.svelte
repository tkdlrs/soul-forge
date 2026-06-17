<script lang="ts">
    import { onMount } from 'svelte';
    import { createUser, getUsers } from '../../db/queries/users';
    //
    let users = $state<
        Array<{
            id: number;
            firstName: string;
            lastName: string;
            email: string;
        }>
    >([]);
    //
    async function makeAUser() {
        const data = {
            email: 'tkd.lsanchez@gmail.com',
            firstName: 'Levi',
            lastName: 'Sanchez',
        };
        await createUser(data);
    }
    //
    onMount(async () => {
        users = await getUsers();
    });
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Users</h1>
            <p>This would be an index page for listing out</p>
            <button onclick={makeAUser}>make a user</button>
        </div>
        <div class="col-12">
            <!--  -->
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <!--  -->
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> First Name </th>
                                    <th scope="col"> Last Name </th>
                                    <th scope="col"> Email </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each users as user}
                                    <tr>
                                        <th scope="row"> {user.id} </th>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName} </td>
                                        <td> {user.email} </td>
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
</section>
