import symput from '$lib/assets/projects/Symput.svg';

export default {
	title: 'Hello there',
	subtitle: 'Thanks for stopping by',
	'intro-paragraph': "I'm George, a final year computer science student based in Manchester",
	'about-me': 'About Me',
	projects: [
		{
			title: 'Symput',
			subtitle: 'An Android keyboard and associated full stack website for feedback',
			description:
				'Created a full stack website, symput.com allowing users of our first-year group project android keyboard to provide feedback. The site includes a CMS, user profiles, serverless functions and more!',
			thumbnails: symput,
			alt: 'The Symput logo',
			link: '/projects/symput',
			technologies: ['nextjs', 'tailwind', 'firebase']
		},
		{
			title: 'Reinforcement Learning',
			subtitle: 'Computational models simulating the dopamine system circuirty in the brain',
			description:
				'My third-year project in which I hope to create simulations of the dopamine system, specifically relating to addiction through reinforcement learning models.',
			thumbnails: symput,
			alt: 'A purple 3d render of a brain',
			link: '/projects/reinforcement-learning',
			technologies: ['python', 'research']
		},
		{
			title: 'NHS Heart and Lung Website',
			subtitle: 'Created a resource for Newcastle NHS Foundation trust transplant patients',
			description:
				"Created an information and learning system for heart and lung patients, hopefully easing the process of understanding changes they'll need to make after the operation. The site had to be universally useable making accessibility and intuitiveness essential.",
			thumbnails: symput,
			alt: 'The NHS logo',
			link: '/projects/nhs-heart-and-lung',
			technologies: ['wordpress', 'accessibility']
		},
		{
			title: 'Stendhal',
			subtitle: 'Debugging and adding features to an open source MMORPG with 10,000 lines of code',
			description:
				"Brownfield development on a large scale, open source Java codebase. Improved my ability to navigate, and understand others' code while realising some of the advantages of test-driven development.",
			thumbnails: symput,
			alt: 'Artwork from Stendhal',
			link: '/projects/stendhal',
			technologies: ['java', 'junit', 'opensource']
		},
		{
			title: 'Personal Website',
			subtitle: 'georgegrainger.com (this site) - my portfolio website to try and show off!',
			description:
				'Designed and implemented this website. This site contains nice animations, particularly when switching between dark and light modes. It also includes page transitions and use of the Spotify API.',
			thumbnails: symput,
			alt: 'Footer artwork from georgegrainger.com',
			link: '/projects/personal-website',
			technologies: ['solidjs', 'love']
		},
		{
			title: 'IoT Vinyl Playing',
			subtitle: 'Embedded chips into vinyls so Alexa plays a song when a phone is held nearby',
			description:
				'Designing a system so wthat when I hold my phone up to a vinyl found in my room, it will start playing a song from that album from my Alexa.',
			thumbnails: symput,
			alt: 'Collage of album covers',
			link: '/projects/iot-vinyl-playing',
			technologies: ['assembly', 'iot', 'cpp']
		}
	]
};
