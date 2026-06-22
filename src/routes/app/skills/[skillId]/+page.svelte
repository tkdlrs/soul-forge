<script lang="ts">
    import {
        SkillSessionWithIdSchema,
        type SkillSessionWithId,
    } from '$lib/app/schemas/skillSessionSchema';
    import { onMount } from 'svelte';
    import z from 'zod';
    //
    let skillSessions = $state<Array<SkillSessionWithId>>([]);

    //
    async function loadSkillSession({ params }) {
        try {
            const response = await fetch(`/api/skills/${params.skillId}`);
            const result = await response.json();
            skillSessions = z.array(SkillSessionWithIdSchema).parse(result);
            return;
        } catch (err) {
            throw new Error(`Error was ${err}`);
        }
    }
    //
    onMount(async () => {
        await loadSkillSession({ params });
    });
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>
                <!-- {data.skill.name} -->

                Skill name
            </h1>
            <p>
                This would be an index page for listing out all the skills
                sessions
            </p>
        </div>
        <div class="col-12">
            <div class="my-5">
                <!--  -->
                {#if data.activeSession}
                    <form method="POST" action="?/stopSession">
                        <input
                            type="hidden"
                            name="sessionId"
                            value={data.activeSession.id}
                        />
                        <button>Stop</button>
                    </form>
                {:else}
                    <form method="POST" action="?/startSession">
                        <button>Start</button>
                    </form>
                {/if}
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
                                    <th scope="col"> Experieance points </th>
                                    <th scope="col"> Pay equivant range </th>

                                    <th scope="col"> Options </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each skillSessions as session}
                                    <tr>
                                        <td> {session.stateDateTime} </td>
                                        <td> {session.endDateTime} </td>
                                        <td> calc time </td>
                                        <td> exp </td>
                                        <td> $- $ </td>
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
