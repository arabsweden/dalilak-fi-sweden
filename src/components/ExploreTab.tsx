import React, { useState } from 'react';
import { Volume2, Heart, ArrowLeft, ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { GUIDES_DATABASE, getLocalizedGuide } from '../data/guides';
import { SWEDISH_DICTIONARY, getLocalizedDictionaryItem } from '../data/dictionary';
import { Guide } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExploreTabProps {
  initialCategory?: string;
  onOpenGuideModal: (guide: Guide) => void;
  onToggleBookmark: (guideId: string) => void;
  savedBookmarkIds: Set<string>;
  onOpenChecklist: () => void;
  onOpenCvModal: () => void;
  readGuideIds?: Set<string>;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  initialCategory = 'all',
  onOpenGuideModal,
  onToggleBookmark,
  savedBookmarkIds,
  onOpenChecklist,
  onOpenCvModal,
  readGuideIds,
}) => {
  const { language, isRTL, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { id: 'immigration', label: language === 'ar' ? '🛂 الهجرة والإقامة' : '🛂 Migration & Residence' },
    { id: 'asylum', label: language === 'ar' ? '🛡️ اللجوء والحماية' : '🛡️ Asylum & Protection' },
    { id: 'authorities', label: language === 'ar' ? '🏛️ الدوائر الحكومية' : '🏛️ Government Agencies' },
    { id: 'work', label: language === 'ar' ? '💼 العمل' : '💼 Work & Careers' },
    { id: 'housing', label: language === 'ar' ? '🏠 السكن' : '🏠 Housing & Renting' },
    { id: 'family', label: language === 'ar' ? '👨‍👩‍👧‍👦 الأسرة والمدارس' : '👨‍👩‍👧‍👦 Family & Schools' },
    { id: 'stockholm', label: language === 'ar' ? '📍 ستوكهولم' : '📍 Stockholm' },
    { id: 'tourism', label: language === 'ar' ? '🏙️ السياحة والسفر' : '🏙️ Tourism & Travel' },
    { id: 'language', label: language === 'ar' ? '📚 قاموس السويد' : '📚 Swedish Dictionary' },
    { id: 'news', label: language === 'ar' ? '🔔 تحديثات 2026' : '🔔 2026 Updates' },
  ];

  const rawGuides = selectedCategory === 'all'
    ? GUIDES_DATABASE
    : GUIDES_DATABASE.filter((g) => g.category === selectedCategory);

  const filteredGuides = rawGuides.map((g) => getLocalizedGuide(g, language));

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* Section Title & Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {language === 'ar' ? 'مكتبة الأدلة والموضوعات 🇸🇪' : 'Guides & Topic Library 🇸🇪'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ar'
                ? 'شروحات مبسطة مع روابط المصادر الرسمية وتواريخ التحديث'
                : 'Clear guides with official Swedish government links and updated regulations'}
            </p>
          </div>
          <button
            onClick={onOpenChecklist}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-100 transition active:scale-95"
          >
            <span>{language === 'ar' ? 'قائمة مهام القادمين' : 'Newcomer Checklist'}</span>
          </button>
        </div>

        {/* Filter categories tags (Horizontally scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swedish Mini Dictionary Panel (when 'language' is selected) */}
      {selectedCategory === 'language' ? (
        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇸🇪 ↔️ {language === 'ar' ? '🇦🇪' : '🇬🇧'}</span>
              <div>
                <h3 className="font-extrabold text-base text-slate-800">
                  {language === 'ar' ? 'قاموس السويد المعتمد للمصطلحات اليومية' : 'Swedish Daily Life & Government Terms'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'اضغط على أيقونة السماعة 🔊 لسماع النطق السويدي الصحيح' : 'Click the speaker icon 🔊 to hear clear Swedish pronunciation'}
                </p>
              </div>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">
              {language === 'ar' ? 'صوتي تفاعلي' : 'Interactive Audio'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SWEDISH_DICTIONARY.map((item, idx) => {
              const localized = getLocalizedDictionaryItem(item, language);
              return (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 hover:border-[#005293] transition flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-[#0A2540] tracking-wide">{localized.swedish}</h4>
                      <p className="text-xs font-bold text-[#005293] mt-0.5">{localized.translation}</p>
                    </div>
                    <button
                      onClick={() => handleSpeak(localized.swedish)}
                      title={language === 'ar' ? 'استمع للنطق' : 'Listen to pronunciation'}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-[#005293] hover:text-white text-slate-600 transition flex items-center justify-center active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{localized.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* CV Assistant Banner (when 'work' is selected or 'all') */}
          {(selectedCategory === 'work' || selectedCategory === 'all') && (
            <div className="bg-gradient-to-r from-blue-900 to-[#0A2540] text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-[#FECC00]/20 text-[#FECC00] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'ar' ? 'أداة مدعومة بـ Gemini AI' : 'Powered by Gemini AI'}</span>
                </div>
                <h4 className="font-black text-sm">
                  {language === 'ar' ? 'مساعد السيرة الذاتية السويدية الذكي (CV & Personligt Brev)' : 'Swedish CV & Cover Letter Assistant (CV & Personligt brev)'}
                </h4>
                <p className="text-xs text-slate-300">
                  {language === 'ar' ? 'توليد نموذج سيرة ذاتية وخطاب تقديمي متوافقين بدقة مع سوق العمل السويدي' : 'Generate tailor-made Swedish CVs and personal letters adhering to Swedish recruitment norms'}
                </p>
              </div>
              <button
                onClick={onOpenCvModal}
                className="bg-[#FECC00] hover:bg-yellow-400 text-[#0A2540] font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition whitespace-nowrap active:scale-95 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'ابدأ ترتيب الـ CV' : 'Start CV Drafter'}</span>
              </button>
            </div>
          )}

          {/* Guides List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGuides.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed p-6">
                <p className="text-xs">{language === 'ar' ? 'لا توجد موضوعات مضافة تحت هذا التصنيف حالياً.' : 'No guides found under this category yet.'}</p>
              </div>
            ) : (
              filteredGuides.map((guide) => {
                const isSaved = savedBookmarkIds.has(guide.id);
                return (
                  <div
                    key={guide.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold bg-blue-50 text-[#005293] px-2.5 py-0.5 rounded-full border border-blue-100">
                            {guide.tag}
                          </span>
                          {readGuideIds?.has(guide.id) && (
                            <span className="text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{language === 'ar' ? 'مقروء' : 'Read'}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {language === 'ar' ? 'تحديث' : 'Updated'}: {guide.lastUpdated}
                        </span>
                      </div>

                      <h3
                        onClick={() => onOpenGuideModal(guide)}
                        className="font-extrabold text-sm text-slate-900 leading-snug hover:text-[#005293] cursor-pointer transition"
                      >
                        {guide.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {guide.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[140px]">{guide.authority.split('–')[0]}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleBookmark(guide.id)}
                          className="w-8 h-8 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 transition flex items-center justify-center text-xs active:scale-95"
                          title={isSaved ? (language === 'ar' ? 'محفوظ' : 'Saved') : (language === 'ar' ? 'حفظ' : 'Save')}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => onOpenGuideModal(guide)}
                          className="bg-[#0A2540] hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 active:scale-95"
                        >
                          <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
                          <ArrowIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

    </div>
  );
};
