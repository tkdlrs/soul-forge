<script lang="ts">
    import Input from '$lib/components/form-elements/Input.svelte';
    import {
        SkillSchema,
        type SkillCreate,
        type SkillErrors,
    } from '$lib/schemas/skillSchema';
    import FormWrapper from '../FormWrapper.svelte';

    // Implementation
    let errorsObj = $state<SkillErrors>(null);
    // props...
    let { data, isLoading } = $props();
    // ToDo:// need to get the current skill's id somehow for edit

    // Form config
    const skillConfig = {
        // collection: '',
        // slug: '',
        schema: SkillSchema,

        initial: {
            name: '',
            icon: '',
            userId: 1,
        } satisfies SkillCreate,
        errors: null satisfies SkillErrors,

        //
    };
    //
    let formData = $state<SkillCreate>(skillConfig.initial);
</script>

<FormWrapper config={skillConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: SkillCreate })}
        <div class="form-row justify-content-between">
            <Input
                text="Name"
                id="Name"
                bind:defaultValue={formData.name}
                errorText={errorsObj?.name}
            />
            <Input
                text="Icon"
                id="Icon"
                bind:defaultValue={formData.icon}
                errorText={errorsObj?.icon}
            />
        </div>
    {/snippet}
</FormWrapper>
