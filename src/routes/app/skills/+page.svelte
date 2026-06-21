<script lang="ts">
    import {
        SkillSchema,
        SkillWithIdSchema,
        type SkillWithId,
    } from '$lib/app/schemas/skillSchema';
    import { onMount } from 'svelte';
    import z from 'zod';

    //
    let skills = $state<Array<SkillWithId>>([]);
    //
    let name = $state<string>('');
    let icon = $state<string>('');
    //
    async function loadSkills() {
        try {
            const response = await fetch('/api/skills');
            const result = await response.json();
            skills = z.array(SkillWithIdSchema).parse(result);
            return;
        } catch (err) {
            throw new Error(`Error was ${err}`);
        }
    }
    //
    async function createSkill() {
        //
        await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                icon,
                userId: 1,
            }),
        });
        //
        await loadSkills();
        //
    }

    //
    onMount(async () => {
        await loadSkills();
    });
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
                <form onsubmit={createSkill}>
                    <input bind:value={name} placeholder="Name" />
                    <input bind:value={icon} placeholder="Icon" />
                    <button class="btn btn-success btn-sm" type="submit">
                        Make a Skill
                    </button>
                </form>
            </div>
        </div>
        <div class="col-12">
            <!--  -->
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <!--  -->
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Icon </th>
                                    <th scope="col"> Name </th>
                                    <th scope="col"> Hours </th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each skills as skill}
                                    <tr>
                                        <th scope="row"> {skill.id} </th>
                                        <td> {@html skill.icon} </td>
                                        <td>
                                            <a
                                                class=""
                                                href={`/skills/${skill.id}`}
                                            >
                                                {skill.name}
                                            </a>
                                        </td>
                                        <td>
                                            do math to figure out hours and
                                            minutes
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
