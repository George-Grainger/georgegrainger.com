<symbol viewBox="0 0 24 24" id="crater-light" fill="#FBFBFB" filter="url(#crater-shadow-light)">
	<circle cx="12" cy="12" r="12" />
</symbol>

<filter id="crater-shadow-light">
	<feOffset dx="5" dy="1" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.6" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<symbol viewBox="0 0 24 24" id="crater-dark" fill="#CCCED7" filter="url(#crater-shadow-dark)">
	<circle cx="12" cy="12" r="12" />
</symbol>

<filter id="crater-shadow-dark">
	<feOffset dx="5" dy="1" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.6" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<symbol viewBox="0 0 512 512" id="moon">
	<circle cx="256" cy="256" r="256" fill="#DADDE7" filter="url(#moon-shadow)" />
	<use href="#crater-light" x="384" y="180" height="32" width="32" />
	<use href="#crater-light" x="164" y="220" height="56" width="56" />
	<use href="#crater-light" x="256" y="64" height="64" width="64" />
	<use href="#crater-light" x="320" y="320" height="40" width="40" />
	<use href="#crater-dark" x="32" y="160" height="48" width="48" />
	<use href="#crater-dark" x="100" y="384" height="32" width="32" />
</symbol>

<symbol
	viewBox="0 0 24 24"
	id="crater-asteroid"
	fill="#FBFBFB"
	filter="url(#crater-shadow-asteroid)"
>
	<circle cx="12" cy="12" r="12" />
</symbol>

<filter id="crater-shadow-asteroid">
	<feOffset dx="-3" dy="3" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.6" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<filter id="moon-shadow">
	<feOffset dx="96" dy="-96" />
	<feGaussianBlur stdDeviation="8" result="offset-blur" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.4" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<symbol viewBox="0 0 71 40" id="sm-asteroid-1" fill="#DADDE7">
	<path
		d="M21 0C10 1-1 18 0 24c1 7 8 14 17 15 14 2 16 1 37 0s16-5 16-12c-2-6 0-13-16-18-4-1-17-10-33-9Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="12" y="6" height="12" width="12" />
	<use href="#crater-asteroid" x="36" y="24" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 58 45" id="sm-asteroid-2" fill="#DADDE7">
	<path
		d="M54 20c-2-6 7-14-10-20-3 0-4 4-11 4s-7-4-12-4c-6 1-7 8-11 14-4 5-10 7-10 10 1 7 9 19 18 20 14 1 5-4 26-5 22-1 10-12 10-19Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="18" y="5" height="10" width="10" />
	<use href="#crater-asteroid" x="40" y="4" height="12" width="12" />
</symbol>

<symbol viewBox="0 0 57 32" id="sm-asteroid-3" fill="#DADDE7">
	<path
		d="M17 32C8 31-1 17 0 12S6 1 13 1c12-2 13-1 30 0 17 0 13 4 13 9-2 5 0 11-13 15-3 0-14 8-26 7Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="5" y="4" height="10" width="10" />
	<use href="#crater-asteroid" x="50" y="4" height="4" width="4" />
	<use href="#crater-asteroid" x="26" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 56 53" id="sm-asteroid-4" fill="#DADDE7">
	<path
		d="M6 5c-7 7-4 14-5 23 0 7-2 11 0 16 6 14 26 8 38 0 10-7 20-16 15-28C51 7 43 5 34 3 23 0 13-3 6 5Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="20" y="4" height="8" width="8" />
	<use href="#crater-asteroid" x="12" y="8" height="4" width="4" />
	<use href="#crater-asteroid" x="16" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 60 36" id="sm-asteroid-5" fill="#DADDE7">
	<path
		d="M11 10.4C17 8.2 17 1 23.3.1c7.5-1.1 9.4 7.5 16.5 10.3C45.8 13 52 9 56.2 14.2c3.3 4.2 5.3 9.6 1.8 13.6-3.3 3.7-7.9-.3-12.6 1.1-5.2 1.6-6.7 6.7-12 6.9-4.3.1-6.2-2.2-10.2-3.3-6-1.7-11 .7-15.4-3.6-3-2.7-3-5.5-4.7-9.2C2 16.7-.9 15 .3 12 1.8 8 7 12 11 10.4Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="20" y="4" height="8" width="8" />
	<use href="#crater-asteroid" x="40" y="14" height="4" width="4" />
	<use href="#crater-asteroid" x="16" y="16" height="6" width="6" />
</symbol>

<symbol viewBox="0 0 50 42" id="sm-asteroid-6" fill="#DADDE7">
	<path
		d="M13 6C6 7 0 14 0 18c1 4 5 9 10 9 9 1 8 15 21 14 13 0 18-16 18-20-1-4-9-18-19-21-3 0-7 5-17 6Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="30" y="24" height="10" width="10" />
	<use href="#crater-asteroid" x="10" y="10" height="8" width="8" />
	<use href="#crater-asteroid" x="36" y="10" height="3" width="3" />
</symbol>

