import { SymptomClarityResult, Language, SafetyAlert } from '../types';
import { evaluateSafetyRules } from './safetyEngine';
import { MEDICAL_SOURCES, CULTURAL_GLOSSARY } from '../data/medicalKnowledge';

export const ApiService = {
  async interpretSymptoms(text: string, language: Language = 'en'): Promise<SymptomClarityResult> {
    try {
      const response = await fetch('/api/ai/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: SymptomClarityResult = await response.json();
      return data;
    } catch {
      // Offline fallback: Client-side engine
      const safety: SafetyAlert = evaluateSafetyRules({ symptoms: [], freeText: text });
      const lower = text.toLowerCase();

      // Cultural phrase matching in fallback
      const culturalMatches: any[] = [];
      let dischargeClarification: string | null = null;
      let emotionalSupportNotice: string | null = null;

      if (lower.includes('kamzori') || lower.includes('कमजोरी') || lower.includes('ಕಮಜೋರಿ')) {
        const item = CULTURAL_GLOSSARY.find(g => g.phrase.includes('Kamzori'));
        if (item) culturalMatches.push(item);
      }
      if (lower.includes('safed pani') || lower.includes('सफेद पानी') || lower.includes('bili seragu') || lower.includes('ಬಿಳಿ ಸೆರಗು') || lower.includes('white discharge')) {
        const item = CULTURAL_GLOSSARY.find(g => g.phrase.includes('Safed'));
        if (item) culturalMatches.push(item);
        dischargeClarification =
          'You mentioned vaginal discharge. Physiological discharge is normal and varies across your cycle. However, if you notice itching, odor, abnormal yellow/green color, or burning, consider consulting a healthcare professional for an evaluation. Vaginal infections require assessment outside of menstrual-cycle and PCOS tracking.';
      }
      if (lower.includes('heart feels heavy') || lower.includes('ಮನಸ್ಸು ಭಾರ') || lower.includes('dil bhari')) {
        const item = CULTURAL_GLOSSARY.find(g => g.phrase.includes('Heart'));
        if (item) culturalMatches.push(item);
        emotionalSupportNotice =
          'We hear you, and it is completely understandable that these health concerns feel emotionally heavy. Menstrual and hormonal fluctuations can deeply affect mood, confidence, and well-being. We encourage sharing these feelings with a supportive provider or counselor.';
      }

      const detected: string[] = [];
      if (lower.includes('late') || lower.includes('missed') || lower.includes('irregular') || lower.includes('not come') || lower.includes('ಸರಿಯಾಗಿ ಬರುತ್ತಿಲ್ಲ') || lower.includes('ಬಂದಿಲ್ಲ') || lower.includes('రాలేదు') || lower.includes('अनियमित')) {
        detected.push('Delayed / Irregular Menstrual Cycle');
      }
      if (lower.includes('acne') || lower.includes('pimple') || lower.includes('ಮೊಡವೆ') || lower.includes('మొటిమలు') || lower.includes('मुंहासे')) {
        detected.push('Persistent Facial / Body Acne');
      }
      if (lower.includes('hair') || lower.includes('chin') || lower.includes('facial hair') || lower.includes('ಕೂದಲು') || lower.includes('రోమాలు') || lower.includes('बाल')) {
        detected.push('Facial / Body Hair Growth (Hirsutism)');
      }
      if (lower.includes('thinning') || lower.includes('hair fall') || lower.includes('ಉದುರುವಿಕೆ') || lower.includes('రాలడం') || lower.includes('झड़ना')) {
        detected.push('Scalp Hair Thinning');
      }
      if (lower.includes('cramp') || lower.includes('pain') || lower.includes('ನೋವು') || lower.includes('నొప్పి') || lower.includes('दर्द')) {
        detected.push('Menstrual Cramps / Pelvic Discomfort');
      }
      if (lower.includes('tired') || lower.includes('weak') || lower.includes('ಸುಸ್ತು') || lower.includes('kamzori') || lower.includes('कमजोरी')) {
        detected.push('Fatigue & Low Physical Energy');
      }

      if (detected.length === 0) {
        detected.push('User-Reported Symptom Observations');
      }

      const isPcos = detected.some(s => s.includes('Hair') || s.includes('Acne') || s.includes('Delayed'));

      return {
        careCategory: safety.isUrgent ? 'general_urgent' : (isPcos ? 'pcos' : 'menstrual_cycle'),
        originalText: text,
        language,
        plainLanguageRestatement: `Based on your everyday words, we have organized: ${detected.join(', ')}.`,
        reportedSymptoms: detected,
        culturalPhrasesIdentified: culturalMatches,
        dischargeClarification,
        emotionalSupportNotice,
        duration: text.match(/\b\d+\s+(?:months?|weeks?|days?|years?)\b/i)?.[0] || null,
        missingInformation: [
          'Approximately how long or how many months have you noticed these symptoms?',
          'Is there any chance of pregnancy?',
          'What is your usual interval between periods?'
        ],
        suggestedTracking: [
          'Log period start and end dates',
          'Record daily flow intensity (light, moderate, heavy)',
          'Track symptom severity (cramps, fatigue, acne)',
          'Note daily-life impact (work, study, sleep)'
        ],
        educationalExplanation: isPcos
          ? 'Under Rotterdam and WHO consensus guidelines, irregular cycles alongside signs of elevated androgens (like acne or facial hair) are common clinical indications for PCOS evaluation.'
          : 'Normal adult cycle lengths range from 24 to 38 days. Cramps and cycle fluctuations are influenced by prostaglandins, sleep, and lifestyle factors.',
        recommendedNextStep: 'Log your dates and consult a physician with your NAARI AI Doctor-Visit Brief.',
        confidenceLevel: detected.length >= 2 ? 'high' : 'moderate',
        uncertaintyNotice: null,
        medicalSources: MEDICAL_SOURCES,
        safetyAlert: safety,
      };
    }
  },

  async runSafetyCheck(text: string, symptoms: string[]): Promise<SafetyAlert> {
    try {
      const response = await fetch('/api/safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freeText: text, symptoms }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }
    return evaluateSafetyRules({ freeText: text, symptoms });
  }
};
