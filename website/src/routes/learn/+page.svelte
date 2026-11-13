<script lang="ts">
	import PageTeaserCard from '#lib/components/PageTeaserCard.svelte';
	import { syllabusMetadata } from '#lib/data/syllabus.ts';
	import Meta from '#lib/components/layout/Meta.svelte';
</script>

<Meta
	title="Learn | teeline.online"
	description="Explore the theory and execution of Teeline shorthand - from core principles to special outlines. Be sure to play around with the Disemvoweler 9000!"
/>

<div class="copy-container">
	<div class="learn-menu">
		{#each syllabusMetadata as section}
			<div class="test">
				<PageTeaserCard
					sectionName="{section.order}. {section.title}"
					sectionBlurb={section.description}
					sectionPath="/learn/{section.slug}"
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.learn-menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 1rem;
	}
	@media (min-width: 768px) {
		.learn-menu {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 1rem;
		}
	}
	@media (min-width: 1024px) {
		.learn-menu {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
