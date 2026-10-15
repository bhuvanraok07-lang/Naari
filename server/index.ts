import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';
import { AuthService } from './auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Medical sources database with supported content
const MEDICAL_SOURCES = [
  {
    id: 'who-pcos-2023',
    name: 'WHO Fact Sheet on Polycystic Ovary Syndrome (PCOS)',
    organization: 'World Health Organization (WHO)',
    publicationYear: '2023',
    guidelineTitle: 'Polycystic ovary syndrome key facts and global clinical guidance',
    summary: 'WHO consensus on PCOS diagnostic criteria (Rotterdam framework requiring at least 2 of 3 features), metabolic implications, and patient-centered lifestyle care.',
    url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
    lastReviewed: 'October 2023',
    supportedContent: 'Rotterdam diagnostic consensus framework, hyperandrogenism signs, and non-diagnostic educational boundaries.'
  },
  {
    id: 'acog-aub-2021',
    name: 'ACOG Practice Bulletin: Abnormal Uterine Bleeding',
    organization: 'American College of Obstetricians and Gynecologists (ACOG)',
    publicationYear: 'Reaffirmed 2023',
    guidelineTitle: 'Diagnosis of Abnormal Uterine Bleeding in Reproductive-Aged Women',
    summary: 'Standardized clinical classification for normal cycle parameters (24-38 days, up to 8 days duration) and evaluation pathways for irregular bleeding.',
    url: 'https://www.acog.org',
    lastReviewed: 'November 2023',
    supportedContent: 'Normal cycle interval references (24-38 days), consecutive start-date calculation rules, and heavy bleeding red flags.'
  },
  {
    id: 'monash-pcos-2023',
    name: 'International Evidence-based Guideline for PCOS 2023',
    organization: 'Monash University & International PCOS Network',
    publicationYear: '2023',
    guidelineTitle: 'Recommendations from the 2023 International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome',
    summary: 'Comprehensive global guidelines covering ovulatory dysfunction, hyperandrogenism, metabolic screening, sleep apnea/snoring screening, and adolescent diagnostic caution.',
    url: 'https://www.monash.edu/medicine/sphpm/m-ride/international-pcos-guideline',
    lastReviewed: 'August 2023',
    supportedContent: 'Metabolic health, sleep quality screening, and adolescent life-stage considerations.'
  },
  {
    id: 'nhs-menstrual-2023',
    name: 'NHS Clinical Guidance: Heavy and Irregular Periods',
    organization: 'National Health Service (NHS UK)',
    publicationYear: '2023',
    guidelineTitle: 'Menstrual health, period pain, and indications for primary care referral',
    summary: 'Clinical indicators for secondary care referral including severe dysmenorrhea, syncope with pain, and red-flag symptoms.',
    url: 'https://www.nhs.uk/conditions/periods/',
    lastReviewed: 'September 2023',
    supportedContent: 'Clinical escalation guidelines and emergency thresholds.'
  }
];

