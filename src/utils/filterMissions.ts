import type { Destination, MissionCategory, MissionHardware, MissionStatus } from '../data/missions';

export interface MissionFilterState {
  destination: 'All' | Destination;
  category: 'All' | MissionCategory;
  status: 'All' | MissionStatus;
  search: string;
}

export function filterMissions(
  missions: MissionHardware[],
  filters: MissionFilterState
): MissionHardware[] {
  const query = filters.search.trim().toLowerCase();

  return missions.filter((m) => {
    if (filters.destination !== 'All' && m.destination !== filters.destination) {
      return false;
    }
    if (filters.category !== 'All' && m.category !== filters.category) {
      return false;
    }
    if (filters.status !== 'All' && m.status !== filters.status) {
      return false;
    }
    if (query.length > 0) {
      const haystack = [
        m.name,
        m.site,
        m.destination,
        m.category,
        m.legacy,
        m.specs,
        ...m.keyHardware,
        ...m.payload,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Projects planetary latitude/longitude (-90..90, -180..180 or 0..360)
 * onto normalized 0..100 SVG/canvas percentage coordinates.
 */
export function projectCoordinates(lat: number, lon: number): { x: number; y: number } {
  // Normalize longitude into [-180, 180]
  let normalizedLon = lon;
  if (normalizedLon > 180) {
    normalizedLon = normalizedLon - 360;
  }
  const x = ((normalizedLon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return {
    x: Math.max(4, Math.min(96, x)),
    y: Math.max(8, Math.min(92, y)),
  };
}
