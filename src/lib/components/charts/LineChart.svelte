<script lang="ts">
    import { Chart as ChartJS, registerables } from 'chart.js';
    import { onMount } from 'svelte';
    //
    ChartJS.register(...registerables);
    let canvas: HTMLCanvasElement;
    let chart: ChartJS;
    //
    type Props = {
        labels: string[][];
        data: Array<number | null>;
        strLineColorRGB?: string;
        strFillColorRGBA?: string;
    };
    //
    let {
        labels,
        data,
        strLineColorRGB = '0, 0, 0',
        strFillColorRGBA = `${strLineColorRGB}, .3`,
    }: Props = $props();
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
        chart = new ChartJS(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        data,
                        borderColor: `rgba(${strLineColorRGB})`,
                        spanGaps: false,
                        backgroundColor: `rgba(${strFillColorRGBA})`,
                        fill: true,
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
    $effect(() => {
        if (!chart) return;
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        //
        if (!chart.options.scales) {
            throw new Error('chart.options.scales is not defined');
        }
        if (!chart.options.scales.y) {
            throw new Error('chart.options.scales.y is not defined');
        }
        chart.options.scales.y.min = verticalMin;
        chart.options.scales.y.max = verticalMax;
        //
        chart.update();
    });
    //
</script>

<div>
    <canvas bind:this={canvas}></canvas>
</div>
