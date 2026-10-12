import React, { useState } from 'react';
import { X, Scale, AlertTriangle, Sparkles, Check, Copy } from 'lucide-react';

interface AppealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AppealModal: React.FC<AppealModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [caseType, setCaseType] = useState('migrationsverket_refusal');
  const [caseNumber, setCaseNumber] = useState('');
  const [decisionDate, setDecisionDate] = useState('');
  const [grounds, setGrounds] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAppeal, setGeneratedAppeal] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!grounds.trim() || grounds.trim().length < 10) {
      onShowToast('يرجى توضيح أسباب الاعتراض بالتفصيل أولاً');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseType,
          caseNumber,
          decisionDate,
          grounds
        })
      });
      const data = await res.json();
      if (data.appealText) {
        setGeneratedAppeal(data.appealText);
        onShowToast('تم إعداد مسودة الاستئناف بنجاح! ⚖️');
      } else {
        throw new Error('Failed');
      }
    } catch (e) {
      setGeneratedAppeal(`Överklagande av beslut

Ärende: ${caseType}
Ärendenummer: ${caseNumber || '[Ärendenummer]'}
Beslutsdatum: ${decisionDate || '[Datum]'}

Härmed överklagar jag ovan nämnda beslut och yrkar att det ändras eller upphävs.

Grunder för överklagandet:
${grounds}

Med vänliga hälsningar,
[Namn och Personnummer]

---
الترجمة وتوجيهات الاستئناف:
عريضة استئناف رسمية ضد القرار الصادر...
⚠️ تنبيه هام: يجب إرسال هذا الاعتراض إلى نفس الجهة التي أصدرت القرار قبل انقضاء 3 أسابيع.`);
      onShowToast('تم إعداد مسودة الاستئناف');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedAppeal) return;
    navigator.clipboard.writeText(generatedAppeal);
    onShowToast('تم نسخ مسودة الاستئناف الرسمية بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between border-b border-rose-950">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-400/20 text-rose-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold mb-1 border border-rose-400/30">
              <Scale className="w-3 h-3" />
              <span>صانع الاستئناف والاعتراض الرسمي (Överklagande)</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">مساعد الاعتراض والاستئناف الرسمي 🇸🇪</h3>
            <p className="text-xs text-slate-300">صياغة مسودة اعتراض قانونية بالسويدية ومتابعة مهلة الـ 3 أسابيع الرسمية</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Warning Notice */}
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl text-rose-900 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>مهلة الـ 3 أسابيع (Tre veckor för överklagande):</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700">
              في معظم القرارات السويدية، لديك عادة 3 أسابيع من تاريخ استلام القرار للطعن فيه. هذه الأداة تساعدك في إعداد مسودة الاعتراض ولكن لا تغني عن استشارة محامٍ في القضايا المعقدة.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">نوع القرار الذي تريد الاعتراض عليه:</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-rose-600 focus:outline-none font-medium"
            >
              <option value="قرار رفض من مصلحة الهجرة (لم شمل، تجديد إقامة، أو إقامة عمل)">قرار رفض من مصلحة الهجرة (لم شمل أو إقامة عمل)</option>
              <option value="رفض تعويض من التأمينات Försäkringskassan">رفض تعويض من التأمينات (مساعدة سكن أو تعويض مرض)</option>
              <option value="رفض مساعدة دراسية من CSN">رفض مساعدة دراسية من CSN</option>
              <option value="مخالفة وقوف سيارة غير مبررة (Parkeringsbot)">مخالفة وقوف سيارة خاطئة (Parkeringsbot)</option>
              <option value="رفض تسجيل عنوان أو هوية من Skatteverket">رفض تسجيل عنوان أو هوية من Skatteverket</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">رقم القضية أو القرار (Ärendenummer):</label>
              <input
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="مثال: 50-12345678 أو رقم المخالفة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-rose-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">تاريخ استلام القرار:</label>
              <input
                type="date"
                value={decisionDate}
                onChange={(e) => setDecisionDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-rose-600 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">لماذا تعتقد أن القرار خاطئ؟ (اكتب بوضوح):</label>
            <textarea
              rows={3}
              value={grounds}
              onChange={(e) => setGrounds(e.target.value)}
              placeholder="مثال: الموظف لم يحتسب عقد العمل الجديد المرفق، أو أن إشارة الوقوف كانت غير مرئية بسبب الثلوج..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-rose-600 focus:outline-none leading-relaxed text-xs"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !grounds.trim()}
            className="w-full bg-rose-700 hover:bg-rose-800 text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#FECC00]" />
            <span>{isGenerating ? 'جاري صياغة الاستئناف...' : 'صياغة خطاب الاستئناف السويدي (Överklagande) بـ Gemini'}</span>
          </button>

          {generatedAppeal && (
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-rose-600" />
                  <span>خطاب الاستئناف الرسمي الجاهز:</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="text-rose-700 font-bold hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>نسخ الاستئناف</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {generatedAppeal}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
