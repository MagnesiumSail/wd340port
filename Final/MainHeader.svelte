<script>

    import { goto } from '$app/navigation'
    import { onMount } from 'svelte';
    import {tokenStore} from '../stores/tokenStore.mjs'


    const logout = () => {
        localStorage.removeItem('sb-flxtlnvnokmvuesdmzbg-auth-token');
        tokenStore.set(null)
        goto('/login');
    }
    

</script>

<div class="container">
	<header>
		<div class="logo-wrapper">
			<a href="/">
				<img
					src="https://cmsv2-assets.apptegy.net/uploads/9761/logo/11289/Madison_School_District_321_logo_template_300.png"
					alt="Madison School District 321 Logo"
					class="school-logo"
					width="50"
					height="50"
				/>
			</a>
			<h1 class="main-heading">Asset Manager</h1>
		</div>
		<nav>
			<ul class="nav-list">
				{#if $tokenStore}
					<li class="nav-item"><a class="nav-link" href="/asset/add">Add</a></li>
					<li class="nav-item"><a class="nav-link" href="/asset/edit">Edit</a></li>
					<li class="nav-item"><a class="nav-link" href="/asset/delete">Delete</a></li>
					<li class="nav-item"><a class="nav-link" href="/asset/filter">View</a></li>
					<li class="nav-item"><button on:click={logout}>Logout</button></li>
				{:else}
					<li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
					<li class="nav-item"><a class="nav-link" href="/signup">Sign up</a></li>
					<li class="nav-item"><a class="nav-link" href="/asset/filter">View</a></li>
				{/if}
			</ul>
		</nav>
	</header>
</div>

<style>
	.logo-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.school-logo {
		padding: 0 1rem;
	}
	.container {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.8);
	}

	.nav-list {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}

	.nav-item {
		margin: 0 1rem;
	}

	.nav-link {
		text-decoration: none;
		color: red;
		font-weight: bold;
		transition: color 0.3s ease;
		padding: 0.5rem 1rem 0;
	}

	.nav-link:hover {
		color: black;
	}

	h1,
	h2 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	ul {
		text-align: left;
		display: inline-block;
	}

	footer {
		font-size: 0.8rem;
		color: #666;
	}
</style>
