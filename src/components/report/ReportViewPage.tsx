import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { StorageService } from '../../services/storage';
import { DoctorVisitBrief, CycleEntry, PcosAssessmentData } from '../../types';
import { MEDICAL_SOURCES, EDUCATIONAL_TOPICS } from '../../data/medicalKnowledge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FileText, 
  Printer, 
  Download, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Database,
  Calendar,
  Sparkles,
  Info,
  Clock,
  Heart
} from 'lucide-react';

interface ReportViewPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ReportViewPage: React.FC<ReportViewPageProps> = ({ setCurrentTab }) => {
  const { language } = useLanguage();
  const [brief, setBrief] = useState<DoctorVisitBrief | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateOrLoadBrief();
  }, [language]);

  const generateOrLoadBrief = () => {
    const cycleEntries = StorageService.getCycleEntries();
    const pcosAssessments = StorageService.getPcosAssessments();
    const existingReports = StorageService.getHealthReports();

    if (existingReports.length > 0) {
      setBrief(existingReports[0]);
      return;
    }

    if (cycleEntries.length > 0 || pcosAssessments.length > 0) {
      buildBriefFromData(cycleEntries, pcosAssessments);
    } else {
      setBrief(null);
    }
  };

  const buildBriefFromData = (cycleEntries: CycleEntry[], pcosAssessments: PcosAssessmentData[]) => {
    const latestPcos = pcosAssessments.length > 0 ? pcosAssessments[0] : null;

    // Cycle intervals calculation
    const totalRecorded = cycleEntries.length;
    const entriesWithLength = cycleEntries.filter(e => e.cycleLengthFromPrevious !== null && e.cycleLengthFromPrevious !== undefined);
    const avgCycleLength = entriesWithLength.length > 0
      ? Math.round(entriesWithLength.reduce((sum, e) => sum + (e.cycleLengthFromPrevious || 0), 0) / entriesWithLength.length)
      : null;
    const avgDuration = totalRecorded > 0
      ? Math.round(cycleEntries.reduce((sum, e) => sum + e.durationDays, 0) / totalRecorded)
      : null;

    const observedIntervals = cycleEntries.map(e => ({
      startDate: e.startDate,
      durationDays: e.durationDays,
      cycleLength: e.cycleLengthFromPrevious ?? null,
      flow: e.flowCategory,
    }));

    // Aggregate confirmed symptoms
    const allSymptoms = new Set<string>();
    cycleEntries.forEach(e => e.symptoms.forEach(s => allSymptoms.add(s)));
    if (latestPcos) {
      latestPcos.confirmedSymptoms.forEach(s => allSymptoms.add(s));
    }
    const uniqueSymptoms = Array.from(allSymptoms);
    if (uniqueSymptoms.length === 0) {
      uniqueSymptoms.push('General menstrual cycle logging');
    }

    const reportId = `NAARI-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Personalized doctor questions based on user's actual entries
    const customQuestions: string[] = [];
    if (latestPcos?.cycleRegularity === 'irregular_infrequent' || latestPcos?.cycleRegularity === 'absent_amenorrhea') {
      customQuestions.push('Given my irregular/delayed cycle intervals, what hormonal panels (FSH, LH, Total & Free Testosterone, TSH, Prolactin) do you recommend?');
    }
    if (latestPcos?.acneChanges && latestPcos.acneChanges !== 'none') {
      customQuestions.push('Could my persistent acne be linked to androgen elevation, and what non-harsh therapeutic options are safe for me?');
    }
    if (latestPcos?.hairChanges && latestPcos.hairChanges !== 'none') {
      customQuestions.push('What is the best clinical approach to evaluate and manage unwanted facial/body hair growth?');
    }
    if (latestPcos?.sleepQualityOrSnoring === 'snoring_waking_gasping') {
      customQuestions.push('Should I be evaluated for obstructive sleep apnea (OSA) given my snoring and daytime exhaustion?');
    }
    if (latestPcos?.metabolicHistory !== 'none') {
      customQuestions.push('Would you recommend fasting insulin, oral glucose tolerance testing (OGTT), or a lipid panel to check metabolic parameters?');
    }
    if (customQuestions.length === 0) {
      customQuestions.push(...EDUCATIONAL_TOPICS.standardQuestionsForDoctor);
    }

    const newBrief: DoctorVisitBrief = {
      reportId,
      generatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: latestPcos && totalRecorded > 0 ? 'combined' : (latestPcos ? 'pcos' : 'menstrual_cycle'),
      language,
      mainConcerns: {
        primaryStatedConcern: latestPcos?.primaryConcernText || (latestPcos ? 'PCOS Symptom Exploration & Cycle Irregularity' : 'Menstrual Cycle Tracking & Pain Monitoring'),
        reasonForConsultation: 'To share a structured timeline of cycle dates, observed physical symptoms, and questions with a healthcare provider.',
        prioritySymptomsToDiscuss: uniqueSymptoms,
        userNotes: latestPcos?.userDescription || cycleEntries.find(e => e.notes)?.notes || 'None recorded.',
      },
      symptomTimeline: {
        reportedOnsetOrDuration: latestPcos ? latestPcos.durationMonths.replace(/_/g, ' ') : (totalRecorded > 1 ? `${totalRecorded} logged cycles` : 'Recent entries'),
        totalCyclesRecorded: totalRecorded,
        averageCycleLengthDays: avgCycleLength,
        averagePeriodDurationDays: avgDuration,
        observedCycleIntervals: observedIntervals,
        dailyLifeImpact: latestPcos?.dailyLifeImpact || ['Daily activity monitoring'],
        limitationsNotice: totalRecorded < 3
          ? 'Tracking history contains fewer than 3 consecutive cycles. Additional consecutive logging will increase interval reliability.'
          : 'Based strictly on consecutive recorded period start dates without predictive interpolation.',
      },
      symptomClarity: {
        originalUserWords: latestPcos?.userDescription || 'Everyday symptom descriptions logged in session.',
        plainLanguageRestatement: `User describes: ${uniqueSymptoms.join(', ')}. Organized into clinical parameters.`,
        confirmedSymptoms: uniqueSymptoms,
        educationalContext: latestPcos
          ? 'Features reported correspond to areas clinically assessed under the international Rotterdam consensus for PCOS (Monash University / WHO guidelines). Clinical hyperandrogenism and cycle variations warrant comprehensive differential evaluation.'
          : 'Recorded intervals reflect natural follicular and luteal phase transitions.',
        differentialConsiderations: [
          'Hypothyroidism or Hyperthyroidism (TSH / Free T4 lab test)',
          'Hyperprolactinemia (Serum Prolactin assay)',
          'Non-classic Congenital Adrenal Hyperplasia (17-OHP test)',
          'Nutritional or stress-related hypothalamic amenorrhea'
        ],
        sourcesCited: MEDICAL_SOURCES,
      },
      questionsForClinician: {
        personalizedQuestions: customQuestions,
        suggestedTopicsToExplore: [
          'Cycle regularity and ovulation patterns',
          'Metabolic and insulin resistance screening',
          'Evidence-based lifestyle and nutritional considerations'
        ],
      },
      importantInformation: {
        safetyNotice: 'If acute severe pelvic pain, soaking 2+ pads/hour, high fever, or syncope occurs, emergency care is required.',
        missingInformationNotes: [
          'Pelvic ultrasound imaging (Not provided — must be conducted by a licensed clinician)',
          'Serum hormone panel values (Not provided — requires laboratory venous blood draw)',
          'Fasting metabolic parameters (Not provided)'
        ],
        disclaimer: EDUCATIONAL_TOPICS.disclaimerText,
      },
    };

    StorageService.saveHealthReport(newBrief);
    setBrief(newBrief);
  };

  const handleSeedDemoAndGenerate = () => {
    StorageService.seedSampleCycleData();
    const demoPcos: PcosAssessmentData = {
      id: 'demo_pcos_brief',
      cycleRegularity: 'irregular_infrequent',
      acneChanges: 'moderate_severe',
      hairChanges: 'noticeable_chin_chest_abdomen',
      scalpHairThinning: false,
      durationMonths: '6_to_12',
      priorMedicalEvaluation: 'none',
      tirednessOrEnergy: 'frequent_fatigue',
      sleepQualityOrSnoring: 'snoring_waking_gasping',
      metabolicHistory: 'none',
      dailyLifeImpact: [
        'Studying / Focus at school or college',
        'Self-confidence & emotional comfort ("Heart feels heavy")',
        'Daily physical energy'
      ],
      primaryConcernText: 'My periods are 45-50 days apart, I feel tired most days, and I have stubborn acne on my jawline. I want to know if this could be PCOS.',
      userDescription: 'My periods come every 45-50 days. I feel weak and tired ("kamzori"), I have coarse chin hair, and my heart feels heavy worrying about it.',
      confirmedSymptoms: [
        'Irregular or Infrequent Menstrual Cycles (45-50 days)',
        'Moderate to Severe Persistent Acne (Jawline & Chin)',
        'Noticeable Facial Hair Growth (Hirsutism)',
        'Frequent Fatigue & Low Physical Energy ("Kamzori")',
        'Snoring / Sleep Disruption'
      ],
      completedAt: new Date().toISOString(),
    };

    StorageService.savePcosAssessment(demoPcos);
    const cycles = StorageService.getCycleEntries();
    buildBriefFromData(cycles, [demoPcos]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`NAARI-AI-Doctor-Visit-Brief-${brief?.reportId || 'Summary'}.pdf`);
    } catch {
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-softPink-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="p-2 rounded-xl border border-softPink-border hover:bg-softPink text-nearBlack transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
              Signature Clinical Feature
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-nearBlack font-display">
              Doctor-Visit Brief
            </h1>
          </div>
        </div>

        {brief && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-softPink-border bg-white hover:bg-softPink-light text-nearBlack text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-brandPurple" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold flex items-center gap-2 shadow-soft-purple disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF Brief</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {!brief ? (
        <div className="bg-white rounded-3xl p-12 border border-softPink-border text-center max-w-lg mx-auto space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-softPink mx-auto flex items-center justify-center text-brandPurple">
            <FileText className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-nearBlack font-display">
              No Doctor-Visit Brief Generated Yet
            </h3>
            <p className="text-xs text-mutedText leading-relaxed">
              Log your cycle dates or complete the PCOS Symptom Explorer to generate your personalized consultation brief. You can also load clinical demo data to preview the full A4 layout.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={handleSeedDemoAndGenerate}
              className="px-5 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-soft-purple"
            >
              <Database className="w-4 h-4" />
              <span>Generate with Clinical Demo Data</span>
            </button>
            <button
              onClick={() => setCurrentTab('pcos')}
              className="px-5 py-2.5 rounded-xl border border-softPink-border bg-softPink-light hover:bg-softPink text-nearBlack text-xs font-semibold"
            >
              Start PCOS Explorer
            </button>
          </div>
        </div>
      ) : (
        /* The Official 5-Section Printable A4 Doctor-Visit Brief */
        <div 
          ref={reportRef}
          className="bg-white rounded-3xl border border-softPink-border shadow-premium p-8 sm:p-12 space-y-10 print-card"
          id="naari-doctor-visit-brief"
        >
          
          {/* COVER & HEADER */}
          <div className="border-b-2 border-softPink pb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brandPurple text-white flex items-center justify-center shadow-xs">
                  <svg className="w-7 h-7 text-softPink" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.5 5 7 8 7 11.5C7 15 9.5 17.5 12 17.5C14.5 17.5 17 15 17 11.5C17 8 14.5 5 12 2Z" />
                    <circle cx="12" cy="19.5" r="2.5" fill="#E9A3C7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-nearBlack font-display tracking-tight">
                    NAARI <span className="text-brandPurple">AI</span>
                  </h2>
                  <p className="text-xs text-brandPurple font-semibold">
                    Small Symptoms, Big Answers.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-softPink text-nearBlack text-[11px] font-bold border border-blush">
                  Ref: {brief.reportId}
                </span>
                <div className="text-[11px] text-mutedText">
                  Generated: {brief.generatedAt}
                </div>
                <div className="text-[10px] text-mutedText uppercase tracking-wider">
                  Category: {brief.category.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h1 className="text-2xl font-extrabold text-nearBlack font-display">
                Doctor-Visit Brief
              </h1>
              <p className="text-xs text-mutedText mt-0.5">
                Personalized Clinical Consultation Summary • Prepared by Patient for Medical Review
              </p>
            </div>
          </div>

          {/* SECTION 1 — MAIN CONCERNS */}
          <div className="space-y-4 page-break-inside-avoid">
            <div className="flex items-center gap-2 pb-1 border-b border-softPink-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                Section 1
              </span>
              <h3 className="text-base font-bold text-nearBlack font-display">
                Main Concerns & Reason for Visit
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-softPink-surface border border-softPink-border space-y-1">
                <span className="text-mutedText block text-[11px] font-bold uppercase tracking-wider">
                  Primary Stated Concern:
                </span>
                <span className="font-bold text-nearBlack">{brief.mainConcerns.primaryStatedConcern}</span>
              </div>
              <div className="p-4 rounded-2xl bg-softPink-surface border border-softPink-border space-y-1">
                <span className="text-mutedText block text-[11px] font-bold uppercase tracking-wider">
                  Reason for Consultation:
                </span>
                <span className="font-bold text-nearBlack">{brief.mainConcerns.reasonForConsultation}</span>
              </div>
            </div>

            {/* Confirmed priority symptoms */}
            <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2">
              <span className="text-[11px] font-bold text-mutedText block uppercase tracking-wider">
                Priority Symptoms to Discuss:
              </span>
              <div className="flex flex-wrap gap-2">
                {brief.mainConcerns.prioritySymptomsToDiscuss.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-softPink border border-blush text-nearBlack text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {brief.mainConcerns.userNotes && (
              <div className="p-4 rounded-2xl bg-white border border-softPink-border text-xs space-y-1">
                <span className="text-mutedText block text-[11px]">User Stated Observations / Words:</span>
                <p className="text-nearBlack italic">"{brief.mainConcerns.userNotes}"</p>
              </div>
            )}
          </div>

          {/* SECTION 2 — SYMPTOM TIMELINE & CYCLE PATTERNS */}
          <div className="space-y-4 page-break-inside-avoid">
            <div className="flex items-center gap-2 pb-1 border-b border-softPink-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                Section 2
              </span>
              <h3 className="text-base font-bold text-nearBlack font-display">
                Symptom Timeline & Recorded Cycle Patterns
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-softPink-border">
                <span className="text-mutedText block text-[10px]">Reported Onset / Duration</span>
                <span className="text-base font-bold text-nearBlack">{brief.symptomTimeline.reportedOnsetOrDuration}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-softPink-border">
                <span className="text-mutedText block text-[10px]">Average Cycle Interval</span>
                <span className="text-base font-bold text-brandPurple">
                  {brief.symptomTimeline.averageCycleLengthDays ? `${brief.symptomTimeline.averageCycleLengthDays} days` : 'Not established (<2 starts)'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-softPink-border">
                <span className="text-mutedText block text-[10px]">Average Bleeding Duration</span>
                <span className="text-base font-bold text-nearBlack">
                  {brief.symptomTimeline.averagePeriodDurationDays ? `${brief.symptomTimeline.averagePeriodDurationDays} days` : 'Not provided'}
                </span>
              </div>
            </div>

            {/* Table of Recorded Cycle Dates & Intervals */}
            {brief.symptomTimeline.observedCycleIntervals.length > 0 && (
              <div className="border border-softPink-border rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-softPink text-nearBlack font-bold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Period Start Date</th>
                      <th className="py-2.5 px-3">Bleeding Days</th>
                      <th className="py-2.5 px-3">Flow Category</th>
                      <th className="py-2.5 px-3">Calculated Cycle Interval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-softPink-border/50 text-[11px]">
                    {brief.symptomTimeline.observedCycleIntervals.map((e, idx) => (
                      <tr key={idx} className="hover:bg-softPink-surface/50">
                        <td className="py-2 px-3 font-semibold text-nearBlack">{e.startDate}</td>
                        <td className="py-2 px-3 text-mutedText">{e.durationDays} days</td>
                        <td className="py-2 px-3 capitalize text-mutedText">{e.flow}</td>
                        <td className="py-2 px-3 font-bold text-brandPurple">
                          {e.cycleLength ? `${e.cycleLength} days` : 'Baseline period'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Daily-Life Impact */}
            {brief.symptomTimeline.dailyLifeImpact.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-softPink-border text-xs space-y-1.5">
                <span className="text-[11px] font-bold text-mutedText block uppercase tracking-wider">
                  Daily-Life Impact Reported by User:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {brief.symptomTimeline.dailyLifeImpact.map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-softPink-surface border border-softPink-border text-[11px] text-nearBlack">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-mutedText italic">
              * {brief.symptomTimeline.limitationsNotice}
            </p>
          </div>

          {/* SECTION 3 — SYMPTOM CLARITY & EDUCATIONAL CONTEXT */}
          <div className="space-y-4 page-break-inside-avoid">
            <div className="flex items-center gap-2 pb-1 border-b border-softPink-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                Section 3
              </span>
              <h3 className="text-base font-bold text-nearBlack font-display">
                Symptom Clarity & Educational Context
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-softPink-surface border border-softPink-border text-xs leading-relaxed text-nearBlack/85 space-y-2">
              <strong className="text-nearBlack block">Educational Interpretation:</strong>
              <p>{brief.symptomClarity.educationalContext}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2 text-xs">
              <span className="text-mutedText block font-bold text-[11px] uppercase tracking-wider">
                Differential Considerations to Discuss with Your Doctor:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-nearBlack">
                {brief.symptomClarity.differentialConsiderations.map((diff, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brandPurple shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 4 — QUESTIONS FOR THE CLINICIAN */}
          <div className="space-y-4 page-break-inside-avoid">
            <div className="flex items-center gap-2 pb-1 border-b border-softPink-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                Section 4
              </span>
              <h3 className="text-base font-bold text-nearBlack font-display">
                Personalized Questions for Your Healthcare Provider
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-softPink-border space-y-2 text-xs">
              <ul className="space-y-2">
                {brief.questionsForClinician.personalizedQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-softPink-surface">
                    <span className="w-5 h-5 rounded-md bg-brandPurple text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-nearBlack font-medium">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 5 — IMPORTANT INFORMATION & CLINICAL NOTICE */}
          <div className="space-y-4 page-break-inside-avoid">
            <div className="flex items-center gap-2 pb-1 border-b border-softPink-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
                Section 5
              </span>
              <h3 className="text-base font-bold text-nearBlack font-display">
                Important Information & Non-Diagnostic Notice
              </h3>
            </div>

            {/* Missing Info Notes */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
              <span className="text-mutedText block font-bold text-[11px] uppercase tracking-wider">
                Clinical Information Not Established in This Brief:
              </span>
              <ul className="space-y-1 list-disc pl-4 text-nearBlack/80">
                {brief.importantInformation.missingInformationNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Non-Diagnostic Disclaimer */}
            <div className="p-5 rounded-2xl bg-nearBlack text-white space-y-2 text-xs">
              <div className="flex items-center gap-2 text-blush font-bold">
                <ShieldCheck className="w-4 h-4 text-blush" />
                <span>Non-Diagnostic Disclaimer</span>
              </div>
              <p className="text-softPink-light/85 leading-relaxed text-[11px]">
                {brief.importantInformation.disclaimer} Symptoms alone cannot establish or rule out PCOS or any other medical condition. This Doctor-Visit Brief is intended solely to facilitate structured patient-clinician dialogue during an in-person or telehealth medical consultation.
              </p>
              <div className="pt-2 text-[10px] text-white/50 border-t border-white/10 flex justify-between">
                <span>Brief Reference: {brief.reportId}</span>
                <span>NAARI AI — Small Symptoms, Big Answers.</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
