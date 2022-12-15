<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} | Learn | teeline.online</title>
</svelte:head>

<div class="copy-container">
	<h2>{data.title}</h2>
	<svelte:component this={data.content} />
</div>

<style>
	h2 {
		text-align: center;
	}
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
