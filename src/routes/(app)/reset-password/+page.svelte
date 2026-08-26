<script lang="ts">
    import ResetPasswordForm from '$lib/components/forms/resources/ResetPasswordForm.svelte';
    /**
     * App Frontend for Reseting Password
     **/
    import type { ResetPasswordPageData } from '$lib/schemas/resetPasswordSchema';
    //
    let { data }: { data: ResetPasswordPageData } = $props();
    //
    let email = $state<string>(data.resetPassword.email);
    //
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Reset Password</h1>
        </div>
        <div class="col-12">
            <!-- ToDo:// this needes an endpoint. isn't able to do much without one... -->
            <ResetPasswordForm
                action="/api/auth/reset-password"
                method="POST"
                data={{ email }}
                isLoading={data.isLoading}
            />
        </div>
    </div>
</section>
