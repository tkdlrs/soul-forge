<script lang="ts">
    /**
     * Form for Logging in.
     * Authentication.
     **/
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    // Schema
    import {
        LoginSchema,
        type Login,
        type LoginErrors,
    } from '$lib/schemas/loginSchema';

    // Implementation
    let errorsObj = $state<LoginErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // $inspect(data);
    // Form config
    const loginConfig = {
        ///app/skill-sessions
        slug: `/`,
        schema: LoginSchema,

        initial: {
            email: data.email,
            password: data.password,
        } satisfies Login,
        errors: null satisfies LoginErrors,

        //
        action,
        method,
        //
    };
    //
    let formData = $state<Login>(loginConfig.initial);
</script>

<FormWrapper config={loginConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: Login })}
        <div class="form-row justify-content-between">
            <Input
                text="Email"
                id="email"
                bind:defaultValue={formData.email}
                errorText={errorsObj?.email}
            />
            <Input
                text="Password"
                type="password"
                id="password"
                bind:defaultValue={formData.password}
                errorText={errorsObj?.password}
            />
        </div>
    {/snippet}
</FormWrapper>
