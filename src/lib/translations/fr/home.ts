import symput from '$lib/assets/projects/Symput.svg';

export default {
	title: 'Bonjour',
	subtitle: "Merci d'être passé",
	'intro-paragraph': "Je m'appelle George, un étudiant en informatique vivant à Manchester",
	'about-me': 'Sur moi',
	projects: [
		{
			title: 'Symput',
			subtitle: 'Un clavier Android et un site Web complet associé pour les commentaires',
			description:
				"Création d'un site Web complet, symput.com permettant aux utilisateurs de notre clavier Android de projet de groupe de première année de fournir des commentaires. Le site comprend un CMS, des profils d'utilisateurs, des fonctions sans serveur et plus encore !",
			thumbnails: symput,
			alt: 'Le logo Symput',
			link: '/projects/symput',
			technologies: ['nextjs', 'tailwind', 'firebase']
		},
		{
			title: 'Reinforcement Learning',
			subtitle:
				'Modèles informatiques simulant les circuits du système dopaminergique dans le cerveau',
			description:
				"Mon projet de troisième année dans lequel j'espère créer des simulations du système dopaminergique, spécifiquement liées à la dépendance à travers des modèles d'apprentissage par renforcement.",
			thumbnails: symput,
			alt: "Un rendu 3D violet d'un cerveau",
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
