<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SkillSessionPageData } from '$lib/app/schemas/skillSessionSchema';
    //
    let { data }: { data: SkillSessionPageData } = $props();
    //
    const userId = $state<number>(data.skillSession.userId);
    let skillId = $state<string>(data.skillSession.skillId);
    let startDateTime = $state<Date>(new Date(data.skillSession.startDateTime));
    let endDateTime = $state<Date | null>(data.skillSession.endDateTime);
    //
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Edit Skill Session</h1>
        </div>
        <div class="col-12">
            <form
                method="POST"
                action="?/editSession"
                use:enhance={() => {
                    //
                    return async ({ result }) => {
                        console.log('result is:', result);
                    };
                }}
            >
                <input bind:value={skillId} placeholder="skill Id" />
                <input
                    bind:value={startDateTime}
                    placeholder="Start date time"
                    type="datetime"
                />
                <input
                    bind:value={endDateTime}
                    placeholder="End date time"
                    type="datetime"
                />
                <button class="btn btn-primary btn-sm" type="submit">
                    Save
                </button>
            </form>
        </div>
    </div>
</section>
