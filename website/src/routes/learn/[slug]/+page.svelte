<script lang="ts">
	import SyllabusLink from '#lib/components/SyllabusLink.svelte';
	import Meta from '#lib/components/layout/Meta.svelte';
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

<Meta
	title="{data.title} | Learn | teeline.online"
	description={data.description}
/>

<div class="copy-container">
	<h2>{data.title}</h2>
	<data.content />
	{#key data.slug}
		<SyllabusLink sectionKey={data.slug} />
	{/key}
</div>

<style>
	h2 {
		text-align: center;
	}
</style>
