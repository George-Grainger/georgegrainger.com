<svg viewBox="0 0 24 24" id="crater-light" fill="none">
	<path d="M22.39 6A12 12 0 1 0 1.61 18 12 12 0 0 0 22.39 6Z" fill="#FBFBFB" />
	<path
		d="M11.18 23.97a12 12 0 0 1 6.1-22.75A11.99 11.99 0 0 0 1.6 18a11.99 11.99 0 0 0 9.57 5.97Z"
		fill="#BCBCBC"
	/>
</svg>

<svg viewBox="0 0 24 24" id="crater-dark" fill="none">
	<path d="M22.39 6A12 12 0 1 0 1.61 18 12 12 0 0 0 22.39 6Z" fill="#CCCED7" />
	<path
		d="M11.18 23.97a12 12 0 0 1 6.1-22.75A11.99 11.99 0 0 0 1.6 18a11.99 11.99 0 0 0 9.57 5.97Z"
		fill="#86878E"
	/>
</svg>

<symbol viewBox="0 0 512 512" id="moon">
	<circle cx="256" cy="256" r="256" fill="#DADDE7" filter="url(#moon-shadow)" />
	<use href="#crater-light" x="384" y="180" height="32" width="32" />
	<use href="#crater-light" x="164" y="220" height="56" width="56" />
	<use href="#crater-light" x="256" y="64" height="64" width="64" />
	<use href="#crater-light" x="320" y="320" height="40" width="40" />
	<use href="#crater-dark" x="32" y="160" height="48" width="48" />
	<use href="#crater-dark" x="100" y="384" height="32" width="32" />
</symbol>

<symbol viewBox="0 0 12 12" id="crater-asteroid" fill="none">
	<path d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Z" fill="#FBFBFB" />
	<path d="M1.021 2.65a6 6 0 0 1 8.328 8.328A6 6 0 1 0 1.022 2.65Z" fill="#BCBCBC" />
</symbol>

<filter id="moon-shadow">
	<feOffset dx="96" dy="-96" />
	<feGaussianBlur stdDeviation="8" result="offset-blur" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.4" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<symbol viewBox="0 0 71 40" id="asteroid-1">
	<path
		d="M21 0C10 1-1 18 0 24c1 7 8 14 17 15 14 2 16 1 37 0s16-5 16-12c-2-6 0-13-16-18-4-1-17-10-33-9Z"
		fill="#DADDE7"
	/>
	<path
		d="m3 14-1 6c1 7 8 14 17 15 11 2 14 1 25 1l12-1c8 0 12-1 15-3 0 4-2 6-17 7l-12 1c-11 0-14 1-25-1-9-1-16-8-17-15l3-10Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="12" y="6" height="12" width="12" />
	<use href="#crater-asteroid" x="36" y="24" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 58 45" id="asteroid-2">
	<path
		d="M54 20c-2-6 7-14-10-20-3 0-4 4-11 4s-7-4-12-4c-6 1-7 8-11 14-4 5-10 7-10 10 1 7 9 19 18 20 14 1 5-4 26-5 22-1 10-12 10-19Z"
		fill="#DADDE7"
	/>
	<path
		d="M57.3 32.3c-2 1.4-5.4 2.4-11.3 2.7-11 .5-13.8 2.2-16 3.4-1.9 1.2-3.4 2-10 1.6-8.7-1-16.4-12.1-17.9-19.2C1 21.8 0 22.8 0 24c1 7 9 19 18 20 6.6.5 8.1-.4 10-1.6 2.2-1.2 5-2.9 16-3.4 10.5-.5 13.2-3.2 13.3-6.7Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="18" y="5" height="10" width="10" />
	<use href="#crater-asteroid" x="40" y="4" height="12" width="12" />
</symbol>

