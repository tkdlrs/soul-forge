<script lang="ts">
    /**
     * App Frontend for Logging in
     **/
    import LoginForm from '$lib/components/forms/resources/LoginForm.svelte';
    import type { LoginPageData } from '$lib/schemas/loginSchema';
    //
    let { data }: { data: LoginPageData } = $props();
    //
    let email = $state<string>(data.login.email);
    let password = $state<string>(data.login.password);

    //
    // const action = $state<string>(`/api/login`);
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Login</h1>
        </div>
        <div class="col-12">
            <LoginForm
                action="/api/login"
                method="POST"
                data={{
                    email,
                    password,
                }}
                isLoading={data.isLoading}
            />
        </div>
    </div>
</section>
