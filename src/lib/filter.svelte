<script lang="ts">
	import Button from './button.svelte';
	import type { StationFilters } from '$lib';

	interface Props {
		className?: string;
		filters: StationFilters;
		onReset: () => void;
	}

	let {
		className = '',
		filters,
		onReset
	}: Props = $props();
</script>

<style>
	.filter-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.filter-label {
		color: var(--text-primary-2);
		font-size: 16px;
		width: 100%;
	}
</style>

<div class="w-fit h-fit min-w-62.5 panel-primary py-2.5 px-3 flex flex-col gap-2.5 {className}">
	<span class="h1">Поиск:</span>
	<div class="filter-item">
		<span class="filter-label">Название:</span>
		<input type="text" name="name" placeholder="Название станции" bind:value={filters.name} />
	</div>

	<Button text="Сбросить фильтры" onClick={onReset} />
</div>
