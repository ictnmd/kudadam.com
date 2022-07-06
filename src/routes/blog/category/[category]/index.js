import { getFiles } from "../../index.json.js";
import { snakeCase } from "$utils";

export const get = async ({ params }) => {
	const category = params.category;
	const posts = await getFiles();
	let data = posts.filter((post) => {
		return snakeCase(post.category) === category;
	});

	const results = new Object();
	results["posts"] = data;
	results["category"] = data[0].category;

	if (data.length === 0) {
		return {
			status: 404
		};
	}

	return {
		body: results
	};
};
