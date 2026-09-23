<script lang="ts">
    /*
     * Tabs for training a skill
     **/
    import {
        calculateSessionDurationInMilliseconds,
        convertMillisecondsToMinutes,
        formatDateTimeToLocale,
        getWeekDay,
        toDateTimeLocal,
    } from '$lib/helpers/formatters';
    import type { SkillSession } from '$lib/schemas/skillSessionSchema';
    import {
        daysAhead,
        daysBefore,
        getSevenDatesToToday,
        WEEKDAYS,
        weekViewBaseLabels,
    } from '$lib/utils/timeUtils';
    import LineChart from '../charts/LineChart.svelte';
    import Arrow from '../icon-buttons/Arrow.svelte';
    import TabsWrapper from './TabsWrapper.svelte';
    //
    interface Props {
        skillSessions: SkillSession[];
    }
    let { skillSessions }: Props = $props();
    //
    const TODAY = new Date();
    let today = $state<Date>(TODAY);
    const TODAY_DAY: number = Number(getWeekDay(TODAY));
    //
    const WEEKDAYS_AS_ARRAYS = $state<string[][]>(
        WEEKDAYS.map((item) => [item]),
    );
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
    ];
    //
    let active = $state('week-view');
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
            // console.log('START_ISO_DATE', START_ISO_DATE);
            const END_ISO_DATE = toDateTimeLocal(
                new Date(session.endDateTime),
            ).slice(0, 10);
            // console.log('END_ISO_DATE', END_ISO_DATE);
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
    // $inspect(dateToSessionDuration);
    //
    let currentViewLabels = $derived.by<string[][]>(() => {
        const len = WEEKDAYS_AS_ARRAYS.length;
        //
        const TODAY_AS_ISO_STRING = toDateTimeLocal(TODAY).slice(0, 10);
        const TODAY_YEAR_MONTH = TODAY_AS_ISO_STRING.slice(0, 8);
        const TODAY_DATE = Number(TODAY_AS_ISO_STRING.slice(8, 10));
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            const wrappedIndex = (TODAY_DAY + offset + len) % len;
            const dateOfInterest: number = TODAY_DATE + offset;
            const currentDay = [
                `${WEEKDAYS_AS_ARRAYS[wrappedIndex]}`,
                `${TODAY_YEAR_MONTH}${dateOfInterest.toString().padStart(2, '0')}`,
            ];
            updatedArr.push(currentDay);
        }
        //
        return updatedArr;
    });
    let currentViewData = $derived.by<Array<number | null>>(() => {
        const TODAY_AS_ISO_STRING = toDateTimeLocal(TODAY).slice(0, 10);
        const TODAY_YEAR_MONTH = TODAY_AS_ISO_STRING.slice(0, 8);
        console.log('TODAY_YEAR_MONTH', TODAY_YEAR_MONTH);
        const TODAY_DATE = Number(TODAY_AS_ISO_STRING.slice(8, 10));
        console.log('TODAY_DATE', TODAY_DATE);
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            // const
            const dateIndex = `${TODAY_YEAR_MONTH}${(TODAY_DATE + offset).toString().padStart(2, '0')}`;
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
    let leftArrowDisabled = $state<boolean>(false);
    let rightArrowDisabled = $derived.by<boolean>(() => {
        return (
            formatDateTimeToLocale(today).slice(0, 10) >=
            formatDateTimeToLocale(TODAY).slice(0, 10)
        );
    });
    // $inspect(today);
    // $inspect(rightArrowDisabled);
    //
    let weekViewChartLabels = $derived.by<Array<string[]>>(() => {
        const baseLabels = weekViewBaseLabels(today);
        const dateLabels = getSevenDatesToToday(today);
        //
        // console.log('weekViewChartLabels. did something?');
        // console.log('today is?', today);
        //
        let outputArray = baseLabels.map((item, idx) => {
            const current = item;
            return [...current, dateLabels[idx]];
        });
        //
        return outputArray;
    });
    // $inspect(weekViewChartLabels);
    let weekViewChartData = $derived.by<Array<number | null>>(() => {
        const dateLabels = getSevenDatesToToday(today);
        const output = dateLabels.map((item) =>
            convertMillisecondsToMinutes(dateToSessionDuration[item]),
        );
        //
        // console.log('weekViewChartData did something');
        // console.log('output', output);
        //
        return output;
    });
    //
</script>

<!--  -->
{#snippet currentView()}
    <div class="row">
        <div class="col-12">
            <h2>Current View</h2>
            <p class="small">
                Current view display today, three days before and three days
                after.
            </p>
            <LineChart
                labels={currentViewLabels}
                data={currentViewData}
                strLineColorRGB={'255, 0, 255'}
                strFillColorRGBA={'46, 190, 49, .8'}
            />
        </div>
    </div>
{/snippet}
<!--  -->
{#snippet weekView()}
    <div class="row justify-content-between align-content-center">
        <div class="col-12">
            <h2>Week View</h2>
            <p class="small">
                Week view displays the previous seven days ending on today. Then
                you can toggle back and forth.
            </p>
        </div>
        <div class="col-2 align-self-center d-flex justify-content-center">
            <Arrow
                direction="left"
                disabled={leftArrowDisabled}
                callMethod={() => {
                    console.log('today (before)', today);
                    today = daysBefore(today, 7);
                    console.log('today (after)', today);
                }}
            />
        </div>
        <div class="col-8">
            <!--  -->
            <div class="row">
                <div class="col-12">
                    <LineChart
                        labels={weekViewChartLabels}
                        data={weekViewChartData}
                        strLineColorRGB={'255, 0, 255'}
                        strFillColorRGBA={'46, 190, 49, .8'}
                    />
                </div>
            </div>
            <!--  -->
        </div>
        <div class="col-2 align-self-center d-flex justify-content-center">
            <Arrow
                direction="right"
                disabled={rightArrowDisabled}
                callMethod={() => {
                    today = daysAhead(today, 7);
                }}
            />
        </div>
    </div>
{/snippet}

<!--  -->
<div class="my-5">
    <TabsWrapper {tabs} bind:active></TabsWrapper>
    <p>Current: {active}</p>
</div>
<!--  -->
