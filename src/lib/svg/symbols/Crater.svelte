<symbol viewBox="0 0 24 24" id="crater-light">
	<circle class="light" cx="12" cy="12" r="12" fill="#FBFBFB" />
</symbol>

<symbol viewBox="0 0 24 24" id="crater-dark">
	<circle class="dark" cx="12" cy="12" r="12" fill="#CCCED7" />
</symbol>

<filter id="crater-shadow-light">
	<feOffset dx="-3" dy="3" />
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

<style>
	.light {
		filter: url(#crater-shadow-light);
	}

	.dark {
		filter: url(#crater-shadow-dark);
	}
</style>
