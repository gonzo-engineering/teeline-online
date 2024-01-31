<script lang="ts">
	import PageTeaserCard from '$lib/PageTeaserCard.svelte';
	import { syllabusMetadata } from '../../data/syllabus';
</script>

<svelte:head>
	<title>Learn | teeline.online</title>
	<meta
		name="description"
		content="Explore the theory and execution of Teeline shorthand - from core principles to special outlines. Be sure to play around with the Disemvoweler 9000!"
	/>
</svelte:head>

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
			flex-direction: row;
			flex-wrap: wrap;
			column-gap: 1rem;
		}
		.test {
			width: 30%;
		}
	}
</style>
