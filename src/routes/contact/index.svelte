<script>
	import whatsapp  from '$lib/icons/whatsapp-brands.svg?raw';
	import phone from "$lib/icons/phone.svg?raw";
	import telegram from "$lib/icons/telegram-brands.svg?raw";
	import Icon from '$components/Icon';
	import Head from 'svelte-seo';
	import { enhance } from "$utils/actions";

	const SEO = {
		title: 'Contact Me • Kudadam',
		description: 'This page contains all the information needed to contact me',
		keywords: 'contact lucretius, contact kudadam, contact lucretius biah',
		canonical: 'https://www.kudadam.com/contact',
		image: 'https://ik.imagekit.io/kudadam/logo/logo.png'
	};


	/**
	 * 
	 * @param {HTMLFormElement} form
	 */
	const done = (form) => {
		alert('Mail has been sent');
		form.reset();
	};

	/**
	 * 
	 * @param {HTMLFormElement} form
	 */
	const error = (form) => {
		alert('There was an error sending the mail');
		form.reset
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords}
	canonical={SEO.canonical}
	openGraph={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		url: `${SEO.canonical}`,
		type: 'website',
		images: [
			{
				url: `${SEO.image}`,
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: `${SEO.image}`,
		imageAlt: 'Logo of Kudadam'
	}}
/>

<main>
	<div>
		<div class="text-center">
			<h1>Contact Page</h1>
			<p>In case you ever want to get in touch with me😊</p>
		</div>
		<form
			use:enhance={{ done, error }}
			action="https://usebasin.com/f/d5fbba0eef70"
			method="POST"
			class="mt-8 max-w-sm mx-auto p-3 border dark:border-neutral-800 rounded"
		>
			<div>
				<label for="name">Name</label>
				<input required type="text" id="name" name="name" />
			</div>
			<div>
				<label for="email">Email</label>
				<input required type="text" id="email" name="email" />
			</div>
			<div>
				<label for="message">Message</label>
				<textarea required name="message" id="" cols="30" rows="4" />
			</div>
			<button type="submit">Submit</button>
		</form>
		<ul class="grid list-none grid-cols-1 mt-6 md:grid-cols-2">
			<li><a href="tel:0249005710"><Icon data={phone}	/> +233 249 005 710</a></li>
			<li><a href="https://wa.link/jebvr2"><Icon data={whatsapp}/> WhatsApp</a></li>
			<li><a href="https://t.me/kudadam"><Icon data={telegram}/> Telegram</a></li>
		</ul>
	</div>
</main>

<style type="text/postcss">
	main {
		display: grid;
		grid-template-columns: 1fr min(65ch, 100%) 1fr;
	}

	main > div {
		grid-column: 2/3;
	}

	ul li a {
		text-decoration: none;
		color: inherit;
		padding: 0px 3px;
	}

	main form > div {
		@apply my-2;
	}
</style>
