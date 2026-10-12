import React, { useState } from 'react';
import { X, Play, RotateCcw, Volume2, Send, Lightbulb } from 'lucide-react';

interface SimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [scenario, setScenario] = useState('job_interview');
  const [level, setLevel] = useState('intermediate');
  const [customContext, setCustomContext] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [dialogueList, setDialogueList] = useState<{
    sender: 'bot' | 'user';
    svenska: string;
    arabiska?: string;
    feedback?: string;
    tip?: string;
  }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);

  if (!isOpen) return null;

  const handleStart = async () => {
    setIsActive(true);
    setIsBotThinking(true);
    setDialogueList([]);

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          level,
          userResponse: `بدء الموقف: ${customContext || 'جاهز للبدء'}`
        })
      });
      const data = await res.json();

      setDialogueList([
        {
          sender: 'bot',
          svenska: data.swedishReply || 'Hej och välkommen! Berätta lite om dig själv.',
          arabiska: data.arabicTranslation || 'مرحباً وأهلاً بك! حدثني قليلاً عن نفسك.',
          tip: data.tip || 'ابدأ بذكر اسمك وخبرتك بإيجاز.'
        }
      ]);
    } catch (e) {
      setDialogueList([
        {
          sender: 'bot',
          svenska: 'Hej och välkommen! Hur kan jag hjälpa dig idag?',
          arabiska: 'مرحباً وأهلاً بك! كيف يمكنني مساعدتك اليوم؟',
          tip: 'أجب بالسويدية بهدوء.'
        }
      ]);
    } finally {
      setIsBotThinking(false);
    }
  };

  const handleSendUserResponse = async () => {
    if (!userInput.trim() || isBotThinking) return;

    const userText = userInput.trim();
    setUserInput('');

    setDialogueList((prev) => [
      ...prev,
      {
        sender: 'user',
        svenska: userText
      }
    ]);

    setIsBotThinking(true);

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          level,
          userResponse: userText
        })
      });
      const data = await res.json();

      setDialogueList((prev) => [
        ...prev,
        {
          sender: 'bot',
          svenska: data.swedishReply || 'Tack för ditt svar! Nästa fråga...',
          arabiska: data.arabicTranslation || 'شكراً لإجابتك!',
          feedback: data.feedback || 'رد لغوي جيد ومفهوم.',
          tip: data.tip
        }
      ]);
    } catch (e) {
      setDialogueList((prev) => [
        ...prev,
        {
          sender: 'bot',
          svenska: 'Jag förstår. Tack för informationen!',
          arabiska: 'أفهم ذلك. شكراً على المعلومات!'
        }
      ]);
    } finally {
      setIsBotThinking(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setDialogueList([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between border-b border-purple-950">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-400/20 text-purple-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold mb-1 border border-purple-400/30">
              <span>🎭</span>
              <span>محاكي المقابلات والمواقف بالسويدية (Gemini 3.8 + Audio)</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">محاكي المواقف والمقابلات السويدية 🇸🇪</h3>
            <p className="text-xs text-slate-300">تدرب واقعياً على محادثة الموظف السويدي، واستمع للنطق، وحسّن جوابك</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isActive ? (
          /* Setup View */
          <div className="p-4 sm:p-5 space-y-4 text-xs overflow-y-auto flex-1">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">اختر الموقف الذي تريد التدرب عليه:</label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-purple-600 focus:outline-none font-medium"
              >
                <option value="job_interview">💼 مقابلة عمل سويدية (Anställningsintervju) - وظيفة مبيعات أو رعاية أو تقنية</option>
                <option value="skatteverket_desk">🏛️ شباك مصلحة الضرائب (Skatteverket) - التسجيل السكاني والرقم الشخصي</option>
                <option value="migrationsverket_inquiry">🛂 مصلحة الهجرة (Migrationsverket) - استفسار عن إقامة أو لم شمل</option>
                <option value="healthcare_1177">🏥 المركز الصحي (Vårdcentral / 1177) - شرح الأعراض الطبية</option>
                <option value="landlord_dispute">🏠 إدارة السكن والمالك (Hyresvärd) - بلاغ عطل تدفئة أو مشكلة سكنية</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">مستواك اللغوي:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none font-medium"
              >
                <option value="beginner">مبتدئ (SFI C - جمل سهلة وترجمة فورية)</option>
                <option value="intermediate">متوسط (SFI D / SAS Grund - محادثة يومية)</option>
                <option value="advanced">متقدم (SAS 2-3 - لغة سويدية مهنية رسمية)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ملاحظة إضافية تود تخصيصها للمحاكي (اختياري):</label>
              <input
                type="text"
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="مثال: أنا ممرض جديد، أو لدي عائلة وأبحث عن شقة..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>بدء المحاكاة التفاعلية الآن</span>
            </button>
          </div>
        ) : (
          /* Active Dialogue View */
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-purple-50 border-b border-purple-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-extrabold text-purple-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>المحاكاة نشطة</span>
              </div>
              <button
                onClick={handleReset}
                className="text-slate-500 hover:text-red-600 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة البدء</span>
              </button>
            </div>

            {/* Dialogue Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50">
              {dialogueList.map((turn, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[92%] ${
                    turn.sender === 'user' ? 'mr-auto justify-end' : 'ml-auto'
                  }`}
                >
                  {turn.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-purple-900 text-purple-200 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      🇸🇪
                    </div>
                  )}

                  <div className="space-y-2 flex-1">
                    {turn.feedback && (
                      <div className="bg-purple-50 border border-purple-200 p-2.5 rounded-xl text-purple-900 text-[11px] leading-relaxed">
                        <strong className="block text-purple-800 mb-0.5">💡 تقييم وملاحظة لغوية:</strong>
                        <span>{turn.feedback}</span>
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl ${
                        turn.sender === 'user'
                          ? 'bg-purple-700 text-white font-medium rounded-tl-xs shadow-xs'
                          : 'bg-white border border-slate-200 rounded-tr-xs shadow-xs text-slate-900 space-y-2'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-extrabold text-xs sm:text-sm tracking-wide leading-relaxed">
                          {turn.svenska}
                        </div>
                        {turn.sender === 'bot' && (
                          <button
                            onClick={() => handleSpeak(turn.svenska)}
                            title="استمع للنطق السويدي"
                            className="w-7 h-7 rounded-lg bg-purple-100 hover:bg-purple-700 text-purple-700 hover:text-white flex items-center justify-center transition flex-shrink-0 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {turn.arabiska && (
                        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                          <span className="text-purple-700 font-bold">الترجمة:</span> {turn.arabiska}
                        </div>
                      )}
                    </div>

                    {turn.tip && (
                      <div className="text-[10px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 flex-shrink-0" />
                        <span>{turn.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isBotThinking && (
                <div className="flex items-center gap-2 text-slate-400 p-2 text-xs">
                  <span className="animate-spin text-purple-600">⌛</span>
                  <span>الموظف يستمع ويقيم ردك...</span>
                </div>
              )}
            </div>

            {/* User Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendUserResponse()}
                  placeholder="اكتب ردك بالسويدية (أو بالعربية للمساعدة)..."
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-purple-600 font-medium"
                />
                <button
                  onClick={handleSendUserResponse}
                  disabled={!userInput.trim() || isBotThinking}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-4 py-3 rounded-xl transition flex items-center justify-center shadow cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