<symbol viewBox="0 0 57 32" id="asteroid-3">
	<path
		d="M17 32C8 31-1 17 0 12S6 1 13 1c12-2 13-1 30 0 17 0 13 4 13 9-2 5 0 11-13 15-3 0-14 8-26 7Z"
		fill="#DADDE7"
	/>
	<path
		d="M2 8c-1 5 8 19 17 20a43 43 0 0 0 21-5.2c2.3-1 4-1.8 5-1.8 5.1-1.6 8-3.5 9.5-5.5-1 3.5-3 7-11.5 9.5-1 0-2.7.8-5 1.8A43 43 0 0 1 17 32C8 31-1 17 0 12c.3-1.7 1.1-3.5 2.3-5.1L2 8Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="5" y="4" height="10" width="10" />
	<use href="#crater-asteroid" x="50" y="4" height="4" width="4" />
	<use href="#crater-asteroid" x="26" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 56 53" id="asteroid-4">
	<path
		d="M6 5c-7 7-4 14-5 23 0 7-2 11 0 16 6 14 26 8 38 0 10-7 20-16 15-28C51 7 43 5 34 3 23 0 13-3 6 5Z"
		fill="#DADDE7"
	/>
	<path
		d="M4 7.3c-1 3-.9 6-.8 9.4 0 2.3 0 4.7-.2 7.3 0 2.6-.3 4.7-.5 6.7C2 34 1.7 36.8 3 40c6 14 26 8 38 0a49.7 49.7 0 0 0 13.4-12.6C52.1 34 45.5 39.4 39 44 27 52 7 58 1 44c-1.3-3.2-1-6-.5-9.3.2-2 .5-4.1.5-6.7.3-2.6.2-5 .2-7.3 0-4.8-.2-9.2 2.8-13.4Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="20" y="4" height="8" width="8" />
	<use href="#crater-asteroid" x="12" y="8" height="4" width="4" />
	<use href="#crater-asteroid" x="16" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 60 36" id="asteroid-5">
	<path
		d="M11 10.4C17 8.2 17 1 23.3.1c7.5-1.1 9.4 7.5 16.5 10.3C45.8 13 52 9 56.2 14.2c3.3 4.2 5.3 9.6 1.8 13.6-3.3 3.7-7.9-.3-12.6 1.1-5.2 1.6-6.7 6.7-12 6.9-4.3.1-6.2-2.2-10.2-3.3-6-1.7-11 .7-15.4-3.6-3-2.7-3-5.5-4.7-9.2C2 16.7-.9 15 .3 12 1.8 8 7 12 11 10.4Z"
		fill="#DADDE7"
	/>
	<path
		d="M2.1 10.3c-.8.2-1.4.7-1.8 1.7-.8 2 .2 3.4 1.2 5 .6.8 1.2 1.6 1.6 2.7L4.3 23c.8 2.2 1.4 4 3.5 5.9 2.7 2.7 5.7 2.8 9 2.8 2 .1 4.1.2 6.4.8 1.5.4 2.8 1 4 1.6a11 11 0 0 0 6.2 1.7c3-.1 4.7-1.7 6.5-3.4 1.6-1.3 3.2-2.8 5.5-3.5 2-.6 4-.2 5.8.1 2.5.5 4.9 1 6.8-1.2 1-1.2 1.6-2.4 1.8-3.7-2 1.8-4.2 1.4-6.6 1-1.9-.4-3.8-.8-5.8-.2-2.3.7-4 2.2-5.5 3.5-1.8 1.7-3.6 3.3-6.5 3.4-2.6 0-4.4-.8-6.3-1.7-1.1-.6-2.4-1.2-3.9-1.6a25 25 0 0 0-6.4-.8c-3.3 0-6.3-.1-9-2.8-2-1.9-2.7-3.7-3.5-6l-1.2-3.2c-.4-1-1-2-1.6-2.8a8.8 8.8 0 0 1-1.4-2.6Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="20" y="4" height="8" width="8" />
	<use href="#crater-asteroid" x="40" y="14" height="4" width="4" />
	<use href="#crater-asteroid" x="16" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 50 42" id="asteroid-6">
	<path
		d="M13 6C6 7 0 14 0 18c1 4 5 9 10 9 9 1 8 15 21 14 13 0 18-16 18-20-1-4-9-18-19-21-3 0-7 5-17 6Z"
		fill="#DADDE7"
	/>
	<path
		d="M2.1 12.9 2 14c1 4 5 9 10 9 4 .4 6 3.4 8 6.4 2.8 4 5.7 8.2 13 7.6 6.8 0 11.4-4.4 14.3-9.1C44.8 33.9 39.7 41 31 41c-7.3.6-10.2-3.6-13-7.6-2-3-4-6-8-6.4-5 0-9-5-10-9 0-1.5.8-3.3 2.1-5.1Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="30" y="24" height="10" width="10" />
	<use href="#crater-asteroid" x="10" y="10" height="8" width="8" />
	<use href="#crater-asteroid" x="36" y="10" height="3" width="3" />
</symbol>

