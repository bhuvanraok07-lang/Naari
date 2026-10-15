import { CycleEntry, PcosAssessmentData, DoctorVisitBrief, UserCycleProfile } from '../types';

const STORAGE_KEYS = {
  CYCLE_ENTRIES: 'naari_cycle_entries',
  PCOS_ASSESSMENTS: 'naari_pcos_assessments',
  HEALTH_REPORTS: 'naari_health_reports',
  USER_CONSENT: 'naari_user_consent',
  CYCLE_PROFILE: 'naari_cycle_profile',
};

// Calculate difference in whole days between two YYYY-MM-DD strings
export function calculateDaysBetween(startDateStr: string, endDateStr: string): number {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffTime = end.getTime() - start.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Re-calculate cycle lengths across all entries sorted chronologically
export function recalculateCycleEntries(entries: CycleEntry[]): CycleEntry[] {
  const sorted = [...entries].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  return sorted.map((entry, index) => {
    let cycleLengthFromPrevious: number | null = null;
    if (index > 0) {
      const prev = sorted[index - 1];
      const days = calculateDaysBetween(prev.startDate, entry.startDate);
      if (days > 0) {
        cycleLengthFromPrevious = days;
      }
    }
    return {
      ...entry,
      cycleLengthFromPrevious,
    };
  });
}

export const StorageService = {
  getCycleProfile(): UserCycleProfile {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CYCLE_PROFILE);
      if (!raw) return { lifeStage: 'unspecified', yearsSinceMenarche: null };
      return JSON.parse(raw);
    } catch {
      return { lifeStage: 'unspecified', yearsSinceMenarche: null };
    }
  },

  saveCycleProfile(profile: UserCycleProfile): void {
    localStorage.setItem(STORAGE_KEYS.CYCLE_PROFILE, JSON.stringify(profile));
  },

  getCycleEntries(): CycleEntry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CYCLE_ENTRIES);
      if (!raw) return [];
      const parsed: CycleEntry[] = JSON.parse(raw);
      return recalculateCycleEntries(parsed);
    } catch {
      return [];
    }
  },

  saveCycleEntry(entry: Omit<CycleEntry, 'id' | 'createdAt'> & { id?: string }): CycleEntry {
    const existing = this.getCycleEntries();
    const id = entry.id || `cycle_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();
    
    // Duration calculation: startDate to endDate inclusive (at least 1 day)
    const rawDiff = calculateDaysBetween(entry.startDate, entry.endDate);
    const durationDays = rawDiff >= 0 ? rawDiff + 1 : 1;

    const newOrUpdatedEntry: CycleEntry = {
      ...entry,
      id,
      durationDays,
      createdAt,
    };

    const filtered = existing.filter(e => e.id !== id);
    const updated = recalculateCycleEntries([...filtered, newOrUpdatedEntry]);
    localStorage.setItem(STORAGE_KEYS.CYCLE_ENTRIES, JSON.stringify(updated));
    return newOrUpdatedEntry;
  },

  deleteCycleEntry(id: string): void {
    const existing = this.getCycleEntries();
    const filtered = existing.filter(e => e.id !== id);
    const updated = recalculateCycleEntries(filtered);
    localStorage.setItem(STORAGE_KEYS.CYCLE_ENTRIES, JSON.stringify(updated));
  },

  getPcosAssessments(): PcosAssessmentData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PCOS_ASSESSMENTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  savePcosAssessment(data: PcosAssessmentData): void {
    const existing = this.getPcosAssessments();
    const updated = [data, ...existing.filter(item => item.id !== data.id)];
    localStorage.setItem(STORAGE_KEYS.PCOS_ASSESSMENTS, JSON.stringify(updated));
  },

  getHealthReports(): DoctorVisitBrief[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HEALTH_REPORTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveHealthReport(report: DoctorVisitBrief): void {
    const existing = this.getHealthReports();
    const updated = [report, ...existing.filter(r => r.reportId !== report.reportId)];
    localStorage.setItem(STORAGE_KEYS.HEALTH_REPORTS, JSON.stringify(updated));
  },

  getUserConsent(): boolean {
    return localStorage.getItem(STORAGE_KEYS.USER_CONSENT) === 'true';
  },

  setUserConsent(consent: boolean): void {
    localStorage.setItem(STORAGE_KEYS.USER_CONSENT, consent ? 'true' : 'false');
  },

  clearAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.CYCLE_ENTRIES);
    localStorage.removeItem(STORAGE_KEYS.PCOS_ASSESSMENTS);
    localStorage.removeItem(STORAGE_KEYS.HEALTH_REPORTS);
    localStorage.removeItem(STORAGE_KEYS.CYCLE_PROFILE);
  },

  // Pre-seed sample historical data for testing/demo
  seedSampleCycleData(): CycleEntry[] {
    const sampleEntries: CycleEntry[] = [
      {
        id: 'sample_c1',
        startDate: '2026-07-02',
        endDate: '2026-07-06',
        durationDays: 5,
        flowCategory: 'moderate',
        symptoms: ['Cramps / Dysmenorrhea', 'Lower Back Ache'],
        notes: 'Mild fatigue on Day 1',
        cycleLengthFromPrevious: null,
        createdAt: '2026-07-02T08:00:00Z',
      },
      {
        id: 'sample_c2',
        startDate: '2026-07-31',
        endDate: '2026-08-04',
        durationDays: 5,
        flowCategory: 'heavy',
        symptoms: ['Cramps / Dysmenorrhea', 'Bloating', 'Mood Changes'],
        notes: 'Cramping relieved by warm pack',
        cycleLengthFromPrevious: 29,
        createdAt: '2026-07-31T09:00:00Z',
      },
      {
        id: 'sample_c3',
        startDate: '2026-08-30',
        endDate: '2026-09-03',
        durationDays: 5,
        flowCategory: 'moderate',
        symptoms: ['Headache', 'Fatigue'],
        notes: 'Normal flow, good recovery',
        cycleLengthFromPrevious: 30,
        createdAt: '2026-08-30T10:00:00Z',
      },
      {
        id: 'sample_c4',
        startDate: '2026-09-29',
        endDate: '2026-10-04',
        durationDays: 6,
        flowCategory: 'heavy',
        symptoms: ['Cramps / Dysmenorrhea', 'Skin Breakouts', 'Fatigue'],
        notes: 'Noticeable acne flare up on jawline',
        cycleLengthFromPrevious: 30,
        createdAt: '2026-09-29T08:30:00Z',
      },
    ];

    const recalculation = recalculateCycleEntries(sampleEntries);
    localStorage.setItem(STORAGE_KEYS.CYCLE_ENTRIES, JSON.stringify(recalculation));
    
    // Also save profile
    this.saveCycleProfile({ lifeStage: 'young_adult', yearsSinceMenarche: 8 });

    return recalculation;
  }
};
