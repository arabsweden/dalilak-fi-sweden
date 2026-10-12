import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// 2. Chat endpoint for "اسأل دليلك"
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response with expert curated knowledge
      return res.json({
        reply: `مرحباً بك! للإجابة على استفسارك: في السويد تنظم معظم المعاملات عبر الدوائر الرسمية التالية:
• لم الشمل والإقامة: مصلحة الهجرة (Migrationsverket).
• التسجيل السكاني والرقم الشخصي: مصلحة الضرائب (Skatteverket).
• معونات الأطفال والتأمين الصحي: صندوق التأمينات (Försäkringskassan).
• البحث عن عمل ودورات SFI: مصلحة التوظيف (Arbetsförmedlingen) والبلدية.

تأكد دائماً من مراجعة قسم "استكشف" للاطلاع على تفاصيل كل خطوة وروابط المصادر الرسمية.
⚠️ تنبيه: هذه خدمة إرشادية وليست استشارة قانونية. تحقق دائماً من الجهة السويدية الرسمية.`,
        sources: [
          { title: 'Migrationsverket – مصلحة الهجرة', uri: 'https://www.migrationsverket.se' },
          { title: 'Skatteverket – مصلحة الضرائب', uri: 'https://www.skatteverket.se' }
        ]
      });
    }

    const systemInstruction = `أنت المساعد الذكي الرسمي لتطبيق «دليلك في السويد | Dalelak Sweden» التابع لحساب @dalelak.sweden للأستاذ رائد شهاب.
- تتحدث باللغة العربية الواضحة والمبسطة وتفهم جميع اللهجات العربية بدقة (سوري، عراقي، فلسطيني، مغاربي، خليجي، مصري).
- اشرح الإجراءات الرسمية في السويد خطوة بخطوة مع ذكر اسم الجهة السويدية المعنية (مثل Skatteverket, Migrationsverket, Försäkringskassan, Arbetsförmedlingen, 1177).
- عند السؤال عن أماكن أو سياحة في ستوكهولم ومدن السويد، اقترح جولات ممتعة ومقاهي فيكا ومواقع تصوير مجانية بأسلوب ودود.
- أضف دائماً في ختام الرد التنبيه الإرشادي:
"⚠️ هذه خدمة إرشادية وليست استشارة قانونية. تحقق دائماً من الجهة السويدية الرسمية."`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const replyText = response.text || 'عذراً، لم أتمكن من إيجاد رد في الوقت الحالي.';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      reply: `حدث خطأ أثناء الاتصال بالخادم، يمكنك الاستعانة بالأدلة الرسمية الموثقة في قسم "استكشف" أو إعادة المحاولة.\n\n⚠️ تنبيه: هذه خدمة إرشادية وليست استشارة قانونية. تحقق دائماً من الجهة السويدية الرسمية.`
    });
  }
});

// 3. Document explanation (OCR & Text)
app.post('/api/explain-doc', async (req, res) => {
  try {
    const { text, imageBase64, mimeType } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        analysis: `🏛️ الجهة المصدرة: إشعار رسمي من دائرة حكومية سويدية.
📋 ملخص المضمون: يتضمن هذا النوع من الخطابات عادةً إشعاراً بتحديث حالة ملفك، أو طلباً لاستكمال وثائق ثبوتية، أو إشعاراً بموعد محدد.
⚡ المطلوب منك: قم بمقارنة رقم الملف (Ärendenummer)، وتأكد من الالتزام بأي تاريخ نهائي (Sista svarsdatum) لتجنب تأخير المعاملة.
⚠️ تنبيه رسمي: راجع حسابك الإلكتروني في موقع الجهة المصدرة للتأكد من المستندات المطلوبة.`
      });
    }

    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64
        }
      });
    }
    parts.push({
      text: `حلل هذه الرسالة أو القرار السويدي بدقة متناهية باللغة العربية:
${text ? `نص إضافي:\n${text}` : ''}

الهيكلية المطلوبة:
1. 🏛️ الجهة المصدرة وموضوع الخطاب
2. 📋 ملخص المحتوى باللغة العربية المبسطة
3. ⚡ الإجراء والمطلوب منك فعله بدقة وهل هناك مهلة أو تاريخ نهائي (Sista datum)
4. 💡 نصيحة وإرشاد من «دليلك في السويد»`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: parts }],
      config: {
        systemInstruction: 'أنت خبير معتمد في فحص وشرح المراسلات الحكومية السويدية، تساعد المقيمين العرب على فهم مراسلاتهم الرسمية بدقة وهدوء.'
      }
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Explain doc error:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
});

