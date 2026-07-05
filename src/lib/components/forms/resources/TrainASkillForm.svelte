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

    // Implementation
    let errorsObj = $state<SkillSessionErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // $inspect(data);
    // Form config
    const trainingSessionConfig = {
        //
        slug: `/skills/${data.skillName.toLowerCase().replace(' ', '-')}/train/${data.skillId}`,
        schema: SkillSessionCreateSchema,

        initial: {
            userId: data.userId,
            skillId: data.skillId,
            startDateTime: data.startDateTime,
            endDateTime: data.endDateTime,
            id: data.currentSessionId,
        } satisfies SkillSession,
        errors: null satisfies SkillSessionErrors,

        //
        action,
        method,
        //
    };
    //
    let formData = $state<SkillSession>(trainingSessionConfig.initial);
</script>

<FormWrapper
    config={trainingSessionConfig}
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
