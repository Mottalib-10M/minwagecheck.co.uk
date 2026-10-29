/**
 * Minimum wage engine. Every rate, offset and threshold comes from `data/params-2026.json`; the rules
 * are those of the National Minimum Wage Regulations 2015 as HMRC explains them in "Calculating the
 * minimum wage" (pay reference period, reductions, accommodation offset, arrears formula, fair piece
 * rate). Dates are ISO strings (YYYY-MM-DD), read in UTC.
 */
import P from '../../data/params-2026.json';

export interface Band { min: number; rate: number }
export interface Period { from: string; to: string; label: string; nlwAge: number; bands: Band[]; apprentice: number; offsetDay: number; law: string; announced?: string; status?: string }
export const PERIODS: Period[] = P.periods as Period[];
export const R = P.rules;
export const E = P.enforcement;

const round2 = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;
export { round2 };

/** The rate period in force on a date (before April 2019: the April 2019 period, flagged by `before`). */
export function periodAt(iso: string): Period {
  let p = PERIODS[0];
  for (const x of PERIODS) if (x.from <= iso) p = x;
  return p;
}
/** Period starting in April of a year (2019 to 2027). */
export function periodOfYear(year: number): Period {
  const p = PERIODS.find((x) => x.from.startsWith(String(year)));
  if (!p) throw new Error(`No minimum wage period for ${year}`);
  return p;
}
export const latestPeriod = () => PERIODS[PERIODS.length - 1];
export const CURRENT = periodOfYear(2026);
export const NEXT = periodOfYear(2027);

/** Age band label of a period: "21 and over", "18 to 20", "16 to 17". */
export function bandLabel(p: Period, b: Band): string {
  const i = p.bands.indexOf(b);
  if (i === 0) return `${b.min} and over`;
  const upper = p.bands[i - 1].min - 1;
  return upper === b.min ? `${b.min}` : `${b.min} to ${upper}`;
}
export function bandFor(p: Period, age: number): Band | null {
  for (const b of p.bands) if (age >= b.min) return b;
  return null;
}

export interface RateQuery { date: string; age: number; apprentice?: boolean; firstYear?: boolean }
export interface RateResult { rate: number; label: string; kind: 'nlw' | 'nmw' | 'apprentice' | 'none'; period: Period; band: Band | null }
/**
 * Legal hourly minimum for a worker: apprentice rate when under 19, or 19 and over in the first year of
 * the apprenticeship; otherwise the rate of the age band; nothing below school leaving age (16).
 */
export function rateFor(q: RateQuery): RateResult {
  const p = periodAt(q.date);
  if (q.age < R.schoolAge) return { rate: 0, label: 'Under school leaving age', kind: 'none', period: p, band: null };
  const band = bandFor(p, q.age);
  const appr = !!q.apprentice && (q.age < R.apprenticeUnder || !!q.firstYear);
  if (appr) return { rate: p.apprentice, label: 'Apprentice rate', kind: 'apprentice', period: p, band };
  const b = band!;
  const isNlw = b.min === p.nlwAge;
  return { rate: b.rate, label: isNlw ? `National Living Wage (${b.min} and over)` : `National Minimum Wage (${bandLabel(p, b)})`, kind: isNlw ? 'nlw' : 'nmw', period: p, band: b };
}

/** Hourly rate → weekly, monthly and annual pay for a number of hours a week (52 weeks, 12 months). */
export function convert(rate: number, hoursWeek: number) {
  const weekly = round2(rate * hoursWeek);
  const annual = round2(rate * hoursWeek * 52);
  const monthly = round2(annual / 12);
  return { hourly: rate, weekly, monthly, annual };
}

export interface PayInput {
  date: string; age: number; apprentice?: boolean; firstYear?: boolean;
  /** Hours of working time in the pay reference period. */
  hours: number;
  /** Gross pay for the period, before tax, National Insurance and any deduction. */
  gross: number;
  /** Part of the gross that is an overtime or shift premium above the basic rate (excluded). */
  premium?: number;
  /** Tips, gratuities and service charges included in the gross (excluded). */
  tips?: number;
  /** Other sums that do not count: allowances not consolidated, expenses refunded, loans. */
  excluded?: number;
  /** Deductions or payments for the employer's purposes: uniform, tools, training, travel the employer requires. */
  deductions?: number;
  /** Salary given up under a salary sacrifice arrangement in the period, when the gross is the pay before the sacrifice. */
  sacrifice?: number;
  /** Days of accommodation provided by the employer in the period. */
  accomDays?: number;
  /** Charge per day for that accommodation, 0 when free. */
  accomCharge?: number;
}
export interface PayResult {
  rate: RateResult; required: number; nmwPay: number; hourly: number; shortfall: number; ok: boolean;
  offsetDay: number; accomEffect: number; reductions: number; exclusions: number;
}
/**
 * Pay check for one pay reference period: pay that counts for the minimum wage (gross, minus premiums,
 * tips, other excluded sums, deductions for the employer's purposes and salary sacrificed, with the
 * accommodation offset), divided by the hours, against the rate × hours.
 */
