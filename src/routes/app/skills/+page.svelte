<script lang="ts">
    /**
     * App Frontend Skills INDEX
     **/
    import { resolve } from '$app/paths';
    //
    import {
        type SkillsWithActiveSkillSessions,
        type SkillWithId,
    } from '$lib/schemas/skillSchema';
    import { currentAppURI } from '$lib/helpers/navigators';
    import {
        getDateDeltaParts,
        convertToCurrancyRange,
        formatTimeSpentOnSkill,
        getSkillsTotalMilliseconds,
    } from '$lib/helpers/formatters.js';
    import type { SkillSession } from '$lib/schemas/skillSessionSchema.js';
    import {
        levelProgress,
        minutesToXP,
        xpToLevel,
        xpToNextLevel,
    } from '$lib/helpers/rpgLeveling';
    //
    // let { data }: { data: SkillPageData } = $props();
    let { data } = $props();
    //
    let skills = $state<Array<SkillsWithActiveSkillSessions>>(data.skills);
    //
    async function deleteSkill(id: string) {
        try {
            await fetch(`/api/skills/${id}`, {
                method: 'DELETE',
            });
            //
            return window.location.assign(`${currentAppURI}/skills/`);
        } catch (error) {
            alert(`error`);
            console.error(error);
        }

        //
    }
    const rawDataSkillSessions = data.skillSessions;
    //
    const skillIdToSkillSessionsMap = $state<Record<string, SkillSession[]>>(
        {},
    );
    for (const skillSessionData of rawDataSkillSessions) {
        if (!skillIdToSkillSessionsMap[skillSessionData.skillId]) {
            skillIdToSkillSessionsMap[skillSessionData.skillId] = [];
        }
        //
        skillIdToSkillSessionsMap[skillSessionData.skillId].push(
            skillSessionData,
        );
        //
    }
    //
    const skillMinutes = $derived.by<number[]>(() =>
        Object.keys(skillIdToSkillSessionsMap).map(
            (
                skill, //skillIdToSkillSessionsMap[skill],
            ) => getSkillsTotalMilliseconds(skillIdToSkillSessionsMap[skill]),
        ),
    );
    //
    console.log('skillIdToSkillSessionsMap', skillIdToSkillSessionsMap);
    const totalTime = $derived.by(() =>
        skillMinutes.reduce((total, num) => total + num, 0),
    );
    $inspect(totalTime);
    //
    const totalWage = $derived.by(() => convertToCurrancyRange(totalTime));
    //
</script>

<section class="p-5">
    <div class="row mb-5">
        <div class="col-12"><h1>Skills</h1></div>
        <div class="col-12 d-flex mb-5">
            <div class="flex-sm-grow-1">
                <p>
                    This would be an index page for listing out all the skills
                    with their icons
                </p>
            </div>
            <div class="ms-auto">
                <a class="btn btn-primary" href="{currentAppURI}/skills/create">
                    Create Skill
                </a>
            </div>
        </div>
        <div class="row">
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
                                        <!-- <th scope="col"> # </th> -->
                                        <th scope="col"> Icon </th>
                                        <th scope="col"> Name </th>
                                        <th scope="col"> Active Session </th>
                                        <th scope="col"> Time </th>
                                        <th scope="col">
                                            Minimum Wage Conversion <br />
                                            <small style="font-size: 0.66rem;">
                                                (Range low to high)
                                            </small>
                                        </th>
                                        <th scope="col"> Current&nbsp;XP </th>
                                        <th scope="col"> Current&nbsp;Lvl </th>
                                        <th scope="col"> XP to Next Lvl </th>
                                        <th scope="col">
                                            Time to Next Lvl
                                            <small style="font-size: 0.66rem;">
                                                (hours)
                                            </small>
                                        </th>
                                        <th scope="col"> Options </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each skills as skill}
                                        {@const timeSpentOnSkill =
                                            getSkillsTotalMilliseconds(
                                                skillIdToSkillSessionsMap[
                                                    skill.id
                                                ],
                                            )}
                                        {@const formattedTimeSpentOnSkill =
                                            formatTimeSpentOnSkill(
                                                timeSpentOnSkill,
                                            )}
                                        <!-- Monies  -->
                                        {@const minimumWageRange =
                                            convertToCurrancyRange(
                                                timeSpentOnSkill,
                                            )}
                                        <!-- Experience points -->
                                        {@const currentExp =
                                            minutesToXP(timeSpentOnSkill)}
                                        {@const currentLvl =
                                            xpToLevel(currentExp).toFixed(0)}
                                        {@const xpNextLvl =
                                            xpToNextLevel(currentExp)}
                                        <tr>
                                            <!-- <th scope="row"> {skill.id} </th> -->
                                            <td> {@html skill.icon} </td>
                                            <td> {skill.name} </td>
                                            <td>
                                                <!--    -->
                                                {#if skill.isActive}
                                                    <div
                                                        class="text-danger d-flex justify-content-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="32"
                                                            height="32"
                                                            fill="currentColor"
                                                            class="bi bi-stopwatch"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"
                                                            />
                                                            <path
                                                                d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"
                                                            />
                                                        </svg>
                                                    </div>
                                                {/if}
                                            </td>
                                            <td>
                                                {@html formattedTimeSpentOnSkill}
                                            </td>
                                            <td class="text-nowrap">
                                                {@html minimumWageRange}
                                            </td>
                                            <td>
                                                {currentExp.toFixed(0)} <br />
                                            </td>
                                            <td>
                                                {currentLvl} <br />
                                            </td>
                                            <td>
                                                {xpNextLvl}
                                            </td>
                                            <td>
                                                {(xpNextLvl / 60).toFixed(0)}
                                            </td>
                                            <td class="d-flex">
                                                <div class="p-1">
                                                    <a
                                                        data-sveltekit-preload-data="false"
                                                        class="btn btn-sm btn-success"
                                                        href={resolve(
                                                            `/app/skills/${skill.name.toLowerCase()}/train/${skill.isActive && skill.activeId ? skill.activeId : crypto.randomUUID()}`,
                                                        )}
                                                    >
                                                        Train
                                                    </a>
                                                </div>
                                                <div class="p-1">
                                                    <a
                                                        data-sveltekit-preload-data="false"
                                                        class="btn btn-sm btn-warning"
                                                        href={resolve(
                                                            `/app/skills/${skill.id}`,
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
                                                            deleteSkill(
                                                                skill.id,
                                                            )}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                                <tfoot class="table-dark text-white">
                                    <tr>
                                        <td>Totals</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>
                                            {@html formatTimeSpentOnSkill(
                                                totalTime,
                                            )}
                                        </td>
                                        <td class="text-nowrap">
                                            {@html totalWage}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!--  -->
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</section>
