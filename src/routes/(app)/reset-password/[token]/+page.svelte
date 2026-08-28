<script lang="ts">
    /**
     * App Frontend for Updating Password
     **/
    import UpdatePasswordForm from '$lib/components/forms/resources/UpdatePasswordForm.svelte';
    import type { UpdatePasswordPageData } from '$lib/schemas/updatePasswordSchema';
    //
    let { data }: { data: UpdatePasswordPageData } = $props();
    //
    let password = $state<string>(''); //data.UpdatePassword.password
    let confirmPassword = $state<string>(''); //data.UpdatePassword.confirmPassword
    //
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Update Password</h1>
        </div>
        <div class="col-12">
            <!-- ToDo:// this needes an endpoint. isn't able to do much without one... -->
            <UpdatePasswordForm
                action="/api/auth/update-password"
                method="POST"
                data={{ password, confirmPassword }}
                isLoading={data.isLoading}
            />
        </div>
    </div>
</section>