// 4. Formal Swedish Letter Drafter
app.post('/api/letter', async (req, res) => {
  try {
    const { agency, sender, intent } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        letter: `Ärende: Förfrågan angående ärende
Till ${agency || 'berörd myndighet'},

Jag kontaktar er angående mitt ärende. Mitt namn är ${sender || '[Ditt Namn]'}.
${intent || 'Jag önskar vänligen få en uppdatering gällande handläggningen av mitt ärende.'}

Tack på förhand för er hjälp och återkoppling.

Med vänliga hälsningar,
${sender || '[Ditt Namn]'}
Telefon: [Ditt Telefonnummer]
E-post: [Din E-postadress]

---
الترجمة العربية:
الموضوع: استفسار بخصوص المعاملة
إلى الجهة المعنية:
أتواصل معكم بخصوص معاملتي. اسمي ${sender || '[اسمك]'}...
شكراً مسبقاً لمساعدتكم وردكم الكريم.`
      });
    }

    const prompt = `صغ خطاباً أو بريداً إلكترونياً رسمياً باللغة السويدية المحكمة والمهذبة (Formell och artig svenska):
الجهة المرسل إليها: ${agency}
بيانات المرسل: ${sender}
مطلب وموضوع الرسالة: ${intent}

المطلوب:
1. نص الرسالة باللغة السويدية الرسمية مع سطر الموضوع (Rubrik) وتحية رسمية وختام رسمي.
2. الترجمة العربية الكاملة للرسالة.
3. نصيحة للمرسل حول كيفية وطريقة الإرسال.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت مستشار إداري سويدي محترف تتقن المراسلات الرسمية الموجهة للدوائر الحكومية وشركات السكن.'
      }
    });

    res.json({ letter: response.text });
  } catch (error: any) {
    console.error('Letter error:', error);
    res.status(500).json({ error: 'Failed to generate letter' });
  }
});

// 5. Swedish Net Salary & Tax Calculator
app.post('/api/tax', async (req, res) => {
  try {
    const { grossSalary, municipality, churchMember, birthYear } = req.body;
    const gross = Number(grossSalary) || 32000;

    const ai = getGeminiClient();
    if (!ai) {
      // Precise standard Swedish calculation fallback
      const approxTaxRate = 0.31;
      const jobCredit = Math.min(2800, Math.round(gross * 0.08));
      const municipalTax = Math.round(gross * approxTaxRate);
      const net = gross - municipalTax + jobCredit;
      const effectiveRate = Math.round(((gross - net) / gross) * 100);

      return res.json({
        netSalary: net,
        effectiveTaxPercentage: effectiveRate,
        municipalTaxAmount: municipalTax,
        jobDeductionCredit: jobCredit,
        stateTaxAmount: gross > 51000 ? Math.round((gross - 51000) * 0.20) : 0,
        pensionAndSocialByEmployer: Math.round(gross * 0.3142),
        benefitsAndAdvice: `• لديك الحق في إجازة سنوية مدفوعة (Semester) لا تقل عن 25 يوماً وفق قانون الإجازات السويدي.
• راتبك يسجل في صندوق التقاعد العام (Allmän pension) لدى مصلحة التقاعد Pensionsmyndigheten.
• تأكد من فحص كشف الراتب (Lönespecifikation) شهرياً للتأكد من خصم الضرائب الصحيحة.`
      });
    }

    const prompt = `احسب بدقة الراتب الصافي بعد الضرائب في السويد بالكرون السويدي (SEK):
الراتب الإجمالي (Bruttolön): ${gross} SEK شهرياً
البلدية: ${municipality || 'Stockholm'}
عضوية الكنيسة: ${churchMember || 'no'}
سنة الميلاد: ${birthYear || '1992'}

