import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  Copy, 
  Calculator, 
  ShieldCheck, 
  FileText, 
  HeartHandshake, 
  Building, 
  GraduationCap, 
  Briefcase, 
  CreditCard, 
  Home, 
  Scale, 
  Search, 
  Share2,
  ListOrdered
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SWEDEN_PATHWAYS, PathwayItem } from '../data/pathways';

interface FastPathwaysNavigatorProps {
  onOpenTaxCalc?: () => void;
  onOpenSimulator?: () => void;
  onOpenAppeal?: () => void;
  onOpenCvModal?: () => void;
  onOpenDocExplainer?: () => void;
  onOpenChecklist?: () => void;
  onOpenLetterDrafter?: () => void;
}

export const FastPathwaysNavigator: React.FC<FastPathwaysNavigatorProps> = ({
  onOpenTaxCalc,
  onOpenSimulator,
  onOpenAppeal,
  onOpenCvModal,
  onOpenDocExplainer,
  onOpenChecklist,
  onOpenLetterDrafter,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Active Location Filter: 'outside' | 'inside'
  const [activeLocation, setActiveLocation] = useState<'outside' | 'inside'>('outside');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPathwayId, setExpandedPathwayId] = useState<string>('outside-work-permit-2026');
  const [completedSteps, setCompletedSteps] = useState<Record<string, Set<number>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Diagnostic Calculators Tab State
  const [activeTab, setActiveTab] = useState<'pathways' | 'checkers'>('pathways');
  const [checkerType, setCheckerType] = useState<'salary' | 'reunification' | 'citizenship' | 'fraud'>('salary');

  // Checker 1: Salary threshold inputs
  const [inputSalary, setInputSalary] = useState<number>(31000);
  const threshold2026 = 29680;

  // Checker 2: Reunification inputs
  const [reunificationAdults, setReunificationAdults] = useState<number>(2);
  const [reunificationChildren, setReunificationChildren] = useState<number>(1);
  const [reunificationRooms, setReunificationRooms] = useState<number>(2);
  const [reunificationNetSalary, setReunificationNetSalary] = useState<number>(24000);
  const [reunificationRent, setReunificationRent] = useState<number>(8500);

  // Checker 3: Citizenship inputs
  const [residenceCategory, setResidenceCategory] = useState<'regular' | 'married' | 'refugee'>('regular');
  const [arrivalYear, setArrivalYear] = useState<number>(2021);
  const [arrivalMonth, setArrivalMonth] = useState<number>(5);

  const toggleStep = (pathwayId: string, stepIdx: number) => {
    setCompletedSteps((prev) => {
      const currentSet = new Set(prev[pathwayId] || []);
      if (currentSet.has(stepIdx)) {
        currentSet.delete(stepIdx);
      } else {
        currentSet.add(stepIdx);
      }
      return { ...prev, [pathwayId]: currentSet };
    });
  };

  const handleCopyPlan = (item: PathwayItem) => {
    const title = language === 'ar' ? item.titleAr : item.titleEn;
    const solution = language === 'ar' ? item.quickSolutionAr : item.quickSolutionEn;
    const steps = language === 'ar' ? item.stepsAr : item.stepsEn;
    const critical = language === 'ar' ? item.criticalRule2026Ar : item.criticalRule2026En;

    const formattedText = `🇸🇪 ${title} - دليلك في السويد 2026\n\n⚡ ${language === 'ar' ? 'الحل السريع:' : 'Quick Solution:'}\n${solution}\n\n📋 ${language === 'ar' ? 'الخطوات العملية:' : 'Action Steps:'}\n${steps.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join('\n')}\n\n⚠️ ${language === 'ar' ? 'شروط 2026 الحاسمة:' : 'Critical 2026 Rule:'}\n${critical}\n\n🔗 ${language === 'ar' ? 'البوابة الرسمية:' : 'Official Portal:'} ${item.officialUrl}`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Filter pathways
  const filteredPathways = SWEDEN_PATHWAYS.filter((item) => {
    if (item.location !== activeLocation) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAr = item.titleAr.toLowerCase().includes(q) || item.summaryAr.toLowerCase().includes(q) || item.badgeAr.toLowerCase().includes(q);
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.summaryEn.toLowerCase().includes(q) || item.badgeEn.toLowerCase().includes(q);
      return matchAr || matchEn;
    }
    return true;
  });

  // Category tags based on location
  const categoriesOutside = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'work', labelAr: 'العمل وتأشيرة العمل', labelEn: 'Work & Visas' },
    { id: 'study', labelAr: 'الدراسة والجامعات', labelEn: 'University Study' },
    { id: 'family', labelAr: 'لمّ الشمل العائلي', labelEn: 'Family Reunification' },
    { id: 'visa', labelAr: 'فيزا السياحة والشنغن', labelEn: 'Schengen & Tourism' },
  ];

  const categoriesInside = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'id_banking', labelAr: 'الرقم الشخصي وBankID', labelEn: 'ID & Banking' },
    { id: 'housing', labelAr: 'السكن وعقود الإيجار', labelEn: 'Housing & Rent' },
    { id: 'rights', labelAr: 'حقوق العمل وصندوق A-kassa', labelEn: 'Worker Rights & A-kassa' },
    { id: 'citizenship', labelAr: 'الجنسية والإقامة الدائمة', labelEn: 'Citizenship & PR' },
    { id: 'healthcare', labelAr: 'الرعاية الصحية ورعاية الطفل', labelEn: 'Healthcare & Children' },
  ];

  const currentCategoryList = activeLocation === 'outside' ? categoriesOutside : categoriesInside;

  return (
    <div id="fast-pathways-navigator" className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#005293] to-sky-900 text-white p-4 sm:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FECC00]/20 text-[#FECC00] border border-[#FECC00]/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مستكشف المسارات والحلول السريعة 🇸🇪' : 'Sweden Fast Pathways & Solutions Navigator 🇸🇪'}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-snug">
              {language === 'ar'
                ? 'حلول موثوقة ومباشرة للجميع: من خارج السويد وداخلها'
                : 'Verified Fast Roadmaps for Everyone: Inside & Outside Sweden'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'سواء كنت تخطط للانتقال، العمل، الدراسة، أو تعيش حالياً في السويد وتبحث عن حلول للسكن، الضرائب، المعاملات، أو الجنسية وفق قوانين 2026 المحدثة.'
                : 'Whether planning to move, work, study, or already living in Sweden navigating housing, banking, taxes, or citizenship per 2026 rules.'}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-2xl border border-white/10 shrink-0 self-start sm:self-center">
            <button
              id="navigator-tab-pathways"
              onClick={() => setActiveTab('pathways')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pathways'
                  ? 'bg-[#FECC00] text-[#0A2540] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الأدلة والمسارات' : 'Pathways & Guides'}</span>
            </button>
            <button
              id="navigator-tab-checkers"
              onClick={() => setActiveTab('checkers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'checkers'
                  ? 'bg-[#FECC00] text-[#0A2540] shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'فواحص الأهلية الفورية' : 'Fast Diagnostic Checkers'}</span>
            </button>
          </div>
        </div>

        {/* Primary Location Switcher (Inside vs Outside) */}
        <div className="mt-5 grid grid-cols-2 gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-white/10">
          <button
            id="location-tab-outside"
            onClick={() => {
              setActiveLocation('outside');
              setSelectedCategory('all');
              setExpandedPathwayId('outside-work-permit-2026');
            }}
            className={`py-2.5 sm:py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${
              activeLocation === 'outside'
                ? 'bg-white text-[#0A2540] shadow-md ring-2 ring-[#FECC00]'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Globe2 className={`w-4 h-4 ${activeLocation === 'outside' ? 'text-[#005293]' : 'text-slate-300'}`} />
            <span>{language === 'ar' ? '🌍 أنا خارج السويد (أرغب بالقدوم)' : '🌍 Outside Sweden (Planning to Move)'}</span>
          </button>

          <button
            id="location-tab-inside"
            onClick={() => {
              setActiveLocation('inside');
              setSelectedCategory('all');
              setExpandedPathwayId('inside-first-90-days');
            }}
            className={`py-2.5 sm:py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 ${
              activeLocation === 'inside'
                ? 'bg-white text-[#0A2540] shadow-md ring-2 ring-[#FECC00]'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <MapPin className={`w-4 h-4 ${activeLocation === 'inside' ? 'text-emerald-600' : 'text-slate-300'}`} />
            <span>{language === 'ar' ? '🇸🇪 أنا داخل السويد (أعيش فيها)' : '🇸🇪 Inside Sweden (Living Here)'}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === 'pathways' ? (
          <>
            {/* Category Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {currentCategoryList.map((cat) => (
                  <button
                    key={cat.id}
                    id={`filter-pill-${cat.id}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-[#005293] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {language === 'ar' ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Quick Search */}
              <div className="relative shrink-0 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute top-3 start-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث في الحلول السريعة...' : 'Search fast solutions...'}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl ps-9 pe-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005293]"
                />
              </div>
            </div>

            {/* Pathways List */}
            <div className="space-y-4">
              {filteredPathways.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-sm font-bold text-slate-500">
                    {language === 'ar' ? 'لم يتم العثور على حلول مطابقة للبحث' : 'No matching solutions found'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-2 text-xs text-[#005293] font-bold hover:underline"
                  >
                    {language === 'ar' ? 'إعادة تعيين المرشحات' : 'Reset filters'}
                  </button>
                </div>
              ) : (
                filteredPathways.map((item) => {
                  const isExpanded = expandedPathwayId === item.id;
                  const itemSteps = language === 'ar' ? item.stepsAr : item.stepsEn;
                  const completedCount = completedSteps[item.id]?.size || 0;
                  const totalSteps = itemSteps.length;
                  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

                  return (
                    <div
                      key={item.id}
                      id={`pathway-item-${item.id}`}
                      className={`border rounded-2xl transition overflow-hidden ${
                        isExpanded ? 'border-[#005293] ring-1 ring-[#005293]/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Summary Banner Bar */}
                      <div
                        onClick={() => setExpandedPathwayId(isExpanded ? '' : item.id)}
                        className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer bg-slate-50/70 hover:bg-slate-50 select-none"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold bg-[#005293]/10 text-[#005293] px-2.5 py-0.5 rounded-full border border-[#005293]/20">
                              {language === 'ar' ? item.badgeAr : item.badgeEn}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                              <span>⏱️ {language === 'ar' ? item.timeframeAr : item.timeframeEn}</span>
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                            {language === 'ar' ? item.titleAr : item.titleEn}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {language === 'ar' ? item.summaryAr : item.summaryEn}
                          </p>

                          {/* Progress indicator */}
                          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                            <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-700">
                              {completedCount}/{totalSteps} {language === 'ar' ? 'خطوات منجزة' : 'steps checked'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            type="button"
                            className="text-xs font-bold text-[#005293] flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs hover:bg-slate-100 transition"
                          >
                            <span>{isExpanded ? (language === 'ar' ? 'إخفاء التفاصيل' : 'Collapse') : (language === 'ar' ? 'عرض الحل السريع' : 'View Solution')}</span>
                            <ArrowIcon className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-5 animate-in fade-in-50 duration-200">
                          
                          {/* 1. Fast Diagnosis & Quick Solution Box */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-xl bg-[#005293] text-white flex items-center justify-center shrink-0 text-xs font-black shadow-xs">
                                ⚡
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-black text-[#005293] uppercase tracking-wider">
                                  {language === 'ar' ? 'التشخيص والحل السريع الفوري' : 'Instant Diagnosis & Direct Solution'}
                                </h4>
                                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                                  {language === 'ar' ? item.quickSolutionAr : item.quickSolutionEn}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-blue-200/60 pt-3">
                              <div className="text-slate-600">
                                <span className="font-bold text-slate-800">{language === 'ar' ? '💰 التكلفة الرسمية: ' : '💰 Official Cost: '}</span>
                                <span>{language === 'ar' ? item.costAr : item.costEn}</span>
                              </div>
                              <div className="text-slate-600">
                                <span className="font-bold text-slate-800">{language === 'ar' ? '🏛️ الجهة المختصة: ' : '🏛️ Authority: '}</span>
                                <span>{language === 'ar' ? item.officialAuthorityAr : item.officialAuthorityEn}</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Step-by-Step Interactive Action Plan */}
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <h4 className="font-black text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>{language === 'ar' ? 'الخطوات العملية بالترتيب (حدد ما أنجزته)' : 'Action Steps in Sequence (Check progress)'}</span>
                              </h4>
                              <button
                                onClick={() => handleCopyPlan(item)}
                                className="text-xs font-bold text-[#005293] hover:text-blue-800 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition"
                                title={language === 'ar' ? 'نسخ الخطة بالكامل' : 'Copy action plan'}
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copiedId === item.id ? (language === 'ar' ? 'تم النسخ بنجاح! ✓' : 'Copied! ✓') : (language === 'ar' ? 'نسخ الخطة' : 'Copy Plan')}</span>
                              </button>
                            </div>

                            <div className="space-y-2">
                              {itemSteps.map((step, idx) => {
                                const isDone = completedSteps[item.id]?.has(idx);
                                return (
                                  <div
                                    key={idx}
                                    onClick={() => toggleStep(item.id, idx)}
                                    className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 select-none ${
                                      isDone ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200'
                                    }`}
                                  >
                                    <div className="pt-0.5">
                                      <div
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition ${
                                          isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'
                                        }`}
                                      >
                                        ✓
                                      </div>
                                    </div>
                                    <div className="space-y-0.5 flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className={`text-xs font-black ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                          {idx + 1}. {step.title}
                                        </span>
                                        {step.authority && (
                                          <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded font-bold shrink-0">
                                            {step.authority}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-slate-600 leading-relaxed">
                                        {step.desc}
                                      </p>
                                      {step.warning && (
                                        <div className="mt-1 flex items-start gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 p-1.5 rounded-lg">
                                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
                                          <span>{step.warning}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* 3. Critical 2026 Rule & Warnings */}
                          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-black text-amber-800">
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                              <span>{language === 'ar' ? 'قاعدة حاسمة لعام 2026 يجب الانتباه لها' : 'Critical 2026 Statutory Rule'}</span>
                            </div>
                            <p className="text-xs text-amber-900 leading-relaxed font-medium">
                              {language === 'ar' ? item.criticalRule2026Ar : item.criticalRule2026En}
                            </p>

                            <div className="pt-2 border-t border-amber-200/70">
                              <span className="text-[11px] font-bold text-amber-900 block mb-1">
                                {language === 'ar' ? 'أخطاء شائعة تسبب الرفض أو الخسارة:' : 'Common pitfalls leading to denial:'}
                              </span>
                              <ul className="space-y-1 text-[11px] text-amber-800 ps-4 list-disc">
                                {(language === 'ar' ? item.commonMistakesAr : item.commonMistakesEn).map((m, mIdx) => (
                                  <li key={mIdx}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* 4. Action Bar (Official Portal + Tools) */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                            <a
                              href={item.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 bg-[#005293] hover:bg-[#0A2540] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition active:scale-95"
                            >
                              <span>{language === 'ar' ? `الانتقال إلى البوابة الرسمية (${item.officialPortalName})` : `Open Official Portal (${item.officialPortalName})`}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Related Dalelak Tool link if applicable */}
                            <div className="flex items-center gap-2">
                              {item.toolRecommendation === 'tax_calc' && onOpenTaxCalc && (
                                <button
                                  onClick={onOpenTaxCalc}
                                  className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <Calculator className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'حاسبة الراتب والضرائب' : 'Salary & Tax Calc'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'simulator' && onOpenSimulator && (
                                <button
                                  onClick={onOpenSimulator}
                                  className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'محاكي المقابلات' : 'Interview Simulator'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'appeal' && onOpenAppeal && (
                                <button
                                  onClick={onOpenAppeal}
                                  className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <Scale className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'مساعد الاعتراض' : 'Appeal Helper'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'checklist' && onOpenChecklist && (
                                <button
                                  onClick={onOpenChecklist}
                                  className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'قائمة مهام الواصل الجديد' : 'Newcomer Checklist'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'cv_assistant' && onOpenCvModal && (
                                <button
                                  onClick={onOpenCvModal}
                                  className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'منشئ السيرة الذاتية السويدية' : 'Swedish CV Drafter'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'doc_explainer' && onOpenDocExplainer && (
                                <button
                                  onClick={onOpenDocExplainer}
                                  className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <Search className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'شارح الأوراق الرسمية' : 'Document Scanner'}</span>
                                </button>
                              )}
                              {item.toolRecommendation === 'letter_drafter' && onOpenLetterDrafter && (
                                <button
                                  onClick={onOpenLetterDrafter}
                                  className="text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>{language === 'ar' ? 'صياغة رسالة رسمية' : 'Official Letter Drafter'}</span>
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          /* ========================================== */
          /* Fast Diagnostic Checkers (فواحص الأهلية الفورية) */
          /* ========================================== */
          <div className="space-y-6">
            {/* Checker Sub-tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-200">
              <button
                onClick={() => setCheckerType('salary')}
                className={`whitespace-nowrap px-3.5 py-2 rounded-t-xl text-xs font-black border-b-2 transition flex items-center gap-1.5 ${
                  checkerType === 'salary'
                    ? 'border-[#005293] text-[#005293] bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'فاحص راتب تصريح العمل (2026)' : 'Work Permit Salary Check'}</span>
              </button>

              <button
                onClick={() => setCheckerType('reunification')}
                className={`whitespace-nowrap px-3.5 py-2 rounded-t-xl text-xs font-black border-b-2 transition flex items-center gap-1.5 ${
                  checkerType === 'reunification'
                    ? 'border-[#005293] text-[#005293] bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'فاحص سكن ودخل لمّ الشمل' : 'Reunification Housing & Income'}</span>
              </button>

              <button
                onClick={() => setCheckerType('citizenship')}
                className={`whitespace-nowrap px-3.5 py-2 rounded-t-xl text-xs font-black border-b-2 transition flex items-center gap-1.5 ${
                  checkerType === 'citizenship'
                    ? 'border-[#005293] text-[#005293] bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'حاسبة موعد استحقاق الجنسية' : 'Citizenship Date Calc'}</span>
              </button>

              <button
                onClick={() => setCheckerType('fraud')}
                className={`whitespace-nowrap px-3.5 py-2 rounded-t-xl text-xs font-black border-b-2 transition flex items-center gap-1.5 ${
                  checkerType === 'fraud'
                    ? 'border-[#005293] text-[#005293] bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'كاشف أمان العقود والاحتيال' : 'Contract & Anti-Fraud Radar'}</span>
              </button>
            </div>

            {/* Checker 1: Work Permit Salary Threshold 2026 */}
            {checkerType === 'salary' && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#005293]" />
                    <span>{language === 'ar' ? 'فاحص شرط الحد الأدنى للراتب لتصريح العمل (2026)' : '2026 Work Permit Salary Threshold Evaluator'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'حدد الراتب الشهري الإجمالي (Bruttolön) المعروض عليك للتأكد الفوري من مطابقته لشرط مصلحة الهجرة الإلزامي لعام 2026 (80% من متوسط الرواتب السويدية = 29,680 كرون).'
                      : 'Input the gross monthly salary in SEK to verify against the mandatory 80% median wage threshold (29,680 SEK) required by Migrationsverket.'}
                  </p>
                </div>

                <div className="max-w-md space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    {language === 'ar' ? 'الراتب الإجمالي قبل الضريبة (كرون سويدي شهرياً):' : 'Gross salary before tax (SEK/month):'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={500}
                      min={10000}
                      max={120000}
                      value={inputSalary}
                      onChange={(e) => setInputSalary(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#005293]"
                    />
                    <span className="text-xs font-black text-slate-500 shrink-0">SEK/mån</span>
                  </div>
                  <input
                    type="range"
                    min={18000}
                    max={60000}
                    step={500}
                    value={inputSalary}
                    onChange={(e) => setInputSalary(Number(e.target.value))}
                    className="w-full accent-[#005293]"
                  />
                </div>

                {/* Verdict Card */}
                {inputSalary >= threshold2026 ? (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>
                        {language === 'ar'
                          ? `مؤهل قانوناً لتصريح العمل لعام 2026! (+${(inputSalary - threshold2026).toLocaleString()} كرون فوق الحد الأدنى)`
                          : `Eligible for 2026 Work Permit! (+${(inputSalary - threshold2026).toLocaleString()} SEK above threshold)`}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      {language === 'ar'
                        ? 'الراتب المعروض عليك يتجاوز شرط الحد الأدنى الإلزامي (29,680 كرون). تأكد أيضاً من إعلان صاحب العمل للوظيفة لمدة 10 أيام في EURES وتوفير حزم التأمين الأربعة الإلزامية عبر النقابة (Kollektivavtal).'
                        : 'The offered salary clears the statutory threshold (29,680 SEK). Ensure your employer also ran the 10-day EURES ad and provides the 4 collective agreement insurances.'}
                    </p>
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>
                        {language === 'ar'
                          ? `غير مؤهل! الراتب أقل بـ ${(threshold2026 - inputSalary).toLocaleString()} كرون من الحد القانوني`
                          : `Ineligible! Salary is ${(threshold2026 - inputSalary).toLocaleString()} SEK below statutory threshold`}
                      </span>
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      {language === 'ar'
                        ? 'إذا تم تقديم طلب تصريح العمل بهذا الراتب، فسيتم رفضه حتماً من مصلحة الهجرة. اطلب من صاحب العمل رفع الراتب إلى 29,680 كرون على الأقل أو تعديل نسبة الدوام لتطابق المعايير.'
                        : 'Submitting a work permit application at this wage triggers automatic rejection. Request the employer adjust gross pay to at least 29,680 SEK before filing.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Checker 2: Reunification Housing & Income */}
            {checkerType === 'reunification' && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-5">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#005293]" />
                    <span>{language === 'ar' ? 'فاحص شروط السكن والدخل للمّ الشمل (Försörjningskrav)' : 'Reunification Housing & Income Sufficiency Check'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'تحقق هل مساحة شقتك ودخلك الصافي المتبقي بعد دفع الإيجار كافيان قانوناً لاستقدام أفراد أسرتك إلى السويد.'
                      : 'Test whether your apartment bedroom count and net disposable income after rent fulfill statutory family sponsorship rules.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'عدد البالغين القاطنين (أنت والشريك):' : 'Number of cohabiting adults:'}
                    </label>
                    <select
                      value={reunificationAdults}
                      onChange={(e) => setReunificationAdults(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    >
                      <option value={1}>{language === 'ar' ? '1 بالغ (أنت فقط)' : '1 adult'}</option>
                      <option value={2}>{language === 'ar' ? '2 بالغين (أنت والشريك/الزوجة)' : '2 adults (Spouses)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'عدد الأطفال القادمين:' : 'Number of dependent children:'}
                    </label>
                    <select
                      value={reunificationChildren}
                      onChange={(e) => setReunificationChildren(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    >
                      <option value={0}>{language === 'ar' ? 'بدون أطفال' : '0 children'}</option>
                      <option value={1}>{language === 'ar' ? 'طفل واحد' : '1 child'}</option>
                      <option value={2}>{language === 'ar' ? 'طفلان' : '2 children'}</option>
                      <option value={3}>{language === 'ar' ? '3 أطفال أو أكثر' : '3+ children'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'عدد غرف النوم في السكن (عدا الصالة والمطبخ):' : 'Number of separate bedrooms (excluding living room):'}
                    </label>
                    <select
                      value={reunificationRooms}
                      onChange={(e) => setReunificationRooms(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    >
                      <option value={1}>{language === 'ar' ? 'غرفة نوم واحدة + صالة (2 rum och kök)' : '1 bedroom + living room (2 ROK)'}</option>
                      <option value={2}>{language === 'ar' ? 'غرفتا نوم + صالة (3 rum och kök)' : '2 bedrooms + living room (3 ROK)'}</option>
                      <option value={3}>{language === 'ar' ? '3 غرف نوم أو أكثر (4+ ROK)' : '3+ bedrooms (4+ ROK)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'الإيجار الشهري للشقة (كرون):' : 'Monthly rent cost (SEK):'}
                    </label>
                    <input
                      type="number"
                      value={reunificationRent}
                      onChange={(e) => setReunificationRent(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'صافي راتبك الشهري المستلم في حسابك بعد الضريبة (كرون):' : 'Your net monthly take-home salary after tax (SEK):'}
                    </label>
                    <input
                      type="number"
                      value={reunificationNetSalary}
                      onChange={(e) => setReunificationNetSalary(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Calculations */}
                {(() => {
                  const requiredLivingStandard = reunificationChildren === 0 ? 1 : Math.min(reunificationChildren, 3);
                  const isHousingSufficient = reunificationRooms >= requiredLivingStandard;
                  
                  // Required disposable maintenance (Normalbelopp)
                  const baseCouple = 10061;
                  const perChild = 3055;
                  const totalRequiredDisposable = baseCouple + (reunificationChildren * perChild);
                  const remainingDisposable = reunificationNetSalary - reunificationRent;
                  const isIncomeSufficient = remainingDisposable >= totalRequiredDisposable;

                  return (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Housing Verdict */}
                        <div className={`p-3.5 rounded-xl border ${isHousingSufficient ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                          <div className="flex items-center gap-1.5 font-black text-xs">
                            {isHousingSufficient ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                            <span>{language === 'ar' ? 'شرط مساحة السكن' : 'Housing Standard'}</span>
                          </div>
                          <p className="text-[11px] mt-1">
                            {isHousingSufficient
                              ? (language === 'ar' ? 'مستوفٍ! عدد الغرف كافٍ لعدد أفراد العائلة المحددين.' : 'Satisfied! Bedroom count meets family size rules.')
                              : (language === 'ar' ? `غير كافٍ! تحتاج إلى ${requiredLivingStandard} غرف نوم على الأقل.` : `Insufficient! You need at least ${requiredLivingStandard} bedrooms.`)}
                          </p>
                        </div>

                        {/* Income Verdict */}
                        <div className={`p-3.5 rounded-xl border ${isIncomeSufficient ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                          <div className="flex items-center gap-1.5 font-black text-xs">
                            {isIncomeSufficient ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                            <span>{language === 'ar' ? 'شرط الدخل المتبقي بعد الإيجار' : 'Disposable Income Test'}</span>
                          </div>
                          <p className="text-[11px] mt-1">
                            {language === 'ar'
                              ? `المتبقي لديك: ${remainingDisposable.toLocaleString()} كرون (المطلوب قانوناً: ${totalRequiredDisposable.toLocaleString()} كرون)`
                              : `Your disposable: ${remainingDisposable.toLocaleString()} SEK (Required: ${totalRequiredDisposable.toLocaleString()} SEK)`}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                        <span className="font-bold">{language === 'ar' ? 'توجيه هام: ' : 'Crucial Guidance: '}</span>
                        {isHousingSufficient && isIncomeSufficient
                          ? (language === 'ar' ? 'ملفك يستوفي المعايير الأساسية لمصلحة الهجرة. احرص على تصديق عقد الإيجار وموافقة المالك وشهادات الرواتب لآخر 6 أشهر.' : 'Your file meets primary criteria. Ensure formal landlord sublet authorization and 6 months payslips are attached.')
                          : (language === 'ar' ? 'يُنصح بعدم التقديم قبل تصحيح النقص (سواء بالانتقال لشقة أكبر أو زيادة الدخل الثابت) لتفادي صدور قرار رفض رسمي بعد أشهر من الانتظار.' : 'Avoid submitting until rectifying deficits (larger flat or enhanced permanent earnings) to avoid a costly refusal.')}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Checker 3: Citizenship Timeline */}
            {checkerType === 'citizenship' && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#005293]" />
                    <span>{language === 'ar' ? 'حاسبة موعد استحقاق التقديم على الجنسية السويدية' : 'Swedish Citizenship Eligibility Calculator'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'احسب التاريخ الدقيق الذي يحق لك فيه إرسال طلب الجنسية لمصلحة الهجرة استناداً لصفة إقامتك وتاريخ استقرارك.'
                      : 'Calculate your exact earliest application date for Swedish citizenship based on residency status and arrival date.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'صفة الإقامة أو الارتباط:' : 'Residency Category:'}
                    </label>
                    <select
                      value={residenceCategory}
                      onChange={(e) => setResidenceCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    >
                      <option value="regular">{language === 'ar' ? 'إقامة عمل / عادية (5 سنوات)' : 'Standard / Work Permit (5 years)'}</option>
                      <option value="married">{language === 'ar' ? 'متزوج من مواطن سويدي (3 سنوات)' : 'Married to Swedish Citizen (3 years)'}</option>
                      <option value="refugee">{language === 'ar' ? 'لاجئ اتفاقية جنيف (4 سنوات)' : 'Geneva Refugee (4 years)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'سنة بدء الإقامة النظامية في السويد:' : 'Arrival / Registered Year:'}
                    </label>
                    <input
                      type="number"
                      min={2015}
                      max={2026}
                      value={arrivalYear}
                      onChange={(e) => setArrivalYear(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'الشهر:' : 'Month:'}
                    </label>
                    <select
                      value={arrivalMonth}
                      onChange={(e) => setArrivalMonth(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          {language === 'ar' ? `شهر ${m}` : `Month ${m}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Calculation */}
                {(() => {
                  const yearsRequired = residenceCategory === 'married' ? 3 : residenceCategory === 'refugee' ? 4 : 5;
                  const eligibleYear = arrivalYear + yearsRequired;
                  const currentYear = 2026;
                  const isEligibleNow = eligibleYear < currentYear || (eligibleYear === currentYear && arrivalMonth <= 9);

                  return (
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🇸🇪</span>
                        <div>
                          <div className="text-xs text-slate-500 font-bold">
                            {language === 'ar' ? 'تاريخ الاستحقاق المحسوب:' : 'Calculated Eligible Date:'}
                          </div>
                          <div className="text-base font-black text-[#005293]">
                            {language === 'ar' ? `شهر ${arrivalMonth} من عام ${eligibleYear}` : `Month ${arrivalMonth}, ${eligibleYear}`}
                          </div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isEligibleNow ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
                        {isEligibleNow
                          ? (language === 'ar' ? 'أنت مستوفٍ للمدة الزمنية الآن! يمكنك تقديم الطلب فوراً إذا كان جواز سفرك سارياً وخالياً من ديون Kronofogden.' : 'You fulfill the time requirement now! You may apply immediately with a valid passport and no unpaid debts.')
                          : (language === 'ar' ? `تبقى لك حوالي ${eligibleYear - currentYear} سنة / أشهر لاكتمال المدة القانونية.` : `You have approx. ${eligibleYear - currentYear} years/months remaining until reaching the statutory period.`)}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Checker 4: Anti-Fraud Safety Radar */}
            {checkerType === 'fraud' && (
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'ar' ? 'رادار كشف الأمان والاحتيال في عقود السكن والعمل' : 'Contract & Housing Anti-Fraud Radar'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'تحقق من هذه الإشارات التحذيرية الخمس قبل تحويل أي مبالغ أو توقيع أي عقد في السويد:'
                      : 'Check these 5 critical warning flags before sending money or signing any Swedish agreement:'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-xl border border-rose-200 flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm">🚩</span>
                    <div>
                      <h4 className="text-xs font-black text-rose-900">
                        {language === 'ar' ? 'طلب تحويل عربون عبر Swish أو ويسترن يونيون قبل المعاينة' : 'Demanding deposit via Swish/transfer before physical viewing'}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {language === 'ar' ? 'احتيال بنسبة 100%! لا تدفع أي كرون قبل دخول الشقة والتحقق من هوية المؤجر ومفاتيحه.' : '100% scam indicator! Never remit funds prior to visiting the flat with verified keys.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm">🚩</span>
                    <div>
                      <h4 className="text-xs font-black text-rose-900">
                        {language === 'ar' ? 'بيع عقود عمل أو عقود سكن يد أولى بمقابل مالي' : 'Selling work permits or first-hand rental contracts for money'}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {language === 'ar' ? 'جريمة يعاقب عليها القانون السويدي بالسجن وتؤدي لسحب إقامتك فوراً وإدراجك بالقائمة السوداء.' : 'Illegal under Swedish criminal code; leads to prompt permit revocation and blacklisting.'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-rose-200 flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm">🚩</span>
                    <div>
                      <h4 className="text-xs font-black text-rose-900">
                        {language === 'ar' ? 'غياب موافقة جمعية البناء (BRF) في عقود الإيجار من الباطن' : 'Absence of housing association (BRF) written sublease consent'}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {language === 'ar' ? 'عقد أسود غير شرعي يمنح المالك طردك في أي لحظة دون سابق إنذار.' : 'Unauthorized black lease, granting immediate grounds for sudden eviction.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
