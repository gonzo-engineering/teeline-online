<script>
	export let sectionName;
	export let sectionBlurb;
	export let sectionPath;
	export let sectionImage;
	export let sectionImageAlt;
</script>

<div class="container">
	<a href={sectionPath}>
		<div class="card-contents">
			<h2>{sectionName}</h2>
			<img src={sectionImage} alt={sectionImageAlt} />
			<div>{sectionBlurb}</div>
		</div>
	</a>
</div>

<style>
	a {
		border-radius: 20px;
		text-decoration: none;
		font-weight: normal;
		text-align: center;
	}
	.card-contents {
		box-shadow: 0px 0px 10px 1px #e1e1e1;
		border-radius: 20px;
		padding: 30px;
		font-size: 1.8rem;
	}
	.card-contents h2 {
		font-size: 3rem;
	}
	img {
		margin: 20px 0;
	}

	@media (min-width: 1025px) {
		.container {
			width: 30%;
		}
	}
</style>
