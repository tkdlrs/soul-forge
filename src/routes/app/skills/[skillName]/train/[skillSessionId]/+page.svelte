<script lang="ts">
    /**
     * Frontend 'Skill' page SHOW
     * INDEX for a specific the 'Skill Sessions' of a specific 'Skill'
     **/
    import { resolve } from '$app/paths';
    import LineChart from '$lib/components/charts/LineChart.svelte';
    import TrainASkillForm from '$lib/components/forms/resources/TrainASkillForm.svelte';
    import Tabs from '$lib/components/Tabs.svelte';
    import {
        calculateSessionDurationInMilliseconds,
        convertMillisecondsToMinutes,
        convertToCurrancyRange,
        formatDateTimeToLocale,
        formatTimeSpentInMilliseconds,
        getSkillsTotalMilliseconds,
        toDateTimeLocal,
    } from '$lib/helpers/formatters';
    import {
        currentXpEarnedAtLevel,
        levelProgress,
        levelToXP,
        minutesToXP,
        remainingXpToNextLevel,
        xpToLevel,
        xpToNextLevel,
    } from '$lib/helpers/rpgLeveling';
    //
    import type {
        TrainSkillPageData,
        SkillSession,
    } from '$lib/schemas/skillSessionSchema';
    import { onMount } from 'svelte';
    //
    let { data }: { data: TrainSkillPageData } = $props();
    // $inspect(data);
    //
    let skillSessions = $state<SkillSession[]>(data.skillSessions);
    //
    let arrayEachSkillSessionDurationInMilliseconds = $derived.by<number[]>(
        () => {
            return skillSessions.map((session) =>
                calculateSessionDurationInMilliseconds(
                    session.startDateTime,
                    session.endDateTime,
                ),
            );
        },
    );
    let currentMillisecondsOnSkill = $derived.by<number>(() =>
        arrayEachSkillSessionDurationInMilliseconds.reduce(
            (total, num) => total + num,
            0,
        ),
    );
    let currentMinutesOnSkill = $derived.by<number>(() =>
        convertMillisecondsToMinutes(currentMillisecondsOnSkill),
    );
    let currentTotalXp = $derived.by<number>(() =>
        minutesToXP(currentMinutesOnSkill),
    );
    //
    let currentLevel = $derived.by<number>(() => xpToLevel(currentTotalXp));
    //
    const skillName = data.skillName;
    //
    let userId = data.userId;
    let skillId = data.skillId;
    //
    let currentSessionId = data?.currentSessionId;
    //
    const currentSkillSession = data?.skillSessions.findIndex(
        (item) => item.id === currentSessionId,
    );
    /**
     * TABS stuff
     **/
    let active = $state('current-view');

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
            id: 'profile',
            title: 'Profile',
            content: profile,
        },
        {
            id: 'sales',
            title: 'Sales',
            content: sales,
        },
    ];
    //
    const WEEKDAYS = $state<string[]>([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]);
    const toy = [65, 59, NaN, 48, 56, 57, 40];
    //
    let currentViewLabels = $derived.by<string[]>(() => {
        const today = new Date();
        const len = WEEKDAYS.length;
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            const wrappedIndex = (today.getDay() + offset + len) % len;
            const currentDay = WEEKDAYS[wrappedIndex];
            updatedArr.push(currentDay);
        }
        //
        return updatedArr;
    });
    $inspect(currentViewLabels);
    //
    //
    let currentViewData = $derived.by<number[]>(() => {
        const today = new Date();
        const len = toy.length;
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            const wrappedIndex = (today.getDay() + offset + len) % len;
            const current = toy[wrappedIndex];
            updatedArr.push(current);
        }
        //
        return updatedArr;
    });

    /**
     *
     * FORM Stuff
     *
     **/
    let startDateTime = $state<Date | string | null>(null);
    if (currentSkillSession != -1) {
        console.log('heello');
        console.log('startDateTime', startDateTime);
        startDateTime = toDateTimeLocal(
            data.skillSessions[currentSkillSession].startDateTime,
        );
        console.log('startDateTime', startDateTime);
    }

    let endDateTime = $state<Date | string | null>(null);
    if (
        currentSkillSession != -1 &&
        data.skillSessions[currentSkillSession].endDateTime != null
    ) {
        endDateTime = toDateTimeLocal(
            data.skillSessions[currentSkillSession].endDateTime,
        );
    }
    //
    let levelProgressAsPercent = $derived<number>(
        levelProgress(currentTotalXp) * 100,
    );
    //
    const action = $state<string>(`/api/skill-sessions/${currentSessionId}`);
    //
    onMount(() => {
        if (endDateTime != null) {
            window.location.assign(
                `/app/skills/${data.skillName.toLowerCase()}/train/${crypto.randomUUID()}`,
            );
        }
    });
    //
</script>

