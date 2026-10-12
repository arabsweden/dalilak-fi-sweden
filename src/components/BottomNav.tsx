import React from 'react';
import { Home, Compass, Bot, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  currentTab: 'home' | 'explore' | 'ask' | 'videos' | 'saved';
  onNavigate: (tab: 'home' | 'explore' | 'ask' | 'videos' | 'saved') => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  savedCount,
}) => {
  const { t } = useLanguage();

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[max(0.35rem,env(safe-area-inset-bottom))] transition-colors"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 px-1 sm:px-2 pt-1 pb-1 text-center select-none touch-manipulation">
        
        {/* Nav 1: Home */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => onNavigate('home')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-200 cursor-pointer group active:scale-95 ${
            currentTab === 'home'
              ? 'text-[#0A2540] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          {/* Active Sweden Yellow Top Bar */}
          {currentTab === 'home' && (
            <span className="absolute -top-1 w-7 sm:w-8 h-1 rounded-full bg-[#FECC00] shadow-[0_1px_4px_rgba(254,204,0,0.6)] animate-in fade-in zoom-in-75 duration-200" />
          )}
          <div
            className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
              currentTab === 'home'
                ? 'bg-[#FECC00] text-[#0A2540] shadow-sm'
                : 'text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate max-w-full">
            {t.nav.home}
          </span>
        </button>

        {/* Nav 2: Explore */}
        <button
          id="nav-tab-explore"
          type="button"
          onClick={() => onNavigate('explore')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-200 cursor-pointer group active:scale-95 ${
            currentTab === 'explore'
              ? 'text-[#0A2540] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          {currentTab === 'explore' && (
            <span className="absolute -top-1 w-7 sm:w-8 h-1 rounded-full bg-[#FECC00] shadow-[0_1px_4px_rgba(254,204,0,0.6)] animate-in fade-in zoom-in-75 duration-200" />
          )}
          <div
            className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
              currentTab === 'explore'
                ? 'bg-[#FECC00] text-[#0A2540] shadow-sm'
                : 'text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate max-w-full">
            {t.nav.explore}
          </span>
        </button>

        {/* Nav 3: Ask AI (Central Highlight) */}
        <button
          id="nav-tab-ask"
          type="button"
          onClick={() => onNavigate('ask')}
          className="relative flex flex-col items-center justify-center -mt-5 transition-all duration-200 group cursor-pointer active:scale-95"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-white shadow-md ${
              currentTab === 'ask'
                ? 'bg-[#0A2540] ring-3 ring-[#FECC00] shadow-[0_4px_12px_rgba(254,204,0,0.45)] scale-105'
                : 'bg-gradient-to-tr from-[#005293] to-blue-600 group-hover:scale-105 ring-2 ring-slate-200/60'
            }`}
          >
            <Bot className="w-6 h-6 text-[#FECC00]" />
          </div>
          <span
            className={`text-[10px] sm:text-[11px] leading-tight mt-1 transition-all ${
              currentTab === 'ask'
                ? 'text-[#0A2540] font-black bg-[#FECC00] px-2 py-0.5 rounded-full shadow-xs'
                : 'text-[#005293] font-extrabold'
            }`}
          >
            {t.nav.ask}
          </span>
        </button>

        {/* Nav 4: Videos */}
        <button
          id="nav-tab-videos"
          type="button"
          onClick={() => onNavigate('videos')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-200 cursor-pointer group active:scale-95 ${
            currentTab === 'videos'
              ? 'text-[#0A2540] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          {currentTab === 'videos' && (
            <span className="absolute -top-1 w-7 sm:w-8 h-1 rounded-full bg-[#FECC00] shadow-[0_1px_4px_rgba(254,204,0,0.6)] animate-in fade-in zoom-in-75 duration-200" />
          )}
          <div
            className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
              currentTab === 'videos'
                ? 'bg-[#FECC00] text-[#0A2540] shadow-sm'
                : 'text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-100'
            }`}
          >
            <span className="text-sm leading-none">🎵</span>
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate max-w-full">
            {t.nav.videos}
          </span>
        </button>

        {/* Nav 5: Saved */}
        <button
          id="nav-tab-saved"
          type="button"
          onClick={() => onNavigate('saved')}
          className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 transition-all duration-200 cursor-pointer group active:scale-95 ${
            currentTab === 'saved'
              ? 'text-[#0A2540] font-black'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          {currentTab === 'saved' && (
            <span className="absolute -top-1 w-7 sm:w-8 h-1 rounded-full bg-[#FECC00] shadow-[0_1px_4px_rgba(254,204,0,0.6)] animate-in fade-in zoom-in-75 duration-200" />
          )}
          <div className="relative">
            <div
              className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${
                currentTab === 'saved'
                  ? 'bg-[#FECC00] text-[#0A2540] shadow-sm'
                  : 'text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-100'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  savedCount > 0 && currentTab === 'saved'
                    ? 'fill-[#0A2540] text-[#0A2540]'
                    : savedCount > 0
                    ? 'fill-red-500 text-red-500'
                    : ''
                }`}
              />
            </div>
            {savedCount > 0 && (
              <span className="absolute -top-1 -end-1 bg-red-500 text-white text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold shadow-xs border border-white">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate max-w-full">
            {t.nav.saved}
          </span>
        </button>

      </div>
    </nav>
  );
};

