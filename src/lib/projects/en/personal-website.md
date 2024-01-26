---
title: Personal Website
subtitle: georgegrainger.com (this site) - my portfolio website to try and show off!
description: Designed and implemented my portfolio website in SolidJS and then again in SvelteKit, focusing on creating accessible but pleasant animations when switching themes. Additionally, the site has features including language support, page transitions and integration with the Spotify API.
src: /images/projects/personal-website.svg
alt: Footer artwork from georgegrainger.com
tags: ['sveltekit', 'solidjs']
date: 01/26/24
homepage: 4
---

## The project:

Initially, the desire to create this portfolio came from seeing interesting new javascript frameworks like SolidJS come out. I'd heard the promise that by using compilation rather than a virtual DOM they could achieve greater speeds than NextJS, which was my go-to at the time.

I thought'd be good to try them out and see if they were as revolutionary as some people state, so got to work designing the website.

### The themes:

The design was built upon a desire to do a site-wide transition when switching themes. This wasn't something I'd ever seen done before and isn't functionally that useful - ideal for a portfolio site!

Pursuing this idea further, a night and day theme seemed like the obvious choice for the design. However, in Figma, I struggled to create a design for the night that I was pleased with. When applying opacity I felt the clouds just looked dull, rather than the starry night sky I was hoping for.

This thought led to the idea behind the space theme, resulting in the two designs you see today.

### The animation:

Having these two different themes meant that much of the artwork had to be changed between the designs. I could have just cross-faded this, but I thought that would provide I poor user experience. A much better solution was to try and integrate the animation into the wider design to make the theme transition more rounded.

### Integrating Spotify:

I was keen to interface with an external API on this site since this wasn't something covered by [Symput.com](https://www.symput.com/). I initially looked at Goodreads since I was binging books at that time, but unfortunately, they didn't have one. The next best choice seemed like Spotify, I knew for a fact they had an API and I used it most days. This meant I could have a more interactive experience and do the fairly typical insight of seeing your current and top tracks!

### Langauge Support

Though I'd done language support before in my NextJS work, it's beautifully integrated and pretty trivial to set up. I'd seen a lot of complaints about the challenges of i18n online, so thought maybe only NextJS had just figured it out. I thought if I could get something up in working in a new framework, this could provide a valuable experience for any future projects in which NextJS wasn't an option. I'd then understand some of the sticking points and know how to overcome them.

### Accessibility

My experience creating a resource for the NHS instilled accessibility as a key site feature. I wanted to do the classic things: using semantic elements, aria-labels etc. But, additionally, I wanted the full site to be keyboard navigable, even for elements such as the custom selects.

This created a surprising amount of work, but I'm pleased with the outcome and think it's good to know the site is available to a more diverse group of people.

## Key challenges

The primary challenges faced in the design did in fact stem from supporting multiple languages. SolidJS was a purely client-side application, and my desire was to only load in the necessary language, or even to have a route-driven i18n scheme. This wasn't practical in SolidJS, with my initial design loading in all the translations (for every page too!) on the initial load. This blocked the loading and I wasn't happy with that being the final design.

Having played around, I couldn't find a method to do the splitting based on routes in SolidJS, so instead decided I would use a framework supporting server-side rendering.

SolidStart, the SolidJS, NextJS equivalent was the obvious choice. However, it's still in beta which could have meant my work would break in unforgiving ways at any point.

Since I was going to be doing a fairly major rewrite, I decided why not let it be another opportunity for learning a new framework. I'd seen people raving about SvelteKit's developer experience, so thought that'd be worth a try.

## SvelteKit:

Having wrapped my head around the SvelteKit syntax updating the site was less painful than you might expect!

A lot of the key elements are just SVG and CSS, meaning after some reorganisation they could be ported pretty much as is.

In a short time, I was in pretty much the same position as the original SolidJS site. At this point, I could focus on improving some of the features I didn't like with the original.

### Additional features:

The first thing I went to work on was the Spotify link, moving it to use API routes as I'd intended originally but have been unable to do. In remaking this I was able to ditch a lot of the loading states since the content could be rendered on the server before it was given to the client.

I then looked at improving the SVG quality, since I'd had some rendering issues due to Figma's exports that made them look pixelated on the SolidJS site.

Finally, I decided it'd be sensible to do the translations! Leaving it this late was a mistake...

### i18n problems:

With SvelteKit being well connected with NextJS I'd expected their i18n integration to be extremely good. Unfortunately, I was wrong. There's no official package, which isn't hugely problematic but I struggled to get any other working.

The problem was in my server-side rendering, with the Spotify and translation sometimes not being returned on each page load. This took a frustratingly long to fix but turned out to stem from a misunderstanding about when to use +page.ts and +page.server.ts.

However, once this was fixed I could create the route based i18n that I'd always dreamed of!

### Creating a contact form:

In researching SvelteKit websites I found a great source in [scottspence.com](https://www.scottspence.com/) and thought a contact form would make a great addition to the site.

Following his tutorial made the whole process simple, and if you're learning SvelteKit I'd recommend his content.

## Final thoughts:

I think creating the two versions of my website was incredibly insightful, enabling a deeper understanding of the pros and cons of different frameworks.

However, despite all the hype, I probably prefer SolidJS!

Who knows, maybe I'll rewrite the whole website again in SolidStart when it becomes stable ;)
