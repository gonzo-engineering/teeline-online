<script lang="ts">
	let {
		toggleLabel,
		toggleFunction
	}: {
		toggleLabel: string;
		toggleFunction: () => void;
	} = $props();
</script>

<div class="toggle-container">
	<div class="filter-label">{toggleLabel}</div>
	<label class="switch">
		<input type="checkbox" onclick={toggleFunction} />
		<span class="slider round"></span>
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
		background-color: var(--foreground);
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: var(--card-background);
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--foreground);
	}

	input:checked + .slider {
		box-shadow: 0 0 5px var(--foreground);
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
