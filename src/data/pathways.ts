export interface PathwayStep {
  title: string;
  desc: string;
  warning?: string;
  authority?: string;
}

export interface PathwayItem {
  id: string;
  location: 'outside' | 'inside';
  category: 'work' | 'study' | 'family' | 'visa' | 'id_banking' | 'housing' | 'healthcare' | 'rights' | 'citizenship';
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  summaryAr: string;
  summaryEn: string;
  quickSolutionAr: string;
  quickSolutionEn: string;
  timeframeAr: string;
  timeframeEn: string;
  costAr: string;
  costEn: string;
  officialAuthorityAr: string;
  officialAuthorityEn: string;
  officialUrl: string;
  officialPortalName: string;
  stepsAr: PathwayStep[];
  stepsEn: PathwayStep[];
  criticalRule2026Ar: string;
  criticalRule2026En: string;
  commonMistakesAr: string[];
  commonMistakesEn: string[];
  toolRecommendation?: 'tax_calc' | 'appeal' | 'simulator' | 'cv_assistant' | 'doc_explainer' | 'checklist' | 'emergency' | 'letter_drafter';
}

export const SWEDEN_PATHWAYS: PathwayItem[] = [
  // ==========================================
  // OUTSIDE SWEDEN (خارج السويد)
  // ==========================================
  {
    id: 'outside-work-permit-2026',
    location: 'outside',
    category: 'work',
    titleAr: 'الحصول على تصريح عمل في السويد من الخارج (شروط 2026)',
    titleEn: 'Obtaining a Swedish Work Permit from Abroad (2026 Rules)',
    badgeAr: 'وظائف وتأشيرات 💼',
    badgeEn: 'Work & Visas 💼',
    summaryAr: 'دليل كامل لكيفية العثور على صاحب عمل سويدي، شروط عقد العمل، والحد الأدنى للراتب الجديد المفروض قانوناً.',
    summaryEn: 'Complete roadmap on finding a Swedish employer, work contract criteria, and the new statutory salary threshold.',
    quickSolutionAr: 'احرص على أن يعلن صاحب العمل الوظيفة أولاً لمدة 10 أيام في بوابة EURES/Arbetsförmedlingen، وألا يقل الراتب الشهري عن 29,680 كرون (80% من متوسط الرواتب السويدية لعام 2026). يبدأ صاحب العمل التقديم لك إلكترونياً لدى مصلحة الهجرة.',
    quickSolutionEn: 'Ensure the employer advertises the job for at least 10 days on EURES/Arbetsförmedlingen, and the gross monthly salary meets at least 29,680 SEK (80% median salary threshold). The employer initiates the digital permit on Migrationsverket.',
    timeframeAr: '2 إلى 4 أشهر في المتوسط للطلبات الرقمية المكتملة',
    timeframeEn: '2 to 4 months on average for certified digital applications',
    costAr: 'رسوم تصريح العمل: 2,200 كرون للشخص البالغ',
    costEn: 'Work permit fee: 2,200 SEK per adult applicant',
    officialAuthorityAr: 'مصلحة الهجرة السويدية (Migrationsverket)',
    officialAuthorityEn: 'Swedish Migration Agency (Migrationsverket)',
    officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html',
    officialPortalName: 'Migrationsverket Work Portal',
    stepsAr: [
      {
        title: 'البحث عن فرصة عمل مؤهلة',
        desc: 'ابحث في بوابات التوظيف الرسمية مثل Arbetsförmedlingen Platsbanken أو LinkedIn أو The Hub للشركات الناشئة.',
        authority: 'Arbetsförmedlingen'
      },
      {
        title: 'شرط إعلان الوظيفة 10 أيام',
        desc: 'يجب قانوناً أن يقوم صاحب العمل بنشر إعلان الوظيفة في السويد والاتحاد الأوروبي لمدة 10 أيام كحد أدنى قبل توقيع العقد.',
        warning: 'عدم نشر الإعلان يُعد سبباً حتمياً لرفض مصلحة الهجرة للتصريح لاحقاً!'
      },
      {
        title: 'عرض العمل وموافقة النقابة (Fackligt yttrande)',
        desc: 'يرسل صاحب العمل شروط العمل والتأمينات وراتبك للنقابة السويدية المعنية بمجالك للحصول على موافقتها على أن الشروط تطابق المعايير السويدية (Kollektivavtal).',
        authority: 'Facket'
      },
      {
        title: 'تقديم الطلب الإلكتروني ودفع الرسوم',
        desc: 'يبدأ صاحب العمل المعاملة إلكترونياً، ثم تصلك دعوة عبر البريد الإلكتروني لإكمال بياناتك، إرفاق جواز السفر ودفع الرسوم.',
        authority: 'Migrationsverket'
      },
      {
        title: 'فحص جواز السفر في السفارة واستلام بطاقة الإقامة (UT-kort)',
        desc: 'تزور السفارة السويدية أو مركز VFS في بلدك لمطابقة جواز السفر الأصلي وأخذ البصمات والصورة لإصدار كرت الإقامة قبل السفر.',
        authority: 'Sveriges Ambassad / VFS Global'
      }
    ],
    stepsEn: [
      {
        title: 'Find an Eligible Job Offer',
        desc: 'Search reputable portals such as Arbetsförmedlingen Platsbanken, LinkedIn, or The Hub for tech startups.',
        authority: 'Arbetsförmedlingen'
      },
      {
        title: 'Mandatory 10-day EURES Job Ad',
        desc: 'The employer is legally required to advertise the position across Sweden and EU/EEA for at least 10 days before hiring.',
        warning: 'Failure to run the public ad is a frequent cause of permit rejection!'
      },
      {
        title: 'Employment Offer & Trade Union Opinion',
        desc: 'The employer drafts terms and sends them to the relevant Swedish trade union to certify compliance with collective agreement standards (kollektivavtal).',
        authority: 'Trade Union (Facket)'
      },
      {
        title: 'Submit Digital Application & Pay Fees',
        desc: 'The employer initiates the online case; you receive an email link to complete personal data, upload passport, and pay the fee.',
        authority: 'Migrationsverket'
      },
      {
        title: 'Passport Check at Embassy & Biometrics',
        desc: 'Visit your local Swedish Embassy or VFS center for passport verification and biometrics before traveling to Sweden.',
        authority: 'Swedish Embassy / VFS Global'
      }
    ],
    criticalRule2026Ar: 'الحد الأدنى للأجور لتصاريح العمل في عام 2026 هو 80% من متوسط الراتب السويدي (حوالي 29,680 كرون شهرياً قبل الضريبة). العقود براتب أقل من ذلك تُرفض تلقائياً من مصلحة الهجرة.',
    criticalRule2026En: 'The mandatory gross salary threshold for work permits in 2026 is 80% of the Swedish median wage (approx. 29,680 SEK/month). Applications below this figure are rejected outright.',
    commonMistakesAr: [
      'دفع مبالغ لوسطاء أو سماسرة يدعون بيع عقود عمل (ممنوع قانوناً ويدرجك في القائمة السوداء).',
      'إغفال شرط تأمين العمل الأربعة الإلزامية (تأمين التقاعد، الحوادث، الحياة، والمرض).',
      'تقديم جواز سفر تنتهي صلاحيته في أقل من عام (تصريح الإقامة لا يتجاوز مدة صلاحية الجواز).'
    ],
    commonMistakesEn: [
      'Paying brokers or middlemen for job offers (strictly illegal under Swedish penal law).',
      'Neglecting the 4 compulsory insurance policies (retirement, occupational injury, life, and sickness).',
      'Applying with a passport expiring in under a year (residence permit validity is capped by passport validity).'
    ],
    toolRecommendation: 'tax_calc'
  },
  {
    id: 'outside-university-admissions',
    location: 'outside',
    category: 'study',
    titleAr: 'الدراسة في الجامعات السويدية والمنح الدراسية',
    titleEn: 'Studying in Swedish Universities & Scholarships',
    badgeAr: 'دراسة وجامعات 🎓',
    badgeEn: 'Study & Admissions 🎓',
    summaryAr: 'كيف تقدم على برامج البكالوريوس والماجستير باللغة الإنجليزية في السويد والتقديم على منحة المعهد السويدي الكاملة.',
    summaryEn: 'How to apply for English-taught Bachelor and Master programs in Sweden and qualify for the Swedish Institute full scholarship.',
    quickSolutionAr: 'يتم التقديم لجميع جامعات السويد حصرياً عبر موقع Universityadmissions.se. ينتهي التقديم لخريف كل عام في منتصف شهر يناير. للطلاب من خارج أوروبا، تقدم منحة المعهد السويدي (SI Scholarship) تغطية 100% للرسوم وراتباً شهرياً للمعيشة.',
    quickSolutionEn: 'All admissions are centrally coordinated through Universityadmissions.se. Autumn round applications close mid-January. Non-EU students can apply for the prestigious Swedish Institute (SI) Scholarship for 100% tuition and living stipend.',
    timeframeAr: 'فترة التقديم الخريفي: من أكتوبر إلى يناير، وتعلن النتائج في مارس/أبريل',
    timeframeEn: 'Autumn round: October to mid-January, admissions announced in March/April',
    costAr: 'رسوم التقديم للجامعات: 900 كرون (للطلاب من خارج الاتحاد الأوروبي)، والرسوم السنوية 90,000 - 150,000 كرون',
    costEn: 'Application fee: 900 SEK (non-EU), tuition ranges from 90,000 to 150,000 SEK/year',
    officialAuthorityAr: 'مجلس الجامعات والتعليم العالي وموقع القبول الموحد (UHR)',
    officialAuthorityEn: 'Swedish Council for Higher Education (UHR / University Admissions)',
    officialUrl: 'https://www.universityadmissions.se/intl/start',
    officialPortalName: 'University Admissions Sweden',
    stepsAr: [
      {
        title: 'اختيار حتى 4 برامج ماجستير في موقع التقديم',
        desc: 'أنشئ حساباً على Universityadmissions.se ورتب رغباتك حسب الأولوية.',
        authority: 'University Admissions'
      },
      {
        title: 'رفع الوثائق وإثبات إتقان اللغة الإنجليزية (IELTS / TOEFL)',
        desc: 'ارفع كشوف العلامات وشهادة التخرج مع ترجمة معتمدة، بالإضافة لنتيجة اختبار اللغة (درجة 6.5 أو ما يعادلها لمعظم البرامج).',
        warning: 'تأكد من مطابقة شروط بلدك الخاصة بتوثيق الشهادات المذكورة في الموقع.'
      },
      {
        title: 'التقديم على منحة المعهد السويدي (Swedish Institute Scholarship)',
        desc: 'تفتح المنحة في فبراير سنوياً وتتطلب خبرة عمل مثبتة وسيرة ذاتية ورسائل تزكية مخصصة.',
        authority: 'Svenska Institutet (SI)'
      },
      {
        title: 'صدور القبول والتقديم على تصريح إقامة الدراسة (Uppehållstillstånd för studier)',
        desc: 'بعد دفع القسط الأول (أو نيل المنحة)، تقدم لمصلحة الهجرة وتثبت امتلاكك لمبلغ المعيشة الشهري (حوالي 10,300 كرون/شهر).',
        authority: 'Migrationsverket'
      }
    ],
    stepsEn: [
      {
        title: 'Choose up to 4 programs on portal',
        desc: 'Create an account on Universityadmissions.se and rank your chosen degrees in order of preference.',
        authority: 'University Admissions'
      },
      {
        title: 'Upload certified transcripts & English proof',
        desc: 'Submit translated transcripts, diploma, and official test results (IELTS 6.5 or TOEFL equivalent for English 6).',
        warning: 'Review specific country requirements for original verification on the admissions portal.'
      },
      {
        title: 'Apply for Swedish Institute (SI) Scholarship',
        desc: 'SI window opens every February for master programs, requiring leadership experience, CV, and work certificates.',
        authority: 'Swedish Institute (SI)'
      },
      {
        title: 'Accept Offer & Apply for Student Residence Permit',
        desc: 'Upon admission and tuition settlement, apply online at Migrationsverket showing sufficient maintenance funds (approx. 10,300 SEK/month).',
        authority: 'Migrationsverket'
      }
    ],
    criticalRule2026Ar: 'يحق لحاملي إقامة الطالب في السويد العمل بدوام كامل أو جزئي أثناء فترة الدراسة دون قيود على ساعات العمل، بشرط الحفاظ على التقدم الأكاديمي واجتياز الامتحانات (30 ساعة معتمدة لكل فصل).',
    criticalRule2026En: 'International students in Sweden hold an automatic right to work alongside their studies with no formal hourly caps, provided they maintain satisfactory academic progress (30 ECTS per semester).',
    commonMistakesAr: [
      'التأخر عن الموعد النهائي لرفع الوثائق (عادة مطلع فبراير) يؤدي لشطب الطلب تلقائياً.',
      'عدم ترتيب الرغبات بعناية (إذا تم قبولك في رغبتك الأولى، تُلغى جميع الرغبات التالية فوراً).',
      'تقديم كشف حساب بنكي لا يحتوي على الرصيد بالكامل باسم الطالب نفسه.'
    ],
    commonMistakesEn: [
      'Missing the document submission deadline (usually early February) cancels your entire application.',
      'Failing to prioritize rankings properly (being accepted to your 1st choice automatically drops choices 2-4).',
      'Providing bank statements that are not under the direct personal name of the student.'
    ],
    toolRecommendation: 'simulator'
  },
  {
    id: 'outside-family-reunification',
    location: 'outside',
    category: 'family',
    titleAr: 'لمّ الشمل العائلي من خارج السويد والشروط المالية',
    titleEn: 'Family Reunification from Abroad & Maintenance Rules',
    badgeAr: 'لمّ الشمل والأسرة 👨‍👩‍👦',
    badgeEn: 'Family Reunification 👨‍👩‍👦',
    summaryAr: 'دليل الانتقال للشريك أو الوالدين والأطفال: شروط دخل الشخص المقيم في السويد وحجم السكن المطلوب تجنباً للرفض.',
    summaryEn: 'Guide on joining a spouse, child, or family member: required living area and minimum disposable income thresholds.',
    quickSolutionAr: 'يجب أن يقدم الشخص الموجود في الخارج الطلب عبر الإنترنت، في حين يجب على المقيم في السويد إثبات امتلاك دخل عمل كافٍ وسكن مناسب بالحجم المطلوب. لا تُقبل طلبات لم الشمل إذا كان الشخص في السويد يعتمد على المساعدات الاجتماعية أو يسكن في غرفة غير مستقلة.',
    quickSolutionEn: 'The foreign family member applies online while the resident in Sweden must satisfy both the income maintenance test and adequate living space criteria. Social welfare dependence is grounds for denial.',
    timeframeAr: 'تتراوح المدة الحالية بين 9 إلى 18 شهراً بحسب اكتمال الملف وجنسية المتقدم',
    timeframeEn: 'Currently 9 to 18 months depending on case complexity and interview schedules',
    costAr: 'رسوم مصلحة الهجرة: 2,000 كرون للبالغ و1,000 كرون لكل طفل دون 18 عاماً',
    costEn: 'Application fee: 2,000 SEK per adult, 1,000 SEK per child under 18',
    officialAuthorityAr: 'مصلحة الهجرة السويدية (Migrationsverket)',
    officialAuthorityEn: 'Swedish Migration Agency',
    officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Moving-to-someone-in-Sweden.html',
    officialPortalName: 'Migrationsverket Moving to Sweden',
    stepsAr: [
      {
        title: 'تحقق الشخص المقيم في السويد من شروط الإعالة (Försörjningskrav)',
        desc: 'يجب أن يتبقى من راتبه بعد دفع الإيجار الصافي مبلغ شهري محدد وفق مصلحة الهجرة (حوالي 10,061 كرون للزوجين معاً بالإضافة لمبلغ لكل طفل).',
        warning: 'الدخل يجب أن يكون من عمل نظامي ثابت أو عمل تجاري معتمد، وليس من السوسيال.'
      },
      {
        title: 'تحقق شرط السكن الملائم (Bostadskrav)',
        desc: 'للزوجين بدون أطفال: شقة بغرفة وصالة ومطبخ كحد أدنى. مع أطفال: غرفتان نوم وصالة ومطبخ على الأقل.',
        warning: 'عقود الإيجار من الباطن (Andrahand) يجب أن تكون موافقاً عليها رسمياً من مالك البناء ولمدة لا تقل عن سنة.'
      },
      {
        title: 'تقديم الطلب الإلكتروني من الخارج',
        desc: 'يملأ مقدم الطلب الموجود بالخارج استمارة الطلب ويدفع الرسوم، ثم يُرسل استبيان إلكتروني للمقيم في السويد لتعبئة بيانات دخله وسكنه.',
        authority: 'Migrationsverket'
      },
      {
        title: 'مقابلة السفارة وفحص صلة القرابة',
        desc: 'تتم دعوة المتقدم بالسفارة السويدية بالخارج للتحقق من جوازات السفر وإجراء مقابلة مطابقة العلاقات والزواج.',
        authority: 'Swedish Embassy'
      }
    ],
    stepsEn: [
      {
        title: 'Anchor person verifies income maintenance test',
        desc: 'After deducting monthly rent, net disposable income must meet statutory minimums (approx. 10,061 SEK for cohabiting couples + child allowances).',
        warning: 'Income must derive from lawful regular employment or verified business, not municipal social welfare.'
      },
      {
        title: 'Satisfy housing standard requirements',
        desc: 'Couples without children require at least 1 bedroom + living room + kitchen. Couples with children require at least 2 bedrooms.',
        warning: 'Sublet contracts (andrahand) must have formal landlord/housing association written consent valid for at least 1 year.'
      },
      {
        title: 'Submit digital application from abroad',
        desc: 'The foreign partner applies online; the Swedish anchor receives a digital survey to detail residence and employment proof.',
        authority: 'Migrationsverket'
      },
      {
        title: 'Embassy interview & relationship verification',
        desc: 'The applicant is summoned to the nearest Swedish embassy for original passport verification and interview.',
        authority: 'Swedish Embassy'
      }
    ],
    criticalRule2026Ar: 'إذا تزوجت أو أنجبت بعد حصول شريكك على الإقامة، ينطبق شرط الإعالة والسكن بالكامل دون استثناءات إلا في حالات نادرة جداً للمشمولين بصفة لاجئ وفق اتفاقية جنيف خلال أول 3 أشهر فقط.',
    criticalRule2026En: 'The maintenance and housing requirements strictly apply if the relationship was formed after the sponsor arrived in Sweden, with very narrow exceptions for certified Geneva convention refugees within 3 months.',
    commonMistakesAr: [
      'تقديم عقد إيجار أسود (Svartkontrakt) غير موافق عليه من جمعية البناء (BRF) - يؤدي لرفض فوري.',
      'الاعتماد على وعود بالتوظيف بدلاً من إبراز رواتب فعلية مدفوعة لعدة أشهر مضت.',
      'عدم ترجمة وتصديق عقود الزواج وشهادات الميلاد من وزارة الخارجية والسفارة السويدية.'
    ],
    commonMistakesEn: [
      'Submitting informal or unauthorized sublet agreements (results in immediate denial).',
      'Relying on tentative future job promises rather than steady verifiable payslips over preceding months.',
      'Neglecting official translation and legalization stamps on marriage and birth certificates.'
    ],
    toolRecommendation: 'doc_explainer'
  },
  {
    id: 'outside-tourist-schengen-visa',
    location: 'outside',
    category: 'visa',
    titleAr: 'تأشيرة شنغن السياحية وزيارة الأقارب في السويد',
    titleEn: 'Tourist Schengen Visa & Family Visits to Sweden',
    badgeAr: 'فيزا وزيارات ✈️',
    badgeEn: 'Visas & Travel ✈️',
    summaryAr: 'متطلبات فيزا شنغن (Type C) لزيارة السويد لمدة تصل إلى 90 يوماً، استمارة الدعوة الرسمية، والتأمين الصحي.',
    summaryEn: 'Requirements for a 90-day Schengen visitor visa (Type C) to Sweden, sponsorship invitation form, and travel insurance.',
    quickSolutionAr: 'قدم طلبك قبل 15 إلى 45 يوماً من موعد السفر عبر مركز VFS Global أو السفارة. إذا كنت مدعواً من قريب، يجب أن يرسل لك استمارة الدعوة الرسمية (Blankett 241011) مع شهادة قيد شخصية مخصصة للدعوة (Familjebevis) صادرة من Skatteverket.',
    quickSolutionEn: 'Apply 15 to 45 days prior to travel via VFS Global or embassy. If visiting family, request an official invitation form (Blankett 241011) and an official civil registration certificate (Familjebevis) from Skatteverket.',
    timeframeAr: '15 إلى 30 يوم عمل كمتوسط لمعالجة الطلب',
    timeframeEn: '15 to 30 working days average processing turnaround',
    costAr: 'رسوم التأشيرة: 90 يورو للبالغين و45 يورو للأطفال بين 6-12 عاماً',
    costEn: 'Visa fee: 90 EUR for adults, 45 EUR for children 6-12 years',
    officialAuthorityAr: 'مصلحة الهجرة ومراكز VFS Global',
    officialAuthorityEn: 'Swedish Migration Agency & VFS Global',
    officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Visiting-Sweden.html',
    officialPortalName: 'Visiting Sweden Visa Guide',
    stepsAr: [
      {
        title: 'تحديد نوع الزيارة (سياحة شخصية أو زيارة عائلية)',
        desc: 'في الزيارة العائلية، يرسل المقيم استمارة الدعوة الرسمية (Inbjudan 241011) مع قيد عائلي Familjebevis وصورة إقامته أو جوازه.',
        authority: 'Skatteverket'
      },
      {
        title: 'إثبات القدرة المالية للمعيشة',
        desc: 'يجب إثبات توفر ما لا يقل عن 450 كرون سويدي عن كل يوم إقامة في السويد عبر كشف حساب بنكي لآخر 3 أشهر.',
        warning: 'إذا كان الداعي سيتكفل بمصاريفك، يجب إرفاق كشوفات حسابه وراتبه.'
      },
      {
        title: 'حجز تأمين السفر الصحي الإلزامي',
        desc: 'تأمين طبي يغطي كامل منطقة شنغن بحد أدنى 30,000 يورو لحالات الطوارئ وإعادة الجثمان.',
        authority: 'Insurance'
      },
      {
        title: 'حجز موعد وتقديم الطلب في VFS Global',
        desc: 'حضور المقابلة وتقديم الوثائق الأصلية مع حجز طيران وفندقي أولي وأخذ البصمات.',
        authority: 'VFS Global'
      }
    ],
    stepsEn: [
      {
        title: 'Choose visa type (Tourism vs Family Visit)',
        desc: 'Family visits require official invitation form 241011 plus civil registration document (Familjebevis) from Skatteverket.',
        authority: 'Skatteverket'
      },
      {
        title: 'Demonstrate sufficient funds (450 SEK/day)',
        desc: 'Show at least 450 SEK per day of stay in Sweden through recent 3-month personal bank statements or sponsor guarantees.',
        warning: 'If the host pays for upkeep, submit their employer payslips and account proof.'
      },
      {
        title: 'Purchase compliant Schengen travel insurance',
        desc: 'Medical coverage must cover at least 30,000 EUR for all Schengen member states covering repatriation and emergency care.',
        authority: 'Insurance'
      },
      {
        title: 'Book appointment and submit biometrics at VFS',
        desc: 'Attend the interview with original documents, flight reservations, and biometric fingerprints.',
        authority: 'VFS Global'
      }
    ],
    criticalRule2026Ar: 'تأشيرة شنغن تتيح الإقامة لمدة أقصاها 90 يوماً خلال أي فترة 180 يوماً، ولا تخولك العمل إطلاقاً داخل السويد أو تحويلها لإقامة عمل من الداخل.',
    criticalRule2026En: 'Schengen visas authorize stays of up to 90 days in any 180-day window and strictly forbid working or transitioning to in-country work permits.',
    commonMistakesAr: [
      'شراء تذاكر طيران نهائية غير قابلة للاسترداد قبل صدور التأشيرة (يُكتفى بحجز مبدئي مؤكد).',
      'تقديم قيد نفوس عادي بدلاً من وثيقة Familjebevis الصادرة من مصلحة الضرائب لغرض الدعوة.',
      'عدم إثبات روابط العودة إلى بلدك (مثل وظيفة قائمة أو ملكية عقار أو دراسة جامعية).'
    ],
    commonMistakesEn: [
      'Purchasing non-refundable airline tickets before visa issuance (provisional bookings suffice).',
      'Submitting standard registration transcripts instead of Familjebevis specifying family links.',
      'Failing to demonstrate ties to your home country (active employment, property, or ongoing studies).'
    ],
    toolRecommendation: 'letter_drafter'
  },

  // ==========================================
  // INSIDE SWEDEN (داخل السويد)
  // ==========================================
  {
    id: 'inside-first-90-days',
    location: 'inside',
    category: 'id_banking',
    titleAr: 'أول 90 يوماً في السويد: الرقم الشخصي، الهوية، وBankID',
    titleEn: 'First 90 Days in Sweden: Personnummer, ID-kort & BankID',
    badgeAr: 'الخطوة الأولى 🆔',
    badgeEn: 'First Steps 🆔',
    summaryAr: 'خارطة طريق الواصل الجديد: التسجيل في مصلحة الضرائب، إصدار البطاقة الشخصية، وحل مشاكل فتح الحساب البنكي.',
    summaryEn: 'Newcomer roadmap: Skatteverket population registry, ID card appointment, and unlocking Swedish digital banking.',
    quickSolutionAr: 'احجز فوراً موعداً في Skatteverket لإثبات وجودك (Folkbokföring). بعد صدور الرقم الشخصي (4 أرقام أخيرة)، تقدم بطلب إصدار بطاقة الهوية (Skatteverket ID-kort). مع الهوية، يحق لك قانوناً فتح حساب دفع أساسي في أي بنك سويدي والحصول على BankID.',
    quickSolutionEn: 'Book immediately at Skatteverket for population registration (Folkbokföring). Once your Personnummer is issued, apply for the Skatteverket ID-card. With this ID, you possess a legal right to open a basic bank account (Betalkonto) and BankID.',
    timeframeAr: 'الرقم الشخصي: 2 إلى 6 أسابيع | بطاقة الهوية: أسبوعان | الحساب البنكي: أسبوع إلى 3 أسابيع',
    timeframeEn: 'Personnummer: 2-6 weeks | ID Card: 2 weeks | Bank Account: 1-3 weeks',
    costAr: 'إصدار الرقم الشخصي مجاني تماماً | رسوم بطاقة الهوية لدى الضرائب: 400 كرون',
    costEn: 'Personnummer is completely free | Skatteverket ID-card fee: 400 SEK',
    officialAuthorityAr: 'مصلحة الضرائب (Skatteverket) والبنوك السويدية',
    officialAuthorityEn: 'Swedish Tax Agency (Skatteverket) & Commercial Banks',
    officialUrl: 'https://www.skatteverket.se/servicelankar/otherlanguages/inenglish/individualsandemployees/movingtosweden.4.7be5268414bea064694c40c.html',
    officialPortalName: 'Skatteverket Moving to Sweden',
    stepsAr: [
      {
        title: 'زيارة مصلحة الضرائب مع جواز السفر وقرار الإقامة',
        desc: 'اذهب إلى أقرب فرع لـ Statens servicecenter أو Skatteverket مصطحباً جواز سفرك الأصلي وبطاقة الإقامة وعقد الزواج/شهادات الميلاد.',
        authority: 'Skatteverket'
      },
      {
        title: 'استلام خطاب الرقم الشخصي (Personnummer)',
        desc: 'يصلك بالبريد رقم يتكون من 12 خانة (تاريخ ميلادك + 4 أرقام). هذا الرقم هو مفتاح كل المعاملات والخدمات في السويد.',
        authority: 'Skatteverket'
      },
      {
        title: 'دفع 400 كرون وحجز موعد بطاقة الهوية السويدية (ID-kort)',
        desc: 'ادفع الرسوم مسبقاً عبر البنك واحجز موعداً في Skatteverket لأخذ البصمة والصورة واستلام البطاقة بعد أسبوعين.',
        authority: 'Skatteverket'
      },
      {
        title: 'فتح حساب بنكي وإصدار BankID',
        desc: 'توجه لأحد البنوك الكبرى (مثل SEB أو Swedbank أو Handelsbanken). استند إلى حقك القانوني في حساب الدفع الأساسي (Rätt till betalkonto).',
        warning: 'لا يمكن للبنوك رفض فتح حساب إذا أظهرت هوية سويدية صالحة ومصدر أموال واضح.'
      },
      {
        title: 'التسجيل في Försäkringskassan وSFI',
        desc: 'سجل في التأمينات الاجتماعية إلكترونياً للحصول على التأمين الصحي وتعويضات الأطفال، وسجل في دورات SFI لتعلم اللغة مجاناً.',
        authority: 'Försäkringskassan'
      }
    ],
    stepsEn: [
      {
        title: 'Visit Skatteverket / Servicecenter with original docs',
        desc: 'Present your valid passport, residence decision, and legalized family certificates to register in the population database.',
        authority: 'Skatteverket'
      },
      {
        title: 'Receive your 12-digit Personnummer letter',
        desc: 'Your unique civic registration number will arrive via postal mail, unlocking virtually every public system.',
        authority: 'Skatteverket'
      },
      {
        title: 'Pay 400 SEK fee & capture ID-card biometrics',
        desc: 'Pre-pay the 400 SEK fee, schedule an ID appointment at Skatteverket, and receive your official physical identity card in ~2 weeks.',
        authority: 'Skatteverket'
      },
      {
        title: 'Open Swedish bank account & activate BankID',
        desc: 'Visit a primary bank (SEB, Swedbank, Handelsbanken). Invoke your EU statutory right to a basic payment account (Betalkonto).',
        warning: 'Banks cannot arbitrarily deny a basic account once you hold a valid Swedish ID and legitimate money source.'
      },
      {
        title: 'Register with Försäkringskassan & enroll in SFI',
        desc: 'Submit notification to the Social Insurance Agency for healthcare/child benefits, and sign up at your local municipality for free SFI Swedish classes.',
        authority: 'Försäkringskassan & Municipality'
      }
    ],
    criticalRule2026Ar: 'بموجب القانون السويدي وتوجيهات الاتحاد الأوروبي للخدمات المصرفية، يحق لأي شخص مقيم قانونياً في السويد فتح حساب بنكي أساسي مع بطاقة سحب آلي وخدمات إلكترونية، حتى لو لم يكن لديه عمل بعد.',
    criticalRule2026En: 'Under the Swedish Payment Services Act and EU Payment Accounts Directive, all lawful residents hold a legal entitlement to open a basic transaction bank account, even prior to finding employment.',
    commonMistakesAr: [
      'الذهاب إلى البنك بدون بطاقة الهوية السويدية الصادرة من Skatteverket (جواز السفر الأجنبي غالباً ما يُرفض لدى البنوك).',
      'إهمال وضع الاسم بوضوح على صندوق البريد (Postlåda)، مما يؤدي لرجوع الخطابات الرسمية وفقدان الرقم الشخصي.',
      'تأجيل التسجيل في Försäkringskassan إلى حين المرض أو الإنجاب (التسجيل المسبق يوفر أشهراً من الانتظار).'
    ],
    commonMistakesEn: [
      'Visiting the bank with foreign passports alone before acquiring the physical Skatteverket ID card.',
      'Failing to affix your exact surname on your mailbox/door, causing official mail to bounce back.',
      'Postponing Försäkringskassan registration until illness strikes (pre-registration prevents lengthy benefit delays).'
    ],
    toolRecommendation: 'checklist'
  },
  {
    id: 'inside-housing-rights',
    location: 'inside',
    category: 'housing',
    titleAr: 'أزمة السكن: عقود الإيجار، تجنب الاحتيال، واسترداد الإيجار الزائد',
    titleEn: 'Housing in Sweden: Subletting, Anti-Fraud & Rent Refunds',
    badgeAr: 'سكن وعقود 🏠',
    badgeEn: 'Housing & Rent 🏠',
    summaryAr: 'كيف تعثر على شقة يد أولى أو ثانية، ما هو الإيجار العادل قانوناً، وكيف تسترد آلاف الكرونات من المالك عبر Hyresnämnden.',
    summaryEn: 'How to secure first-hand and second-hand rentals, define legal rent caps, and claim excess rent refunds via the Rent Tribunal.',
    quickSolutionAr: 'سجل فوراً في طوابير السكن البلدية (Bostadsförmedlingen). عند استئجار شقة يد ثانية، اطلب دائماً موافقة خطية من جمعية العمارة (BRF). إذا فرض المالك إيجاراً مبالغاً فيه، يحق لك تقديم شكوى مجانية للجنة الإيجار (Hyresnämnden) واسترجاع الفارق بأثر رجعي لعام كامل!',
    quickSolutionEn: 'Enroll immediately in municipal queues (Bostadsförmedlingen). For sublets, verify the landlord’s written authorization from the housing association (BRF). If overcharged, claim full refunds retrospectively through Hyresnämnden without lawyer fees.',
    timeframeAr: 'طابور السكن الأول: سنوات حسب المدينة | شقق اليد الثانية: أيام إلى أسابيع',
    timeframeEn: 'First-hand queue: 1-10+ years | Second-hand sublets: immediate to weeks',
    costAr: 'رسوم طابور السكن: 200 إلى 300 كرون سنوياً | شكاوى هيئة الإيجار مجانية 100%',
    costEn: 'Queue fee: 200-300 SEK/year | Hyresnämnden dispute filings are 100% free',
    officialAuthorityAr: 'هيئة نزاعات الإيجار (Hyresnämnden) ومصلحة حماية المستهلك',
    officialAuthorityEn: 'Regional Rent Tribunal (Hyresnämnden)',
    officialUrl: 'https://www.domstol.se/hyres--och-arrendenamnden-i-stockholm/',
    officialPortalName: 'Hyresnämnden Portal',
    stepsAr: [
      {
        title: 'التسجيل في طوابير السكن البلدية والخاصة',
        desc: 'سجل في Bostadsförmedlingen (ستوكهولم أو يوتوبوري أو مالمو) ومواقع الشركات العقارية الخاصة مثل Rikshem وVictoriahem.',
        authority: 'Bostadskö'
      },
      {
        title: 'فحص شرعية شقة اليد الثانية (Andrahandskontrakt)',
        desc: 'تأكد من وجود وثيقة موافقة خطية من مجلس إدارة جمعية البناء (BRF-styrelse) أو المالك الأصلي للسكن.',
        warning: 'التأجير بدون موافقة يُعد تأجيراً أسود وغير قانوني ويعرضك للطرد دون أي مهلة إنذار!'
      },
      {
        title: 'قانون الإيجار العادل (Skälig hyra)',
        desc: 'في الشقق الإيجارية، يُمنع على المؤجر طلب أكثر من الإيجار الأصلي إلا بنسبة 10-15% إضافية فقط إذا كانت الشقة مفروشة بالكامل.',
        authority: 'Hyreslagen'
      },
      {
        title: 'استرداد الإيجار الزائد عبر هيئة الإيجار (Återbetalning av överhyra)',
        desc: 'احتفظ بجميع إيصالات التحويل البنكي وعقد الإيجار. يحق لك تقديم طلب استرداد لدى Hyresnämnden مجاناً.',
        authority: 'Hyresnämnden'
      }
    ],
    stepsEn: [
      {
        title: 'Enroll in municipal & private queues',
        desc: 'Register on Bostadsförmedlingen (Stockholm, Gothenburg, Malmö) and private landlord queues (Rikshem, Victoriahem).',
        authority: 'Housing Queues'
      },
      {
        title: 'Verify authorized sublease approval (BRF)',
        desc: 'Insist on seeing written consent from the condominium board (BRF) or housing corporation before signing.',
        warning: 'Subletting without formal landlord consent is an unauthorized lease, risking sudden eviction.'
      },
      {
        title: 'Understand statutory reasonable rent caps',
        desc: 'Landlords of tenancy flats may only charge their exact base rent, with an allowance of at most 10-15% extra for full furnishing.',
        authority: 'Swedish Tenancy Act'
      },
      {
        title: 'Claim excess rent repayment at Hyresnämnden',
        desc: 'Retain all bank transfer receipts and contracts. File a dispute form with the Rent Tribunal to recover thousands in overpaid rent.',
        authority: 'Hyresnämnden'
      }
    ],
    criticalRule2026Ar: 'قانون الإيجار السويدي يُجرّم بيع أو شراء عقود الإيجار (عقود اليد الأولى) بعقوبات تصل للسجن والغرامات الباهظة. احذر من أي شخص يطلب مبالغ نقدية مقابل نقل عقد سكن.',
    criticalRule2026En: 'Swedish criminal law strictly penalizes the illicit trafficking or sale of first-hand rental contracts with hefty fines and prison sentences. Never pay black money to brokers.',
    commonMistakesAr: [
      'تحويل عربون أو تأمين عبر Swish أو حساب بنكي قبل دخول الشقة وفحصها شخصياً وتوقيع العقد.',
      'الدفع نقداً دون إيصال رسمي أو تحويل إلى حساب شخص لا يتطابق اسمه مع عقد الإيجار.',
      'إهمال التأمين المنزلي (Hemförsäkring) الذي يحميك من حرائق وتسرب المياه والسرقات ومصاريف المحاماة.'
    ],
    commonMistakesEn: [
      'Transferring security deposits via Swish before physically visiting the flat and checking keys.',
      'Paying cash without signed receipts or sending funds to accounts not matching the registered leaseholder.',
      'Omitting Home Insurance (Hemförsäkring), which shields you against water leaks, burglary, and legal litigation costs.'
    ],
    toolRecommendation: 'appeal'
  },
  {
    id: 'inside-employment-rights-akassa',
    location: 'inside',
    category: 'rights',
    titleAr: 'حقوق العمل، صندوق البطالة A-kassa، وحماية النقابات',
    titleEn: 'Employment Rights, A-kassa Unemployment & Trade Unions',
    badgeAr: 'حقوق العمل 💼',
    badgeEn: 'Workers Rights 💼',
    summaryAr: 'كيف تضمن 80% من راتبك عند فقدان العمل، ما هي شروط فترة التجربة، وكيف تحميك النقابة السويدية (Facket).',
    summaryEn: 'How to safeguard 80% of your income if laid off, trial period rules, and the vital protection of Swedish trade unions.',
    quickSolutionAr: 'اشترك فوراً في صندوق بطالة مناسب لمجالك (مثل Akademikernas a-kassa أو Unionen أو Alfa-kassa) من أول يوم عمل. إذا تم إنهاء عقدك، سجل في مكتب العمل (Arbetsförmedlingen) في أول يوم بطالة بالضبط للحفاظ على استحقاقك المالي.',
    quickSolutionEn: 'Join the matching unemployment insurance fund (A-kassa) on your very first day of work. If terminated, register at Arbetsförmedlingen on day 1 of unemployment to preserve compensation entitlement.',
    timeframeAr: 'يجب استيفاء شرط العضوية (12 شهراً) وشرط العمل (6 أشهر على الأقل) لاستحقاق التعويض القائم على الدخل',
    timeframeEn: 'Requires 12 months membership and 6 months employment condition for full 80% earnings-related compensation',
    costAr: 'اشتراك صندوق A-kassa: 120 إلى 170 كرون شهرياً فقط',
    costEn: 'A-kassa monthly subscription: approx. 120 to 170 SEK/month',
    officialAuthorityAr: 'مكتب العمل وصناديق البطالة (Arbetsförmedlingen & Sveriges a-kassor)',
    officialAuthorityEn: 'Public Employment Service & Swedish A-kassa Association',
    officialUrl: 'https://www.sverigesakassor.se/',
    officialPortalName: 'Sveriges a-kassor Portal',
    stepsAr: [
      {
        title: 'فهم نوع عقد العمل الخاص بك',
        desc: 'عقد دائم (Tillsvidareanställning) يوفر أعلى درجات الحماية. عقد التجربة (Provanställning) مدته القصوى 6 أشهر يمكن إنهاؤه بإخطار أسبوعين.',
        authority: 'LAS'
      },
      {
        title: 'الاشتراك في صندوق البطالة A-kassa فوراً',
        desc: 'لا تنتظر! يجب أن تكون عضواً لمدة 12 شهراً قبل التعطل عن العمل لتستحق 80% من راتبك السابق (بحد أقصى 26,400 كرون شهرياً).',
        authority: 'A-kassa'
      },
      {
        title: 'الانتساب للنقابة العمالية (Facket)',
        desc: 'توفر النقابة محامين مجانيين لمراجعة عقود العمل، التفاوض السنوي على زيادة الراتب، وتأمين الدخل الإضافي (Inkomstförsäkring).',
        authority: 'Fackförbund'
      },
      {
        title: 'ماذا تفعل في حال الإنهاء أو الفصل؟',
        desc: 'تواصل مع نقابتك لمراجعة قانونية الفصل، وتوجه فوراً في نفس اليوم للتسجيل في Arbetsförmedlingen.',
        warning: 'أي تأخير في التسجيل بيوم واحد يضيع عليك مستحقاتك المالية لتلك الفترة!'
      }
    ],
    stepsEn: [
      {
        title: 'Identify your employment contract type',
        desc: 'Permanent (Tillsvidare) provides peak job security. Probationary (Provanställning) lasts up to 6 months and can be terminated with 2 weeks notice.',
        authority: 'Employment Protection Act (LAS)'
      },
      {
        title: 'Enroll in an A-kassa fund immediately',
        desc: 'Do not delay! A 12-month membership is required prior to job loss to receive 80% of prior earnings (up to statutory ceiling approx. 26,400 SEK/month).',
        authority: 'A-kassa'
      },
      {
        title: 'Join the sector Trade Union (Facket)',
        desc: 'Unions supply legal defense against unfair dismissal, wage negotiations, and supplementary income insurance (Inkomstförsäkring).',
        authority: 'Trade Union'
      },
      {
        title: 'Immediate action plan upon dismissal notice',
        desc: 'Consult your union immediately to verify notice terms, and report to Arbetsförmedlingen on your very first day without work.',
        warning: 'Even a 24-hour delay in registering at Arbetsförmedlingen results in lost compensation days!'
      }
    ],
    criticalRule2026Ar: 'إذا كنت حاملاً لتصريح عمل وفقدت وظيفتك، يمنحك القانون السويدي مهلة 3 أشهر للبحث عن صاحب عمل جديد وتقديم طلب تصريح عمل جديد قبل مغادرة البلاد.',
    criticalRule2026En: 'Work permit holders who lose their employment receive a legal grace window of 3 months to secure a qualifying new employer and submit a new permit petition.',
    commonMistakesAr: [
      'الاعتقاد بأن التسجيل في مكتب العمل (Arbetsförmedlingen) يعطيك راتب بطالة تلقائياً دون الاشتراك المسبق في A-kassa.',
      'الاستقالة الطوعية دون سبب قاهر (تؤدي لحرمانك من تعويض البطالة لمدة تصل إلى 45 يوماً عمل).',
      'توقيع أوراق إنهاء عمل بالتراضي دون استشارة نقابتك العمالية أولاً.'
    ],
    commonMistakesEn: [
      'Assuming Arbetsförmedlingen pays income compensation automatically without independent A-kassa membership.',
      'Resigning voluntarily without substantiated medical/legal cause (incurs a 45-day penalty suspension from benefits).',
      'Signing mutual separation termination waivers without consulting your trade union rep first.'
    ],
    toolRecommendation: 'cv_assistant'
  },
  {
    id: 'inside-citizenship-permanent-residency',
    location: 'inside',
    category: 'citizenship',
    titleAr: 'شروط الإقامة الدائمة (PUT) والجنسية السويدية لعام 2026',
    titleEn: 'Permanent Residency (PUT) & Swedish Citizenship Requirements (2026)',
    badgeAr: 'الجنسية والإقامة 🇸🇪',
    badgeEn: 'Citizenship & PR 🇸🇪',
    summaryAr: 'شروط إثبات الهوية بجواز السفر، فترات الإقامة المطلوبة، شروط عدم وجود ديون لدى Kronofogden، والمستجدات القانونية.',
    summaryEn: 'Passport identity proof, residence duration rules, debt-free clearance with Kronofogden, and latest legislative requirements.',
    quickSolutionAr: 'للتقديم على الجنسية، تحتاج عموماً إلى إقامة مستمرة لمدة 5 سنوات (أو 3 سنوات إذا كنت متزوجاً من مواطن سويدي لمدة عامين، أو 4 سنوات للاجئين المعترف بهم). يجب إرسال جواز السفر الأصلي لإثبات الهوية، وأن يكون سجلك خالياً تماماً من الديون والجرائم.',
    quickSolutionEn: 'Citizenship generally requires 5 years continuous lawful residence (3 years if cohabiting with a Swedish citizen for 2+ years, or 4 years for Geneva convention refugees). Original passport must verify identity, with spotless debt record at Kronofogden.',
    timeframeAr: 'تتراوح مدة فحص الجنسية بين عدة أشهر إلى سنتين حسب اكتمال الملف وفحص الجواز',
    timeframeEn: 'Processing times vary from a few months up to 2 years depending on passport verification queues',
    costAr: 'رسوم التقديم على الجنسية: 1,500 كرون لكل متقدم بالغ',
    costEn: 'Citizenship application fee: 1,500 SEK per adult applicant',
    officialAuthorityAr: 'مصلحة الهجرة السويدية ومصلحة جباية الديون (Kronofogden)',
    officialAuthorityEn: 'Swedish Migration Agency & Swedish Enforcement Authority (Kronofogden)',
    officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Becoming-a-Swedish-citizen.html',
    officialPortalName: 'Migrationsverket Citizenship Portal',
    stepsAr: [
      {
        title: 'التأكد من اكتمال مدة الإقامة النظامية (Hemvist)',
        desc: 'يجب أن تكون المدة دون انقطاع، وإذا سافرت خارج السويد لأكثر من 6 أسابيع في سنة واحدة، تُخصم تلك المدة من حساب السنوات.',
        authority: 'Migrationsverket'
      },
      {
        title: 'شرط إثبات الهوية بجواز سفر وطني أصلي ساري',
        desc: 'يجب أن تقدم جواز سفرك الأصلي الصادر من سلطات بلدك، أو بطاقة هوية وطنية معتمدة تثبت هويتك دون أدنى شك.',
        warning: 'إذا تعذر إثبات الهوية، ترتفع مدة الإقامة المطلوبة إلى 8 سنوات مع متطلبات إثبات معقدة.'
      },
      {
        title: 'السيرة الحسنة وخلو السجل من ديون Kronofogden',
        desc: 'تفحص مصلحة الهجرة سجلك لدى الشرطة والضرائب وهيئة جباية الديون. وجود أي ديون غير مسددة يؤخر طلبك لمدة سنتين على الأقل بعد السداد.',
        authority: 'Kronofogden & Polisen'
      },
      {
        title: 'إرسال الطلب الرقمي وإرسال الجواز بالبريد المسجل',
        desc: 'قدم إلكترونياً، وعندما تطلب مصلحة الهجرة جواز سفرك الأصلي، أرسله عبر البريد المسجل (Rekommenderat brev - REK) لدى PostNord.',
        authority: 'PostNord'
      }
    ],
    stepsEn: [
      {
        title: 'Verify qualifying habitual residence (Hemvist)',
        desc: 'Must be continuous without interruptions. Travel outside Sweden exceeding 6 weeks in any calendar year must be subtracted from the total.',
        authority: 'Migrationsverket'
      },
      {
        title: 'Passport identity verification requirement',
        desc: 'You must provide your original lawful national passport or certified home-state identity document proving identity beyond doubt.',
        warning: 'Inability to prove identity elevates required residence to 8 consecutive years under stringent criteria.'
      },
      {
        title: 'Good conduct & Kronofogden debt clearance',
        desc: 'Checks are run against Police criminal databases and the Enforcement Authority. Outstanding unpaid debts impose a mandatory 2-year waiting quarantine after payoff.',
        authority: 'Kronofogden & Police'
      },
      {
        title: 'Submit online petition & send original passport by REK',
        desc: 'File digitally; when requested to tender original passport, dispatch exclusively via PostNord Registered Mail (Rekommenderat brev).',
        authority: 'PostNord'
      }
    ],
    criticalRule2026Ar: 'تجري الحكومة السويدية تحديثات على قانون الجنسية تشمل مقترحات لرفع مدة الإقامة لـ 8 سنوات واختبارات لغة ومعرفة مجتمعية، لذلك يُنصح كل من استوفى الشروط الحالية بتقديم طلبه دون تأخير.',
    criticalRule2026En: 'Swedish legislative revisions anticipate extending residence requirements to 8 years alongside Swedish language and civic knowledge tests. Eligible residents are strongly advised to file promptly under present rules.',
    commonMistakesAr: [
      'التقديم قبل إكمال السنوات المطلوبة باليوم والتاريخ (يؤدي لرفض مباشر وخسارة الرسوم).',
      'إهمال تسديد فواتير أو مخالفات مرورية تافهة تحولت إلى Kronofogden.',
      'إرسال جواز السفر عبر البريد العادي بدلاً من البريد المسجل برقم تتبع (REK).'
    ],
    commonMistakesEn: [
      'Submitting applications even a few days prior to exact statutory anniversary completion (triggers automatic rejection).',
      'Neglecting minor parking or public transit fines that transferred into Kronofogden enforcement files.',
      'Posting original passports via standard untracked post rather than insured registered mail (REK).'
    ],
    toolRecommendation: 'simulator'
  },
  {
    id: 'inside-healthcare-and-family-support',
    location: 'inside',
    category: 'healthcare',
    titleAr: 'الرعاية الصحية، سقف التكلفة (Högkostnadsskydd)، وحقوق رعاية الأطفال',
    titleEn: 'Swedish Healthcare, Cost Ceilings (Högkostnadsskydd) & Child Support',
    badgeAr: 'صحة وأسرة 🏥',
    badgeEn: 'Health & Care 🏥',
    summaryAr: 'كيف تزور المستوصف، ما هو سقف التكلفة القصوى للأطباء والأدوية، وحقوق إجازة رعاية الطفل (VAB) ومساعدات الأطفال.',
    summaryEn: 'How to use primary clinics (Vårdcentral), drug & doctor fee caps, paid child sick leave (VAB), and municipal childcare.',
    quickSolutionAr: 'في الحالات المرضية العادية، اتصل أولاً برقم 1177 أو ادخل عبر تطبيق 1177.se لتحديد موعد في مستوصفك (Vårdcentral). نظام Högkostnadsskydd يضمن ألا تدفع أكثر من حوالي 1,400 كرون سنوياً لزيارات الأطباء، والأدوية مجانية تماماً بعد الوصول لسقف 2,850 كرون في السنة.',
    quickSolutionEn: 'For non-emergencies, contact 1177 via phone or 1177.se to book your registered Vårdcentral. Sweden’s high-cost ceiling (Högkostnadsskydd) caps patient doctor fees at approx. 1,400 SEK/year and prescription drugs are 100% free once you reach 2,850 SEK.',
    timeframeAr: 'حجز المواعيد: فوري عبر 1177 | تعويضات VAB: تُصرف شهرياً من Försäkringskassan',
    timeframeEn: 'Appointment booking: immediate via 1177.se | VAB sick compensation: processed monthly',
    costAr: 'زيارة طبيب المستوصف: 200 إلى 250 كرون (الأطفال مجاناً تماماً حتى 18-20 سنة)',
    costEn: 'Clinic doctor consultation: 200-250 SEK (100% free for minors up to 18-20)',
    officialAuthorityAr: 'دليل الرعاية الصحية 1177 وصندوق التأمينات Försäkringskassan',
    officialAuthorityEn: 'National Healthcare Guide 1177 & Swedish Social Insurance Agency',
    officialUrl: 'https://www.1177.se/',
    officialPortalName: '1177 Vårdguiden',
    stepsAr: [
      {
        title: 'اختيار وتسجيل المركز الصحي (Vårdcentral)',
        desc: 'سجل إلكترونياً في المستوصف الأقرب لبيتك عبر موقع 1177.se باستخدام BankID.',
        authority: '1177.se'
      },
      {
        title: 'الاستفادة من سقف التكلفة القصوى (Högkostnadsskydd)',
        desc: 'يسجل النظام تلقائياً مدفوعاتك، وعند الوصول لسقف الرسوم، تحصل على البطاقة المجانية (Frikort) لبقية السنة.',
        authority: 'Region'
      },
      {
        title: 'إجازة رعاية الطفل المريض (Vård av barn - VAB)',
        desc: 'إذا مرض طفلك واضطررت للبقاء معه بالبيت بدلاً من العمل، يدفع لك Försäkringskassan حوالي 80% من راتبك عن تلك الأيام.',
        authority: 'Försäkringskassan'
      },
      {
        title: 'مساعدة الأطفال الشهرية التلقائية (Barnbidrag)',
        desc: 'تصرف الدولة 1,250 كرون شهرياً لكل طفل حتى سن 16 عاماً، وتودع تلقائياً في حساب الأم/الأب دون الحاجة لطلب منفصل.',
        authority: 'Försäkringskassan'
      }
    ],
    stepsEn: [
      {
        title: 'Select & list with local clinic (Vårdcentral)',
        desc: 'Choose your nearby healthcare center digitally on 1177.se using your BankID authentication.',
        authority: '1177.se'
      },
      {
        title: 'Automatic High-Cost Protection (Frikort)',
        desc: 'Electronic logs aggregate copays. Once you reach 1,400 SEK for outpatient care, subsequent visits are free for 12 months.',
        authority: 'Regional Healthcare'
      },
      {
        title: 'Paid Care of Sick Child Leave (VAB)',
        desc: 'When staying home from work to nurse a sick kid aged 8 months to 12 years, Försäkringskassan compensates ~80% of lost income.',
        authority: 'Försäkringskassan'
      },
      {
        title: 'Universal Monthly Child Allowance (Barnbidrag)',
        desc: 'The state grants 1,250 SEK tax-free per month per child up to age 16, disbursed automatically to parents’ registered bank account.',
        authority: 'Försäkringskassan'
      }
    ],
    criticalRule2026Ar: 'رعاية الأسنان للأطفال والشباب مجانية تماماً في السويد (حتى سن 19 أو 23 عاماً حسب محافظتك). للبالغين، تسهم الدولة ببدل أسنان سنوي (Tandvårdsbidrag) يتراوح بين 300 إلى 600 كرون كل عام.',
    criticalRule2026En: 'Dental care is 100% free for minors and youth up to age 19-23 depending on region. For adults, the state delivers an automatic annual dental allowance (Tandvårdsbidrag) of 300-600 SEK.',
    commonMistakesAr: [
      'الذهاب إلى طوارئ المستشفى (Akuten) للحالات البسيطة (مثل نزلات البرد العادية) بدلاً من الاتصال بـ 1177 أو زيارة المستوصف النهاري.',
      'نسيان تسجيل يوم VAB في نفس اليوم لدى Försäkringskassan وإبلاغ صاحب العمل في الصباح الباكر.',
      'عدم اصطحاب البطاقة الصحية الأوروبية (EU-kort) عند السفر خارج السويد لقضاء العطلات.'
    ],
    commonMistakesEn: [
      'Flocking to hospital Emergency Rooms (Akuten) for mild ailments instead of consulting 1177 or local daytime clinic.',
      'Neglecting to report day 1 of VAB child sick leave on Försäkringskassan’s app and informing the employer.',
      'Traveling abroad in Europe without ordering the free European Health Insurance Card (EHIC / EU-kort).'
    ],
    toolRecommendation: 'emergency'
  }
];
