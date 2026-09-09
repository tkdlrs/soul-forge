<script lang="ts">
    import type { Snippet } from 'svelte';
    //
    interface Props {
        additionalCSS?: string;
        headers?: string[];
        tbody?: Snippet;
        tfoot?: Snippet;
    }
    let { additionalCSS = '', headers = [], tbody, tfoot }: Props = $props();
</script>

<div class="table-responsive">
    <table
        class="table table-bordered table-sm text-center w-100 {additionalCSS}"
    >
        <thead>
            <tr>
                {#each headers as header}
                    <th scope="col">{@html header}</th>
                {/each}
            </tr>
        </thead>
        {#if tbody != undefined}
            <tbody>
                {@render tbody()}
            </tbody>
        {/if}
        {#if tfoot != undefined}
            <tfoot>
                {@render tfoot()}
            </tfoot>
        {/if}
    </table>
</div>

<style>
    table.table {
        --bs-table-color: --bs-body-color();
    }
    table.table > thead,
    tfoot {
        --bs-table-bg: #141414 !important;
        --bs-table-color: #c8c8c8 !important;
    }
</style>
