<script lang="ts">
    /**
     * Form for a User.
     * For CREATE and EDIT.
     **/
    //
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    import {
        UserCreateSchema,
        type UserCreateData,
        type UserErrors,
    } from '$lib/schemas/userSchema';
    import { untrack } from 'svelte';
    //
    let errorsObj = $state<UserErrors>(null);
    //
    let { data, isLoading, action, method } = $props();

    // Form config
    const userConfig = {
        //
        slug: '/users/',
        schema: UserCreateSchema,
        //
        initial: {
            firstName: untrack(() => data.firstName),
            lastName: untrack(() => data.lastName),
            email: untrack(() => data.email),
            password: untrack(() => data.password),
        } satisfies UserCreateData,
        errors: null satisfies UserErrors,
        //
        action: untrack(() => action),
        method: untrack(() => method),
        //
    };
    //
    let formData = $state<UserCreateData>(userConfig.initial);
</script>

<FormWrapper config={userConfig} bind:formData bind:errorsObj bind:isLoading>
    {#snippet children({ formData }: { formData: UserCreateData })}
        <div class="form-row justify-content-between">
            <Input
                text="First Name"
                id="first-name"
                bind:defaultValue={formData.firstName}
                errorText={errorsObj?.firstName}
            />
            <Input
                text="Last Name"
                id="last-name"
                bind:defaultValue={formData.lastName}
                errorText={errorsObj?.lastName}
            />
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
<p>
    first Name: {formData.firstName} <br />
    last Name: {formData.lastName} <br />
    email: {formData.email} <br />
    password: {formData.password}
</p>
