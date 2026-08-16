<script lang="ts">
    // Componets
    import Header from './Header.svelte';
    // CSS
    import 'bootstrap/dist/css/bootstrap.min.css';
    //
    let { children, data } = $props();
    //
    function handleBoundaryError(error: unknown, reset: () => void) {
        console.error('Caught in root boundary:', error);
    }
</script>

<div class="app" data-sveltekit-preload-data="false">
    <Header user={data.user} />
    <!--  -->
    <main class="container">
        <div class="pt-5">
            <!--  -->
            <svelte:boundary onerror={handleBoundaryError}>
                {@render children()}
                {#snippet failed(err, reset)}
                    <div class="error-boundary">
                        <h1>Something went wrong</h1>
                        <p>
                            {err instanceof Error
                                ? err.message
                                : 'Unkown error'}
                        </p>
                        <button onclick={reset}> Try again </button>
                    </div>
                {/snippet}
            </svelte:boundary>
            <!--  -->
        </div>
    </main>
    <!--  -->
</div>
