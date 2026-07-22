<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    //
    Chart.register(...registerables);
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    //
    let { labels, data }: { labels: string[]; data: number[] } = $props();
    //
    onMount(() => {
        //
        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        data,
                        borderColor: 'rgb(68, 148, 218)',
                        spanGaps: false,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
        //
        return () => chart.destroy();
    });
    //
</script>

<canvas bind:this={canvas}></canvas>
