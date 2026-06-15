<script lang="ts">
    import Counter from '../lib/components/Counter.svelte';
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>Soul Forge</h1>

    <h2>
        new<br />SvelteKit app
    </h2>
    <p>
        try editing <strong>src/routes/+page.svelte</strong>
    </p>
    <Counter />
</section>
