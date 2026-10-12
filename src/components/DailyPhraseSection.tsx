import React, { useState } from 'react';
import { Volume2, Languages, Copy, Check, RotateCw, Lightbulb, MessageSquareQuote } from 'lucide-react';
import { ESSENTIAL_SWEDISH_PHRASES, getDailyPhrase } from '../data/phrases';
import { useLanguage } from '../context/LanguageContext';

interface DailyPhraseSectionProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const DailyPhraseSection: React.FC<DailyPhraseSectionProps> = ({ onSelectCategory }) => {
  const { language, isRTL } = useLanguage();
  
  // Meaning toggle: 'ar' for Arabic meaning, 'sv' for Swedish meaning
  const [meaningLang, setMeaningLang] = useState<'ar' | 'sv'>('ar');
  const [phraseOffset, setPhraseOffset] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentPhrase = getDailyPhrase(phraseOffset);

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.85; // Slightly slower for newcomer learning
      
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyPhrase = () => {
    const textToCopy = `${currentPhrase.swedish}\n` +
      `النطق: ${currentPhrase.pronunciationAr}\n` +
      `المعنى: ${currentPhrase.arabicMeaning.meaning}\n` +
      `Betydelse: ${currentPhrase.swedishMeaning.meaning}`;
      
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleMeaningLanguage = () => {
    setMeaningLang((prev) => (prev === 'ar' ? 'sv' : 'ar'));
  };

  const handleNextPhrase = () => {
    setPhraseOffset((prev) => prev + 1);
  };

  const situationLabel = language === 'ar'
    ? currentPhrase.situationAr
    : (language === 'en' ? currentPhrase.situationEn : currentPhrase.situationSv);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center text-lg font-black shadow-xs">
            <MessageSquareQuote className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                {language === 'ar' ? 'عبارة اليوم للمقيم الجديد' : 'Daily Newcomer Phrase'}
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                🇸🇪 Svenska fraser
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0A2540] mt-0.5">
              {language === 'ar' ? 'عبارة اليوم السويدية الأساسية' : 'Essential Swedish Daily Phrase'}
            </h3>
          </div>
        </div>

        {/* Action Controls: Audio + Copy + Next */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleSpeech(currentPhrase.swedish)}
            title={language === 'ar' ? 'استمع للنطق السويدي' : 'Listen to Swedish pronunciation'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition active:scale-95 ${
              isPlayingAudio
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-[#005293] text-slate-600 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyPhrase}
            title={language === 'ar' ? 'نسخ العبارة ومعانيها' : 'Copy phrase and translations'}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition flex items-center justify-center active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNextPhrase}
            title={language === 'ar' ? 'عبارة أخرى' : 'Next phrase'}
            className="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">{language === 'ar' ? 'عبارة أخرى' : 'Next'}</span>
          </button>
        </div>
      </div>

      {/* Main Phrase Card Display */}
      <div className="mt-4 bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
        
        {/* Situation / Context Tag */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005293] bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005293]" />
            {situationLabel}
          </span>
          
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'ar' ? 'نطق تعليمي واضح' : 'Clear newcomer pronunciation'}
          </span>
        </div>

        {/* The Swedish Phrase */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="text-lg sm:text-2xl font-black text-[#0A2540] tracking-tight leading-snug">
              {currentPhrase.swedish}
            </h4>
          </div>

          {/* Phonetic Pronunciation in Arabic */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/60 w-fit shadow-2xs">
            <span className="text-[11px] font-bold text-amber-700 uppercase">
              {language === 'ar' ? 'النطق التقريبي:' : 'Pronunciation:'}
            </span>
            <span className="font-semibold text-slate-800 tracking-wide">
              {currentPhrase.pronunciationAr}
            </span>
          </div>
        </div>

        {/* Meaning Switcher Toggle Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/70">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Languages className="w-4 h-4 text-[#005293]" />
              <span>{language === 'ar' ? 'معنى وتفسير العبارة:' : 'Phrase Meaning & Explanation:'}</span>
            </div>

            {/* Toggle Button for Swedish / Arabic Meanings */}
            <div className="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300/60 shadow-inner">
              <button
                type="button"
                onClick={() => setMeaningLang('ar')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  meaningLang === 'ar'
                    ? 'bg-white text-emerald-800 shadow-xs scale-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇦🇪</span>
                <span>{language === 'ar' ? 'المعنى بالعربية' : 'Arabic Meaning'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => setMeaningLang('sv')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  meaningLang === 'sv'
                    ? 'bg-[#005293] text-white shadow-xs scale-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇸🇪</span>
                <span>{language === 'ar' ? 'المعنى بالسويدية' : 'Swedish Meaning'}</span>
              </button>
            </div>
          </div>

          {/* Active Meaning Display Container */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-xs transition-all">
            {meaningLang === 'ar' ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ع
                  </span>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {currentPhrase.arabicMeaning.meaning}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {currentPhrase.arabicMeaning.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/40">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold">{language === 'ar' ? 'نصيحة الاستخدام: ' : 'Practical Tip: '}</span>
                    {currentPhrase.arabicMeaning.usageTip}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2" dir="ltr">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-[#005293] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    Sv
                  </span>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {currentPhrase.swedishMeaning.meaning}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {currentPhrase.swedishMeaning.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-blue-900 bg-blue-50/70 p-2.5 rounded-lg border border-blue-200/40">
                  <Lightbulb className="w-4 h-4 text-[#005293] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-bold">Praktiskt råd: </span>
                    {currentPhrase.swedishMeaning.usageTip}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Toggle Helper Link */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2 text-xs">
            <button
              onClick={toggleMeaningLanguage}
              className="text-[#005293] hover:text-blue-900 font-bold flex items-center gap-1.5 transition"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>
                {meaningLang === 'ar'
                  ? (language === 'ar' ? 'اضغط للتبديل إلى شرح المعنى بالسويدية (Förklaring på svenska) 🇸🇪' : 'Switch to Swedish Explanation (Förklaring på svenska) 🇸🇪')
                  : (language === 'ar' ? 'اضغط للتبديل إلى شرح المعنى باللغة العربية 🇦🇪' : 'Switch to Arabic Meaning 🇦🇪')}
              </span>
            </button>

            {onSelectCategory && (
              <button
                onClick={() => onSelectCategory('language')}
                className="text-slate-500 hover:text-slate-800 font-medium transition"
              >
                {language === 'ar' ? 'قسم اللغة السويدية والقاموس الكامل ←' : 'Swedish Language & Full Dictionary →'}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
