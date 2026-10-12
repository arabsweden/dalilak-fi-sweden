import { DictionaryItem, Language } from '../types';

export const SWEDISH_DICTIONARY: DictionaryItem[] = [
  {
    swedish: 'Personnummer',
    arabic: 'الرقم الشخصي / الوطني',
    desc: 'رقم التعريف السكاني الرسمي الضروري لكل المعاملات في السويد.',
    english: 'Personal Identity Number',
    descEn: 'The official 10- or 12-digit civic registration number required for banking, healthcare, and public services in Sweden.'
  },
  {
    swedish: 'Folkbokföring',
    arabic: 'التسجيل السكاني / قيد النفوس',
    desc: 'تسجيل محل إقامتك الرسمي لدى مصلحة الضرائب Skatteverket.',
    english: 'Civil Registration',
    descEn: 'Official registration of your domicile address and civil status with the Swedish Tax Agency (Skatteverket).'
  },
  {
    swedish: 'Uppehållstillstånd',
    arabic: 'تصريح الإقامة',
    desc: 'البطاقة أو الوثيقة التي تمنحك حق البقاء القانوني في السويد.',
    english: 'Residence Permit',
    descEn: 'The official decision and card granting you lawful status to reside in Sweden (temporary or permanent).'
  },
  {
    swedish: 'Arbetstillstånd',
    arabic: 'تصريح العمل',
    desc: 'الموافقة الرسمية الصادرة من مصلحة الهجرة لممارسة عمل نظامي.',
    english: 'Work Permit',
    descEn: 'Statutory authorization granted by the Swedish Migration Agency allowing employment with a verified employer.'
  },
  {
    swedish: 'Migrationsverket',
    arabic: 'مصلحة الهجرة السويدية',
    desc: 'الجهة المسؤولة عن اللجوء، الإقامات، ولم الشمل والجنسية.',
    english: 'Swedish Migration Agency',
    descEn: 'The governmental authority evaluating visas, residence permits, asylum applications, and Swedish citizenship.'
  },
  {
    swedish: 'Skatteverket',
    arabic: 'مصلحة الضرائب والنفوس',
    desc: 'المسؤولة عن الضرائب، شهادات الميلاد، الزواج، والرقم الشخصي.',
    english: 'Swedish Tax Agency',
    descEn: 'The government agency administering taxes, national population registry, ID-kort cards, and estate matters.'
  },
  {
    swedish: 'Försäkringskassan',
    arabic: 'صندوق التأمينات الاجتماعية',
    desc: 'جهة صرف معونات الأطفال، إجازة الوالدين، وتعويضات المرض.',
    english: 'Social Insurance Agency',
    descEn: 'The public agency handling universal benefits, child allowance (Barnbidrag), parental leave, and sickness compensation.'
  },
  {
    swedish: 'Arbetsförmedlingen',
    arabic: 'مكتب العمل والتوظيف',
    desc: 'الوكالة الحكومية لمساعدة الباحثين عن عمل والتدريب المهني.',
    english: 'Public Employment Service',
    descEn: 'The national agency coordinating labor market programs, establishment plans for newcomers, and job vacancies.'
  },
  {
    swedish: 'Socialtjänsten',
    arabic: 'الخدمات الاجتماعية (السوسيال)',
    desc: 'إدارة البلدية المسؤولة عن رعاية الأسرة وتقديم المساعدات.',
    english: 'Social Services',
    descEn: 'Municipal departments delivering social assistance, family counselling, financial support, and child welfare services.'
  },
  {
    swedish: 'Orosanmälan',
    arabic: 'بلاغ قلق / إشعار رعاية',
    desc: 'إبلاغ يُرسل للخدمات الاجتماعية عند الاشتباه بوجود خطر على طفل.',
    english: 'Child Concern Notification',
    descEn: 'A formal notice submitted to social services by schools, healthcare staff, or individuals expressing concern for a child well-being.'
  },
  {
    swedish: 'BankID',
    arabic: 'الهوية البنكية الإلكترونية',
    desc: 'التوقيع الرقمي الآمن لتسجيل الدخول في البنوك والدوائر الحكومية.',
    english: 'Electronic BankID',
    descEn: 'Sweden leading secure digital identity and electronic signature system for banking and public administration.'
  },
  {
    swedish: 'Fika',
    arabic: 'استراحة القهوة والمعجنات',
    desc: 'عادة اجتماعية سويدية شهيرة للتواصل وتناول القهوة وحلوى القرفة.',
    english: 'Coffee & Cinnamon Bun Break',
    descEn: 'A cherished Swedish social ritual of pausing work to enjoy coffee, pastries (Kanelbullar), and relaxed conversation.'
  },
  {
    swedish: 'Kollektivavtal',
    arabic: 'الاتفاقية الجماعية للعمل',
    desc: 'عقد بين النقابات وأصحاب العمل يحدد الحد الأدنى للرواتب وساعات العمل.',
    english: 'Collective Bargaining Agreement',
    descEn: 'A negotiated agreement between trade unions and employer federations regulating wages, benefits, and workplace standards.'
  },
  {
    swedish: 'Hemförsäkring',
    arabic: 'تأمين السكن والمنزل',
    desc: 'تأمين إلزامي عملياً يحميك من الحرائق والسرقات والمسؤولية القانونية.',
    english: 'Comprehensive Home Insurance',
    descEn: 'Essential tenant/owner property insurance providing fire, theft, personal liability, and travel protection.'
  },
  {
    swedish: 'Allemansrätten',
    arabic: 'حق الدخول والتجول في الطبيعة',
    desc: 'قانون دستوري سويدي يتيح للجميع التجول والتخييم في الغابات والبحيرات بحرية.',
    english: 'Right of Public Access',
    descEn: 'Sweden unique constitutional right granting everyone freedom to roam, camp, and forage berries in nature responsibly.'
  }
];

export function getLocalizedDictionaryItem(item: DictionaryItem, lang: Language): { swedish: string; translation: string; desc: string } {
  if (lang === 'en') {
    return {
      swedish: item.swedish,
      translation: item.english || item.arabic,
      desc: item.descEn || item.desc,
    };
  }
  return {
    swedish: item.swedish,
    translation: item.arabic,
    desc: item.desc,
  };
}

