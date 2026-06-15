<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
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
                <ul class="navbar-nav">
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
                    <li
                        class="nav-item"
                        aria-current={page.url.pathname === '/about'
                            ? 'page'
                            : undefined}
                    >
                        <a class="nav-link" href={resolve('/about')}> About </a>
                    </li>
                    <li
                        class="nav-item"
                        aria-current={page.url.pathname === '/about'
                            ? 'page'
                            : undefined}
                    >
                        <a class="nav-link" href={resolve('/skills')}>
                            Skills
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
