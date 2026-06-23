<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SkillSessionPageData } from '$lib/app/schemas/skillSessionSchema';
    //
    let { data }: { data: SkillSessionPageData } = $props();
    $inspect(data);
    //
    let currentSessionId = $state<string | null>(null);
    //
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
            <div class="my-5">
                <!--  -->
                {#if currentSessionId}
                    <form method="POST" action="?/stopSession">
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
                                    result.type === 'success' &&
                                    result?.data?.skillSessionId
                                ) {
                                    currentSessionId = String(
                                        result.data.skillSessionId,
                                    );
                                }
                                //
                                return;
                            };
                        }}
                    >
                        <button> Start </button>
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
                                    <th scope="col"> Experience Points </th>
                                    <th scope="col"> Pay Equivant Range </th>

                                    <th scope="col"> Options </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each data.skillSessions as session}
                                    <tr>
                                        <td> {session.startDateTime} </td>
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
