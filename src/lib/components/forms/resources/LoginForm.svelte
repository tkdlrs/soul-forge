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
        //
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
        postCallback: (...args: any[]) => {
            console.log('Post Call back');
            console.log('args', args);
            const actResult = args[0];
            console.log('Action Result (aka actResult)', actResult);
            const accessToken = actResult.token;
            console.log('accessToken', accessToken);
            sessionStorage.setItem('accessToken', accessToken);
        },
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
