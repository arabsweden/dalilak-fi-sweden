export type Language = 'ar' | 'en';

export interface Guide {
  id: string;
  category: 'immigration' | 'asylum' | 'authorities' | 'work' | 'housing' | 'family' | 'stockholm' | 'tourism' | 'travel' | 'events' | 'language' | 'news';
  title: string;
  tag: string;
  lastUpdated: string;
  authority: string;
  officialUrl: string;
  summary: string;
  whatIs: string;
  who: string;
  requirements: string[];
  steps: string[];
  tiktokQuery?: string;
  // English localized fields
  titleEn?: string;
  tagEn?: string;
  authorityEn?: string;
  summaryEn?: string;
  whatIsEn?: string;
  whoEn?: string;
  requirementsEn?: string[];
  stepsEn?: string[];
}

export interface DictionaryItem {
  swedish: string;
  arabic: string;
  desc: string;
  english?: string;
  descEn?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  detail: string;
  titleEn?: string;
  categoryEn?: string;
  detailEn?: string;
}

export interface DailyPhrase {
  id: string;
  swedish: string;
  pronunciationAr: string;
  situationAr: string;
  situationEn: string;
  situationSv: string;
  arabicMeaning: {
    meaning: string;
    explanation: string;
    usageTip: string;
  };
  swedishMeaning: {
    meaning: string;
    explanation: string;
    usageTip: string;
  };
}

export interface TikTokVideo {
  id: string;
  title: string;
  category: 'immigration' | 'stockholm' | 'life' | 'tourism';
  categoryLabel: string;
  duration: string;
  views: string;
  description: string;
  tiktokUrl: string;
  titleEn?: string;
  descriptionEn?: string;
  categoryLabelEn?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  sources?: { title: string; uri: string }[];
  timestamp: Date;
}
