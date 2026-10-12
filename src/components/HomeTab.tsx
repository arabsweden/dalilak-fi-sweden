import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Volume2, ListChecks, Sparkles, ArrowLeft, ArrowRight, X, MessageSquareQuote, Calculator, Scale, PhoneCall, Languages, Library, Bus, Mic, MicOff } from 'lucide-react';
import { MAIN_CATEGORIES, GUIDES_DATABASE, getLocalizedGuide, getLocalizedCategory } from '../data/guides';
import { SWEDISH_DICTIONARY, getLocalizedDictionaryItem } from '../data/dictionary';
import { Guide } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { QuickActionsModal, QuickActionType } from './modals/QuickActionsModal';
import { CategoryProgressRing } from './CategoryProgressRing';
import { FastPathwaysNavigator } from './FastPathwaysNavigator';
import { DailyPhraseSection } from './DailyPhraseSection';

interface HomeTabProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenGuideModal: (guide: Guide) => void;
  onOpenChecklist: () => void;
  onOpenSimulator: () => void;
  onOpenTaxCalc: () => void;
  onOpenAppeal: () => void;
  onOpenCvModal?: () => void;
  onOpenDocExplainer?: () => void;
  onOpenLetterDrafter?: () => void;
  completedChecklistCount: number;
  totalChecklistCount: number;
  readGuideIds?: Set<string>;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectCategory,
  onOpenGuideModal,
  onOpenChecklist,
  onOpenSimulator,
  onOpenTaxCalc,
  onOpenAppeal,
  onOpenCvModal,
  onOpenDocExplainer,
  onOpenLetterDrafter,
  completedChecklistCount,
  totalChecklistCount,
  readGuideIds,
}) => {
  const { language, isRTL, t } = useLanguage();
  const effectiveReadGuideIds = readGuideIds ?? new Set(['family-reunification', 'skatteverket-personnummer']);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Guide[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState<QuickActionType | null>(null);

  // Word of the day
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = SWEDISH_DICTIONARY[wordIndex % SWEDISH_DICTIONARY.length];
  const localizedWord = getLocalizedDictionaryItem(currentWord, language);

  // "What to do today" tool state
  const [todayCity, setTodayCity] = useState('stockholm');
  const [todayMood, setTodayMood] = useState('walk');
  const [todayNotes, setTodayNotes] = useState('');
  const [todayPlanResult, setTodayPlanResult] = useState<{
    city: string;
    tag: string;
    title: string;
    desc: string;
    tip: string;
  } | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Web Speech API Dictation state
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const handleToggleListening = () => {
    // If actively listening, toggle off
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    setSpeechError(null);

    // Access Web Speech API SpeechRecognition with webkit fallback
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errMsg =
        language === 'ar'
          ? 'متصفحك لا يدعم التعرف الصوتي المباشر (Web Speech API). نوصي باستخدام Chrome أو Safari أو Edge.'
          : 'Your browser does not support Web Speech Recognition. Please try Google Chrome, Safari, or Edge.';
      setSpeechError(errMsg);
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      // Use Arabic recognition when language is 'ar', otherwise English
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setSearchQuery(transcript);
          handleSearchChange(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError(
            language === 'ar'
              ? 'يرجى تفعيل صلاحية الميكروفون في المتصفح للبدء في الإملاء الصوتي.'
              : 'Please allow microphone access in your browser settings to dictate.'
          );
        } else if (event.error === 'no-speech') {
          setSpeechError(
            language === 'ar'
              ? 'لم يتم سماع أي صوت، اضغط على الميكروفون وتحدث مجدداً.'
              : 'No speech was detected. Tap the microphone and try speaking again.'
          );
        } else {
          setSpeechError(
            language === 'ar'
              ? `خطأ في التقاط الصوت (${event.error})`
              : `Speech recognition error (${event.error})`
          );
        }
        setTimeout(() => setSpeechError(null), 4500);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setSpeechError(
        language === 'ar'
          ? 'تعذر تشغيل الميكروفون. تأكد من إعطاء الصلاحية للمتصفح.'
          : 'Could not activate microphone. Check browser permissions.'
      );
      setTimeout(() => setSpeechError(null), 4500);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Search logic
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const trimmed = query.trim().toLowerCase();

    if (!trimmed || trimmed.length < 2) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const dialectSynonyms: Record<string, string> = {
      'مرتي': 'لم الشمل الزوجة',
      'زوجتي': 'لم الشمل',
      'عيلتي': 'العائلة الاطفال لم الشمل',
      'بدي اجيب': 'لم الشمل الانتقال',
      'رقم شخصي': 'personnummer skatteverket الرقم الشخصي',
      'شخصي': 'personnummer skatteverket',
      'نفوس': 'folkbokföring skatteverket',
      'تامين': 'försäkringskassan التأمينات',
      'اطفال': 'barnbidrag المدارس الحضانة',
      'شغل': 'عمل وظائف cv arbetsförmedlingen',
      'سكن': 'housing شقق ايجار فورست هاند',
      'لجوء': 'asylum حماية مقابلة',
      'ستوكهولم': 'stockholm سياحة جولة رائد',
      'وين اروح': 'سياحة ستوكهولم مطاعم مقاهي',
      'spouse': 'family reunification residence permit',
      'wife': 'family reunification',
      'job': 'work career cv arbetsformedlingen',
      'tax': 'skatteverket taxes personnummer',
      'house': 'housing apartment rent rental',
      'apartment': 'housing bostad first-hand',
      'asylum': 'protection migrationsverket interview',
      'tour': 'stockholm sightseeing fika'
    };

    const matches = GUIDES_DATABASE.filter((guide) => {
      const localized = getLocalizedGuide(guide, language);
      const hay = `${guide.title} ${guide.titleEn || ''} ${guide.summary} ${guide.summaryEn || ''} ${guide.whatIs} ${guide.tag} ${guide.tagEn || ''} ${guide.authority} ${guide.authorityEn || ''}`.toLowerCase();
      if (hay.includes(trimmed)) return true;

      for (const [key, mapping] of Object.entries(dialectSynonyms)) {
        if (trimmed.includes(key)) {
          const mappedWords = mapping.split(' ');
          if (mappedWords.some((w) => hay.includes(w))) return true;
        }
      }
      return false;
    });

    setSearchResults(matches.map((g) => getLocalizedGuide(g, language)));
    setIsSearchOpen(true);
  };

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGenerateClassicPlan = () => {
    const plansAr: Record<string, any> = {
      'stockholm-walk': {
        title: 'جولة مشي تاريخية في أزقة Gamla Stan وجزيرة Skeppsholmen',
        desc: 'ابدأ من محطة Gamla Stan، تجول بين المنازل الملونة في ساحة Stortorget، ثم اعبر الجسر الصغير إلى جزيرة Skeppsholmen للحصول على إطلالة لا تعوض على القصر الملكي والواجهة البحرية.',
        tag: 'تاريخ ومشي مجاني',
        tip: 'نصيحة رائد: التقط صوراً عند مدخل زقاق Mårten Trotzigs gränd الأضيق في ستوكهولم.'
      },
      'stockholm-coffee': {
        title: 'تجربة فيكا سويدية عريقة (Fika) في مقاهي Södermalm',
        desc: 'توجه إلى حي Södermalm الإبداعي، تذوق كعكة الهيل السويدية الشهيرة (Kardemummabulle) مع فنجان قهوة محلي، ثم تمتع بإطلالة بانورامية من تلة Monteliusvägen.',
        tag: 'كافيهات وإطلالة',
        tip: 'نصيحة رائد: التوقيت المثالي هو الساعة 3 عصراً للعيش وسط طقوس الفيكا الحقيقية.'
      },
      'stockholm-family': {
        title: 'يوم عائلي في جزيرة الحدائق Djurgården ومتحف Skansen',
        desc: 'اركبو القارب من Slussen إلى Djurgården، تجولوا في الهواء الطلق في Skansen لمشاهدة الحيوانات الإسكندنافية والبيوت التاريخية وتناول وجبة عائلية خفيفة.',
        tag: 'أطفال وعائلة',
        tip: 'نصيحة رائد: الدخول مجاني للأطفال الصغار، ويمكنكم ركوب الترام التاريخي رقم 7.'
      },
      'goteborg-walk': {
        title: 'جولة حي Haga الخشبي الشهير وأضخم سينامون بولار',
        desc: 'تمشَّ في الشوارع المرصوفة بالحصى المحاطة بالبيوت الخشبية من القرن التاسع عشر في Haga، وجرب كعكة القرفة العملاقة في Café Husaren ثم اصعد إلى قلعة Skansen Kronan.',
        tag: 'تاريخ وأجواء ممتعة',
        tip: 'نصيحة رائد: المنظر من قلعة Skansen Kronan وقت الغروب يطل على كامل مدينة يوتبوري.'
      },
      'malmo-photo': {
        title: 'إطلالة برج Turning Torso وشاطئ Ribersborg',
        desc: 'التقط صوراً معمارية مذهلة للبرج اللولبي الأول في العالم، ثم تمشى على رصيف Ribersborg الخشبي الممتد داخل البحر وإطلالة جسر كوبنهاغن.',
        tag: 'تصوير وبحر',
        tip: 'نصيحة رائد: المياه هادئة جداً والهواء منعش، جهز كاميرتك لغروب الشمس.'
      }
    };

    const plansEn: Record<string, any> = {
      'stockholm-walk': {
        title: 'Historic Walking Tour of Gamla Stan and Skeppsholmen Island',
        desc: 'Start at Gamla Stan metro station, explore the colorful merchant houses in Stortorget, and stroll across the bridge to Skeppsholmen for panoramic views of the Royal Palace and the waterfront.',
        tag: 'History & Free Walk',
        tip: "Raed's Tip: Snap photos at the entrance of Mårten Trotzigs gränd, Stockholm's narrowest alley."
      },
      'stockholm-coffee': {
        title: 'Authentic Swedish Fika Experience in Södermalm',
        desc: 'Head to the vibrant Södermalm district, savor a freshly baked cardamom bun (Kardemummabulle) with local brew coffee, and walk up to Monteliusvägen cliff path for a breathtaking vista over the city.',
        tag: 'Cafes & Views',
        tip: 'Raed\'s Tip: 3 PM is the quintessential Swedish Fika hour to experience local cafe life.'
      },
      'stockholm-family': {
        title: 'Family Day at Royal Djurgården & Skansen Open-Air Museum',
        desc: 'Take the ferry from Slussen to green Djurgården, walk through Skansen to see Nordic wildlife and historic farmsteads, and grab a family picnic by the bay.',
        tag: 'Kids & Family',
        tip: 'Raed\'s Tip: Hop on the vintage tram #7 from central T-Centralen straight to the island.'
      },
      'goteborg-walk': {
        title: 'Historic Wooden Quarter Haga & Giant Cinnamon Buns',
        desc: 'Walk along the 19th-century cobbled streets of Haga, taste the famous giant cinnamon bun at Café Husaren, and hike up to fortress Skansen Kronan.',
        tag: 'History & Atmosphere',
        tip: 'Raed\'s Tip: Skansen Kronan viewpoint at sunset provides an unbeatable 360-degree skyline of Gothenburg.'
      },
      'malmo-photo': {
        title: 'Iconic Turning Torso Architecture & Ribersborg Beach',
        desc: 'Photograph Scandinavia’s tallest skyscraper in Western Harbour, then stroll along the wooden piers of Ribersborgs kallbadhus with views towards the Öresund bridge.',
        tag: 'Photography & Sea',
        tip: 'Raed\'s Tip: Clear evenings offer stunning sunset views across the water to Copenhagen.'
      }
    };

    const plans = language === 'ar' ? plansAr : plansEn;
    const key = `${todayCity}-${todayMood}`;
    const defaultPlan = plans[key] || (language === 'ar' ? {
      title: 'جولة استكشافية مميزة في المدينة',
      desc: 'اكتشف مراكز المدينة، الحدائق المفتوحة، والمتاحف المجانية المتاحة اليوم، وتذوق فنجان قهوة مع كعك القرفة في ساحة المدينة الرئيسية.',
      tag: 'نشاط مقترح',
      tip: 'نصيحة رائد: استخدم بطاقة النقل اليومية لتوفير تكاليف المواصلات.'
    } : {
      title: 'Scenic City Discovery Walk',
      desc: 'Explore the pedestrian center, open parks, and free municipal attractions today, finishing with a warm cup of coffee and kanelbulle in the main square.',
      tag: 'Suggested Activity',
      tip: "Raed's Tip: Grab a 24-hour public transport pass to explore multiple neighborhoods easily."
    });

    const cityNamesAr: Record<string, string> = {
      stockholm: 'ستوكهولم العاصمة',
      goteborg: 'يوتبوري (Göteborg)',
      malmo: 'مالمو (Malmö)',
      uppsala: 'أوبسالا (Uppsala)',
      nature: 'الطبيعة والبحيرات السويدية'
    };

    const cityNamesEn: Record<string, string> = {
      stockholm: 'Stockholm (Capital)',
      goteborg: 'Gothenburg (Göteborg)',
      malmo: 'Malmö',
      uppsala: 'Uppsala',
      nature: 'Swedish Nature & Lakes'
    };

    const cityNames = language === 'ar' ? cityNamesAr : cityNamesEn;

    setTodayPlanResult({
      city: cityNames[todayCity] || todayCity,
      tag: defaultPlan.tag,
      title: defaultPlan.title,
      desc: defaultPlan.desc,
      tip: defaultPlan.tip
    });
  };

  const handleGenerateAIPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: todayCity,
          mood: todayMood,
          notes: todayNotes + (language === 'en' ? ' (Please provide the response in English)' : '')
        })
      });
      const data = await res.json();
      if (data.plan) {
        setTodayPlanResult({
          city: todayCity.toUpperCase(),
          tag: language === 'ar' ? 'خطة حصرية بـ Gemini AI ✨' : 'Custom Plan by Gemini AI ✨',
          title: language === 'ar' ? 'برنامجك المخصص في السويد مع رائد شهاب' : 'Your Tailored Sweden Itinerary with Raed Shehab',
          desc: data.plan,
          tip: language === 'ar' ? '💡 استمتع بيومك ولا تنسَ التقاط أجمل الصور!' : '💡 Enjoy your day and do not forget to capture memorable moments!'
        });
      } else {
        handleGenerateClassicPlan();
      }
    } catch (e) {
      handleGenerateClassicPlan();
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Hero Greeting & Smart Search Box */}
      <div className="bg-gradient-to-br from-[#0A2540] via-[#005293] to-blue-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#FECC00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#FECC00] border border-white/10">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '14s' }} />
            <span>{t.home.heroSubtitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            {language === 'ar' ? (
              <>أهلاً بك في <span className="text-[#FECC00] underline decoration-[#FECC00]/50 underline-offset-4">دليلك في السويد</span> 🇸🇪</>
            ) : (
              <>Welcome to <span className="text-[#FECC00] underline decoration-[#FECC00]/50 underline-offset-4">Dalelak Sweden</span> 🇸🇪</>
            )}
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
            {language === 'ar' ? (
              <>امتدادك التفاعلي لحساب <strong className="text-white">@dalelak.sweden</strong> لمساعدتك في فهم الهجرة، الإقامة، الدوائر الحكومية، السكن، العمل، والسياحة بستوكهولم وباقي مدن السويد.</>
            ) : (
              <>Your interactive companion to <strong className="text-white">@dalelak.sweden</strong> by Raed Shehab. Clarifying immigration, residency, Skatteverket, housing, jobs, and Stockholm tours.</>
            )}
          </p>

          {/* Smart Search Input with Microphone Voice Dictation */}
          <div className="pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={
                  isListening
                    ? (language === 'ar' ? 'جاري الاستماع لصوتك... اذكر سؤالك عن السويد الآن' : 'Listening... Speak your question about Sweden now')
                    : t.home.searchPlaceholder
                }
                className={`w-full bg-white text-slate-900 ps-11 pe-36 sm:pe-40 py-3.5 rounded-2xl text-xs sm:text-sm font-medium placeholder-slate-400 shadow-lg border-2 transition ${
                  isListening
                    ? 'border-rose-500 ring-4 ring-rose-500/20'
                    : 'border-transparent focus:border-[#FECC00] focus:outline-none'
                }`}
              />
              <div className="absolute start-3.5 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>

              {/* Action Cluster: Microphone Dictation + Search Button */}
              <div className="absolute end-2 flex items-center gap-1.5">
                <button
                  type="button"
                  id="voice-dictate-button"
                  onClick={handleToggleListening}
                  title={
                    isListening
                      ? (language === 'ar' ? 'إيقاف الإملاء الصوتي' : 'Stop voice dictation')
                      : (language === 'ar' ? 'إملاء سؤالك بالصوت (Web Speech API)' : 'Dictate question with voice (Web Speech API)')
                  }
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition active:scale-95 ${
                    isListening
                      ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse shadow-md ring-2 ring-rose-400/50'
                      : 'bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-slate-700" />
                  )}
                </button>

                <button
                  type="button"
                  id="search-submit-button"
                  onClick={() => handleSearchChange(searchQuery)}
                  className="bg-[#0A2540] hover:bg-black text-white text-xs font-bold px-3 sm:px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 active:scale-95"
                >
                  <span>{t.home.searchAction}</span>
                  <ArrowIcon className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Active Voice Listening Banner */}
            {isListening && (
              <div className="mt-2.5 flex items-center justify-between bg-rose-500/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-md animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span className="font-bold">
                    {language === 'ar'
                      ? '🎙️ جاري الاستماع عبر الميكروفون... تحدث الآن وسنبحث لك فوراً'
                      : '🎙️ Listening via microphone... Speak your question now'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleListening}
                  className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-md text-[11px] font-bold transition"
                >
                  {language === 'ar' ? 'إنهاء الإملاء' : 'Done'}
                </button>
              </div>
            )}

            {/* Speech Recognition Error Notice */}
            {speechError && (
              <div className="mt-2.5 flex items-center justify-between bg-amber-500/95 backdrop-blur-md text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{speechError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechError(null)}
                  className="text-slate-900 hover:text-black font-black text-sm px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Quick Actions Row */}
            <div id="quick-actions-row" className="pt-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Emergency Contacts */}
                <button
                  id="quick-action-emergency"
                  type="button"
                  onClick={() => setActiveQuickAction('emergency')}
                  className="bg-white/10 hover:bg-rose-500/25 active:scale-95 border border-white/20 hover:border-rose-400/50 rounded-xl px-2.5 py-2 flex items-center gap-2 transition text-start group cursor-pointer backdrop-blur-xs shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-rose-500/30 text-rose-300 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold text-white group-hover:text-rose-200 transition truncate">
                      {language === 'ar' ? 'أرقام الطوارئ' : 'Emergency Contacts'}
                    </div>
                  </div>
                </button>

                {/* 2. Translate */}
                <button
                  id="quick-action-translate"
                  type="button"
                  onClick={() => setActiveQuickAction('translate')}
                  className="bg-white/10 hover:bg-amber-500/25 active:scale-95 border border-white/20 hover:border-amber-400/50 rounded-xl px-2.5 py-2 flex items-center gap-2 transition text-start group cursor-pointer backdrop-blur-xs shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/30 text-[#FECC00] flex items-center justify-center shrink-0 group-hover:bg-[#FECC00] group-hover:text-[#0A2540] transition">
                    <Languages className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold text-white group-hover:text-[#FECC00] transition truncate">
                      {language === 'ar' ? 'المترجم' : 'Translate'}
                    </div>
                  </div>
                </button>

                {/* 3. Nearest Library */}
                <button
                  id="quick-action-library"
                  type="button"
                  onClick={() => setActiveQuickAction('library')}
                  className="bg-white/10 hover:bg-sky-500/25 active:scale-95 border border-white/20 hover:border-sky-400/50 rounded-xl px-2.5 py-2 flex items-center gap-2 transition text-start group cursor-pointer backdrop-blur-xs shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-500/30 text-sky-300 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition">
                    <Library className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold text-white group-hover:text-sky-200 transition truncate">
                      {language === 'ar' ? 'أقرب مكتبة' : 'Nearest Library'}
                    </div>
                  </div>
                </button>

                {/* 4. Public Transport Map */}
                <button
                  id="quick-action-transport"
                  type="button"
                  onClick={() => setActiveQuickAction('transport')}
                  className="bg-white/10 hover:bg-emerald-500/25 active:scale-95 border border-white/20 hover:border-emerald-400/50 rounded-xl px-2.5 py-2 flex items-center gap-2 transition text-start group cursor-pointer backdrop-blur-xs shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Bus className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold text-white group-hover:text-emerald-200 transition truncate">
                      {language === 'ar' ? 'خريطة المواصلات' : 'Public Transport Map'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Dialect / Quick Sample Queries */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 text-xs no-scrollbar">
              <span className="text-slate-300 whitespace-nowrap text-[11px] font-medium">
                {language === 'ar' ? 'جرّب البحث السريع:' : 'Quick search ideas:'}
              </span>
              {language === 'ar' ? (
                <>
                  <button
                    onClick={() => handleSearchChange('بدي اجيب مرتي')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "بدي اجيب مرتي"
                  </button>
                  <button
                    onClick={() => handleSearchChange('كيف اطلع personnummer')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "كيف أطلع الشخصي"
                  </button>
                  <button
                    onClick={() => handleSearchChange('وين اروح اليوم بستوكهولم')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "وين أروح بستوكهولم"
                  </button>
                  <button
                    onClick={() => handleSearchChange('لجوء وحماية 2026')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "اللجوء 2026"
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleSearchChange('family reunification spouse')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "Bring Spouse"
                  </button>
                  <button
                    onClick={() => handleSearchChange('how to get personnummer')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "Get Personnummer"
                  </button>
                  <button
                    onClick={() => handleSearchChange('where to go in Stockholm')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "Visit Stockholm"
                  </button>
                  <button
                    onClick={() => handleSearchChange('asylum requirements 2026')}
                    className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg text-slate-100 text-[11px] transition"
                  >
                    "Asylum 2026"
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Search Results Dropdown Overlay if Active */}
      {isSearchOpen && (
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#005293]" />
              <span>{language === 'ar' ? 'نتائج البحث الذكي' : 'Search Results'}</span>
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                {searchResults.length}
              </span>
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'إغلاق' : 'Close'}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400">
                {language === 'ar'
                  ? 'لم نجد موضوعاً مطابقاً تماماً. يمكنك تجربة كتابة السؤال بكلمات أخرى.'
                  : 'No exact match found. Try typing with different keywords.'}
              </div>
            ) : (
              searchResults.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    onOpenGuideModal(r);
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer transition"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800">{r.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{r.authority} • {r.tag}</div>
                  </div>
                  <span className="text-[#005293] text-xs font-bold flex items-center gap-1">
                    <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Sweden Fast Pathways & Quick Solutions Navigator (Inside & Outside Sweden) */}
      <FastPathwaysNavigator
        onOpenTaxCalc={onOpenTaxCalc}
        onOpenSimulator={onOpenSimulator}
        onOpenAppeal={onOpenAppeal}
        onOpenCvModal={onOpenCvModal}
        onOpenDocExplainer={onOpenDocExplainer}
        onOpenChecklist={onOpenChecklist}
        onOpenLetterDrafter={onOpenLetterDrafter}
      />

      {/* Interactive Widgets Row (Word of the Day + Newly Arrived Checklist) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Swedish Word of the Day */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#005293] flex items-center justify-center text-base font-bold shadow-xs">
                🇸🇪
              </span>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                  {language === 'ar' ? 'كلمة اليوم السويدية' : 'Swedish Word of the Day'}
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#0A2540] tracking-wide">
                  {localizedWord.swedish}
                </h4>
              </div>
            </div>
            <button
              onClick={() => handleSpeech(localizedWord.swedish)}
              title={language === 'ar' ? 'استمع للنطق السويدي' : 'Listen to Swedish pronunciation'}
              className="w-9 h-9 rounded-xl bg-[#005293]/10 hover:bg-[#005293] text-[#005293] hover:text-white transition flex items-center justify-center active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="text-xs font-bold text-slate-800">{localizedWord.translation}</div>
            <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              {localizedWord.desc}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] pt-1">
            <button
              onClick={() => setWordIndex((prev) => prev + 1)}
              className="text-[#005293] font-bold hover:underline flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'كلمة أخرى ↻' : 'Next Word ↻'}</span>
            </button>
            <button
              onClick={() => onSelectCategory('language')}
              className="text-slate-500 hover:text-[#0A2540] font-medium"
            >
              {language === 'ar' ? 'القاموس الصوتي الكامل 📚' : 'Full Audio Dictionary 📚'}
            </button>
          </div>
        </div>

        {/* Newly Arrived Checklist Banner (وصلت السويد… ماذا أفعل الآن؟) */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <div className="inline-block bg-white/20 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {language === 'ar' ? 'Checklist القادم الجديد 🇸🇪' : 'Newcomer Checklist 🇸🇪'}
            </div>
            <h3 className="text-base font-extrabold leading-tight">
              {language === 'ar' ? 'وصلت السويد حديثاً؟ ماذا تفعل الآن؟' : 'Newly Arrived in Sweden? What to do next?'}
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              {language === 'ar'
                ? 'دليلك المنظم خطوة بخطوة من التسجيل في Skatteverket وحتى الحساب البنكي وBankID.'
                : 'Step-by-step roadmap from Skatteverket registration to Swedish bank account and BankID.'}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between pt-1">
            <div className="text-xs text-white/90 font-bold">
              <span>
                {language === 'ar'
                  ? `${completedChecklistCount} من ${totalChecklistCount} مكتملة`
                  : `${completedChecklistCount} of ${totalChecklistCount} completed`}
              </span>
            </div>
            <button
              onClick={onOpenChecklist}
              className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-xl shadow transition flex items-center gap-1 active:scale-95"
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'افتح قائمة المهام' : 'Open Checklist'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Daily Phrase Section for Newcomers (Swedish & Arabic Meanings Toggle) */}
      <DailyPhraseSection onSelectCategory={onSelectCategory} />

      {/* AI Tools Suite Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0A2540] rounded-3xl p-4 sm:p-5 text-white shadow-lg border border-indigo-900/40 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-lg shadow-inner">
              <Sparkles className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xs sm:text-sm text-white">
                  {language === 'ar' ? 'أدوات الذكاء الاصطناعي التفاعلية لـ «دليلك في السويد»' : 'Interactive AI Suite for Dalelak Sweden'}
                </h3>
                <span className="bg-[#FECC00]/20 text-[#FECC00] text-[9px] px-2 py-0.5 rounded-full font-bold border border-[#FECC00]/30">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? 'حلول عملية للمقابلات، حساب الضرائب، وصياغة الاعتراضات الرسمية'
                  : 'Practical tools for interview preparation, salary & tax calculation, and formal appeals'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Tool 1: Scenario Simulator */}
          <div
            onClick={onOpenSimulator}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 p-3.5 rounded-2xl cursor-pointer transition group"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-base font-bold">
                🎭
              </span>
              <span className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md font-bold">
                {language === 'ar' ? 'محاكي ناطق' : 'Voice Simulator'}
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-purple-300 transition">
              {language === 'ar' ? 'محاكي المقابلات السويدية' : 'Swedish Interview Simulator'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              {language === 'ar'
                ? 'تدرب على مقابلات العمل، مصلحة الهجرة، أو المستوصف مع تصحيح ونطق فوري.'
                : 'Practice job interviews, Migrationsverket hearings, or clinic appointments with live speech.'}
            </p>
          </div>

          {/* Tool 2: Net Salary & Tax Calculator */}
          <div
            onClick={onOpenTaxCalc}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 p-3.5 rounded-2xl cursor-pointer transition group"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-base font-bold">
                🧮
              </span>
              <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">
                {language === 'ar' ? 'حساب ضريبي' : 'Tax Calc'}
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
              {language === 'ar' ? 'حاسبة الراتب والضرائب الصافية' : 'Swedish Net Salary & Tax Calculator'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              {language === 'ar'
                ? 'اكتشف راتبك الصافي في بلديتك، نسبة اقتطاع الضريبة، والخصومات المستحقة.'
                : 'Calculate your exact net salary per municipality, tax brackets, and earned income deduction.'}
            </p>
          </div>

          {/* Tool 3: Legal Appeal */}
          <div
            onClick={onOpenAppeal}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/50 p-3.5 rounded-2xl cursor-pointer transition group"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-base font-bold">
                ⚖️
              </span>
              <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-md font-bold">
                {language === 'ar' ? 'صياغة قانونية' : 'Formal Appeal'}
              </span>
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-rose-300 transition">
              {language === 'ar' ? 'مساعد الاعتراض والاستئناف' : 'Swedish Decision Appeal Helper'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
              {language === 'ar'
                ? 'صياغة عرائض استئناف رسمية (Överklagande) ضد قرارات الرفض أو المخالفات.'
                : 'Draft formal Swedish appeals (Överklagande) according to Swedish Administrative Procedure Act.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool: "ماذا أفعل اليوم في السويد؟ 🎯" */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-base">
              🎯
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">
                {language === 'ar' ? 'ماذا أفعل اليوم في السويد؟' : 'What to Do Today in Sweden?'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'اختر مدينتك ونوع النشاط الذي تفضله لنقترح عليك فكرة مميزة'
                  : 'Select your city and preference for a curated itinerary with Raed Shehab'}
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
            {language === 'ar' ? 'جولات رائد شهاب 🎥' : 'Raed Shehab Tours 🎥'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {language === 'ar' ? '📍 أين أنت الآن؟' : '📍 Which city are you in?'}
            </label>
            <select
              value={todayCity}
              onChange={(e) => setTodayCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#005293] font-medium"
            >
              <option value="stockholm">{language === 'ar' ? 'ستوكهولم العاصمة (Stockholm)' : 'Stockholm (Capital)'}</option>
              <option value="goteborg">{language === 'ar' ? 'يوتبوري (Göteborg)' : 'Gothenburg (Göteborg)'}</option>
              <option value="malmo">{language === 'ar' ? 'مالمو (Malmö)' : 'Malmö'}</option>
              <option value="uppsala">{language === 'ar' ? 'أوبسالا (Uppsala)' : 'Uppsala'}</option>
              <option value="nature">{language === 'ar' ? 'الطبيعة والأرياف السويدية' : 'Swedish Countryside & Lakes'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {language === 'ar' ? '❤️ ما هو جوك المفضل؟' : '❤️ What vibe are you looking for?'}
            </label>
            <select
              value={todayMood}
              onChange={(e) => setTodayMood(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#005293] font-medium"
            >
              <option value="walk">{language === 'ar' ? '🚶 جولات مشي وأماكن تاريخية' : '🚶 Historic walks & sightseeing'}</option>
              <option value="photo">{language === 'ar' ? '📸 أماكن تصوير وإطلالات ساحرة' : '📸 Scenic photo spots & views'}</option>
              <option value="coffee">{language === 'ar' ? '☕ مقاهي وكافيهات مميزة (Fika)' : '☕ Swedish Fika & cozy cafes'}</option>
              <option value="food">{language === 'ar' ? '🍽️ مطاعم وأكلات لذيذة' : '🍽️ Dining & local specialties'}</option>
              <option value="family">{language === 'ar' ? '👨‍👩‍👧‍👦 أنشطة للأطفال والعائلة' : '👨‍👩‍👧‍👦 Family & kid-friendly fun'}</option>
              <option value="free">{language === 'ar' ? '🆓 أماكن مجانية تماماً' : '🆓 100% Free activities'}</option>
              <option value="nature">{language === 'ar' ? '🌲 استرخاء وطبيعة وبحيرات' : '🌲 Nature, archipelago & lakes'}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            {language === 'ar'
              ? '✍️ رغبة خاصة اختيارية (مثال: معي أطفال صغار والجو ماطر، أو أبحث عن فطور مميز):'
              : '✍️ Optional custom note (e.g. traveling with toddlers, rainy weather, seeking breakfast):'}
          </label>
          <input
            type="text"
            value={todayNotes}
            onChange={(e) => setTodayNotes(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب أي ملاحظة لتخصيص الخطة بالذكاء الاصطناعي...' : 'Type any custom request to tailor the plan...'}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#005293]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleGenerateClassicPlan}
            className="flex-1 bg-[#005293] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'خطة كلاسيكية من جولات رائد' : "Classic Raed's Route"}</span>
          </button>
          <button
            onClick={handleGenerateAIPlan}
            disabled={isGeneratingPlan}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-60"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isGeneratingPlan
                ? (language === 'ar' ? 'جاري الابتكار بـ Gemini...' : 'Generating with Gemini...')
                : (language === 'ar' ? 'ابتكار خطة مخصصة بـ Gemini AI ✨' : 'Generate AI Custom Plan ✨')}
            </span>
          </button>
        </div>

        {/* Suggestion Result Card */}
        {todayPlanResult && (
          <div className="bg-slate-50 border border-blue-100 rounded-2xl p-4 transition-all space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#005293] font-bold">
              <span>📍 {todayPlanResult.city}</span>
              <span>•</span>
              <span className="text-amber-600">{todayPlanResult.tag}</span>
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">{todayPlanResult.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{todayPlanResult.desc}</p>
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] text-slate-500 font-medium">💡 {todayPlanResult.tip}</span>
              <a
                href="https://www.tiktok.com/@dalelak.sweden"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white hover:bg-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <span className="text-[#FECC00]">🎥</span>
                <span>{language === 'ar' ? 'شاهد تغطيات رائد' : "Watch Raed's Videos"}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Main Category Grid (The 12 Sections from prompt) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-800 flex items-center gap-2">
              <span className="text-[#005293]">📚</span>
              <span>{language === 'ar' ? 'أقسام الدليل الشامل' : 'Comprehensive Guide Sections'}</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {language === 'ar' ? 'اختر القسم للتفاصيل الرسمية ومتابعة نسبة القراءة' : 'Select a section for verified details & reading progress'}
            </p>
          </div>
          <div className="text-[11px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {GUIDES_DATABASE.filter((g) => effectiveReadGuideIds.has(g.id)).length} / {GUIDES_DATABASE.length}{' '}
              {language === 'ar' ? 'دليلاً مقروءاً' : 'guides read'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {MAIN_CATEGORIES.map((cat) => {
            const localizedCat = getLocalizedCategory(cat, language);
            const categoryGuides = GUIDES_DATABASE.filter((g) => g.category === cat.id);
            const totalCount = categoryGuides.length;
            const readCount = categoryGuides.filter((g) => effectiveReadGuideIds.has(g.id)).length;
            const percentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

            return (
              <div
                key={localizedCat.id}
                id={`category-card-${localizedCat.id}`}
                onClick={() => onSelectCategory(localizedCat.id)}
                className="group bg-white hover:border-[#005293] border border-slate-200 rounded-2xl p-3.5 sm:p-4 cursor-pointer transition shadow-xs hover:shadow-md flex flex-col justify-between active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl ${localizedCat.bgColor} flex items-center justify-center text-xl group-hover:scale-110 transition shrink-0`}>
                      {localizedCat.icon}
                    </div>
                    {/* Visual Progress Ring */}
                    <CategoryProgressRing
                      percentage={percentage}
                      readCount={readCount}
                      totalCount={totalCount}
                      categoryTitle={localizedCat.title}
                    />
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#005293] transition leading-snug">
                    {localizedCat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {localizedCat.desc}
                  </p>
                </div>

                <div className="mt-3 text-[10px] font-bold text-[#005293] flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span>{localizedCat.badge}</span>
                    <ArrowIcon className="w-2.5 h-2.5" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-tight ${percentage === 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {readCount}/{totalCount} {language === 'ar' ? 'مقروء' : 'read'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TikTok Spotlight Banner (@dalelak.sweden) */}
      <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-lg border border-slate-800">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-black border border-slate-700 flex items-center justify-center text-[#FECC00] text-xl">
              🎵
            </div>
            <div>
              <h4 className="font-black text-sm text-white">
                {language === 'ar' ? 'فيديوهات دليلك في السويد' : 'Dalelak Sweden Video Episodes'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'تابع الجولات والشروحات المرئية مع رائد شهاب' : 'Follow live visual tours & official walk-throughs with Raed Shehab'}
              </p>
            </div>
          </div>
          <a
            href="https://www.tiktok.com/@dalelak.sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-[#FECC00] hover:bg-yellow-400 text-[#0A2540] font-extrabold px-3.5 py-1.5 rounded-full transition flex items-center gap-1 shadow"
          >
            <span>{language === 'ar' ? 'تابع الحساب' : 'Follow on TikTok'}</span>
            <ArrowIcon className="w-3 h-3" />
          </a>
        </div>

        {/* 3 Featured Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://www.tiktok.com/@dalelak.sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl transition group block"
          >
            <div className="flex items-center justify-between text-[11px] text-[#FECC00] mb-1 font-bold">
              <span>{language === 'ar' ? '🏛️ الدوائر الرسمية' : '🏛️ Government Agencies'}</span>
              <span>TikTok</span>
            </div>
            <div className="font-bold text-xs text-slate-100 group-hover:text-[#FECC00] transition line-clamp-2">
              {language === 'ar'
                ? 'كيف تسجل في النفوس السويدية وما هي شروط Personnummer؟'
                : 'How to register with Skatteverket & Personnummer requirements?'}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{language === 'ar' ? 'شرح رائد شهاب' : 'Explained by Raed Shehab'}</span>
              <span className="text-[#FECC00]">{language === 'ar' ? 'شاهد الفيديو ◀' : 'Watch video ▶'}</span>
            </div>
          </a>

          <a
            href="https://www.tiktok.com/@dalelak.sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl transition group block"
          >
            <div className="flex items-center justify-between text-[11px] text-teal-400 mb-1 font-bold">
              <span>{language === 'ar' ? '📍 ستوكهولم مع رائد' : '📍 Stockholm with Raed'}</span>
              <span>TikTok</span>
            </div>
            <div className="font-bold text-xs text-slate-100 group-hover:text-[#FECC00] transition line-clamp-2">
              {language === 'ar'
                ? 'أفضل زوايا التصوير وأسرار المقاهي القديمة في العاصمة'
                : 'Secret photo spots and historic fika cafes in Stockholm'}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{language === 'ar' ? 'جولة سياحية' : 'Sightseeing Tour'}</span>
              <span className="text-[#FECC00]">{language === 'ar' ? 'شاهد الفيديو ◀' : 'Watch video ▶'}</span>
            </div>
          </a>

          <a
            href="https://www.tiktok.com/@dalelak.sweden"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-2xl transition group block"
          >
            <div className="flex items-center justify-between text-[11px] text-amber-400 mb-1 font-bold">
              <span>{language === 'ar' ? '🛂 الهجرة والإقامة' : '🛂 Migration & Permits'}</span>
              <span>TikTok</span>
            </div>
            <div className="font-bold text-xs text-slate-100 group-hover:text-[#FECC00] transition line-clamp-2">
              {language === 'ar'
                ? 'ماذا تغير في متطلبات الراتب وقرارات مصلحة الهجرة 2026؟'
                : 'What changed in 2026 salary threshold & Migrationsverket rules?'}
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{language === 'ar' ? 'تحديث رسمي' : 'Official Update'}</span>
              <span className="text-[#FECC00]">{language === 'ar' ? 'شاهد الفيديو ◀' : 'Watch video ▶'}</span>
            </div>
          </a>
        </div>
      </div>

      {/* Quick Actions Modal */}
      <QuickActionsModal
        isOpen={!!activeQuickAction}
        activeType={activeQuickAction}
        onClose={() => setActiveQuickAction(null)}
        onSwitchType={(type) => setActiveQuickAction(type)}
      />

    </div>
  );
};