<!--  -->
{#snippet currentView()}
    <h2>Current View</h2>
    <p>
        Current view display today. and three days before and three days after
    </p>
    <LineChart labels={currentViewLabels} data={currentViewData} />
{/snippet}<!--  -->
{#snippet weekView()}
    <h2>Week View</h2>
{/snippet}

<!--  -->
{#snippet profile()}
    <h2>profile</h2>
{/snippet}
<!--  -->
{#snippet sales()}
    <h2>Sales</h2>
    <LineChart labels={WEEKDAYS} data={toy} />
{/snippet}
<!--  -->
<section class="p-5">
    <div class="row">
        <div class="col-12">
            <!--  -->
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="card px-2 py-3">
                        <div>
                            <p>Skill Name</p>
                            <h1>
                                {data.skillName}
                            </h1>
                            <p class="lead">
                                This would be an index page for listing out all
                                the skills sessions.
                            </p>
                        </div>
                        <div>
                            <h2 class="">
                                <span class="h5"> Current Level: </span>
                                <span class="font-weight-bold">
                                    {currentLevel}
                                </span>
                            </h2>
                        </div>

                        <div class="row align-middle align-items-center my-3">
                            <div class="col-12 col-md-3">
                                <p class="align-bottom p-0 m-0">Next Level:</p>
                            </div>
                            <div class="col-12 col-md-9">
                                <div
                                    class="progress"
                                    role="progressbar"
                                    aria-label="Animated striped example"
                                    aria-valuenow={levelProgressAsPercent}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div
                                        class="progress-bar progress-bar-striped progress-bar-animated"
                                        style="width: {levelProgressAsPercent}%"
                                    >
                                        {levelProgressAsPercent.toFixed(0)}%
                                    </div>
                                </div>
                                <div class="text-center">
                                    {currentXpEarnedAtLevel(
                                        currentTotalXp,
                                    ).toFixed(0)} / {remainingXpToNextLevel(
                                        currentTotalXp,
                                    ).toFixed(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--  -->
                <!--  -->
                <!--  -->
                <div class="my-5">
                    <Tabs {tabs} bind:active></Tabs>
                    <p>Current: {active}</p>
                </div>
                <!--  -->
                <!--  -->
                <!--  -->
            </div>
            <div class="col-12">
                <div class="my-5 row">
                    <div class="col-12 col-lg-4">
                        <TrainASkillForm
                            {action}
                            method="PUT"
                            data={{
                                skillName,
                                //
                                skillId,
                                userId,
                                startDateTime,
                                endDateTime,
                                currentSessionId,
                            }}
                            isLoading={data.isLoading}
                        />
                    </div>

                    <!--  -->
                    <!--  -->
                </div>
            </div>
            <div class="col-12">
                <!--  -->
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <!--  -->
                        <div class="table-responsive">
                            <table
                                class="table table-bordered table-sm table-hover"
                            >
                                <thead class="table-dark text-white bg-primary">
                                    <tr>
                                        <th scope="col"> # </th>
                                        <!--  -->
                                        <th scope="col"> Start </th>
                                        <th scope="col"> End </th>
                                        <th scope="col"> Time </th>
                                        <th scope="col"> Experience Points </th>
                                        <th scope="col">
                                            Pay Equivant Range
                                        </th>

                                        <th scope="col"> Options </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each skillSessions as session}
                                        {@const sessionDurationMilliseconds =
                                            calculateSessionDurationInMilliseconds(
                                                session.startDateTime,
                                                session.endDateTime,
                                            )}
                                        {@const sessionDurationMinutes =
                                            convertMillisecondsToMinutes(
                                                sessionDurationMilliseconds,
                                            )}

                                        <!-- Monies  -->
                                        {@const minimumWageRange =
                                            convertToCurrancyRange(
                                                sessionDurationMilliseconds,
                                            )}
                                        <!-- Experience points -->
                                        {@const currentExp = minutesToXP(
                                            sessionDurationMinutes,
                                        )}
                                        <tr>
                                            <td> {session.id} </td>
                                            <!--  -->
                                            <td>
                                                {@html formatDateTimeToLocale(
                                                    session.startDateTime,
                                                )}
                                            </td>
                                            <td>
                                                {@html session.endDateTime
                                                    ? formatDateTimeToLocale(
                                                          session.endDateTime,
                                                      )
                                                    : ''}
                                            </td>
                                            <td>
                                                {@html sessionDurationMilliseconds >
                                                0
                                                    ? `${formatTimeSpentInMilliseconds(sessionDurationMilliseconds)}`
                                                    : `no end found`}
                                            </td>
                                            <td> {currentExp.toFixed(0)} </td>
                                            <td> {@html minimumWageRange} </td>
                                            <td>
                                                <a
                                                    class="btn btn-sm btn-warning"
                                                    href={resolve(
                                                        `/app/skill-sessions/${session.id}`,
                                                    )}
                                                >
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</section>
