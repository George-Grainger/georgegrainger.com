---
title: Symput
subtitle: An Android keyboard and associated full stack website for feedback
description: Created symput.com, a full-stack website powered by NextJS which facilitates users of my first-year group project's Android keyboard to provide feedback. The site uses Google Cloud Platform to manage user profiles and feedback posts, employing serverless functions for moderation and account data deletion. The platform remains accessible and showcases my ability to create a comprehensive green-field application.
src: /images/projects/symput.svg
alt: The Symput Logo
tags: ['nextjs', 'tailwind', 'firebase']
date: 05/14/21
github: https://github.com/George-Grainger/symput.com
homepage: 1
---

<script>
    import LazyImage from '$lib/components/LazyImage.svelte';
    import symput from '$lib/assets/projects/symput/symput.png';
    import symputPlaceholder from '$lib/assets/projects/symput/symput-placeholder.png';
    import login from '$lib/assets/projects/symput/login.png';
    import loginPlaceholder from '$lib/assets/projects/symput/login-placeholder.png';
    import admin from '$lib/assets/projects/symput/admin.png';
    import adminPlaceholder from '$lib/assets/projects/symput/admin-placeholder.png';
    import feedback from '$lib/assets/projects/symput/feedback.png';
    import feedbackPlaceholder from '$lib/assets/projects/symput/feedback-placeholder.png';
    import analysis from '$lib/assets/projects/symput/analysis.png';
    import analysisPlaceholder from '$lib/assets/projects/symput/analysis-placeholder.png';
</script>

## Project outline:

[Symput.com](https://www.symput.com/) was a personal project I undertook to complement a group project from one of my first-year software engineering modules. The goal of that module was to create a bit of useful software for students at our University.

Since it was during Covid-19, we decided to build a mathematical keyboard which integrated into Android, "simplifying the communication of maths" when messaging online. This had been annoying for many with discussions inevitably ending up with a photo of somebodies work on paper being posted into the chat. If you had no pen and paper nearby, you were out of luck, and if nobody else knew the answer so were they!

Within the group project, we successfully created the keyboard, writing Kotlin code to interface with the underlying Android operating system. The app is still available as [Symput on the Google Play store](https://play.google.com/store/apps/details/Symput?id=com.symput.mathkeyboard&pli=1), however, it is unfortunately no longer maintained.

### How does this relate to Symput.com?

<LazyImage src={symput} placeholderSrc={symputPlaceholder} alt="Symput Landing Page" loading="lazy" />

While we were creating the keyboard, we felt it'd be useful if we had a website to explain the product, and potentially help people give feedback.

I'd been hoping to do some web development in NextJS, so thought this would be the ideal opportunity to try it out. This led to the creation of [Symput.com](https://www.symput.com/), which acted as the homepage for the keyboard.

## What was involved:

While the initial concept of a text-based site wasn't too challenging, I felt this would be the ideal full-stack learning opportunity. If we were allowing feedback, that would come from user accounts meaning some form of backend was required.

Consequently, I decided to use Google Cloud Platform (specifically Firebase) to provide authentication as well as store all of the posts and users for the project!

<LazyImage src={login} placeholderSrc={loginPlaceholder} alt="Symput Login Page" loading="lazy" />

This enabled the core functionality of the website, with numerous methods to log into the inbuilt content management system. This admin area enabled crucial features for creating the feedback, such as drafting, updating and publishing of posts.

It also included account control features like being able to update and verify your e-mail, without which your posts couldn't be published. Finally, it lets you delete all your account data, which works using serverless functions aligned with GDPR.

<LazyImage src={admin} placeholderSrc={adminPlaceholder} alt="Symput Admin Page" loading="lazy" />

### How Feedback Works

A post can be written in markdown, with uploaded images returning a link to the location of that file in the cloud storage. These could be previewed, to ensure the formatting was correct before making them visible for all to see!

At any point, a post status could be changed from published to unpublished again, at which point it is no longer visible in the main feedback feed. It's also possible for users to like posts, with the number of likes being visible on the post. It was hoped this could indicate which features we should prioritise.

Unfortunately, the app didn't get as much traffic as we'd have ideally liked, meaning the feedback system also lacks genuine posts! However, in the case we suddenly get a surge the feed will paginate and let the user scroll back in time through posts too.

<LazyImage src={feedback} placeholderSrc={feedbackPlaceholder} alt="Symput Feedback Page" loading="lazy" />

### Moderation?

Since we were going to present the live version of the site, we didn't really want somebody to suddenly put up a post that could undermine our message. As a result, I created a bot that moderates the posts to identify any inflammatory language, obfuscating it, and leaving a warning message.

While this may seem heavy-handed, it provided another good way to learn how to use serverless functions which was really its primary purpose.

### Other features

Beyond the feedback system, [Symput.com](https://www.symput.com/) has some nice features such as language support and different themes. Since we were an international team, we thought it'd be nice to support the languages of each member across the whole site.

Each of these can be accessed using the site setting in the cog menu!

## Evaluation:

Overall the project was a success. I think while it gets little use it was a great learning experience that complemented the Keyboard from group work well.

The hardest part of the project was learning these new technologies. Often I'd be stuck for a long period unable to make progress since there'd be an API issue I'd not experienced before. However, having worked through the documentation and online forums I managed to overcome them. This makes more more prepared for facing similar issues in future.

Ultimately, as a first-year student, this experience was more important, and it's given me a lot of confidence to approach new technologies, such as SolidJS and SvelteKit for my personal website. I know that even if end up stuck, I'll be able to figure out a solution that can keep me progressing towards the project goals.

### But was it fast?

Yes - mostly according to Vercel. Only the feedback page needs improvement!

<LazyImage src={analysis} placeholderSrc={analysisPlaceholder} alt="Performance Analysis for the site" loading="lazy" />
