<script lang="ts">
    // Svelte library
    import { onMount } from 'svelte';
    // Schema
    import {
        type APin,
        APinSchema,
        type APinErrors,
    } from '$lib/schemas/aPinSchema.js';
    // Form Elements
    import FormWrapper from '../FormWrapper.svelte';
    import Input from '../../form-elements/Input.svelte';
    // Database
    import { getDocumentFromCollection } from '$lib/database/queries/showFunctions.js';
    // Helpers
    import { currentAppURI } from '$lib/helpers/navigators.js';
    // Implementation
    let errorsObj = $state<APinErrors>(null);
    // Props
    let { action = 'PUT', docId = null, isLoading } = $props();
    // Form config
    const aPinConfig = {
        collection: 'aPin',
        slug: 'a-pin',
        schema: APinSchema,

        initial: {
            firstName: '',
            lastName: '',
            awarded: '',
        } satisfies APin,
        errors: null satisfies APinErrors,

        // svelte-ignore state_referenced_locally
        action,
        // svelte-ignore state_referenced_locally
        docId,
    };
    //
    let data = $state<APin>(aPinConfig.initial);
    //
    async function getCurrentApinData(
        action: string,
        docId: string,
    ): Promise<void> {
        if (!docId && action === 'POST') {
            return;
        }
        //
        if (!docId && action === 'PUT') {
            throw new Error('Unable to identify document to edit');
        }
        // Grab the data from the document that we are trying to edit
        try {
            const aPinData = await getDocumentFromCollection(
                'aPin',
                docId,
                APinSchema,
            );
            //
            data.firstName = aPinData.firstName;
            data.lastName = aPinData.lastName;
            data.awarded = aPinData.awarded;
            //
        } catch (err) {
            alert('The requested docuemnt does not exist');
            window.location.assign(`${currentAppURI}a-pin/`);
            throw new Error('The requested docuemnt does not exist');
        }
    }
    // life cycle hooks
    onMount(async () => {
        await getCurrentApinData(action, docId).finally(
            () => (isLoading = false),
        );
        return;
    });
</script>

<FormWrapper config={aPinConfig} bind:data bind:errorsObj bind:isLoading>
    {#snippet children({ data }: { data: APin })}
        <div class="form-row justify-content-between">
            <Input
                text="First Name"
                id="first-name"
                bind:defaultValue={data.firstName}
                errorText={errorsObj?.firstName}
            />
            <Input
                text="Last Name"
                id="last-name"
                bind:defaultValue={data.lastName}
                errorText={errorsObj?.lastName}
            />
            <!--  -->
            <Input
                text="Awarded"
                id="awarded"
                bind:defaultValue={data.awarded}
                errorText={errorsObj?.awarded}
            />
        </div>
    {/snippet}
</FormWrapper>
