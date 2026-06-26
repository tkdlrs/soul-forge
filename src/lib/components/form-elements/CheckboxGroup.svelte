<!-- CheckboxGroup.svelte -->
<script lang="ts" generics="T">
    import Checkbox from './Checkbox.svelte';
    import ErrorText from './ErrorText.svelte';

    interface Props {
        legend: string;
        items: {
            value: T;
            label: string;
            helpText?: string;
            required: boolean;
        }[];
        group: T[];
        disabled?: boolean;
        required?: boolean;
        inline?: boolean;
        isEqual?: (a: T, b: T) => boolean;
        onchange?: (group: T[]) => void;
        errorText?: string | null;
    }

    let {
        legend,
        items,
        group = $bindable(),
        disabled = false,
        required = true,
        inline = false,
        isEqual,
        onchange,
        errorText = $bindable(null),
    }: Props = $props();

    // Polite live region — announces count after each change (4.1.3 AAA)
    let announcement = $state('');

    function handleChange(newGroup: T[]) {
        const count = newGroup.length;
        announcement =
            count === 0
                ? 'No items selected'
                : `${count} of ${items.length} selected`;
        onchange?.(newGroup);
    }
</script>

<fieldset>
    <legend
        class="font-weight-bold mb-3"
        style="font-weight:normal; color:#212529; font-size:unset;"
    >
        {legend}
        {#if required}<span class="text-info" aria-hidden="true"> *</span>{/if}
    </legend>

    {#each items as item}
        <Checkbox
            value={item.value}
            bind:group
            label={item.label}
            helpText={item.helpText}
            {disabled}
            required={item.required}
            {inline}
            {isEqual}
            onchange={handleChange}
        />
    {/each}
    <ErrorText {errorText} />
</fieldset>

<!-- aria-live region is visually hidden but announced by screen readers -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
    {announcement}
</div>
