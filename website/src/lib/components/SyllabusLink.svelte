<script lang="ts">
	import { syllabusMetadata } from '$lib/data/syllabus';

	let { sectionKey }: { sectionKey: string } = $props();

	const thisSection = syllabusMetadata.find((section) => section.slug === sectionKey);
	const previousSection =
		thisSection.order === 1
			? undefined
			: syllabusMetadata.find((section) => section.order === thisSection.order - 1);
	const nextSection =
		thisSection.order === syllabusMetadata.length
			? undefined
			: syllabusMetadata.find((section) => section.order === thisSection.order + 1);
</script>

<div class="links-container">
	{#if previousSection}
		<div class="link">
			← <a href={`/learn/${previousSection.slug}`}>
				{previousSection.title}
			</a>
		</div>
	{/if}
	{#if previousSection && nextSection}
		<div>|</div>
	{/if}
	{#if nextSection}
		<div class="link">
			<a href={`/learn/${nextSection.slug}`}>
				{nextSection.title}
			</a> →
		</div>
	{/if}
</div>

<style>
	.links-container {
		display: flex;
		margin: 3rem auto;
		width: 100%;
		max-width: 1000px;
		justify-content: center;
		column-gap: 1.5rem;
		font-size: 1.4rem;
	}
	.link {
		max-width: 40%;
	}
	@media (min-width: 1025px) {
		.links-container {
			font-size: 1.8rem;
		}
		.link {
			max-width: 100%;
		}
	}
</style>
