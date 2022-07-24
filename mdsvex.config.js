import { defineMDSveXConfig as defineConfig } from 'mdsvex';

import remark_slug from 'remark-slug';
import remark_emoji from 'remark-emoji';
import remark_attr from 'remark-attr';
import remark_breaks from 'remark-breaks';
import rehype_toc from 'rehype-toc';
import rehype_external_links from 'rehype-external-links';

const config = defineConfig({
	extensions: ['.md'],
	rehypePlugins: [
		[
			rehype_toc,
			{
				/** This function modifies the table of contents 
				 * before rendering it
				 * @param {Node} toc 
				 */
				customizeTOC: (toc) => {
					if (toc.children[0].children.length >= 1) {
						// Adds a paragraph element which contains the text "Table Of Contents"
						toc.children.unshift({
							type: 'element',
							tagName: 'p',
							properties: {
								className: 'font-semibold text-xl inline-block my-1 text-center'
							},
							children: [
								{
									type: 'text',
									value: 'Table Of Contents'
								}
							]
						});
					}
				}
			}
		],
		[
			rehype_external_links,
			{
				target: '_blank'
			}
		]
	],

	remarkPlugins: [
		[
			remark_attr,
			{
				scope: 'every'
			}
		],
		remark_slug,
		remark_emoji,
		remark_breaks
	]
});

export default config;
