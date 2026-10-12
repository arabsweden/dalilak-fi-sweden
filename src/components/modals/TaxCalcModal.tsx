import React, { useState } from 'react';
import { X, Calculator, Info } from 'lucide-react';

interface TaxCalcModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const TaxCalcModal: React.FC<TaxCalcModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [gross, setGross] = useState<number>(32000);
  const [city, setCity] = useState('Stockholm (ستوكهولم)');
  const [church, setChurch] = useState('no');
  const [birthYear, setBirthYear] = useState(1992);
  const [isCalculating, setIsCalculating] = useState(false);
  const [taxResult, setTaxResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleCalculate = async () => {
    if (!gross || gross < 1000) {
      onShowToast('يرجى إدخال راتب صحيح');
      return;
    }

    setIsCalculating(true);
    try {
      const res = await fetch('/api/tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grossSalary: gross,
          municipality: city,
          churchMember: church,
          birthYear: birthYear
        })
      });
      const data = await res.json();
      setTaxResult(data);
      onShowToast('تم حساب الراتب والضرائب بنجاح!');
    } catch (e) {
      const approxTaxRate = 0.31;
      const jobCredit = Math.min(2800, Math.round(gross * 0.08));
      const municipalTax = Math.round(gross * approxTaxRate);
      const net = gross - municipalTax + jobCredit;
      const effectiveRate = Math.round(((gross - net) / gross) * 100);

      setTaxResult({
        netSalary: net,
        effectiveTaxPercentage: effectiveRate,
        municipalTaxAmount: municipalTax,
        jobDeductionCredit: jobCredit,
        stateTaxAmount: gross > 51000 ? Math.round((gross - 51000) * 0.20) : 0,
        pensionAndSocialByEmployer: Math.round(gross * 0.3142),
        benefitsAndAdvice: `• لديك الحق في إجازة سنوية مدفوعة (Semester) لا تقل عن 25 يوماً وفق قانون الإجازات السويدي.\n• راتبك يسجل في صندوق التقاعد العام (Allmän pension).\n• تأكد من فحص كشف الراتب (Lönespecifikation) شهرياً.`
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between border-b border-emerald-900">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold mb-1 border border-emerald-400/30">
              <Calculator className="w-3 h-3" />
              <span>حاسبة الضرائب السويدية الذكية</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">حاسبة الراتب الصافي والضرائب السويدية 🇸🇪</h3>
            <p className="text-xs text-slate-200">احسب راتبك المستلم (Nettolön) في بلديتك بعد خصم ضريبة البلدية وخصم العمل (Jobbskatteavdrag)</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">الراتب الشهري الإجمالي (Bruttolön):</label>
              <div className="relative">
                <input
                  type="number"
                  value={gross}
                  step={500}
                  onChange={(e) => setGross(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pr-3 pl-12 text-slate-800 font-bold focus:border-emerald-600 focus:outline-none"
                />
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">SEK</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">البلدية أو المدينة السويدية (Kommun):</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-emerald-600 focus:outline-none font-medium"
              >
                <option value="Stockholm (ضريبة بلدية تقريباً 29.8%)">ستوكهولم (Stockholm)</option>
                <option value="Göteborg (ضريبة بلدية تقريباً 32.6%)">يوتبوري (Göteborg)</option>
                <option value="Malmö (ضريبة بلدية تقريباً 32.4%)">مالمو (Malmö)</option>
                <option value="Uppsala (ضريبة بلدية تقريباً 32.7%)">أوبسالا (Uppsala)</option>
                <option value="بلدية أخرى في السويد">بلدية أخرى (المتوسط السويدي 32%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">عضو في الكنيسة السويدية (Kyrkoavgift)؟</label>
              <select
                value={church}
                onChange={(e) => setChurch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-emerald-600 focus:outline-none font-medium"
              >
                <option value="no">لا (معظم المقيمين الجدد غير مسجلين)</option>
                <option value="yes">نعم (يخصم حوالي 1%)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">سنة الميلاد:</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-emerald-600 focus:outline-none font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Calculator className="w-4 h-4" />
            <span>{isCalculating ? 'جاري الحساب...' : 'حساب الراتب الصافي وتحليل الخصومات'}</span>
          </button>

          {/* Results */}
          {taxResult && (
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900">الراتب الصافي المتوقع بحسابك البنكي:</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                    Nettolön
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 flex items-baseline gap-1.5">
                  <span>{Math.round(taxResult.netSalary).toLocaleString()}</span>
                  <span className="text-sm font-bold text-slate-500">SEK شهرياً</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  نسبة الاقتطاع الفعلي: تقريباً {taxResult.effectiveTaxPercentage}% من الراتب الإجمالي
                </p>
              </div>

              {/* Itemized breakdown */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 border-b pb-1.5 flex items-center justify-between">
                  <span>تفاصيل الضرائب والخصومات الرسمية (Skatteverket):</span>
                  <span className="text-[10px] text-slate-400">تقريبية موثقة</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">الراتب الإجمالي (Bruttolön):</span>
                    <span className="font-bold text-slate-800">{Number(gross).toLocaleString()} SEK</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">ضريبة البلدية المقدرة (Kommunalskatt):</span>
                    <span className="font-bold text-rose-600">- {Math.round(taxResult.municipalTaxAmount).toLocaleString()} SEK</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">خصم العمل التشجيعي (Jobbskatteavdrag):</span>
                    <span className="font-bold text-emerald-600">+ {Math.round(taxResult.jobDeductionCredit).toLocaleString()} SEK</span>
                  </div>
                  {taxResult.stateTaxAmount > 0 && (
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">ضريبة الدولة للدخل العالي (Statlig skatt):</span>
                      <span className="font-bold text-rose-600">- {Math.round(taxResult.stateTaxAmount).toLocaleString()} SEK</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 text-[10px]">مساهمة صاحب العمل في تأمينك وتقاعدك (Arbetsgivaravgift):</span>
                    <span className="font-medium text-slate-600 text-[10px]">+ {Math.round(taxResult.pensionAndSocialByEmployer || gross * 0.3142).toLocaleString()} SEK</span>
                  </div>
                </div>
              </div>

              {/* Advice */}
              {taxResult.benefitsAndAdvice && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-slate-700 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    <span>نصائح وحقوق إضافية مرتبطة براتبك:</span>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                    {taxResult.benefitsAndAdvice}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
