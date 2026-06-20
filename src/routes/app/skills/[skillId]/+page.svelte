<h1>{data.skill.name}</h1>

{#if data.activeSession}
    <form method="POST" action="?/stopSession">
        <input type="hidden" name="sessionId" value={data.activeSession.id} />
        <button>Stop</button>
    </form>
{:else}
    <form method="POST" action="?/startSession">
        <button>Start</button>
    </form>
{/if}
