<script lang="ts">
    /**
     * App Frontend for Skill Sessions [ ID ] Edit
     **/
    import SkillSessionForm from '$lib/components/forms/resources/SkillSessionForm.svelte';
    import { toDateTimeLocal } from '$lib/helpers/formatters';
    import type { SkillSessionPageData } from '$lib/schemas/skillSessionSchema';
    //
    let { data }: { data: SkillSessionPageData } = $props();
    //
    const currentSessionId = $derived<string>(data.currentSessionId);
    //
    const userId = $derived<number>(data.skillSession.userId);
    const skillId = $derived<string>(data.skillSession.skillId);
    //
    let startDateTime = $derived<Date | string | null>(
        toDateTimeLocal(new Date(data?.skillSession.startDateTime)) || null,
    );
    //
    const endDateTime = $derived<Date | string | null>(
        data.skillSession.endDateTime
            ? toDateTimeLocal(new Date(data.skillSession.endDateTime))
            : null,
    );
    //
    const action = $derived<string>(`/api/skill-sessions/${currentSessionId}`);
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Edit Skill Session</h1>
        </div>
        <div class="col-12">
            <SkillSessionForm
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
    </div>
</section>
