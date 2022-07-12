<script context="module">

	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ params, props }) => {
		const slug = params.slug;
		let component = await import(`../_blog/${slug}/index.md`);
		component.metadata["slug"] = slug;
		component.metadata["readingTime"] = props.readingTime;
		return {
			props: {
				content: component.default,
				metadata: component.metadata,
				related_articles: [...props.related_articles]
			}
		};
	};
</script>

<script>
	import Head from "svelte-seo";
	import Card from "$components/BlogCard";
	import RectangleList from "$lib/icons/RectangleList.svelte";
	import Tags from "$lib/icons/Tags.svelte";
	import Eye from "$lib/icons/Eye.svelte";
	import { snakeCase, importScripts } from "$utils";
	import { onMount } from "svelte";
	import { browser } from "$app/env";
	import { page } from "$app/stores";
	import ImageKit from "$utils/imagekit.js";
	import PageProgress from "svelte-scrollprogress";
	import { theme } from "$lib/stores";
	import Cusdis from "svelte-cusdis";

	/**
	@type {{
		title: String,
		slug: URL,
		description: String,
		keywords: Array<String>,
		date: Date,
		image: URL
	}} */
	export let metadata;
	/** @type {Object} */
	export let content;
	/** @type {Array<any>} */
	export let related_articles;

	/** @type {Number} */
	let hits;
	$: hits = 0;

	onMount(async () => {
		await fetch(`/blog/${metadata.slug}.json`, {
			method: "POST",
			body: JSON.stringify({ hits: "increase" })
		});
		importScripts("https://static.addtoany.com/menu/page.js");
		import("$lib/css/highlighting.css");
		let hits_response = await fetch(`/blog/${metadata.slug}.json`);
		let hits_data = await hits_response.json();
		console.log(hits_data);
		hits = hits_data.hits;
	});
</script>

<Head
	title="{metadata.title} • Kudadam Blog"
	description={metadata.description}
	keywords={metadata.keywords.toString()}
	canonical="https://kudadam.com/blog/{metadata.slug}"
	openGraph={{
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		type: "article",
		url: `https://www.kudadam.com/blog/${metadata.slug}`,
		article: {
			publishedTime: `${metadata.date}`,
			// modifiedTime: `${post[0].last_updated}`,
			authors: [`Lucretius Biah`]
		},
		images: [
			{
				url: `${metadata.image}`,
				width: 850,
				height: 650,
				alt: "Alt image"
			}
		]
	}}
	twitter={{
		site: "@kudadam_",
		title: `${metadata.title}`,
		description: `${metadata.description}`,
		image: `${metadata.image}`,
		imageAlt: `${metadata.title}`
	}}
	jsonLd={{
		"@type": "TechArticle",
		headline: `${metadata.title}`,
		keywords: `${metadata.keywords}`,
		datePublished: `${new Date(metadata.date).toISOString()}`,
		image: [
			`${metadata.image ? metadata.image : "https://ik.imagekit.io/kudadam/logo/logo.png?q=30"}`
		],
		author: {
			"@type": "Person",
			name: "Lucretius Biah",
			url: "https://www.kudadam.com/about"
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://www.kudadam.com/blog/${metadata.slug}`
		}
	}}
/>

<main>
	<div id="page">
		<h1 class="text-center font-bold text-gray-700 capitalize dark:text-white">{metadata.title}</h1>
		{#if metadata.image}
			<img
				data-lazy-load={true}
				src={ImageKit(metadata.image,{
					blur:70,
					quality:1
				})}
				data-src={ImageKit(metadata.image,{
					quality:90
				})}
				alt={metadata.title}
				id="post-image"
				class="h-56 my-4 rounded md:h-80 md:max-h-80 max-h-52 w-full"
			/>
		{/if}
		<article class="leading-tight px-2" id="content" data-slug={metadata.slug}>
			<div class="flex text-base w-full justify-between gap-x-2">
				<span>{metadata.readingTime.text}</span>
				<date datetime={metadata.date}>{new Date(metadata.date).toDateString()}</date>
			</div>
			<svelte:component this={content} />
		</article>
		<ul class="py-2 px-4 my-1 text-base pl-2 list-none gap-x-2">
			<li>
				<span
					><RectangleList />
					<a href="/blog/category/{snakeCase(metadata.category)}">{metadata.category}</a></span
				>
			</li>
			<li class="flex gap-x-3 items-center">
				{#if metadata.tags}
					<Tags />
					{#each metadata.tags as tag}
						<a href="/blog/tag/{tag}">#{tag}</a>
					{/each}
				{/if}
			</li>
			<li><Eye /> {hits}</li>
		</ul>
		<p class="font-bold text-lg text-[tomato] text-center">Share this article</p>
		<!-- AddToAny BEGIN -->
		<div class="a2a_kit a2a_kit_size_38 flex justify-center a2a_default_style">
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_dd" href="https://www.addtoany.com/share" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_reddit" />
			<!--svelte-ignore a11y-missing-attribute -->
			<!--svelte-ignore a11y-missing-content -->
			<a class="a2a_button_twitter" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_hacker_news" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_telegram" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_whatsapp" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_facebook" />
			<!--svelte-ignore a11y-missing-content -->
			<!--svelte-ignore a11y-missing-attribute -->
			<a class="a2a_button_pocket" />
		</div>
		<script>
			var a2a_config = a2a_config || {};
			a2a_config.onclick = 1;
		</script>
		<script async src="https://static.addtoany.com/menu/page.js"></script>

		{#if browser && related_articles && related_articles.length >= 1}
			<div class="mt-[100px] px-2">
				<h3>Related Articles</h3>
				<div class="flex overflow-auto gap-x-4 snap-x xl:fancy-scrollbar">
					{#each related_articles as article (article.id)}
						<div class="flex">
							<Card
								title={article.title}
								slug={article.slug}
								image={article.image}
								excerpt={article.excerpt}
								date={article.date}
								category={article.category}
								readingTime={article.readingTime.text}
								class="mr-3 snap-start"
							/>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<h3>Comments</h3>
		<div class="px-2">
			<Cusdis
				on:load={() => {
					window.CUSDIS.initial();
					window.CUSDIS.setTheme($theme);
				}}
				attrs={{
					appId: "2f49c941-a723-4350-a9eb-cad6fab4772b",
					pageId: `${metadata.slug}`,
					pageUrl: `${$page.url.pathname}`,
					pageTitle: `${metadata.title}`,
					theme: `${$theme}`
				}}
			/>
		</div>
	</div>

<PageProgress/>
<!--
  The use of the style tag below is to remove the padding from the Layout
  Using the svelte style tag will lead to the padding being removed for all subsequent pages
-->
<style>
	#layout_root {
		@apply px-0;
	}
</style>
</main>

<style type="text/postcss">

	main {
		display: grid;
		grid-template-columns: 1fr min(65ch, 100%) 1fr;
	}
	main > div#page {
		grid-column: 2/3;
	}

	#content :global(img:not(#post-image)) {
		@apply mx-auto my-4 rounded;
	}

	:global(.intro) {
		@apply text-xl font-light italic py-6;
	}

	:global(.toc) {
		@apply my-4;
	}

	:global(.toc::before) {
		@apply font-semibold text-xl inline-block my-1;
	}

	:global(.toc ol li a) {
		color: inherit;
	}
</style>


