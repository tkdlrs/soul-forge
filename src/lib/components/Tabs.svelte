<script lang="ts">
    import type { Snippet } from 'svelte';
    //
    type Tab = {
        id: string;
        title: string;
        content: Snippet;
    };
    //
    let {
        tabs,
        active = $bindable(),
    }: {
        tabs: Tab[];
        active?: string;
    } = $props();
    //
    if (!active && tabs.length) {
        active = tabs[0].id;
    }
    //
</script>

<!-- Nav tabs -->
<ul class="nav nav-tabs">
    {#each tabs as tab}
        <li class="nav-item" role="presentation">
            <button
                type="button"
                class="nav-link"
                class:active={active === tab.id}
                onclick={() => (active = tab.id)}
            >
                {tab.title}
            </button>
        </li>
    {/each}
</ul>

<!-- Tab panes -->
<div class="tab-content border border-top-0 p-3">
    {#each tabs as tab}
        {#if active === tab.id}
            <div class="tab-pane fade show active">
                {@render tab.content()}
            </div>
        {/if}
    {/each}
</div>
