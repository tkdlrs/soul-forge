<script lang="ts">
    import Header from './Header.svelte';

    import 'bootstrap/dist/css/bootstrap.min.css';
    //
    let { children } = $props();
</script>

<div class="app">
    <Header />
    <!--  -->
    <main class="container">
        {@render children()}
    </main>
    <!--  -->
</div>
