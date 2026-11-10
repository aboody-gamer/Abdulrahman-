import { useState } from 'react';
import type { Destination, MissionHardware } from '../data/missions';
import { projectCoordinates } from '../utils/filterMissions';
import type { DestinationTheme } from '../utils/theme';

interface CoordinateMapProps {
  missions: MissionHardware[];
  activeDestination: 'All' | Destination;
  onSelectMission: (mission: MissionHardware) => void;
  theme: DestinationTheme;
}

export function CoordinateMap({
  missions,
  activeDestination,
  onSelectMission,
  theme,
}: CoordinateMapProps) {
  const [hoveredMission, setHoveredMission] = useState<MissionHardware | null>(null);

  const mappedMissions = missions.filter((m) => m.lat !== null && m.lon !== null);
  const deepSpaceMissions = missions.filter((m) => m.destination === 'Deep Space');

  const statusColor = (status: MissionHardware['status']) => {
    if (status === 'Active') return 'bg-cyan-400 ring-cyan-400/30';
    if (status === 'Interstellar Frontier') return 'bg-amber-400 ring-amber-400/30';
    return 'bg-slate-400 ring-slate-400/20';
  };

  return (
    <section
      aria-label="Planetary Coordinate Radar Map"
      className={`rounded-xl p-5 border transition-colors duration-200 ${theme.panelBg} ${theme.border}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 className={`text-base font-semibold ${theme.textPrimary}`}>
            Planetary Landing Coordinate Grid
          </h2>
          <p className={`text-xs mt-0.5 ${theme.textSecondary}`}>
            {activeDestination === 'Deep Space'
              ? 'Interstellar trajectories beyond the planetary coordinate grid'
              : 'Equirectangular projection (90° N to 90° S · 180° W to 180° E) — select any marker to inspect hardware'}
          </p>
        </div>
        <div className={`flex items-center gap-4 text-xs font-mono ${theme.textSecondary}`}>
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full inline-block ${theme.activeDot}`} aria-hidden="true" />
            Active
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full inline-block ${theme.dormantDot}`} aria-hidden="true" />
            Dormant
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" aria-hidden="true" />
            Deep Space
          </span>
        </div>
      </div>

      {activeDestination !== 'Deep Space' ? (
        <div
          data-testid="coordinate-map-grid"
          className={`relative w-full h-64 sm:h-72 rounded-lg overflow-hidden cursor-crosshair select-none border ${theme.mapBg}`}
        >
          {/* Lat/Lon Grid Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Equator & Prime Meridian */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="#1E293B" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#1E293B" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
            {/* Secondary Grid */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#0F172A" strokeWidth="0.3" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#0F172A" strokeWidth="0.3" />
            <line x1="25" y1="0" x2="25" y2="100" stroke="#0F172A" strokeWidth="0.3" />
            <line x1="75" y1="0" x2="75" y2="100" stroke="#0F172A" strokeWidth="0.3" />
          </svg>

          {/* Axis Labels */}
          <span className="absolute top-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
            90° N
          </span>
          <span className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
            90° S
          </span>
          <span className="absolute top-1/2 -translate-y-1/2 right-3 text-[11px] font-mono text-slate-500 pointer-events-none">
            0° EQUATOR
          </span>

          {/* Live Hover Readout */}
          <div className="absolute top-2 right-3 bg-[#0B0F19]/90 border border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 pointer-events-none">
            {hoveredMission
              ? `${hoveredMission.name} · ${hoveredMission.coordLabel}`
              : `${mappedMissions.length} mapped sites`}
          </div>

          {/* Plotted Mission Markers */}
          {mappedMissions.map((mission) => {
            const { x, y } = projectCoordinates(mission.lat!, mission.lon!);
            const isMars = mission.destination === 'Mars';
            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => onSelectMission(mission)}
                onMouseEnter={() => setHoveredMission(mission)}
                onMouseLeave={() => setHoveredMission(null)}
                onFocus={() => setHoveredMission(mission)}
                onBlur={() => setHoveredMission(null)}
                aria-label={`Inspect ${mission.name} at ${mission.coordLabel}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
              >
                <span
                  className={`block w-3 h-3 rounded-full ring-4 transition-transform duration-150 group-hover:scale-125 ${statusColor(
                    mission.status
                  )} ${isMars ? 'border border-amber-300/60' : 'border border-slate-200/50'}`}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Deep Space Trajectory Strip */}
      {deepSpaceMissions.length > 0 && (
        <div className={`${activeDestination !== 'Deep Space' ? 'mt-4 pt-4 border-t border-slate-800/80' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-amber-400">
              INTERSTELLAR &amp; KUIPER BELT TRAJECTORIES
            </span>
            <div className="flex flex-wrap gap-2">
              {deepSpaceMissions.map((probe) => (
                <button
                  key={probe.id}
                  type="button"
                  onClick={() => onSelectMission(probe)}
                  className="px-3 py-1.5 text-xs font-mono bg-[#0B0F19] border border-amber-500/30 hover:border-amber-400 text-amber-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  {probe.name} · {probe.coordLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
