<script lang="ts">
    /**
     * Form for Training a Skill.
     * CREATE a 'Skill Session' but on a specific skill.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    import {
        type SkillSessionErrors,
        type SkillSession,
        SkillSessionCreateSchema,
    } from '$lib/schemas/skillSessionSchema';
    import { untrack } from 'svelte';
    // Implementation
    let errorsObj = $state<SkillSessionErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // Form config
    const skillSessionConfig = {
        slug: `/skills`,
        schema: SkillSessionCreateSchema,
        //
        initial: {
            userId: untrack(() => data.userId),
            skillId: untrack(() => data.skillId),
            startDateTime: untrack(() => data.startDateTime),
            endDateTime: untrack(() => data.endDateTime),
            id: untrack(() => data.currentSessionId),
        } satisfies SkillSession,
        errors: null satisfies SkillSessionErrors,
        //
        action: untrack(() => action),
        method: untrack(() => method),
        //
    };
    //
    let formData = $state<SkillSession>(skillSessionConfig.initial);
</script>

<FormWrapper
    config={skillSessionConfig}
    bind:formData
    bind:errorsObj
    bind:isLoading
>
    {#snippet children({ formData }: { formData: SkillSession })}
        <div class="form-row justify-content-between">
            <Input
                text="User Id"
                id="user-id"
                bind:defaultValue={formData.userId}
                errorText={errorsObj?.userId}
            />
            <Input
                text="Skill Id"
                id="skill-id"
                bind:defaultValue={formData.skillId}
                errorText={errorsObj?.skillId}
            />
            <Input
                text="Start Date Time"
                id="start-date-time"
                bind:defaultValue={formData.startDateTime}
                errorText={errorsObj?.startDateTime}
                required={false}
                type="datetime-local"
            />
            <Input
                text="End Date Time"
                id="end-date-time"
                bind:defaultValue={formData.endDateTime}
                errorText={errorsObj?.endDateTime}
                required={false}
                type="datetime-local"
            />
            <Input
                text="Current Session Id"
                id="current-session-id"
                bind:defaultValue={formData.id}
                errorText={errorsObj?.id}
            />
        </div>
    {/snippet}
</FormWrapper>
