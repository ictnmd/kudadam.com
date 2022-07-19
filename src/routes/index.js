import { getProjects } from './projects/index.js';
import { getPopularArticles } from './blog/index.json.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const results = {
		projects: getProjects(),
		articles: await getPopularArticles()
	}

	return {
		body: results
	};
};
