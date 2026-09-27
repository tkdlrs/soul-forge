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
    import { untrack } from 'svelte';

    // Implementation
    let errorsObj = $state<LoginErrors>(null);
    // props
    let { data, isLoading, action, method } = $props();
    // Form config
    const loginConfig = {
        //
        slug: `/`,
        schema: LoginSchema,

        initial: {
            email: untrack(() => data.email),
            password: untrack(() => data.password),
        } satisfies Login,
        errors: null satisfies LoginErrors,

        //
        action: untrack(() => action),
        method: untrack(() => method),
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
