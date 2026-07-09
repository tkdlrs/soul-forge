<script lang="ts">
    /**
     * Frontend 'Skill' page SHOW
     * INDEX for a specific the 'Skill Sessions' of a specific 'Skill'
     **/
    import { resolve } from '$app/paths';
    import TrainASkillForm from '$lib/components/forms/resources/TrainASkillForm.svelte';
    import {
        calculateSessionDuration,
        toDateTimeLocal,
    } from '$lib/helpers/formatters';
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
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <p>Skill Name</p>
            <h1>
                {data.skillName}
            </h1>
            <p>
                This would be an index page for listing out all the skills
                sessions
            </p>
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
                                    <th scope="col"> Pay Equivant Range </th>

                                    <th scope="col"> Options </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each skillSessions as session}
                                    {@const durationInMinutes =
                                        calculateSessionDuration(
                                            session.startDateTime,
                                            session.endDateTime,
                                        )}
                                    <tr>
                                        <td> {session.id} </td>
                                        <!--  -->
                                        <td> {session.startDateTime} </td>
                                        <td> {session.endDateTime} </td>
                                        <td>
                                            {@html durationInMinutes > 0
                                                ? `${Math.floor(durationInMinutes)}&nbsp;minutes`
                                                : `no end found`}
                                        </td>
                                        <td> exp </td>
                                        <td> $- $ </td>
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
</section>
