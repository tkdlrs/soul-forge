<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onDestroy, onMount } from 'svelte';
    //
    Chart.register(...registerables);
    let canvas: HTMLCanvasElement;
    let chart: Chart;
    //
    const skipped = (ctx, value) =>
        ctx.p0.skip || ctx.p1.skip ? value : undefined;
    const genericOptions = {
        fill: false,
        interaction: {
            intersect: false,
        },
        radius: 0,
    };
    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const WEEKDAYS = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    //
    onMount(() => {
        //
        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: WEEKDAYS,
                datasets: [
                    {
                        label: 'one',
                        data: [65, 59, NaN, 48, 56, 57, 40],
                        borderColor: 'rgb(75, 192, 192)',
                        segment: {
                            borderColor: (ctx) =>
                                skipped(ctx, 'rgb(0,0,0,0.2)'),

                            borderDash: (ctx) => skipped(ctx, [6, 6]),
                        },
                        spanGaps: false,
                    },
                ],
            },
            options: genericOptions,
        });

        //
        return () => chart.destroy();
    });
    //
    // onDestroy(() => {
    //     chart.destroy();
    // });
</script>

<canvas bind:this={canvas}></canvas>
