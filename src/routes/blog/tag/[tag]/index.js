import { getFiles } from '../../index.json.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {
	const tag = params.tag;
	let posts = await getFiles();
	/** @type {Array<any>} */
	let data = posts.filter((post) => {
		if (post.tags) {
			return post.tags.includes(tag);
		}
	});

	/**
	 * @typedef Results
	 * @type {Object[]}
	 * @property {Array<any>} posts - This is an array which holds the blog posts
	 * @property {String} tag - Contains the current page tag
	 * @returns {Object} Returns the data
	 */

	/** @type {Results} */
	const results = {
		posts: data,
		tag
	}


	return {
		body: results
	};
};
