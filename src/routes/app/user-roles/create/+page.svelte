<script lang="ts">
    /**
     * App Frontend 'User Roles' CREATE
     **/
    import UserRoleForm from '$lib/components/forms/resources/UserRoleForm.svelte';

    //
    let userId = $state<string>('');
    let roleId = $state<string>('');
    //
    let { data } = $props();
</script>

<section class="p-5">
    <div class="row mb-5">
        <div class="col-12">
            <h1>Create (assign) User Roles</h1>
        </div>
        <div class="col-12">
            <div class="my-5">
                <!--  -->
                <UserRoleForm
                    action="/api/user-roles"
                    method="POST"
                    data={{ userId, roleId }}
                    isLoading={data.isLoading}
                />
            </div>
        </div>
    </div>
</section>
