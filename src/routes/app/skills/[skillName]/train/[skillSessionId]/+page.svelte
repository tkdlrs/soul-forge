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
    import { currentAppURI } from '$lib/helpers/navigators';
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
    skillSessions = skillSessions.sort(
        (a, b) => b.startDateTime.getTime() - a.startDateTime.getTime(),
    );
    //
    let dateToSessionDuration = $derived.by<Record<string, number>>(() => {
        const output: Record<string, number> = {};
        //
        for (let i = 0; i < skillSessions.length; i++) {
            const session = skillSessions[i];
            if (!session.endDateTime) {
                continue;
            }
            //
            const START_ISO_DATE = new Date(session.startDateTime)
                .toISOString()
                .slice(0, 10);
            const END_ISO_DATE = new Date(session.endDateTime)
                .toISOString()
                .slice(0, 10);
            //
            if (START_ISO_DATE !== END_ISO_DATE) {
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
    $inspect(skillSessions);
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
    //
    async function deleteSkillSession(id: string, name: string) {
        if (confirm('Are you certain you want to delete this Skill Session?')) {
            try {
                const response = await fetch(`/api/skill-sessions/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const body = await response.json();
                    alert(`${response.status} - ${body.message}`);
                    //
                    return window.location.reload();
                }
                //
                return window.location.assign(`${currentAppURI}/skills/`);
            } catch (err) {
                alert('Error');
                console.error(err);
            }
        }
    }
    /**
     * TABS stuff
     **/
    let active = $state('week-view');

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
    let currentViewData = $derived.by<Array<number | null>>(() => {
        const today = new Date();
        const TODAY_AS_ISO_STRING = today.toISOString().slice(0, 10);
        const TODAY_YEAR_MONTH = TODAY_AS_ISO_STRING.slice(0, 8);
        console.log('TODAY_YEAR_MONTH', TODAY_YEAR_MONTH);
        const TODAY_DAY = Math.abs(Number(TODAY_AS_ISO_STRING.slice(7, 10)));
        console.log('TODAY_DAY', TODAY_DAY);
        //
        const updatedArr = [];
        for (let offset = -3; offset <= 3; offset++) {
            // const
            const dateIndex = `${TODAY_YEAR_MONTH}${TODAY_DAY + offset}`;
            console.log('dateIndex', dateIndex);
            const currentInMilliseconds = dateToSessionDuration[dateIndex];
            const currentInMinutes = convertMillisecondsToMinutes(
                currentInMilliseconds,
            );
            if (currentInMilliseconds) {
                updatedArr.push(currentInMinutes);
            } else {
                updatedArr.push(null);
            }
        }
        //
        return updatedArr;
    });
    $inspect(currentViewData);

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
                labels={['one', 'two', 'null', 'three', 'four']}
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
                                            <td
                                                style="max-width: 100px; 
                                                overflow: hidden; 
                                                text-overflow: ellipsis; 
                                                white-space: nowrap;"
                                            >
                                                {session.id}
                                            </td>
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
                                                <div class="d-flex">
                                                    <div class="p-1">
                                                        <a
                                                            class="btn btn-sm btn-warning"
                                                            href={resolve(
                                                                `/app/skill-sessions/${session.id}`,
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    </div>
                                                    <div class="p-1">
                                                        <button
                                                            data-sveltekit-preload-data="false"
                                                            class="btn btn-sm btn-danger"
                                                            onclick={() =>
                                                                deleteSkillSession(
                                                                    session.id,
                                                                    skillName,
                                                                )}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                                <tbody class="table-dark text-white bg-primary">
                                    <tr>
                                        <td>Totals</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td></td>
                                        <td></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
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
