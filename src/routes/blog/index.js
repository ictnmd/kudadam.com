import { chunk } from '$utils';
import { getFiles, getPopularArticles } from './index.json.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
	const posts = await getFiles();

	const results = {
		posts: chunk(posts, 6)[0],
		total: posts.length,
		popular_articles: await getPopularArticles()
	}


	return {
		body: results
	};
};
