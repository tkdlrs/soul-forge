<script lang="ts" generics="T, E">
    import z from 'zod/v4';
    import {
        mapZodErrorsToUI,
        prepareErrorsForPrettyPrint,
        prettyPrintZodErrors,
    } from '../utilities/zodErrors';
    // Form Elements
    import ErrorSuccessWrapper from '../form-elements/ErrorSuccessWrapper.svelte';
    import SubmitBtn from '../form-elements/SubmitBtn.svelte';
    //
    import { currentAppURI } from '$lib/helpers/navigators.js';
    // Implementation
    let {
        config,
        formData = $bindable<T>(),
        errorsObj = $bindable<E>(),
        children,
        isLoading = $bindable<boolean>(),
    } = $props();
    //
    let isSubmitted = $state<boolean>(false);
    let viewError = $state<boolean>(false);
    let errorMessage = $state<string>('Error');
    let viewSuccess = $state<boolean>(false);
    let successMessage = $state<string>('Success!');
    //
    async function handleSubmit<T>(e: Event) {
        e.preventDefault();
        console.log('calling handle submit');
        // Reset UI
        viewError = false;
        errorMessage = 'Error';
        errorsObj = null;
        if (isSubmitted) {
            console.error('Submission has already been sent');
            return;
        }
        //
        try {
            // Check for any callbacks that help with determining formData
            console.log(`config extra function call`);
            if (config.hasOwnProperty('callback')) {
                config.callback();
            }

            // Generate form submission object
            const payload = formData;
            const result = config.schema.parse(payload);
            //
            console.log(`config.action: ${config.action}`);
            console.log('Result is', result);
            // run an action here...
            await fetch(config.action, {
                method: config.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            });
            console.log(
                'made it after awaited fetch. 4 whatever that is worth',
            );
            //
            successMessage = 'Success';
            isSubmitted = true;
            isLoading = false;
            viewSuccess = true;
            //
        } catch (err) {
            isLoading = false;
            viewError = true;
            //
            if (err instanceof z.ZodError) {
                /** Reset UI Error Messages **/
                errorsObj = mapZodErrorsToUI<T>(err as z.ZodError<T>, []);
                // print the errors all pretty at the top for users
                const { fieldErrors } = z.flattenError(err);
                const { topLevel, sections } = prepareErrorsForPrettyPrint(
                    fieldErrors,
                    [],
                );
                errorMessage = prettyPrintZodErrors(topLevel, sections);
                return;
            } else {
                // freak out
                console.error(`Error was: ${err}`);
                throw err;
            }
            return;
        }
        //
        window.location.assign(`${currentAppURI}${config.slug}`);
    }
    //
    // async function handleDelete(e: Event, docId: string) {
    //     e.preventDefault();
    //     //
    //     if (
    //         window.confirm(
    //             'Are you sure you want to delete? This is an irrevesible action.',
    //         )
    //     ) {
    //         try {
    //             // ToDo:// set up and run an action here for deleting
    //             console.log(
    //                 'set up and run an action here for deleting. should probably do that... ',
    //             );
    //             // await deleteObjFromCollection(config.collection, docId);
    //             //
    //             window.location.assign(`${currentAppURI}${config.slug}/`);
    //         } catch (err) {
    //             console.error(`Error removing document: ${err}`);
    //         }
    //     }
    // }
    //
</script>

<div class="row">
    <div class="col-12">
        {#if isLoading}
            <p>Loading...</p>
        {:else}
            <ErrorSuccessWrapper
                {viewError}
                {errorMessage}
                {viewSuccess}
                {successMessage}
            >
                <form onsubmit={handleSubmit}>
                    <div class="form-row justify-content-center">
                        {@render children({ formData, errorsObj })}
                    </div>
                    <div class="form-row justify-content-between mt-5">
                        <div class="form-group col-12 col-lg-12">
                            <div class="d-flex justify-content-between">
                                <div>
                                    {#if config.docId && config.action === 'PUT'}
                                        <button
                                            type="button"
                                            class="btn btn-danger"
                                            onclick={(e) =>
                                                // ToDo://
                                                // handleDelete(e, config.docId)
                                                console.log(
                                                    'this shoulda delete something. One day...',
                                                )}
                                        >
                                            <!--  -->
                                            Delete
                                        </button>
                                    {/if}
                                </div>
                                <div class="form-group">
                                    <SubmitBtn />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorSuccessWrapper>
        {/if}
    </div>
</div>
