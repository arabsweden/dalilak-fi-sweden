import React from 'react';
import { X, ExternalLink, Heart, Share2, HelpCircle, Users, ClipboardList, Footprints, AlertTriangle, CheckCircle2, Printer } from 'lucide-react';
import { Guide } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedGuide } from '../../data/guides';

interface GuideDetailModalProps {
  guide: Guide | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (guideId: string) => void;
  onShare: (guide: Guide) => void;
  isRead?: boolean;
  onToggleRead?: (guideId: string) => void;
}

export const GuideDetailModal: React.FC<GuideDetailModalProps> = ({
  guide,
  onClose,
  isSaved,
  onToggleBookmark,
  onShare,
  isRead = false,
  onToggleRead,
}) => {
  const { language } = useLanguage();

  if (!guide) return null;

  const localizedGuide = getLocalizedGuide(guide, language);

  const handlePrint = () => {
    window.print();
  };

  const currentDateFormatted = new Date().toLocaleDateString(
    language === 'ar' ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div
      id="guide-detail-modal-container"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible"
    >
      <div
        id="printable-guide-modal"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150 print:max-h-none print:shadow-none print:rounded-none print:border-none print:w-full print:max-w-none print:p-2"
      >
        
        {/* Print-Only Official Document Header */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900">🇸🇪 دليلك في السويد</span>
              <span className="text-xs text-slate-600 font-bold border-s border-slate-400 ps-2">
                Dalelak Sweden • دليل رسمي مطبوع
              </span>
            </div>
            <div className="text-end text-[10px] text-slate-600 space-y-0.5">
              <div><strong>تاريخ الطباعة:</strong> {currentDateFormatted}</div>
              <div><strong>الجهة الرسمية:</strong> {localizedGuide.authority}</div>
            </div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between gap-3 border-b border-slate-800 print:bg-white print:text-black print:p-0 print:border-b-2 print:border-slate-800 print:pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#FECC00]/20 text-[#FECC00] border border-[#FECC00]/30 text-[10px] px-2 py-0.5 rounded font-bold print:border-slate-800 print:text-black print:bg-slate-100">
                {localizedGuide.tag}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 print:border print:border-slate-400 print:text-black print:bg-slate-50">
                <CheckCircle2 className="w-2.5 h-2.5 print:hidden" />
                <span>{language === 'ar' ? 'مصدر رسمي موثق' : 'Verified Official Authority'}</span>
              </span>
              {isRead && (
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 print:hidden">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>{language === 'ar' ? 'مقروء ✓' : 'Read ✓'}</span>
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug print:text-xl print:text-black print:font-black">
              {localizedGuide.title}
            </h3>
            <p className="text-[11px] text-slate-400 print:text-slate-600">
              {language === 'ar' ? 'آخر تحديث للقوانين:' : 'Last verified update:'} {localizedGuide.lastUpdated}
            </p>
          </div>

          {/* Action buttons in header (Print + Close) */}
          <div className="flex items-center gap-1.5 print:hidden">
            <button
              id="print-guide-header-btn"
              type="button"
              onClick={handlePrint}
              title={language === 'ar' ? 'طباعة الدليل (نسخة ورقية مبسطة)' : 'Print Guide (Simplified physical copy)'}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
            >
              <Printer className="w-4 h-4 text-amber-400" />
            </button>

            <button
              id="close-guide-detail-modal"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div
          id="printable-guide-body"
          className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800 text-xs sm:text-sm flex-1 print:overflow-visible print:p-0 print:space-y-3"
        >
          
          {/* Section 1: What is it? */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 print-break-inside-avoid print:bg-white print:border print:border-slate-300 print:p-3 print:rounded-lg">
            <h4 className="font-extrabold text-[#0A2540] text-xs sm:text-sm flex items-center gap-1.5 mb-1.5 print:text-black">
              <HelpCircle className="w-4 h-4 text-[#005293] print:text-black" />
              <span>{language === 'ar' ? 'ما هو؟' : 'What is it?'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 print:text-black leading-relaxed">{localizedGuide.whatIs}</p>
          </div>

          {/* Section 2: Who is it for? */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 print-break-inside-avoid print:bg-white print:border print:border-slate-300 print:p-3 print:rounded-lg">
            <h4 className="font-extrabold text-[#0A2540] text-xs sm:text-sm flex items-center gap-1.5 mb-1.5 print:text-black">
              <Users className="w-4 h-4 text-indigo-600 print:text-black" />
              <span>{language === 'ar' ? 'من يشمله؟' : 'Who is eligible?'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 print:text-black leading-relaxed">{localizedGuide.who}</p>
          </div>

          {/* Section 3: Requirements */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 print-break-inside-avoid print:bg-white print:border print:border-slate-300 print:p-3 print:rounded-lg">
            <h4 className="font-extrabold text-[#0A2540] text-xs sm:text-sm flex items-center gap-1.5 mb-1.5 print:text-black">
              <ClipboardList className="w-4 h-4 text-amber-600 print:text-black" />
              <span>
                {language === 'ar' ? 'ماذا تحتاج؟ (المستندات والمتطلبات)' : 'What do you need? (Documents & Criteria)'}
              </span>
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 print:text-black mt-2">
              {localizedGuide.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-600 print:text-black font-bold mt-0.5">✓</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Official Action Steps */}
          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 print-break-inside-avoid print:bg-white print:border print:border-slate-300 print:p-3 print:rounded-lg">
            <h4 className="font-extrabold text-[#005293] text-xs sm:text-sm flex items-center gap-1.5 mb-2 print:text-black">
              <Footprints className="w-4 h-4 text-[#005293] print:text-black" />
              <span>
                {language === 'ar' ? 'ماذا تفعل؟ (خطوات العمل الرسمية)' : 'What to do? (Official Action Steps)'}
              </span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800 print:text-black">
              {localizedGuide.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-blue-100 print:border print:border-slate-200 print:p-2">
                  <span className="w-5 h-5 rounded-full bg-[#005293] print:bg-black text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium text-slate-800 print:text-black">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Official Reference & Source Information */}
          <div className="bg-slate-100 print:bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 print:border print:border-slate-300 print:p-3 print:rounded-lg print-break-inside-avoid text-xs sm:text-sm">
            <div className="font-extrabold text-[#0A2540] print:text-black flex items-center gap-1.5 mb-1">
              <ExternalLink className="w-4 h-4 text-[#005293] print:text-black" />
              <span>{language === 'ar' ? 'المصدر والجهة الرسمية السويدية:' : 'Official Swedish Authority Source:'}</span>
            </div>
            <p className="text-slate-800 print:text-black font-bold">
              {localizedGuide.authority}
            </p>
            <p className="text-[11px] sm:text-xs text-blue-700 print:text-slate-700 break-all mt-1">
              {localizedGuide.officialUrl}
            </p>
          </div>

          {/* Official Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-amber-900 text-xs flex items-start gap-2.5 print-break-inside-avoid print:bg-white print:border print:border-slate-300 print:text-black">
            <AlertTriangle className="w-4 h-4 text-amber-600 print:text-black mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block font-bold">
                {language === 'ar' ? '⚠️ تنبيه قانوني رسمي:' : '⚠️ Official Legal Notice:'}
              </strong>
              <span className="text-slate-700 print:text-black leading-relaxed">
                {language === 'ar'
                  ? 'القوانين وشروط الهجرة والدوائر الحكومية قد تتغير باستمرار. هذا الملخص باللغة العربية للشرح والتبسيط ولا يعتبر استشارة قانونية نهائية. راجع دائماً الرابط الرسمي أدناه قبل اتخاذ أي قرار.'
                  : 'Swedish laws and agency requirements change frequently. This summary is for educational guidance and does not replace formal legal counsel. Always verify directly with the official authority below.'}
              </span>
            </div>
          </div>

          {/* Print-Only Document Footer */}
          <div className="hidden print:block border-t border-slate-300 pt-3 mt-4 text-[10px] text-slate-500 text-center space-y-1">
            <p>
              هذا المستند طُبع لأغراض المتابعة الشخصية عبر منصة <strong>دليلك في السويد (Dalelak Sweden)</strong>.
            </p>
            <p>
              يرجى التحقق دائماً من الشروط المحدثة مباشرة عبر موقع الجهة السويدية المعنية: {localizedGuide.officialUrl}
            </p>
          </div>

        </div>

        {/* Modal Footer (Hidden on Print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2 print:hidden">
          <a
            href={localizedGuide.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#005293] hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'افتح المصدر الرسمي' : 'Open Official Source'}</span>
            <span className="text-[10px] opacity-85">({localizedGuide.authority.split('–')[0].trim()})</span>
          </a>

          <div className="flex items-center gap-2">
            {/* Print Guide Button */}
            <button
              id="print-guide-btn"
              type="button"
              onClick={handlePrint}
              className="h-9 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-[#005293] hover:border-[#005293] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              title={language === 'ar' ? 'طباعة نسخة ورقية مبسطة من الدليل' : 'Print simplified physical copy'}
            >
              <Printer className="w-4 h-4 text-[#005293]" />
              <span className="hidden sm:inline">{language === 'ar' ? 'طباعة الدليل' : 'Print Guide'}</span>
            </button>

            {onToggleRead && (
              <button
                id="toggle-guide-read-btn"
                type="button"
                onClick={() => onToggleRead(localizedGuide.id)}
                className={`h-9 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                  isRead
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                    : 'bg-white border-slate-300 text-slate-600 hover:border-[#005293] hover:text-[#005293]'
                }`}
                title={isRead ? (language === 'ar' ? 'تمت قراءته' : 'Read') : (language === 'ar' ? 'تحديد كمقروء' : 'Mark as read')}
              >
                <CheckCircle2 className={`w-4 h-4 ${isRead ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
                <span className="text-[11px] hidden sm:inline">
                  {isRead ? (language === 'ar' ? 'مقروء ✓' : 'Read ✓') : (language === 'ar' ? 'تحديد كمقروء' : 'Mark read')}
                </span>
              </button>
            )}

            <button
              id="bookmark-guide-detail-btn"
              onClick={() => onToggleBookmark(localizedGuide.id)}
              className="w-9 h-9 rounded-xl border border-slate-300 bg-white text-slate-600 hover:text-red-500 flex items-center justify-center transition cursor-pointer active:scale-95"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            <button
              onClick={() => onShare(localizedGuide)}
              className="w-9 h-9 rounded-xl border border-slate-300 bg-white text-slate-600 hover:text-[#005293] flex items-center justify-center transition cursor-pointer active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href="https://www.tiktok.com/@dalelak.sweden"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <span className="text-[#FECC00]">🎵</span>
              <span className="hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

