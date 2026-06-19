<script lang="ts">
    let { data } = $props();
    //
    let firstName = $state<string>(data.user.firstName);
    let lastName = $state<string>(data.user.lastName);
    let email = $state<string>(data.user.email);
    //
    async function editUser(id: number) {
        await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
            }),
        });
        //
        window.location.assign('/app/users/');
        return;
        //
    }
</script>

<div class="row">
    <div class="col-12 mb-5">
        <h1>User</h1>
    </div>
    <div class="col-12 col-md-6">
        <h2 class="h4 fw-bold">Show</h2>
        <p><strong>First Name</strong>: {data.user.firstName}</p>
        <p><strong>Last Name</strong>: {data.user.lastName}</p>
        <p><strong>Email</strong>: {data.user.email}</p>
    </div>
    <div class="col-12 col-md-6">
        <h2 class="h4 fw-bold">Edit</h2>
        <form class="d-grid" onsubmit={() => editUser(data.user.id)}>
            <input bind:value={firstName} placeholder="First Name" /> <br />
            <input bind:value={lastName} placeholder="Last Name" /><br />
            <input bind:value={email} placeholder="email" /><br />
            <button class="btn btn-info btn-sm" type="submit">
                Edit user
            </button>
        </form>
    </div>
</div>
