import { getFiles } from '../index.json';
import { token_set_ratio } from 'fuzzball';

/** This function returns related articles between a title and a list of titles
 * @param {String} title 
 * @param {Array<any>} posts 
 * @returns Array of blog posts
 */
const getRelatedArticles = async (title, posts) => {
	const titles = posts
		.map((post) => {
			return post.title;
		})
		.filter((post) => post !== title);
	const related_titles = titles.filter((post) => {
		return token_set_ratio(title, post) >= 50;
	});
	const related_posts = new Set();
	for (let i in related_titles) {
		let related_title = related_titles[i];
		for (let j in posts) {
			let post = posts[j];
			if (post.title === related_title) {
				related_posts.add(post);
			}
		}
	}
	const related_articles = [...related_posts].map((post) => {
		delete post['html'];
		return post;
	});
	return related_articles;
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {

	/**
	 * @typedef {Object} Results
	 * @property {Array<String>} related_articles - List of related articles
	 * @property {Array<any>} readingTime - The reading time object
	 */

	const files = await getFiles();
	const slug = params.slug;
	const { title, readingTime } = files.filter((file) => file.slug === slug)[0];
	const relatedArticles = await getRelatedArticles(title, files);

	/** @type {Results} */
	const results = {
		related_articles: [...relatedArticles],
		readingTime
	}

	return {
		body: results
	};
};
