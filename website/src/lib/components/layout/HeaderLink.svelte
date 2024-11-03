<script lang="ts">
	import { page } from '$app/stores';

	let {
		title,
		href
	}: {
		title: string;
		href: string;
	} = $props();
</script>

<a {href} class:active={$page.url.pathname.includes(href)}>{title}</a>

<style>
	a.active {
		text-decoration-style: double;
	}
</style>
