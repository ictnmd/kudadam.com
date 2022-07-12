<script type="text/javascript">
	import ImageKit from '$utils/imagekit.js';
	/** @type {String} */
	export let title;
	/** @type {String} */
	export let description;
	/** @type {String} */
	export let image;
	/** @type {String} */
	export let url;
	/** @type {String} */
	export let repo;

	const imageProps = {
		width: 300,
		height: 200
	};
</script>

<article class="border dark:border-neutral-800 border-gray-300 rounded">
	{#if image}
		<img
			style:--image-height={imageProps.height}
			style:--image-width={imageProps.width}
			style:height="{imageProps.height}px"
			height={imageProps.height}
			width={imageProps.width}
			class="block mx-auto w-full"
			alt={title}
			data-lazy-load={true}
			src={ImageKit(image, {
				quality: 2,
				blur: 10,
				height: imageProps.height,
				width: imageProps.width
			})}
			data-src={ImageKit(image, {
				quality: 90,
				height: imageProps.height,
				width: imageProps.width
			})}
		/>
	{/if}
	<div class="p-2 text-center">
		<h2 class="font-semibold text-xl my-1 text-inherit hover:text-[color:var(--primary-color)]">
			{title}
		</h2>
		<p class="leading-6 text-base">{description}</p>
	</div>
	<div class="p-1 flex items-center gap-x-1 w-full">
		{#if url}
			<a class="dark:border-neutral-700 border-neutral-300" href={url}>View Project</a>
		{/if}
		{#if repo}
			<a class="dark:border-neutral-700 border-neutral-300" href={repo}>Repository</a>
		{/if}
	</div>
</article>

<style type="text/postcss">
	article {
		width: 300px;
	}

	img {
		height: var(--image-height);
		width: var(--image-width);
	}

	article:hover h2 {
		color: var(--primary-color);
	}

	article > div > p {
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		display: -webkit-box;
		overflow: hidden;
	}

	article > div:last-child > a {
		@apply w-full text-lg py-1 px-0.5 text-center border rounded text-inherit hover:no-underline;
	}
</style>