<symbol viewBox="0 0 81 36" id="asteroid-7" fill="none">
	<path
		d="M21.2.7C10 1.7-.6 13.7 0 20.1c1.4 7.3 8 14.2 16.6 15.1 14.9 1.6 16.7-2.3 38-3C76 31.8 80.1 31 80 24.5c-1.9-5.8-9-9-25.3-14.7C50.1 9.1 37-.7 21.2.7Z"
		fill="#DADDE7"
	/>
	<path
		d="M20.7.8c-7.9 4-14 12.2-13.5 17 1.5 7.3 8 14.2 16.6 15.1 8 .9 12.2.2 17.7-.8 4.8-.8 10.5-1.8 20.3-2 7.4-.3 12.8-.5 16.6-1-2.7 2.3-9.3 2.8-23.7 3.2-9.8.2-15.5 1.2-20.3 2-5.5 1-9.7 1.8-17.7.9-8.6-1-15.2-7.8-16.6-15.1-.7-6.3 9.7-18 20.6-19.3Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="16" y="4" height="17" width="17" />
	<use href="#crater-asteroid" x="36" y="10" height="3" width="3" />
	<use href="#crater-asteroid" x="64" y="18" height="5" width="5" />
</symbol>

<symbol viewBox="0 0 81 36" id="asteroid-7-flipped">
	<path
		d="M59.47 35.7c11.02-1.3 21.44-13.57 20.57-19.9A19.37 19.37 0 0 0 63.02 1.17c-14.86-1.2-16.6 2.77-37.84 3.92C3.94 6.24-.16 7.07.1 13.63c2.08 5.76 9.22 8.76 25.65 13.95 4.61.52 17.93 9.98 33.72 8.12Z"
		fill="#DADDE7"
	/>
	<path
		d="M9.02 6.38c-1.48 1.15-1.91 2.73-1.82 5 2.08 5.76 9.22 8.76 25.65 13.95 1.35.15 3.45 1.07 6.14 2.25 6.47 2.83 16.37 7.17 27.5 5.88a20.74 20.74 0 0 1-7.02 2.24c-11.17 1.32-21.1-3.03-27.58-5.87-2.69-1.18-4.79-2.1-6.14-2.25C9.32 22.38 2.18 19.4.1 13.63c-.17-4.34 1.57-6.17 8.92-7.25Z"
		fill="#ADAFB6"
	/>
	<use href="#crater-asteroid" x="36" y="10" height="3" width="3" />
	<use href="#crater-asteroid" x="50" y="8" height="15" width="15" />
</symbol>

<svg viewBox="0 0 49 48" id="asteroid-8">
	<path
		d="M3.8 19.6C-2.6 17.2.6 38 2.6 43.8c1.6 4.5 9.2 5.4 12.1 1.7 4.1-5.3 13.5-2 16.3-4.2 2.8-2.1 2.5-5.1 5.3-7.3 2.2-1.8 4.2-1.7 6.6-3.3 2.3-1.4 4.4-1.7 5.5-4.2 1.3-2.8.1-11.3-.8-14.3C44.8 2.8 45 3 43.3 1.4c-2-2-4.3-1.3-7.2-1.2-4 .2-6.3 1.2-9.6 3.4-1.9 1.4-2 4.6-4.3 4-2.5-.5-1.7-3.2-2.6-4-2.2-1.9-7.2 2-7.2 2-3.2 2.2-4 10-4.3 11.7-.2 1.7-2.5 2.9-4.3 2.3Z"
		mask="url(#asteroid-mask-1)"
		fill="#DADDE7"
	/>
	<path
		d="M2.2 19.5C-2 21.2.8 38.6 2.6 43.8c1.6 4.5 9.2 5.4 12.1 1.7 2.5-3.2 7-3.3 10.7-3.3 2.4 0 4.5 0 5.6-.9a9 9 0 0 0 2.7-3.7 9.4 9.4 0 0 1 2.6-3.6c1.2-1 2.4-1.4 3.6-1.9 1-.3 2-.7 3-1.4l1.8-1c1.6-.7 2.9-1.4 3.7-3.2l.5-2c-.6.5-1.4.8-2.2 1.2l-1.8 1c-1 .7-2 1-3 1.4-1.2.5-2.4.9-3.6 1.9-1.4 1-2 2.3-2.6 3.6a9 9 0 0 1-2.7 3.7c-1.1.8-3.2.9-5.6.9-3.7 0-8.2 0-10.7 3.3-3 3.7-10.5 2.8-12.1-1.7a57.6 57.6 0 0 1-2.4-20.3Z"
		fill="#ADAFB6"
	/>
	<path d="M40.12 17.12a6 6 0 1 0-8.24-8.24 6 6 0 0 1 8.25 8.25l-.01-.01Z" fill="#ADAFB6" />
	<use href="#crater-asteroid" x="10" y="20" height="2" width="2" />
	<use href="#crater-asteroid" x="16" y="18" height="4" width="4" />
	<use href="#crater-asteroid" x="14" y="24" height="3" width="3" />
	<use href="#crater-asteroid" x="26" y="28" height="7" width="7" />
	<use href="#crater-asteroid" x="42" y="22" height="3" width="3" />
	<use href="#crater-asteroid" x="8" y="36" height="5" width="5" />
	<use href="#crater-asteroid" x="16" y="6" height="3" width="3" />
