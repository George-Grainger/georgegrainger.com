import { defineMDSveXConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkExternalLinks from 'remark-external-links';

export default defineMDSveXConfig({
	extensions: ['.md'],
	rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
	remarkPlugins: [[remarkExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }]]
});
