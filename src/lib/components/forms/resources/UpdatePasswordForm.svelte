<script lang="ts">
    /**
     * Form for Updating Password.
     * Authentication.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    // Schema
    import {
        UpdatePasswordSchema,
        type UpdatePassword,
        type UpdatePasswordErrors,
    } from '$lib/schemas/updatePasswordSchema';

    // Implementation
    let errorsObj = $state<UpdatePasswordErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // $inspect(data);
    // Form config
    const loginConfig = {
        //
        slug: `/`,
        schema: UpdatePasswordSchema,

        initial: {
            password: data.password,
            confirmPassword: data.confirmPassword,
            userId: data.userId,
        } satisfies UpdatePassword,
        errors: null satisfies UpdatePasswordErrors,

        //
        action,
        method,
        //
        // postCallback: (...args: any[]) => {
        //     console.log('Post Call back');
        //     console.log('args', args);
        //     const actResult = args[0];
        //     console.log('Action Result (aka actResult)', actResult);
        //     const accessToken = actResult.token;
        //     console.log('accessToken', accessToken);
        //     sessionStorage.setItem('accessToken', accessToken);
        // },
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
<!-- ToDo:// check things -->
