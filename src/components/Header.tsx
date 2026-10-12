import React from 'react';
import { Camera, PenLine, MessageSquareQuote, Calculator, Scale, User, Share2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenDocExplainer: () => void;
  onOpenLetterDrafter: () => void;
  onOpenSimulator: () => void;
  onOpenTaxCalc: () => void;
  onOpenAppeal: () => void;
  onOpenCreator: () => void;
  onShareApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDocExplainer,
  onOpenLetterDrafter,
  onOpenSimulator,
  onOpenTaxCalc,
  onOpenAppeal,
  onOpenCreator,
  onShareApp,
}) => {
  const { language, setLanguage, toggleLanguage, isRTL, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#0A2540] text-white border-b border-slate-800 shadow-md">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Identity */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#005293] to-blue-500 border-2 border-[#FECC00] flex items-center justify-center text-lg sm:text-xl shadow-inner font-black select-none shrink-0">
            🇸🇪
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-extrabold text-sm sm:text-base md:text-lg leading-tight tracking-tight text-white truncate">
                {t.appName}
              </h1>
              <span className="bg-[#FECC00]/20 text-[#FECC00] border border-[#FECC00]/40 text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0">
                2026
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1 font-medium truncate">
              <span>Dalelak Sweden</span>
              <span className="text-slate-500">•</span>
              <span className="text-[#FECC00]">@dalelak.sweden</span>
            </p>
          </div>
        </div>

        {/* Quick Action Tools & Language Toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Enhanced Dual-State Language Toggle (Arabic RTL / English LTR) */}
          <div
            id="header-language-toggle"
            role="group"
            aria-label={language === 'ar' ? 'تبديل لغة الواجهة' : 'Switch interface language'}
            className="flex items-center bg-slate-900/90 border border-slate-700/80 p-0.5 rounded-full shadow-inner"
          >
            <button
              id="lang-toggle-arabic"
              type="button"
              onClick={() => setLanguage('ar')}
              aria-pressed={language === 'ar'}
              title="العربية (RTL - واجهة من اليمين لليسار)"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer active:scale-95 ${
                language === 'ar'
                  ? 'bg-[#FECC00] text-[#0A2540] font-black shadow-xs'
                  : 'text-slate-300 hover:text-white font-semibold'
              }`}
            >
              <span className="leading-none">عربي</span>
            </button>

            <button
              id="lang-toggle-english"
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              title="English (LTR - Left to Right layout)"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer active:scale-95 ${
                language === 'en'
                  ? 'bg-[#FECC00] text-[#0A2540] font-black shadow-xs'
                  : 'text-slate-300 hover:text-white font-semibold'
              }`}
            >
              <span className="leading-none">EN</span>
            </button>
          </div>

          <button
            onClick={onOpenDocExplainer}
            title={t.tools.docExplainerTooltip}
            className="flex items-center gap-1.5 text-xs bg-[#FECC00] hover:bg-yellow-400 text-[#0A2540] font-extrabold px-2.5 sm:px-3 py-1.5 rounded-full shadow transition active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.tools.docExplainer}</span>
          </button>

          <button
            onClick={onOpenLetterDrafter}
            title={t.tools.letterDrafterTooltip}
            className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 sm:px-3 py-1.5 rounded-full shadow transition active:scale-95"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.tools.letterDrafter}</span>
          </button>

          <button
            onClick={onOpenSimulator}
            title={t.tools.simulatorTooltip}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold px-2.5 py-1.5 rounded-full shadow transition active:scale-95"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.tools.simulator}</span>
          </button>

          <button
            onClick={onOpenTaxCalc}
            title={t.tools.taxCalcTooltip}
            className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-slate-700 text-emerald-400 flex items-center justify-center transition border border-slate-700 active:scale-95"
          >
            <Calculator className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenAppeal}
            title={t.tools.appealTooltip}
            className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-slate-700 text-rose-400 flex items-center justify-center transition border border-slate-700 active:scale-95"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCreator}
            title={t.tools.creatorTooltip}
            className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-slate-700 text-[#FECC00] flex items-center justify-center transition border border-slate-700 active:scale-95"
          >
            <User className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onShareApp}
            title={t.tools.shareTooltip}
            className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition border border-slate-700 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Official Warning Notice Ribbon */}
      <div className="bg-[#005293]/40 border-t border-b border-blue-400/20 px-3 py-1 text-center text-[11px] text-blue-100 flex items-center justify-center gap-1.5 font-medium">
        <span className="text-[#FECC00]">🛡️</span>
        <span>{t.disclaimerBanner}</span>
      </div>
    </header>
  );
};

