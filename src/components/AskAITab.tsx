import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Sparkles, ExternalLink, Bot, User, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const AskAITab: React.FC = () => {
  const { language, isRTL, t } = useLanguage();

  const getInitialMessage = (lang: string): ChatMessage => ({
    id: 'welcome',
    sender: 'bot',
    text: lang === 'ar'
      ? `مرحباً بك! أنا مساعدك الذكي في «دليلك في السويد» 🇸🇪
اكتب لي بأي لهجة أو لغة مريحة لك:
• "وصلت السويد جديد، شو أول خطوة؟"
• "بدي أقدّم لم شمل لزوجتي وأولادي"
• "وين أروح اليوم مشوار حلو بستوكهولم؟"
• "كيف بسجل بمصلحة الضرائب أو بقدّم على التأمينات؟"

سأشرح لك الخطوات ببساطة وأزودك برابط الجهة الحكومية الرسمية مباشرة.`
      : `Welcome! I am your AI Guide for «Dalelak Sweden» 🇸🇪
Feel free to ask in English or Arabic:
• "Newly arrived in Sweden, what is my very first step?"
• "How do I apply for family reunification for spouse and kids?"
• "What are the best places to visit in Stockholm today?"
• "How do I register with Skatteverket for a Personnummer?"

I will explain the exact official steps and point you directly to the verified Swedish agency link.`,
    timestamp: new Date()
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage(language)]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message if empty and language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].id.startsWith('welcome')) {
      setMessages([getInitialMessage(language)]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text + (language === 'en' ? ' (Please answer in clear English)' : ''),
          history: chatHistory
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || (language === 'ar' ? 'عذراً، لم يصلني رد من الخادم.' : 'Sorry, no response received from server.'),
        sources: data.sources,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: language === 'ar'
          ? `لإنجاز أي معاملة في السويد، راجع دائماً الدوائر الرسمية:
• الإقامة واللجوء: Migrationsverket
• القيد والرقم الشخصي: Skatteverket
• التأمين الصحي ومعونات الأطفال: Försäkringskassan
• الوظائف والـ CV: Arbetsförmedlingen

⚠️ هذه خدمة إرشادية وليست استشارة قانونية. تحقق دائماً من الجهة السويدية الرسمية.`
          : `For any official procedure in Sweden, always refer directly to the responsible Swedish agency:
• Residence & Asylum: Migrationsverket
• Civil Registration & Personnummer: Skatteverket
• Health Insurance & Child Benefit: Försäkringskassan
• Jobs & Careers: Arbetsförmedlingen

⚠️ This is an informational guide, not formal legal counsel. Always verify with the official authority.`,
        sources: [
          { title: 'Migrationsverket', uri: 'https://www.migrationsverket.se' },
          { title: 'Skatteverket', uri: 'https://www.skatteverket.se' }
        ],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([getInitialMessage(language)]);
  };

  return (
    <div className="space-y-4">
      
      {/* AI Assistant Header Card */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#005293] to-blue-950 text-white rounded-3xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-xl shadow-inner">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  {language === 'ar' ? 'اسأل دليلك في السويد' : 'Ask Dalelak Sweden AI'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Gemini 3.8 Flash</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? 'مربوط بالمعلومات الرسمية لـ Migrationsverket و Skatteverket'
                  : 'Grounded in official rules of Migrationsverket, Skatteverket, and Försäkringskassan'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            title={language === 'ar' ? 'بدء محادثة جديدة' : 'New Chat'}
            className="text-xs bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-xl border border-white/10 transition flex items-center gap-1 active:scale-95"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{language === 'ar' ? 'محادثة جديدة' : 'New Chat'}</span>
          </button>
        </div>

        {/* Notice / Disclaimer */}
        <div className="mt-3 bg-black/25 border border-white/10 rounded-xl p-2.5 text-[11px] text-slate-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#FECC00] mt-0.5 flex-shrink-0" />
          <span>
            {language === 'ar'
              ? 'المساعد يستعين بالذكاء الاصطناعي والمعلومات السويدية الرسمية. تحقق دائماً من الروابط الرسمية المرفقة.'
              : 'The assistant uses AI and verified Swedish agency databases. Always cross-check with the official linked sources.'}
          </span>
        </div>
      </div>

      {/* Interactive Chat Stream Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[92%] ${
                m.sender === 'user' ? (isRTL ? 'mr-auto justify-end' : 'ml-auto justify-end') : (isRTL ? 'ml-auto' : 'mr-auto')
              }`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-[#0A2540] text-[#FECC00] flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-xs">
                  🇸🇪
                </div>
              )}

              <div
                className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#005293] text-white rounded-tl-xs shadow-xs font-medium'
                    : 'bg-slate-100 text-slate-800 rounded-tr-xs border border-slate-200 space-y-2'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Sources list */}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60">
                    <div className="text-[10px] font-bold text-slate-500 mb-1">
                      {language === 'ar' ? 'المصادر والروابط المستند إليها:' : 'Official Reference Sources:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.sources.map((s, sIdx) => (
                        <a
                          key={sIdx}
                          href={s.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-white hover:bg-blue-50 border border-slate-200 text-[10px] text-[#005293] px-2 py-0.5 rounded-md font-bold transition"
                        >
                          <span>{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className={`flex items-start gap-2.5 max-w-[90%] ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
              <div className="w-8 h-8 rounded-full bg-[#0A2540] text-[#FECC00] flex-shrink-0 flex items-center justify-center text-xs">
                🤖
              </div>
              <div className="bg-slate-100 rounded-2xl p-3 text-slate-500 text-xs flex items-center gap-2 border border-slate-200">
                <span className="animate-spin text-[#005293]">⌛</span>
                <span>
                  {language === 'ar'
                    ? 'جاري مراجعة الشروط والمصادر السويدية...'
                    : 'Searching verified Swedish regulations...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Pre-set Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 whitespace-nowrap text-[11px] font-medium">
            {language === 'ar' ? 'أسئلة شائعة:' : 'Quick Questions:'}
          </span>
          {language === 'ar' ? (
            <>
              <button
                onClick={() => handleSendMessage('وصلت السويد جديد، شو لازم أعمل خطوة بخطوة؟')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                وصلت جديد شو أعمل؟ 🇸🇪
              </button>
              <button
                onClick={() => handleSendMessage('بدي أجيب زوجتي للسويد، شو شروط لم الشمل الرسمية؟')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                بدي أجيب زوجتي (لم الشمل) 🛂
              </button>
              <button
                onClick={() => handleSendMessage('كيف أقدم على الرقم الشخصي Personnummer بمصلحة الضرائب؟')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                الرقم الشخصي Personnummer 🏛️
              </button>
              <button
                onClick={() => handleSendMessage('اقترح لي برنامج سياحي جميل ليوم واحد في ستوكهولم مع رائد')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                برنامج سياحي بستوكهولم 📍
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleSendMessage('Newly arrived in Sweden, what are my first steps?')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                Newcomer Roadmap 🇸🇪
              </button>
              <button
                onClick={() => handleSendMessage('What are the official rules for bringing spouse to Sweden?')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                Family Reunification 🛂
              </button>
              <button
                onClick={() => handleSendMessage('How to get a Personnummer from Skatteverket?')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                Personnummer Steps 🏛️
              </button>
              <button
                onClick={() => handleSendMessage('Suggest a 1-day scenic itinerary in Stockholm')}
                className="whitespace-nowrap bg-white border border-slate-200 hover:border-[#005293] text-slate-700 px-2.5 py-1 rounded-lg text-xs transition"
              >
                Stockholm Itinerary 📍
              </button>
            </>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'اكتب استفسارك هنا (مثلاً: كيف افتح حساب بنك، او شو شروط الجنسية...)'
                  : 'Type your question here (e.g., bank account, citizenship criteria, rental rules)...'
              }
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-[#005293] font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-[#005293] hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-2xl transition flex items-center justify-center shadow disabled:opacity-50 active:scale-95"
            >
              <Send className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
