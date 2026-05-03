import stationsJson from '$lib/data/stations.json' with { type: 'json' };

export interface Station {
	id: string;
	name: string;
	image: string;
}

export interface StationFilters {
	name: string;
}

const stationData = stationsJson as Station[];

export const defaultStationFilters: StationFilters = {
	name: '',
};

export function getStations(): Station[] {
	return stationData;
}

export function getStationById(id: string): Station | undefined {
	return stationData.find((station) => station.id === id);
}

function includesSearch(haystack: string, needle: string): boolean {
	return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

export function filterStations(stations: Station[], filters: StationFilters): Station[] {
	return stations.filter((station) => {
		if (filters.name && !includesSearch(station.name, filters.name)) {
			return false;
		}

		return true;
	});
}