<symbol viewBox="0 0 80 35" id="sm-asteroid-7" fill="#DADDE7">
	<path
		d="M20.9551 0.141507C9.97817 1.12756 -0.672237 12.8682 0.0332056 19.0813C1.49025 26.204 7.94884 32.9288 16.5505 33.8367C31.2754 35.3909 33.1009 31.5557 54.2098 30.9737C75.3187 30.3917 79.4034 29.686 79.316 23.2657C77.3955 17.5719 70.3841 14.4575 54.2098 8.95071C49.6488 8.33183 36.6711 -1.27026 20.9551 0.141507Z"
		filter="url(#asteroid-shadow)"
	/>
	<use href="#crater-asteroid" x="16" y="4" height="17" width="17" />
	<use href="#crater-asteroid" x="36" y="10" height="3" width="3" />
	<use href="#crater-asteroid" x="64" y="18" height="5" width="5" />
</symbol>

<symbol viewBox="0 0 49 48" id="sm-asteroid-8" fill="#DADDE7">
	<path
		filter="url(#asteroid-shadow)"
		mask="url(#asteroid-mask-1)"
		d="M3.84136 19.5578C-2.6064 17.2305 0.565829 38.0723 2.59392 43.758C4.20025 48.2614 11.754 49.2054 14.719 45.4545C18.8404 40.2407 28.1726 43.4283 30.9855 41.3131C33.808 39.1906 33.5176 36.1851 36.2746 33.9781C38.5266 32.1755 40.4619 32.259 42.911 30.7348C45.2007 29.3098 47.2654 28.9903 48.3997 26.5434C49.7059 23.7256 48.5057 15.1967 47.6092 12.223C44.7723 2.81277 44.9596 2.94383 43.3101 1.3952C41.2362 -0.551916 38.9665 0.0648133 36.1249 0.197662C32.1537 0.383323 29.8227 1.39119 26.5446 3.64058C24.6347 4.95114 24.4534 8.23322 22.2036 7.68226C19.6968 7.06838 20.5015 4.41575 19.6089 3.64058C17.4061 1.72756 12.4237 5.68637 12.4237 5.68637C9.23056 7.76847 8.33042 15.6333 8.13724 17.3212L8.13252 17.3623C7.94957 18.9591 5.61196 20.1969 3.84136 19.5578Z"
	/>
	<path d="M40.12 17.12a6 6 0 1 0-8.24-8.24 6 6 0 0 1 8.25 8.25l-.01-.01Z" fill="#adb0b8" />
	<use href="#crater-asteroid" x="10" y="20" height="2" width="2" />
	<use href="#crater-asteroid" x="16" y="18" height="4" width="4" />
	<use href="#crater-asteroid" x="14" y="24" height="3" width="3" />
	<use href="#crater-asteroid" x="26" y="28" height="7" width="7" />
	<use href="#crater-asteroid" x="42" y="22" height="3" width="3" />
	<use href="#crater-asteroid" x="8" y="36" height="5" width="5" />
	<use href="#crater-asteroid" x="16" y="6" height="3" width="3" />
</symbol>

<symbol viewBox="0 0 95 49" id="sm-asteroid-9" fill="#DADDE7">
	<path
		filter="url(#asteroid-shadow)"
		mask="url(#asteroid-mask-2)"
		d="M6.7 9.9C1.8 16.8 10 21 8.1 25.4 6.3 29.8-1 28.3.5 33c1.5 4.6 3.2 5.8 7 7 4.7 1.5 10.3 0 15 1.2 4.2 1.1 6 3.4 10.2 4.4 8.4 2.2 19-1 22.3-1.5 3.2-.5 7.9 5.4 13 4 4.4-1 5.5-4.3 8.7-7.4 2.6-2.5 4.5-3.6 6.3-6.7 1.3-2 1.4-3.4 2.4-5.6 2.2-4.8 10.5-13 8.3-17.7-1.5-3.6-6.1 1.7-10.8.8-2.7-.5-1-9.3-3.3-10.7C76-1.4 72.1 5.9 69 8.9c-5.1 5-11.2 1.9-18.4 1.2-4.3-.4-6.6-2.3-11-2-4.9.3-7 3.3-11.8 4.5C21.2 14 11.6 3 6.8 9.9Z"
	/>
	<path d="M81.12 24.12a6 6 0 1 0-8.24-8.24 6 6 0 0 1 8.25 8.25l-.01-.01Z" fill="#adb0b8" />
	<use href="#crater-asteroid" x="12" y="10" height="2" width="2" />
	<use href="#crater-asteroid" x="12" y="28" height="4" width="4" />
	<use href="#crater-asteroid" x="24" y="18" height="8" width="8" />
	<use href="#crater-asteroid" x="48" y="22" height="7" width="7" />
	<use href="#crater-asteroid" x="68" y="36" height="5" width="5" />
	<use href="#crater-asteroid" x="40" y="36" height="3" width="3" />
	<use href="#crater-asteroid" x="37" y="10" height="3" width="3" />
	<use href="#crater-asteroid" x="76" y="4" height="2" width="2" />
</symbol>

<filter id="asteroid-shadow">
	<feOffset dx="2" dy="-4" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.4" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<mask id="asteroid-mask-1">
	<rect width="49" height="48" fill="white" />
	<path d="M31.88 8.88a6 6 0 0 1 8.25 8.25 6 6 0 0 1-8.26-8.26l.01.01Z" fill="black" />
</mask>

<mask id="asteroid-mask-2">
	<rect width="95" height="49" fill="white" />
	<path d="M72.88 15.88a6 6 0 0 1 8.25 8.25 6 6 0 0 1-8.26-8.26l.01.01Z" fill="black" />
</mask>
