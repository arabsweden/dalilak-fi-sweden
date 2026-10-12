import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeTab } from './components/HomeTab';
import { ExploreTab } from './components/ExploreTab';
import { AskAITab } from './components/AskAITab';
import { VideosTab } from './components/VideosTab';
import { SavedTab } from './components/SavedTab';
import { BottomNav } from './components/BottomNav';
import { GuideDetailModal } from './components/modals/GuideDetailModal';
import { ChecklistModal } from './components/modals/ChecklistModal';
import { DocExplainerModal } from './components/modals/DocExplainerModal';
import { LetterDrafterModal } from './components/modals/LetterDrafterModal';
import { TaxCalcModal } from './components/modals/TaxCalcModal';
import { AppealModal } from './components/modals/AppealModal';
import { SimulatorModal } from './components/modals/SimulatorModal';
import { CvAssistantModal } from './components/modals/CvAssistantModal';
import { CreatorModal } from './components/modals/CreatorModal';
import { Toast } from './components/Toast';
import { CHECKLIST_DATA } from './data/checklist';
import { Guide } from './types';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, dir } = useLanguage();
  const [currentTab, setCurrentTab] = useState<'home' | 'explore' | 'ask' | 'videos' | 'saved'>('home');
  const [exploreInitialCategory, setExploreInitialCategory] = useState<string>('all');

  // Bookmarks & Checklist state with localStorage persistence
  const [savedBookmarkIds, setSavedBookmarkIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dalelak_bookmarks');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['family-reunification', 'skatteverket-personnummer']);
  });

  // Read guides state with localStorage persistence
  const [readGuideIds, setReadGuideIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dalelak_read_guides');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['family-reunification', 'skatteverket-personnummer']);
  });

  const [checkedItemIds, setCheckedItemIds] = useState<Set<string>>(new Set(['c1', 'c2']));

  // Modals state
  const [activeGuideModal, setActiveGuideModal] = useState<Guide | null>(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState<boolean>(false);
  const [isDocExplainerModalOpen, setIsDocExplainerModalOpen] = useState<boolean>(false);
  const [isLetterDrafterModalOpen, setIsLetterDrafterModalOpen] = useState<boolean>(false);
  const [isTaxCalcModalOpen, setIsTaxCalcModalOpen] = useState<boolean>(false);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState<boolean>(false);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState<boolean>(false);
  const [isCvAssistantModalOpen, setIsCvAssistantModalOpen] = useState<boolean>(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dalelak_bookmarks', JSON.stringify(Array.from(savedBookmarkIds)));
    } catch {}
  }, [savedBookmarkIds]);

  // Synchronize read guides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dalelak_read_guides', JSON.stringify(Array.from(readGuideIds)));
    } catch {}
  }, [readGuideIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleGuideRead = (guideId: string) => {
    setReadGuideIds((prev) => {
      const next = new Set(prev);
      if (next.has(guideId)) {
        next.delete(guideId);
        showToast(language === 'ar' ? 'تم التعيين كغير مقروء' : 'Marked as unread');
      } else {
        next.add(guideId);
        showToast(language === 'ar' ? 'تمت إضافة الدليل إلى المقروءة ✓' : 'Marked as read ✓');
      }
      return next;
    });
  };

  const handleOpenGuideModal = (guide: Guide) => {
    setActiveGuideModal(guide);
    // Mark as read upon viewing
    setReadGuideIds((prev) => {
      if (prev.has(guide.id)) return prev;
      const next = new Set(prev);
      next.add(guide.id);
      return next;
    });
  };

  const handleToggleBookmark = (guideId: string) => {
    setSavedBookmarkIds((prev) => {
      const next = new Set(prev);
      if (next.has(guideId)) {
        next.delete(guideId);
        showToast(language === 'ar' ? 'تمت الإزالة من المحفوظات' : 'Removed from bookmarks');
      } else {
        next.add(guideId);
        showToast(language === 'ar' ? 'تم الحفظ في مفضلاتك ❤️' : 'Saved to bookmarks ❤️');
      }
      return next;
    });
  };

  const handleClearAllBookmarks = () => {
    setSavedBookmarkIds(new Set());
    showToast(language === 'ar' ? 'تم مسح جميع المحفوظات' : 'All bookmarks cleared');
  };

  const handleToggleChecklistItem = (id: string) => {
    setCheckedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectCategoryFromHome = (catId: string) => {
    setExploreInitialCategory(catId);
    setCurrentTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApp = () => {
    const text = language === 'ar'
      ? 'دليلك في السويد 🇸🇪 | Dalelak Sweden\nدليلك العربي المتكامل للحياة في السويد، الهجرة، الدوائر الحكومية، والسياحة مع رائد شهاب (@dalelak.sweden).'
      : 'Dalelak Sweden 🇸🇪\nComprehensive bilingual guide to Swedish authorities, residence, settlement, and life in Sweden with Raed Shihab (@dalelak.sweden).';
    if (navigator.share) {
      navigator.share({
        title: language === 'ar' ? 'دليلك في السويد 🇸🇪' : 'Dalelak Sweden 🇸🇪',
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      showToast(language === 'ar' ? 'تم نسخ رابط التطبيق لمشاركته!' : 'App link copied to clipboard!');
    }
  };

  const handleShareGuide = (guide: Guide) => {
    const text = language === 'ar'
      ? `دليلك في السويد 🇸🇪 | ${guide.title}\nالمصدر: ${guide.authority}\nتابع المزيد مع @dalelak.sweden`
      : `Dalelak Sweden 🇸🇪 | ${guide.titleEn || guide.title}\nSource: ${guide.authorityEn || guide.authority}\nFollow @dalelak.sweden`;
    navigator.clipboard.writeText(text);
    showToast(language === 'ar' ? 'تم نسخ رابط وتفاصيل الدليل!' : 'Guide details copied to clipboard!');
  };

  return (
    <div
      id="app-root"
      dir={dir}
      lang={language}
      className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-[#FECC00] selection:text-[#0A2540] pb-24 font-sans transition-colors"
    >
      
      {/* Top Header */}
      <Header
        onOpenDocExplainer={() => setIsDocExplainerModalOpen(true)}
        onOpenLetterDrafter={() => setIsLetterDrafterModalOpen(true)}
        onOpenSimulator={() => setIsSimulatorModalOpen(true)}
        onOpenTaxCalc={() => setIsTaxCalcModalOpen(true)}
        onOpenAppeal={() => setIsAppealModalOpen(true)}
        onOpenCreator={() => setIsCreatorModalOpen(true)}
        onShareApp={handleShareApp}
      />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full px-3.5 sm:px-4 pt-4 sm:pt-5 flex-1">
        {currentTab === 'home' && (
          <HomeTab
            onSelectCategory={handleSelectCategoryFromHome}
            onOpenGuideModal={handleOpenGuideModal}
            onOpenChecklist={() => setIsChecklistModalOpen(true)}
            onOpenSimulator={() => setIsSimulatorModalOpen(true)}
            onOpenTaxCalc={() => setIsTaxCalcModalOpen(true)}
            onOpenAppeal={() => setIsAppealModalOpen(true)}
            onOpenCvModal={() => setIsCvAssistantModalOpen(true)}
            onOpenDocExplainer={() => setIsDocExplainerModalOpen(true)}
            onOpenLetterDrafter={() => setIsLetterDrafterModalOpen(true)}
            completedChecklistCount={checkedItemIds.size}
            totalChecklistCount={CHECKLIST_DATA.length}
            readGuideIds={readGuideIds}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreTab
            initialCategory={exploreInitialCategory}
            onOpenGuideModal={handleOpenGuideModal}
            onToggleBookmark={handleToggleBookmark}
            savedBookmarkIds={savedBookmarkIds}
            onOpenChecklist={() => setIsChecklistModalOpen(true)}
            onOpenCvModal={() => setIsCvAssistantModalOpen(true)}
            readGuideIds={readGuideIds}
          />
        )}

        {currentTab === 'ask' && <AskAITab />}

        {currentTab === 'videos' && <VideosTab />}

        {currentTab === 'saved' && (
          <SavedTab
            savedBookmarkIds={savedBookmarkIds}
            onOpenGuideModal={handleOpenGuideModal}
            onToggleBookmark={handleToggleBookmark}
            onClearAllBookmarks={handleClearAllBookmarks}
            onNavigateToExplore={() => setCurrentTab('explore')}
          />
        )}
      </main>

      {/* 5-Item Mobile-First Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'explore' && currentTab !== 'explore') {
            setExploreInitialCategory('all');
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedBookmarkIds.size}
      />

      {/* Modals */}
      <GuideDetailModal
        guide={activeGuideModal}
        onClose={() => setActiveGuideModal(null)}
        isSaved={activeGuideModal ? savedBookmarkIds.has(activeGuideModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onShare={handleShareGuide}
        isRead={activeGuideModal ? readGuideIds.has(activeGuideModal.id) : false}
        onToggleRead={handleToggleGuideRead}
      />

      <ChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        checkedItemIds={checkedItemIds}
        onToggleItem={handleToggleChecklistItem}
      />

      <DocExplainerModal
        isOpen={isDocExplainerModalOpen}
        onClose={() => setIsDocExplainerModalOpen(false)}
        onShowToast={showToast}
      />

      <LetterDrafterModal
        isOpen={isLetterDrafterModalOpen}
        onClose={() => setIsLetterDrafterModalOpen(false)}
        onShowToast={showToast}
      />

      <TaxCalcModal
        isOpen={isTaxCalcModalOpen}
        onClose={() => setIsTaxCalcModalOpen(false)}
        onShowToast={showToast}
      />

      <AppealModal
        isOpen={isAppealModalOpen}
        onClose={() => setIsAppealModalOpen(false)}
        onShowToast={showToast}
      />

      <SimulatorModal
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        onShowToast={showToast}
      />

      <CvAssistantModal
        isOpen={isCvAssistantModalOpen}
        onClose={() => setIsCvAssistantModalOpen(false)}
        onShowToast={showToast}
      />

      <CreatorModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        onShareApp={handleShareApp}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />

    </div>
  );
}
