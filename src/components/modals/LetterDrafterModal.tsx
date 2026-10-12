import React, { useState } from 'react';
import { X, PenLine, Sparkles, Copy, Check } from 'lucide-react';

interface LetterDrafterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const LetterDrafterModal: React.FC<LetterDrafterModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [agency, setAgency] = useState('Migrationsverket (مصلحة الهجرة)');
  const [senderInfo, setSenderInfo] = useState('');
  const [userIntent, setUserIntent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!userIntent.trim() || userIntent.trim().length < 5) {
      onShowToast('الرجاء توضيح موضوع ومطلب الرسالة أولاً');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agency,
          sender: senderInfo,
          intent: userIntent
        })
      });
      const data = await res.json();
      if (data.letter) {
        setGeneratedLetter(data.letter);
        onShowToast('تمت صياغة الخطاب السويدي بنجاح! ✨');
      } else {
        throw new Error('Failed');
      }
    } catch (e) {
      setGeneratedLetter(`Ärende: Förfrågan angående pågående ärende

Till ${agency},

Mitt namn är ${senderInfo || '[Ditt Namn och Personnummer]'}.
Jag kontaktar er angående mitt ärende: ${userIntent}.

Jag vore mycket tacksam för er återkoppling och hjälp med handläggningen.

Med vänliga hälsningar,
${senderInfo || '[Ditt Namn]'}
Telefon: [Telefonnummer]
E-post: [E-post]

---
الترجمة العربية:
الموضوع: استفسار بخصوص المعاملة الجارية
إلى ${agency}:
اسمي ${senderInfo || '[اسمك]'}... أود الاستفسار باحترام عن سير المعاملة.`);
      onShowToast('تم إعداد النموذج الاحتياطي');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    onShowToast('تم نسخ الخطاب الرسمي بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        <div className="bg-gradient-to-r from-blue-900 to-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FECC00]/20 text-[#FECC00] text-[10px] px-2 py-0.5 rounded font-bold mb-1">
              <PenLine className="w-3 h-3" />
              <span>صانع الخطابات الرسمية السويدية (Formell Svenska)</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold">صياغة رسالة رسمية أو إيميل بالسويدية</h3>
            <p className="text-xs text-slate-300">أخبر المساعد بما تريد، وسيكتب لك خطاباً سويدياً محكماً ومهذباً</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">الجهة المرسل إليها:</label>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none font-medium"
              >
                <option value="Migrationsverket (مصلحة الهجرة)">Migrationsverket (مصلحة الهجرة)</option>
                <option value="Skatteverket (مصلحة الضرائب)">Skatteverket (مصلحة الضرائب)</option>
                <option value="Försäkringskassan (التأمينات)">Försäkringskassan (التأمينات)</option>
                <option value="Hyresvärd (مالك الشقة)">Hyresvärd (مالك الشقة)</option>
                <option value="Bank (البنك)">البنك (فتح حساب أو بطاقة)</option>
                <option value="Arbetsgivare (صاحب عمل)">صاحب عمل (استفسار أو عقد)</option>
                <option value="جهة أخرى">جهة أخرى عامة</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">اسمك ورقم الاتصال (اختياري للترويسة):</label>
              <input
                type="text"
                value={senderInfo}
                onChange={(e) => setSenderInfo(e.target.value)}
                placeholder="مثال: أحمد العلي - 19900101-XXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-[#005293] focus:outline-none"
              >
              </input>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">ما هو موضوع رسالتك؟ (اكتب بأي لهجة مريحة لك):</label>
            <textarea
              rows={3}
              value={userIntent}
              onChange={(e) => setUserIntent(e.target.value)}
              placeholder="مثال: تأخرت معاملة لم الشمل أكثر من 8 شهور وبدي استفسر باحترام عن رقم الملف... أو: التدفئة في الشقة باردة وبدي يصلحوها..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-[#005293] focus:outline-none leading-relaxed text-xs"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !userIntent.trim()}
            className="w-full bg-[#005293] hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FECC00]" />
            <span>{isGenerating ? 'جاري الصياغة بـ Gemini...' : 'صياغة الخطاب بالسويدية الرسمية وترجمته للعربية'}</span>
          </button>

          {generatedLetter && (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>الرسالة الجاهزة:</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[#005293] font-bold hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>نسخ الرسالة</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {generatedLetter}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
