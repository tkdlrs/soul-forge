<script lang="ts">
    /**
     * Form for Updating Password.
     * Authentication.
     **/
    // Components
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    // Schema
    import {
        UpdatePasswordSchema,
        type UpdatePassword,
        type UpdatePasswordErrors,
    } from '$lib/schemas/updatePasswordSchema';
    import { untrack } from 'svelte';
    // Implementation
    let errorsObj = $state<UpdatePasswordErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // Form config
    const loginConfig = {
        //
        slug: `/`,
        schema: UpdatePasswordSchema,
        //
        initial: {
            password: untrack(() => data.password),
            confirmPassword: untrack(() => data.confirmPassword),
            userId: untrack(() => data.userId),
        } satisfies UpdatePassword,
        errors: null satisfies UpdatePasswordErrors,
        //
        action: untrack(() => action),
        method: untrack(() => method),
    };
    //
    let formData = $state<UpdatePassword>(loginConfig.initial);
</script>

<FormWrapper config={loginConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: UpdatePassword })}
        <div class="form-row justify-content-between">
            <Input
                text="Password"
                id="password"
                type="password"
                bind:defaultValue={formData.password}
                errorText={errorsObj?.password}
            />
            <Input
                text="Confirm Password"
                id="confirm-password"
                type="password"
                bind:defaultValue={formData.confirmPassword}
                errorText={errorsObj?.confirmPassword}
            />
        </div>
    {/snippet}
</FormWrapper>
