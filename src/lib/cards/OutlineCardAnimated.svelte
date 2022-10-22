<script>
	import OutlineSvg from './OutlineSVG.svelte';
	import { prettify } from '../../scripts/helpers';

	export let outlineObject;
</script>

<div class="outline-container">
	<div class="outline-content">
		<OutlineSvg {outlineObject} class="path" />
		<div class="outline-label">{prettify(outlineObject.name)}</div>
	</div>
</div>

<style>
	.outline-container {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 10px;
		width: 100%;
		padding-bottom: 30px;
	}

	.outline-container:hover :global(.path) {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 2s linear forwards;
	}

	.outline-label {
		text-align: center;
		font-size: 1.9rem;
	}

	.outline-content {
		padding: 20px;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 1100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
