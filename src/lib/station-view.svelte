<script lang="ts">
	import { type Station } from '$lib';
    import { resolve } from "$app/paths";

	interface Props {
		station: Station;
	}

	let { station }: Props = $props();
</script>

<style>
.station-view {
    background-color: rgba(0, 0, 0, 0.25);
    min-width: 300px;
    width: 100%;
    min-height: 256px; /* for tests */
    border-block: 3px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
	border-color: var(--border-color);
}
.station-view:hover {
    background-color: var(--secondary-dark);
}
</style>

<a class="block station-view" href={resolve(`/station?id=${station.id}`)}>
	<div class="w-full h-fit flex justify-center items-center p-3">
		<img src={resolve(station.image)} alt={station.name} class="w-fit h-[256px] pixelated" />
	</div>
	<div class="flex flex-col p-3 gap-1.5">
		<div class="w-full h-fit flex flex-row justify-between items-center gap-3">
			<span class="h1 text-white!">{station.name}</span>
		</div>
	</div>
</a>