// Cultural Glossary Terms
const CULTURAL_GLOSSARY_ITEMS = [
  {
    keywords: ['kamzori', 'kamjori', 'कमजोरी', 'ಕಮಜೋರಿ', 'kamajori'],
    term: {
      phrase: 'Kamzori (कमजोरी / ಕಮಜೋರಿ)',
      language: 'Hindi / Urdu / Kannada (cognate)',
      literalMeaning: 'Weakness, lack of physical energy or generalized stamina.',
      clinicalClarification: 'Commonly used in everyday parlance to describe fatigue or low stamina. Clinically, fatigue can stem from iron deficiency/anemia (often secondary to heavy menstrual bleeding), thyroid variation, sleep disruption, or metabolic changes. It is not indicative of any single illness.',
      importantBoundaries: 'Differentiated from sudden fainting or collapse, which is an emergency red flag.'
    }
  },
  {
    keywords: ['safed pani', 'safed paani', 'सफेद पानी', 'bili seragu', 'ಬಿಳಿ ಸೆರಗು', 'tella batta', 'తెల్ల బట్ట', 'white discharge'],
    term: {
      phrase: 'Safed Pani / Bili Seragu / Tella Batta (White Discharge)',
      language: 'Hindi / Kannada / Telugu',
      literalMeaning: 'Vaginal white discharge.',
      clinicalClarification: 'Physiological discharge naturally changes throughout the cycle (clear/elastic near ovulation, white/creamy during the luteal phase). If accompanied by foul odor, green/yellow color, burning, or itchiness, a clinical swab by a healthcare provider is recommended.',
      importantBoundaries: 'Vaginal infections or cervical conditions require medical evaluation outside the scope of PCOS and cycle tracking. NAARI AI does not diagnose infections.'
    }
  },
  {
    keywords: ['body feels hot', 'body is hot', 'ತಪ', 'तपन', 'internal heat', 'body heat'],
    term: {
      phrase: 'Body feels hot / Tapa',
      language: 'Everyday vernacular',
      literalMeaning: 'Sensation of elevated internal warmth.',
      clinicalClarification: 'Subjective warmth can correspond to progesterone elevation during the luteal phase or thyroid variation. True medical fever (>38°C) with pelvic pain requires urgent medical care.',
      importantBoundaries: 'Differentiate subjective sensations of warmth from acute infection or high fever.'
    }
  },
  {
    keywords: ['heart feels heavy', 'heart is heavy', 'ಮನಸ್ಸು ಭಾರ', 'ಮನಸು ಭಾರ', 'dil bhari', 'दिल भारी'],
    term: {
      phrase: 'Heart feels heavy / Manassu Bhara (ಮನಸ್ಸು ಭಾರ)',
      language: 'Kannada / Telugu / Hindi',
      literalMeaning: 'Emotional burden, feeling weighed down, anxiety or low mood.',
      clinicalClarification: 'Hormonal variations and visible symptoms like acne, facial hair, or delayed periods can carry a significant emotional toll and psychological distress, recognized in global guidelines.',
      importantBoundaries: 'Responded to with empathy; NAARI AI does not classify everyday distress as a psychiatric disorder.'
    }
  }
];

