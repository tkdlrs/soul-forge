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
    }
    let {
        skillName,
        currentLevel,
        levelProgressAsPercent,
        currentTotalXp,
    }: Props = $props();
</script>

<div class="card px-2 py-3">
    <div>
        <p>Skill Name</p>
        <h1>
            {skillName}
        </h1>
        <p class="lead">
            This would be an index page for listing out all the skills sessions.
        </p>
    </div>
    <div>
        <h2 class="">
            <span class="h5"> Current Level: </span>
            <span class="font-weight-bold">
                {currentLevel}
            </span>
        </h2>
    </div>

    <div class="row align-middle align-items-center my-3">
        <div class="col-12 col-md-3">
            <p class="align-bottom p-0 m-0">Next Level:</p>
        </div>
        <div class="col-12 col-md-9">
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
