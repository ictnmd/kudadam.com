// @ts-nocheck
import Path from 'path';
import { chunk } from '$utils';
import { mode } from '$app/env';
import sqlite from 'sqlite3';
import { readingTime } from '$utils';

const db = new sqlite.Database('./database.db', () => {});
db.serialize(() => {
	db.run(
		`
	CREATE TABLE IF NOT EXISTS blog	 (
		slug VARCHAR(255) UNIQUE NOT NULL,
		hits INT DEFAULT 1 NOT NULL
	)
`,
		() => {}
	);
});

/**
 * 
 * @returns {Array<any>} - An array containing blog posts
 */
export const getFilesHtml = async () => {
	let array = new Array();
	let data = import.meta.glob('./_blog/**/*.md');
	for (const datum in data) array.push([Path.win32.basename(Path.dirname(datum)), data[datum]()]);
	let id = 1;
	let files = Promise.all(
		array.map(async (file) => {
		let { metadata } = await file[1];
			let def = await file[1];
			metadata.html = def.default.render().html;
			metadata.slug = file[0];
			metadata.id = id;
			id++;
			return metadata;
		})
	);
	files = await files;
	files = files.filter((data) => data.draft !== true || mode === 'development');
	files = files.sort((a, b) => new Date(b.date) - new Date(a.date));
	return files;
};

export const getFiles = async () => {
	let array = new Array();
	let data = import.meta.glob('./_blog/**/*.md');
	for (const datum in data) array.push([Path.win32.basename(Path.dirname(datum)), data[datum]()]);
	let id = 1;
	let files = Promise.all(
		array.map(async (file) => {
			let { metadata } = await file[1];
			let def = await file[1];
			metadata.slug = file[0];
			metadata.readingTime = readingTime(def.default.render().html);
			metadata.id = id;
			id++;
			return metadata;
		})
	);
	files = await files;
	files = files.filter((data) => data.draft !== true || mode === 'development');
	files = files.sort((a, b) => new Date(b.date) - new Date(a.date));
	return files;
};

export const getPopularArticles = async () => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.all('SELECT * FROM BLOG ORDER BY hits DESC LIMIT 0,6', (err, data) => {
				if (err) {
					reject(err);
				} else {
					getFiles().then((files) => {
						let valid = files.filter((file) => {
							let popular_slug = data.map((data) => {
								return data.slug;
							});
							return popular_slug.includes(file.slug);
						});
						resolve(valid);
					});
				}
			});
		});
	});
};

/** @type import('@sveltejs/kit').RequestHandler */
export const GET = async ({ url }) => {
	let posts = await getFiles();
	posts = posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
	let unsorted = posts;
	let perPage = 6;
	let page = 1;
	let query = url.searchParams;
	let results = new Object();
	results['posts'] = posts[0];

	if (query.get('page')) {
		let page = query.get('page');
		results['posts'] = posts[page - 1];
	}

	if (query.get('popular_articles')) {
		let popular_data = await getPopularArticles();
		results['popular_articles'] = popular_data;
	}

	if (query.get('per_page')) perPage = query.get('per_page');

	if (query.get('page')) page = query.get('page');

	if (query.has('total')) {
		results['total'] = unsorted.length;
	}

	if (query.get('all')) {
		results['all'] = unsorted;
	}

	if (query.has('exclude')) {
		/* 
		This always has to be the last, 
		it is used to removed items from the object
		*/
		let excluded = query.get('exclude').split(',');
		excluded.forEach((key) => {
			delete results[key];
		});
	}

	let chunked = chunk(posts, perPage);
	results['posts'] = chunked[page - 1];

	if (query.get('limit')) {
		results['limit'] = chunked.length;
	}

	return {
		headers: {
			'Content-Type': 'application/json'
		},
		body: results
	};
};
