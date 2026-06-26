<script lang="ts">
    import { pascalCase } from '../../helpers/formatters.js';
    import ErrorText from './ErrorText.svelte';
    import HelperText from './HelperText.svelte';
    import Label from './Label.svelte';
    //
    let {
        text,
        id,
        helperText = null,
        required = true,
        errorText = null,
        defaultValue = $bindable(''),
        rows = 6,
    } = $props();
    // rows = "3";
    // svelte-ignore state_referenced_locally
    const helperAttribute = helperText != null ? `${id}-helper` : null;
</script>

<Label {id} {text} {required} />
<textarea
    class="form-control{errorText != null ? ' is-invalid' : ''}"
    {id}
    name={pascalCase(text)}
    {rows}
    {required}
    aria-describedby={helperAttribute}
    bind:value={defaultValue}
></textarea>
<HelperText {id} {helperText} />
<ErrorText {errorText} />
