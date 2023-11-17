import { getProjects, type Project } from '$lib/utils/server/projects';

export interface Page {
	page: string;
	updated: string;
}

const website = `https://georgegrainger.com`;

export const prerender = true;

export const GET = async () => {
	const projects = await getProjects();

	const pages = [
		{ page: `projects`, updated: `2023-11-12` },
		{ page: `contact`, updated: `2023-11-16` },
		{ page: `preferences`, updated: `2023-11-17` },
		{ page: `privacy-policy`, updated: `2023-11-17` },
		{ page: `terms-of-use`, updated: `2023-11-17` }
	];

	const body = render(pages, projects);
	return new Response(body, {
		headers: {
			'content-type': 'application/xml',
			'cache-control':
				'public, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=3600'
		}
	});
};

const renderProjects = (projects: Project[]) => {
	return projects
		.map(
			({ slug, date }) => `
        <url>
          <loc>${website}${slug}</loc>
          <lastmod>${new Date(date).toISOString().split('T')[0]}</lastmod>
        </url>
        `
		)
		.join('');
};

const renderPages = (pages: Page[]) => {
	return pages
		.map(
			({ page, updated }) => `
        <url>
          <loc>${website}/${page}</loc>
          <lastmod>${updated}</lastmod>
        </url>
        `
		)
		.join('');
};

const render = (pages: Page[], projects: Project[]) => {
	const lastMod = new Date().toISOString().split('T')[0];
	return `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset 
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  >
    <url>
      <loc>${website}</loc>
      <lastmod>${lastMod}</lastmod>
    </url>
    ${renderProjects(projects)}
    ${renderPages(pages)}
  </urlset>
`;
};
