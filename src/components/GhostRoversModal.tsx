import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { GHOST_STORY_CHAPTERS } from '../data/missions';

interface GhostRoversModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GhostRoversModal({ isOpen, onClose }: GhostRoversModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const stopAudio = () => {
    try {
      oscRef.current?.stop();
      oscRef.current?.disconnect();
    } catch {
      // Ignore already-stopped oscillator
    }
    oscRef.current = null;
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
    }
    audioCtxRef.current = null;
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopAudio();
    };
  }, [isOpen, onClose]);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      audioCtxRef.current = ctx;
      oscRef.current = osc;
      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  if (!isOpen) return null;

  const chapter = GHOST_STORY_CHAPTERS[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ghost-rovers-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F1623] border border-amber-500/30 rounded-xl p-6 text-slate-200 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <p className="text-xs font-mono text-amber-400 mb-1">
              AUDIO &amp; GRAPHIC NOVEL MODE PREVIEW
            </p>
            <h2 id="ghost-rovers-title" className="text-2xl font-bold text-slate-100">
              Ghost Rovers: Tales from Dormant Landers
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isPlayingAudio ? 'Mute ambient telemetry tone' : 'Play ambient telemetry tone'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#0B0F19] border border-amber-500/40 text-amber-300 hover:bg-amber-950/40 rounded-lg transition-colors"
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {isPlayingAudio ? 'Carrier Tone On' : 'Play Carrier Tone'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Ghost Rovers story preview"
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="flex flex-wrap gap-2 py-4 border-b border-slate-800">
          {GHOST_STORY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                idx === activeIndex
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </div>

        {/* Graphic Novel Panel */}
        <div className="py-6 space-y-4">
          <div className="bg-[#070B14] border border-slate-800 rounded-lg p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-3">
              <span>{chapter.subtitle}</span>
              <span>{chapter.location} · {chapter.year}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">{chapter.title}</h3>
            <div className="space-y-3 text-base text-slate-300 leading-relaxed">
              {chapter.narrative.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <p className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-mono text-amber-400">
              {chapter.telemetryNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
