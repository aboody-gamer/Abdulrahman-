import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import {
  MISSIONS,
  type Destination,
  type MissionCategory,
  type MissionHardware,
  type MissionStatus,
} from './data/missions';
import { filterMissions } from './utils/filterMissions';
import { CoordinateMap } from './components/CoordinateMap';
import { MissionCard } from './components/MissionCard';
import { InspectorModal } from './components/InspectorModal';
import { GhostRoversModal } from './components/GhostRoversModal';
import { getDestinationTheme } from './utils/theme';

const DESTINATION_TABS: Array<{ label: string; value: 'All' | Destination }> = [
  { label: 'All Destinations', value: 'All' },
  { label: 'Moon', value: 'Moon' },
  { label: 'Mars', value: 'Mars' },
  { label: 'Deep Space Void', value: 'Deep Space' },
];

export default function App() {
  const [destination, setDestination] = useState<'All' | Destination>('All');
  const [category, setCategory] = useState<'All' | MissionCategory>('All');
  const [status, setStatus] = useState<'All' | MissionStatus>('All');
  const [search, setSearch] = useState('');
  const [selectedMission, setSelectedMission] = useState<MissionHardware | null>(null);
  const [isGhostStoryOpen, setIsGhostStoryOpen] = useState(false);
  const [utcTime, setUtcTime] = useState(() => new Date().toISOString().slice(11, 19));

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredMissions = useMemo(
    () => filterMissions(MISSIONS, { destination, category, status, search }),
    [destination, category, status, search]
  );

  const hasActiveFilters =
    destination !== 'All' || category !== 'All' || status !== 'All' || search.trim().length > 0;

  const theme = getDestinationTheme(destination);

  const resetFilters = () => {
    setDestination('All');
    setCategory('All');
    setStatus('All');
    setSearch('');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme.pageBg}`}>
      {/* Top Header Bar */}
      <header className={`border-b sticky top-0 z-30 backdrop-blur-xs transition-colors duration-300 ${theme.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <h1 className={`text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap ${theme.textPrimary}`}>
              Monuments of Exploration
            </h1>
            <span className={`hidden md:inline-block text-xs font-mono whitespace-nowrap ${theme.accentText}`}>
              UTC {utcTime}
            </span>
          </div>

          <nav aria-label="Planetary Destinations" className="flex flex-wrap items-center gap-1.5">
            {DESTINATION_TABS.map((tab) => {
              const isActive = destination === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setDestination(tab.value)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 ${
                    isActive ? theme.activeTab : theme.inactiveTab
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Story Banner: Audio / Graphic Novel Mode Preview */}
        <section
          aria-label="Ghost Rovers Story Mode"
          className={`rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-colors duration-200 ${theme.panelBg} ${theme.storyBannerBorder}`}
        >
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.storyAccentText}`}>
              AUDIO &amp; GRAPHIC NOVEL MODE PREVIEW
            </p>
            <h2 className={`text-base sm:text-lg font-semibold ${theme.textPrimary}`}>
              Ghost Rovers: Narrative Tales from Dormant Landers
            </h2>
            <p className={`text-sm mt-0.5 ${theme.textSecondary}`}>
              Explore illustrated dispatches from Surveyor 3, Spirit, Opportunity, and InSight.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsGhostStoryOpen(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 ${theme.storyButton}`}
          >
            <BookOpen className="w-4 h-4" />
            Open Story Preview
          </button>
        </section>

        {/* Interactive Coordinate Radar Map */}
        <CoordinateMap
          missions={filteredMissions}
          activeDestination={destination}
          onSelectMission={setSelectedMission}
          theme={theme}
        />

        {/* Search & Filter Toolbar */}
        <section
          aria-label="Search and Filter Hardware"
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
        >
          <div className="relative flex-1 max-w-md">
            <label htmlFor="mission-search" className="sr-only">
              Search missions, hardware, instruments, or locations
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="mission-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search missions, instruments, or sites..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#111827] border border-slate-800 focus:border-cyan-500 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="category-filter" className="text-xs font-mono text-slate-400">
                CATEGORY
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'All' | MissionCategory)}
                className="px-3 py-2 text-xs bg-[#111827] border border-slate-800 rounded-lg text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Rover">Rover</option>
                <option value="Lander">Lander</option>
                <option value="Probe">Probe</option>
                <option value="Vehicle">Vehicle</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="text-xs font-mono text-slate-400">
                STATUS
              </label>
              <select
                id="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'All' | MissionStatus)}
                className="px-3 py-2 text-xs bg-[#111827] border border-slate-800 rounded-lg text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Dormant">Dormant</option>
                <option value="Interstellar Frontier">Interstellar Frontier</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </section>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span data-testid="mission-count">
            SHOWING {filteredMissions.length} OF {MISSIONS.length} OFF-WORLD ARTIFACTS
          </span>
        </div>

        {/* Mission Cards Grid */}
        {filteredMissions.length > 0 ? (
          <section
            aria-label="Off-World Hardware Catalog"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onSelect={setSelectedMission}
                theme={theme}
              />
            ))}
          </section>
        ) : (
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-10 text-center">
            <p className="text-base font-medium text-slate-200">
              No off-world hardware matches your current filters.
            </p>
            <p className="text-sm text-slate-400 mt-1 mb-4">
              Try clearing your search query or selecting a different destination.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/25 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <InspectorModal
        mission={selectedMission}
        onClose={() => setSelectedMission(null)}
      />

      <GhostRoversModal
        isOpen={isGhostStoryOpen}
        onClose={() => setIsGhostStoryOpen(false)}
      />
    </div>
  );
}
