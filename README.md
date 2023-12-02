# georgegrainger.com

The latest and greatest SvelteKit implementation of my portfolio website, surpassing the previous [SolidJS version](https://github.com/George-Grainger/personal-solidjs-site). While visibily quite similar, this newer version has a series of improvements listed below.

## Features

The base set of features remains reasonably consistent

- Language Support
- Accessibility through motion reduction
- Dark mode, including animations when switching themes
- Spotify API integration
- Page Transitions

### Improvements over the SolidJS version

There were numerous "under-the-hood" improvements over the SolidJS implementation:

- Created reusable SVG through `<use>` component to reduce the initial HTML load
- Implemented server-side rendering, improving SEO and loading speeds
- Alter how translations work, so only the current locale is loaded and prerendered for each page
- Add an API for the projects and Spotify. This should enable the pagination of projects in future
- Add a contact page that links up with my email
- Route based i18n
- Unify storage of project info in one place
- Has an RSS feed

## Repository Structure

[/src](/src) contains the majority of code for the site, split into the following subsections:

1. [/lib](/src/lib) contains everything that isn't a page
   1. [/api-backup](/src/lib/api-backup) is a backup to ensure content is shown even if the Spotify connection fails
   2. [/assets](/src/lib/assets) includes all of the images and SVG files that are dynamically loaded in the javascript files
   3. [/components](/src/lib/components) holds all of the reusable components for the sites
   4. [/hooks](/src/lib/hooks) contains a single hook that's used to indicate when a click is outside an element
   5. [/projects](/src/lib/projects) contains all of the projects translated into both English and French
   6. [/stores](/src/lib/stores) includes all of the reusable stores which persist the user's preferences through local storage
   7. [/translations](/src/lib/translations) page-level translations used in the site
   8. [/utils](/src/lib/utils) additional useful functions that don't easily fit in the other folders
2. [/params](/src/params) contains the param matcher to correctly route the available locales
3. [/routes](/src/routes) contains the sites pages and API routes

[/static](/static) contains all of the static assests. This doesn't include the sitemap.xml or rss.xml which are in [/src/routes](/src/routes).
Notably, the project images are served statically, to enable them to be linked from the markdown files.
