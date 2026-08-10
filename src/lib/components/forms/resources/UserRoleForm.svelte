<script lang="ts">
    import Select from '$lib/components/form-elements/Select.svelte';
    /**
     * Form for a User Role
     * For CREATE
     **/
    import { UserRoleSchema } from '$lib/schemas/userRolesSchema';
    import type {
        UserRoleErrors,
        UserRole,
    } from '$lib/schemas/userRolesSchema';
    import { onMount } from 'svelte';
    import FormWrapper from '../FormWrapper.svelte';
    //
    let errorsObj = $state<UserRoleErrors>(null);
    // props;
    let { data, isLoading, action, method } = $props();
    //
    const userRoleConfig = {
        //
        slug: '/user-roles/',
        schema: UserRoleSchema,
        //
        inital: {
            userId: data.userId,
            roleId: data.roleId,
        } satisfies UserRole,
        errors: null satisfies UserRoleErrors,
        //
        action,
        method,
        //
    };
    //
    let formData = $state<UserRole>(userRoleConfig.inital);
    //
    // Select Dropdown options
    let userIdOptions = $state<string[]>([]);
    async function getUsers() {
        try {
            const response = await fetch(`/api/users`);
            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`);
            }
            //
            const result = await response.json();
            console.log('result', result);
            //
            return result;
        } catch (err) {
            alert('ERROR');
            console.error('Could not get user Id options');
        }
    }
    //
    onMount(async () => {
        const users = await getUsers();
        userIdOptions = users.map((item) => {
            return {
                val: item.id,
                txt: `${item.lastName}, ${item.firstName}`,
            };
        });
    });
</script>

<FormWrapper
    config={userRoleConfig}
    bind:formData
    bind:errorsObj
    bind:isLoading
>
    {#snippet children({ formData }: { formData: UserRole })}
        <div class="form-row justify-content-between">
            <!-- ToDo: fix the fugly  -->
            <div>
                <Select
                    text="Choose User"
                    id="user-id"
                    options={userIdOptions}
                    bind:defaultValue={formData.userId}
                    errorText={errorsObj?.userId}
                />
            </div>
        </div>
    {/snippet}
</FormWrapper>
