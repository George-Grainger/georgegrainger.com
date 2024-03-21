---
title: Symput
subtitle: Un clavier Android et un site Web complet associé pour les commentaires
description: J'ai créé symput.com, un site Web complet alimenté par NextJS qui permet aux utilisateurs du clavier Android de mon projet de groupe de première année de fournir des commentaires. Le site utilise Google Cloud Platform pour gérer les profils d'utilisateurs et les messages de commentaires, en utilisant des fonctions sans serveur pour la modération et la suppression des données de compte.
src: /images/projects/symput.svg
alt: Le logo Symput
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

## Grandes lignes du projet:

[Symput.com](https://www.symput.com/) était un projet personnel que j'ai entrepris pour compléter un projet de groupe de l'un de mes modules de génie logiciel de première année. Le but de ce module était de créer un logiciel utile pour les étudiants de notre université.

Comme c'était pendant le Covid-19, nous avons décidé de construire un clavier mathématique intégré à Android, "simplifiant la communication mathématique" lors de la messagerie en ligne. Cela avait été ennuyeux pour beaucoup, les discussions se terminant inévitablement par une photo de quelqu'un travaillant sur papier publiée dans le chat. Si vous n’aviez ni stylo ni papier à proximité, vous n’aviez pas de chance, et si personne d’autre ne connaissait la réponse, eux aussi !

Au sein du projet de groupe, nous avons réussi à créer le clavier, en écrivant du code Kotlin pour s'interfacer avec le système d'exploitation Android sous-jacent. L'application est toujours disponible sous le nom [Symput sur le Google Play Store](https://play.google.com/store/apps/details/Symput?id=com.symput.mathkeyboard&pli=1), mais elle n'est malheureusement pas disponible. plus longtemps entretenu.

### Quel est le rapport avec Symput.com ?

<LazyImage src={symput} placeholderSrc={symputPlaceholder} alt="Page de destination Symput" loading="lazy" />

Pendant que nous créions le clavier, nous avons pensé qu'il serait utile d'avoir un site Web pour expliquer le produit et potentiellement aider les gens à donner leur avis.

J'espérais faire du développement Web dans NextJS, j'ai donc pensé que ce serait l'occasion idéale de l'essayer. Cela a conduit à la création de [Symput.com](https://www.symput.com/), qui a servi de page d'accueil pour le clavier.

## De quoi s'agissait-il :

Même si le concept initial d'un site textuel n'était pas trop difficile, j'ai pensé que ce serait l'opportunité d'apprentissage full-stack idéale. Si nous autorisions les commentaires, ceux-ci proviendraient de comptes d'utilisateurs, ce qui signifie qu'une certaine forme de backend était nécessaire.

Par conséquent, j'ai décidé d'utiliser Google Cloud Platform (en particulier Firebase) pour fournir l'authentification ainsi que stocker toutes les publications et utilisateurs du projet !

<LazyImage src={login} placeholderSrc={loginPlaceholder} alt="Page de connexion Symput" loading="lazy" />

Cela a activé les fonctionnalités de base du site Web, avec de nombreuses méthodes pour se connecter au système de gestion de contenu intégré. Cette zone d'administration active des fonctionnalités cruciales pour la création de commentaires, telles que la rédaction, la mise à jour et la publication de messages.

Il incluait également des fonctionnalités de contrôle de compte, telles que la possibilité de mettre à jour et de vérifier votre courrier électronique, sans lesquelles vos publications ne pourraient pas être publiées. Enfin, il vous permet de supprimer toutes les données de votre compte, ce qui fonctionne grâce à des fonctions sans serveur alignées sur le RGPD.

<LazyImage src={admin} placeholderSrc={adminPlaceholder} alt="Page d'administration de Symput" loading="lazy" />

### Comment fonctionnent les commentaires

Une publication peut être rédigée en markdown, avec des images téléchargées renvoyant un lien vers l'emplacement de ce fichier dans le stockage cloud. Ceux-ci pourraient être prévisualisés, pour garantir que le formatage était correct avant de les rendre visibles à tous !

À tout moment, le statut d'une publication peut passer de publié à non publié, auquel cas elle n'est plus visible dans le flux de commentaires principal. Il est également possible pour les utilisateurs d'aimer les publications, le nombre de likes étant visible sur la publication. Nous espérions que cela pourrait indiquer les fonctionnalités que nous devrions prioriser.

Malheureusement, l'application n'a pas généré autant de trafic que nous l'aurions idéalement souhaité, ce qui signifie que le système de commentaires manque également de véritables publications ! Cependant, dans le cas où nous obtenons soudainement une augmentation, le flux sera paginé et permettra également à l'utilisateur de remonter dans le temps à travers les publications.

<LazyImage src={feedback} placeholderSrc={feedbackPlaceholder} alt="Page de commentaires Symput" loading="lazy" />

### Modération ?

Puisque nous allions présenter la version live du site, nous ne voulions pas vraiment que quelqu'un publie soudainement un message qui pourrait nuire à notre message. En conséquence, j'ai créé un robot qui modère les publications pour identifier tout langage incendiaire, le dissimuler et laisser un message d'avertissement.

Bien que cela puisse sembler lourd, cela constituait un autre bon moyen d'apprendre à utiliser les fonctions sans serveur, ce qui était en réalité son objectif principal.

### Autres caractéristiques

Au-delà du système de commentaires, [Symput.com](https://www.symput.com/) possède des fonctionnalités intéressantes telles que la prise en charge des langues et différents thèmes. Puisque nous étions une équipe internationale, nous avons pensé qu'il serait bien de prendre en charge les langues de chaque membre sur l'ensemble du site.

Chacun d'entre eux est accessible en utilisant les paramètres du site dans le menu à rouages !

## Évaluation:

Dans l'ensemble, le projet a été un succès. Je pense que même si cela est peu utile, ce fut une excellente expérience d'apprentissage qui complète bien le clavier du travail de groupe.

La partie la plus difficile du projet a été l'apprentissage de ces nouvelles technologies. Souvent, je restais bloqué pendant une longue période, incapable de progresser car il y avait un problème d'API que je n'avais jamais rencontré auparavant. Cependant, après avoir parcouru la documentation et les forums en ligne, j'ai réussi à les surmonter. Cela les rend mieux préparés à faire face à des problèmes similaires à l’avenir.

En fin de compte, en tant qu'étudiant de première année, cette expérience a été plus importante et m'a donné beaucoup de confiance pour aborder les nouvelles technologies, telles que SolidJS et SvelteKit pour mon site Web personnel. Je sais que même si je me retrouve bloqué, je serai capable de trouver une solution qui pourra me permettre de progresser vers les objectifs du projet.

### Mais était-ce rapide ?

Oui – surtout selon Vercel. Seule la page de commentaires doit être améliorée !

<LazyImage src={analysis} placeholderSrc={analysisPlaceholder} alt="Analyse des performances du site" loading="lazy" />
