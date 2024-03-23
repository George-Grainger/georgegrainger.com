---
title: Wordle Assistant
subtitle: Conception d'une extension de navigateur qui vous aide à deviner le meilleur mot suivant dans Wordle
description: Conception et optimisation d'un solveur Wordle basé sur la théorie de l'information en utilisant Rust. Ensuite, nous avons combiné les extensions de navigateur WebAssembly et Chrome pour permettre au solveur d'être utilisé de manière interactive pour aider dans le jeu Worlde existant.
src: /images/projects/wordle-assistant.svg
alt: Logo de l'assistant Wordle
tags: ['webassembly', 'rust', 'chrome']
date: 01/26/24
github: https://github.com/George-Grainger/wordle-assistant
homepage: 5
---

<script>
    import LazyImage from '$lib/components/LazyImage.svelte';
    import splash from '$lib/assets/projects/wordle/splash.png';
    import splashPlaceholder from '$lib/assets/projects/wordle/splash-placeholder.png';
    import popup from '$lib/assets/projects/wordle/popup.png';
    import popupPlaceholder from '$lib/assets/projects/wordle/popup-placeholder.png';
    import guess1 from '$lib/assets/projects/wordle/guess1.png';
    import guess1Placeholder from '$lib/assets/projects/wordle/guess1-placeholder.png';
    import guess2 from '$lib/assets/projects/wordle/guess2.png';
    import guess2Placeholder from '$lib/assets/projects/wordle/guess2-placeholder.png';
    import guess3 from '$lib/assets/projects/wordle/guess3.png';
    import guess3Placeholder from '$lib/assets/projects/wordle/guess3-placeholder.png';
</script>

<LazyImage src={splash} placeholderSrc={splashPlaceholder} alt="Image de couverture de l'Assistant Wordle" />

## La motivation:

L'engouement pour Wordle a balayé le monde, mais comme je vis sous un rocher, je ne m'y suis jamais vraiment plongé. Cependant, j'aime le concept du jeu et je trouve amusant d'y jouer de temps en temps. J'aime jouer à des puzzles et j'en fais quelques-uns la plupart du temps comme passe-temps (et pour essayer de me réveiller).

Récemment, j'ai également essayé de trouver des moyens d'écrire du code dans Rust. Ses idées sur la propriété me rendent curieux, et avec les fuites de mémoire et les problèmes de parallélisme qui me viennent à l’esprit au cours de mes unités de cours universitaires, la promesse de les surmonter est enchanteresse !

