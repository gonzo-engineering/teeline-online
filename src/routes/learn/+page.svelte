<script>
	import HomepageSection from '$lib/homepageSection.svelte';
	import { syllabusDetails } from '../../data/syllabus/syllabus';

	const learnSections = import.meta.glob('../../learn-content/*.svx');

	const sectionsArray = [];

	for (const [key, value] of Object.entries(learnSections)) {
		sectionsArray.push(key.replace('../../learn-content/', '').replace('.svx', ''));
	}
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
		<ul>
			{#each syllabusDetails as section}
				<li>
					<a href="/learn/{section.slug}">
						{section.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
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
