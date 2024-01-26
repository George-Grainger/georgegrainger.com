---
title: Personal Website
subtitle: georgegrainger.com (ce site) - mon site de portfolio à essayer et à montrer !
description: Conception et réalisation mon site web de portfolio en SolidJS puis à nouveau dans SvelteKit, en me concentrant sur la création d'animations accessibles mais agréables lors du changement de thème. De plus, le site dispose de fonctionnalités telles que la prise en charge des langues, les transitions de page et l'intégration avec l'API Spotify.
src: /images/projects/personal-website.svg
alt: Illustration de pied de page de georgegrainger.com
tags: ['sveltekit', 'solidjs']
date: 01/26/24
homepage: 4
---

## Le projet:

Au départ, l’envie de créer ce portfolio est venue de voir sortir de nouveaux frameworks javascript intéressants comme SolidJS. J'avais entendu la promesse qu'en utilisant la compilation plutôt qu'un DOM virtuel, ils pourraient atteindre des vitesses supérieures à celles de NextJS, qui était mon choix à l'époque.

J'ai pensé que ce serait bien de les essayer et de voir s'ils étaient aussi révolutionnaires que certains le prétendent, alors je me suis mis au travail pour concevoir le site Web.

### Les thèmes:

La conception a été construite sur le désir d'effectuer une transition à l'échelle du site lors du changement de thème. Ce n’était pas quelque chose que j’avais jamais vu auparavant et ce n’est pas très utile sur le plan fonctionnel – idéal pour un site de portfolio !

En poussant plus loin cette idée, un thème nuit et jour semblait être le choix évident pour le design. Cependant, dans Figma, j'ai eu du mal à créer un design pour la nuit qui me plaisait. En appliquant l'opacité, j'ai eu l'impression que les nuages avaient l'air ternes, plutôt que le ciel étoilé que j'espérais.

Cette réflexion a conduit à l’idée derrière le thème de l’espace, aboutissant aux deux designs que vous voyez aujourd’hui.

### L'animation:

Avoir ces deux thèmes différents signifiait qu’une grande partie des illustrations devait être modifiée entre les conceptions. J'aurais pu simplement faire un fondu enchaîné, mais je pensais que cela me donnerait une mauvaise expérience utilisateur. Une bien meilleure solution consistait à essayer d’intégrer l’animation dans la conception plus large pour rendre la transition du thème plus arrondie.

### Intégration de Spotify :

