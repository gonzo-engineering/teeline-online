<script lang="ts">
	import HeaderLink from './HeaderLink.svelte';
</script>

<header>
	<h1><a href="/">teeline.online</a></h1>
	<div class="tagline">Very (short)handy</div>
	<nav>
		<ul>
			<li><HeaderLink href="/learn" title="Learn" /></li>
			<li><HeaderLink href="/outlines" title="Dictionary" /></li>
			<li><HeaderLink href="/revise" title="Revise" /></li>
			<li><HeaderLink href="/generator" title="Generator" /></li>
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

	ul {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	li {
		font-size: 1.5rem;
		margin: 0;
		list-style-type: none;
		padding-left: 0;
	}
	@media (min-width: 768px) {
		ul {
			gap: 2rem;
		}
		li {
			font-size: 1.8rem;
		}
	}
</style>
