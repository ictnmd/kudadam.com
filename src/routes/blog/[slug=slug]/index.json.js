import sqlite from 'sqlite3';

const db = new sqlite.Database('./database.db', () => {}); //This command will create the database for us if it does not exist

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
//Then over here we create our table which will store the hit counts
/**
 * 
 * @param {String} slug 
 * @returns 
 */
const getHitsCount = async (slug) => {
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.get('SELECT * FROM blog WHERE slug = ?', slug, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	});
};

/**
 * 
 * @param {String} slug - The slug for the blog post 
 * @param {Number} hits - The hits number for the blog posts
 * @returns <Promise>
 */
const increaseHitsCount = async (slug, hits) => {
	return new Promise((resolve, reject) => {
		db.serialize(
			() => {
			if (hits === undefined) {
				db.run('INSERT INTO blog (slug, hits) VALUES (?,?) ', [slug, 1], (/** @type {Error} */ err, /** @type {Array<any>} */ data) => {
					if (err) reject(err);
					else resolve(data);
				});
			} else {
				db.run('UPDATE blog SET hits = ? WHERE slug = ?', hits + 1, slug, (/** @type {Error} */ err, /** @type {Array<any>} */ data) => {
					if (err) resolve(err);
					else resolve(data);
				});
			}
		});
	});
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	/**
	 * @typedef {Object} Results
	 * @property {String} slug - The slug
	 * @property {Number} hits - The hits
	 */
	let { slug } = params;
	let hits = await getHitsCount(slug);
	let hits_data = hits === undefined ? 1 : hits.hits;

	/** @type {Results} */
	let results = {
		slug,
		hits: hits_data
	}
	return {
		headers: {
			'Content-Type': 'application/json'
		},
		body: results
	};
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request, params }) => {
	const body = await request.json();
	const slug = params.slug;

	if (body.hits) {
		let hits = await getHitsCount(slug);
		let hits_data = hits === undefined ? undefined : hits.hits;
		increaseHitsCount(slug, hits_data);
	}
	return {
		body: { success: true }
	};
};
