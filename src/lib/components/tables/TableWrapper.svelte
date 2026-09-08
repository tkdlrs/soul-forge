<script lang="ts">
    interface Props {
        additionalCSS?: string;
        headers?: string[];
        children?: import('svelte').Snippet;
    }
    let { additionalCSS = '', headers = [], children }: Props = $props();
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
        <tbody>
            {@render children?.()}
        </tbody>
    </table>
</div>

<style>
    table.table > thead {
        --bs-table-bg: #141414 !important;
        --bs-table-color: #c8c8c8 !important;
    }
</style>
