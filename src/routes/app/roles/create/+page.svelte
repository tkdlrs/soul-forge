<script lang="ts">
    /**
     * App Frontend 'Roles' CREATE
     **/
    import RoleForm from '$lib/components/forms/resources/RoleForm.svelte';
    //
    let name = $state<string>('');
    //
    let { data } = $props();
</script>

<section class="p-5">
    <div class="row mb-5">
        <div class="col-12">
            <h1>Create a Roles</h1>
        </div>
        <div class="col-12">
            <div class="my-5">
                <RoleForm
                    action="/api/roles"
                    method="POST"
                    data={{ name }}
                    isLoading={data.isLoading}
                />
            </div>
        </div>
    </div>
</section>
