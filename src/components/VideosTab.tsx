import React, { useState } from 'react';
import { Play, Eye, ExternalLink } from 'lucide-react';
import { TIKTOK_VIDEOS } from '../data/videos';
import { useLanguage } from '../context/LanguageContext';

export const VideosTab: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoriesAr = [
    { id: 'all', label: 'جميع الفيديوهات' },
    { id: 'immigration', label: '🛂 الهجرة والإقامة' },
    { id: 'stockholm', label: '📍 جولات ستوكهولم' },
    { id: 'life', label: '🇸🇪 الحياة والدوائر' },
    { id: 'tourism', label: '🏙️ السياحة والطبيعة' },
  ];

  const categoriesEn = [
    { id: 'all', label: 'All Videos' },
    { id: 'immigration', label: '🛂 Immigration & Permits' },
    { id: 'stockholm', label: '📍 Stockholm Tours' },
    { id: 'life', label: '🇸🇪 Living & Authorities' },
    { id: 'tourism', label: '🏙️ Tourism & Nature' },
  ];

  const categories = language === 'ar' ? categoriesAr : categoriesEn;

  const filteredVideos = selectedCategory === 'all'
    ? TIKTOK_VIDEOS
    : TIKTOK_VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-4 sm:space-y-5">
      
      <div className="bg-gradient-to-r from-black via-slate-900 to-[#0A2540] text-white rounded-3xl p-5 border border-slate-800 flex items-center justify-between flex-wrap gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#FECC00]">🎵</span>
            <h3 className="font-extrabold text-lg">
              {language === 'ar' ? 'فيديوهات @dalelak.sweden' : '@dalelak.sweden Video Guides'}
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            {language === 'ar'
              ? 'محتوى مرئي مبسّط: جولات، نصائح إجرائية، وأماكن خفية تستحق الزيارة'
              : 'Visual guides: official walkthroughs, procedural tips, and secret spots in Sweden'}
          </p>
        </div>

        <a
          href="https://www.tiktok.com/@dalelak.sweden"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FECC00] hover:bg-yellow-400 text-[#0A2540] font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow active:scale-95"
        >
          <span>{language === 'ar' ? 'افتح الحساب على TikTok' : 'Open TikTok Profile'}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Video Filter Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Videos Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredVideos.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            {/* Video Poster */}
            <a
              href={v.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-tr from-slate-900 to-[#0A2540] h-40 flex items-center justify-center p-4 group-hover:opacity-95 transition"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur group-hover:scale-110 group-hover:bg-[#FECC00] group-hover:text-[#0A2540] text-white flex items-center justify-center text-base shadow-xl transition">
                <Play className="w-5 h-5 ml-0.5 fill-current" />
              </div>
              <div className="absolute bottom-2 end-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md font-mono font-bold">
                {v.duration}
              </div>
              <div className="absolute top-2 start-2 bg-[#FECC00] text-[#0A2540] text-[10px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                <span>@dalelak.sweden</span>
              </div>
            </a>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#005293] bg-blue-50 px-2 py-0.5 rounded-md">
                  {v.categoryLabel}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2 leading-snug group-hover:text-[#005293] transition line-clamp-2">
                  {v.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <Eye className="w-3 h-3" />
                  <span>{v.views} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                </span>
                <a
                  href={v.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0A2540] hover:text-[#005293] flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'شاهد على TikTok' : 'Watch on TikTok'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
