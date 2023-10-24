<symbol viewBox="0 0 512 512" id="moon">
	<circle cx="256" cy="256" r="256" fill="#DADDE7" filter="url(#moon-shadow)" />
	<use href="#crater-light" x="384" y="180" height="32" width="32" />
	<use href="#crater-light" x="164" y="220" height="56" width="56" />
	<use href="#crater-light" x="256" y="64" height="64" width="64" />
	<use href="#crater-light" x="320" y="320" height="40" width="40" />
	<use href="#crater-dark" x="32" y="160" height="48" width="48" />
	<use href="#crater-dark" x="100" y="384" height="32" width="32" />
</symbol>

<symbol viewBox="0 0 24 24" id="crater-light" fill="#FBFBFB" filter="url(#crater-shadow-light)">
	<circle cx="12" cy="12" r="12" />
</symbol>

<symbol viewBox="0 0 24 24" id="crater-dark" fill="#CCCED7" filter="url(#crater-shadow-dark)">
	<circle cx="12" cy="12" r="12" />
</symbol>

<filter id="moon-shadow">
	<feOffset dx="96" dy="-96" />
	<feGaussianBlur stdDeviation="8" result="offset-blur" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.4" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<filter id="crater-shadow-light">
	<feOffset dx="5" dy="1" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.6" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>

<filter id="crater-shadow-dark">
	<feOffset dx="5" dy="1" />
	<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
	<feFlood flood-color="black" flood-opacity="0.6" result="color" />
	<feComposite operator="in" in="color" in2="inverse" result="shadow" />
	<feComposite operator="over" in="shadow" in2="SourceGraphic" />
</filter>
