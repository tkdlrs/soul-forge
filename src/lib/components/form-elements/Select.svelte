<script lang="ts">
    import { pascalCase } from '../../helpers/formatters.js';
    import ErrorText from './ErrorText.svelte';
    import HelperText from './HelperText.svelte';
    import Label from './Label.svelte';
    let {
        id,
        text,
        options = [],
        helperText = null,
        required = true,
        errorText = $bindable(null),
        defaultValue = $bindable(),
        onchange = undefined,
    } = $props();
    //
</script>

<Label {text} {id} {required} />
<select
    class="custom-select{errorText != null ? ' is-invalid' : ''}"
    {id}
    name={pascalCase(text)}
    {required}
    bind:value={defaultValue}
    {onchange}
>
    <option selected disabled value="">Choose...</option>
    {#each options as { txt, value }}
        <option {value}>{txt}</option>
    {/each}
</select>
<HelperText {id} {helperText} />
<ErrorText {errorText} />
