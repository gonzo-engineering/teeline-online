<script>
	import HomepageSection from '$lib/homepageSection.svelte';

	const learnSections = import.meta.glob('../../learn-content/*.svx');

	const sectionsArray = [];

	for (const [key, value] of Object.entries(learnSections)) {
		sectionsArray.push(key.replace('../../learn-content/', '').replace('.svx', ''));
	}
</script>

<svelte:head>
	<title>Learn | teeline.online</title>
</svelte:head>

<div class="copy-container">
	<div class="learn-menu">
		<ol>
			<li><a href="/learn/introduction">Introduction</a></li>
			<li><a href="/learn/the-alphabet">The alphabet</a></li>
			<li>
				<a href="/learn/letter-positioning-and-hierarchy">Letter positioning and hierarchy</a>
			</li>
			<li><a href="/learn/disemvowelment">Disemvowelment</a></li>
			<li><a href="/learn/silent-and-double-letters">Silent and double letters</a></li>
			<li><a href="/learn/connecting-letters">Connecting letters</a></li>
			<li><a href="/learn/special-outlines">Special outlines</a></li>
			<!-- {#each sectionsArray as sectionSlug}
				<li>
					<a href="/learn/{sectionSlug}">
						{sectionSlug}
					</a>
				</li>
			{/each} -->
		</ol>
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
