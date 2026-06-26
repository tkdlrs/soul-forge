<script lang="ts">
    let {
        id,
        text,
        boldLabel = true,
        required = true,
        additionalCSS = '',
    } = $props();
</script>

<label class="{boldLabel ? 'font-weight-bold' : ''} {additionalCSS}" for={id}>
    {text}
    {#if required}
        <span class="text-info">*</span>
    {/if}
</label>
