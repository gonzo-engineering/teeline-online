<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { wpms } from '../scripts/speed';
	const wpmOptions = wpms.map((wpm) => wpm.speed);
</script>

<div class="settings">
	<div class="select-wrapper">
		<select bind:value={$user.wpm}>
			{#each wpmOptions as wpmOption}
				<option value={wpmOption}>{wpmOption}</option>
			{/each}
		</select>
	</div>
	words per minute
</div>

<style>
	.settings {
		font-size: var(--regular-font-size);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.select-wrapper {
		border-radius: 36px;
		display: inline-block;
		overflow: hidden;
		background: #cccccc;
		margin: 0 0.5rem;
	}

	select {
		height: 2rem;
		padding: 0 0.5rem;
		font-size: 1rem;
		font-weight: bold;
		border: none;
	}
	select:focus {
		outline: none;
	}
</style>
