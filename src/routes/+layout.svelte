<script lang="ts">
    // Componets
    import Header from './Header.svelte';
    // CSS
    import 'bootstrap/dist/css/bootstrap.min.css';
    //
    let { children, data } = $props();
</script>

<div class="app">
    <Header user={data.user} />
    <!--  -->
    <main class="container">
        <div class="pt-5">
            {@render children()}
        </div>
    </main>
    <!--  -->
</div>
