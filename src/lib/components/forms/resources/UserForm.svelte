<script lang="ts">
    /**
     * Form for a User.
     * For CREATE and EDIT.
     **/
    //
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '$lib/components/form-elements/Input.svelte';
    import {
        UserSchema,
        type UserCreateData,
        type UserErrors,
    } from '$lib/schemas/userSchema';
    //
    let errorsObj = $state<UserErrors>(null);
    // props...
    let { data, isLoading, action, method } = $props();
    // Form config
    const userConfig = {
        //
        slug: '/users/',
        schema: UserSchema,

        initial: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        } satisfies UserCreateData,
        errors: null satisfies UserErrors,

        //
        action,
        method,
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
        </div>
    {/snippet}
</FormWrapper>
