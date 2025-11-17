<script lang="ts">
	let {
		sectionName,
		sectionBlurb,
		sectionPath,
		sectionImage,
		sectionImageAlt
	}: {
		sectionName: string;
		sectionBlurb: string;
		sectionPath: string;
		sectionImage?: string;
		sectionImageAlt?: string;
	} = $props();
</script>

<div class="container">
	<a href={sectionPath}>
		<div class="card-contents">
			<h2>{sectionName}</h2>
			{#if sectionImage}
				<img src={sectionImage} alt={sectionImageAlt} />
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
		background: #fff;
		box-shadow: 0px 0px 10px 1px var(--shadow);
		border-radius: 20px;
		padding: 30px;
		font-size: 1.8rem;
		line-height: 1.2;
	}
	:global(.dark) .card-contents {
		background: var(--background);
	}
	.card-contents h2 {
		font-size: 2.6rem;
	}
	img {
		margin: 20px 0;
		aspect-ratio: 4 / 3;
	}
</style>
