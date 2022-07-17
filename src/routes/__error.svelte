<script context="module">
	import { dev } from '$app/env';

	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }) {
		return {
			props: {
				error,
				status
			}
		};
	}
</script>

<script>
	import SEO from 'svelte-seo';
	/** @type {Number} */
	export let status;
	/** @type {Error}*/
	export let error;
</script>

<SEO title="{status} Error" />
<div class="text-center" id="error_box">
	{#if status === 404}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">Hey, it seems you are lost😕</p>
		{#if dev}
			{error}
		{/if}
		<img
			src="https://ik.imagekit.io/kudadam/svg/astronaut.svg"
			loading="lazy"
			alt="Error"
			class="block mx-auto w-full"
		/>
	{:else if status === 500}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">Sorry, there has been a server error</p>
		{#if dev}
			{error}
		{/if}
		<img
			src="https://ik.imagekit.io/kudadam/svg/error_server.svg"
			loading="lazy"
			alt="Error"
			class="block mx-auto w-full"
		/>
	{:else}
		<h2 class="text-5xl md:text-7xl text-red-500 font-bold mt-10">{status} Error</h2>
		<p class="text-3xl mt-10">There seems to be an error somewhere</p>
	{/if}
</div>

<style>
	img {
		height: 400px;
	}
</style>