</svg>

<symbol viewBox="0 0 95 49" id="asteroid-9">
	<path
		d="M6.7 9.9C1.8 16.8 10 21 8.1 25.4 6.3 29.8-1 28.3.5 33c1.5 4.6 3.2 5.8 7 7 4.7 1.5 10.3 0 15 1.2 4.2 1.1 6 3.4 10.2 4.4 8.4 2.2 19-1 22.3-1.5 3.2-.5 7.9 5.4 13 4 4.4-1 5.5-4.3 8.7-7.4 2.6-2.5 4.5-3.6 6.3-6.7 1.3-2 1.4-3.4 2.4-5.6 2.2-4.8 10.5-13 8.3-17.7-1.5-3.6-6.1 1.7-10.8.8-2.7-.5-1-9.3-3.3-10.7C76-1.4 72.1 5.9 69 8.9c-5.1 5-11.2 1.9-18.4 1.2-4.3-.4-6.6-2.3-11-2-4.9.3-7 3.3-11.8 4.5C21.2 14 11.6 3 6.8 9.9Z"
		mask="url(#asteroid-mask-2)"
		fill="#DADDE7"
	/>
	<path
		d="m4 28.7-.4.2c-2.1.8-4 1.5-3.1 4.1 1.5 4.6 3.2 5.8 7 7 2.5.8 5.2.7 8 .7 2.3 0 4.8 0 7 .5 2 .5 3.5 1.4 5 2.2 1.5.8 3 1.7 5.2 2.2 6.8 1.8 15.1 0 19.8-1l2.5-.5c1.4-.2 3 .7 4.8 1.8 2.5 1.4 5.3 3 8.2 2.2 2.9-.7 4.3-2.3 5.9-4.2l-2.2.8c-3 .8-5.7-.8-8.2-2.2-1.8-1-3.4-2-4.8-1.8l-2.5.5c-4.7 1-13 2.8-19.8 1a19 19 0 0 1-5.2-2.2c-1.5-.8-3-1.7-5-2.2-2.2-.6-4.7-.5-7-.5-2.8 0-5.5.1-8-.7-3.8-1.2-5.5-2.4-7-7l-.2-.9Z"
		fill="#ADAFB6"
	/>
	<path d="M81.12 24.12a6 6 0 1 0-8.24-8.24 6 6 0 0 1 8.25 8.25l-.01-.01Z" fill="#ADAFB6" />
	<use href="#crater-asteroid" x="12" y="10" height="2" width="2" />
	<use href="#crater-asteroid" x="12" y="28" height="4" width="4" />
	<use href="#crater-asteroid" x="24" y="18" height="8" width="8" />
	<use href="#crater-asteroid" x="48" y="22" height="7" width="7" />
	<use href="#crater-asteroid" x="68" y="36" height="5" width="5" />
	<use href="#crater-asteroid" x="40" y="36" height="3" width="3" />
	<use href="#crater-asteroid" x="37" y="10" height="3" width="3" />
	<use href="#crater-asteroid" x="76" y="4" height="2" width="2" />
</symbol>

<mask id="asteroid-mask-1">
	<rect width="49" height="48" fill="white" />
	<path d="M31.88 8.88a6 6 0 0 1 8.25 8.25 6 6 0 0 1-8.26-8.26l.01.01Z" fill="black" />
</mask>

<mask id="asteroid-mask-2">
	<rect width="95" height="49" fill="white" />
	<path d="M72.88 15.88a6 6 0 0 1 8.25 8.25 6 6 0 0 1-8.26-8.26l.01.01Z" fill="black" />
</mask>