// Clinician-reviewed Safety Rules Engine
function runSafetyEngine(text: string, symptoms: string[] = []) {
  const combined = `${text.toLowerCase()} ${symptoms.map(s => s.toLowerCase()).join(' ')}`;
  const flagged: string[] = [];
  let isUrgent = false;
  let escalationLevel: 'none' | 'routine_consultation' | 'prompt_evaluation' | 'immediate_emergency' = 'none';
  let severity: 'none' | 'moderate_advisory' | 'urgent_clinical' = 'none';
  let urgentReason = '';
  let immediateAction = 'You can safely proceed with tracking your cycle and reviewing educational guidance.';

  // 1. Extreme Hemorrhage / Heavy Acute Bleeding (Emergency)
  const heavyBleedingKeywords = [
    'soaking through', 'soak through', '2 pads an hour', 'two pads an hour',
    'pad an hour', 'tampon an hour', 'huge clot', 'large clot', 'clots bigger than',
    'gushing blood', 'bleeding non stop', 'flooding', 'soaked 3 pads', 'soaking pads'
  ];
  if (heavyBleedingKeywords.some(kw => combined.includes(kw))) {
    flagged.push('Heavy Acute Bleeding (Soaking 2+ pads/hr or Large Clots)');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Soaking through one or more menstrual pads or tampons every hour for consecutive hours or passing blood clots larger than a quarter requires immediate emergency clinical evaluation to prevent severe blood loss and acute anemia.';
    immediateAction = 'Seek emergency gynecological care or visit the nearest emergency department immediately. Do not delay.';
  }

  // 2. Severe / Agonizing Pelvic Pain (Emergency)
  const severePainKeywords = [
    'severe pain', 'unbearable pain', 'extreme pain', 'sudden sharp pain',
    'cannot walk', 'agonizing', 'doubled over', 'stabbing pain', 'one sided sharp pain',
    'ovarian torsion', 'ruptured cyst', 'excruciating'
  ];
  if (severePainKeywords.some(kw => combined.includes(kw))) {
    flagged.push('Severe Acute Pelvic / Abdominal Pain');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Sudden, severe, or sharp unilateral pelvic pain may signal acute conditions such as an ovarian cyst rupture or ovarian torsion requiring urgent medical imaging.';
    immediateAction = 'Visit an urgent care center or hospital emergency room immediately for medical evaluation and pelvic imaging.';
  }

  // 3. Systemic Infection Signs with Pelvic Symptoms (Emergency)
  const infectionKeywords = ['fever and pelvic', 'foul smelling discharge', 'chills and pain', 'high fever with period', 'pelvic tenderness'];
  if (infectionKeywords.some(kw => combined.includes(kw)) || (combined.includes('fever') && combined.includes('discharge') && combined.includes('pain'))) {
    flagged.push('Suspected Pelvic Infection / High Fever');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Fever accompanied by pelvic tenderness and abnormal discharge may indicate pelvic inflammatory disease (PID) requiring prompt antibiotic therapy.';
    immediateAction = 'Consult an urgent care physician or emergency clinic immediately.';
  }

  // 4. Hemodynamic Instability / Fainting with Bleeding or Pain (Emergency)
  const syncopeKeywords = ['fainted', 'fainting', 'passed out', 'dizzy when standing', 'extremely dizzy', 'pale and lightheaded', 'blacked out', 'shortness of breath'];
  if (syncopeKeywords.some(kw => combined.includes(kw)) && (combined.includes('bleed') || combined.includes('pain') || combined.includes('period') || combined.includes('cramp'))) {
    flagged.push('Dizziness / Syncope with Bleeding or Pain');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Feeling faint or dizzy alongside bleeding or severe pain suggests acute blood loss or hemodynamic distress.';
    immediateAction = 'Call emergency services (112 / 108 / 911 / 999) or proceed to the nearest emergency department immediately.';
  }

  // 5. Prolonged Absence of Periods (>90 Days) (Prompt Clinical Evaluation)
  if (!isUrgent && (combined.includes('no period for 3 months') || combined.includes('not come for 3 months') || combined.includes('no period for 6 months') || combined.includes('haven\'t had a period for months') || combined.includes('amenorrhea') || combined.includes('not come for a long time'))) {
    flagged.push('Prolonged Absence of Menstruation (>90 Days)');
    escalationLevel = 'prompt_evaluation';
    severity = 'moderate_advisory';
    urgentReason = 'An extended absence of periods for 90 days or longer warrants prompt evaluation by a gynecologist to evaluate endometrial lining thickness and hormonal balance.';
    immediateAction = 'Schedule a priority appointment with an OB/GYN or primary healthcare provider for hormonal and ultrasound evaluation.';
  }

  return {
    isUrgent,
    escalationLevel,
    severity,
    flaggedSymptoms: flagged,
    urgentReason: urgentReason || undefined,
    immediateAction,
    helplineNotice: isUrgent ? 'Emergency Contacts: In India dial 112 (National Emergency) or 108 (Ambulance). In the US dial 911. In the UK dial 999 or 111.' : undefined
  };
}

