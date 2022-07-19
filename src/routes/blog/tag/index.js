import { getFiles } from '../index.json.js';

export const GET = async () => {
	const posts = await getFiles();
	const tags = new Set();
	posts.forEach((post) => {
		// @ts-ignore
		if (post.tags) tags.add(...post.tags);
	});
	const results = {
		tags: [...tags]
	}
	return {
		body: results
	};
};
