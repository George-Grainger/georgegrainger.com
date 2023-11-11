import { getProjects, type Project } from '$lib/utils/server/projects';

const siteURL = 'https://georgegrainger.com';
const siteTitle = "George Grainger's Portfolio";
const siteDescription =
	"A Computer Science Student based in Manchester, who's interested in machine learning, visual computing and hardware design";

export const prerender = true;

export const GET = async () => {
	const projects = await getProjects();

	const body = render(projects);
	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	};

	return new Response(body, options);
};

const render = (projects: Project[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
${projects
	.map(
		(project) => `<item>
<guid isPermaLink="true">${siteURL}${project.slug}</guid>
<title>${project.title}</title>
<link>${siteURL}${project.slug}</link>
<description>${project.title}</description>
<pubDate>${new Date(project.date).toUTCString()}</pubDate>
</item>`
	)
	.join('')}
</channel>
</rss>
`;
