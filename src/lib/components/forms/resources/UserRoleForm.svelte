<script lang="ts">
    /**
     * Form for a User Role
     * For CREATE
     **/
    import { onMount } from 'svelte';
    // Schema
    import { UserRoleSchema } from '$lib/schemas/userRolesSchema';
    import type {
        UserRoleErrors,
        UserRole,
    } from '$lib/schemas/userRolesSchema';
    import type { RoleWithId } from '$lib/schemas/roleSchema';
    import type { UserWithId } from '$lib/schemas/userSchema';
    // Components
    import Select from '$lib/components/form-elements/Select.svelte';
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
    // Select Dropdown options
    type dropdownOptions = {
        value: string;
        txt: string;
    };
    //
    let userIdOptions = $state<dropdownOptions[]>([]);
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
            alert('Error');
            console.error('Could not get user Id options');
        }
    }
    //
    let roleIdOptions = $state<dropdownOptions[]>([]);
    async function getRoles() {
        try {
            const response = await fetch(`/api/roles`);
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
            console.error('Could not get role id options');
        }
    }
    //
    onMount(async () => {
        const users: UserWithId[] = await getUsers();
        //
        userIdOptions = users.map((item: UserWithId) => {
            return {
                value: String(item.id),
                txt: `${item.lastName}, ${item.firstName}`,
            };
        });
        //
        //
        const roles: RoleWithId[] = await getRoles();
        roleIdOptions = roles.map((role: RoleWithId) => {
            return {
                value: role.id,
                txt: role.name,
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
            <div>
                <Select
                    text="Choose User"
                    id="user-id"
                    options={userIdOptions}
                    bind:defaultValue={formData.userId}
                    errorText={errorsObj?.userId}
                />
            </div>
            <div>
                <Select
                    text="Choose role"
                    id="user-id"
                    options={roleIdOptions}
                    bind:defaultValue={formData.roleId}
                    errorText={errorsObj?.roleId}
                />
            </div>
        </div>
    {/snippet}
</FormWrapper>
