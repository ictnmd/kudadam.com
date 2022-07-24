<script>
	import Icon from "$components/Icon";
	import github from '$lib/icons/github-brands.svg?raw';
	import twitter from '$lib/icons/twitter-brands.svg?raw';
	import whatsapp from '$lib/icons/whatsapp-brands.svg?raw';
	import telegram from "$lib/icons/telegram-brands.svg?raw";
	import pulse from '$lib/icons/heart-pulse.svg?raw';
	import rss from "$lib/icons/rss-solid.svg?raw";
	import Subscribe from '$components/NewsletterSubscribeForm';
</script>

<footer class="bg-gray-800 text-gray-400 text-base pt-4 mt-14 md:relative w-fullx`x">
	<div
		class="px-3 flex flex-wrap justify-evenly xl:justify-center  gap-x-20 mt-4 mb-2"
		id="flexible"
	>
		<div class="xl:absolute xl:-top-8 mb-6 xl:left-4">
			<Subscribe />
		</div>
		<div>
			<p class="font-bold my-1">Quick Links</p>
			<ul>
				<li><a href="/about" sveltekit:prefetch>About</a></li>
				<li><a href="/contact" sveltekit:prefetch>Contact</a></li>
				<li><a href="/blog" sveltekit:prefetch>Blog</a></li>
				<li><a href="/projects" sveltekit:prefetch>Projects</a></li>
				<li><a href="/blog/feed.xml" sveltekit:prefetch><Icon data={rss} class="inline"/> RSS feed</a></li>
				<li><a href="/sitemap.xml" sveltekit:prefetch>Sitemap.xml</a></li>

			</ul>
		</div>
		<div>
			<p class="font-bold my-1">Contact</p>
			<ul>
				<li>
					<a href="https://www.github.com/kudadam" target="_blank" rel="noopener">
						<Icon data={github} class="inline"/> Github
					</a>
				</li>
				<li>
					<a href="https://twitter.com/kudadam_" target="_blank" rel="noopener"
						><Icon data={twitter} class="inline" /> kudadam_</a
					>
				</li>
				<li>
					<a href="https://wa.link/7hc27i"><Icon class="inline" data={whatsapp}/> WhatsApp</a>
				</li>
				<li><a href="https://t.me/kudadam"><Icon data={telegram}/> Telegram</a></li>
			</ul>
		</div>
	</div>
	<div class="text-center">
		<p class="pb-1">
			<span class="block md:inline"
				>Made with <Icon data={pulse} class="animate-pulse text-red-500"/> and built with
				<a href="https://kit.svelte.dev" target="_blank" rel="noopener">SvelteKit</a></span
			>
			<span class="invisible md:visible">·</span>
			<span
				>Source code is available on <a
					target="_blank"
					rel="noopener"
					href="https://github.com/kudadam/kudadam.com">Github</a
				></span
			>
		</p>
		<p class="bg-black m-0">copyright &copy; 2020 - Today, Lucretius Biah</p>
	</div>
</footer>

<style type="text/postcss">
	footer * {
		@apply text-base !important;
	}
	#flexible ul {
		padding: 5px;
	}
	#flexible ul li {
		padding: 0px;
		padding-bottom: 4px;
	}
	#flexible a {
		color: inherit !important;
		@apply hover:underline;
	}

	ul {
		list-style: none;
	}
</style>
