import React, { useState } from 'react';
import { X, Sparkles, Copy, FileText, Check } from 'lucide-react';

interface CvAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const CvAssistantModal: React.FC<CvAssistantModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [lang, setLang] = useState('SFI (C/D) - أساسي');
  const [exp, setExp] = useState('');
  const [skills, setSkills] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvOutput, setCvOutput] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'الاسم الكامل',
          job: job || 'الوظيفة المستهدفة',
          lang,
          exp: exp || 'خبرة عملية متنوعة',
          skills: skills || 'التواصل، العمل الجماعي، الالتزام'
        })
      });
      const data = await res.json();
      if (data.cv) {
        setCvOutput(data.cv);
        onShowToast('تم إنشاء نموذج الـ CV والخطاب بنجاح! ✨');
      } else {
        throw new Error('Failed');
      }
    } catch (e) {
      setCvOutput(`CURRICULUM VITAE (CV)
=====================================
Namn: ${name || '[Ditt Namn]'}
Målsättning: ${job || '[Önskad Tjänst i Sverige]'}
Språk: Svenska (${lang}), Arabiska (Modersmål), Engelska

PROFIL:
Engagerad, pålitlig och serviceinriktad person som söker anställning som ${job || 'medarbetare'}.

ARBETSLIVSERFARENHET:
* ${exp || 'Tidigare erfarenhet inom kundbemötande och service.'}

KOMPETENSER OCH FÄRDIGHETER:
* ${skills || 'Samarbetsförmåga, problemlösning, punktlighet.'}

PERSONLIGT BREV:
Hej! Jag skriver för att visa mitt intresse för tjänsten hos ert företag...`);
      onShowToast('تم تجهيز النموذج السويدي');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!cvOutput) return;
    navigator.clipboard.writeText(cvOutput);
    onShowToast('تم نسخ السيرة الذاتية والخطاب بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="inline-block bg-[#FECC00]/20 text-[#FECC00] text-[10px] px-2 py-0.5 rounded font-bold mb-1">
              🇸🇪 معايير سوق العمل السويدي
            </div>
            <h3 className="text-base sm:text-lg font-extrabold">مساعد السيرة الذاتية السويدية (CV)</h3>
            <p className="text-xs text-slate-300">أدخل معلوماتك الأساسية لتحصل على هيكل CV منظم مع خطاب تقديمي (Personligt Brev)</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs flex-1">
          <div>
            <label className="block font-bold text-slate-700 mb-1">الاسم الكامل (Full Name):</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد العلي"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع الوظيفة المستهدفة:</label>
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="مثال: مبيعات، رعاية صحية، برمجة..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">مستوى اللغة السويدية:</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none font-medium"
              >
                <option value="SFI (C/D) - أساسي">SFI (C/D) - أساسي</option>
                <option value="SAS Grund - متوسط">SAS Grund - متوسط</option>
                <option value="SAS 2/3 - متقدم">SAS 2/3 - متقدم وطلاقة</option>
                <option value="Engelska först">الإنجليزية بشكل رئيسي</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">الخبرة العملية السابقة (مختصرة):</label>
            <textarea
              rows={2}
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="مثال: خبرة 3 سنوات في إدارة المبيعات، استخدام الحاسوب، العمل الجماعي..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">أبرز المهارات (Kompetenser):</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="مثال: رخصة قيادة B، دقة المواعيد، خدمة العملاء..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#005293] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FECC00]" />
            <span>{isGenerating ? 'جاري الصياغة بـ Gemini...' : 'صياغة الـ CV والخطاب السويدي بذكاء Gemini'}</span>
          </button>

          {cvOutput && (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>النموذج السويدي المنظم:</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[#005293] font-bold hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>نسخ النص</span>
                </button>
              </div>

              <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {cvOutput}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
