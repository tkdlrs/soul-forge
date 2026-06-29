<script lang="ts">
    /**
     * App Frontend Skills INDEX
     **/
    import { resolve } from '$app/paths';
    //
    import { type SkillWithId } from '$lib/schemas/skillSchema';
    import { currentAppURI } from '$lib/helpers/navigators';
    //
    // let { data }: { data: SkillPageData } = $props();
    let { data } = $props();
    //
    let skills = $state<Array<SkillWithId>>(data.skills);
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
    //
    function calculateSessionMinutes(start: Date, end: Date): number {
        if (end.getTime() < start.getTime())
            throw new Error('End before start');
        const milliseconds = end.getTime() - start.getTime();

        return milliseconds / 60000;
    }
    type SkillSessions = {
        startDateTime: Date;
        endDateTime: Date;
    };
    function getSkillsTotalMinutes(ranges: SkillSessions[]): number {
        return ranges.reduce((total, { startDateTime, endDateTime }) => {
            return total + calculateSessionMinutes(startDateTime, endDateTime);
        }, 0);
    }
    //
    let sessionMinutes = $derived<number>(0);
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
                                        <th scope="col"> Hours </th>
                                        <th scope="col">
                                            Currency Conversion
                                        </th>
                                        <th scope="col"> Level </th>
                                        <th scope="col"> Options </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each skills as skill}
                                        <tr>
                                            <!-- <th scope="row"> {skill.id} </th> -->
                                            <td> {@html skill.icon} </td>
                                            <td>
                                                <a
                                                    data-sveltekit-preload-data="false"
                                                    class=""
                                                    href={`/app/skills/${skill.id}`}
                                                >
                                                    {skill.name}
                                                </a>
                                            </td>
                                            <td>
                                                do math to figure out hours and
                                                minutes
                                            </td>
                                            <td> </td>
                                            <td> </td>
                                            <td class="d-flex">
                                                <div class="p-1">
                                                    <a
                                                        class="btn btn-sm btn-success"
                                                        href={resolve(
                                                            `/app/skills/train/${skill.id}`,
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
