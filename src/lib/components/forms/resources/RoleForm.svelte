<script lang="ts">
    /**
     * Form for a Role.
     * For CREATE and EDIT.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import {
        RoleSchema,
        type Role,
        type RoleErrors,
    } from '$lib/schemas/roleSchema';
    import Input from '$lib/components/form-elements/Input.svelte';
    import { untrack } from 'svelte';
    //
    let errorsObj = $state<RoleErrors>(null);
    // props...
    let { data, isLoading, action, method } = $props();
    //
    const roleConfig = {
        //
        slug: '/roles/',
        schema: RoleSchema,

        initial: {
            name: untrack(() => data.name),
        } satisfies Role,
        errors: null satisfies RoleErrors,

        //
        action: untrack(() => action),
        method: untrack(() => method),
        //
    };
    //
    let formData = $state<Role>(roleConfig.initial);
</script>

<FormWrapper config={roleConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: Role })}
        <div class="form-row justify-content-between">
            <Input
                text="Name"
                id="name"
                bind:defaultValue={formData.name}
                errorText={errorsObj?.name}
            />
        </div>
    {/snippet}
</FormWrapper>
