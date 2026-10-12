import { Guide } from '../types';

export interface CategoryInfo {
  id: Guide['category'];
  title: string;
  titleEn: string;
  icon: string;
  desc: string;
  descEn: string;
  badge: string;
  badgeEn: string;
  bgColor: string;
  textColor: string;
}

export const MAIN_CATEGORIES: CategoryInfo[] = [
  {
    id: 'immigration',
    title: 'الهجرة والإقامة',
    titleEn: 'Immigration & Permits',
    icon: '🛂',
    desc: 'لم الشمل، العمل، الدراسة، تمديد الإقامة، والجنسية',
    descEn: 'Family reunification, work permits, permanent residence & citizenship',
    badge: 'تحديثات 2026',
    badgeEn: '2026 Updates',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  {
    id: 'asylum',
    title: 'اللجوء والحماية',
    titleEn: 'Asylum & Protection',
    icon: '🛡️',
    desc: 'إجراءات المقابلة، السكن، الرفض والاستئناف، والمصدر الرسمي',
    descEn: 'Interview procedures, housing rules, appeals and official guidelines',
    badge: 'حقائق محايدة',
    badgeEn: 'Neutral Facts',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700'
  },
  {
    id: 'authorities',
    title: 'الدوائر الحكومية',
    titleEn: 'Public Authorities',
    icon: '🏛️',
    desc: 'Skatteverket, Försäkringskassan, Arbetsförmedlingen, 1177',
    descEn: 'Tax agency, social insurance, public employment agency, and 1177',
    badge: 'الروابط المباشرة',
    badgeEn: 'Direct Links',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700'
  },
  {
    id: 'work',
    title: 'العمل والوظائف',
    titleEn: 'Work & Employment',
    icon: '💼',
    desc: 'كتابة CV السويدي، العقود، الضرائب، ومساعد الـ CV',
    descEn: 'Swedish CV formatting, employment contracts, labor rights & taxes',
    badge: '+ مساعد CV',
    badgeEn: '+ CV Assistant',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  {
    id: 'housing',
    title: 'السكن والإيجار',
    titleEn: 'Housing & Renting',
    icon: '🏠',
    desc: 'عقود Förstahand و Andrahand، التأمين، وتجنب الاحتيال',
    descEn: 'First-hand and sublease contracts, home insurance & fraud alerts',
    badge: 'نصائح العقود',
    badgeEn: 'Contract Tips',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  },
  {
    id: 'family',
    title: 'الأسرة والأطفال',
    titleEn: 'Family & Children',
    icon: '👨‍👩‍👧‍👦',
    desc: 'Förskola، المدارس، Socialtjänsten بموضوعية، وإجازة الوالدين',
    descEn: 'Preschools, education, Social services facts & parental benefits',
    badge: 'حقائق واضحة',
    badgeEn: 'Clear Facts',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700'
  },
  {
    id: 'stockholm',
    title: 'ستوكهولم مع رائد',
    titleEn: 'Stockholm with Raed',
    icon: '📍',
    desc: 'جولات المشي، Gamla Stan، مقاهي الفيكا، والأماكن المجانية',
    descEn: 'Walking tours, Gamla Stan, authentic fika spots & free attractions',
    badge: 'فيديوهات TikTok',
    badgeEn: 'TikTok Videos',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700'
  },
  {
    id: 'tourism',
    title: 'اكتشف السويد',
    titleEn: 'Discover Sweden',
    icon: '🏙️',
    desc: 'يوتبوري، مالمو، الشمال والشفق القطبي، والبحيرات والجزر',
    descEn: 'Gothenburg, Malmö, Northern Lights in Lapland, lakes and islands',
    badge: 'Visit Sweden',
    badgeEn: 'Visit Sweden',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700'
  },
  {
    id: 'travel',
    title: 'السفر',
    titleEn: 'Travel & Transport',
    icon: '✈️',
    desc: 'القطارات السويدية (SJ)، الرحلات البحرية، والسفر بأوروبا',
    descEn: 'SJ train network, ferry lines, airport links & European travel',
    badge: 'نصائح السفر',
    badgeEn: 'Travel Tips',
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-700'
  },
  {
    id: 'events',
    title: 'الترفيه والفعاليات',
    titleEn: 'Events & Culture',
    icon: '🎉',
    desc: 'مهرجانات، فعاليات مجانية، وأنشطة الفصول الأربعة',
    descEn: 'Seasonal festivals, Midsommar, free municipal events & traditions',
    badge: 'مواسم السويد',
    badgeEn: 'Seasons',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  {
    id: 'language',
    title: 'تعلم السويدية',
    titleEn: 'Learn Swedish',
    icon: '📚',
    desc: 'SFI، مصطلحات الدوائر، كلمات العمل، والقاموس الصوتي',
    descEn: 'SFI language schools, authority vocabulary & audio pronunciation',
    badge: 'قاموس ناطق',
    badgeEn: 'Audio Dictionary',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700'
  },
  {
    id: 'news',
    title: 'جديد السويد',
    titleEn: 'Sweden Updates',
    icon: '🔔',
    desc: 'تحديثات الهجرة، الحد الأدنى للرواتب، والشروط الجديدة 2026',
    descEn: '2026 legislative updates, salary thresholds & official news',
    badge: 'تحديثات مستمرة',
    badgeEn: 'Live Updates',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700'
  }
];

export const GUIDES_DATABASE: Guide[] = [
  {
    id: 'family-reunification',
    category: 'immigration',
    title: 'لمّ الشمل والانتقال إلى الزوج أو الزوجة',
    tag: 'تصاريح الإقامة لم الشمل',
    lastUpdated: '12/03/2026',
    authority: 'Migrationsverket – مصلحة الهجرة',
    officialUrl: 'https://www.migrationsverket.se/en/you-want-to-apply/living-with-someone-in-sweden.html',
    summary: 'الشروط والمتطلبات الرسمية لانتقال الزوج أو الزوجة أو الأطفال للعيش في السويد.',
    whatIs: 'هو تصريح إقامة يُمنح للأشخاص الراغبين بالانتقال للعيش مع أحد أفراد الأسرة (زوج، زوجة، شريك مساكن sambo، أو أطفال دون 18 عاماً) المقيمين بصورة نظامية في السويد.',
    who: 'ينطبق على المتزوجين رسمياً أو المرتبطين بعلاقة مساكنة ثابتة، والأطفال تحت سن 18 عاماً لشخص مقيم أو مواطن سويدي، بشرط استيفاء الشروط القانونية المقررة.',
    requirements: [
      'جواز سفر ساري المفعول لمقدم الطلب.',
      'عقد زواج رسمي مصدق ومترجم، أو إثبات علاقة المساكنة السابقة.',
      'استيفاء شرط الإعالة والسكن (Försörjningskrav): يجب أن يمتلك الطرف المقيم في السويد دخلاً كافياً وسكناً بمساحة وعدد غرف محددين رسمياً من مصلحة الهجرة.',
      'دفع رسوم الطلب المقررة عبر الموقع الرسمي لمصلحة الهجرة.'
    ],
    steps: [
      'تأكد أولاً من استيفاء شرط السكن والدخل للشخص المقيم في السويد.',
      'جهّز جميع الأوراق الثبوتية والترجمات المعتمدة بصيغة PDF.',
      'يقوم مقدم الطلب بالتقديم إلكترونياً من خارج السويد عبر موقع Migrationsverket.',
      'يتلقى الطرف الموجود في السويد استبياناً للإجابة عن أسئلة الدخل والسكن وإرسال الإثباتات.',
      'حجز موعد في السفارة السويدية لإجراء المقابلة والتحقق من الهوية والأوراق الأصلية.',
      'انتظار صدور القرار الرسمي ومتابعة الحالة عبر صفحة حسابك في مصلحة الهجرة.'
    ],
    tiktokQuery: 'لم الشمل السويد رائد شهاب'
  },
  {
    id: 'work-permit-2026',
    category: 'immigration',
    title: 'إقامة وتصريح العمل في السويد (الشروط والرواتب الجديدة)',
    tag: 'تصاريح العمل 2026',
    lastUpdated: '01/02/2026',
    authority: 'Migrationsverket – مصلحة الهجرة السويدية',
    officialUrl: 'https://www.migrationsverket.se/en/you-want-to-apply/work-in-sweden.html',
    summary: 'معايير تصريح العمل الجديدة، شرط الراتب الأدنى، وإجراءات صاحب العمل.',
    whatIs: 'تصريح يتيح للمواطنين من خارج دول الاتحاد الأوروبي العمل والإقامة في السويد بناءً على عرض عمل رسمي من شركة سويدية معتمدة.',
    who: 'أي شخص حاصل على عرض عمل نظامي من صاحب عمل مسجل في السويد يستوفي شروط التأمين والحد الأدنى للراتب.',
    requirements: [
      'جواز سفر صالح طوال فترة العمل.',
      'عرض عمل (Anställningserbjudande) منشور مسبقاً في السويد والاتحاد الأوروبي لمدة 10 أيام على الأقل.',
      'راتب يتوافق مع الحد الأدنى القانوني الصادر عن مصلحة الهجرة أو الاتفاقيات الجماعية (Kollektivavtal).',
      'تأمينات العمل الأساسية (تقاعد، صحة، إصابات عمل، وتأمين على الحياة).'
    ],
    steps: [
      'يقوم صاحب العمل في السويد ببدء الطلب إلكترونياً وتعبئة شروط العقد والتأمينات.',
      'تصلك رسالة بريد إلكتروني لاستكمال بياناتك وإرفاق جواز السفر.',
      'سداد رسوم تصريح العمل إلكترونياً.',
      'مراجعة السفارة أو مصلحة الهجرة لتسجيل البصمات والصورة.',
      'عدم بدء العمل في السويد إلا بعد صدور قرار الموافقة واستلام بطاقة الإقامة (UT-kort).'
    ],
    tiktokQuery: 'تصريح العمل السويد شروط الراتب رائد شهاب'
  },
  {
    id: 'asylum-protection-rules',
    category: 'asylum',
    title: 'اللجوء والحماية في السويد: الخطوات والحقوق والمقابلة',
    tag: 'اللجوء والمقابلة',
    lastUpdated: '14/02/2026',
    authority: 'Migrationsverket – مصلحة الهجرة السويدية',
    officialUrl: 'https://www.migrationsverket.se/en/you-want-to-apply/international-protection-asylum.html',
    summary: 'دليل إنساني محايد يوضح أين يُقدم الطلب، ماذا يحدث بالتحقيق، وما هي الحقوق والواجبات.',
    whatIs: 'طلب الحماية الدولية وفق اتفاقية جنيف والقوانين السويدية للأفراد المعرضين لخطر حقيقي أو اضطهاد في بلدانهم الأصلية.',
    who: 'الأشخاص الموجودون داخل الأراضي السويدية أو على الحدود والذين يطلبون الحماية.',
    requirements: [
      'التواجد شخصياً داخل السويد أو على حدودها (لا يمكن طلب اللجوء من السفارات في الخارج).',
      'إبراز جواز السفر أو أي وثائق تثبت الهوية والجنسية إن وجدت.',
      'تقديم أسباب طلب الحماية بصدق ووضوح خلال التحقيق.'
    ],
    steps: [
      'التوجه شخصياً إلى أحد مراكز استقبال طالبي اللجوء التابعة لمصلحة الهجرة (مثل ستوكهولم أو يوتيبوري أو مالمو).',
      'تسجيل الطلب، أخذ البصمات والصور، والحصول على بطاقة طالب اللجوء (LMA-kort).',
      'إجراء المقابلة التمهيدية ثم مقابلة التحقيق المفصلة بحضور مترجم ومحامٍ تعينه المصلحة إذا دعت الحاجة.',
      'الإقامة في مساكن المصلحة أو سكن خاص مع مراعاة قواعد مناطق السكن (قانون EBO).',
      'انتظار صدور القرار الرسمي، وفي حال الرفض يحق للشخص الاستئناف أمام محكمة الهجرة (Migrationsdomstolen) ضمن المدة المحددة.'
    ],
    tiktokQuery: 'إجراءات اللجوء السويد رائد شهاب'
  },
  {
    id: 'skatteverket-personnummer',
    category: 'authorities',
    title: 'Skatteverket: القيد السكاني والحصول على الرقم الشخصي (Personnummer)',
    tag: 'مصلحة الضرائب والقيد السكاني',
    lastUpdated: '10/01/2026',
    authority: 'Skatteverket – مصلحة الضرائب السويدية',
    officialUrl: 'https://www.skatteverket.se/movingtosweden',
    summary: 'أهم خطوة للاستقرار في السويد: متى يحق لك الرقم الشخصي وما هي الأوراق المطلوبة؟',
    whatIs: 'القيد في النفوس (Folkbokföring) والحصول على الرقم الوطني السويدي المكوّن من 10 أو 12 رقماً، وهو المفتاح الأساسي للرعاية الصحية، الحسابات البنكية، والتعليم.',
    who: 'كل من ينتقل للعيش في السويد لمدة سنة واحدة أو أكثر ولديه تصريح إقامة صالح أو حق الإقامة.',
    requirements: [
      'جواز السفر الأصلي وبطاقة الإقامة السارية (Uppehållstillstånd).',
      'عقد إيجار أو عنوان سكن واضح في السويد لتسجيل عنوانك الرسمي.',
      'وثائق الحالة الاجتماعية (عقد زواج، شهادات ميلاد الأطفال) مترجمة ومصدقة.',
      'تعبئة استمارة التقديم على موقع Skatteverket المخصصة للقادمين إلى السويد.'
    ],
    steps: [
      'قم بتعبئة نموذج "Flytta till Sverige" على موقع مصلحة الضرائب مسبقاً لتقليل وقت الانتظار.',
      'احجز موعداً أو توجه إلى أقرب فرع (Statens servicecenter / Skatteverket) للتحقق من الهويات شخصياً.',
      'انتظار معالجة الطلب واستلام رسالة القيد بالبريد التي تحتوي على Personnummer.',
      'بعد استلام الرقم، احجز موعداً في Skatteverket لإصدار بطاقة الهوية السويدية (ID-kort).'
    ],
    tiktokQuery: 'كيف تحصل على الرقم الشخصي السويد رائد شهاب'
  },
  {
    id: 'forsakringskassan-guide',
    category: 'authorities',
    title: 'Försäkringskassan: التسجيل، التأمين الصحي، وإجازة الوالدين',
    tag: 'التأمينات الاجتماعية',
    lastUpdated: '20/01/2026',
    authority: 'Försäkringskassan – صندوق التأمينات الاجتماعية',
    officialUrl: 'https://www.forsakringskassan.se/english/moving-to-working-studying-or-newly-arrived-in-sweden/move-to-sweden',
    summary: 'كيف تسجل في التأمينات؟ تعويضات الأطفال (Barnbidrag)، إجازة الوالدية، والتأمين الصحي.',
    whatIs: 'الجهة المسؤولة عن المساعدات والتعويضات الاجتماعية، رعاية الوالدين، تعويضات المرض، ونفقات الأطفال.',
    who: 'المقيمون والعاملون في السويد بعد تسجيلهم في القيد السكاني واستيفائهم شروط كل تعويض.',
    requirements: [
      'رقم شخصي سويدي (Personnummer) مسجل لدى Skatteverket.',
      'تسجيل حساب بنكي مرتبط باسمك لاستلام المبالغ.',
      'تعبئة استمارة التسجيل في التأمينات (Anmäl bosättning i Sverige).'
    ],
    steps: [
      'سجل الدخول إلى موقع Försäkringskassan باستخدام BankID أو أرسل الاستمارة الورقية.',
      'قم بتسجيل وجودك في السويد وإضافة بيانات أطفالك لتفعيل معونة الطفل (Barnbidrag) التلقائية.',
      'في حال ولادة طفل، قم بتوزيع أيام إجازة الوالدين (Föräldrapenning) بالتنسيق بين الأب والأم.',
      'تأكد من إبلاغ الصندوق بأي تغيير يطرأ على دخلك أو انتقالك خارج السويد.'
    ],
    tiktokQuery: 'مساعدات الاطفال والتامين السويد رائد شهاب'
  },
  {
    id: 'cv-jobs-sweden',
    category: 'work',
    title: 'كيف تبحث عن عمل في السويد؟ إعداد الـ CV والرسالة الشخصية',
    tag: 'الوظائف وسوق العمل',
    lastUpdated: '15/02/2026',
    authority: 'Arbetsförmedlingen – مصلحة التوظيف',
    officialUrl: 'https://arbetsformedlingen.se',
    summary: 'أسرار كتابة السيرة الذاتية السويدية، مواقع العمل المعتمدة، وحقوق العامل وعقود التوظيف.',
    whatIs: 'دليل شامل لآليات التوظيف السويدية، من كيفية كتابة Personligt brev إلى فهم عقود Tillsvidareanställning والضرائب.',
    who: 'الباحثون عن عمل الجدد أو المقيمون الراغبون في تطوير مسارهم المهني.',
    requirements: [
      'سيرة ذاتية مخصصة للوظيفة لا تتجاوز صفحة إلى صفحتين مع صورة مهنية غير رسمية مبالغ بها.',
      'رسالة شخصية (Personligt brev) تشرح لماذا أنت المناسب لهذه الشركة بالتحديد.',
      'حساب LinkedIn محدث مع شبكة علاقات وشهادات موثقة.'
    ],
    steps: [
      'سجل كباحث عن عمل لدى Arbetsförmedlingen لتفعيل برامج الدعم والتدريب المهني.',
      'ابحث يومياً عبر Platsbanken، LinkedIn، وIndeed.',
      'ركز على الاتصال المباشر بالشركات عبر البريد الإلكتروني أو المكالمات المحترفة.',
      'استعد للمقابلة بالاطلاع على قيم الشركة وإبراز روح العمل الجماعي والالتزام بالمواعيد.'
    ],
    tiktokQuery: 'كيف تجد عمل في السويد رائد شهاب'
  },
  {
    id: 'housing-first-second-hand',
    category: 'housing',
    title: 'السكن في السويد: عقود Förstahand و Andrahand والحذر من النصب',
    tag: 'السكن والإيجار',
    lastUpdated: '05/01/2026',
    authority: 'Boverket & Hyresgästföreningen',
    officialUrl: 'https://www.hyresgastforeningen.se',
    summary: 'شرح طوابير السكن، عقود الإيجار من الباطن، تأمين الشقة، وحيل الاحتيال الشائعة.',
    whatIs: 'شرح لمنظومة السكن السويدية التي تنقسم إلى عقد مباشر من شركة السكن (Förstahand) وعقد ثانوي من مستأجر آخر (Andrahand).',
    who: 'كل من يبحث عن شقة أو منزل في المدن الكبرى مثل ستوكهولم ويوتبوري ومالمو.',
    requirements: [
      'التسجيل في طوابير السكن البلدية (مثل Bostadsförmedlingen في ستوكهولم) في أسرع وقت.',
      'عقد إيجار مكتوب وموضح به قيمة الإيجار النظامية وتكاليف الكهرباء والإنترنت.',
      'موافقة جمعية السكن أو المالك (Brf / Hyresvärd) على تأجير الشقة من الباطن.'
    ],
    steps: [
      'لا تدفع أي عربون مالي أبداً قبل معاينة الشقة والتأكد من هوية المؤجر وموافقة الجمعية.',
      'استخدم منصات موثوقة مثل Blocket Bostad أو Qasa التي توفر دفعاً آمناً وضماناً للعقود.',
      'اشترك في تأمين السكن (Hemförsäkring) فور استلام المفاتيح لحمايتك من أي حوادث أو أضرار.',
      'في حال طلب المؤجر إيجاراً غير معقول، يمكنك مراجعة لجنة الإيجارات (Hyresnämnden) للمطالبة بالفروقات.'
    ],
    tiktokQuery: 'السكن في السويد وعقود الايجار رائد شهاب'
  },
  {
    id: 'family-schools-social',
    category: 'family',
    title: 'الأسرة والمدارس وSocialtjänsten: دليل الحقائق والموضوعية',
    tag: 'الأسرة والأطفال والمدارس',
    lastUpdated: '18/02/2026',
    authority: 'Socialstyrelsen & Skolverket',
    officialUrl: 'https://www.socialstyrelsen.se',
    summary: 'شرح هادئ وموضوعي للحضانة والمدارس ودور الخدمات الاجتماعية وحماية الأطفال.',
    whatIs: 'دليل توعوي يشرح منظومة رعاية الأسرة والتعليم في السويد من الحضانة (Förskola) والمدرسة الإلزامية حتى دور الخدمات الاجتماعية.',
    who: 'العائلات المقيمة في السويد التي لديها أطفال دون سن 18 عاماً.',
    requirements: [
      'تسجيل الأطفال في طابور الحضانة والمدرسة عبر بلدية السكن (Kommunen).',
      'التواصل المباشر مع المعلمين والمشاركة في اجتماعات أولياء الأمور (Utvecklingssamtal).',
      'فهم حقوق الطفل وقوانين منع العنف الجسدي أو النفسي المطبقة بصرامة في السويد.'
    ],
    steps: [
      'افهم أن Socialtjänsten هي جهة داعمة تهدف أولاً إلى مساعدة الأسرة في تجاوز الصعوبات والمشاكل.',
      'في حال وجود بلاغ قلق (Orosanmälan)، تواصل بهدوء وبادر بالتعاون والشفافية لحل أي سوء فهم.',
      'استعن بمترجم رسمي محايد في جميع الاجتماعات واللقاءات لضمان وصول وجهة نظرك بدقة.',
      'استفد من الدورات الأسرية والمساعدات التي تقدمها البلدية للآباء الجدد والقادمين.'
    ],
    tiktokQuery: 'المدارس والاطفال في السويد رائد شهاب'
  },
  {
    id: 'stockholm-raed-guide',
    category: 'stockholm',
    title: 'ستوكهولم مع رائد: أفضل الجولات، المقاهي، والأماكن المجانية',
    tag: 'جولات ستوكهولم الخاصة',
    lastUpdated: '10/03/2026',
    authority: 'Visit Stockholm & @dalelak.sweden',
    officialUrl: 'https://www.visitstockholm.com',
    summary: 'دليل سياحي حصري من رائد شهاب لأجمل زوايا عاصمة الجزر والجمال.',
    whatIs: 'خارطة طريق لجولات ستوكهولم المشي، تجربة الفيكا التقليدية، جولات محطات المترو الفنية، وأجمل الإطلالات البانورامية.',
    who: 'السياح، المقيمون الجدد، والعائلات الراغبة في قضاء عطلة نهاية أسبوع ساحرة.',
    requirements: [
      'بطاقة مواصلات SL أو تطبيق SL للهواتف الذكية للتنقل عبر المترو، الباصات، وقوارب النقل العام.',
      'حذاء مريح للمشي في شوارع Gamla Stan المرصوفة بالحصى.',
      'كاميرا أو هاتف لالتقاط إطلالات الغروب من Monteliusvägen.'
    ],
    steps: [
      'ابدأ الصباح في Gamla Stan مع زيارة القصر الملكي وتناول كعكة القرفة في مقهى عريق.',
      'انتقل عبر القارب العام ببطاقة SL إلى جزيرة Djurgården لزيارة متحف Vasa وحديقة Skansen.',
      'استمتع بجولة فنية في أطول معرض فني في العالم عبر محطات مترو ستوكهولم (T-Centralen, Stadion, Solna Centrum).',
      'اختم اليوم بمشهد غروب ساحر مطل على البحيرة والمدينة من تلة Skinnarviksberget مجاناً.'
    ],
    tiktokQuery: 'جولة ستوكهولم الاماكن السياحية رائد شهاب'
  },
  {
    id: 'tourism-sweden-destinations',
    category: 'tourism',
    title: 'اكتشف السويد: يوتبوري، مالمو، والشمال الساحر مع الشفق القطبي',
    tag: 'السياحة والطبيعة السويدية',
    lastUpdated: '08/02/2026',
    authority: 'Visit Sweden – الموقع الرسمي للسياحة',
    officialUrl: 'https://visitsweden.com',
    summary: 'أجمل وجهات السفر داخل السويد، حدائق الأرخبيل، رحلات القطار، وحق الدخول للطبيعة.',
    whatIs: 'دليل استكشاف مدن السويد وطبيعتها وقانون "Allemansrätten" الذي يمنحك حق التخييم والتجول بحرية في الطبيعة.',
    who: 'عشاق الطبيعة والمغامرة والسفر العائلي في إسكندنافيا.',
    requirements: [
      'التخطيط المسبق لحجوزات القطارات مع شركة SJ السويدية للحصول على أفضل الأسعار.',
      'ملابس ملائمة ومقاومة للمطر والرياح حسب الفصل الموسمي.',
      'احترام الطبيعة وعدم إتلاف الأشجار أو ترك أي مخلفات وفق قواعد Allemansrätten.'
    ],
    steps: [
      'اكتشف مدينة يوتبوري وقنواتها المائية وحديقة ملاهي Liseberg وحدائق النباتات.',
      'زر مالمو وجسر أوريسوند الرابط مع كوبنهاغن وبرج Turning Torso الشهير.',
      'سافر شمالاً نحو كيرونا وأبيسكو لتجربة مشاهدة الشفق القطبي (Northern Lights) وفندق الجليد شتاءً.',
      'في الصيف، جرب السباحة في بحيرات Dalarna وجزر الساحل الغربي الساحرة.'
    ],
    tiktokQuery: 'اجمل اماكن السياحة في السويد رائد شهاب'
  },
  {
    id: 'sweden-travel-trains',
    category: 'travel',
    title: 'السفر والقطارات في السويد (SJ): الحجوزات، المطارات، والرحلات البحرية',
    tag: 'السفر والمواصلات',
    lastUpdated: '15/01/2026',
    authority: 'SJ & Swedavia',
    officialUrl: 'https://www.sj.se',
    summary: 'كل ما تحتاج لمعرفته عن شبكة قطارات SJ، قطار Arlanda Express، ورحلات العبارات إلى فنلندا ودول البلطيق.',
    whatIs: 'دليل السفر الداخلي والدولي من وإلى السويد، بما يشمل بطاقات التخفيض للشباب والطلاب والمتقاعدين.',
    who: 'المسافرون داخل السويد وللدول المجاورة.',
    requirements: [
      'تطبيق SJ لحجز تذاكر القطار وتتبع المواعيد والتأخيرات.',
      'جواز سفر أو هوية وطنية للسفر إلى دول الشنغن.',
      'حجز مبكر للقطارات السريعة (X2000) لتوفير ما يصل إلى 60% من السعر.'
    ],
    steps: [
      'قارن بين أسعار قطار المطار السريع والحافلات (Flygbussarna) للوصول إلى وسط ستوكهولم.',
      'استخدم رحلات العبارات الليلية (Silja Line / Viking Line) لتجربة سفر بحرية مميزة.',
      'اشترك في برنامج نقاط SJ Prio إذا كنت تسافر بانتظام لجمع نقاط واستبدالها برحلات مجانية.'
    ]
  },
  {
    id: 'events-seasons-guide',
    category: 'events',
    title: 'مهرجانات وفعاليات السويد: الميدسمار، أضواء لوسيا، وأسواق الكريسماس',
    tag: 'الفعاليات والمواسم',
    lastUpdated: '22/01/2026',
    authority: 'Kulturhuset & Visit Sweden',
    officialUrl: 'https://visitsweden.com/what-to-do/culture-history-and-art/swedish-traditions',
    summary: 'دليل لأهم الاحتفالات الثقافية والمواسم السويدية وكيف تستمتع بها مع العائلة.',
    whatIs: 'التقاليد والاحتفالات السنوية التي تميز حياة المجتمع السويدي وتجمع الناس في الساحات والحدائق.',
    who: 'جميع المقيمين والزوار الراغبين في الاندماج والتعرف على الثقافة السويدية.',
    requirements: [
      'متابعة تقويم الفعاليات الخاص ببلديتك (Kommunens evenemangskalender).',
      'ارتداء الملابس الملائمة لكل موسم (طبقات دافئة للشتاء وملابس خفيفة للصيف).'
    ],
    steps: [
      'عش تجربة عيد منتصف الصيف (Midsommar) في أواخر يونيو حول عمود الزهور مع الرقصات الشعبية.',
      'شاهد احتفال القديسة لوسيا (Lucia) في 13 ديسمبر والشموع وأغاني الكورال في الكنائس والمدارس.',
      'استمتع بأسواق الكريسماس التقليدية في Gamla Stan وSkansen خلال شهر ديسمبر.'
    ]
  },
  {
    id: 'learn-swedish-sfi',
    category: 'language',
    title: 'تعلم السويدية: مراحل SFI وSAS وكيف تتقن اللغة بسرعة',
    tag: 'اللغة السويدية',
    lastUpdated: '01/03/2026',
    authority: 'Skolverket – مصلحة المدارس',
    officialUrl: 'https://www.skolverket.se',
    summary: 'مسارات SFI، كيفية التسجيل في البلدية، المصطلحات الأساسية، والنصائح لتجاوز حاجز التحدث.',
    whatIs: 'برنامج تعليم اللغة السويدية للمهاجرين (SFI) وهو تعليم مجاني تدعمه الدولة لمساعدتك على الاندماج وسوق العمل.',
    who: 'المقيمون في السويد الذين يحملون رقماً شخصياً أو تصريح إقامة سارياً.',
    requirements: [
      'رقم شخصي (Personnummer) أو رقم تنسيقي (Samordningsnummer).',
      'التسجيل عبر إدارة تعليم الكبار في بلديتك (Komvux).'
    ],
    steps: [
      'حدد مستواك الدراسي مع المستشار في البلدية ليتم توجيهك للمسار المناسب (مسار 1 أو 2 أو 3).',
      'مارس اللغة يومياً عبر الاستماع للإذاعة السويدية المبسطة (Radio Sweden på lätt svenska).',
      'شارك في مقاهي المحادثة (Språkcafé) في المكتبات العامة لممارسة التحدث بدون خجل.',
      'استخدم القاموس التفاعلي الصوتي في تطبيقنا للتدرب على مصطلحات الدوائر الحكومية.'
    ]
  },
  {
    id: 'sweden-updates-2026',
    category: 'news',
    title: 'جديد السويد 2026: القرارات والقوانين والحد الأدنى للرواتب',
    tag: 'أخبار وتحديثات 2026',
    lastUpdated: '15/03/2026',
    authority: 'Regeringen & Migrationsverket',
    officialUrl: 'https://www.regeringen.se',
    summary: 'رصد شامل لأحدث القوانين الصادرة في السويد لعام 2026 وتأثيرها على الإقامات ولم الشمل والعمل.',
    whatIs: 'تحديث دوري وموثق لأهم التغييرات التشريعية والتنفيذية التي تهم الجالية العربية في السويد.',
    who: 'جميع المقيمين وطالبي الإقامة والعمل في السويد.',
    requirements: [
      'متابعة المصادر الرسمية فقط وتجنب الشائعات المتداولة على وسائل التواصل الاجتماعي.',
      'التحقق من تواريخ نفاذ القوانين قبل تقديم أي طلب جديد.'
    ],
    steps: [
      'راجع شرط الراتب الأدنى لإقامات العمل والمحدد رسمياً وفق متوسط الأجور.',
      'تأكد من شروط مدة الإقامة المطلوبة للحصول على الإقامة الدائمة أو الجنسية السويدية.',
      'اشترك في تنبيهات التطبيق لمتابعة كل جديد أولاً بأول مع رائد شهاب.'
    ]
  }
];

const ENGLISH_GUIDES_MAP: Record<string, Partial<Guide>> = {
  'family-reunification': {
    title: 'Family Reunification & Moving to a Spouse/Partner in Sweden',
    tag: 'Residence Permit Reunification',
    authority: 'Migrationsverket – Swedish Migration Agency',
    summary: 'Official requirements and procedures for spouses, registered partners, and minor children moving to live in Sweden.',
    whatIs: 'A residence permit granted to individuals who wish to live with an immediate family member (spouse, cohabiting sambo partner, or children under 18) lawfully residing in Sweden.',
    who: 'Applies to legally married couples, registered cohabitation partners, and children under 18 of a resident or Swedish citizen, subject to statutory requirements.',
    requirements: [
      'Valid passport for the applicant throughout the application process.',
      'Officially attested and translated marriage certificate or proof of continuous cohabitation.',
      'Maintenance and housing requirement (Försörjningskrav): The resident in Sweden must have sufficient income and an adequately sized residence as specified by the Migration Agency.',
      'Payment of the statutory application fee via the official Migrationsverket website.'
    ],
    steps: [
      'Ensure the sponsor in Sweden meets both the income threshold and housing size requirements.',
      'Prepare all certified supporting documents and official translations in PDF format.',
      'The applicant submits the electronic application from outside Sweden on Migrationsverket.se.',
      'The sponsor in Sweden receives and completes an online questionnaire detailing income and accommodation.',
      'Book an interview appointment at the Swedish Embassy abroad for identity verification and original document presentation.',
      'Await the formal decision and track processing updates via the "My Page" portal on Migrationsverket.'
    ]
  },
  'work-permit-2026': {
    title: 'Work Permits in Sweden: New 2026 Salary Rules & Procedures',
    tag: 'Work Permits 2026',
    authority: 'Migrationsverket – Swedish Migration Agency',
    summary: 'Updated work permit criteria, new statutory minimum salary thresholds, and employer requirements.',
    whatIs: 'A permit allowing non-EU/EEA citizens to work and reside in Sweden based on a bona fide employment offer from a registered Swedish company.',
    who: 'Anyone with a verified employment offer from an employer registered in Sweden that satisfies statutory insurance, pension, and wage benchmarks.',
    requirements: [
      'Valid passport covering the entire employment contract duration.',
      'A formal job offer (Anställningserbjudande) advertised in Sweden and the EU/EEA for at least 10 days.',
      'Salary meeting the statutory minimum salary threshold determined by Migrationsverket or applicable collective bargaining agreements (Kollektivavtal).',
      'Mandatory employer-provided insurances (occupational pension, health, life, and workers compensation).'
    ],
    steps: [
      'The employer in Sweden initiates the application online and registers contract terms and insurances.',
      'You receive an email notification to complete personal details and upload passport scans.',
      'Pay the work permit application fee online.',
      'Visit a Swedish Embassy or Migration Agency service centre for biometric registration (photograph & fingerprints).',
      'Do not start work until the official decision is granted and your residence permit card (UT-kort) is received.'
    ]
  },
  'asylum-protection-rules': {
    title: 'Asylum & Protection in Sweden: Procedures, Rights & Interviews',
    tag: 'Asylum & Procedures',
    authority: 'Migrationsverket – Swedish Migration Agency',
    summary: 'A neutral, objective guide clarifying where applications are filed, what occurs during interviews, and applicant rights.',
    whatIs: 'Application for international protection in accordance with the Geneva Convention and Swedish law for individuals facing credible danger or persecution in their home country.',
    who: 'Individuals present within Swedish territory or at the Swedish border requesting international protection.',
    requirements: [
      'Physical presence inside Sweden or at its external borders (asylum cannot be claimed from foreign embassies).',
      'Production of a passport or any documentation substantiating identity and nationality, if available.',
      'Presentation of truthful, clear, and comprehensive grounds for claiming protection during formal interviews.'
    ],
    steps: [
      'Report in person to a Migrationsverket asylum reception centre (e.g. Stockholm, Gothenburg, or Malmö).',
      'Register your application, submit biometrics (fingerprints and photos), and receive your asylum seeker card (LMA-kort).',
      'Attend the preliminary interview followed by the in-depth investigative interview with an accredited interpreter and legal counsel if appointed.',
      'Reside in accommodation arranged by the Migration Agency or independent housing complying with municipal EBO zoning regulations.',
      'Await the decision. If rejected, an appeal may be submitted to the Migration Court (Migrationsdomstolen) within the statutory deadline.'
    ]
  },
  'skatteverket-personnummer': {
    title: 'Skatteverket: Population Registration & Getting a Personnummer',
    tag: 'Tax Agency & Personnummer',
    authority: 'Skatteverket – Swedish Tax Agency',
    summary: 'The critical first milestone for settling in Sweden: eligibility, required documents, and ID-kort issuance.',
    whatIs: 'Civil registration (Folkbokföring) and issuance of the 10- or 12-digit Swedish personal identity number, unlocking healthcare access, bank accounts, and public services.',
    who: 'Anyone moving to live in Sweden for one year or more who possesses a valid residence permit or legal right of residence.',
    requirements: [
      'Original valid passport and valid residence permit card (Uppehållstillstånd).',
      'Rental contract or confirmed residential address in Sweden for official registration.',
      'Civil status certificates (marriage certificate, children birth certificates) translated and apostilled/certified.',
      'Completed preliminary application questionnaire on the official Skatteverket website.'
    ],
    steps: [
      'Complete the "Flytta till Sverige" (Move to Sweden) pre-registration form online to accelerate office processing.',
      'Visit your nearest Statens servicecenter / Skatteverket office in person with original documents for identity verification.',
      'Await processing and receive the civil registration decision containing your Personnummer via postal mail.',
      'Once the Personnummer is issued, schedule an appointment at Skatteverket to obtain the official Swedish ID card (ID-kort).'
    ]
  },
  'forsakringskassan-guide': {
    title: 'Försäkringskassan: Registration, Healthcare & Parental Benefits',
    tag: 'Social Insurance',
    authority: 'Försäkringskassan – Swedish Social Insurance Agency',
    summary: 'How to register for social insurance, child allowance (Barnbidrag), parental leave (Föräldrapenning), and sickness benefits.',
    whatIs: 'The Swedish public authority administering universal and work-based social benefits, sickness allowance, parental leave, and child support.',
    who: 'Residents and authorized employees in Sweden upon population registration and fulfillment of benefit-specific criteria.',
    requirements: [
      'A valid Swedish Personnummer registered with Skatteverket.',
      'A Swedish bank account linked in your name for automatic benefit disbursements.',
      'Completed registration form declaring permanent residency in Sweden (Anmäl bosättning i Sverige).'
    ],
    steps: [
      'Log into Försäkringskassan.se using your BankID or submit the paper registration forms.',
      'Register your residency and declare accompanying minor children to activate automated child allowances (Barnbidrag).',
      'Upon the birth of a child, plan and coordinate shared parental benefit days (Föräldrapenning) with your partner.',
      'Promptly notify the agency of changes in your household income, employment status, or relocations abroad.'
    ]
  },
  'cv-jobs-sweden': {
    title: 'Job Hunting in Sweden: Professional CV & Cover Letter Guide',
    tag: 'Employment & Labor Market',
    authority: 'Arbetsförmedlingen – Public Employment Agency',
    summary: 'Secrets of Swedish CV styling, recognized recruitment channels, employee rights, and employment contracts.',
    whatIs: 'A comprehensive guide to Swedish hiring practices, from drafting a tailored Personligt brev to understanding permanent contracts (Tillsvidareanställning).',
    who: 'Job seekers, newcomers, and established residents aiming to advance their professional career in Sweden.',
    requirements: [
      'A role-tailored CV (maximum 1-2 pages) with a professional, approachable photo.',
      'A compelling personal letter (Personligt brev) highlighting why you fit the specific company culture.',
      'An up-to-date LinkedIn profile with verified credentials and recommendations.'
    ],
    steps: [
      'Register as a job seeker with Arbetsförmedlingen to access state integration programs and vocational training.',
      'Search daily on Platsbanken, LinkedIn Jobs, and Indeed Sverige.',
      'Engage in proactive networking and direct professional inquiries to recruitment managers.',
      'Prepare for interviews by studying the organization values, flat hierarchy communication, and team consensus.'
    ]
  },
  'housing-first-second-hand': {
    title: 'Housing in Sweden: First-Hand & Sublease Contracts & Fraud Prevention',
    tag: 'Housing & Renting',
    authority: 'Boverket & Hyresgästföreningen',
    summary: 'Understanding municipal housing queues, subletting rules (Andrahand), deposit security, and scam alerts.',
    whatIs: 'An explanation of the Swedish rental system, divided into primary municipal/landlord contracts (Förstahand) and secondary subleases (Andrahand).',
    who: 'Anyone seeking an apartment or house in Swedish urban centres such as Stockholm, Gothenburg, and Malmö.',
    requirements: [
      'Early enrollment in municipal housing queues (e.g. Bostadsförmedlingen in Stockholm).',
      'A written lease contract specifying lawful rent, utility breakdown, and move-in inventory.',
      'Formal written approval from the landlord or housing cooperative board (Brf) for subletting.'
    ],
    steps: [
      'Never transfer a security deposit before physically viewing the property and verifying the landlord identity.',
      'Use secure rental platforms such as Blocket Bostad or Qasa offering deposit escrow guarantees.',
      'Acquire comprehensive home insurance (Hemförsäkring) immediately upon receiving apartment keys.',
      'If charged an unreasonable sublease rent, you can contest it at the regional Rent Tribunal (Hyresnämnden) for reimbursement.'
    ]
  },
  'family-schools-social': {
    title: 'Family, Schools & Socialtjänsten: Objective Facts & Child Welfare',
    tag: 'Family & Children',
    authority: 'Socialstyrelsen & Skolverket',
    summary: 'An objective overview of Swedish preschools (Förskola), mandatory education, and social services child protection laws.',
    whatIs: 'An educational guide detailing the Swedish child welfare and education framework from preschool to secondary education and social care.',
    who: 'Families residing in Sweden with minor children under 18 years of age.',
    requirements: [
      'Enrolling children in municipal daycare and school queues via your local municipality (Kommun).',
      'Maintaining direct, transparent communication with teachers during development conferences (Utvecklingssamtal).',
      'Understanding Swedish child protection legislation strictly prohibiting all forms of corporal and verbal punishment.'
    ],
    steps: [
      'Recognize that Socialtjänsten operates primarily as a supportive family welfare service assisting households in hardship.',
      'If an inquiry notification (Orosanmälan) arises, cooperate with calm transparency and constructive dialogue.',
      'Always request an authorized, impartial interpreter in all official municipal hearings to ensure precise communication.',
      'Benefit from municipal family orientation seminars and guidance programs for new residents.'
    ]
  },
  'stockholm-raed-guide': {
    title: 'Stockholm with Raed: Best Walking Tours, Fika & Free Highlights',
    tag: 'Exclusive Stockholm Tours',
    authority: 'Visit Stockholm & @dalelak.sweden',
    summary: 'An insider guide from Raed Shehab showcasing the most picturesque spots across the Nordic capital of islands.',
    whatIs: 'A curated itinerary for scenic walking trails, authentic Swedish fika, world-famous subway art stations, and skyline viewpoints.',
    who: 'Tourists, new residents, and families looking for unforgettable weekend explorations in Stockholm.',
    requirements: [
      'SL transit card or SL smartphone app for frictionless metro, bus, tram, and public ferry transport.',
      'Comfortable walking shoes suitable for the historic cobblestone alleyways of Gamla Stan.',
      'A smartphone or camera to capture golden sunset vistas from Monteliusvägen.'
    ],
    steps: [
      'Begin the morning in Gamla Stan exploring the Royal Palace and enjoying warm cinnamon buns (Kanelbullar) in a historic bakery.',
      'Take the public SL ferry across to Djurgården island to visit the historic Vasa Museum and Skansen open-air heritage park.',
      'Embark on an underground art tour across the world longest art gallery in the Stockholm Metro (T-Centralen, Stadion, Solna Centrum).',
      'Conclude the evening with panoramic skyline views overlooking Lake Mälaren from Skinnarviksberget hill for free.'
    ]
  },
  'tourism-sweden-destinations': {
    title: 'Discover Sweden: Gothenburg, Malmö, the Arctic North & Northern Lights',
    tag: 'Swedish Tourism & Nature',
    authority: 'Visit Sweden – Official Tourism Board',
    summary: 'Top travel destinations in Sweden, coastal archipelagos, scenic railway journeys, and Allemansrätten freedom to roam.',
    whatIs: 'A guide to Swedish cities, natural landscapes, and the constitutional right of public access (Allemansrätten) allowing wild camping and roaming in nature.',
    who: 'Nature enthusiasts, adventure seekers, and family travelers exploring Scandinavia.',
    requirements: [
      'Advance railway bookings via SJ Swedish Railways for maximum savings.',
      'Appropriate seasonal outdoor attire with windproof and waterproof layering.',
      'Strict adherence to nature conservation principles: leave no trace and protect natural habitats.'
    ],
    steps: [
      'Explore Gothenburg canal boat tours, Liseberg amusement park, and botanical gardens.',
      'Visit Malmö, the architecturally stunning Turning Torso, and the iconic Öresund Bridge to Copenhagen.',
      'Journey north to Kiruna and Abisko for winter Northern Lights (Aurora Borealis) viewing and the world-famous Icehotel.',
      'Enjoy refreshing summer lake swimming in Dalarna and scenic kayaking across the Bohuslän archipelago.'
    ]
  },
  'sweden-travel-trains': {
    title: 'Travel & Trains in Sweden (SJ): Bookings, Airports & Ferries',
    tag: 'Travel & Transit',
    authority: 'SJ & Swedavia',
    summary: 'Everything you need to know about the SJ railway network, Arlanda Express airport train, and Baltic cruise ferries.',
    whatIs: 'A complete domestic and regional travel guide across Sweden, including youth, student, and senior transit concessions.',
    who: 'Commuters and travelers within Sweden and cross-border Nordic destinations.',
    requirements: [
      'The official SJ mobile app for ticketing, platform tracking, and real-time transit alerts.',
      'Valid passport or national identity document for travel within the Schengen area.',
      'Early booking on high-speed X2000 express trains to save up to 60% on fares.'
    ],
    steps: [
      'Compare Arlanda Express rail tickets with Flygbussarna coach fares for budget-conscious airport transit.',
      'Experience scenic overnight cruise ferry voyages (Silja Line / Viking Line) to Helsinki and Tallinn.',
      'Sign up for the SJ Prio loyalty program if commuting regularly to redeem points for complimentary travel.'
    ]
  },
  'events-seasons-guide': {
    title: 'Swedish Festivals & Seasons: Midsommar, Lucia & Christmas Markets',
    tag: 'Events & Seasons',
    authority: 'Kulturhuset & Visit Sweden',
    summary: 'A cultural guide to Sweden most beloved annual traditions and how to celebrate them with family and friends.',
    whatIs: 'The annual cultural traditions, folklore, and communal festivals that define Swedish life throughout the four distinct seasons.',
    who: 'All residents, newcomers, and visitors keen to connect with Swedish culture and community life.',
    requirements: [
      'Monitoring your local municipality events calendar (Kommunens evenemangskalender).',
      'Wearing season-appropriate clothing (layered thermal wear for winter and light fabrics for summer).'
    ],
    steps: [
      'Celebrate Midsummer (Midsommar) in late June around floral maypoles with traditional songs and folk dances.',
      'Experience Saint Lucia on December 13 with candlelit choral processions across churches and schools.',
      'Stroll through historic Christmas markets (Julmarknader) in Gamla Stan and Skansen during the festive winter season.'
    ]
  },
  'learn-swedish-sfi': {
    title: 'Learn Swedish: SFI & SAS Pathways & Fast-Track Fluency',
    tag: 'Swedish Language',
    authority: 'Skolverket – National Agency for Education',
    summary: 'SFI learning tracks, municipal enrollment, essential everyday vocabulary, and conversational tips.',
    whatIs: 'Swedish for Immigrants (SFI), a tuition-free state-funded language training program designed to facilitate integration and employment.',
    who: 'Residents in Sweden holding a valid Personnummer or coordination number (Samordningsnummer).',
    requirements: [
      'A Swedish Personnummer or Samordningsnummer.',
      'Registration with the adult education department (Komvux) in your resident municipality.'
    ],
    steps: [
      'Attend an educational assessment interview with your municipal guidance counsellor to determine your appropriate study track (Track 1, 2, or 3).',
      'Practice listening daily with Radio Sweden på lätt svenska (news in simplified Swedish).',
      'Join local language cafes (Språkcafé) at public libraries to practice conversational fluency in a welcoming space.',
      'Utilize the interactive audio dictionary in our app to master Swedish terminology for government agencies.'
    ]
  },
  'sweden-updates-2026': {
    title: 'Sweden 2026 Updates: New Laws, Minimum Salaries & Regulations',
    tag: '2026 Updates & News',
    authority: 'Regeringen & Migrationsverket',
    summary: 'A comprehensive roundup of 2026 Swedish legislative decisions and their implications on residency, reunification, and jobs.',
    whatIs: 'Periodic, verified coverage of major legislative and regulatory changes impacting the international community in Sweden.',
    who: 'All residents, applicants for residency, and workers residing in Sweden.',
    requirements: [
      'Relying strictly on official state sources and avoiding unverified rumors on social media.',
      'Verifying the statutory effective dates before submitting fresh applications.'
    ],
    steps: [
      'Review updated minimum salary thresholds for work permits calculated based on national median wages.',
      'Confirm the latest qualifying residency durations required for permanent residence or Swedish citizenship.',
      'Subscribe to our in-app notifications and follow @dalelak.sweden on TikTok for live explanations.'
    ]
  }
};

export function getLocalizedGuide(guide: Guide, lang: 'ar' | 'en'): Guide {
  if (lang === 'en') {
    const enData = ENGLISH_GUIDES_MAP[guide.id];
    if (enData) {
      return {
        ...guide,
        title: enData.title || guide.title,
        tag: enData.tag || guide.tag,
        authority: enData.authority || guide.authority,
        summary: enData.summary || guide.summary,
        whatIs: enData.whatIs || guide.whatIs,
        who: enData.who || guide.who,
        requirements: enData.requirements || guide.requirements,
        steps: enData.steps || guide.steps,
      };
    }
  }
  return guide;
}

export function getLocalizedCategory(cat: CategoryInfo, lang: 'ar' | 'en'): CategoryInfo {
  if (lang === 'en') {
    return {
      ...cat,
      title: cat.titleEn || cat.title,
      desc: cat.descEn || cat.desc,
      badge: cat.badgeEn || cat.badge,
    };
  }
  return cat;
}

