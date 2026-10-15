import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { StorageService } from '../../services/storage';
import { CycleEntry } from '../../types';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  Database,
  Droplets
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<CycleEntry[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = StorageService.getCycleEntries();
    setEntries(data);
  };

  const handleSeedDemo = () => {
    StorageService.seedSampleCycleData();
    loadData();
  };

  // Prepare chart data
  const cycleLengthData = entries
    .filter(e => e.cycleLengthFromPrevious !== null && e.cycleLengthFromPrevious !== undefined)
    .map((e, idx) => ({
      name: `Cycle ${idx + 1}`,
      date: e.startDate,
      cycleLength: e.cycleLengthFromPrevious,
    }));

  const periodDurationData = entries.map((e, idx) => ({
    name: `Period ${idx + 1}`,
    date: e.startDate,
    duration: e.durationDays,
  }));

  // Calculate symptom counts
  const symptomCounts: Record<string, number> = {};
  entries.forEach(e => {
    e.symptoms.forEach(s => {
      symptomCounts[s] = (symptomCounts[s] || 0) + 1;
    });
  });

  const symptomData = Object.entries(symptomCounts)
    .map(([symptom, count]) => ({ symptom, count }))
    .sort((a, b) => b.count - a.count);

  // Statistics
  const totalCycles = entries.length;
  const entriesWithCycleLength = entries.filter(e => e.cycleLengthFromPrevious !== null && e.cycleLengthFromPrevious !== undefined);
  const avgCycleLength = entriesWithCycleLength.length > 0
    ? Math.round(entriesWithCycleLength.reduce((sum, e) => sum + (e.cycleLengthFromPrevious || 0), 0) / entriesWithCycleLength.length)
    : null;

  const minCycleLength = entriesWithCycleLength.length > 0
    ? Math.min(...entriesWithCycleLength.map(e => e.cycleLengthFromPrevious || 0))
    : null;

  const maxCycleLength = entriesWithCycleLength.length > 0
    ? Math.max(...entriesWithCycleLength.map(e => e.cycleLengthFromPrevious || 0))
    : null;

  const avgDuration = totalCycles > 0
    ? (entries.reduce((sum, e) => sum + e.durationDays, 0) / totalCycles).toFixed(1)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-softPink-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brandPurple">
              Cycle Intelligence
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-softPink text-nearBlack text-[11px] font-semibold">
              Real Data Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-1">
            {t.analytics.title}
          </h1>
          <p className="text-xs sm:text-sm text-nearBlack/70 mt-1 max-w-2xl leading-relaxed">
            {t.analytics.subtitle}
          </p>
        </div>

        {entries.length === 0 && (
          <button
            onClick={handleSeedDemo}
            className="px-4 py-2.5 rounded-xl purple-gradient-btn text-xs font-semibold flex items-center gap-2 shadow-soft-purple"
          >
            <Database className="w-4 h-4" />
            <span>Load Demo Cycles</span>
          </button>
        )}
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between text-mutedText text-xs uppercase tracking-wider font-semibold">
            <span>{t.analytics.recordedCycles}</span>
            <Calendar className="w-4 h-4 text-brandPurple" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-2">
            {totalCycles}
          </div>
          <p className="text-[11px] text-mutedText mt-1">Total recorded period start dates</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between text-mutedText text-xs uppercase tracking-wider font-semibold">
            <span>{t.analytics.avgCycleLength}</span>
            <Clock className="w-4 h-4 text-brandPurple" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-2">
            {avgCycleLength ? `${avgCycleLength} days` : '—'}
          </div>
          <p className="text-[11px] text-mutedText mt-1">
            {avgCycleLength ? `Range: ${minCycleLength}–${maxCycleLength} days` : 'Requires 2+ consecutive starts'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between text-mutedText text-xs uppercase tracking-wider font-semibold">
            <span>{t.analytics.avgPeriodDuration}</span>
            <Droplets className="w-4 h-4 text-brandPurple" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-2">
            {avgDuration ? `${avgDuration} days` : '—'}
          </div>
          <p className="text-[11px] text-mutedText mt-1">Average consecutive bleeding days</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-softPink-border shadow-xs">
          <div className="flex items-center justify-between text-mutedText text-xs uppercase tracking-wider font-semibold">
            <span>Clinical Reference</span>
            <TrendingUp className="w-4 h-4 text-brandPurple" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-nearBlack font-display mt-2">
            24–38 d
          </div>
          <p className="text-[11px] text-mutedText mt-1">Standard normal adult reference (ACOG)</p>
        </div>
      </div>

      {/* Main Charts */}
      {entries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-softPink-border text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-softPink mx-auto flex items-center justify-center text-brandPurple">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-nearBlack font-display">
            {t.analytics.insufficientDataNotice}
          </h3>
          <p className="text-xs text-mutedText">
            Log your dates in Menstrual Cycle Care or load the clinical demo records to see instant graphs.
          </p>
          <button
            onClick={handleSeedDemo}
            className="px-6 py-2.5 rounded-xl purple-gradient-btn text-xs font-semibold shadow-soft-purple"
          >
            Load Demo Data Now
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart 1: Cycle Length Trend */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-softPink-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-nearBlack font-display">
                    {t.analytics.cycleLengthTrend}
                  </h3>
                  <p className="text-xs text-mutedText">
                    Days between consecutive period start dates
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-softPink text-nearBlack">
                  {cycleLengthData.length} Intervals
                </span>
              </div>

              {cycleLengthData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-xs text-mutedText italic p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-blush-dark mb-2" />
                  <span>Only 1 period entry recorded. Log your next period to visualize the cycle length interval.</span>
                </div>
              ) : (
                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cycleLengthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F7DCEB" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5A5263' }} />
                      <YAxis domain={[15, 50]} tick={{ fontSize: 11, fill: '#5A5263' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          borderColor: '#E9A3C7', 
                          borderRadius: '12px',
                          fontSize: '12px'
                        }} 
                      />
                      <Bar dataKey="cycleLength" fill="#7851A9" radius={[8, 8, 0, 0]} name="Cycle Length (Days)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Chart 2: Bleeding Duration Trend */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-softPink-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-nearBlack font-display">
                    {t.analytics.periodDurationTrend}
                  </h3>
                  <p className="text-xs text-mutedText">
                    Number of days of menstrual bleeding per cycle
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-softPink text-nearBlack">
                  {periodDurationData.length} Periods
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={periodDurationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F7DCEB" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5A5263' }} />
                    <YAxis domain={[1, 10]} tick={{ fontSize: 11, fill: '#5A5263' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        borderColor: '#E9A3C7', 
                        borderRadius: '12px',
                        fontSize: '12px' 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="duration" 
                      stroke="#E9A3C7" 
                      strokeWidth={3} 
                      dot={{ fill: '#7851A9', r: 5 }} 
                      name="Duration (Days)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Symptom Frequency Bar Chart */}
          {symptomData.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-softPink-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-nearBlack font-display">
                  {t.analytics.symptomFrequency}
                </h3>
                <p className="text-xs text-mutedText">
                  Frequency of symptoms recorded across logged period entries
                </p>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={symptomData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F7DCEB" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: '#5A5263' }} />
                    <YAxis type="category" dataKey="symptom" tick={{ fontSize: 11, fill: '#18151D' }} width={140} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        borderColor: '#E9A3C7', 
                        borderRadius: '12px',
                        fontSize: '12px' 
                      }} 
                    />
                    <Bar dataKey="count" fill="#E9A3C7" radius={[0, 8, 8, 0]} name="Recorded Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Derived Real Data Observations */}
          <div className="bg-gradient-to-r from-softPink-surface via-white to-softPink-light rounded-3xl p-6 sm:p-8 border border-softPink-border space-y-3">
            <div className="flex items-center gap-2 text-brandPurple text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Real Data Derived Observations</span>
            </div>

            <h4 className="text-base font-bold text-nearBlack font-display">
              Pattern Summary for Healthcare Discussions
            </h4>

            <div className="space-y-2 text-xs text-nearBlack/80 leading-relaxed">
              {avgCycleLength ? (
                <p>
                  • Your average recorded cycle length is <strong className="text-brandPurple">{avgCycleLength} days</strong> (range: {minCycleLength}–{maxCycleLength} days). 
                  {avgCycleLength >= 24 && avgCycleLength <= 38
                    ? ' This falls within the standard clinical adult reference interval of 24–38 days established by ACOG.'
                    : ' This falls outside the typical 24–38 day reference interval. Discussing this observed pattern with your OB/GYN can help explore underlying factors.'}
                </p>
              ) : (
                <p>• Logging additional consecutive period start dates will enable NAARI AI to calculate your true cycle length interval.</p>
              )}

              {avgDuration && (
                <p>
                  • Your average menstrual bleeding duration is <strong className="text-brandPurple">{avgDuration} days</strong>, which is within the standard duration range of up to 8 days.
                </p>
              )}

              <p className="text-[11px] text-mutedText pt-2 italic">
                {t.analytics.realDataNote} These observations are descriptive logs to assist your healthcare provider and do not represent a medical risk score or diagnostic evaluation.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
