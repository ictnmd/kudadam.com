import { chunk } from '$utils';
import { getFiles } from '../../index.json.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	/** @type {Number} */
	const page = parseInt(params.page);
	const files = await getFiles();

	if (page === 1) {
		return {
			headers: {
				Location: '/blog'
			},
			status: 301
		};
	}

	if (page > chunk(files, 6).length || page === 0) {
		return {
			status: 404
		};
	}

	const data = chunk(files, 6);
	const results = {
		posts: data[page - 1],
		page,
		total: files.length
	}

	return {
		body: results
	};
};
