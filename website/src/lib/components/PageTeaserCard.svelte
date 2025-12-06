<script lang="ts">
	import Book from './images/Book.svelte';
	import InkAndQuill from './images/InkAndQuill.svelte';
	import ConfusedMan from './images/ConfusedMan.svelte';
	import OutlineCardFlipping from './cards/OutlineCardFlipping.svelte';
	import { prettify } from '$lib/scripts/helpers';
	import OutlineSVG from './outlineSVGs/OutlineSVG.svelte';
	import outlines from './../data/outlines.json';

	let {
		sectionName,
		sectionBlurb,
		sectionPath,
		sectionImageKey
	}: {
		sectionName: string;
		sectionBlurb: string;
		sectionPath: string;
		sectionImageKey?: 'book' | 'quill' | 'man' | 'card';
	} = $props();

	const outlinesWithSpecialMeanings = outlines.filter(
		(outline) => outline.specialOutlineMeanings && outline.specialOutlineMeanings.length > 0
	);
	const randomOutline =
		outlinesWithSpecialMeanings[Math.floor(Math.random() * outlinesWithSpecialMeanings.length)];
</script>

<div class="container">
	<a href={sectionPath}>
		<div class="card-contents">
			<h2>{sectionName}</h2>
			{#if sectionImageKey === 'book'}
				<Book />
			{:else if sectionImageKey === 'quill'}
				<InkAndQuill />
			{:else if sectionImageKey === 'man'}
				<ConfusedMan />
			{:else if sectionImageKey === 'card'}
				<div class="card-wrapper">
					<OutlineCardFlipping flipped front={prettify(randomOutline.specialOutlineMeanings)}>
						{#snippet back()}
							<div style="width: 60%">
								<OutlineSVG outlineObject={randomOutline} />
							</div>
						{/snippet}
					</OutlineCardFlipping>
				</div>
			{/if}
			<div>{sectionBlurb}</div>
		</div>
	</a>
</div>

<style>
	.container:hover {
		transform: scale(1.02);
		/* transition: transform 0.2s; */
	}
	h2 {
		margin: 0;
	}
	a {
		border-radius: 20px;
		text-decoration: none;
		font-weight: normal;
		text-align: center;
		width: 100%;
	}
	a:hover {
		opacity: 1;
	}
	.card-contents {
		background: var(--card-background);
		color: var(--card-foreground);
		box-shadow: 0px 0px 10px 1px var(--shadow);
		border-radius: 20px;
		padding: 30px;
		font-size: 1.8rem;
		line-height: 1.2;
	}
	.card-contents h2 {
		font-size: 2.6rem;
	}
	.card-wrapper {
		margin: 5px auto;
		padding: 10px;
	}
</style>
