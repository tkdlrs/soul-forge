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
    let currentSessionId = data?.currentSessionId;
    //
    const userId = $state<number>(data.skillSession.userId);
    let skillId = $state<string>(data.skillSession.skillId);
    //
    let startDateTime = $state<Date | string | null>(null);
    startDateTime = toDateTimeLocal(new Date(data.skillSession.startDateTime));
    //
    let endDateTime = $state<Date | string | null>(null);
    const rawDataEndDateTime = data.skillSession.endDateTime
        ? new Date(data.skillSession.endDateTime)
        : null;
    if (rawDataEndDateTime) {
        endDateTime = toDateTimeLocal(rawDataEndDateTime);
    }
    //
    const action = $state<string>(`/api/skill-sessions/${currentSessionId}`);
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
