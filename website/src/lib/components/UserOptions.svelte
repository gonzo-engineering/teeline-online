<script lang="ts">
	import {
		fontFamilies,
		setFontFamily,
		toggleTheme,
		user
	} from '$lib/global-state/global-state.svelte';
	import { wpms } from '$lib/scripts/speed';
	const wpmOptions = wpms.map((wpm) => wpm.speed);
</script>

<div class="settings">
	<div class="select-wrapper">
		<select bind:value={user.wpm} id="speed-select" name="speed">
			{#each wpmOptions as wpmOption}
				<option value={wpmOption}>{wpmOption}</option>
			{/each}
		</select>
		<label for="speed-select">words per minute</label>
	</div>

	<div class="select-wrapper">
		<select
			bind:value={user.fontFamily}
			onchange={(e) => setFontFamily(e.currentTarget.value)}
			id="font-select"
			name="font-family"
		>
			{#each fontFamilies as fontOption}
				<option value={fontOption}>{fontOption}</option>
			{/each}
		</select>
		<label for="font-select">change font</label>
	</div>

	<div class="select-wrapper">
		<button onclick={() => toggleTheme()}> toggle theme </button>
		{user.theme}
	</div>
</div>

<style>
	.settings {
		font-size: var(--regular-font-size);
		text-align: center;
		display: flex;

		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 2px;
	}

	@media (min-width: 768px) {
		.settings {
			flex-direction: column;
		}
	}

	.select-wrapper {
		display: inline-block;
		overflow: hidden;
		margin: 0 0.5rem;
	}

	select {
		height: 2rem;
		padding: 0 0.5rem;
		font-size: 1.2rem;
		font-weight: bold;
		border: none;
		border-radius: 36px;
	}
	select:focus {
		outline: none;
	}

	button {
		font-size: 1.2rem;
		font-weight: 700;
		border-radius: 20px;
		padding: 4px 8px;
		border: 1px solid var(--background);
	}
</style>
