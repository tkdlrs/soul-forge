<script lang="ts">
    /*
     * Tabs for training a skill
     **/
    import {
        calculateSessionDurationInMilliseconds,
        convertMillisecondsToMinutes,
        getWeekDay,
        toDateTimeLocal,
    } from '$lib/helpers/formatters';
    import type { SkillSession } from '$lib/schemas/skillSessionSchema';
    import LineChart from '../charts/LineChart.svelte';
    import TabsWrapper from './TabsWrapper.svelte';
    //
    interface Props {
        skillSessions: SkillSession[];
    }
    let { skillSessions }: Props = $props();
    //
    const WEEKDAYS = $state<string[][]>([
        ['Sunday'],
        ['Monday'],
        ['Tuesday'],
        ['Wednesday'],
        ['Thursday'],
        ['Friday'],
        ['Saturday'],
    ]);
    // Tabs stuff
    const tabs = [
        {
            id: 'current-view',
            title: 'Current View',
            content: currentView,
        },
        {
            id: 'week-view',
            title: 'Week View',
            content: weekView,
        },
        {
            id: 'sales',
            title: 'Sales',
            content: sales,
        },
    ];
    //
    let active = $state('current-view');
    // date as string to milliseconds
    let dateToSessionDuration = $derived.by<Record<string, number>>(() => {
        const output: Record<string, number> = {};
        //
        for (let i = 0; i < skillSessions.length; i++) {
            const session = skillSessions[i];
            // console.log('session', session);
            if (!session.endDateTime) {
                continue;
            }
            //
            const START_ISO_DATE = toDateTimeLocal(
                new Date(session.startDateTime),
            ).slice(0, 10);
            console.log('START_ISO_DATE', START_ISO_DATE);
            const END_ISO_DATE = toDateTimeLocal(
                new Date(session.endDateTime),
            ).slice(0, 10);
            console.log('END_ISO_DATE', END_ISO_DATE);
            //
            if (START_ISO_DATE.slice(0, 10) !== END_ISO_DATE.slice(0, 10)) {
                throw new Error(
                    'Skill Session Start and Skill Session End are on different days.',
                );
            }
            //
            if (output.hasOwnProperty(START_ISO_DATE) === true) {
                output[START_ISO_DATE] +=
                    calculateSessionDurationInMilliseconds(
                        session.startDateTime,
                        session.endDateTime,
                    );
            } else {
                output[START_ISO_DATE] = calculateSessionDurationInMilliseconds(
                    session.startDateTime,
                    session.endDateTime,
                );
            }
            //
        }
        //
        return output;
    });
    $inspect(dateToSessionDuration);

    const toy = [65, 59, NaN, 48, 56, 57, 40];
    //
    let currentViewLabels = $derived.by<string[][]>(() => {
        const TODAY = new Date();
        const len = WEEKDAYS.length;
        //
        const TODAY_AS_ISO_STRING = toDateTimeLocal(TODAY).slice(0, 10);
        const TODAY_YEAR_MONTH = TODAY_AS_ISO_STRING.slice(0, 8);
        const TODAY_DATE = Number(TODAY_AS_ISO_STRING.slice(8, 10));
        const TODAY_DAY: number = Number(getWeekDay(TODAY));
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            const wrappedIndex = (TODAY_DAY + offset + len) % len;
            const dateOfInterest: number = TODAY_DATE + offset;
            const currentDay = [
                `${WEEKDAYS[wrappedIndex]}`,
                `${TODAY_YEAR_MONTH}${dateOfInterest.toString().padStart(2, '0')}`,
            ];
            updatedArr.push(currentDay);
        }
        //
        return updatedArr;
    });
    //
    let currentViewData = $derived.by<Array<number | null>>(() => {
        const TODAY = new Date();
        const TODAY_AS_ISO_STRING = toDateTimeLocal(TODAY).slice(0, 10);
        const TODAY_YEAR_MONTH = TODAY_AS_ISO_STRING.slice(0, 8);
        console.log('TODAY_YEAR_MONTH', TODAY_YEAR_MONTH);
        const TODAY_DAY = Number(TODAY_AS_ISO_STRING.slice(8, 10));
        console.log('TODAY_DAY', TODAY_DAY);
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            // const
            const dateIndex = `${TODAY_YEAR_MONTH}${(TODAY_DAY + offset).toString().padStart(2, '0')}`;
            console.log('dateIndex', dateIndex);
            const currentInMilliseconds = dateToSessionDuration[dateIndex];
            console.log('currentInMilliseconds', currentInMilliseconds);
            const currentInMinutes = convertMillisecondsToMinutes(
                currentInMilliseconds,
            );
            console.log('currentInMinutes', currentInMinutes);
            if (currentInMilliseconds) {
                updatedArr.push(currentInMinutes);
            } else {
                console.log('push a null');
                updatedArr.push(null);
            }
        }
        //
        console.log('updatedArr:', updatedArr);
        return updatedArr;
    });
    //
</script>

<!--  -->
{#snippet currentView()}
    <div class="row">
        <div class="col-12">
            <h2>Current View</h2>
            <p>
                Current view display today. and three days before and three days
                after
            </p>
            <LineChart labels={currentViewLabels} data={currentViewData} />
        </div>
    </div>
{/snippet}
<!--  -->
{#snippet weekView()}
    <div class="row justify-content-between align-content-center">
        <div class="col-12">
            <h2 class="text-center">Week View</h2>
        </div>
        <div class="col-1 align-self-center d-flex justify-content-center">
            <button
                class="btn btn-primary btn-sm text-white rounded-4"
                onclick={() => {
                    alert('left');
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    fill="white"
                    width="50"
                    height="50"
                    preserveAspectRatio=""
                >
                    <!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
                        d="M41.4 342.6C28.9 330.1 28.9 309.8 41.4 297.3L169.4 169.3C178.6 160.1 192.3 157.4 204.3 162.4C216.3 167.4 224 179.1 224 192L224 256L560 256C586.5 256 608 277.5 608 304L608 336C608 362.5 586.5 384 560 384L224 384L224 448C224 460.9 216.2 472.6 204.2 477.6C192.2 482.6 178.5 479.8 169.3 470.7L41.3 342.7z"
                    />
                </svg>
                <span class="visually-hidden"> left arrow </span>
            </button>
        </div>
        <div class="col-10">
            <LineChart
                labels={[['one'], ['two'], ['null'], ['three'], ['four']]}
                data={[0, 2, null, 3, 4]}
            />
        </div>
        <div class="col-1 align-self-center d-flex justify-content-center">
            <button
                class="btn btn-primary btn-sm text-white rounded-4"
                onclick={() => {
                    alert('right');
                }}
            >
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
            </button>
        </div>
    </div>
{/snippet}

<!--  -->
{#snippet sales()}
    <h2>Sales</h2>
    <LineChart labels={WEEKDAYS} data={toy} />
{/snippet}

<div class="my-5">
    <TabsWrapper {tabs} bind:active></TabsWrapper>
    <p>Current: {active}</p>
</div>
