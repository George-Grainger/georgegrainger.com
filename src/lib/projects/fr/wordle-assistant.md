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
inProgress: true
---

**Je suis actuellement en train de publier cette extension - veuillez revenir sous peu et j'aurai tout terminé.**

## La motivation:

L'engouement pour Wordle a balayé le monde, mais comme je vis sous un rocher, je ne m'y suis jamais vraiment plongé. Cependant, j'aime beaucoup le concept du jeu et je trouve amusant d'y jouer de temps en temps. J'aime jouer à des puzzles et j'en fais quelques-uns la plupart du temps comme passe-temps (et pour essayer de me réveiller).

Récemment, j'ai également essayé de trouver des moyens d'écrire du code dans Rust. Ses idées sur la propriété me rendent curieux, et avec les fuites de mémoire et les problèmes de parallélisme qui me viennent à l’esprit au cours de mes unités de cours universitaires, la promesse de les surmonter est enchanteresse !

Par conséquent, quand j'ai vu un tutoriel sur la création d'un Wordle Solver de [Jon Gjengset](https://www.youtube.com/c/JonGjengset), j'ai pensé que ce serait une excellente occasion de voir comment quelqu'un avec une bien plus grande expérience de Rust que moi, je m'approche d'un problème contenu.

En fin de compte, après avoir terminé le didacticiel, j'ai senti qu'il était possible d'utiliser ce produit pour explorer WebAssembly. C'est une autre chose sur ma liste de tâches Rust et j'ai pensé qu'utiliser ce modèle comme base pour une extension de navigateur serait parfait.

Ce n’est pas une idée nouvelle, mais je ne voulais pas que l’extension résolve simplement le jeu – c’est plutôt ennuyeux. Au lieu de cela, je recherchais quelque chose qui vous aiderait au fur et à mesure. Dans ces moments-là, vous pensez savoir où vont trois des lettres, mais aucun mot ne vous vient alors à l’esprit.

Par conséquent, j'ai décidé de construire ceci, en adaptant le code Rust du tutoriel pour produire une extension Chrome. Cela m'a aidé à découvrir WebAssembly pour Rust tout en fournissant un autre flux pour développer mes connaissances dans le langage, gagnant-gagnant.

## La solution:

**Je suis actuellement en train de publier cette extension - veuillez revenir sous peu et j'aurai tout terminé.**
