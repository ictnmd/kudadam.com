<script>
	import Head from 'svelte-seo';
	import Card from '$components/BlogCard';

	/** @type {Array<any>}*/
	export let posts;
	/** @type {String}*/
	export let category;

	const meta = {
		title: `Blog Posts On ${category} • Kudadam`,
		description: `Blog posts under ${category} category`,
		canonical: `https://www.kudadam.com/category/${category}`,
		image: "https://ik.imagekit.io/kudadam/logo/logo.png'"
	};
</script>

<Head
	title={meta.title}
	description={meta.description}
	noindex={true}
	nofollow={true}
	openGraph={{
		title: `${meta.title}`,
		description: `${meta.description}`,
		url: `${meta.canonical}`,
		type: 'website',
		images: [
			{
				url: `${meta.image}`,
				width: 850,
				height: 650,
				alt: 'Og Image Alt'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${meta.title}`,
		description: `${meta.description}`,
		image: `${meta.image}`,
		imageAlt: 'Kudadam Logo'
	}}
/>

<main>
	<div>
		<div class="mb-4 mt-8 text-center">
			<h2 class="capitalize text-red-500 dark:text-white font-bold">{category} category</h2>
			<p class="text-black dark:text-white">
				<i>Blog posts under {category}</i>
			</p>
		</div>
		<div class="flex flex-wrap gap-x-4 mt-8 items-center justify-center">
			{#each posts as post}
				<Card
					title={post.title}
					image={post.image}
					date={post.date}
					slug={post.slug}
					excerpt={post.excerpt}
					readingTime={post.readingTime.text}
				/>
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr min(75rem, 100%) 1fr;
	}

	main div {
		grid-column: 2/3;
	}
</style>
