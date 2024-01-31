<script>
	export let sectionName;
	export let sectionBlurb;
	export let sectionPath;
	export let sectionImage = '';
	export let sectionImageAlt = '';
</script>

<div class="container">
	<a href={sectionPath}>
		<div class="card-contents">
			<h2>{sectionName}</h2>
			{#if sectionImage !== ''}
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
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 20px;
		padding: 30px;
		font-size: 1.8rem;
	}
	.card-contents h2 {
		font-size: 2.6rem;
	}
	img {
		margin: 20px 0;
		aspect-ratio: 4 / 3;
	}
</style>