// Symptom extraction dictionary for English, Kannada, Telugu, Hindi
const SYMPTOM_PATTERNS = [
  {
    name: 'Delayed / Skipped Periods',
    category: 'pcos_or_cycle',
    patterns: [
      'late period', 'delayed period', 'missed period', 'irregular period', 'amenorrhea', 'no period for', 
      'cycles longer', 'not come for a long time', 'not coming properly',
      'ತಿಂಗಳು ತಪ್ಪಿದೆ', 'ಮುಟ್ಟು ವಿಳಂಬ', 'ಮುಟ್ಟು ಸರಿಯಾಗಿ ಬರುತ್ತಿಲ್ಲ', 'ಮುಟ್ಟು ಬಂದಿಲ್ಲ',
      'పీరియడ్స్ రాలేదు', 'పీరియడ్స్ ఆలస్యం', 'పీరియడ్స్ సరిగ్గా రావడం లేదు',
      'पीरियड नहीं आया', 'अनियमित पीरियड', 'पीरियड ठीक से नहीं आ रहा'
    ]
  },
  {
    name: 'Facial / Body Hair Growth (Hirsutism)',
    category: 'pcos',
    patterns: [
      'chin hair', 'facial hair', 'upper lip hair', 'hirsutism', 'excess hair', 'coarse hair', 'more facial hair',
      'ಮುಖದಲ್ಲಿ ಕೂದಲು', 'ಗಲ್ಲದ ಮೇಲೆ ಕೂದಲು',
      'గడ్డంపై రోమాలు', 'అవాంఛిత రోమాలు',
      'चेहरे पर बाल', 'ठुड्डी पर बाल'
    ]
  },
  {
    name: 'Persistent / Cystic Acne',
    category: 'pcos',
    patterns: ['acne', 'pimples', 'breakouts', 'cystic acne', 'jawline acne', 'oily skin', 'ಮೊಡವೆ', 'ಮುಖದ ಮೊಡವೆ', 'ಮొటిమలు', 'मुंहासे', 'कील मुंहासे']
  },
  {
    name: 'Scalp Hair Thinning',
    category: 'pcos',
    patterns: ['hair thinning', 'hair fall', 'hair loss', 'baldness', 'widening part', 'ಕೂದಲು ಉದುರುವಿಕೆ', 'ತೆಳುವಾಗುತ್ತಿದೆ', 'ಜುట్టు రాలడం', 'ಜುట్టు పలచబడటం', 'बाल झड़ना', 'बाल पतले होना']
  },
  {
    name: 'Severe Menstrual Cramps (Dysmenorrhea)',
    category: 'menstrual_cycle',
    patterns: ['cramps', 'painful period', 'dysmenorrhea', 'pelvic cramp', 'stomach ache', 'severe cramps every month', 'ಹೊಟ್ಟೆ ನೋವು', 'ಮುಟ್ಟಿನ ನೋವು', 'ಸೆಳೆತ', 'పీరియడ్ నొప్పి', 'కడుపు నొప్పి', 'पीरियड में दर्द', 'मासिक धर्म दर्द', 'ऐंठन']
  },
  {
    name: 'Heavy Menstrual Bleeding',
    category: 'menstrual_cycle',
    patterns: ['heavy flow', 'heavy bleeding', 'clots', 'flooding', 'ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ', 'అధిక రక్తస్రావం', 'भारी रक्तस्राव', 'खून ज्यादा आना']
  },
  {
    name: 'Fatigue & Low Physical Energy',
    category: 'general',
    patterns: ['fatigue', 'tired', 'exhausted', 'low energy', 'weak and tired', 'feel weak', 'ಆಯಾಸ', 'ಸುಸ್ತು', 'ತುಂಬಾ ಸುಸ್ತಾಗುತ್ತದೆ', 'ಅಲಸಟ', 'నీరసం', 'थकान', 'कमजोरी', 'kamzori']
  },
  {
    name: 'Abdominal Bloating',
    category: 'menstrual_cycle',
    patterns: ['bloating', 'bloated', 'swollen belly', 'ಹೊಟ್ಟೆ ಉಬ್ಬರ', 'కడుపు ఉబ్బరం', 'पेट फूलना']
  },
  {
    name: 'Weight Fluctuations / Insulin Resistance Signs',
    category: 'pcos',
    patterns: ['weight gain', 'hard to lose weight', 'dark neck', 'acanthosis', 'ತೂಕ ಹೆಚ್ಚಳ', 'బరువు పెరగడం', 'वजन बढ़ना']
  }
];

function extractSymptomsFromText(text: string): string[] {
  const lower = text.toLowerCase();
  const detected: string[] = [];

  for (const item of SYMPTOM_PATTERNS) {
    if (item.patterns.some(p => lower.includes(p.toLowerCase()))) {
      detected.push(item.name);
    }
  }

  if (detected.length === 0) {
    detected.push('User-reported menstrual or hormonal discomfort');
  }

  return detected;
}

// Zod schemas
const InterpretInputSchema = z.object({
  text: z.string().min(2, 'Description must be at least 2 characters'),
  language: z.enum(['en', 'kn', 'te', 'hi']).default('en'),
});

const SafetyCheckSchema = z.object({
  symptoms: z.array(z.string()).default([]),
  freeText: z.string().optional(),
  isPregnantOrPossible: z.boolean().optional(),
});

