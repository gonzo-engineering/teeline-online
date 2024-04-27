<script lang="ts">
	import SyllabusLink from '$lib/SyllabusLink.svelte';
	let {
		data
	}: {
		data: {
			title: string;
			description: string;
			slug: string;
			content: any;
		};
	} = $props();
</script>

<svelte:head>
	<title>{data.title} | Learn | teeline.online</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="copy-container">
	<h2>{data.title}</h2>
	<svelte:component this={data.content} />
	{#key data.slug}
		<SyllabusLink sectionKey={data.slug} />
	{/key}
</div>

<style>
	h2 {
		text-align: center;
	}
</style>
