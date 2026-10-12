import React from 'react';
import { Bookmark, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { GUIDES_DATABASE, getLocalizedGuide } from '../data/guides';
import { Guide } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SavedTabProps {
  savedBookmarkIds: Set<string>;
  onOpenGuideModal: (guide: Guide) => void;
  onToggleBookmark: (guideId: string) => void;
  onClearAllBookmarks: () => void;
  onNavigateToExplore: () => void;
}

export const SavedTab: React.FC<SavedTabProps> = ({
  savedBookmarkIds,
  onOpenGuideModal,
  onToggleBookmark,
  onClearAllBookmarks,
  onNavigateToExplore,
}) => {
  const { language, isRTL, t } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const savedGuides = GUIDES_DATABASE.filter((g) => savedBookmarkIds.has(g.id)).map((g) =>
    getLocalizedGuide(g, language)
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#FECC00] fill-[#FECC00]" />
            <span>
              {language === 'ar' ? 'مفضلاتي المحفوظة' : 'My Saved Bookmarks'} ({savedGuides.length})
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'الأدلة والموضوعات والجولات التي حفظتها للرجوع إليها سريعاً'
              : 'Guides, topics, and itineraries you saved for quick offline reference'}
          </p>
        </div>

        {savedGuides.length > 0 && (
          <button
            onClick={onClearAllBookmarks}
            className="text-xs text-slate-400 hover:text-red-500 transition flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مسح الكل' : 'Clear All'}</span>
          </button>
        )}
      </div>

      {savedGuides.length === 0 ? (
        <div className="text-center py-16 px-4 space-y-3 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-slate-700 text-base">
            {language === 'ar' ? 'لا توجد عناصر محفوظة حتى الآن' : 'No saved bookmarks yet'}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            {language === 'ar'
              ? 'عند تصفح أي دليل أو موضوع، اضغط على زر الحفظ ❤️ ليظهر لك هنا لسهولة الوصول إليه بدون بحث.'
              : 'When browsing any official guide, tap the bookmark button ❤️ to save it here for instant access.'}
          </p>
          <button
            onClick={onNavigateToExplore}
            className="bg-[#005293] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition cursor-pointer active:scale-95"
          >
            {language === 'ar' ? 'تصفح الأدلة الآن' : 'Browse Guides Now'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-[#005293] px-2.5 py-0.5 rounded-full">
                    {guide.tag}
                  </span>
                  <button
                    onClick={() => onToggleBookmark(guide.id)}
                    className="text-xs text-red-500 hover:text-slate-400 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'إزالة' : 'Remove'}</span>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{guide.title}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{guide.summary}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {language === 'ar' ? 'تحديث:' : 'Updated:'} {guide.lastUpdated}
                </span>
                <button
                  onClick={() => onOpenGuideModal(guide)}
                  className="bg-[#0A2540] hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 active:scale-95"
                >
                  <span>{language === 'ar' ? 'فتح الدليل' : 'Open Guide'}</span>
                  <ArrowIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