Je souhaitais m'interfacer avec une API externe sur ce site car ce n'était pas quelque chose de couvert par [Symput.com](https://www.symput.com/). J'ai d'abord regardé Goodreads car je lisais des livres à cette époque, mais malheureusement, ils n'en avaient pas. Le deuxième meilleur choix semblait être Spotify, je savais pertinemment qu'ils avaient une API et je l'utilisais la plupart du temps. Cela signifiait que je pouvais vivre une expérience plus interactive et faire l'expérience assez typique de voir vos morceaux actuels et vos meilleurs !

### Prise en charge des langues

Bien que j'aie déjà pris en charge les langues dans mon travail NextJS, il est magnifiquement intégré et assez simple à configurer. J'avais vu beaucoup de plaintes concernant les défis d'i18n en ligne, alors j'ai pensé que seul NextJS venait de le comprendre. Je pensais que si je pouvais obtenir quelque chose en travaillant dans un nouveau cadre, cela pourrait fournir une expérience précieuse pour tout projet futur dans lequel NextJS n'était pas une option. Je comprendrais alors certains points de friction et je saurais comment les surmonter.

### Accessibilité

Mon expérience de création d'une ressource pour le NHS a fait de l'accessibilité une fonctionnalité clé du site. Je voulais faire les choses classiques : utiliser des éléments sémantiques, des aria-labels, etc. Mais, en plus, je voulais que le site complet soit navigable au clavier, même pour des éléments tels que les sélections personnalisées.

Cela a généré une quantité de travail surprenante, mais je suis satisfait du résultat et je pense qu'il est bon de savoir que le site est accessible à un groupe de personnes plus diversifié.

## Principaux défis

Les principaux défis rencontrés lors de la conception provenaient en fait de la prise en charge de plusieurs langues. SolidJS était une application purement côté client, et mon désir était de charger uniquement dans le langage nécessaire, ou même d'avoir un schéma i18n piloté par route. Ce n'était pas pratique dans SolidJS, avec ma conception initiale chargeant toutes les traductions (pour chaque page également !) lors du chargement initial. Cela bloquait le chargement et je n'étais pas satisfait du design final.

Après avoir joué, je n'ai pas trouvé de méthode pour effectuer le fractionnement basé sur les itinéraires dans SolidJS, j'ai donc décidé d'utiliser un framework prenant en charge le rendu côté serveur.

SolidStart, l'équivalent SolidJS, NextJS était le choix évident. Cependant, il est toujours en version bêta, ce qui aurait pu signifier que mon travail serait interrompu de manière impitoyable à tout moment.

Puisque j'allais faire une réécriture assez importante, j'ai décidé pourquoi ne pas en faire une autre opportunité d'apprendre un nouveau framework. J'avais vu des gens s'extasier sur l'expérience de développement de SvelteKit, alors j'ai pensé que cela valait la peine d'essayer.

## SvelteKit :

Après avoir compris la syntaxe SvelteKit, la mise à jour du site a été moins pénible que prévu !

La plupart des éléments clés ne sont que du SVG et du CSS, ce qui signifie qu'après quelques réorganisations, ils pourraient être portés tels quels.

En peu de temps, j'étais à peu près dans la même position que le site SolidJS d'origine. À ce stade, je pouvais me concentrer sur l’amélioration de certaines fonctionnalités que je n’aimais pas avec l’original.

### Caractéristiques supplémentaires:

La première chose sur laquelle j'ai travaillé a été le lien Spotify, en le déplaçant pour utiliser les routes API comme je l'avais prévu à l'origine, mais je n'ai pas pu le faire. En refaisant cela, j'ai pu abandonner de nombreux états de chargement puisque le contenu pouvait être rendu sur le serveur avant d'être remis au client.

J'ai ensuite réfléchi à l'amélioration de la qualité du SVG, car j'avais eu quelques problèmes de rendu dus aux exports de Figma qui les rendaient pixellisés sur le site SolidJS.

Finalement, j'ai décidé qu'il serait judicieux de faire les traductions ! Le laisser aussi tard était une erreur...

### Problèmes i18n :

SvelteKit étant bien connecté à NextJS, je m'attendais à leur l'intégration i18n est extrêmement bonne. Malheureusement, j'avais tort. Il n'y a pas de package officiel, ce qui n'est pas très problématique, mais j'ai eu du mal à en faire fonctionner un autre.

Le problème résidait dans mon rendu côté serveur, avec Spotify et la traduction n'étant parfois pas renvoyés à chaque chargement de page. Cela a pris beaucoup de temps à résoudre, mais s'est avéré provenir d'un malentendu sur le moment d'utiliser +page.ts et +page.server.ts.

Cependant, une fois ce problème résolu, j'ai pu créer l'itinéraire basé sur l'i18n dont j'avais toujours rêvé !

### Création d'un formulaire de contact :

En recherchant les sites Web SvelteKit, j'ai trouvé une excellente source sur [scottspence.com](https://www.scottspence.com/) et j'ai pensé qu'un formulaire de contact constituerait un excellent ajout au site.

Suivre son tutoriel a simplifié l'ensemble du processus, et si vous apprenez SvelteKit, je recommanderais son contenu.

## Dernières pensées:

Je pense que la création des deux versions de mon site Web a été incroyablement instructive, permettant une compréhension plus approfondie des avantages et des inconvénients des différents frameworks.

Cependant, malgré tout le battage médiatique, je préfère probablement SolidJS !

Qui sait, peut-être que je réécrirai à nouveau tout le site dans SolidStart lorsqu'il sera stable ;)
