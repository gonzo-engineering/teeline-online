<script>
	export let outlineObject;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	width="100%"
	viewBox="0 0 750 750"
>
	<title>Teeline shorthand outline for '{outlineObject.name.toString().replace(/,/g, ' / ')}'</title
	>
	<path
		id="shape0"
		transform="translate(0, 458.461538461538)"
		fill="#D3D3D3"
		fill-rule="evenodd"
		stroke="#D3D3D3"
		stroke-width="5"
		stroke-linecap="square"
		stroke-linejoin="miter"
		stroke-miterlimit="2"
		d="M 80 1 C 279.658 0.6508 522.393 0.3254 650 1"
	/>
	{#each outlineObject.lines as line, i}
		<path
			class={$$props.class}
			transform="translate({line.translateValues})"
			fill="none"
			stroke="#000000"
			stroke-width="10"
			stroke-linecap="round"
			stroke-linejoin="bevel"
			style="animation-delay: {i}s"
			d={line.path}
		/>
	{/each}
</svg>
