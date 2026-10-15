# NAARI AI — Small Symptoms, Big Answers.
> Women's Health Education, Symptom Clarity & Care-Navigation Platform | Built for the CHAOS Hackathon

NAARI AI is an AI-powered, multilingual, private, non-diagnostic women's health education and care-navigation platform focused exclusively on:
1. **Menstrual Cycle Care**
2. **PCOS Symptom Exploration**

The core mission is to transform everyday language and cultural descriptions of symptoms into understandable, compassionate, structured information that helps users decide what to track and what to discuss with a qualified healthcare professional.

---

## 🌸 Product Identity & Brand Design System

- **Official Tagline:** *Small Symptoms, Big Answers.*
- **Core Mission:** Make women's health information understandable, accessible, multilingual, privacy-conscious, and medically responsible.
- **Strict Brand Palette:**
  - Blush Pink: `#E9A3C7`
  - Soft Pink: `#F7DCEB`
  - White: `#FFFFFF`
  - Near Black: `#18151D`
  - Purple: `#7851A9`
- **Typography:** Inter & Manrope typography hierarchy.
- **Strict Medical Boundary:** NAARI AI is **not** a diagnostic tool and does not claim to diagnose or rule out conditions. It strictly prepares patient summaries and safe next-step questions for licensed medical professionals.

---

## ⚡ Research-Informed Upgrades & Core Capabilities

### 1. Symptom Clarity AI (Everyday Language-to-Health-Clarity Engine)
- **Everyday Language Input:** Users enter symptoms in everyday vernacular instead of medical terminology (supported in English, Kannada `ಕನ್ನಡ`, Telugu `తెలుగు`, and Hindi `हिन्दी`).
- **Verbatim Preservation:** Preserves the user's exact words.
- **Plain-Language Restatement:** Shows a compassionate, clear restatement of what the user described.
- **Cultural & Colloquial Glossary:**
  - *“Kamzori” (कमजोरी / ಕಮಜೋರಿ)* — Weakness, lack of physical stamina or energy, differentiated from sudden syncope.
  - *“Safed Pani” (सफेद पानी) / “Bili Seragu” (ಬಿಳಿ ಸೆರಗು) / “Tella Batta” (తెల్ల బట్ట)* — White discharge. Clarifies normal physiological discharge vs. infection signs (color, smell, irritation); clearly explains that infections require medical assessment outside the menstrual/PCOS scope without diagnosing.
  - *“Body feels hot” (ತಪ / तपन)* — Subjective warmth vs. febrile infection.
  - *“Heart feels heavy” (ಮನಸ್ಸು ಭಾರ / दिल भारी)* — Empathetic response acknowledging the psychological distress of cycle irregularity and androgenic changes without psychiatric labeling.
- **Uncertainty Handling:** If input is ambiguous or brief, the engine explicitly acknowledges uncertainty and asks clarifying questions rather than fabricating conclusions.
- **User Verification:** Interactive symptom pills allow users to correct, add, or remove symptoms.
- **Direct Care Navigation:** Instant action to add findings to the **Doctor-Visit Brief** or open the Cycle Care / PCOS Explorer modules.

### 2. Upgraded Menstrual Cycle Care with Life-Stage Awareness
- **Consecutive Start Date Calculations:** Strictly computes cycle lengths as the number of days between consecutive recorded period start dates (never treating period duration as cycle length).
- **Life-Stage Awareness:**
  - *Adolescent (12–19 years):* Explains that cycles normally range 21–45 days as the HPO axis matures; prevents rigid application of adult thresholds.
  - *Young Adult (20–29 years) & Adult (30–39 years):* 24–38 day clinical reference (ACOG).
  - *Perimenopause (40+ years):* Acknowledges natural ovulatory shifts.
- **Calculation Transparency:** Displays the exact recorded start dates that support every calculated interval.
- **Calendar & Chronological Timeline Views:** Toggle between an interactive monthly calendar with flow dots and an informative chronological timeline.
- **Pattern Explanations:** Real data derived observations regarding cycle interval variance, duration changes, and repeated symptoms without claiming causation.

