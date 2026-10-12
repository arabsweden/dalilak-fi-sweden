import React from 'react';
import { X, Share2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareApp: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({
  isOpen,
  onClose,
  onShareApp,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        {/* Top banner */}
        <div className="bg-gradient-to-r from-[#0A2540] via-[#005293] to-blue-900 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Profile Avatar Placeholder with Flag Accent */}
          <div className="w-20 h-20 rounded-full border-4 border-[#FECC00] bg-slate-800 mx-auto flex items-center justify-center text-3xl shadow-xl mb-3 select-none">
            🇸🇪
          </div>

          <h3 className="text-xl font-extrabold tracking-wide">RAED SHIHAB</h3>
          <p className="text-[#FECC00] text-xs font-bold mt-0.5">@dalelak.sweden</p>
          <span className="inline-block bg-white/10 text-[11px] text-slate-200 px-3 py-0.5 rounded-full mt-2 font-medium">
            {language === 'ar' ? 'صانع محتوى ومرشد عربي في السويد' : 'Content Creator & Guide in Sweden'}
          </span>
        </div>

        <div className="p-5 text-xs text-slate-700 space-y-4">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed text-center font-medium">
            {language === 'ar'
              ? '«محتوى عربي من قلب السويد يهدف إلى تبسيط المعلومات ومساعدة المتابع على فهم الحياة في السويد، اكتشاف الأماكن، متابعة المعلومات الرسمية، والاستفادة من التجارب والجولات والمحتوى المرئي.»'
              : '"Empowering newcomers and residents with clear guidance on Swedish life, residency, authorities, hidden travel gems, and practical insights directly from Stockholm."'}
          </div>

          <div className="space-y-2">
            <a
              href="https://www.tiktok.com/@dalelak.sweden"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow active:scale-95"
            >
              <span className="text-[#FECC00]">🎵</span>
              <span>{language === 'ar' ? 'تابعني على TikTok (@dalelak.sweden)' : 'Follow on TikTok (@dalelak.sweden)'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onShareApp}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'شارك تطبيق دليلك مع أصدقائك' : 'Share Dalelak Sweden App'}</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            {language === 'ar'
              ? 'دليلك في السويد 🇸🇪 Dalelak Sweden • نسخة 2026'
              : 'Dalelak Sweden 🇸🇪 Guide • 2026 Edition'}
          </div>
        </div>

      </div>
    </div>
  );
};
