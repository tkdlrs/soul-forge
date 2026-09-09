<script lang="ts">
    /**
     * Frontend 'Skill' page SHOW
     * INDEX for a specific the 'Skill Sessions' of a specific 'Skill'
     **/
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import TrainASkillForm from '$lib/components/forms/resources/TrainASkillForm.svelte';
    import {
        calculateSessionDurationInMilliseconds,
        convertMillisecondsToMinutes,
        convertToCurrancyRange,
        formatDateTimeToLocale,
        formatTimeSpentInMilliseconds,
        toDateTimeLocal,
    } from '$lib/helpers/formatters';
    import { currentAppURI } from '$lib/helpers/navigators';
    import {
        levelProgress,
        minutesToXP,
        xpToLevel,
    } from '$lib/helpers/rpgLeveling';
    //
    import type {
        TrainSkillPageData,
        SkillSession,
    } from '$lib/schemas/skillSessionSchema';
    import TableWrapper from '$lib/components/tables/TableWrapper.svelte';
    import SkillCard from '$lib/components/cards/SkillCard.svelte';
    import TrainingSkillTabs from '$lib/components/tabs/TrainingSkillTabs.svelte';
    //
    let { data }: { data: TrainSkillPageData } = $props();
    //
    let skillSessions = $state<SkillSession[]>(data.skillSessions);
    skillSessions = skillSessions.sort(
        (a, b) => b.startDateTime.getTime() - a.startDateTime.getTime(),
    );
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
     *
     * FORM Stuff
     *
     **/
    let startDateTime = $state<Date | string | null>(null);
    if (currentSkillSession != -1) {
        startDateTime = toDateTimeLocal(
            data.skillSessions[currentSkillSession].startDateTime,
        );
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
                `/skills/${data.skillName.toLowerCase()}/train/${crypto.randomUUID()}`,
            );
        }
    });
    //
</script>

<!--  -->
<section class="p-5">
    <div class="row">
        <div class="col-12">
            <!--  -->
            <div class="row">
                <div class="col-12 col-md-6">
                    <SkillCard
                        {skillName}
                        {currentLevel}
                        {levelProgressAsPercent}
                        {currentTotalXp}
                    />
                </div>
                <!--  -->
                <TrainingSkillTabs {skillSessions} />
                <!--  -->
            </div>
            <div class="col-12">
                <!--  -->
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
                </div>
                <!--  -->
            </div>
            <div class="col-12">
                <!--  -->
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-10">
                        <TableWrapper
                            headers={[
                                '#',
                                'Start',
                                'End',
                                'Time',
                                'Experience Points',
                                'Pay Equivant Range',
                                'Options',
                            ]}
                        >
                            {#snippet tbody()}
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
                                                            `/skill-sessions/${session.id}`,
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
                            {/snippet}
                            {#snippet tfoot()}
                                <tr>
                                    <td>Totals</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td></td>
                                    <td></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            {/snippet}
                        </TableWrapper>
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</section>
