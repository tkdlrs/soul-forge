<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
</script>

<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
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
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"
                            >Home</a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true"
                            >Disabled</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <nav>
        <ul>
            <li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
                <a href={resolve('/')}>Home</a>
            </li>
            <li
                aria-current={page.url.pathname === '/about'
                    ? 'page'
                    : undefined}
            >
                <a href={resolve('/about')}>About</a>
            </li>
            <li
                aria-current={page.url.pathname === '/about'
                    ? 'page'
                    : undefined}
            >
                <a href={resolve('/skills')}>Skills</a>
            </li>
            <li
                aria-current={page.url.pathname.startsWith('/sverdle')
                    ? 'page'
                    : undefined}
            >
                <a href={resolve('/sverdle')}>Sverdle</a>
            </li>
        </ul>
    </nav>
</header>
