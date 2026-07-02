<script lang="ts">
    /**
     * Form for a Skill.
     * For CREATE and EDIT.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    import {
        SkillSchema,
        type SkillCreate,
        type SkillErrors,
    } from '$lib/schemas/skillSchema';

    // Implementation
    let errorsObj = $state<SkillErrors>(null);
    // props...
    let { data, isLoading, action, method } = $props();
    // Form config
    const skillConfig = {
        // collection: '',
        slug: '/skills/',
        schema: SkillSchema,

        initial: {
            name: data.name,
            icon: data.icon,
            userId: 1,
        } satisfies SkillCreate,
        errors: null satisfies SkillErrors,

        //
        action,
        method,
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
                id="name"
                bind:defaultValue={formData.name}
                errorText={errorsObj?.name}
            />
            <Input
                text="Icon"
                id="icon"
                bind:defaultValue={formData.icon}
                errorText={errorsObj?.icon}
            />
        </div>
    {/snippet}
</FormWrapper>
