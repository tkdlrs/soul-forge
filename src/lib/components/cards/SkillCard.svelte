<script lang="ts">
    import {
        currentXpEarnedAtLevel,
        remainingXpToNextLevel,
    } from '$lib/helpers/rpgLeveling';

    //
    interface Props {
        skillName: string;
        currentLevel: number;
        levelProgressAsPercent: number;
        currentTotalXp: number;
        skillDescription?: string | '';
    }
    let {
        skillName,
        currentLevel,
        levelProgressAsPercent,
        currentTotalXp,
        skillDescription = '',
    }: Props = $props();
</script>

<div class="card px-2 py-3">
    <div class="row">
        <div class="col-8">
            <p>Skill Name</p>
            <h1 class="h2">{skillName}</h1>
            {#if skillDescription != ''}
                <p class="lead">{skillDescription}</p>
            {/if}
        </div>
        <div class="col-4">
            <p class="text-sm-center text-md-start">Current Level</p>
            <h2 class="text-center">{currentLevel}</h2>
        </div>
    </div>
    <div class="row align-middle align-items-center my-3">
        <div class="col-12">
            <p class="align-bottom p-0 m-0 mb-2">Next Level:</p>
            <div
                class="progress"
                role="progressbar"
                aria-label="Animated striped example"
                aria-valuenow={levelProgressAsPercent}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    style="width: {levelProgressAsPercent}%"
                >
                    {levelProgressAsPercent.toFixed(0)}%
                </div>
            </div>
            <div class="text-center">
                {currentXpEarnedAtLevel(currentTotalXp).toFixed(0)} / {remainingXpToNextLevel(
                    currentTotalXp,
                ).toFixed(0)}
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        --bs-card-border-color: #c8c8c8;
    }
</style>
