<script lang="ts">
    /**
     * Frontend 'Skill' page SHOW
     * INDEX for a specific the 'Skill Sessions' of a specific 'Skill'
     **/
    import { enhance } from '$app/forms';
    import { resolve } from '$app/paths';
    import TrainASkillForm from '$lib/components/forms/resources/TrainASkillForm.svelte';
    //
    import type {
        SkillSessionsPageData,
        SkillSession,
    } from '$lib/schemas/skillSessionSchema';
    //
    let { data }: { data: SkillSessionsPageData } = $props();
    $inspect(data);
    //
    let skillSessions = $state<SkillSession[]>(data.skillSessions);
    //
    let userId = data.userId;
    let skillId = data.skillId;
    //
    let currentSessionId = data.currentSessionId;
    //
    const currentSkillSession = data.skillSessions.findIndex((item) => {
        return item.id === currentSessionId;
    });
    //
    let startDateTime = $state<Date | null>(
        data.skillSessions[currentSkillSession].startDateTime,
    );
    let endDateTime = $state<Date | null>(
        data.skillSessions[currentSkillSession].endDateTime,
    );
    //
    let action = $state<string>(`/api/skill-sessions/${currentSessionId}`);
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
                <!--
                {#if currentSessionId}
                    <form
                        method="POST"
                        action="?/stopSession"
                        use:enhance={() => {
                            return async ({ result }) => {
                                if (result.type === 'success') {
                                    // filter out the one with the same current session id
                                    skillSessions = skillSessions.filter(
                                        (item) => item.id != currentSessionId,
                                    );
                                    // clear out current session id
                                    currentSessionId = '';
                                    // readd the resulting data
                                    skillSessions.push(
                                        result?.data
                                            ?.session as SkillSession,
                                    );
                                }
                            };
                        }}
                    >
                        <input
                            type=""
                            name="sessionId"
                            value={currentSessionId}
                        />
                        <button> Stop </button>
                    </form>
                {:else}
                    <form
                        method="POST"
                        action="?/startSession"
                        use:enhance={() => {
                            return async ({ result }) => {
                                console.log(
                                    'client side in form knows result to be:',
                                    result,
                                );
                                if (
                                    result.type === 'success'
                                    // && result?.data?.skillSessionId
                                ) {
                                    currentSessionId =
                                        String(result?.data?.skillSessionId) ||
                                        '';
                                    skillSessions.push(
                                        result?.data
                                            ?.session as SkillSession,
                                    );
                                }
                                //
                                return;
                            };
                        }}
                    >
                        <button> Start </button>
                    </form>
                {/if} -->
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
                                    <!-- <th scope="col"> # </th> -->
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
                                    <tr>
                                        <td> {session.startDateTime} </td>
                                        <td> {session.endDateTime} </td>
                                        <td> calc time </td>
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
