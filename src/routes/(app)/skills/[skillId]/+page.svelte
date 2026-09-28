<script lang="ts">
    /**
     * Frontend 'Skill' page EDIT
     **/
    import SkillForm from '$lib/components/forms/resources/SkillForm.svelte';
    import {
        SkillWithIdSchema,
        type SkillEditPageData,
    } from '$lib/schemas/skillSchema';
    import { untrack } from 'svelte';
    //
    let { data }: { data: SkillEditPageData } = $props();
    //
    let name = $state<string>('');
    let icon = $state<string>('');
    //
    const skill = structuredClone(untrack(() => data.skill));
    const checkedSkill = SkillWithIdSchema.parse(skill);
    //
    name = checkedSkill.name;
    icon = checkedSkill.icon;
    //
    const actionRoute = $derived<string>(`/api/skills/${checkedSkill.id}`);
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
