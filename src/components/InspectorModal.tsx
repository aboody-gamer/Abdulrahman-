import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { MissionHardware } from '../data/missions';

interface InspectorModalProps {
  mission: MissionHardware | null;
  onClose: () => void;
}

export function InspectorModal({ mission, onClose }: InspectorModalProps) {
  useEffect(() => {
    if (!mission) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mission, onClose]);

  if (!mission) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0F1623] border border-slate-700 rounded-xl p-6 text-slate-200 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <p className="text-xs font-mono text-cyan-400 mb-1">
              {mission.destination} · {mission.category} · {mission.status}
            </p>
            <h2 id="inspector-modal-title" className="text-2xl font-bold text-slate-100">
              {mission.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {mission.agency}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector modal"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-slate-800 text-sm">
          <div>
            <span className="block text-xs font-mono text-slate-400">TARGET SITE</span>
            <span className="text-slate-100 font-medium">{mission.site}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-slate-400">COORDINATES</span>
            <span className="font-mono text-cyan-300">{mission.coordLabel}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-slate-400">LAUNCHED</span>
            <span className="font-mono text-slate-200">{mission.launched}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-slate-400">LANDED / ARRIVAL</span>
            <span className="font-mono text-slate-200">{mission.landed}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-slate-400">MISSION LIFESPAN</span>
            <span className="font-mono text-slate-200">{mission.lifespan}</span>
          </div>
          <div>
            <span className="block text-xs font-mono text-slate-400">
              {mission.distanceTraveled ? 'DISTANCE TRAVELED' : 'MISSION END'}
            </span>
            <span className="font-mono text-amber-300">
              {mission.distanceTraveled ?? mission.ended}
            </span>
          </div>
        </div>

        <div className="space-y-5 pt-5 text-sm">
          <div>
            <h3 className="text-xs font-mono text-slate-400 mb-1.5">TECHNICAL SPECIFICATIONS</h3>
            <p className="text-slate-200 leading-relaxed">{mission.specs}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h3 className="text-xs font-mono text-slate-400 mb-2">KEY HARDWARE</h3>
              <ul className="space-y-1.5 text-slate-300">
                {mission.keyHardware.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono" aria-hidden="true">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono text-slate-400 mb-2">PAYLOAD INSTRUMENTS</h3>
              <ul className="space-y-1.5 text-slate-300">
                {mission.payload.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono" aria-hidden="true">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#0B0F19] border border-slate-800 rounded-lg p-4">
            <h3 className="text-xs font-mono text-cyan-400 mb-1">SCIENTIFIC LEGACY</h3>
            <p className="text-slate-200 leading-relaxed">{mission.legacy}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