احسب:
1. ضريبة البلدية المقدرة (Kommunalskatt)
2. خصم العمل التشجيعي (Jobbskatteavdrag)
3. ضريبة الدولة للدخل العالي إن انطبقت (Statlig skatt)
4. الراتب الصافي النهائي المستلم (Nettolön)
5. نسبة الاقتطاع الفعلي
6. تكلفة صاحب العمل للتقاعد والتأمينات (Arbetsgivaravgift تقريباً 31.42%)
7. نصائح حقوقية حول الإجازات والتقاعد السويدي.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            netSalary: { type: 'NUMBER' },
            effectiveTaxPercentage: { type: 'NUMBER' },
            municipalTaxAmount: { type: 'NUMBER' },
            jobDeductionCredit: { type: 'NUMBER' },
            stateTaxAmount: { type: 'NUMBER' },
            pensionAndSocialByEmployer: { type: 'NUMBER' },
            benefitsAndAdvice: { type: 'STRING' }
          },
          required: ['netSalary', 'effectiveTaxPercentage', 'municipalTaxAmount', 'jobDeductionCredit', 'benefitsAndAdvice']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Tax error:', error);
    res.status(500).json({ error: 'Failed to calculate tax' });
  }
});

// 6. Swedish Legal Appeal Drafter (Överklagande)
app.post('/api/appeal', async (req, res) => {
  try {
    const { caseType, caseNumber, decisionDate, grounds } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        appealText: `Överklagande av beslut

Ärende: ${caseType || 'Beslut'}
Ärendenummer: ${caseNumber || '[Ärendenummer]'}
Datum för beslut: ${decisionDate || '[Datum]'}

Härmed överklagar jag ovan nämnda beslut och yrkar att beslutet ändras eller upphävs.

Grunder för överklagandet:
${grounds || 'Beslutet är felaktigt grundat på otillräckliga uppgifter och bör omprövas.'}

Med vänliga hälsningar,
[Namn och Personnummer]
[Adress och Telefonnummer]

---
الترجمة العربية والتوجيه:
عريضة استئناف واعتراض رسمي:
بهذا أطعن في القرار المذكور أعلاه وألتمس تعديله أو إلغاءه للأسباب التالية:
${grounds}
⚠️ تذكير: يجب تقديم هذا الاعتراض إلى نفس الجهة التي أصدرت القرار خلال 3 أسابيع من تاريخ استلامك له.`
      });
    }

    const prompt = `صغ عريضة استئناف واعتراض رسمية كاملة باللغة السويدية (Formell Överklagan) طبقاً لقانون الإجراءات الإدارية السويدي (Förvaltningslagen):
نوع القضية: ${caseType}
رقم القرار/الملف: ${caseNumber}
تاريخ استلام القرار: ${decisionDate}
أسباب الطعن والمطالب: ${grounds}

المطلوب:
1. ديباجة الاستئناف الرسمية بالسويدية (Överklagande av beslut)
2. صياغة الطلب بوضوح (Yrkande)
3. أسباب الطعن المفصلة بلغة قانونية رصينة (Grunder för överklagandet)
4. الترجمة العربية الكاملة للعريضة
5. إرشادات واضحة حول مهلة الـ 3 أسابيع وجهة الإرسال.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت مستشار قانوني سويدي خبير في القانون الإداري وصياغة الطعون الرسمية أمام المحاكم والدوائر الحكومية.'
      }
    });

    res.json({ appealText: response.text });
  } catch (error: any) {
    console.error('Appeal error:', error);
    res.status(500).json({ error: 'Failed to generate appeal' });
  }
});

// 7. Day Tour Planner
app.post('/api/plan', async (req, res) => {
  try {
    const { city, mood, notes } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        plan: `خطة سياحية رائعة ومميزة في ${city || 'ستوكهولم'} مع رائد شهاب:
• الصباح: جولة في شوارع المدينة التاريخية وتجربة مقهى تقليدي وتناول كعكة القرفة (Kanelbulle).
• بعد الظهر: زيارة الواجهة البحرية والإطلالات الخلابة والتقاط صور تذكارية من زوايا ساحرة.
• المساء: الاستمتاع بحديقة مفتوحة أو مطعم محلي ذو طابع إسكندنافي هادئ.
💡 نصيحة رائد: احرص على استخدام تطبيق النقل العام لتوفير التنقلات واستكشاف المدينة كأهلها!`
      });
    }

    const prompt = `ابتكر برنامجاً وجولة ليوم كامل في السويد باللغة العربية بأسلوب صانع المحتوى السويدي رائد شهاب (@dalelak.sweden):
