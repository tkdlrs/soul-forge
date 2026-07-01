<script lang="ts">
    /**
     * App Frontend 'User' page SHOW & EDIT
     **/
    import UserForm from '$lib/components/forms/resources/UserForm.svelte';
    import { UserWithIdSchema } from '$lib/schemas/userSchema.js';
    //
    let firstName = $state<string>('');
    let lastName = $state<string>('');
    let email = $state<string>('');
    //
    let { data } = $props();
    //
    const user = data.user;
    UserWithIdSchema.parse(user);
    //
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
    //
    const actionRoute = `/api/users/${user.id}`;
</script>

<div class="row">
    <div class="col-12 mb-5">
        <h1>User</h1>
    </div>
    <div class="col-12 col-md-6">
        <h2 class="h4 fw-bold">Show</h2>
        <p><strong>First Name</strong>: {data.user.firstName}</p>
        <p><strong>Last Name</strong>: {data.user.lastName}</p>
        <p><strong>Email</strong>: {data.user.email}</p>
    </div>
    <div class="col-12 col-md-6">
        <h2 class="h4 fw-bold">Edit User</h2>
        <UserForm
            action={actionRoute}
            method="PUT"
            data={{ firstName, lastName, email }}
            isLoading={data.isLoading}
        />
    </div>
</div>
