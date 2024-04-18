---
title: Reinforcement Learning
subtitle: Computational models simulating the dopamine system circuirty in the brain
description: My third-year project creating a more holistic reinforcement learning model that could simulate the adoption and progression of substance abuse and gambling disorders. By identifying key risk factors, this research could help lessen the impact of addiction on both individuals and wider society.
src: /images/projects/brain.webp
placeholderSrc: /images/projects/brain-placeholder.webp
alt: A purple 3d render of a brain
tags: ['python', 'research']
date: 04/21/23
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

## The project as presented at university:

<iframe src="https://www.youtube.com/embed/-Jsgl17cXuQ?si=SLcUPA5oBz7xd7bv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Motivation behind the role:

Each year millions of people suffer from addictive behaviours. This reduces their quality of life and has wider societal impacts, costing the economy and contributing to climate change.

Consequently, tackling addictions is a high-priority goal for neuroscience, however, until this point, research focused primarily on substance use disorders. This is unfortunate, with behavioural addictions such as pathological gambling, gaming and social media addiction becoming increasingly problematic.

Therefore, the goal of this research was to build on existing research to create a novel reinforcement learning algorithm that could accurately capture both substance use disorders and behavioural addictions.

Hopefully, future models such as this one can be used to mitigate risk factors and prevent addictions from arising. They could influence treatments for addiction, improving the quality of life of afflicted individuals, and their loved ones and helping reduce broader societal issues.

## The solution:

<img src={designInfluence} alt="How the dual-process model built upon previous research" loading="lazy" />

To create a simulation capturing dopamine-mediated addictions, the project's dual-process model consisted of a model-free component. This replicated habitual behaviours, which using a variation on Q-learning enabled based on the following two papers:

1. [Redish (2004) - Addiction as a computational process gone awry](https://pubmed.ncbi.nlm.nih.gov/15591205/)
2. [Dezfouli (2009) - A neurocomputational model for cocaine addiction](https://pubmed.ncbi.nlm.nih.gov/19635010/)

The model-free component could capture the uptake and maintenance of addiction, with sub-optimal addictive actions being chosen over better ones. This was vital, providing a foundation that mirrored experimental findings and could be further built upon to also capture behavioural addictions.

<img src={mfmb} alt="Differences in model-free vs model-based reinforcement learning" loading="lazy" />

Doing so involved introducing a model-based component. This enabled the agents to plan and demonstrate more complex behaviours such as relapse. Crucially, it also let the dual-process model move beyond addictions purely as a result of a 'non-compensable drug-based reward' which was key to the purely model-free approaches. Ultimately, the dual-process model captures behavioural addictions as well as substance use disorders. As with the model-free behaviours, these ideas were based on existing research:

3. [Redish (2007) - Reconciling reinforcement learning models with behavioural extinction and renewal: implications for addiction, relapse, and problem gambling](https://pubmed.ncbi.nlm.nih.gov/17638506/)
4. [Pettine (2023) - Human generalization of internal representations through prototype learning with goal-directed attention](https://www.nature.com/articles/s41562-023-01543-7)

<img src={design} alt="How the dual-process model used internal representations" loading="lazy" />

Pettine's 2023 paper was a critical component of the finalised design, using latent states to create internal representations of the current state. This caused the agents to predict its state based on its context, rather than being provided with this information.

The stimuli in each of the world states could change to reflect variation in the rewards seen, implicitly influencing the agent's behaviour. Consequently, the agent could internally view the same world state as multiple different states.

This created the opportunity for gambling addictions to arise, with losses being assigned to one state, but the agent always chasing the possibility of moving into the highly rewarding winning state.

<LazyImage src={results} placeholderSrc={resultsPlaceholder} alt="Illustration that dual-process model was only one capable of capturing relapse" loading="lazy" />

Furthermore, it allowed relapse to be simulated (see above). Model-free solutions need to unlearn the addiction during periods of recovery, meaning re-exposure and the initial exposure cause addictive choices to be preferred at the same speed. Conversely, with the model free component cestation leads to additional states being learned. This means when the addictive stimulus is shown the agent moves back to the previously learned internal state, suddenly relapsing and reflecting real-world behaviour more closely.

### Technology used

The project used the Python OpenAI Gym package to create all environments and agents, with training being done locally. This was because no deep learning technologies were used, meaning there wasn't a need to use cloud providers.

<img src={envHierarchy} alt="Environment Class Hierarchy" loading="lazy" />
<img src={agentHierarchy} alt="Agent Class Hierarchy" loading="lazy" />

Agents and environments were designed in an object-oriented way so the project could exploit inheritance and polymorphism. This reflected how the research built upon each other and simplified the evaluation by using the same code for each instance.

## The full report

If you're particularly interested the full (63-page!) report is available to read at <a href="/rl-project.pdf" target="_blank">georgegrainger.com/rl-project.pdf</a>.
