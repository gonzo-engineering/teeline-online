<script>
	import HeaderLink from './HeaderLink.svelte';
</script>

<header>
	<h1><a href="/">teeline.online</a></h1>
	<div class="tagline">A (short)handy site</div>
	<nav>
		<ul>
			<li><HeaderLink href="/learn" title="Learn" /></li>
			<li><HeaderLink href="/outlines" title="Outlines" /></li>
			<li><HeaderLink href="/revise" title="Revise" /></li>
		</ul>
	</nav>
</header>

<style>
	header {
		margin: 0 0 50px 0;
		width: 100%;
	}

	h1 {
		text-align: center;
		margin: 50px 0 0 0;
	}

	h1 a {
		text-decoration: none;
		font-weight: 400;
	}

	.tagline {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	nav {
		font-size: 2rem;
		font-weight: 700;
	}

	ul {
		display: flex;
		justify-content: center;
	}

	li {
		margin: 0 20px;
		list-style-type: none;
	}
	.active {
		color: red;
	}
</style>
