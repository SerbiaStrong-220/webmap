<script lang="ts">
	import Filter from '$lib/filter.svelte';
	import StationView from '$root/src/lib/station-view.svelte';
	import { defaultStationFilters, filterStations, getStations } from '$lib';

	const stations = getStations();
	let filters = $state({
		...defaultStationFilters
	});

	const filteredStations = $derived(filterStations(stations, filters));

	function resetFilters() {
		filters.name = defaultStationFilters.name;
	}
</script>

<!-- TODO: Don't forget about SEO -->
<!-- UPD. I forgot :D -->

<div class="w-full p-8 flex flex-col md:flex-row gap-8 flex-1">
	<Filter
		className="md:sticky md:top-20 w-full md:w-fit"
		{filters}
		onReset={resetFilters}
	/>
	<div class="panel-secondary w-full px-2.5 py-3 flex flex-col gap-[20px] flex-1">
		<span class="text-(--text-primary-2)">Результаты поиска:</span>
		<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
			{#each filteredStations as station (station.id)}
				<StationView {station} />
			{:else}
				<span class="text-(--text-primary-2)">Станции по текущим фильтрам не найдены.</span>
			{/each}
		</div>
	</div>
</div>
