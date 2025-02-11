<script context="module">
	import Card from '$components/BlogCard';
	import { PaginationNav } from 'svelte-better-paginate';
	import Head from 'svelte-seo';
</script>

<script>
// @ts-nocheck

	/** @type {Array<any>}*/
	export let posts;
	/** @type {Number}*/
	export let total;
	/** @type {Array<any>}*/
	export let popular_articles;

	const meta = {
		title: 'Blog - My personal journal • Kudadam',
		description:
			'My personal journal where I write about tutorials, hacks and everything in-between',
		keywords: 'lucretius blog, lucretius biah blog, web developer blog, developer blog, portfolio',
		canonical: 'https://www.kudadam.com/blog',
		image: 'https://ik.imagekit.io/kudadam/logo/logo.png'
	};
</script>

<Head
	title={meta.title}
	description={meta.description}
	keywords={meta.keywords}
	canonical="https://www.kudadam.com/blog"
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
				alt: 'Blog post'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${meta.title}`,
		description: `${meta.description}`,
		image: `${meta.image}`,
		imageAlt: 'Blog Logo'
	}}
/>

<main>
	<div>
		<div class="text-center">
			<h1>The Blog</h1>
			<p>My personal journal where I write about tutorials, hacks and everything in-between</p>
		</div>
		<div>
			<h2 class="ml-4 my-6 font-bold headings dark:text-white text-current inline-block">
				Popular Articles
			</h2>
			<div class="overflow-x-auto lg:fancy-scrollbar items-center flex scroll-smooth snap-x mb-8">
				<section class="flex gap-x-4">
					{#each popular_articles as article (article.id)}
						<Card
							class="mr-3 snap-start"
							title={article.title}
							image={article.image}
							date={article.date}
							slug={article.slug}
							category={article.category}
							excerpt={article.excerpt}
							readingTime={article.readingTime.text}
						/>
					{/each}
				</section>
			</div>
			<div>
				<h2 class=" my-6 font-bold headings dark:text-white text-current inline-block">
					Latest Articles
				</h2>
				<section class="flex gap-x-4 flex-wrap items-center justify-center">
					{#each posts as post (post.id)}
						<Card
							title={post.title}
							image={post.image}
							date={post.date}
							slug={post.slug}
							category={post.category}
							excerpt={post.excerpt}
							readingTime={post.readingTime.text}
						/>
					{/each}
				</section>
			</div>
			<PaginationNav
				let:value={pageNumber}
				currentPage={1}
				totalItems={total}
				pageSize={6}
				limit={1}
			>
				<a
					sveltekit:prefetch
					href={pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`}
					class="button hover:text-white visited:text-white px-4"
					slot="number">{pageNumber}</a>
				<span slot="ellipsis">...</span>
			</PaginationNav>
		</div>
	</div>
</main>

<style type="text/postcss">
	:global(.headings::after) {
		display: block;
		content: '';
		padding: 2px;
		border-radius: 8px;
		width: 98%;
		background-color: tomato;
	}

	main {
		display: grid;
		grid-template-columns: 1fr min(75rem, 100%) 1fr;
	}

	main div {
		grid-column: 2/3;
	}
</style>
