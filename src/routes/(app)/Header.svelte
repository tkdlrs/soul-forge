<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { printJSON } from '$lib/helpers/formatters';
    //
    let { user } = $props();
</script>

<header>
    <!-- bg-primary" data-bs-theme="dark -->
    <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container">
            <a class="navbar-brand" href="/">Soul Forge</a>
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
                    {#if user && user.roles.includes('Admin')}
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/users'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/users')}>
                                All Users
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/roles'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/roles')}>
                                Roles
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/user-roles'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/user-roles')}>
                                User Roles
                            </a>
                        </li>
                    {/if}

                    <!--  -->
                    {#if user}
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/skills'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/skills')}>
                                Skills
                            </a>
                        </li>
                        <li class="nav-item">
                            <!-- ToDo:// fix logout -->
                            <!-- svelte-ignore component_name_lowercase -->
                            <form action="/api/auth/logout" method="POST">
                                <button class="nav-link btn btn-link">
                                    Logout
                                </button>
                            </form>
                        </li>
                    {/if}
                    <!--  -->
                    {#if !user}
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/users/create'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/users/create')}>
                                Create Account
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname === '/login'
                                ? 'page'
                                : undefined}
                        >
                            <a class="nav-link" href={resolve('/login')}>
                                Login
                            </a>
                        </li>
                        <li
                            class="nav-item"
                            aria-current={page.url.pathname ===
                            '/reset-password'
                                ? 'page'
                                : undefined}
                        >
                            <a
                                class="nav-link"
                                href={resolve('/reset-password')}
                            >
                                Reset Password
                            </a>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    </nav>
</header>

<style>
    .navbar {
        background-color: #141414;
        --bs-navbar-brand-color: #c8c8c8;
        --bs-navbar-hover-color: #82c6e0;
        --bs-navbar-active-color: #ff00ff;
        --bs-navbar-brand-hover-color: var(--bs-navbar-hover-color);
        --bs-navbar-color: #2ebe31;
    }
</style>