// 1. Symptom Clarity AI Endpoint
app.post('/api/ai/interpret', (req, res) => {
  try {
    const parsed = InterpretInputSchema.parse(req.body);
    const { text, language } = parsed;
    const lower = text.toLowerCase();

    // 1. Pre-execute Safety Rules Engine
    const safety = runSafetyEngine(text);

    // 2. Identify cultural glossary terms
    const culturalMatches: any[] = [];
    let dischargeClarification: string | null = null;
    let emotionalSupportNotice: string | null = null;

    for (const item of CULTURAL_GLOSSARY_ITEMS) {
      if (item.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
        culturalMatches.push(item.term);

        if (item.keywords.includes('safed pani') || item.keywords.includes('bili seragu') || item.keywords.includes('white discharge')) {
          dischargeClarification =
            'You mentioned vaginal discharge. Physiological discharge is normal and varies across your cycle. However, if you notice itching, odor, abnormal yellow/green color, or burning, consider consulting a healthcare professional for an evaluation. Vaginal infections require assessment outside of menstrual-cycle and PCOS tracking.';
        }

        if (item.keywords.includes('heart feels heavy') || item.keywords.includes('ಮನಸ್ಸು ಭಾರ')) {
          emotionalSupportNotice =
            'We hear you, and it is completely understandable that these health concerns feel emotionally heavy. Menstrual and hormonal fluctuations can deeply affect mood, confidence, and well-being. We encourage sharing these feelings with a supportive provider or counselor.';
        }
      }
    }

    // 3. Extract confirmed symptoms
    const reportedSymptoms = extractSymptomsFromText(text);

    // 4. Plain-language compassionate restatement
    let plainLanguageRestatement = '';
    const symptomNames = reportedSymptoms.join(', ');
    if (language === 'kn') {
      plainLanguageRestatement = `ನೀವು ನಮೂದಿಸಿದ ವಿವರಗಳಲ್ಲಿ ಮುಖ್ಯವಾಗಿ: ${symptomNames}. ನಿಮ್ಮ ಅನುಭವವನ್ನು ಸರಳವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.`;
    } else if (language === 'te') {
      plainLanguageRestatement = `మీరు తెలిపిన వివరాలలో ప్రధానంగా: ${symptomNames}. మీ లక్షణాలు నమోదు చేయబడ్డాయి.`;
    } else if (language === 'hi') {
      plainLanguageRestatement = `आपके विवरण में मुख्य रूप से ये लक्षण देखे गए हैं: ${symptomNames}.`;
    } else {
      plainLanguageRestatement = `Based on your description, you are experiencing: ${symptomNames}. We have organized these observations for healthcare clarity.`;
    }

    // 5. Determine category
    const hasPcosMarkers = reportedSymptoms.some(s =>
      s.includes('Hair') || s.includes('Acne') || s.includes('Weight') || s.includes('Delayed')
    );
    const hasCycleMarkers = reportedSymptoms.some(s =>
      s.includes('Cramps') || s.includes('Bleeding') || s.includes('Bloating')
    );

    let careCategory: 'menstrual_cycle' | 'pcos' | 'combined' | 'general_urgent' = 'menstrual_cycle';
    if (safety.isUrgent) {
      careCategory = 'general_urgent';
    } else if (hasPcosMarkers && hasCycleMarkers) {
      careCategory = 'combined';
    } else if (hasPcosMarkers) {
      careCategory = 'pcos';
    } else {
      careCategory = 'menstrual_cycle';
    }

    // 6. Missing information detection
    const missingInfo: string[] = [];
    if (!text.match(/\d+\s*(day|month|week|year|ದಿನ|ತಿಂಗಳು|రోజు|నెల|दिन|महीने)/i)) {
      missingInfo.push('Approximately how long or how many months have you noticed these symptoms?');
    }
    if (!text.toLowerCase().includes('pregnant') && !text.toLowerCase().includes('not pregnant')) {
      missingInfo.push('Is there any possibility of pregnancy?');
    }
    if (!text.match(/\d{2}/)) {
      missingInfo.push('Approximate number of days between your typical period start dates?');
    }

    // 7. Educational explanation & Suggested Tracking
    let educationalExplanation = '';
    let recommendedNextStep = '';
    const suggestedTracking = [
      'Log period start and end dates',
      'Record daily flow intensity (light, moderate, heavy)',
      'Track symptom severity (cramps, fatigue, acne)',
      'Note daily-life impact (work, study, sleep)'
    ];

    if (careCategory === 'pcos' || careCategory === 'combined') {
      educationalExplanation =
        'Your description notes symptoms like cycle delays or signs associated with androgen activity (such as acne, facial hair, or fatigue). Under international clinical guidelines (Rotterdam consensus criteria endorsed by WHO), these features warrant comprehensive clinical review to evaluate endocrine health, rule out thyroid variations, and support metabolic well-being.';
      recommendedNextStep =
        'We recommend logging your cycle dates for the next 2-3 months and generating your NAARI AI Doctor-Visit Brief to bring to a consultation with an OB/GYN or endocrinologist.';
    } else {
      educationalExplanation =
        'Your symptoms relate primarily to menstrual cycle phases and uterine contraction changes (such as dysmenorrhea or flow variations). Natural fluctuations occur due to prostaglandins, stress, and lifestyle shifts.';
      recommendedNextStep =
        'Track your period dates and symptom severity. Mild discomfort can often be managed with heat therapy, hydration, and rest. If pain limits daily functioning, discuss it with a clinician.';
    }

    // Uncertainty handling
    const confidenceLevel: 'high' | 'moderate' | 'clarification_needed' =
      reportedSymptoms.length >= 2 ? 'high' : (reportedSymptoms.length === 1 ? 'moderate' : 'clarification_needed');
    const uncertaintyNotice = confidenceLevel === 'clarification_needed'
      ? 'Your description was brief or ambiguous. Please review the extracted symptoms below and add any details to ensure full clarity.'
      : null;

    const responsePayload = {
      careCategory,
      originalText: text,
      language,
      plainLanguageRestatement,
      reportedSymptoms,
      culturalPhrasesIdentified: culturalMatches,
      dischargeClarification,
      emotionalSupportNotice,
      duration: text.match(/\b\d+\s+(?:months?|weeks?|days?|years?)\b/i)?.[0] || null,
      missingInformation: missingInfo,
      suggestedTracking,
      educationalExplanation,
      recommendedNextStep,
      confidenceLevel,
      uncertaintyNotice,
      medicalSources: MEDICAL_SOURCES,
      safetyAlert: safety,
    };

    res.json(responsePayload);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Invalid request' });
  }
});

