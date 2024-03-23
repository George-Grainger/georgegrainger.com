---
title: Wordle Assistant
subtitle: Designed a browser extension that helps you guess the best next word in Wordle
description: Designed and optimised an information-theory-based Wordle Solver using Rust. Then combined WebAssembly and Chrome browser extensions to enable the solver to be used interactively to assist in the existing Worlde game.
src: /images/projects/wordle-assistant.svg
alt: Collage of album covers
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

<LazyImage src={splash} placeholderSrc={splashPlaceholder} alt="Wordle Assistant Cover Image" />

## The motivation:

The Wordle craze swept the world, but since I live under a rock, I never got properly into it. However, I like the concept of the game as did find it fun to play from time to time. I enjoy playing puzzles and do a few most days as a hobby (and to try and wake up).

Recently, I've also been trying to find ways to write code in Rust. Its ideas around ownership make me curious, and with memory leaks and issues with parallelism getting drilled into me during my University course units, the promise to overcome them is enchanting!

Therefore, when I saw a tutorial on making a Wordle Solver from [Jon Gjengset](https://www.youtube.com/c/JonGjengset) I thought it'd be a great opportunity to see how somebody with much greater Rust experience than me approaches a contained problem.

Ultimately having completed the tutorial, however, I felt there was potential to use this product to explore WebAssembly. This is another thing on my Rust to-do list and I thought using this model as the base for a browser extension would be perfect.

This isn't a new idea, but I didn't want the extension to just solve the game - that's kind of boring. Instead, I was after something that assisted you as you went. For those times you think you know where three of the letters go but no words then spring to mind.

Consequently, I decided I'd build this, adapting the Rust code from the tutorial to produce a Chrome extension. This helped me check out WebAssembly for Rust while providing another stream for developing my knowledge in the language, a win-win.

## The solution:

<LazyImage src={popup} placeholderSrc={popupPlaceholder} alt="Wordle Assistant Popup" loading="lazy" />

Having created the Wordle Solver, the first step was to access it through WebAssembly to process input and display a result on the front end. This was pleasantly straightforward, with only a few caveats.

Firstly, `wasm_bindgen` couldn't compile using `mimalloc` as the memory allocator. Consequently, this optimisation had to be reverted.

Next, `usize` in WebAssembly caused the word counts to overflow and needed to be increased to `u64`.

Finally, while errors produced from the Rust functions with `wasm_bindgen` decorators were handled gracefully, those internal to the solver threw cryptic errors pointing to lines in the compiled binary. This made it challenging to identify the cause of problems. If WebAssembly had been considered from the outset, this could have been prevented by using `wasm_bindgen` internally within the solver.

At this point, the Solver could take input from a popup box and produce output in return. The next step was to extract this information from the NYT Wordle site itself so the player didn't need to input it manually. This is where the Chrome extension comes in!

It's composed of two interacting parts that enable optimal guesses to be found without additional user input or unnecessary processing:

1. The popup where the user interacts with the extension. This requests data from the page through messages, passing the game state to WebAssembly Solver and presenting the output to the next guess. This is initially hidden, allowing the user to reveal the letters one at a time.

2. A content-script is injected into the Wordle page when loaded. This listens for messages from the popup, parsing the game state from the HTML and sending it back as a response.

So, the extension can provide the NYT game state and pass it to the popup, all that's left is to propagate this to the Wordle Solver. After resolving some issues with the content security policy enabling extensions to run WASM, this was just a case of running the `wasm_bindgem` entry point from the popup script.

With that, we had a working Wordle! Feel free to check it out and level up your own Wordle game: it's available on the [Chrome Store](https://chromewebstore.google.com/detail/wordle-assistant/djofdcdjkjlpbacneapdehcaandgemoe).

## Demonstration of the results:

So let's see how it does on the real thing - I always start with Route, so I'll use this as the first word and then take the assistant's advice on the remaining guesses.

### Guess 1:

Starting with Route as per my regular strategy.

<LazyImage src={guess1} placeholderSrc={guess1Placeholder} alt="Guess 1: route - NNMNN" loading="lazy" />

### Guess 2:

Not terrible, but not amazing with only 'O' being yellow. Checking the assistant we see the next word to guess is 'salon' - not one of my regular go-tos!

<LazyImage src={guess2} placeholderSrc={guess2Placeholder} alt="Guess 2: salon - NMMCN" loading="lazy" />

## Guess 3:

Now things are starting to look more promising. Again taking the assistant's advice we now go with 'aloof' and I'm happy to admit I probably wouldn't have gone with that next.

<LazyImage src={guess3} placeholderSrc={guess3Placeholder} alt="Guess 3: aloof - CCCCC" loading="lazy" />

And boom, all green! Pretty impressive, cleary Jon Gjengset knows what he's on about with this information theory stuff.

Again feel free to download it and try it yourself, it even has hard mode support if you're one of the crazy ones who does that. It's available here on the [Chrome Store](https://chromewebstore.google.com/detail/wordle-assistant/djofdcdjkjlpbacneapdehcaandgemoe)
