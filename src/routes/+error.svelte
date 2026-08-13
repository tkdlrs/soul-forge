<script lang="ts">
    import { page } from '$app/state';
</script>

<section class="p-5">
    <div class="row">
        <div class="col-12">
            <div class="alert alert-danger">
                <h1>{page.status}</h1>
                <p>{page.error?.message}</p>
            </div>
        </div>
    </div>
</section>
