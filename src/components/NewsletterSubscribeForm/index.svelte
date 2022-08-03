<script>
	import { enhance } from "$utils/actions";

	/**
	 * 
	 * @param {HTMLFormElement} form
	 * @param  {Request} request
	 */
	const done = (form)=>{
		alert("Please verify the request in your inbox");
		form.reset();
	}

	/**
	 * 
	 * @param {HTMLFormElement} form
	 */
	const error = (form)=>{
		alert("Please verify the request in your inbox");
		form.reset();
	}
</script>

<form
	on:submit|preventDefault
	class="max-w-sm bg-purple-700 py-1 px-3 rounded-lg"
	use:enhance={{done}}
	action="https://f193a4a1.sibforms.com/serve/MUIEAAP0t5rcDsVExcu5qWsNa1horTGNxpImyu3hnKxj3MX0tUKYhkp9i6QYQ75YemzsYOJAFRnuwSOR9BXBSq5T2AEC3C4NevrqRM1hVDqcosiDFbjUnaFTXQz0NEzAx0f5FphplTvQbUkOGcB4xAmSNLZmjRbQ1Q0lCruCq_YIepL9_epJo17koQYX3gEqltxyXlqzsc5Darda"
	method="POST"
>
	<h3 class="text-3xl text-white mb-4 font-semibold">Subscribe to Newsletter</h3>
	<input type="text" class="my-1" placeholder="Your First Name" name="FIRSTNAME">
	<input
		type="email"
		class="!bg-white p-1"
		name="EMAIL"
		placeholder="Email Account"
		title="Your email address"
		required
	/>
	<button class="mt-3 text-lg" type="submit">Subscribe</button>
</form>

<style type="text/postcss">
	input {
		color: black;
	}
	input::placeholder {
		@apply text-gray-600;
	}
</style>