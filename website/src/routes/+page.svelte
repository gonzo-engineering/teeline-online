<script lang="ts">
	import PageTeaserCard from '$lib/PageTeaserCard.svelte';
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
	<PageTeaserCard
		sectionName="Learn"
		sectionBlurb="Study the basics and core theory of Teeline shorthand"
		sectionPath="/learn"
		sectionImage="/images/section-teaser-learn.webp"
		sectionImageAlt="Ink drawing of a man scratching his head in confusion."
	/>
	<PageTeaserCard
		sectionName="Dictionary"
		sectionBlurb="Browse hundreds of animated Teeline outlines"
		sectionPath="/outlines"
		sectionImage="/images/section-teaser-outlines.webp"
		sectionImageAlt="A grid of cards with Teeline shorthand outlines drawn on them."
	/>
	<PageTeaserCard
		sectionName="Revise"
		sectionBlurb="Put your knowledge to the test with virtual flashcards"
		sectionPath="/revise"
		sectionImage="/images/section-teaser-revise.webp"
		sectionImageAlt="A Teeline shorthand revision flashcard."
	/>
	<PageTeaserCard
		sectionName="Generator"
		sectionBlurb="Watch words turn into shorthand before your very eyes"
		sectionPath="/generator"
		sectionImage="/images/section-teaser-generator.webp"
		sectionImageAlt="Black and white illustration of an ink pot and quill."
	/>
</div>
<div class="copy-container">
	<p>
		Want to learn more about the project? Visit <a href="/about">the about page</a>.
	</p>
</div>

<style>
	.site-sections-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
		display: flex;
		flex-wrap: wrap;
		row-gap: 30px;
	}

	@media (min-width: 768px) {
		.site-sections-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr 1fr;
			grid-column-gap: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.site-sections-container {
			width: 75%;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: 2rem;
		}
	}
</style>