Par conséquent, quand j'ai vu un tutoriel sur la création d'un Wordle Solver de [Jon Gjengset](https://www.youtube.com/c/JonGjengset), j'ai pensé que ce serait une excellente occasion de voir comment quelqu'un avec une bien plus grande expérience de Rust que moi, je m'approche d'un problème contenu.

En fin de compte, après avoir terminé le didacticiel, j'ai senti qu'il était possible d'utiliser ce produit pour explorer WebAssembly. C'est une autre chose sur ma liste de tâches Rust et j'ai pensé qu'utiliser ce modèle comme base pour une extension de navigateur serait parfait.

Ce n’est pas une idée nouvelle, mais je ne voulais pas que l’extension résolve simplement le jeu – c’est plutôt ennuyeux. Au lieu de cela, je recherchais quelque chose qui vous aiderait au fur et à mesure. Dans ces moments-là, vous pensez savoir où vont trois des lettres, mais aucun mot ne vous vient alors à l’esprit.

Par conséquent, j'ai décidé de construire ceci, en adaptant le code Rust du tutoriel pour produire une extension Chrome. Cela m'a aidé à découvrir WebAssembly pour Rust tout en fournissant un autre flux pour développer mes connaissances dans le langage, gagnant-gagnant.

## La solution:

<LazyImage src={popup} placeholderSrc={popupPlaceholder} alt="Fenêtre contextuelle de l'Assistant Wordle" loading="lazy" />

Après avoir créé le Wordle Solver, la première étape consistait à y accéder via WebAssembly pour traiter les entrées et afficher un résultat sur le front-end. C’était agréablement simple, avec seulement quelques mises en garde.

Premièrement, `wasm_bindgen` n'a pas pu compiler en utilisant `mimalloc` comme allocateur de mémoire. Par conséquent, cette optimisation a dû être inversée.

Ensuite, « usize » dans WebAssembly a provoqué un débordement du nombre de mots et a dû être augmenté à « u64 ».

Enfin, alors que les erreurs produites par les fonctions Rust avec les décorateurs `wasm_bindgen` étaient gérées avec élégance, celles internes au solveur lançaient des erreurs cryptiques pointant vers des lignes dans le binaire compilé. Il était donc difficile d’identifier la cause des problèmes. Si WebAssembly avait été envisagé dès le départ, cela aurait pu être évité en utilisant `wasm_bindgen` en interne dans le solveur.

À ce stade, le solveur pourrait prendre les entrées d'une boîte contextuelle et produire une sortie en retour. L'étape suivante consistait à extraire ces informations du site NYT Wordle lui-même afin que le joueur n'ait pas besoin de les saisir manuellement. C'est là qu'intervient l'extension Chrome !

Il est composé de deux parties interactives qui permettent de trouver des suppositions optimales sans intervention supplémentaire de l'utilisateur ni traitement inutile :

1. La fenêtre contextuelle dans laquelle l'utilisateur interagit avec l'extension. Cela demande des données à la page via des messages, transmettant l'état du jeu à WebAssembly Solver et présentant le résultat à la prochaine supposition. Celui-ci est initialement masqué, permettant à l'utilisateur de révéler les lettres une par une.

2. Le script de contenu est injecté dans la page Wordle une fois chargé. Cela écoute les messages de la fenêtre contextuelle, analyse l'état du jeu à partir du code HTML et le renvoie en réponse.

Ainsi, l'extension peut fournir l'état du jeu NYT et le transmettre au popup, il ne reste plus qu'à le propager au Wordle Solver. Après avoir résolu certains problèmes avec la politique de sécurité du contenu permettant aux extensions d'exécuter WASM, il s'agissait simplement d'exécuter le point d'entrée `wasm_bindgem` à partir du script contextuel.

Avec cela, nous avions un Wordle fonctionnel ! N'hésitez pas à le consulter et à améliorer votre propre jeu Wordle : il est disponible sur le [Chrome Store](https://chromewebstore.google.com/detail/wordle-assistant/djofdcdjkjlpbacneapdehcaandgemoe).

## Démonstration des résultats :

Voyons donc comment cela se passe dans la réalité - je commence toujours par Route, je vais donc l'utiliser comme premier mot, puis suivre les conseils de l'assistant pour les suppositions restantes.

### Devinez 1 :

En commençant par Route selon ma stratégie habituelle.

<LazyImage src={guess1} placeholderSrc={guess1Placeholder} alt="Devinez 1: route - NNMNN" loading="lazy" />

### Devinez 2 :

Pas terrible, mais pas étonnant, seul le « O » étant jaune. En vérifiant l'assistant, nous voyons que le prochain mot à deviner est "salon" - ce n'est pas l'un de mes favoris habituels !

<LazyImage src={guess2} placeholderSrc={guess2Placeholder} alt="Devinez 2: salon - NMMCN" loading="lazy" />

## Devinez 3 :

Maintenant, les choses commencent à paraître plus prometteuses. En suivant à nouveau les conseils de l'assistant, nous optons désormais pour « à distance » et je suis heureux d'admettre que je n'aurais probablement pas opté pour cela ensuite.

<LazyImage src={guess3} placeholderSrc={guess3Placeholder} alt="Devinez 3: aloof - CCCCC" loading="lazy" />

Et boum, tout vert ! Assez impressionnant, il est clair que Jon Gjengset sait de quoi il parle avec ces trucs de théorie de l'information.

Encore une fois, n'hésitez pas à le télécharger et à l'essayer vous-même, il prend même en charge le mode difficile si vous faites partie des fous qui font ça. Il est disponible ici sur le [Chrome Store](https://chromewebstore.google.com/detail/wordle-assistant/djofdcdjkjlpbacneapdehcaandgemoe)
