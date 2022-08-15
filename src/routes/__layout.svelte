<script>
	import '../app.css';
	import Navbar from '$components/Navbar';
	import LazyloadImages from '$lib/Scripts/lazy-load-images.js';
	import Footer from '$components/Footer';
	import Update from '$components/UpdateWebsite';
	import Head from 'svelte-seo';
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		LazyloadImages();
	});
</script>

<Navbar />

<Head>
	<link rel="alternate" type="application/rss+xml" href="https://www.kudadam.com/blog/feed.xml" />
	<link rel="preconnect" href="https://ik.imagekit.io/kudadam" />
	<script async src="//static.getclicky.com/101376922.js"></script>
</Head>

<div class="container mx-auto min-h-screen px-2 mt-20" id="layout_root">
	<slot />
</div>
<Update />
<Footer />
<noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101376922ns.gif" /></p></noscript>
