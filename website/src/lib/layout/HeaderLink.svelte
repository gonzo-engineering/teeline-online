<script lang="ts">
	import { page } from '$app/stores';
	export let title: string;
	export let href: string;
</script>

<a {href} class:active={$page.url.pathname.includes(href)}>{title}</a>

<style>
	a.active {
		text-decoration-style: double;
	}
</style>
