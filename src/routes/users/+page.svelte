<script lang="ts">
    import { onMount } from 'svelte';
    //
    let users = $state<
        Array<{
            id: number;
            firstName: string;
            lastName: string;
            email: string;
        }>
    >([]);
    let firstName = $state<string>('');
    let lastName = $state<string>('');
    let email = $state<string>('');
    //
    async function loadUsers() {
        const response = await fetch('/api/users');
        users = await response.json();
    }
    //
    async function createUser() {
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
            }),
        });
        //
        firstName = '';
        lastName = '';
        email = '';
        //
        await loadUsers();
    }
    //
    onMount(async () => {
        await loadUsers();
    });
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Users</h1>
            <p>This would be an index page for listing out</p>
        </div>
        <div class="col-12">
            <input bind:value={firstName} placeholder="First Name" />
            <input bind:value={lastName} placeholder="Last Name" />
            <input bind:value={email} placeholder="email" />

            <button onclick={createUser}>make a user</button>
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