المدينة: ${city}
النوع المفضل: ${mood}
ملاحظات إضافية: ${notes || 'لا يوجد'}

الهيكل المطلوب:
- عنوان جذاب للجولة
- الصباح (المكان + فطور أو Fika)
- بعد الظهر (نشاط مميز وزاوية تصوير)
- المساء (إطلالة أو عشاء أو نشاط مجاني)
- نصيحة رائد الحصرية`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت رائد شهاب مرشد ومقدم محتوى @dalelak.sweden، تبرز أجمل معالم ومقاهي وجولات السويد بأسلوب راقٍ ودافئ.'
      }
    });

    res.json({ plan: response.text });
  } catch (error: any) {
    console.error('Plan error:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// 8. Swedish CV Helper
app.post('/api/cv', async (req, res) => {
  try {
    const { name, job, lang, exp, skills } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        cv: `CURRICULUM VITAE (CV)
=====================================
Namn: ${name || 'Förnamn Efternamn'}
Målsättning: ${job || 'Tjänst i Sverige'}
Språk: Svenska (${lang || 'Grund'}), Arabiska (Modersmål), Engelska

PROFIL:
Engagerad och driven person med stark arbetsmoral som söker nya utmaningar som ${job || 'medarbetare'}.

ARBETSLIVSERFARENHET:
* ${exp || 'Erfarenhet inom service och kundbemötande.'}

KOMPETENSER OCH FÄRDIGHETER:
* ${skills || 'Samarbetsförmåga, problemlösning, punktlighet.'}

PERSONLIGT BREV:
Hej! Jag skriver för att visa mitt stora intresse för tjänsten hos ert företag...`
      });
    }

    const prompt = `صغ سيرة ذاتية سويدية نموذجية (CV) وخطاب تقديم شخصي رسمي (Personligt Brev) بالسويدية والعربية:
الاسم: ${name}
الوظيفة المستهدفة: ${job}
مستوى اللغة السويدية: ${lang}
الخبرات السابقة: ${exp}
المهارات: ${skills}

المطلوب:
1. هيكل الـ CV باللغة السويدية المعتمدة لدى Arbetsförmedlingen.
2. خطاب تقديمي احترافي (Personligt Brev).
3. نصائح عربية لمقابلة العمل السويدية.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'أنت خبير توظيف في سوق العمل السويدي تتقن معايير التوظيف وكتابة السير الذاتية.'
      }
    });

    res.json({ cv: response.text });
  } catch (error: any) {
    console.error('CV error:', error);
    res.status(500).json({ error: 'Failed to generate CV' });
  }
});

// 9. Swedish Scenario Simulator
app.post('/api/simulate', async (req, res) => {
  try {
    const { scenario, level, userResponse, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        feedback: 'رد جيد ومفهوم! يمكنك دائماً استخدام كلمات الشكر واللباقة السويدية مثل "Tack så mycket".',
        swedishReply: 'Hej och välkommen! Hur kan jag hjälpa dig idag?',
        arabicTranslation: 'مرحباً وأهلاً بك! كيف يمكنني مساعدتك اليوم؟',
        tip: 'أجب بهدوء واذكر طلبك بوضوح.'
      });
    }

    const prompt = `أنت في محاكاة مقابلة أو موقف سويدي واقعي:
الموقف: ${scenario}
مستوى السويدية: ${level}
آخر رد من المستخدم: "${userResponse || 'بدء المحاكاة'}"

المطلوب بصيغة JSON:
- feedback: تقييم رد المستخدم باللغة العربية مع نصيحة لغوية.
- swedishReply: رد الموظف السويدي التالي باللغة السويدية.
- arabicTranslation: ترجمة السؤال أو الرد السويدي بالعربية.
- tip: اقتراح للرد المناسب.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            feedback: { type: 'STRING' },
            swedishReply: { type: 'STRING' },
            arabicTranslation: { type: 'STRING' },
            tip: { type: 'STRING' }
          },
          required: ['swedishReply', 'arabicTranslation']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Simulate error:', error);
    res.status(500).json({ error: 'Failed to simulate' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
