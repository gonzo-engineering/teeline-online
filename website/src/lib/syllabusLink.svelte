<script lang="ts">
	export let sectionKey: string;

	import syllabus from '../data/syllabus.json';

	const thisSection = syllabus.find((section) => section.slug === sectionKey);
	const previousSection =
		thisSection.order === 1
			? null
			: syllabus.find((section) => section.order === thisSection.order - 1);
	const nextSection =
		thisSection.order === syllabus.length
			? null
			: syllabus.find((section) => section.order === thisSection.order + 1);
</script>

<div class="links-container">
	{#if previousSection}
		<div>
			← <a href={`/learn/${previousSection.slug}`}>
				{previousSection.name}
			</a>
		</div>
	{/if}
	{#if previousSection && nextSection}
		<div>|</div>
	{/if}
	{#if nextSection}
		<div>
			<a href={`/learn/${nextSection.slug}`}>
				{nextSection.name}
			</a> →
		</div>
	{/if}
</div>

<style>
	.links-container {
		display: flex;
		margin: 5rem auto;
		width: 100%;
		max-width: 1000px;
		justify-content: center;
		column-gap: 1.5rem;
		font-size: 1rem;
	}
	@media (min-width: 1025px) {
		.links-container {
			font-size: 1.8rem;
		}
	}
</style>
