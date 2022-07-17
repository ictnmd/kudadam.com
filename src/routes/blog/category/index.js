import { getFiles } from '../index.json.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
	let posts = await getFiles();
	const categories = new Set(
		posts.map((post) => {
			return post.category;
		})
	);
	const results = {
		categories: [...categories]
	}
	return {
		body: results
	};
};