// 2. Safety Check Endpoint
app.post('/api/safety-check', (req, res) => {
  try {
    const parsed = SafetyCheckSchema.parse(req.body);
    const result = runSafetyEngine(parsed.freeText || '', parsed.symptoms);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Invalid safety check input' });
  }
});

// 3. Medical Knowledge Sources Endpoint
app.get('/api/medical-knowledge', (_req, res) => {
  res.json({
    sources: MEDICAL_SOURCES,
    lastUpdated: '2026-10-15',
    standards: ['WHO 2023', 'ACOG Practice Bulletins', 'Monash University International PCOS Guidelines 2023']
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NAARI AI API (Enhanced)', time: new Date().toISOString() });
});

// Authentication Endpoints
const LoginSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
});

app.post('/api/auth/login', (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Please enter both your name and password.' });
    }
    const { name, password } = parsed.data;
    const result = AuthService.login(name, password);
    if (!result.success) {
      return res.status(result.status).json({ error: result.error });
    }
    return res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Authentication service error. Please try again.' });
  }
});

app.get('/api/auth/session', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.query.token as string);
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }
    const session = AuthService.verifySession(token);
    return res.json(session);
  } catch (err: any) {
    return res.status(500).json({ authenticated: false, error: 'Session verification failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.body?.token as string);
    if (token) {
      AuthService.logout(token);
    }
    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: 'Logout failed' });
  }
});

app.listen(PORT, () => {
  console.log(`[NAARI AI Server] Running on http://localhost:${PORT}`);
});
