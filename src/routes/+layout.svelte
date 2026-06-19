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
        <div class="pt-5">
            {@render children()}
        </div>
    </main>
    <!--  -->
</div>
