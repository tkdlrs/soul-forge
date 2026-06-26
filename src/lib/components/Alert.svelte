<script lang="ts">
    let { alertColor, display = $bindable(), text = $bindable() } = $props();
</script>

<div class="alert {alertColor} {display ? 'd-block' : 'd-none'}" role="alert">
    <div>{@html text}</div>
</div>
