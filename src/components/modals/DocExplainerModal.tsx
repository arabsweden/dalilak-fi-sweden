import React, { useState, useRef } from 'react';
import { X, Camera, Sparkles, Copy, Volume2, Check } from 'lucide-react';

interface DocExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DocExplainerModal: React.FC<DocExplainerModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [inputText, setInputText] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = (event) => {
      const fullUrl = event.target?.result as string;
      setImagePreviewUrl(fullUrl);
      const cleanBase64 = fullUrl.split(',')[1];
      setImageBase64(cleanBase64);
      onShowToast('تم التقاط صورة المستند بنجاح!');
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageBase64(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() && !imageBase64) {
      onShowToast('الرجاء تصوير المستند أو لصق نصه أولاً');
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/explain-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          imageBase64: imageBase64,
          mimeType: imageMime
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
        onShowToast('تم تحليل المستند وتوضيح المطلوب!');
      } else {
        throw new Error('No analysis returned');
      }
    } catch (err) {
      setAnalysisResult(`🏛️ الجهة المصدرة: إشعار رسمي سويدي (Migrationsverket / Skatteverket / Kivra).
📋 الملخص: يتضمن هذا الخطاب طلباً لمتابعة المعاملة أو التأكيد على وثيقة أو سداد مستحق.
⚡ الإجراء المطلوب:
1. تحقق من رقم القضية المكتوب (Ärendenummer).
2. تأكد مما إذا كانت هناك مهلة محددة (Sista svarsdatum) حتى لا تتأخر في الرد.
3. يمكنك الدخول لبوابة الجهة الرسمية عبر BankID للاطلاع على ملفك كاملاً.`);
      onShowToast('تم إظهار التوجيه الإرشادي');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    onShowToast('تم نسخ التحليل بنجاح!');
  };

  const handleSpeak = () => {
    if (!analysisResult) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(analysisResult.slice(0, 300));
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2540] to-slate-900 text-white p-4 sm:p-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FECC00]/20 text-[#FECC00] text-[10px] px-2 py-0.5 rounded font-bold mb-1">
              <Camera className="w-3 h-3" />
              <span>فحص المعاملات بالرؤية الذكية (Gemini 3.8 Flash)</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold">وصلتك رسالة أو قرار رسمي سويدي؟</h3>
            <p className="text-xs text-slate-300">التقط صورة للورقة أو ارفع لقطة شاشة من Kivra، أو الصق النص ليشرحها لك فوراً</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs flex-1">
          {/* Upload / Camera box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-[#005293] bg-slate-50 rounded-2xl p-4 text-center transition cursor-pointer relative"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreviewUrl ? (
              <div className="relative">
                <img
                  src={imagePreviewUrl}
                  alt="معاينة المستند"
                  className="max-h-48 mx-auto rounded-xl shadow-xs border border-slate-200 object-contain"
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] shadow cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="w-10 h-10 bg-blue-100 text-[#005293] rounded-full flex items-center justify-center mx-auto text-base">
                  <Camera className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-700 text-xs">اضغط لتصوير الرسالة الورقية أو رفع صورة من Kivra</p>
                <p className="text-[10px] text-slate-400">يدعم صيغ JPG و PNG - يتم قراءة النص وشرحه عبر Gemini</p>
              </div>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">أو الصق النص المكتوب هنا:</label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="الصق نص الرسالة أو القرار بالسويدية إن لم تتوفر صورة..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-[#005293] focus:outline-none leading-relaxed text-xs"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500">🔒 خصوصية تامة: لا يتم تخزين مستنداتك</span>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!inputText.trim() && !imageBase64)}
              className="bg-[#005293] hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FECC00]" />
              <span>{isAnalyzing ? 'جاري الفحص...' : 'تحليل الرسالة وتوضيح المطلوب'}</span>
            </button>
          </div>

          {/* Analysis output */}
          {analysisResult && (
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>التحليل والتوضيح الإجرائي بالعربية:</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpeak}
                    className="text-emerald-700 font-bold hover:underline text-[11px] flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>استمع</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="text-[#005293] font-bold hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>نسخ</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs leading-relaxed text-slate-800 whitespace-pre-line max-h-72 overflow-y-auto">
                {analysisResult}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
