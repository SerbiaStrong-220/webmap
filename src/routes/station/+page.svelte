<script lang="ts">
	import Button from '$lib/button.svelte';
	import ImageModal from '$lib/image-modal.svelte';
	import { getStationById } from '$lib';
    import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { resolve } from "$app/paths";

	let isModalOpen = $state(false);
	const id = browser ? page.url.searchParams.get('id') : '';
	let station = $derived(getStationById(id ?? ''));
</script>

<style>
.content {
    border-color: var(--border-color);
}
</style>

{#if !station}
	<div class="w-full p-8 flex flex-col gap-4">
		<span class="h1">Станция не найдена.</span>
		<Button text="Назад" className="w-fit" onClick={() => window.history.back()} />
	</div>
{:else}
	<div class="w-full p-8 flex flex-col h-full">
		<div class="panel-secondary content w-full flex-1 h-full px-2.5 -2.5 py-3 flex flex-col gap-2.5 justify-between">
			<div class="min-w-full max-w-full w-fit h-fit flex flex-col gap-2.5">
				<div class="flex flex-row items-center gap-5">
					<span class="h1 text-white!">{station.name}</span>
				</div>
				<Button text="Назад" className="w-fit" onClick={() => window.history.back()} />
			</div>
			<div class="max-w-full min-w-full w-fit h-full flex justify-center items-center bg-[rgba(0,0,0,0.25)] p-2.5">
				<button
					class="h-full w-fit cursor-zoom-in hover:scale-[1.02] active:scale-95 transition-transform duration-200"
					onclick={() => (isModalOpen = true)}
					aria-label="View full screen"
				>
					<img src={resolve(station.image)} alt={station.name} class="h-full w-fit pointer-events-none pixelated" />
				</button>
			</div>
		</div>
	</div>

	{#if isModalOpen}
		<ImageModal src={resolve(station.image)} alt={station.name} onClose={() => (isModalOpen = false)} />
	{/if}
{/if}
