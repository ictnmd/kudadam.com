/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (params) => {
	let data = import.meta.glob('/src/routes/blog/_blog/**/*.md');
	let array = new Array();
	for (const datum in data) {
		//@ts-ignore
		array.push(/\/src\/routes\/blog\/_blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/index.md/gm.exec(datum)[1]);
	}
	return array.find((e) => e === params);
};
