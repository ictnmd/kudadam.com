import { getFiles } from '../blog/index.json';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const files = await getFiles();
	const results = {
		data: files
	}
	return {
		body: results
	};
};
