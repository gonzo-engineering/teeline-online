<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { wpms } from '../../scripts/speed';
	import HeaderLink from './HeaderLink.svelte';

	const setWpm = (wpm: number) => {
		user.set({ wpm });
	};

	const wpmOptions = wpms.map((wpm) => wpm.speed);
</script>

<header>
	<div>
		Animation speed: <select bind:value={$user.wpm}>
			{#each wpmOptions as wpmOption}
				<option value={wpmOption}>{wpmOption}</option>
			{/each}
		</select> words per minute
	</div>
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

	select {
		height: 2rem;
		font-size: 1rem;
		border: none;
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
