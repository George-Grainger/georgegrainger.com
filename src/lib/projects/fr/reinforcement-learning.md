---
title: Reinforcement Learning
subtitle: Modèles informatiques simulant les circuits du système dopaminergique dans le cerveau
description: Mon projet de troisième année visant à créer un modèle d'apprentissage par renforcement plus holistique qui pourrait simuler l'adoption et la progression de la toxicomanie et des troubles liés au jeu. En identifiant les principaux facteurs de risque, cette recherche pourrait aider à réduire l'impact de la dépendance sur les individus et la société en général.
src: /images/projects/brain.webp
placeholderSrc: /images/projects/brain-placeholder.webp
alt: Un rendu 3D violet d'un cerveau
tags: ['python', 'research']
date: 04/21/22
homepage: 3
---

<script>
    import LazyImage from '$lib/components/LazyImage.svelte';
    import mfmb from '$lib/assets/projects/reinforcement-learning/mf_vs_mb.svg';
    import designInfluence from '$lib/assets/projects/reinforcement-learning/design_influence.svg';
    import design from '$lib/assets/projects/reinforcement-learning/design.svg';
    import results from '$lib/assets/projects/reinforcement-learning/relapse.png';
    import resultsPlaceholder from '$lib/assets/projects/reinforcement-learning/relapse-placeholder.png';
    import agentHierarchy from '$lib/assets/projects/reinforcement-learning/agent_hierarchy.svg';
    import envHierarchy from '$lib/assets/projects/reinforcement-learning/environment_hierarchy.svg';
</script>

## Le projet tel que présenté à l'université :

<iframe src="https://youtu.be/-Jsgl17cXuQ"></iframe>

## Motivation derrière le rôle :

Chaque année, des millions de personnes souffrent de comportements addictifs. Cela réduit leur qualité de vie et a des conséquences sociétales plus larges, coûtant cher à l’économie et contribuant au changement climatique.

Par conséquent, la lutte contre les addictions est un objectif hautement prioritaire pour les neurosciences, mais jusqu’à présent, la recherche s’est principalement concentrée sur les troubles liés à l’usage de substances. C’est regrettable, car les dépendances comportementales telles que le jeu pathologique, la dépendance aux jeux vidéo et aux réseaux sociaux deviennent de plus en plus problématiques.

Par conséquent, l’objectif de cette recherche était de s’appuyer sur les recherches existantes pour créer un nouvel algorithme d’apprentissage par renforcement capable de capturer avec précision à la fois les troubles liés à la consommation de substances et les dépendances comportementales.

Espérons que de futurs modèles comme celui-ci pourront être utilisés pour atténuer les facteurs de risque et prévenir l’apparition de dépendances. Ils pourraient influencer les traitements contre la toxicomanie, améliorer la qualité de vie des personnes atteintes et de leurs proches et contribuer à réduire les problèmes sociétaux plus larges.

## The solution:

<img src={designInfluence} alt="Comment le modèle à double processus s'appuie sur des recherches antérieures" loading="lazy" />

Pour créer une simulation capturant les dépendances médiées par la dopamine, le modèle à double processus du projet consistait en un composant sans modèle. Cela reproduisait les comportements habituels, qui, grâce à une variante du Q-learning, ont été activés sur la base des deux articles suivants :

1. [Redish (2004) - Addiction as a computational process gone awry](https://pubmed.ncbi.nlm.nih.gov/15591205/)
2. [Dezfouli (2009) - A neurocomputational model for cocaine addiction](https://pubmed.ncbi.nlm.nih.gov/19635010/)

La composante sans modèle pourrait capturer l’adoption et le maintien de la dépendance, les actions addictives sous-optimales étant préférées aux meilleures. Cela était vital, car il fournissait une base qui reflétait les résultats expérimentaux et qui pouvait être développée davantage pour capturer également les dépendances comportementales.

<img src={mfmb} alt="Différences entre l'apprentissage par renforcement sans modèle et basé sur un modèle" loading="lazy" />

Cela impliquait l’introduction d’un composant basé sur un modèle. Cela a permis aux agents de planifier et de démontrer des comportements plus complexes tels que la rechute. Surtout, cela a également permis au modèle à double processus d'aller au-delà des dépendances uniquement grâce à une « récompense non indemnisable basée sur la drogue », qui était la clé des approches purement sans modèle. En fin de compte, le modèle à double processus prend en compte les dépendances comportementales ainsi que les troubles liés à l’usage de substances. Comme pour les comportements sans modèle, ces idées étaient basées sur des recherches existantes :

3. [Redish (2007) - Reconciling reinforcement learning models with behavioural extinction and renewal: implications for addiction, relapse, and problem gambling](https://pubmed.ncbi.nlm.nih.gov/17638506/)
4. [Pettine (2023) - Human generalization of internal representations through prototype learning with goal-directed attention](https://www.nature.com/articles/s41562-023-01543-7)

<img src={design} alt="Comment le modèle à double processus a utilisé les représentations internes" loading="lazy" />

L'article de Pettine de 2023 était un élément essentiel de la conception finalisée, utilisant les états latents pour créer des représentations internes de l'état actuel. Cela a amené les agents à prédire son état en fonction de son contexte, plutôt que de recevoir ces informations.

Les stimuli dans chacun des états du monde pourraient changer pour refléter la variation des récompenses observées, influençant implicitement le comportement de l'agent. Par conséquent, l’agent pourrait considérer en interne le même état mondial comme plusieurs états différents.

Cela a créé l'opportunité de développer une dépendance au jeu, les pertes étant attribuées à un seul état, mais l'agent recherchant toujours la possibilité de passer à l'état gagnant, très gratifiant.

<LazyImage src={results} placeholderSrc={resultsPlaceholder} alt="Illustration selon laquelle le modèle à double processus était le seul capable de capturer les rechutes" loading="lazy" />

De plus, cela a permis de simuler une rechute (voir ci-dessus). Les solutions sans modèle doivent désapprendre la dépendance pendant les périodes de guérison, ce qui signifie que la réexposition et l'exposition initiale font préférer les choix addictifs à la même vitesse. À l’inverse, avec le modèle libre, la cestation des composants conduit à l’apprentissage d’états supplémentaires. Cela signifie que lorsque le stimulus addictif est manifesté, l'agent revient à l'état interne précédemment appris, rechutant soudainement et reflétant plus fidèlement le comportement du monde réel.

### Technologie utilisée

Le projet a utilisé le package Python OpenAI Gym pour créer tous les environnements et agents, la formation étant effectuée localement. En effet, aucune technologie d'apprentissage profond n'était utilisée, ce qui signifiait qu'il n'était pas nécessaire de recourir à des fournisseurs de cloud.

<img src={envHierarchy} alt="Hiérarchie des classes d'environnement" loading="lazy" />
<img src={agentHierarchy} alt="Hiérarchie des classes d'agents" loading="lazy" />

Les agents et les environnements ont été conçus de manière orientée objet afin que le projet puisse exploiter l'héritage et le polymorphisme. Cela reflète la façon dont les recherches se sont construites les unes sur les autres et ont simplifié l'évaluation en utilisant le même code pour chaque instance.

## Le rapport complet

Si vous êtes particulièrement intéressé, le rapport complet (60 pages !) peut être lu sur [georgegrainger.com/rl-project.pdf](/rl-project.pdf).
