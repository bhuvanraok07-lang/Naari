import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { StorageService } from '../../services/storage';
import { CycleEntry, FlowCategory, LifeStage, UserCycleProfile } from '../../types';
import { LIFE_STAGE_GUIDANCE } from '../../data/medicalKnowledge';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Info, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Droplets,
  AlertCircle,
  Database,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const CycleCarePage: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const [profile, setProfile] = useState<UserCycleProfile>({ lifeStage: 'unspecified', yearsSinceMenarche: null });
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState<FlowCategory>('moderate');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setEntries(StorageService.getCycleEntries());
    setProfile(StorageService.getCycleProfile());
  };

  const handleOpenModal = (entry?: CycleEntry) => {
    setFormError(null);
    if (entry) {
      setEditingId(entry.id);
      setStartDate(entry.startDate);
      setEndDate(entry.endDate);
      setFlow(entry.flowCategory);
      setSelectedSymptoms(entry.symptoms);
      setNotes(entry.notes || '');
    } else {
      setEditingId(null);
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      const fiveDaysLater = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setEndDate(fiveDaysLater);
      setFlow('moderate');
      setSelectedSymptoms(['Cramps / Dysmenorrhea']);
      setNotes('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormError(null);
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!startDate || !endDate) {
      setFormError('Both period start and end dates are required.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setFormError('Period end date cannot be earlier than start date.');
      return;
    }

    const diffDays = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 20) {
      setFormError('A single continuous period duration exceeding 20 days should be discussed with a doctor.');
      return;
    }

    StorageService.saveCycleEntry({
      id: editingId || undefined,
      startDate,
      endDate,
      flowCategory: flow,
      symptoms: selectedSymptoms,
      notes: notes.trim() || undefined,
      durationDays: diffDays + 1,
    });

    loadData();
    handleCloseModal();
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm(t.cycle.deleteEntry + '?')) {
      StorageService.deleteCycleEntry(id);
      loadData();
    }
  };

  const handleSeedDemo = () => {
    StorageService.seedSampleCycleData();
    loadData();
  };

  const handleSaveProfile = (newLifeStage: LifeStage, years: number | null) => {
    const updated: UserCycleProfile = { lifeStage: newLifeStage, yearsSinceMenarche: years };
    StorageService.saveCycleProfile(updated);
    setProfile(updated);
    setIsProfileModalOpen(false);
  };

  // Symptoms list
  const symptomOptions = [
    t.cycle.symptomCramps,
    t.cycle.symptomBloating,
    t.cycle.symptomHeadache,
    t.cycle.symptomMoodSwings,
    t.cycle.symptomFatigue,
    t.cycle.symptomBackPain,
    t.cycle.symptomBreastTenderness,
    t.cycle.symptomAcne,
  ];

  // Calendar calculations
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Map of date string -> cycle entry
  const dateToEntryMap = new Map<string, CycleEntry>();
  entries.forEach(entry => {
    const start = new Date(entry.startDate);
    const end = new Date(entry.endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dateToEntryMap.set(dateStr, entry);
    }
  });

  // Calculate statistics from actual entries
  const totalEntries = entries.length;
  const entriesWithCycleLength = entries.filter(e => e.cycleLengthFromPrevious !== null && e.cycleLengthFromPrevious !== undefined);
  const avgCycleLength = entriesWithCycleLength.length > 0
    ? Math.round(entriesWithCycleLength.reduce((sum, e) => sum + (e.cycleLengthFromPrevious || 0), 0) / entriesWithCycleLength.length)
    : null;

  // Pattern observations generated from data
  const patternObservations: string[] = [];
  if (entriesWithCycleLength.length >= 2) {
    const lengths = entriesWithCycleLength.map(e => e.cycleLengthFromPrevious || 0);
    const minLen = Math.min(...lengths);
    const maxLen = Math.max(...lengths);
    const variance = maxLen - minLen;
    if (variance > 7) {
      patternObservations.push(`Observed cycle length varied by ${variance} days across recorded intervals (from ${minLen} to ${maxLen} days). Natural fluctuation is common, but sustained variations can be reviewed with a clinician.`);
    } else {
      patternObservations.push(`Recorded cycle lengths have remained relatively consistent (between ${minLen} and ${maxLen} days).`);
    }
  }

  // Symptom frequency pattern
  const symptomRepeats: Record<string, number> = {};
  entries.forEach(e => e.symptoms.forEach(s => { symptomRepeats[s] = (symptomRepeats[s] || 0) + 1; }));
  const repeatedSymptoms = Object.entries(symptomRepeats).filter(([_, count]) => count >= 2);
  if (repeatedSymptoms.length > 0) {
    patternObservations.push(`Symptoms reported across multiple recorded periods: ${repeatedSymptoms.map(([name, count]) => `${name} (${count}x)`).join(', ')}.`);
  }

  if (totalEntries < 2) {
    patternObservations.push('More consecutive period records are needed before a meaningful pattern or cycle interval can be described.');
  }

  const currentGuidance = LIFE_STAGE_GUIDANCE[profile.lifeStage] || LIFE_STAGE_GUIDANCE.unspecified;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-softPink-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
              Module 01 • Menstrual Health
            </span>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-2.5 py-0.5 rounded-full bg-softPink hover:bg-softPink-border text-nearBlack text-[11px] font-semibold flex items-center gap-1 transition"
            >
              <UserCheck className="w-3 h-3 text-brandPurple" />
              <span>Life-Stage: {currentGuidance.label.split('(')[0]}</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-1">
            {t.cycle.title}
          </h1>
          <p className="text-xs sm:text-sm text-nearBlack/70 mt-1 max-w-2xl leading-relaxed">
            Record your period start and end dates. Real cycle lengths are calculated strictly between consecutive period start dates with full data transparency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {entries.length === 0 && (
            <button
              onClick={handleSeedDemo}
              className="px-4 py-2.5 rounded-xl border border-blush/60 bg-softPink-light hover:bg-softPink text-brandPurple text-xs font-semibold flex items-center gap-2 transition"
              title="Populate 4 clinical sample cycles"
            >
              <Database className="w-4 h-4 text-brandPurple" />
              <span>Load Clinical Demo Cycles</span>
            </button>
          )}

          <div className="flex rounded-xl border border-softPink-border p-1 bg-white">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'calendar' ? 'bg-softPink text-brandPurple' : 'text-nearBlack hover:bg-softPink-surface'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'timeline' ? 'bg-softPink text-brandPurple' : 'text-nearBlack hover:bg-softPink-surface'
              }`}
            >
              Timeline View
            </button>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 rounded-xl purple-gradient-btn text-xs font-bold flex items-center gap-2 shadow-soft-purple"
          >
            <Plus className="w-4 h-4" />
            <span>{t.cycle.logPeriod}</span>
          </button>
        </div>
      </div>

      {/* Life Stage Educational Context Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-softPink-surface to-white border border-softPink-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-3xl text-xs">
          <div className="flex items-center gap-2 text-brandPurple font-bold">
            <Info className="w-4 h-4" />
            <span>Life-Stage Guidelines • {currentGuidance.label}</span>
          </div>
          <p className="text-nearBlack/80 leading-relaxed">
            {currentGuidance.clinicalNotes} Reference cycle range: <strong className="text-nearBlack">{currentGuidance.cycleIntervalRange}</strong>.
          </p>
        </div>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl border border-softPink-border bg-white text-xs font-medium text-brandPurple hover:bg-softPink-light shrink-0 transition"
        >
          Change Life Stage
        </button>
      </div>

      {/* Main View Area: Calendar or Timeline */}
      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Widget */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-softPink-border shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-brandPurple" />
                <h3 className="text-lg font-bold text-nearBlack font-display">
                  {monthName}
                </h3>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
                  className="p-2 rounded-lg border border-softPink-border hover:bg-softPink transition"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4 text-nearBlack" />
                </button>
                <button
                  onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
                  className="p-2 rounded-lg border border-softPink-border hover:bg-softPink transition"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4 text-nearBlack" />
                </button>
              </div>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-[11px] font-bold text-mutedText py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12 sm:h-16 rounded-xl bg-gray-50/50"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const periodEntry = dateToEntryMap.get(dateStr);
                const isToday = new Date().toISOString().split('T')[0] === dateStr;

                return (
                  <div
                    key={dateStr}
                    className={`h-12 sm:h-16 rounded-xl p-1.5 flex flex-col justify-between text-xs transition border ${
                      periodEntry
                        ? 'bg-softPink border-blush font-bold text-nearBlack shadow-xs'
                        : isToday
                        ? 'border-brandPurple bg-white font-bold'
                        : 'border-softPink-border/40 hover:bg-softPink-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] ${periodEntry ? 'text-nearBlack font-extrabold' : 'text-mutedText'}`}>
                        {dayNum}
                      </span>
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brandPurple"></span>
                      )}
                    </div>

                    {periodEntry && (
                      <div className="flex items-center gap-1">
                        <Droplets className={`w-3 h-3 ${periodEntry.flowCategory === 'heavy' ? 'text-brandPurple' : 'text-blush-dark'}`} />
                        <span className="hidden sm:inline-block text-[10px] capitalize">
                          {periodEntry.flowCategory}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-5 border-t border-softPink-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-softPink border border-blush"></span>
                  <span className="text-mutedText">{t.cycle.calendarLegendPeriod}</span>
                </div>
              </div>

              <div className="text-[11px] text-mutedText italic flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brandPurple shrink-0" />
                <span>{t.cycle.cycleCalcNote}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pattern Explanations & Transparent Calculation Proof */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-softPink-border shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-brandPurple text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Pattern Explanations (Educational)</span>
              </div>

              <h4 className="text-base font-bold text-nearBlack font-display">
                Observed Cycle Tendencies
              </h4>

              <div className="space-y-2.5 text-xs text-nearBlack/85 leading-relaxed">
                {patternObservations.map((obs, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-softPink-surface border border-softPink-border">
                    {obs}
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-mutedText italic pt-1 border-t border-softPink-border/60">
                Educational observation only. Tracking observations do not diagnose PCOS, endometriosis, or thyroid conditions.
              </p>
            </div>

            {/* Calculation Transparency Card */}
            <div className="bg-nearBlack text-white rounded-3xl p-6 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-softPink flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blush" />
                <span>Transparent Calculations</span>
              </div>
              <p className="text-xs text-softPink-light/80 leading-relaxed">
                NAARI AI shows you the exact logged start dates that produce every number:
              </p>
              <div className="text-xs space-y-1.5 pt-1">
                {entriesWithCycleLength.map((e, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-white/10 text-[11px] flex justify-between">
                    <span>From previous start to {e.startDate}:</span>
                    <strong className="text-blush">{e.cycleLengthFromPrevious} days</strong>
                  </div>
                ))}
                {entriesWithCycleLength.length === 0 && (
                  <p className="text-white/60 italic text-[11px]">
                    No intervals calculated yet. Requires 2 or more period entries.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Timeline View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-softPink-border shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-softPink-border">
            <h3 className="text-lg font-bold text-nearBlack font-display">
              Chronological Menstrual Timeline
            </h3>
            <span className="text-xs text-mutedText">{entries.length} Recorded Periods</span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-softPink space-y-8">
            {entries.slice().reverse().map((entry, idx) => (
              <div key={entry.id} className="relative group">
                {/* Dot on timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-brandPurple border-4 border-white shadow-xs"></div>

                <div className="p-5 rounded-2xl border border-softPink-border bg-softPink-surface/40 hover:bg-white transition space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-brandPurple uppercase tracking-wider">
                        Period #{entries.length - idx}
                      </span>
                      <h4 className="text-sm font-bold text-nearBlack">
                        {entry.startDate} to {entry.endDate} ({entry.durationDays} days bleeding)
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold capitalize">
                        Flow: {entry.flowCategory}
                      </span>
                      <button
                        onClick={() => handleOpenModal(entry)}
                        className="p-1 rounded-lg text-nearBlack hover:bg-softPink transition"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {entry.cycleLengthFromPrevious && (
                    <div className="text-xs font-semibold text-brandPurple">
                      Cycle interval from previous start date: {entry.cycleLengthFromPrevious} days
                    </div>
                  )}

                  {entry.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {entry.symptoms.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-softPink-border text-[10px] text-nearBlack">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="text-xs text-mutedText italic pt-1 border-t border-softPink-border/40">
                      "{entry.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recorded Cycle History Cards Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-softPink-border shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-brandPurple" />
            <h3 className="text-xl font-bold text-nearBlack font-display">
              {t.cycle.historyTitle}
            </h3>
          </div>
          <span className="text-xs font-semibold text-mutedText">
            {entries.length} logged
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="py-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-softPink mx-auto flex items-center justify-center text-brandPurple">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-nearBlack font-display">
                {t.cycle.emptyHistory}
              </h4>
              <p className="text-xs text-mutedText mt-1">
                {t.cycle.emptyHistoryDesc}
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-2.5 rounded-xl purple-gradient-btn text-xs font-semibold shadow-soft-purple"
            >
              {t.cycle.logPeriod}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry, idx) => (
              <div 
                key={entry.id}
                className="p-5 rounded-2xl border border-softPink-border hover:border-blush bg-softPink-surface/40 hover:bg-white transition space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-brandPurple uppercase tracking-wider">
                      Cycle Entry #{entries.length - idx}
                    </span>
                    <div className="text-sm font-extrabold text-nearBlack mt-0.5">
                      {entry.startDate} — {entry.endDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <button
                      onClick={() => handleOpenModal(entry)}
                      className="p-1.5 rounded-lg text-nearBlack hover:bg-softPink transition"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-xl bg-white border border-softPink-border/60">
                    <span className="text-mutedText block text-[10px]">Bleeding Duration:</span>
                    <span className="font-bold text-nearBlack">{entry.durationDays} days</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-softPink-border/60">
                    <span className="text-mutedText block text-[10px]">Flow Intensity:</span>
                    <span className="font-bold text-nearBlack capitalize">{entry.flowCategory}</span>
                  </div>
                </div>

                {entry.cycleLengthFromPrevious ? (
                  <div className="p-2.5 rounded-xl bg-softPink border border-blush/60 text-xs flex items-center justify-between">
                    <span className="text-nearBlack font-medium">Calculated Cycle Interval:</span>
                    <span className="font-extrabold text-brandPurple">{entry.cycleLengthFromPrevious} days</span>
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-gray-50 text-[10px] text-mutedText italic">
                    Baseline entry (interval calculated from subsequent period)
                  </div>
                )}

                {entry.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {entry.symptoms.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-softPink-border text-[10px] text-nearBlack font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {entry.notes && (
                  <p className="text-[11px] text-mutedText italic line-clamp-2 pt-1 border-t border-softPink-border/40">
                    "{entry.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Period Logging Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearBlack/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-softPink-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSaveEntry}>
              
              {/* Modal Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-softPink-light to-white border-b border-softPink-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brandPurple/10 text-brandPurple">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-nearBlack font-display">
                    {editingId ? t.cycle.editPeriod : t.cycle.logPeriod}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg text-nearBlack hover:bg-softPink transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                
                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Dates Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-nearBlack block">
                      {t.cycle.startDate} *
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-nearBlack block">
                      {t.cycle.endDate} *
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple"
                    />
                  </div>
                </div>

                {/* Flow Category */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nearBlack block">
                    {t.cycle.flow}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['light', 'moderate', 'heavy'] as FlowCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFlow(cat)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold capitalize flex items-center justify-center gap-1.5 transition ${
                          flow === cat
                            ? 'bg-softPink border-brandPurple text-brandPurple shadow-xs'
                            : 'border-softPink-border hover:bg-softPink-surface text-nearBlack'
                        }`}
                      >
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms Checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-nearBlack block">
                    {t.cycle.symptomsTitle}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {symptomOptions.map((symp) => {
                      const isSelected = selectedSymptoms.includes(symp);
                      return (
                        <button
                          key={symp}
                          type="button"
                          onClick={() => toggleSymptom(symp)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-softPink border-blush text-nearBlack font-semibold'
                              : 'border-softPink-border hover:bg-softPink-surface text-nearBlack/80'
                          }`}
                        >
                          <span>{symp}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brandPurple" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-nearBlack block">
                    Personal Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.cycle.notesPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-softPink-border text-xs focus:outline-hidden focus:border-brandPurple resize-none"
                  ></textarea>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-softPink-border flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  {t.cycle.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl purple-gradient-btn text-xs font-bold shadow-soft-purple"
                >
                  {t.cycle.saveEntry}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Life-Stage Selection Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nearBlack/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-softPink-border p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-softPink-border">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-brandPurple" />
                <h3 className="text-base font-bold text-nearBlack font-display">
                  Select Your Life Stage
                </h3>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg text-nearBlack hover:bg-softPink transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-mutedText">
              Cycle references change across your reproductive journey. Choosing your life stage ensures NAARI AI applies medically appropriate thresholds.
            </p>

            <div className="space-y-2">
              {[
                { key: 'adolescent', label: 'Adolescent (12–19 years)', hint: 'Normal cycles range 21–45 days as HPO axis matures.' },
                { key: 'young_adult', label: 'Young Adult (20–29 years)', hint: 'Typical adult reference: 24–38 days.' },
                { key: 'adult', label: 'Adult (30–39 years)', hint: 'Typical adult reference: 24–38 days.' },
                { key: 'perimenopause', label: 'Perimenopause (40+ years)', hint: 'Hormonal fluctuations naturally increase.' },
              ].map(opt => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSaveProfile(opt.key as LifeStage, profile.yearsSinceMenarche || null)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition flex items-start justify-between ${
                    profile.lifeStage === opt.key
                      ? 'bg-softPink border-brandPurple text-nearBlack font-bold shadow-xs'
                      : 'border-softPink-border hover:bg-softPink-surface text-nearBlack'
                  }`}
                >
                  <div>
                    <div className="font-bold">{opt.label}</div>
                    <div className="text-[11px] text-mutedText font-normal mt-0.5">{opt.hint}</div>
                  </div>
                  {profile.lifeStage === opt.key && <Check className="w-4 h-4 text-brandPurple shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-5 py-2 rounded-xl purple-gradient-btn text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
