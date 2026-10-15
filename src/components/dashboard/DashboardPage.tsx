import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { StorageService } from '../../services/storage';
import { CycleEntry, PcosAssessmentData, DoctorVisitBrief, UserCycleProfile } from '../../types';
import { LIFE_STAGE_GUIDANCE } from '../../data/medicalKnowledge';
import { 
  Calendar, 
  HeartHandshake, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  PlusCircle, 
  BarChart2, 
  CheckCircle,
  AlertCircle,
  UserCheck
} from 'lucide-react';

interface DashboardPageProps {
  setCurrentTab: (tab: string) => void;
  openSettings: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setCurrentTab, openSettings }) => {
  const { t } = useLanguage();
  const [cycleEntries, setCycleEntries] = useState<CycleEntry[]>([]);
  const [pcosAssessments, setPcosAssessments] = useState<PcosAssessmentData[]>([]);
  const [reports, setReports] = useState<DoctorVisitBrief[]>([]);
  const [profile, setProfile] = useState<UserCycleProfile>({ lifeStage: 'unspecified', yearsSinceMenarche: null });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCycleEntries(StorageService.getCycleEntries());
    setPcosAssessments(StorageService.getPcosAssessments());
    setReports(StorageService.getHealthReports());
    setProfile(StorageService.getCycleProfile());
  };

  // Compute actual metrics
  const totalCycles = cycleEntries.length;
  const entriesWithCycleLength = cycleEntries.filter(e => e.cycleLengthFromPrevious !== null && e.cycleLengthFromPrevious !== undefined);
  const avgCycleLength = entriesWithCycleLength.length > 0
    ? Math.round(entriesWithCycleLength.reduce((sum, e) => sum + (e.cycleLengthFromPrevious || 0), 0) / entriesWithCycleLength.length)
    : null;

  const avgDuration = totalCycles > 0
    ? Math.round(cycleEntries.reduce((sum, e) => sum + e.durationDays, 0) / totalCycles)
    : null;

  const latestEntry = cycleEntries.length > 0 ? cycleEntries[cycleEntries.length - 1] : null;
  const latestPcos = pcosAssessments.length > 0 ? pcosAssessments[0] : null;
  const latestReport = reports.length > 0 ? reports[0] : null;
  const lifeStageInfo = LIFE_STAGE_GUIDANCE[profile.lifeStage] || LIFE_STAGE_GUIDANCE.unspecified;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-softPink-surface via-white to-softPink-light rounded-3xl p-6 sm:p-8 border border-softPink-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-softPink text-nearBlack text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brandPurple" />
              <span>Private Guest Storage • 100% Confidential</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-softPink-border text-brandPurple text-xs font-medium">
              <UserCheck className="w-3 h-3" />
              <span>{lifeStageInfo.label.split('(')[0]}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            Welcome to NAARI AI
          </h1>
          <p className="text-sm text-nearBlack/75 leading-relaxed">
            Your private sanctuary for menstrual cycle intelligence, PCOS symptom exploration, and doctor-ready consultation briefs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentTab('ai')}
            className="px-4 py-2.5 rounded-xl purple-gradient-btn text-xs font-semibold flex items-center gap-2 shadow-soft-purple"
          >
            <Sparkles className="w-4 h-4" />
            <span>Symptom Clarity AI</span>
          </button>
          <button
            onClick={() => setCurrentTab('cycle')}
            className="px-4 py-2.5 rounded-xl border border-softPink-border bg-white text-xs font-semibold text-nearBlack hover:bg-softPink-light transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-brandPurple" />
            <span>Log Period</span>
          </button>
        </div>
      </div>

      {/* Real Statistics Derived Exclusively from Data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">Cycles Logged</span>
            <div className="p-2 rounded-lg bg-softPink text-brandPurple">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            {totalCycles}
          </div>
          <div className="text-[11px] text-mutedText mt-1">
            {totalCycles >= 2 ? 'Calculated from actual dates' : 'Log 2+ periods for true interval'}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">Avg Cycle Interval</span>
            <div className="p-2 rounded-lg bg-softPink text-brandPurple">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            {avgCycleLength ? `${avgCycleLength} d` : '—'}
          </div>
          <div className="text-[11px] text-mutedText mt-1">
            {avgCycleLength ? `Ref: ${lifeStageInfo.cycleIntervalRange}` : 'Requires consecutive period starts'}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">Avg Bleeding Days</span>
            <div className="p-2 rounded-lg bg-softPink text-brandPurple">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            {avgDuration ? `${avgDuration} d` : '—'}
          </div>
          <div className="text-[11px] text-mutedText mt-1">
            {avgDuration ? 'Consecutive bleeding days' : 'No bleeding logged yet'}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">Doctor Brief</span>
            <div className="p-2 rounded-lg bg-softPink text-brandPurple">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display">
            {latestReport ? 'Ready' : (pcosAssessments.length > 0 || totalCycles > 0 ? 'Ready' : 'Draft')}
          </div>
          <div className="text-[11px] text-mutedText mt-1">
            {latestReport ? 'Available for export & print' : 'Complete inputs to view'}
          </div>
        </div>

      </div>

      {/* Main Two Care Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Menstrual Cycle Care Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-softPink-border shadow-xs hover:border-blush transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-softPink flex items-center justify-center text-brandPurple">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold">
                {totalCycles} Records
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-nearBlack font-display">
                {t.cycle.title}
              </h3>
              <p className="text-xs text-nearBlack/70 mt-1 leading-relaxed">
                Log period start and end dates, flow category, cramps, and track cycle interval variations across months with life-stage context.
              </p>
            </div>

            {/* Recent cycle status */}
            <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border/70 text-xs">
              {latestEntry ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-nearBlack font-medium">
                    <span>Latest Period:</span>
                    <span className="font-bold">{latestEntry.startDate} ({latestEntry.durationDays} days)</span>
                  </div>
                  <div className="flex justify-between text-mutedText">
                    <span>Flow:</span>
                    <span className="capitalize">{latestEntry.flowCategory}</span>
                  </div>
                  {latestEntry.cycleLengthFromPrevious && (
                    <div className="flex justify-between text-brandPurple font-semibold pt-1 border-t border-softPink-border/40">
                      <span>Cycle Interval:</span>
                      <span>{latestEntry.cycleLengthFromPrevious} days</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-mutedText italic flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-blush-dark shrink-0" />
                  <span>No period entries logged yet.</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              onClick={() => setCurrentTab('cycle')}
              className="flex-1 py-3 px-4 rounded-xl bg-softPink hover:bg-softPink-border text-nearBlack font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Cycle Care & Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 text-brandPurple" />
            </button>
            <button
              onClick={() => setCurrentTab('analytics')}
              className="py-3 px-4 rounded-xl border border-softPink-border hover:bg-softPink-light text-nearBlack font-semibold text-xs flex items-center gap-1.5 transition"
              title="View Charts"
            >
              <BarChart2 className="w-4 h-4 text-brandPurple" />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* PCOS Symptom Explorer Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-softPink-border shadow-xs hover:border-brandPurple/50 transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brandPurple/10 flex items-center justify-center text-brandPurple">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold">
                {latestPcos ? 'Summary Saved' : 'Clinical Exploration'}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-nearBlack font-display">
                PCOS Symptom Explorer
              </h3>
              <p className="text-xs text-nearBlack/70 mt-1 leading-relaxed">
                Explore menstrual regularity, skin and hair changes, energy and metabolic markers, and daily-life impact without diagnostic scores.
              </p>
            </div>

            {/* Recent PCOS status */}
            <div className="p-3.5 rounded-2xl bg-softPink-surface border border-softPink-border/70 text-xs">
              {latestPcos ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-nearBlack font-medium">
                    <span>Cycle Pattern:</span>
                    <span className="font-bold capitalize">{latestPcos.cycleRegularity.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between text-mutedText">
                    <span>Reported Symptoms:</span>
                    <span>{latestPcos.confirmedSymptoms.length} documented</span>
                  </div>
                  <div className="flex justify-between text-brandPurple font-semibold pt-1 border-t border-softPink-border/40">
                    <span>Last Updated:</span>
                    <span>{new Date(latestPcos.completedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ) : (
                <div className="text-mutedText italic flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brandPurple shrink-0" />
                  <span>Ready to start your structured clinical exploration.</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              onClick={() => setCurrentTab('pcos')}
              className="flex-1 py-3 px-4 rounded-xl purple-gradient-btn font-bold text-xs flex items-center justify-center gap-2 shadow-soft-purple"
            >
              <span>{latestPcos ? 'Review / Update Explorer' : 'Start PCOS Explorer'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentTab('ai')}
              className="py-3 px-4 rounded-xl border border-softPink-border hover:bg-softPink-light text-nearBlack font-semibold text-xs flex items-center gap-1.5 transition"
              title="Symptom Clarity AI"
            >
              <Sparkles className="w-4 h-4 text-brandPurple" />
              <span>Symptom Clarity</span>
            </button>
          </div>
        </div>

      </div>

      {/* Signature Feature Highlight: Doctor-Visit Brief */}
      <div className="bg-nearBlack text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-softPink text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-blush" />
            <span>Signature Feature</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-display">
            Doctor-Visit Brief
          </h3>
          <p className="text-xs text-softPink-light/80 leading-relaxed">
            Generate an official, confidential consultation brief documenting your stated concerns, symptom timeline, cycle intervals, and tailored questions for your doctor.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={() => setCurrentTab('report')}
            className="py-3 px-6 rounded-2xl bg-softPink hover:bg-white text-nearBlack font-extrabold text-xs transition flex items-center gap-2 shadow-lg"
          >
            <FileText className="w-4 h-4 text-brandPurple" />
            <span>View Doctor-Visit Brief</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 w-64 h-64 bg-brandPurple/30 rounded-full blur-3xl pointer-events-none"></div>
      </div>

    </div>
  );
};
