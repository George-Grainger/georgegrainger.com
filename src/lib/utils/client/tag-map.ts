import type { ComponentType } from 'svelte';
import Assembly from '$lib/projects/logos/Assembly.svelte';
import Cpp from '$lib/projects/logos/Cpp.svelte';
import Firebase from '$lib/projects/logos/Firebase.svelte';
import Heart from '$lib/projects/logos/Heart.svelte';
import IoT from '$lib/projects/logos/IoT.svelte';
import Java from '$lib/projects/logos/Java.svelte';
import JUnit from '$lib/projects/logos/JUnit.svelte';
import NextJs from '$lib/projects/logos/NextJS.svelte';
import OpenSource from '$lib/projects/logos/OpenSource.svelte';
import Python from '$lib/projects/logos/Python.svelte';
import Research from '$lib/projects/logos/Research.svelte';
import SolidJs from '$lib/projects/logos/SolidJS.svelte';
import TailwindCss from '$lib/projects/logos/TailwindCSS.svelte';
import W3C from '$lib/projects/logos/W3C.svelte';
import WordPress from '$lib/projects/logos/WordPress.svelte';
import WebAssembly from '$lib/projects/logos/WebAssembly.svelte';
import Svelte from '$lib/projects/logos/Svelte.svelte';
import Rust from '$lib/projects/logos/Rust.svelte';
import Chrome from '$lib/projects/logos/Chrome.svelte';

export interface TagInfo {
	name: string;
	href?: string;
	component: ComponentType;
}

const TAGS = {
	assembly: {
		name: 'Assembly',
		href: 'https://www.assemblyscript.org/',
		component: Assembly
	},
	chrome: {
		name: 'Extension',
		href: 'https://chromewebstore.google.com/',
		component: Chrome
	},
	cpp: {
		name: 'C++',
		href: 'https://en.wikipedia.org/wiki/C%2B%2B',
		component: Cpp
	},
	firebase: {
		name: 'Firebase',
		href: 'https://firebase.google.com/',
		component: Firebase
	},
	love: {
		name: 'Love',
		component: Heart
	},
	iot: {
		name: 'IoT',
		href: 'https://en.wikipedia.org/wiki/Internet_of_things',
		component: IoT
	},
	java: {
		name: 'Java',
		href: 'https://www.java.com/',
		component: Java
	},
	junit: {
		name: 'JUnit',
		href: 'https://junit.org/junit5/',
		component: JUnit
	},
	nextjs: {
		name: 'NextJs',
		href: 'https://nextjs.org/',
		component: NextJs
	},
	opensource: {
		name: 'Open-Source',
		href: 'https://opensource.org/',
		component: OpenSource
	},
	python: {
		name: 'Python',
		href: 'https://www.python.org/',
		component: Python
	},
	research: {
		name: 'Research',
		component: Research
	},
	solidjs: {
		name: 'SolidJS',
		href: 'https://www.solidjs.com/',
		component: SolidJs
	},
	sveltekit: {
		name: 'SvelteKit',
		href: 'https://kit.svelte.dev/',
		component: Svelte
	},
	tailwind: {
		name: 'TailwindCSS',
		href: 'https://tailwindcss.com/',
		component: TailwindCss
	},
	accessibility: {
		name: 'Accessibility',
		href: 'https://www.w3.org/',
		component: W3C
	},
	webassembly: {
		name: 'WebAssembly',
		href: 'https://webassembly.org/',
		component: WebAssembly
	},
	wordpress: {
		name: 'WordPress',
		href: 'https://wordpress.org/',
		component: WordPress
	},
	rust: {
		name: 'Rust',
		href: 'https://www.rust-lang.org',
		component: Rust
	}
};

// Solve issue with type either not correctly mapping keys or values
export const tagMap: Record<string, TagInfo> = TAGS;
