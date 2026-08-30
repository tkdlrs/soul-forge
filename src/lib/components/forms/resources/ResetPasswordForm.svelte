<script lang="ts">
    /**
     * Form for Reseting Password.
     * Authentication.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    // Schema
    import {
        ResetPasswordSchema,
        type ResetPassword,
        type ResetPasswordErrors,
    } from '$lib/schemas/resetPasswordSchema';

    // Implementation
    let errorsObj = $state<ResetPasswordErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // $inspect(data);
    // Form config
    const loginConfig = {
        //
        slug: `/reset-password`,
        schema: ResetPasswordSchema,

        initial: {
            email: data.email,
        } satisfies ResetPassword,
        errors: null satisfies ResetPasswordErrors,

        //
        action,
        method,
        //
        postFunctionCall: (...args: any[]) => {
            alert('Success. Check your inbox to update your password');
        },
    };
    //
    let formData = $state<ResetPassword>(loginConfig.initial);
</script>

<FormWrapper config={loginConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: ResetPassword })}
        <div class="form-row justify-content-between">
            <Input
                text="Email"
                id="email"
                bind:defaultValue={formData.email}
                errorText={errorsObj?.email}
            />
        </div>
    {/snippet}
</FormWrapper>
