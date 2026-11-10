import type { MissionHardware } from '../data/missions';
import type { DestinationTheme } from '../utils/theme';

interface MissionCardProps {
  mission: MissionHardware;
  onSelect: (mission: MissionHardware) => void;
  theme: DestinationTheme;
}

export function MissionCard({ mission, onSelect, theme }: MissionCardProps) {
  const statusDisplay = () => {
    if (mission.status === 'Active') {
      return { symbol: '●', text: 'Active', color: theme.accentText };
    }
    if (mission.status === 'Interstellar Frontier') {
      return { symbol: '✦', text: 'Interstellar Frontier', color: 'text-amber-400' };
    }
    return { symbol: '○', text: 'Dormant', color: theme.textSecondary };
  };

  const status = statusDisplay();

  return (
    <article
      className={`rounded-xl p-5 flex flex-col justify-between border transition-colors duration-150 ${theme.panelBg} ${theme.border} ${theme.cardHoverBorder}`}
    >
      <div>
        {/* Unboxed metadata line (Zero-Pill discipline) */}
        <div className={`flex items-center justify-between gap-2 text-xs mb-2 ${theme.textSecondary}`}>
          <div className="flex items-center gap-1.5 truncate">
            <span>{mission.destination}</span>
            <span aria-hidden="true">·</span>
            <span>{mission.category}</span>
          </div>
          <span className={`font-mono whitespace-nowrap shrink-0 ${status.color}`}>
            {status.symbol} {status.text}
          </span>
        </div>

        <h3 className={`text-lg font-semibold leading-snug mb-1.5 ${theme.textPrimary}`}>
          {mission.name}
        </h3>

        <p
          className={`text-xs font-mono mb-3 truncate ${theme.accentText}`}
          title={`${mission.site} (${mission.coordLabel})`}
        >
          {mission.site} · {mission.coordLabel}
        </p>

        <p className={`text-sm leading-relaxed line-clamp-3 mb-4 ${theme.textSecondary}`}>
          {mission.legacy}
        </p>
      </div>

      <div className={`pt-3 border-t flex items-center justify-between gap-3 ${theme.border}`}>
        <span className={`text-xs font-mono truncate ${theme.textSecondary}`}>
          {mission.launched}
        </span>
        <button
          type="button"
          onClick={() => onSelect(mission)}
          aria-label={`Inspect ${mission.name}`}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 ${theme.buttonPrimary}`}
        >
          Inspect Specs
        </button>
      </div>
    </article>
  );
}
