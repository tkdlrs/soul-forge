<script lang="ts">
    /**
     * Frontend 'Skill' page EDIT
     **/
    import SkillForm from '$lib/components/forms/resources/SkillForm.svelte';
    import { SkillWithIdSchema } from '$lib/schemas/skillSchema';
    //
    let name = $state<string>('');
    let icon = $state<string>('');
    //
    let { data } = $props();
    //
    const skill = data.skill;
    SkillWithIdSchema.parse(skill);
    //
    name = skill.name;
    icon = skill.icon;
    //
    const actionRoute = `/api/skills/${skill.id}`;
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Edit Skill</h1>
        </div>
        <div class="col-12">
            <div class="my-5">
                <SkillForm
                    action={actionRoute}
                    method="PUT"
                    data={{ name, icon }}
                    isLoading={data.isLoading}
                />
            </div>
        </div>
    </div>
</section>