export function payCheck(x: PayInput): PayResult {
  const rate = rateFor(x);
  const hours = Math.max(0, x.hours);
  const offsetDay = rate.period.offsetDay;
  const days = Math.max(0, x.accomDays ?? 0);
  const charge = Math.max(0, x.accomCharge ?? 0);
  // Free accommodation adds the offset to pay; a charge above the offset reduces pay by the excess;
  // a charge at or under the offset has no effect (GOV.UK, accommodation and the minimum wage).
  const accomEffect = days === 0 ? 0 : charge === 0 ? round2(offsetDay * days) : charge > offsetDay ? -round2((charge - offsetDay) * days) : 0;
  const exclusions = (x.premium ?? 0) + (x.tips ?? 0) + (x.excluded ?? 0);
  const reductions = (x.deductions ?? 0) + (x.sacrifice ?? 0);
  const nmwPay = round2(Math.max(0, x.gross) - exclusions - reductions + accomEffect);
  const required = round2(rate.rate * hours);
  const hourly = hours > 0 ? Math.floor((nmwPay / hours) * 100 + 1e-9) / 100 : 0;
  const shortfall = round2(Math.max(0, required - nmwPay));
  return { rate, required, nmwPay, hourly, shortfall, ok: shortfall === 0, offsetDay, accomEffect, reductions, exclusions };
}

/** Arrears (HMRC formula): underpayment ÷ rate at the time × current rate of the same band, never less than the underpayment. */
export function arrears(underpayment: number, rateThen: number, rateNow: number): number {
  if (underpayment <= 0 || rateThen <= 0) return 0;
  return rateNow > rateThen ? round2((underpayment / rateThen) * rateNow) : round2(underpayment);
}
/** Notice of underpayment penalty: 200% of arrears, capped per worker, halved if paid within 14 days. */
export function penalty(arrearsPerWorker: number, workers = 1) {
  const per = Math.min(E.penaltyPct * Math.max(0, arrearsPerWorker), E.penaltyMaxPerWorker);
  const full = round2(per * Math.max(0, workers));
  return { full, early: round2(full * (1 - E.earlyPaymentReduction)), per: round2(per) };
}
/** Fair piece rate (regulation 43): minimum rate ÷ (mean hourly output ÷ 1.2), rounded up to the penny. */
export function fairPieceRate(rate: number, meanPerHour: number): number {
  if (meanPerHour <= 0) return 0;
  return Math.ceil(((rate * R.pieceUplift) / meanPerHour) * 100 - 1e-9) / 100;
}
/** Hourly pay of a salaried worker: annual salary ÷ basic annual hours. */
export const salariedHourly = (annual: number, annualHours: number) => (annualHours > 0 ? Math.floor((annual / annualHours) * 100 + 1e-9) / 100 : 0);

/* ---------- Dates ---------- */
const d = (iso: string) => new Date(`${iso}T00:00:00Z`);
const iso = (t: Date) => t.toISOString().slice(0, 10);
export function addDaysIso(s: string, n: number) { const t = d(s); t.setUTCDate(t.getUTCDate() + n); return iso(t); }
export function addMonthsIso(s: string, n: number) {
  const t = d(s); const day = t.getUTCDate(); t.setUTCDate(1); t.setUTCMonth(t.getUTCMonth() + n);
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  t.setUTCDate(Math.min(day, last)); return iso(t);
}
/** Age in whole years on a date. */
export function ageOn(dob: string, on: string): number {
  const a = d(dob), b = d(on);
  let n = b.getUTCFullYear() - a.getUTCFullYear();
  if (b.getUTCMonth() < a.getUTCMonth() || (b.getUTCMonth() === a.getUTCMonth() && b.getUTCDate() < a.getUTCDate())) n--;
  return n;
}
/** Birthday on which someone born on `dob` turns `age` (29 February → 1 March in other years). */
export function birthdayAt(dob: string, age: number): string {
  const a = d(dob); const y = a.getUTCFullYear() + age; const m = a.getUTCMonth(); const day = a.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return day > last ? iso(new Date(Date.UTC(y, m + 1, 1))) : iso(new Date(Date.UTC(y, m, day)));
}
export type Freq = 'weekly' | 'fortnightly' | 'fourweekly' | 'monthly';
export const FREQS: Array<{ value: Freq; label: string; days: number }> = [
  { value: 'weekly', label: 'Weekly', days: 7 }, { value: 'fortnightly', label: 'Every two weeks', days: 14 },
  { value: 'fourweekly', label: 'Every four weeks', days: 28 }, { value: 'monthly', label: 'Monthly', days: 0 },
];
/** First pay reference period starting on or after `date`, given the start of any one period. */
export function firstPeriodOnOrAfter(date: string, anchor: string, freq: Freq): string {
  if (freq === 'monthly') {
    let s = anchor; let guard = 0;
    while (s < date && guard++ < 2000) s = addMonthsIso(anchor, guard);
    guard = 0;
    while (guard++ < 2000) { const prev = addMonthsIso(s, -1); if (prev >= date) s = prev; else break; }
    return s;
  }
  const step = FREQS.find((f) => f.value === freq)!.days;
  const diff = Math.round((d(date).getTime() - d(anchor).getTime()) / 86400000);
  const k = Math.ceil(diff / step);
  return addDaysIso(anchor, k * step);
}
/** Days between two ISO dates (b − a). */
export const daysBetween = (a: string, b: string) => Math.round((d(b).getTime() - d(a).getTime()) / 86400000);

