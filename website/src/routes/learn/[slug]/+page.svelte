<script>
	export let data;
	import SyllabusLink from '$lib/syllabusLink.svelte';
	import { syllabusMetadata } from '../../../data/syllabus';
</script>

<svelte:head>
	<title>{data.title} | Learn | teeline.online</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="copy-container">
	<h2>{data.title}</h2>
	<svelte:component this={data.content} />
	<SyllabusLink sectionKey={data.slug} {syllabusMetadata} />
</div>

<style>
	h2 {
		text-align: center;
	}
</style>
