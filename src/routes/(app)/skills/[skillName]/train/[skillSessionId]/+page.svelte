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
    $inspect(data);
    //
    let skillSessions = $derived<SkillSession[]>(
        [...data.skillSessions].sort(
            (a, b) => b.startDateTime.getTime() - a.startDateTime.getTime(),
        ),
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
    let currentLevel = $derived<number>(xpToLevel(currentTotalXp));
    //
    const skillName = $derived<string>(data.skillName);
    const userId = $derived<number>(data.userId);
    const skillId = $derived<string>(data.skillId);
    //
    let currentSessionId = $derived<string>(data.currentSessionId);
    //
    const currentSkillSession = $derived<number>(
        skillSessions.findIndex((item) => item.id === currentSessionId),
    );
    $inspect(currentSkillSession);
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
    let startDateTime = $derived.by<Date | string | null>(() => {
        if (currentSkillSession === -1) {
            return null;
        }
        //
        return toDateTimeLocal(
            skillSessions[currentSkillSession].startDateTime,
        );
    });

    let endDateTime = $derived.by<Date | string | null>(() => {
        if (currentSkillSession === -1) {
            return null;
        }
        if (skillSessions[currentSkillSession].endDateTime === null) {
            return null;
        }
        //
        return toDateTimeLocal(skillSessions[currentSkillSession].endDateTime);
    });
    //
    let levelProgressAsPercent = $derived<number>(
        levelProgress(currentTotalXp) * 100,
    );
    //
    const action = $derived<string>(`/api/skill-sessions/${currentSessionId}`);
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
            <div class="row align-items-center">
                <div class="col-12 col-md-4">
                    <div class="mb-5">
                        <SkillCard
                            {skillName}
                            {currentLevel}
                            {levelProgressAsPercent}
                            {currentTotalXp}
                        />
                    </div>
                </div>
                <div class="col-12 col-md-8">
                    <!--  -->
                    <TrainingSkillTabs {skillSessions} />
                    <!--  -->
                </div>
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