### 3. Upgraded PCOS Symptom Explorer
- **5-Step Compassionate Clinical Questionnaire:**
  1. *Menstrual History:* Regularity, estimated intervals, prolonged absences (>90 days), bleeding changes.
  2. *Skin and Hair:* Acne/oily skin, facial/body hair (hirsutism), scalp hair thinning (androgen-related markers).
  3. *Energy & Metabolic Health:* Daytime fatigue levels, sleep quality & snoring (screening for obstructive sleep apnea as recommended by the 2023 International PCOS Guideline), previous clinician-identified metabolic concerns (insulin resistance, borderline glucose).
  4. *Well-being & Daily Impact:* Impact on study, work, sleep, confidence ("Heart feels heavy"), and user's main questions.
  5. *Your Symptom Summary:* Non-diagnostic summary showing reported symptoms, observed patterns, educational associations, differential considerations (thyroid, prolactin, stress), and suggested tracking items.
- **Non-Diagnostic Safeguards:** Never states that the user has or does not have PCOS; zero fake diagnostic scores, probability percentages, or medication prescriptions.

### 4. Deterministic Clinician Safety Engine (Precedence over AI)
- Operates independently and **before** any AI educational response.
- **Escalation Levels:**
  - `immediate_emergency`: Halts normal flow, displays a prominent calm red alert, and recommends emergency care:
    - Heavy acute bleeding (soaking 2+ pads/tampons per hour for consecutive hours or large clots).
    - Sudden, agonizing or sharp unilateral pelvic pain (cyst rupture / torsion).
    - High fever with pelvic tenderness and foul discharge (suspected PID).
    - Syncope (fainting) or dizziness with bleeding/pain.
    - Pregnancy with bleeding or cramping (ectopic/miscarriage risk).
  - `prompt_evaluation`: Prolonged absence of periods (>90 days) or postmenopausal bleeding.
  - `routine_consultation` & `none`.
- Emergency helpline contacts: India (112 / 108), US (911), UK (999 / 111).

### 5. Signature Feature: Doctor-Visit Brief
- Formatted for clean **A4 print layout** and client-side **PDF export** using the pink, white, black, and purple theme:
  - **Cover:** NAARI AI branding, tagline *"Small Symptoms, Big Answers."*, unique Reference ID (`NAARI-2026-XXXXX`), date, category.
  - **Section 1 — Main Concerns:** User's stated concerns, reason for consultation, priority symptoms to discuss.
  - **Section 2 — Symptom Timeline & Cycle Patterns:** Reported onset/duration, cycle dates and calculated intervals table, daily-life impact, and limitations notice.
  - **Section 3 — Symptom Clarity:** Original user words verbatim, plain-language restatement, confirmed symptoms, educational context, and differential considerations.
  - **Section 4 — Questions for the Clinician:** Tailored questions based on user's actual entries (e.g. asking about sleep apnea, hormone blood panels, or metabolic tests).
  - **Section 5 — Important Information:** Safety guidance, missing information marked *"Not provided"*, and official non-diagnostic legal disclaimer.

### 6. Reviewed Educational Knowledge Base
- All educational explanations cite verified, traceable sources:
  - **WHO Fact Sheet on PCOS (2023)**
  - **2023 International Evidence-based Guideline for PCOS (Monash University & International PCOS Network)**
  - **ACOG Practice Bulletins on Abnormal Uterine Bleeding (Reaffirmed 2023)**
  - **NHS Clinical Guidance on Menstrual Health (2023)**

### 7. Privacy & Guest-First Architecture
- 100% Guest Mode: Data stored locally in private browser session.
- No collection of invasive details (marital status, fertility intentions).
- One-click raw JSON data export and one-click data erasure.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Backend:** Node.js, Express, Zod (schema validation), CORS.
- **PDF Generation:** jsPDF, html2canvas, and CSS `@media print` A4 engine.
- **State & Storage:** Local-first consented storage service with guest mode.

---

## 🚀 Running Locally

### 1. Installation
```bash
npm install
```

### 2. Running Frontend & Backend

**Start Express Backend:**
```bash
npm run server
```
*Backend runs on `http://localhost:5000`.*

**Start Vite Frontend:**
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🏥 Medical Disclaimers & Ethics

> **Notice:** NAARI AI provides educational health information and symptom guidance. It does **not** diagnose medical conditions, replace professional medical care, or prescribe medications. In case of severe pain, uncontrollable bleeding, or pregnancy complications, seek emergency medical care immediately.
