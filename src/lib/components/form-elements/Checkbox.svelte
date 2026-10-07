<script lang="ts" generics="T">
    import { untrack } from 'svelte';

    interface Props {
        value: T;
        group: T[];
        label: string; // required
        groupLabel?: string; // used by the fieldset legend
        disabled?: boolean;
        required?: boolean;
        errorMessage?: string;
        helpText?: string;
        inline?: boolean;
        isEqual?: (a: T, b: T) => boolean;
        onchange?: (group: T[]) => void;
    }
    //
    let {
        value,
        group = $bindable(),
        label,
        disabled = false,
        required = false,
        errorMessage,
        helpText,
        inline = false,
        isEqual = (a, b) => a === b,
        onchange,
    }: Props = $props();
    //
    function randomString(length = 36): string {
        const chars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let out = '';
        for (let i = 0; i < length; i++) {
            out += chars[Math.floor(Math.random() * chars.length)];
        }
        return out;
    }
    //
    const inputId = `cb-${randomString()}`;
    const helpId = untrack(() => helpText) ? `${inputId}-help` : undefined;
    const errorId = untrack(() => errorMessage)
        ? `${inputId}-error`
        : undefined;
    //
    const describedBy =
        [helpId, errorId].filter(Boolean).join(' ') || undefined;
    //
    let checked = $derived(group.some((item) => isEqual(item, value)));
    //
    function handleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.checked) {
            group = [...group, value];
        } else {
            group = group.filter((item) => !isEqual(item, value));
        }
        onchange?.(group);
    }
</script>

<div class="checkbox-wrapper form-check{inline ? ' form-check-inline' : ''}">
    <input
        type="checkbox"
        id={inputId}
        {checked}
        {disabled}
        {required}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        aria-invalid={errorMessage ? 'true' : undefined}
        onchange={handleChange}
        class="mr-2"
    />
    <label for={inputId} class:disabled>
        {label}
        {#if required}
            <span class="required text-info" aria-hidden="true">*</span>
        {/if}
    </label>

    {#if helpText}
        <p id={helpId} class="help-text">{helpText}</p>
    {/if}

    {#if errorMessage}
        <p id={errorId} class="error-text text-danger" role="alert">
            {errorMessage}
        </p>
    {/if}
</div>
