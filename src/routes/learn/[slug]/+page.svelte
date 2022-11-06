<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} | teeline.online</title>
</svelte:head>

<div class="copy-container">
	<h1>{data.title}</h1>
	<svelte:component this={data.content} />
</div>

<style>
	.copy-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
	}

	@media (min-width: 1025px) {
		.copy-container {
			width: 60%;
		}
	}
</style>
