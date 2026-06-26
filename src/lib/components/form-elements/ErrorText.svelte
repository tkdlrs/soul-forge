<script lang="ts">
    let { errorText } = $props();
</script>

{#if errorText}
    <small class="form-text text-danger">
        {errorText}
    </small>
{/if}
