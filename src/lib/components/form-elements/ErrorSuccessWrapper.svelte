<script lang="ts">
    import Alert from '../Alert.svelte';

    let {
        children,
        viewSuccess = $bindable(false),
        successMessage = $bindable('Message successfully sent'),
        viewError = $bindable(false),
        errorMessage = $bindable('Error'),
    } = $props();
</script>

<div class="row mt-5 mb-3">
    <div class="col-12">
        <Alert
            bind:display={viewSuccess}
            alertColor="alert-success"
            bind:text={successMessage}
        />
    </div>
    <div class="col-12">
        <Alert
            bind:display={viewError}
            alertColor="alert-danger"
            bind:text={errorMessage}
        />
    </div>
    {#if !viewSuccess}
        <div class="col-12 col-lg-12">
            <!--  -->
            {@render children?.()}
            <!--  -->
        </div>
    {/if}
</div>
