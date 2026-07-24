<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    //
    Chart.register(...registerables);
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    //
    let { labels, data }: { labels: string[]; data: Array<number | null> } =
        $props();
    //
    let verticalMax = $derived.by<number>(() => {
        const dynamicMax = data.reduce((max: number, val: number | null) => {
            if (val === null) {
                val = 0;
            }
            //
            return val > max ? val : max;
        }, 0);
        //
        return dynamicMax + 10;
    });
    let verticalMin = $derived.by<number>(() => {
        const dynamicMin = data.reduce((min: number, val: number | null) => {
            if (val === null) {
                val = 0;
            }
            //
            return val < min ? val : min;
        }, 0);
        //
        // return dynamicMin === 0 ? verticalMax - 40 : dynamicMin;
        return dynamicMin;
    });
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
                scales: {
                    y: {
                        min: verticalMin,
                        max: verticalMax,
                    },
                },
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
