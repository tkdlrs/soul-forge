<script lang="ts">
    /**
     * App Frontend 'Users' CREATE
     **/
    import UserForm from '$lib/components/forms/resources/UserForm.svelte';
    //
    let firstName = $state<string>('');
    let lastName = $state<string>('');
    let email = $state<string>('');
    //
    let { data } = $props();
</script>

<section class="p-5">
    <div class="row mb-5">
        <div class="col-12">
            <h1>Create a Users</h1>
        </div>
        <div class="col-12">
            <div class="my-5">
                <UserForm
                    action="/api/users"
                    method="POST"
                    data={{ firstName, lastName, email }}
                    isLoading={data.isLoading}
                />
            </div>
        </div>
    </div>
</section>
