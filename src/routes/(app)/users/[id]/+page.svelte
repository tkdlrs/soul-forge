<script lang="ts">
    /**
     * App Frontend 'User' page SHOW & EDIT
     **/
    import { untrack } from 'svelte';
    import UserForm from '$lib/components/forms/resources/UserForm.svelte';
    import {
        UserWithIdSchema,
        type UserWithId,
    } from '$lib/schemas/userSchema.js';
    //
    let { data } = $props();
    //
    const user = $state<UserWithId>(structuredClone(untrack(() => data.user)));
    const checkedUser = $derived<UserWithId>(UserWithIdSchema.parse(user));
    //
    let firstName = $state<string>(untrack(() => checkedUser.firstName));
    let lastName = $state<string>(untrack(() => checkedUser.lastName));
    let email = $state<string>(untrack(() => checkedUser.email));
    //
    const actionRoute = `/api/users/${untrack(() => checkedUser.id)}`;
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12 mb-5">
            <h1>User</h1>
        </div>
        <div class="col-12 col-md-6">
            <h2 class="h4 fw-bold">Show</h2>
            <p><strong>First Name</strong>: {user.firstName}</p>
            <p><strong>Last Name</strong>: {user.lastName}</p>
            <p><strong>Email</strong>: {user.email}</p>
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
</section>
