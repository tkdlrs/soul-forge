<script lang="ts">
    import SkillForm from '$lib/components/forms/resources/SkillForm.svelte';
    //
    let name = $state<string>('');
    let icon = $state<string>('');
    //
    let { data } = $props();
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <h1>Create a Skill Session</h1>
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
    </div>
</section>
