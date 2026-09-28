<script lang="ts">
    /**
     * App Frontend 'Roles' SHOW and EDIT
     **/
    import RoleForm from '$lib/components/forms/resources/RoleForm.svelte';
    import { RoleWithIdSchema } from '$lib/schemas/roleSchema';
    import { untrack } from 'svelte';
    //
    let { data } = $props();
    let name = $state<string>('');
    //
    const role = structuredClone(untrack(() => data.role));
    const checked = RoleWithIdSchema.parse(role);
    //
    name = checked.name;
    const actionRoute = $derived<string>(`/api/roles/${role.id}`);
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
