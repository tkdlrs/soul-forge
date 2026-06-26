<script lang="ts">
    interface Props {
        btnText?: string;
        btnColor?: string;
        onclick?: (event: MouseEvent) => void;
    }

    let {
        btnText = 'Submit',
        btnColor = 'btn-primary',
        onclick,
    }: Props = $props();
</script>

<button type="submit" class="btn {btnColor}" {onclick}>
    {btnText}
</button>
