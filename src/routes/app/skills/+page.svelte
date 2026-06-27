<script lang="ts">
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import z from 'zod';
    //
    import {
        SkillSchema,
        SkillWithIdSchema,
        type SkillWithId,
    } from '$lib/schemas/skillSchema';
    import SkillForm from '$lib/components/forms/resources/SkillForm.svelte';
    //
    // let { data }: { data: SkillPageData } = $props();
    let { data } = $props();
    //
    let skills = $state<Array<SkillWithId>>(data.skills);
    //
    let name = $state<string>('');
    let icon = $state<string>('');
    //
    async function deleteSkill(id: string) {
        await fetch(`/api/skills/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
    <div class="row">
        <div class="col-12">
            <h1>Skills</h1>
            <p>
                This would be an index page for listing out all the skills with
                their icons
            </p>
        </div>
        <div class="col-12">
            <div class="my-5">
                <SkillForm
                    action="/api/skills"
                    method="POST"
                    data={{ name, icon }}
                    isLoading={data.isLoading}
                />
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
                                    <th scope="col"> Icon </th>
                                    <th scope="col"> Name </th>
                                    <th scope="col"> Hours </th>
                                    <th scope="col"> Currency Conversion </th>
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
                                        <td>
                                            <a
                                                class="btn btn-sm btn-success"
                                                href={resolve(
                                                    `/app/skills/train/${skill.id}`,
                                                )}
                                            >
                                                Train
                                            </a>
                                            <a
                                                class="btn btn-sm btn-warning"
                                                href={resolve(
                                                    `/app/skills/${skill.id}`,
                                                )}
                                            >
                                                Edit
                                            </a>
                                            <button
                                                class="btn btn-sm btn-danger"
                                                onclick={() =>
                                                    deleteSkill(skill.id)}
                                            >
                                                Delete
                                            </button>
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
</section>
