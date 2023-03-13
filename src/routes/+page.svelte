<script>
	import HomepageSection from '$lib/homepageSection.svelte';
	import WordToOutline from '$lib/wordToOutline.svelte';
	import { outlines } from '../data/outlines/outlines';
</script>

<svelte:head>
	<title>teeline.online</title>
	<meta
		name="description"
		content="A free, interactive learning resource for Teeline shorthand. Study theory, browse outlines, and revise with flash cards to get to 100wpm and beyond."
	/>
</svelte:head>

<div class="copy-container">
	<p>
		Teeline is a form of shorthand that allows people - usually journalists - to write lots of words
		really quickly. It is accepted by the <a href="https://www.nctj.com/"
			>National Council for the Training of Journalists</a
		> and remains a requirement for qualified reporters.
	</p>
	<p>This site is a resource for anyone who wants to learn or practice Teeline shorthand.</p>
</div>
<div class="site-sections-container">
	<HomepageSection
		sectionName="Learn"
		sectionBlurb="Study the basics and core theory of Teeline shorthand"
		sectionPath="/learn"
		sectionImage="/images/section-teaser-learn.webp"
		sectionImageAlt="Ink drawing of a man scratching his head in confusion."
	/>
	<HomepageSection
		sectionName="Outlines"
		sectionBlurb="Browse hundreds of animated Teeline outlines"
		sectionPath="/outlines"
		sectionImage="/images/section-teaser-outlines.webp"
		sectionImageAlt="A grid of cards with Teeline shorthand outlines drawn on them."
	/>

	<HomepageSection
		sectionName="Revise"
		sectionBlurb="Put your knowledge to the test with virtual flashcards"
		sectionPath="/revise"
		sectionImage="/images/section-teaser-revise.webp"
		sectionImageAlt="A Teeline shorthand revision flashcard."
	/>
</div>

<style>
	.copy-container,
	.site-sections-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
	}

	.site-sections-container {
		display: flex;
		flex-wrap: wrap;
		column-gap: 4%;
		row-gap: 30px;
	}

	@media (min-width: 1025px) {
		.copy-container,
		.site-sections-container {
			width: 60%;
		}
	}
</style>
