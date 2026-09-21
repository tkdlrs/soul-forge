<script lang="ts">
    //
    type Props = {
        direction: 'left' | 'right';
        disabled?: boolean;
        callMethod?: (() => void) | undefined;
    };
    //
    let {
        direction,
        disabled = false,
        callMethod = undefined,
    }: Props = $props();
</script>

<button
    class="btn btn-primary btn-sm text-white rounded-4 overflow-hidden{disabled
        ? ' disabled'
        : ''}"
    {disabled}
    onclick={() => {
        if (callMethod) {
            callMethod();
        }
    }}
>
    {#if direction === 'left'}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="white"
            width="50"
            height="50"
            preserveAspectRatio=""
        >
            <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
                d="M41.4 342.6C28.9 330.1 28.9 309.8 41.4 297.3L169.4 169.3C178.6 160.1 192.3 157.4 204.3 162.4C216.3 167.4 224 179.1 224 192L224 256L560 256C586.5 256 608 277.5 608 304L608 336C608 362.5 586.5 384 560 384L224 384L224 448C224 460.9 216.2 472.6 204.2 477.6C192.2 482.6 178.5 479.8 169.3 470.7L41.3 342.7z"
            />
        </svg>
        <span class="visually-hidden"> left arrow </span>
    {:else if direction === 'right'}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="white"
            width="50"
            height="50"
            preserveAspectRatio=""
        >
            <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
                d="M598.6 297.4C611.1 309.9 611.1 330.2 598.6 342.7L470.6 470.7C461.4 479.9 447.7 482.6 435.7 477.6C423.7 472.6 416 460.9 416 448L416 384L80 384C53.5 384 32 362.5 32 336L32 304C32 277.5 53.5 256 80 256L416 256L416 192C416 179.1 423.8 167.4 435.8 162.4C447.8 157.4 461.5 160.2 470.7 169.3L598.7 297.3z"
            />
        </svg>

        <span class="visually-hidden"> right arrow </span>
    {/if}
</button>
