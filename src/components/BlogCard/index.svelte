<script type="text/javascript">
	import ImageKit from '$utils/imagekit.js';
	import { snakeCase } from '$utils';

	export let title;
	export let slug;
	export let image;
	export let category = undefined;
	export let excerpt;
	export let readingTime = undefined;
	export let date;

	const imageProps = {
		height: 200,
		width: 320
	};
</script>

<article class="border border-neutral-200 dark:border-neutral-800  {$$props.class}">
	{#if image}
		<a href="/blog/{slug}" sveltekit:prefetch>
			<img
				style:--image-height="{imageProps.height}px"
				data-lazy-load={true}
				src={ImageKit(image, {
					blur: 70,
					height: imageProps.height,
					width: imageProps.width,
					quality: 2
				})}
				data-src={ImageKit(image, {
					height: imageProps.height,
					width: imageProps.width,
					quality: 80
				})}
				alt={title}
				width={imageProps.width}
				height={imageProps.height}
			/>
		</a>
	{/if}
	<div>
		{#if category}
			<small>
				<a sveltekit:prefetch href="/blog/category/{snakeCase(category)}">{category}</a>
			</small>
		{/if}
		<h2>
			<a
				class="dark:text-white text-gray-800 visited:text-gray-800"
				sveltekit:prefetch
				href="/blog/{slug}"
			>
				{title}
			</a>
		</h2>
		<p>{excerpt}</p>
		<div>
			<small><time datetime={date}>{new Date(date).toDateString()}</time></small>
			{#if readingTime}
				<small>{readingTime}</small>
			{/if}
		</div>
	</div>
</article>

<style type="text/postcss">
	article {
		width: 320px;
		margin-bottom: 2rem;
		position: relative;
	}

	article img {
		height: var(--image-height);
	}

	article h2 {
		margin: 0;
		font-weight: 600;
		@apply text-xl;
	}

	article h2 a:hover {
		text-decoration: none;
	}

	article div div {
		position: absolute;
		bottom: 0;
		font-size: medium;
		left: 0;
		padding: 0 5px;
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	article time {
		font-weight: 500;
	}

	article div p {
		display: -webkit-box;
		font-size: medium;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	article small a {
		text-decoration: none;
		font-weight: bold;
		color: transparent;
		background-clip: text;
		background-image: linear-gradient(red, yellow);
	}

	article > div {
		padding: 5px;
		padding-bottom: 20px;
	}
</style>
