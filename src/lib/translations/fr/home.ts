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
			subtitle:
				"Création d'une ressource pour les patients transplantés de la Newcastle NHS Foundation Trust",
			description:
				"Création d'un système d'information et d'apprentissage pour les patients cardiaques et pulmonaires, facilitant, espérons-le, le processus de compréhension des changements qu'ils devront apporter après l'opération. Le site devait être universellement utilisable rendant l'accessibilité et l'intuitivité essentielles.",
			thumbnails: symput,
			alt: 'Le logo du NHS',
			link: '/projects/nhs-heart-and-lung',
			technologies: ['wordpress', 'accessibility']
		},
		{
			title: 'Stendhal',
			subtitle:
				'Débogage et ajout de fonctionnalités à un MMORPG open source avec 10 000 lignes de code',
			description:
				"Développement brownfield à grande échelle, base de code Java open source. J'ai amélioré ma capacité à naviguer et à comprendre le code des autres tout en réalisant certains des avantages du développement piloté par les tests.",
			thumbnails: symput,
			alt: 'Oeuvre de Stendhal',
			link: '/projects/stendhal',
			technologies: ['java', 'junit', 'opensource']
		},
		{
			title: 'Personal Website',
			subtitle: 'georgegrainger.com (ce site) - mon site de portfolio à essayer et à montrer !',
			description:
				"Conception et réalisation de ce site Web. Ce site contient de belles animations (si je le dis moi-même), en particulier lors du basculement entre les modes sombre et clair. Il inclut également les transitions de page et l'utilisation de l'API Spotify.",
			thumbnails: symput,
			alt: 'Illustration de pied de page de georgegrainger.com',
			link: '/projects/personal-website',
			technologies: ['solidjs', 'love']
		},
		{
			title: 'IoT Vinyl Playing',
			subtitle:
				"Puces intégrées dans les vinyles pour qu'Alexa joue une chanson lorsqu'un téléphone est tenu à proximité",
			description:
				'Concevoir un système pour que lorsque je tiens mon téléphone devant un vinyle trouvé dans ma chambre, il commence à jouer une chanson de cet album de mon Alexa.',
			thumbnails: symput,
			alt: "Collage de pochettes d'albums",
			link: '/projects/iot-vinyl-playing',
			technologies: ['assembly', 'iot', 'cpp']
		}
	],
	about: 'Sur moi',
	'academic-title': 'Académique',
	'academic-paragraphs': [
		"Je suis dans ma troisième année d'études pour mon MEng (Hons) en informatique à l'Université de Manchester.",
		"En première année, j'ai remporté le prix Netcraft pour les 10 meilleurs étudiants avec une moyenne de 90 %. En deuxième année, j'ai continué à bien faire et j'étais dans le top 5% des étudiants (sur 400) avec une moyenne de 89%. J'ai également obtenu la meilleure note dans l'unité d'architecture système avec une moyenne de 92%.",
		"J'apprécie une gamme d'unités de cours, en particulier celles basées sur l'IA, les graphiques et le matériel. J'ai hâte de voir comment cela joue dans mon projet de troisième année qui simule le système dopaminergique et la dépendance par l'apprentissage par renforcement - <a href=\"/third-year-project\">en savoir plus</a>."
	],
	'experience-title': 'Expérience',
	'experience-paragraphs': [
		'J\'ai passé un an à travailler en tant que développeur junior chez <a href="https://www.enigma-interactive.co.uk" target="_blank" rel="noopener noreferrer">Enigma Interactive</a>. Durant cette période, j\'avais trois projets principaux :'
	],
	'enigma-roles': [
		"Contribuer à «l'équipe de base», cela impliquait de programmer en Java et de construire le cadre de base sur lequel d'autres sites ont été développés.",
		'Développer une <a href="https://transplant-resource.newcastle-hospitals.nhs.uk" target="_blank" rel="noopener noreferrer">ressource de transplantation cardiaque et pulmonaire</a> pour la confiance de la fondation Newcastle NHS - <a href="/nhs-site">en savoir plus</a>.',
		"Production d'un jeu éducatif pour Western Power, qui enseigne aux enfants les dangers potentiels des lignes électriques et comment les éviter."
	],
	'interests-title': 'Intérêts',
	'interests-paragraphs': [
		"Je joue au rugby depuis que je suis tout petit et j'aime toujours autant jouer maintenant. Depuis que je suis à l'université, j'ai aussi pratiqué l'escalade et le surf. Ceux-ci apportent de nouveaux défis et dans lesquels j'aime m'impliquer.",
		"En particulier, j'aime l'aspect résolution de problèmes de l'escalade et le sentiment de satisfaction après avoir persévéré pour obtenir une ascension délicate."
	],
	cv: 'Voir mon CV',
	'spotify-tagline': 'Informations sur mes chansons récentes et préférées',
	'latest-song': 'Dernière chanson jouée',
	'album-img-alt': "Image de l'album pour {{title}}",
	'played-on': 'Joué le {{date}} à {{time}}',
	'check-back': "Revenez quand j'écoute un flux en direct",
	'current-playing': "J'écoute actuellement à...",
	'stick-around': "Reste dans le coin pour voir ce que j'écoute ensuite"
};
