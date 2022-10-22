<script>
	import { page } from '$app/stores';
	export let title;
	export let href;
</script>

<a {href} class:active={$page.url.pathname.includes(href)}>{title}</a>

<style>
	a.active {
		text-decoration-style: double;
	}
</style>
