import { SafetyAlert } from '../types';

interface SafetyCheckInput {
  symptoms: string[];
  freeText?: string;
  isPregnantOrPossible?: boolean;
}

export function evaluateSafetyRules(input: SafetyCheckInput): SafetyAlert {
  const text = (input.freeText || '').toLowerCase();
  const symptoms = (input.symptoms || []).map(s => s.toLowerCase());
  const combined = `${text} ${symptoms.join(' ')}`;

  const flagged: string[] = [];
  let isUrgent = false;
  let escalationLevel: SafetyAlert['escalationLevel'] = 'none';
  let severity: SafetyAlert['severity'] = 'none';
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
    urgentReason = 'Soaking through one or more menstrual pads or tampons every hour for consecutive hours or passing blood clots larger than a quarter can indicate significant acute blood loss requiring urgent clinical stabilization.';
    immediateAction = 'Seek emergency gynecological care or visit the nearest emergency department immediately. Do not wait for a routine clinic appointment.';
  }

  // 2. Severe / Agonizing Pelvic Pain (Emergency)
  const severePainKeywords = [
    'severe pain', 'unbearable pain', 'extreme pain', 'sudden sharp pain',
    'agonizing', 'cannot walk', 'doubled over', 'stabbing pain', 'one sided sharp pain',
    'ovarian torsion', 'ruptured cyst', 'excruciating'
  ];
  if (severePainKeywords.some(kw => combined.includes(kw))) {
    flagged.push('Severe Acute Pelvic / Abdominal Pain');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Sudden, severe, or sharp unilateral pelvic pain may signal acute conditions such as an ovarian cyst rupture, ovarian torsion, or acute pelvic pathology requiring immediate imaging and physical evaluation.';
    immediateAction = 'Visit an urgent care center or emergency department immediately for physical examination and pelvic ultrasound imaging.';
  }

  // 3. Systemic Infection Signs with Pelvic Symptoms (Emergency)
  const infectionKeywords = ['fever and pelvic', 'foul smelling discharge', 'chills and pain', 'high fever with period', 'pelvic tenderness'];
  if (infectionKeywords.some(kw => combined.includes(kw)) || (combined.includes('fever') && combined.includes('discharge') && combined.includes('pain'))) {
    flagged.push('Suspected Pelvic Infection / High Fever');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Fever accompanied by pelvic tenderness and abnormal or foul-smelling vaginal discharge can indicate Pelvic Inflammatory Disease (PID) or acute reproductive tract infection requiring prompt intravenous/oral antibiotic therapy.';
    immediateAction = 'Contact an urgent care provider or emergency clinic right away. Immediate medical antibiotic evaluation is required.';
  }

  // 4. Hemodynamic Instability / Fainting with Bleeding or Pain (Emergency)
  const syncopeKeywords = ['fainted', 'fainting', 'passed out', 'dizzy when standing', 'extremely dizzy', 'pale and lightheaded', 'blacked out', 'shortness of breath'];
  if (syncopeKeywords.some(kw => combined.includes(kw)) && (combined.includes('bleed') || combined.includes('pain') || combined.includes('period') || combined.includes('cramp'))) {
    flagged.push('Syncope (Fainting) or Extreme Dizziness with Bleeding/Pain');
    isUrgent = true;
    escalationLevel = 'immediate_emergency';
    severity = 'urgent_clinical';
    urgentReason = 'Dizziness, fainting, or sudden collapse occurring alongside vaginal bleeding or severe cramping suggests acute hemodynamic compromise, severe anemia, or internal bleeding.';
    immediateAction = 'Call emergency services (112 / 108 / 911 / 999) or have someone transport you to the nearest emergency department immediately.';
  }

  // 5. Pregnancy with Bleeding or Pelvic Pain (Emergency)
  const pregnancyKeywords = ['pregnant', 'positive test', 'pregnancy test'];
  if (input.isPregnantOrPossible || pregnancyKeywords.some(kw => combined.includes(kw))) {
    if (combined.includes('bleeding') || combined.includes('spotting') || combined.includes('pain') || combined.includes('cramp')) {
      flagged.push('Bleeding / Pelvic Pain During Known or Suspected Pregnancy');
      isUrgent = true;
      escalationLevel = 'immediate_emergency';
      severity = 'urgent_clinical';
      urgentReason = 'Vaginal bleeding or sharp cramping in known or suspected pregnancy requires immediate emergency evaluation to rule out ectopic pregnancy or pregnancy complications.';
      immediateAction = 'Seek immediate emergency obstetric/gynecological evaluation.';
    }
  }

  // 6. Prolonged Absence of Periods (>90 Days) (Prompt Clinical Evaluation)
  if (!isUrgent && (combined.includes('no period for 3 months') || combined.includes('not come for 3 months') || combined.includes('no period for 6 months') || combined.includes('haven\'t had a period for months') || combined.includes('amenorrhea'))) {
    flagged.push('Prolonged Absence of Menstruation (>90 Days)');
    escalationLevel = 'prompt_evaluation';
    severity = 'moderate_advisory';
    urgentReason = 'An absence of menstrual periods for 90 days or longer (secondary amenorrhea in non-pregnant individuals) warrants priority clinical evaluation by an OB/GYN to examine endometrial lining health and rule out endocrine imbalances.';
    immediateAction = 'Schedule a prompt appointment with an OB/GYN or primary healthcare provider for hormonal and ultrasound evaluation.';
  }

  // 7. Postmenopausal Bleeding (Prompt Evaluation)
  const postmenopausalKeywords = ['postmenopausal', 'after menopause', 'stopped having periods years ago'];
  if (!isUrgent && postmenopausalKeywords.some(kw => combined.includes(kw)) && (combined.includes('bleed') || combined.includes('spotting'))) {
    flagged.push('Postmenopausal Bleeding');
    escalationLevel = 'prompt_evaluation';
    severity = 'moderate_advisory';
    urgentReason = 'Any vaginal bleeding occurring after menopause requires timely medical investigation by a gynecologist to evaluate the endometrium.';
    immediateAction = 'Schedule a prompt priority consultation with a gynecologist for endometrial evaluation.';
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
