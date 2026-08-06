<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    //
    let { user } = $props();
</script>

<header>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#">Navbar</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" data-sveltekit-preload-data="false">
                    <li
                        class="nav-item"
                        aria-current={page.url.pathname === '/'
                            ? 'page'
                            : undefined}
                    >
                        <a
                            class="nav-link active"
                            aria-current="page"
                            href={resolve('/')}
                        >
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            aria-current={page.url.pathname === '/app/roles'
                                ? 'page'
                                : undefined}
                            href={resolve('/app/roles')}
                        >
                            Roles
                        </a>
                    </li>
                    {#if user}
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/app/users'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/app/users')}>
                                All Users
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/app/skills'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/app/skills')}>
                                Skills
                            </a>
                        </li>
                        <li class="nav-item">
                            <!-- svelte-ignore component_name_lowercase -->
                            <form action="/app/logout" method="POST">
                                <button class="nav-link btn btn-link">
                                    Logout
                                </button>
                            </form>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href={resolve('/app/users/create')}
                            >
                                Create Account
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={resolve('/app/login')}>
                                Login
                            </a>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    </nav>
</header>
