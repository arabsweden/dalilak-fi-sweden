import React, { useState } from 'react';
import { X, PhoneCall, Languages, Library, Bus, ExternalLink, MapPin, Volume2, Search, ArrowRight, ArrowLeft, Shield, AlertTriangle, Check, Copy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SWEDISH_DICTIONARY, getLocalizedDictionaryItem } from '../../data/dictionary';

export type QuickActionType = 'emergency' | 'translate' | 'library' | 'transport';

interface QuickActionsModalProps {
  isOpen: boolean;
  activeType: QuickActionType | null;
  onClose: () => void;
  onSwitchType: (type: QuickActionType) => void;
}

export const QuickActionsModal: React.FC<QuickActionsModalProps> = ({
  isOpen,
  activeType,
  onClose,
  onSwitchType,
}) => {
  const { language, isRTL } = useLanguage();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [translateSearch, setTranslateSearch] = useState('');
  const [selectedLibraryCity, setSelectedLibraryCity] = useState<'all' | 'stockholm' | 'goteborg' | 'malmo' | 'uppsala'>('all');
  const [transitCity, setTransitCity] = useState<'stockholm' | 'goteborg' | 'malmo' | 'all'>('stockholm');

  if (!isOpen || !activeType) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(label);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const playSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="quick-actions-modal-dialog"
        className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden border border-slate-200"
      >
        {/* Top Header */}
        <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
              {activeType === 'emergency' && <PhoneCall className="w-5 h-5 text-rose-400" />}
              {activeType === 'translate' && <Languages className="w-5 h-5 text-[#FECC00]" />}
              {activeType === 'library' && <Library className="w-5 h-5 text-sky-400" />}
              {activeType === 'transport' && <Bus className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {activeType === 'emergency' && (language === 'ar' ? 'أرقام الطوارئ في السويد 🇸🇪' : 'Emergency Contacts in Sweden 🇸🇪')}
                {activeType === 'translate' && (language === 'ar' ? 'المترجم وقاموس الاستقرار 🇸🇪' : 'Quick Translator & Dictionary 🇸🇪')}
                {activeType === 'library' && (language === 'ar' ? 'المكتبة الأقرب والخدمات المجانية 🇸🇪' : 'Nearest Library & Free Services 🇸🇪')}
                {activeType === 'transport' && (language === 'ar' ? 'خريطة ودليل المواصلات العامة 🇸🇪' : 'Public Transport Map & Guide 🇸🇪')}
              </h3>
              <p className="text-[11px] text-slate-300">
                {activeType === 'emergency' && (language === 'ar' ? 'أرقام رسمية تعمل مجاناً على مدار 24 ساعة بدون رصيد' : 'Official toll-free 24/7 lines that work without prepaid credit')}
                {activeType === 'translate' && (language === 'ar' ? 'مصطلحات المعاملات الرسمية مع النطق الصوتي المباشر' : 'Essential official settlement terminology with native Swedish audio')}
                {activeType === 'library' && (language === 'ar' ? 'مكتبات السويد العامة (Bibliotek): إنترنت مجاني، طباعة، ومقاهي لغة' : 'Swedish public libraries: free internet, printing, and language cafes')}
                {activeType === 'transport' && (language === 'ar' ? 'شبكة المترو والقطارات SL، وطريقة دفع التذاكر عبر البطاقة البنكية' : 'SL metro, trains, regional transit networks, and tap-to-pay guides')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher inside Modal */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex gap-1 overflow-x-auto text-xs font-bold no-scrollbar">
          <button
            onClick={() => onSwitchType('emergency')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeType === 'emergency'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-white/80'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أرقام الطوارئ' : 'Emergency'}</span>
          </button>

          <button
            onClick={() => onSwitchType('translate')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeType === 'translate'
                ? 'bg-[#005293] text-[#FECC00] shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-white/80'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'المترجم' : 'Translate'}</span>
          </button>

          <button
            onClick={() => onSwitchType('library')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeType === 'library'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-white/80'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أقرب مكتبة' : 'Nearest Library'}</span>
          </button>

          <button
            onClick={() => onSwitchType('transport')}
            className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeType === 'transport'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:bg-white/80'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'المواصلات' : 'Transport Map'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* ================= VIEW 1: EMERGENCY CONTACTS ================= */}
          {activeType === 'emergency' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-900 leading-relaxed">
                  <strong className="block font-bold mb-0.5">
                    {language === 'ar' ? 'تنبيه الطوارئ في السويد:' : 'Emergency Protocol in Sweden:'}
                  </strong>
                  {language === 'ar'
                    ? 'رقم 112 مخصص للحالات الخطرة والمهددة للحياة فقط. يعمل مجاناً من أي جوال حتى دون شريحة SIM أو رصيد.'
                    : 'Dial 112 strictly for acute life-threatening situations. It works toll-free from any mobile without a SIM or prepaid credit.'}
                </div>
              </div>

              {/* Primary Numbers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 112 */}
                <div className="bg-white border-2 border-rose-200 rounded-2xl p-3.5 shadow-sm hover:border-rose-400 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-rose-600">112</span>
                      <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {language === 'ar' ? 'طوارئ قصوى 24/7' : 'Life-Threatening 24/7'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {language === 'ar' ? 'الإسعاف والشرطة والإطفاء (Akut)' : 'Ambulance, Police & Fire (SOS Alarm)'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'ar'
                        ? 'حوادث السير الخطرة، النوبات القلبية، الحرائق، أو جرائم قيد الحدوث.'
                        : 'Accidents, severe medical distress, fires, or ongoing crimes.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <a
                      href="tel:112"
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'اتصال بـ 112' : 'Call 112'}</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('112', '112')}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs"
                      title="نسخ الرقم"
                    >
                      {copiedNumber === '112' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 1177 */}
                <div className="bg-white border-2 border-blue-200 rounded-2xl p-3.5 shadow-sm hover:border-blue-400 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-blue-600">1177</span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {language === 'ar' ? 'استشارة طبية 24/7' : 'Healthcare Guide 24/7'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {language === 'ar' ? 'استشارة الممرضين والمستوصف (Vårdguiden)' : 'Medical Advice & Nurse Triage (1177)'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'ar'
                        ? 'إذا كنت مريضاً أو طفلك مصاب بحمى وتريد معرفة إن كان يلزم الذهاب للطوارئ.'
                        : 'Guidance on sickness, children fever, prescriptions, and local clinics.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <a
                      href="tel:1177"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'اتصال بـ 1177' : 'Call 1177'}</span>
                    </a>
                    <a
                      href="https://www.1177.se"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-blue-600 text-xs flex items-center gap-1"
                      title="1177.se"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 114 14 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-slate-800">114 14</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {language === 'ar' ? 'الشرطة غير الطارئة' : 'Non-Urgent Police'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {language === 'ar' ? 'بلاغات الشرطة والمفقودات (Polisen)' : 'Police Reports & Lost Property'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'ar'
                        ? 'للإبلاغ عن سرقة دراجة أو محفظة، فقدان وثائق، أو الاستفسار عن تصاريح.'
                        : 'Report stolen bikes, lost property, past crimes, and passport bookings.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <a
                      href="tel:11414"
                      className="flex-1 bg-slate-800 hover:bg-black text-white font-bold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'اتصال بـ 114 14' : 'Call 114 14'}</span>
                    </a>
                  </div>
                </div>

                {/* 113 13 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-slate-800">113 13</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {language === 'ar' ? 'معلومات الأزمات' : 'Crisis Information'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                      {language === 'ar' ? 'طوارئ الأزمات والكوارث (Krisinformation)' : 'National Public Crisis & Storms'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'ar'
                        ? 'معلومات رسمية عند العواصف القوية، انقطاع الكهرباء الواسع، أو الأحداث الكبرى.'
                        : 'Official details during blizzards, major power cuts, and environmental emergencies.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <a
                      href="tel:11313"
                      className="flex-1 bg-slate-800 hover:bg-black text-white font-bold py-2 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'اتصال بـ 113 13' : 'Call 113 13'}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Helplines for Women, Youth & Mental Health */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {language === 'ar' ? 'خطوط الدعم النفسي والحماية المجانية:' : 'Confidential Support & Helplines:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-rose-700">Kvinnofridslinjen</div>
                      <div className="text-[11px] text-slate-500">{language === 'ar' ? 'حماية النساء من العنف والتهديد' : 'Support for women facing violence'}</div>
                    </div>
                    <a href="tel:020505050" className="mt-2 font-black text-slate-800 hover:text-rose-600 flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" /> 020-50 50 50
                    </a>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-blue-700">BRIS (للأطفال واليافعين)</div>
                      <div className="text-[11px] text-slate-500">{language === 'ar' ? 'دعم سري للأطفال دون 18 عاماً' : 'Children rights & confidential aid'}</div>
                    </div>
                    <a href="tel:116111" className="mt-2 font-black text-slate-800 hover:text-blue-600 flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" /> 116 111
                    </a>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-purple-700">Självmordslinjen</div>
                      <div className="text-[11px] text-slate-500">{language === 'ar' ? 'الدعم النفسي وأزمات الضيق الحاد' : 'Mind suicide prevention helpline'}</div>
                    </div>
                    <a href="tel:90101" className="mt-2 font-black text-slate-800 hover:text-purple-600 flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" /> 90101
                    </a>
                  </div>
                </div>
              </div>

              {/* What to Say to 112 */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <span>🇸🇪</span>
                  <span>{language === 'ar' ? 'ماذا يسألك موظف 112 بالسويدية؟' : 'What does the 112 operator ask in Swedish?'}</span>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200/60">
                    <div>
                      <span className="font-mono font-bold text-amber-900">Vad har hänt?</span>
                      <span className="text-slate-500 text-[11px] block">{language === 'ar' ? 'ماذا حدث؟' : 'What happened?'}</span>
                    </div>
                    <button onClick={() => playSpeech('Vad har hänt?')} className="text-amber-800 hover:text-black p-1">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200/60">
                    <div>
                      <span className="font-mono font-bold text-amber-900">Var behövs hjälpen?</span>
                      <span className="text-slate-500 text-[11px] block">{language === 'ar' ? 'أين العنوان أو المكان بالضبط؟' : 'Where is help needed?'}</span>
                    </div>
                    <button onClick={() => playSpeech('Var behövs hjälpen?')} className="text-amber-800 hover:text-black p-1">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200/60">
                    <div>
                      <span className="font-mono font-bold text-amber-900">Kan jag få en tolk på arabiska?</span>
                      <span className="text-slate-500 text-[11px] block">{language === 'ar' ? 'هل يمكنني التحدث مع مترجم عربي؟' : 'Can I get an Arabic interpreter?'}</span>
                    </div>
                    <button onClick={() => playSpeech('Kan jag få en tolk på arabiska?')} className="text-amber-800 hover:text-black p-1">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: TRANSLATE & DICTIONARY ================= */}
          {activeType === 'translate' && (
            <div className="space-y-4">
              {/* Search Swedish Dictionary */}
              <div className="relative">
                <input
                  type="text"
                  value={translateSearch}
                  onChange={(e) => setTranslateSearch(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث في مصطلحات الدوائر (مثال: personnummer, lma, sfi)...' : 'Search official terms (e.g., personnummer, uppehållstillstånd)...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#005293]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3.5 pointer-events-none" />
              </div>

              {/* Fast External Translators Launchers */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://lexin.nada.kth.se/lexin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-50 hover:bg-amber-100 border border-amber-300 p-3 rounded-2xl text-amber-900 font-bold flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📖</span>
                    <div>
                      <div className="font-extrabold">Lexin (المعجم السويدي الرسمي)</div>
                      <div className="text-[10px] text-amber-700 font-normal">معجم Skolverket عربي-سويدي مع أمثلة</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition" />
                </a>

                <a
                  href="https://translate.google.com/?sl=sv&tl=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded-2xl text-blue-900 font-bold flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <div>
                      <div className="font-extrabold">Google Translate</div>
                      <div className="text-[10px] text-blue-700 font-normal">ترجمة فورية سويدي ⇄ عربي</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition" />
                </a>
              </div>

              {/* Filtered Terminology Cards */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'أهم المصطلحات السويدية للقادمين الجدد:' : 'Essential Settlement Vocabulary:'}
                </h5>
                <div className="space-y-2">
                  {SWEDISH_DICTIONARY
                    .filter((item) => {
                      if (!translateSearch.trim()) return true;
                      const q = translateSearch.toLowerCase();
                      return (
                        item.swedish.toLowerCase().includes(q) ||
                        item.arabic.toLowerCase().includes(q) ||
                        item.desc.toLowerCase().includes(q) ||
                        (item.english && item.english.toLowerCase().includes(q))
                      );
                    })
                    .slice(0, 10)
                    .map((item, idx) => {
                      const localized = getLocalizedDictionaryItem(item, language);
                      return (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-start justify-between gap-2 hover:border-slate-300 transition"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-[#0A2540] text-sm tracking-wide">
                                {item.swedish}
                              </span>
                              <button
                                onClick={() => playSpeech(item.swedish)}
                                className="w-6 h-6 rounded-full bg-slate-200 hover:bg-[#FECC00] text-slate-700 hover:text-black flex items-center justify-center transition active:scale-95"
                                title="استمع للنطق بالسويدية"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-xs font-bold text-[#005293] mt-0.5">
                              {localized.translation}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              {localized.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: NEAREST LIBRARY (BIBLIOTEK) ================= */}
          {activeType === 'library' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-extrabold text-sky-950 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>{language === 'ar' ? 'ابحث عن أقرب مكتبة عامة لموقعك الآن' : 'Locate Nearest Public Library Around You'}</span>
                  </h4>
                  <p className="text-xs text-sky-800 mt-1">
                    {language === 'ar'
                      ? 'افتح خرائط Google مباشرة للبحث عن فروع المكتبات العامة وساعات الدوام اليوم.'
                      : 'Instantly view nearby municipal library branches and today open hours on Google Maps.'}
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/Bibliotek+n%C3%A4ra+mig/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 transition active:scale-95 shadow"
                >
                  <span>{language === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Free Benefits of Swedish Libraries */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {language === 'ar' ? 'ماذا يمكنك إنجازه مجاناً في مكتبات السويد؟' : 'Free Services Available at Swedish Libraries:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong className="block text-slate-800">{language === 'ar' ? 'بطاقة المكتبة مجانية تماماً' : '100% Free Library Card'}</strong>
                      <span className="text-slate-500 text-[11px]">{language === 'ar' ? 'تكفيك بطاقة الهوية أو بطاقة LMA الخاصة بطالبي اللجوء.' : 'Issued instantly with valid ID or asylum seeker LMA card.'}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong className="block text-slate-800">{language === 'ar' ? 'إنترنت سريع وأجهزة كمبيوتر' : 'Free Computers & Fast Wi-Fi'}</strong>
                      <span className="text-slate-500 text-[11px]">{language === 'ar' ? 'استخدام الحواسيب وتصفح البوابات الرسمية وتعبئة الاستمارات.' : 'Public PC access to fill migration forms and job portals.'}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong className="block text-slate-800">{language === 'ar' ? 'طباعة ونسخ المستندات' : 'Printing & Document Scanning'}</strong>
                      <span className="text-slate-500 text-[11px]">{language === 'ar' ? 'طباعة العقود ورسائل الدوائر مقابل تكلفة رمزية بسيطة.' : 'Print official forms, copies of passport and migration letters.'}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <div>
                      <strong className="block text-slate-800">{language === 'ar' ? 'مقاهي اللغة (Språkcafé)' : 'Language Cafés (Språkcafé)'}</strong>
                      <span className="text-slate-500 text-[11px]">{language === 'ar' ? 'جلسات أسبوعية مجانية لممارسة السويدية مع متطوعين محليين.' : 'Weekly free sessions to practice conversational Swedish.'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Major City Library Portals */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'بوابات المكتبات في المدن السويدية الرئيسية:' : 'Official Municipal Library Networks:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://biblioteket.stockholm.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 transition"
                  >
                    <span>Stockholms stadsbibliotek (ستوكهولم)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://stadsbibliotek.goteborg.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 transition"
                  >
                    <span>Göteborgs stadsbibliotek (يوتوبوري)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://malmo.se/bibliotek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 transition"
                  >
                    <span>Malmö stadsbibliotek (مالمو)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://bibliotekuppsala.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between font-bold text-slate-800 transition"
                  >
                    <span>Bibliotek Uppsala (أوبسالا)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: PUBLIC TRANSPORT MAP (SL & TRAFIK) ================= */}
          {activeType === 'transport' && (
            <div className="space-y-4">
              {/* Contactless Tap to Pay Highlight */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-2xl">💳</span>
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong className="block font-bold text-emerald-900 mb-0.5">
                    {language === 'ar' ? 'الدفع المباشر بالبطاقة البنكية (Contactless / Blippa):' : 'Contactless Tap-to-Pay (Blippa):'}
                  </strong>
                  {language === 'ar'
                    ? 'في ستوكهولم (SL)، لست بحاجة لشراء كرت مخصص؛ يمكنك وضع بطاقتك البنكية الفيزا أو الماستركارد أو جوالك (Apple Pay / Google Pay) مباشرة على بوابة المترو أو قارئ الباص.'
                    : 'In Stockholm (SL), simply tap your contactless bank card, Apple Pay, or Google Wallet directly on the ticket barrier or bus validator for an instant 75-minute single ticket.'}
                </div>
              </div>

              {/* Stockholm Metro & Rail Schematic Lines */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Bus className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'ar' ? 'خطوط مترو وقطارات ستوكهولم الرئيسية (SL):' : 'Stockholm Metro (Tunnelbana) & Train Lines:'}</span>
                  </h5>
                  <a
                    href="https://sl.se/aktuellt/kartor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'خرائط SL الرسمية PDF' : 'Official PDF Maps'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Green Line */}
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        T
                      </span>
                      <div>
                        <span className="font-black text-slate-800">
                          {language === 'ar' ? 'الخط الأخضر (Gröna Linjen)' : 'Green Line (Gröna Linjen)'}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          Hässelby strand ⇄ Farsta strand / Skarpnäck / Hagsätra
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      T17, T18, T19
                    </span>
                  </div>

                  {/* Red Line */}
                  <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        T
                      </span>
                      <div>
                        <span className="font-black text-slate-800">
                          {language === 'ar' ? 'الخط الأحمر (Röda Linjen)' : 'Red Line (Röda Linjen)'}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          Mörby centrum / Ropsten ⇄ Norsborg / Fruängen
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                      T13, T14
                    </span>
                  </div>

                  {/* Blue Line */}
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        T
                      </span>
                      <div>
                        <span className="font-black text-slate-800">
                          {language === 'ar' ? 'الخط الأزرق (Blå Linjen)' : 'Blue Line (Blå Linjen)'}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          Kungsträdgården ⇄ Hjulsta / Akalla
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                      T10, T11
                    </span>
                  </div>

                  {/* Pendeltåg */}
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#0A2540] text-white font-black text-xs flex items-center justify-center shadow-xs">
                        J
                      </span>
                      <div>
                        <span className="font-black text-slate-800">
                          {language === 'ar' ? 'قطار الضواحي (Pendeltåg)' : 'Commuter Train (Pendeltåg)'}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          Uppsala / Märsta / Arlanda ⇄ Södertälje / Nynäshamn
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                      J40, J41, J43
                    </span>
                  </div>
                </div>
              </div>

              {/* Transit Operators Across Sweden */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700">
                  {language === 'ar' ? 'تطبيقات ومواقع المواصلات الإقليمية:' : 'Regional Transit Operators:'}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <a
                    href="https://sl.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center font-bold text-slate-800 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-base">🚆</span>
                    <span>SL ستوكهولم</span>
                  </a>

                  <a
                    href="https://www.vasttrafik.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center font-bold text-slate-800 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-base">🚋</span>
                    <span>Västtrafik يوتوبوري</span>
                  </a>

                  <a
                    href="https://www.skanetrafiken.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center font-bold text-slate-800 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-base">🚌</span>
                    <span>Skånetrafiken مالمو</span>
                  </a>

                  <a
                    href="https://www.sj.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center font-bold text-slate-800 transition flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-base">🚅</span>
                    <span>SJ القطار الوطني</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            {language === 'ar' ? 'دليلك في السويد 🇸🇪 @dalelak.sweden' : 'Dalelak Sweden 🇸🇪 @dalelak.sweden'}
          </span>
          <button
            onClick={onClose}
            className="bg-[#0A2540] hover:bg-black text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer active:scale-95"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
