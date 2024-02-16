<script lang="ts">
	export let data: { title: string; description: string; content: any };
</script>

<svelte:head>
	<title>{data.title} | Learn | teeline.online</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="copy-container">
	<h2>{data.title}</h2>
	<svelte:component this={data.content} />
</div>

<style>
	h2 {
		text-align: center;
	}
</style>