/** Next birthdays that change the legal rate (18 and 21 under the bands in force), with the rate on that day. */
export function ageSteps(dob: string, from: string) {
  const out: Array<{ age: number; date: string; rate: number; label: string }> = [];
  for (const age of [18, 21]) {
    const day = birthdayAt(dob, age);
    if (day < from) continue;
    const r = rateFor({ date: day, age });
    out.push({ age, date: day, rate: r.rate, label: r.label });
  }
  return out;
}
/** End of the first year of an apprenticeship that started on `start`. */
export const firstYearEnds = (start: string) => addDaysIso(addMonthsIso(start, R.apprenticeFirstYearMonths), -1);

/** Last Friday of June of a year. */
export function lastFridayOfJune(year: number): string {
  const t = new Date(Date.UTC(year, 5, 30));
  while (t.getUTCDay() !== 5) t.setUTCDate(t.getUTCDate() - 1);
  return iso(t);
}
export type Nation = 'england' | 'wales' | 'scotland' | 'ni';
/**
 * Earliest school leaving date for someone born on `dob` (GOV.UK, School leaving age): from then they
 * are over compulsory school age and the minimum wage applies (16 to 17 rate). `date` is null when the
 * rule names no fixed day (Scotland, winter birthdays: start of the Christmas holidays); `after` = the
 * pupil may leave after that day rather than on it.
 */
export function schoolLeaving(dob: string, nation: Nation): { date: string | null; after: boolean; year: number } {
  const b16 = birthdayAt(dob, 16); const y = Number(b16.slice(0, 4)); const md = b16.slice(5);
  if (nation === 'england' || nation === 'wales') {
    // 16 by the end of the summer holidays: the school year runs 1 September to 31 August.
    const yearEnd = md >= '09-01' ? y + 1 : y;
    return { date: lastFridayOfJune(yearEnd), after: false, year: yearEnd };
  }
  if (nation === 'scotland') {
    if (md >= '03-01' && md <= '09-30') return { date: `${y}-05-31`, after: true, year: y };
    const xmasYear = md >= '10-01' ? y : y - 1;
    return { date: null, after: false, year: xmasYear };
  }
  // Northern Ireland: 16 between 1 September and 1 July → after 30 June; 2 July to 31 August → 30 June of the next year.
  if (md >= '07-02' && md <= '08-31') return { date: `${y + 1}-06-30`, after: true, year: y + 1 };
  const yy = md >= '09-01' ? y + 1 : y;
  return { date: `${yy}-06-30`, after: true, year: yy };
}

/* ---------- Tax and National Insurance (estimate, standard tax code, no other income) ---------- */
type TaxYear = typeof P.tax['2026'];
export interface NetResult { tax: number; ni: number; net: number; yearLabel: string; scotlandBandsFrom?: string }
export function netPay(annual: number, year: '2026' | '2027' = '2026', scotland = false): NetResult {
  const T = P.tax[year] as unknown as TaxYear;
  const bands = scotland ? (T.scotland ?? (P.tax['2026'].scotland)) : T.ruk;
  const scotlandBandsFrom = scotland && !T.scotland ? P.tax['2026'].label : undefined;
  const pa = Math.max(0, T.personalAllowance - Math.max(0, annual - T.taperFrom) / 2);
  const taxable = Math.max(0, annual - pa); let prev = 0; let tax = 0;
  for (const b of bands as Array<{ upTo: number | null; rate: number }>) {
    const top = b.upTo === null ? Infinity : b.upTo;
    const slice = Math.max(0, Math.min(taxable, top) - prev);
    tax += slice * b.rate; prev = top; if (taxable <= top) break;
  }
  const ni = Math.max(0, Math.min(annual, T.niUpper) - T.niPrimary) * T.niMain + Math.max(0, annual - T.niUpper) * T.niAbove;
  return { tax: round2(tax), ni: round2(ni), net: round2(annual - tax - ni), yearLabel: T.label, scotlandBandsFrom };
}
/** Employer Class 1 National Insurance on an annual pay (0% up to the upper threshold for under 21s and apprentices under 25). */
export function employerNi(annual: number, year: '2026' | '2027' = '2026', relief = false): number {
  const T = P.tax[year];
  const above = Math.max(0, annual - T.niSecondary);
  if (!relief) return round2(above * T.niEmployer);
  return round2(Math.max(0, annual - Math.max(T.niSecondary, T.niUnder21Upper)) * T.niEmployer);
}
