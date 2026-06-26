<script lang="ts">
    let { helperText, id } = $props();
</script>

{#if helperText}
    <small id="{id}-helper" class="form-text text-info">
        {helperText}
    </small>
{/if}
