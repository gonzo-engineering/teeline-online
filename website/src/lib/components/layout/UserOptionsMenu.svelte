<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import {
		fontFamilies,
		setFontFamily,
		toggleTheme,
		user
	} from '#lib/global-state/global-state.svelte.ts';
	import { wpms } from '#lib/scripts/speed.ts';

	const wpmOptions = wpms.map((wpm) => wpm.speed);

	let open = $state(false);
	let container: HTMLElement;
	let toggleButton: HTMLButtonElement;

	// Close the menu when moving to another page
	afterNavigate(() => (open = false));

	const handleWindowClick = (event: MouseEvent) => {
		if (open && !container.contains(event.target as Node)) open = false;
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (open && event.key === 'Escape') {
			open = false;
			toggleButton.focus();
		}
	};
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div class="user-options" class:open bind:this={container}>
	<button
		class="toggle"
		type="button"
		aria-label="Settings"
		aria-expanded={open}
		aria-controls="user-options-panel"
		onclick={() => (open = !open)}
		bind:this={toggleButton}
	>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
			<!-- Teeth: a thick dashed ring; pathLength makes exactly 8 even teeth -->
			<circle cx="12" cy="12" r="8.5" stroke-width="3" pathLength="16" stroke-dasharray="1 1" />
			<circle cx="12" cy="12" r="5.5" stroke-width="3" />
		</svg>
	</button>

	<div class="panel" id="user-options-panel">
		<div class="setting">
			<select bind:value={user.wpm} id="speed-select" name="speed">
				{#each wpmOptions as wpmOption}
					<option value={wpmOption}>{wpmOption}</option>
				{/each}
			</select>
			<label for="speed-select">words per minute</label>
		</div>

		<div class="setting">
			<select
				value={user.fontFamily}
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

		<div class="setting">
			<button type="button" onclick={toggleTheme} aria-label="Toggle theme, currently {user.theme}">
				toggle theme
			</button>
			<span aria-hidden="true">{user.theme}</span>
		</div>
	</div>
</div>

<style>
	/* Mobile: floating cog, panel opens above it */
	.user-options {
		position: fixed;
		right: 1rem;
		bottom: calc(1rem + env(safe-area-inset-bottom));
		z-index: 10;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
		gap: 0.5rem;
		line-height: 1;
	}
	.toggle {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		background-color: var(--card-background);
		color: var(--card-foreground);
		box-shadow: 0px 0px 10px 1px var(--shadow);
		cursor: pointer;
	}
	.toggle svg {
		width: 1.6rem;
		height: 1.6rem;
		transition: transform 0.2s ease;
	}
	.open .toggle svg {
		transform: rotate(45deg);
	}
	.panel {
		display: none;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background-color: var(--card-background);
		color: var(--card-foreground);
		box-shadow: 0 0 10px var(--shadow);
		font-size: var(--regular-font-size);
	}
	.open .panel {
		display: flex;
	}

	select {
		height: 2rem;
		padding: 0 0.5rem;
		font-size: 1.2rem;
		font-weight: bold;
		border: none;
		border-radius: 36px;
	}
	.panel button {
		font-size: 1.2rem;
		font-weight: 700;
		border-radius: 20px;
		padding: 4px 8px;
		border: 1px solid var(--background);
	}
	select:focus-visible,
	button:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	@media (min-width: 768px) {
	.user-options {
		top: 1rem;
		bottom: auto;
		flex-direction: column;
	    }
    }

	@media (prefers-reduced-motion: reduce) {
		.toggle svg {
			transition: none;
		}
	}
</style>