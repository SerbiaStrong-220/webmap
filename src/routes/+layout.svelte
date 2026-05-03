<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Header from '$lib/header.svelte';
	import configJson from '$root/config.json' with { type: 'json' };
	import Footer from '../lib/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
	<title>{configJson.name}</title>
</svelte:head>

<div class="w-full flex flex-col h-full min-h-fit flex-1">
    <Header />
    <main class="flex-1 flex flex-col">
        {@render children()}
    </main>
    <Footer />
</div>
