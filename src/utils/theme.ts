import type { Destination } from '../data/missions';

export interface DestinationTheme {
  pageBg: string;
  headerBg: string;
  panelBg: string;
  mapBg: string;
  border: string;
  cardHoverBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentText: string;
  activeTab: string;
  inactiveTab: string;
  buttonPrimary: string;
  storyBannerBorder: string;
  storyAccentText: string;
  storyButton: string;
  activeDot: string;
  dormantDot: string;
}

export function getDestinationTheme(destination: 'All' | Destination): DestinationTheme {
  if (destination === 'Mars') {
    return {
      pageBg: 'bg-[#160C08] mars-atmosphere text-[#F5E6D3]',
      headerBg: 'border-[#4A281A] bg-[#160C08]/95',
      panelBg: 'bg-[#22130D]',
      mapBg: 'bg-[#140A06] border-[#4A281A]',
      border: 'border-[#4A281A]',
      cardHoverBorder: 'hover:border-orange-500/60',
      textPrimary: 'text-[#F5E6D3]',
      textSecondary: 'text-[#D6BFA6]',
      accentText: 'text-orange-400',
      activeTab: 'bg-orange-500/20 text-[#F5E6D3] border border-orange-500/50 focus-visible:ring-orange-400',
      inactiveTab: 'text-[#D6BFA6] hover:text-[#F5E6D3] border border-transparent hover:bg-[#2E1A12] focus-visible:ring-orange-400',
      buttonPrimary: 'text-[#F5E6D3] bg-orange-600/25 hover:bg-orange-600/40 border-orange-500/40 focus-visible:ring-orange-400',
      storyBannerBorder: 'border-orange-500/35',
      storyAccentText: 'text-orange-400',
      storyButton: 'bg-orange-600/20 hover:bg-orange-600/35 text-[#F5E6D3] border-orange-500/45 focus-visible:ring-orange-400',
      activeDot: 'bg-orange-400',
      dormantDot: 'bg-[#C8A98E]',
    };
  }

  if (destination === 'Moon') {
    return {
      pageBg: 'bg-[#0D0F14] text-slate-100',
      headerBg: 'border-[#2E3340] bg-[#0D0F14]/95',
      panelBg: 'bg-[#171A21]',
      mapBg: 'bg-[#090B0F] border-[#2E3340]',
      border: 'border-[#2E3340]',
      cardHoverBorder: 'hover:border-slate-300/60',
      textPrimary: 'text-slate-100',
      textSecondary: 'text-slate-400',
      accentText: 'text-slate-200',
      activeTab: 'bg-slate-200/15 text-slate-100 border border-slate-300/45 focus-visible:ring-slate-300',
      inactiveTab: 'text-slate-400 hover:text-slate-100 border border-transparent hover:bg-[#222631] focus-visible:ring-slate-300',
      buttonPrimary: 'text-slate-100 bg-slate-200/15 hover:bg-slate-200/25 border-slate-300/35 focus-visible:ring-slate-300',
      storyBannerBorder: 'border-slate-400/35',
      storyAccentText: 'text-slate-300',
      storyButton: 'bg-slate-200/15 hover:bg-slate-200/25 text-slate-100 border-slate-300/40 focus-visible:ring-slate-300',
      activeDot: 'bg-slate-200',
      dormantDot: 'bg-slate-500',
    };
  }

  if (destination === 'Deep Space') {
    return {
      pageBg: 'bg-[#0B0614] space-starfield text-purple-100',
      headerBg: 'border-[#322054] bg-[#0B0614]/95',
      panelBg: 'bg-[#150D26]',
      mapBg: 'bg-[#080410] border-[#322054]',
      border: 'border-[#322054]',
      cardHoverBorder: 'hover:border-purple-400/60',
      textPrimary: 'text-purple-50',
      textSecondary: 'text-purple-300/80',
      accentText: 'text-purple-400',
      activeTab: 'bg-purple-500/20 text-purple-100 border border-purple-400/50 focus-visible:ring-purple-400',
      inactiveTab: 'text-purple-300/80 hover:text-purple-100 border border-transparent hover:bg-[#23163D] focus-visible:ring-purple-400',
      buttonPrimary: 'text-purple-100 bg-purple-600/25 hover:bg-purple-600/40 border-purple-400/40 focus-visible:ring-purple-400',
      storyBannerBorder: 'border-purple-500/35',
      storyAccentText: 'text-purple-400',
      storyButton: 'bg-purple-600/20 hover:bg-purple-600/35 text-purple-100 border-purple-400/45 focus-visible:ring-purple-400',
      activeDot: 'bg-purple-400',
      dormantDot: 'bg-purple-300/50',
    };
  }

  // Default: All Destinations (Cosmic Space)
  return {
    pageBg: 'bg-[#04060D] space-starfield text-slate-200',
    headerBg: 'border-[#1E2942] bg-[#04060D]/95',
    panelBg: 'bg-[#0B1021]',
    mapBg: 'bg-[#050814] border-[#1E2942]',
    border: 'border-[#1E2942]',
    cardHoverBorder: 'hover:border-sky-400/50',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accentText: 'text-sky-400',
    activeTab: 'bg-sky-500/15 text-sky-300 border border-sky-500/40 focus-visible:ring-sky-400',
    inactiveTab: 'text-slate-400 hover:text-slate-200 border border-transparent hover:bg-slate-800/60 focus-visible:ring-sky-400',
    buttonPrimary: 'text-sky-300 bg-sky-950/50 hover:bg-sky-900/60 border-sky-500/30 focus-visible:ring-sky-400',
    storyBannerBorder: 'border-amber-500/30',
    storyAccentText: 'text-amber-400',
    storyButton: 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40 focus-visible:ring-amber-400',
    activeDot: 'bg-cyan-400',
    dormantDot: 'bg-slate-400',
  };
}
