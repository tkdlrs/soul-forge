<script lang="ts">
    /**
     * App Frontend 'Role'
     **/
    import RoleForm from '$lib/components/forms/resources/RoleForm.svelte';
    import { RoleWithIdSchema } from '$lib/schemas/roleSchema';
    //
    let name = $state<string>('');
    //
    let { data } = $props();
    //
    const role = data.role;
    RoleWithIdSchema.parse(role);
    //
    name = role.name;
    //
    const actionRoute = `/api/roles/${role.id}`;
</script>

<!--  -->
<section class="p-5">
    <div class="row">
        <div class="col-12 mb-5">
            <h1>Roles</h1>
        </div>
        <div class="col-12 col-md-6">
            <h2 class="h4 fw-bold">Show</h2>
            <p><strong>Name</strong>: {data.role.name}</p>
        </div>
        <div class="col-12 col-md-6">
            <h2 class="h4 fw-bold">Edit</h2>
            <RoleForm
                action={actionRoute}
                method="PUT"
                data={{ name }}
                isLoading={data.isLoading}
            />
        </div>
    </div>
</section>
