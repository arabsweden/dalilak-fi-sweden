import { ChecklistItem, Language } from '../types';

export const CHECKLIST_DATA: ChecklistItem[] = [
  {
    id: 'c1',
    title: 'التسجيل لدى Skatteverket في القيد السكاني (Folkbokföring)',
    category: 'أساسي',
    detail: 'توجه لأقرب مركز خدمة فور وصولك ولديك إقامة سنة أو أكثر لطلب التسجيل في النفوس.',
    titleEn: 'Register with Skatteverket for Civil Registration (Folkbokföring)',
    categoryEn: 'Essential',
    detailEn: 'Visit your nearest Statens servicecenter as soon as you arrive with a residence permit of 1 year or more.'
  },
  {
    id: 'c2',
    title: 'استلام الرقم الشخصي (Personnummer)',
    category: 'أساسي',
    detail: 'بعد وصول الرسالة بالبريد، احتفظ بالرقم الذي سيرافقك في جميع الدوائر والبنوك.',
    titleEn: 'Obtain your Swedish Personal Identity Number (Personnummer)',
    categoryEn: 'Essential',
    detailEn: 'Upon receiving your decision letter by mail, store this number safely; it is required for all public and private services.'
  },
  {
    id: 'c3',
    title: 'إصدار بطاقة الهوية السويدية (ID-kort)',
    category: 'هوية',
    detail: 'احجز موعداً في Skatteverket لدفع الرسوم وأخذ البصمة والصورة واستلام الهوية الرسمية.',
    titleEn: 'Get your Swedish National ID Card (ID-kort)',
    categoryEn: 'Identity',
    detailEn: 'Schedule an appointment at Skatteverket to pay the fee, submit biometrics, and receive your official Swedish ID card.'
  },
  {
    id: 'c4',
    title: 'فتح حساب بنكي وتفعيل BankID',
    category: 'مالي',
    detail: 'توجه للبنك مع جوازك وهويتك وعقد عملك أو قيدك السكاني للحصول على بطاقة بنكية وهوية BankID الإلكترونية.',
    titleEn: 'Open a Swedish Bank Account & Activate BankID',
    categoryEn: 'Banking',
    detailEn: 'Visit a bank with your passport, Swedish ID-kort, and registration proof to obtain a payment card and Mobile BankID.'
  },
  {
    id: 'c5',
    title: 'التسجيل لدى Försäkringskassan (التأمينات)',
    category: 'صحي واجتماعي',
    detail: 'سجل إقامتك وقم بربط حسابك البنكي لتفعيل التأمين الصحي ومعونات الأطفال.',
    titleEn: 'Register with Försäkringskassan (Social Insurance Agency)',
    categoryEn: 'Social & Health',
    detailEn: 'Submit your residency registration and link your bank account to enable healthcare coverage and child benefits.'
  },
  {
    id: 'c6',
    title: 'التسجيل في المركز الصحي (Vårdcentral) و1177',
    category: 'صحة',
    detail: 'اختر المستوصف الأقرب لبيتك وفعّل حسابك على بوابة 1177.se للرعاية الصحية.',
    titleEn: 'Register with a Local Healthcare Centre (Vårdcentral) & 1177',
    categoryEn: 'Healthcare',
    detailEn: 'Select your preferred local clinic and log in to 1177.se for appointment bookings and medical advice.'
  },
  {
    id: 'c7',
    title: 'التسجيل في دورات تعلم السويدية (SFI)',
    category: 'لغة',
    detail: 'راجع البلدية (Kommunen) لبدء دروس اللغة السويدية المجانية للقادمين الجدد.',
    titleEn: 'Enroll in Swedish for Immigrants (SFI) Language Classes',
    categoryEn: 'Language',
    detailEn: 'Contact your municipality (Kommun) to enroll in free Swedish language training designed for newcomers.'
  },
  {
    id: 'c8',
    title: 'التسجيل لدى Arbetsförmedlingen كباحث عن عمل',
    category: 'عمل',
    detail: 'سجل في مكتب العمل للتعرف على خطط التأسيس والتدريب والفرص المتاحة.',
    titleEn: 'Register with Arbetsförmedlingen (Public Employment Agency)',
    categoryEn: 'Employment',
    detailEn: 'Register as a job seeker to access establishment programs, CV coaching, and subsidized employment opportunities.'
  },
  {
    id: 'c9',
    title: 'تسجيل الأطفال في الحضانة والمدرسة (Förskola/Skola)',
    category: 'عائلة',
    detail: 'قدم طلب مقعد دراسي أو حضانة عبر بوابة البلدية الإلكترونية.',
    titleEn: 'Enroll Children in Daycare and School (Förskola/Skola)',
    categoryEn: 'Family',
    detailEn: 'Submit school and preschool queue applications through your resident municipality online portal.'
  },
  {
    id: 'c10',
    title: 'شراء بطاقة المواصلات العامة وتطبيق النقل',
    category: 'يومي',
    detail: 'حمّل تطبيق المواصلات لمدينتك (مثل SL في ستوكهولم أو Västtrafik في يوتيبوري).',
    titleEn: 'Set Up Public Transit App & Travel Card',
    categoryEn: 'Daily Life',
    detailEn: 'Download the local transit mobile app (e.g. SL for Stockholm, Västtrafik for Gothenburg, Skånetrafiken for Malmö).'
  },
  {
    id: 'c11',
    title: 'الاشتراك في تأمين السكن (Hemförsäkring)',
    category: 'سكن',
    detail: 'تأمين المنزل ضروري جداً في السويد ويحميك قانونياً ومالياً من أي حوادث أو سرقات.',
    titleEn: 'Purchase Comprehensive Home Insurance (Hemförsäkring)',
    categoryEn: 'Housing',
    detailEn: 'Home insurance is practically indispensable in Sweden, protecting against fire, water damage, theft, and legal liability.'
  },
  {
    id: 'c12',
    title: 'التعرف على قوانين وحقوق وواجبات الإقامة في السويد',
    category: 'توعية',
    detail: 'راجع دليل القوانين عبر تطبيقنا وتأكد من الالتزام بشروط إقامتك لتفادي أي إشكاليات.',
    titleEn: 'Learn Swedish Residence Rights, Laws & Obligations',
    categoryEn: 'Legal Awareness',
    detailEn: 'Review official guidelines in our app and fulfill all residence permit stipulations to avoid legal complications.'
  }
];

export function getLocalizedChecklistItem(item: ChecklistItem, lang: Language): ChecklistItem {
  if (lang === 'en') {
    return {
      ...item,
      title: item.titleEn || item.title,
      category: item.categoryEn || item.category,
      detail: item.detailEn || item.detail,
    };
  }
  return item;
}

