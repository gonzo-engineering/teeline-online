<script lang="ts">
	export let toggleLabel: string;
	export let toggleFunction: () => void;
</script>

<div class="toggle-container">
	<div class="filter-label">{toggleLabel}</div>
	<label class="switch">
		<input type="checkbox" on:click={toggleFunction} />
		<span class="slider round" />
	</label>
</div>

<style>
	.toggle-container {
		margin-bottom: 1rem;
	}
	.filter-label {
		margin-right: 0.5rem;
		display: inline-block;
		font-size: 1.8rem;
		vertical-align: middle;
	}
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
		vertical-align: middle;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: black;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px black;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}

	/* Set responsive styling for desktop */
	@media (min-width: 768px) {
		.toggle-container {
			margin-bottom: 0;
		}
	}
</style>
