<script lang="ts">
    import { pascalCase } from '../../helpers/formatters.js';
    import ErrorText from './ErrorText.svelte';
    import HelperText from './HelperText.svelte';
    import Label from './Label.svelte';
    //
    let {
        id,
        text,
        type = 'text',
        helperText = null,
        required = true,
        errorText = $bindable(null),
        defaultValue = $bindable(),
        placeholder = '',
        onchange = undefined,
        oninput = undefined,
        step = null,
        min = null,
        max = null,
    } = $props();
    // svelte-ignore state_referenced_locally
    const helperAttribute = helperText != null ? `${id}-helper` : null;
</script>

<Label {id} {text} {required} />
<input
    class="form-control{errorText != null ? ' is-invalid' : ''}"
    {id}
    name={pascalCase(text)}
    {type}
    {required}
    {placeholder}
    {step}
    {min}
    {max}
    aria-describedby={helperAttribute}
    bind:value={defaultValue}
    autocomplete="off"
    {onchange}
    {oninput}
/>
<HelperText {id} {helperText} />
<ErrorText {errorText} />
