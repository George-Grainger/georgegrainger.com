import symput from '$lib/assets/projects/symput.svg';
import brain from '$lib/assets/projects/brain.webp';
import brainPlaceholder from '$lib/assets/projects/brain-placeholder.webp';
import nhsHl from '$lib/assets/projects/nhs-hl.svg';
import stendhal from '$lib/assets/projects/stendhal.webp';
import stendhalPlaceholder from '$lib/assets/projects/stendhal-placeholder.webp';
import personalWebsite from '$lib/assets/projects/personal-website.svg';
import iotVinyl from '$lib/assets/projects/iot-vinyl.svg';

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
			src: symput,
			alt: 'The Symput logo',
			link: '/projects/symput',
			technologies: ['nextjs', 'tailwind', 'firebase']
		},
		{
			title: 'Reinforcement Learning',
			subtitle: 'Computational models simulating the dopamine system circuirty in the brain',
			description:
				'My third-year project in which I hope to create simulations of the dopamine system, specifically relating to addiction through reinforcement learning models.',
			src: brain,
			placeholderSrc: brainPlaceholder,
			alt: 'A purple 3d render of a brain',
			link: '/projects/reinforcement-learning',
			technologies: ['python', 'research']
		},
		{
			title: 'NHS Heart and Lung Website',
			subtitle: 'Created a resource for Newcastle NHS Foundation trust transplant patients',
			description:
				"Created an information and learning system for heart and lung patients, hopefully easing the process of understanding changes they'll need to make after the operation. The site had to be universally useable making accessibility and intuitiveness essential.",
			src: nhsHl,
			alt: 'The NHS logo',
			link: '/projects/nhs-heart-and-lung',
			technologies: ['wordpress', 'accessibility']
		},
		{
			title: 'Stendhal',
			subtitle: 'Debugging and adding features to an open source MMORPG with 10,000 lines of code',
			description:
				"Brownfield development on a large scale, open source Java codebase. Improved my ability to navigate, and understand others' code while realising some of the advantages of test-driven development.",
			src: stendhal,
			placeholderSrc: stendhalPlaceholder,
			alt: 'Artwork from Stendhal',
			link: '/projects/stendhal',
			technologies: ['java', 'junit', 'opensource']
		},
		{
			title: 'Personal Website',
			subtitle: 'georgegrainger.com (this site) - my portfolio website to try and show off!',
			description:
				'Designed and implemented this website. This site contains nice animations, particularly when switching between dark and light modes. It also includes page transitions and use of the Spotify API.',
			src: personalWebsite,
			alt: 'Footer artwork from georgegrainger.com',
			link: '/projects/personal-website',
			technologies: ['solidjs', 'love']
		},
		{
			title: 'IoT Vinyl Playing',
			subtitle: 'Embedded chips into vinyls so Alexa plays a song when a phone is held nearby',
			description:
				'Designing a system so wthat when I hold my phone up to a vinyl found in my room, it will start playing a song from that album from my Alexa.',
			src: iotVinyl,
			alt: 'Collage of album covers',
			link: '/projects/iot-vinyl-playing',
			technologies: ['assembly', 'iot', 'cpp']
		}
	],
	about: 'About me',
	'academic-title': 'Academic',
	'academic-paragraphs': [
		"I'm in my third year studying for my Computer Science MEng(Hons) at The University of Manchester.",
		'In first year I won the Netcraft Prize for the top 10 students with an average of 90%. In second year I continued to do well and was in the <a href="https://www.georgegrainger.com/SecondYearLetter.pdf" target="_blank" rel="noopener noreferrer">top 5% of students</a> (of 400) with an average of 89%. I also achieved the top grade in System Architecture with an average of 92%.',
		'I enjoy a range of course units, particularly those based around AI, Graphics and Hardware. I\'m excited to see how these play into my third-year project which is simulating the dopamine system and addiction through reinforcement learning - <a href="projects/reinforcement-learning">read more</a>.'
	],
	'experience-title': 'Experience',
	'experience-paragraphs': [
		'I spent a year working as a junior developer at <a href="https://www.enigma-interactive.co.uk" target="_blank" rel="noopener noreferrer">Enigma Interactive</a>. During this time I had three main projects:'
	],
	'enigma-roles': [
		"Contributing to the 'core team', this involved programming in Java and building the base framework upon which other sites were developed.",
		'Developing a <a href="https://transplant-resource.newcastle-hospitals.nhs.uk" target="_blank" rel="noopener noreferrer">heart and lung transplant resource</a> for Newcastle NHS foundation trust - <a href="projects/nhs-heart-and-lung">read more</a>.',
		'Producing an educational game for Western Power, which taught children the potential dangers of power lines, and how to avoid them.'
	],
	'interests-title': 'Interests',
	'interests-paragraphs': [
		"I've played rugby since I was little, and still enjoy playing it now. Since coming to university, I've also taken up climbing and surfing. These bring new challenges that I'm enjoying getting involved in.",
		'In particular, I like the problem-solving aspect of climbing, and the feeling of satisfaction after persevering to get a tricky climb.'
	],
	cv: 'View my CV',
	'spotify-tagline': 'Information on my favourite songs and recent listening',
	'latest-song': 'Latest song played',
	'album-img-alt': 'Album image for {{title}}',
	'played-on': 'Played on {{date}} at {{time}}',
	'check-back': "Check back when I'm listening for a live feed",
	'current-playing': "I'm currently listening at...",
	'stick-around': 'Stick around to see what I listen to next'
};
