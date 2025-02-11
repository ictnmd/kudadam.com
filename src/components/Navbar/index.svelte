<script type="text/javascript">
	import magnifying_glass from '$lib/icons/magnifying-glass.svg?raw';
	import Search from '$components/SiteSearch';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import moon from '$lib/icons/moon.svg?raw';
	import sun from '$lib/icons/sun.svg?raw';
	import { theme } from '$lib/stores';
	import { debounce } from '$utils';

	import Header from 'svelte-headroom';

	let hidden = true;
	/** @type {HTMLElement} */
	let navElement;
	let hideSearch = true;
	let nav_links = [
		{ name: 'About', url: '/about', id: 1 },
		{ name: 'Contact', url: '/contact', id: 2 },
		{ name: 'Projects', url: '/projects', id: 3 },
		{ name: 'Blog', url: '/blog', id: 4 }
	];

	const setMode = () => {
		if ($theme === 'light') {
			document.documentElement.classList.add('dark');
			theme.set('dark');
		} else {
			document.documentElement.classList.remove('dark');
			theme.set('light');
		}
	};

	onMount(() => {
		document.addEventListener('mouseup', (e) => {
			let selected = e.target;
			// @ts-ignore
			let closest = selected.closest('nav');
			if (closest == null) hidden = true;
		});
		// @ts-ignore
		document.querySelector('#nav__header').parentElement.style.zIndex = '9999';
	});
</script>

<svelte:window
	on:scroll={debounce(() => {
		window.scrollY >= 35
			? navElement.classList.add('border-b')
			: navElement.classList.remove('border-b');
	}, 30)}
/>
<svelte:head>
	<script>
		if (document) {
			let site_theme = localStorage.theme || 'light';
			if (site_theme === 'dark') {
				document.documentElement.classList.add('dark');
				localStorage.theme = 'dark';
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.theme = 'light';
			}
		}
	</script>
</svelte:head>

<Header
	offset={250}
	on:unpin={() => {
		hidden = true;
	}}
	on:pin={() => {
		document.querySelector('#nav__header').parentElement.style.zIndex = '100';
	}}
>
	<nav
		bind:this={navElement}
		id="nav__header"
		class="flex z-30 p-1 top-0 w-full bg-white navbar dark:border-neutral-800 flex-wrap dark:bg-neutral-900"
	>
		<a
			class="flex font-medium md:font-semibold text-lg items-center justify-center"
			href="/"
			title="Go to homepage"
			><img
				src="https://ik.imagekit.io/kudadam/logo/logo.png/tr:w-40,h-40"
				height="40"
				width="40"
				alt=""
			/><span class="hidden md:inline text-[color:var(--light-text-color)] dark:text-white"
				>Kudadam</span
			></a
		>
		<span
			class="ml-auto block p-2"
			on:click={() => (hideSearch = !hideSearch)}
			title="Search the website for information">{@html magnifying_glass}</span
		>
		<button
			title="Open or close navigation bar"
			aria-label={hidden === true ? 'open' : 'close'}
			class="ml-auto shadow-none px-1 md:hidden bg-transparent !text-inherit"
			on:click={() => {
				hidden = !hidden;
			}}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 !text-inherit"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					class="!text-gray-700 dark:text-gray-300"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h7"
				/>
			</svg></button
		>
		<div
			class="block md:flex md:ml-auto w-full md:w-auto duration-500 overflow-y-hidden"
			class:hidden
			id="nav-menu"
		>
			<ul class="md:flex list-none">
				{#each nav_links as { name, url, id } (id)}
					<li class="p-2 text-lg font-semibold">
						<a
							href={url}
							sveltekit:prefetch
							class="text-gray-700 !block"
							class:active={$page.url.pathname === `/${name.toLowerCase()}`}
							on:click={() => {
								hidden = true;
							}}>
							{name}
						</a>
					</li>
				{/each}
				<li class="text-lg  font-semibold p-2">
					<span on:click={setMode}  title="Change Mode">
						{#if $theme === "light"}
							{@html moon}
						{:else}
							{@html sun}
						{/if}
					</span>
				</li>
				<slot />
			</ul>
		</div>
	</nav>
</Header>
<Search hidden={hideSearch} on:hide={() => (hideSearch = true)} />

<style type="text/postcss">
	:global(.svelte-headroom--unpin) {
		z-index: 9999;
	}

	ul {
		padding: 0px !important;
	}

	.active {
		color: var(--primary-color) !important;
	}

	#nav-menu ul li *:not(.active) {
		@apply dark:text-white;
	}

	a:visited {
		color: initial;
	}

	a:hover {
		text-decoration: none !important;
	}
</style>
