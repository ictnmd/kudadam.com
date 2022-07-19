import projects from './projects.json';
import { chunk } from '$utils';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ url }) => {
	/** @type {Number} */
	let perPage = 6;
	let page = 1;

	if (url.searchParams) {
		if (url.searchParams.has('page'))
			page = parseInt(url.searchParams.get('page') ?? "");

		if (url.searchParams.has('per_page')) perPage = parseInt(url.searchParams.get('per_page')?? "");
	}
	let chunks = chunk(projects, perPage);


	const results = {
		projects: chunks[page - 1]
	}

	return {
		body: results
	};
};

export const getProjects = () => {
	return projects;
};
