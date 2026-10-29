/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/wage.ts`) and params-2026.json, never a second formula. Date inputs hold day numbers
 * (days since 1970-01-01, UTC); defaults are fixed example dates, never today (§17.5).
 */
import type { MiniSpec, MiniInput } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL, dateL, pct } from './format-l';
import { dayNum, isoOf } from './engine/dates';
import {
  rateFor, payCheck, convert, arrears, penalty, fairPieceRate, salariedHourly, netPay, employerNi, periodOfYear, ageSteps,
  firstPeriodOnOrAfter, firstYearEnds, schoolLeaving, birthdayAt, ageOn, round2, PERIODS, CURRENT, NEXT, FREQS, type Nation,
} from './engine/wage';

const n0 = (v: number) => formatNumberL(v);
const n1 = (v: number) => formatNumberL(v, 'en', Number.isInteger(v) ? 0 : 1);
const gbp2 = (v: number) => `£${formatNumberL(v, 'en', 2)}`;
const pc1 = (x: number) => pct(x, 'en', 1);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const NOW = CURRENT.from; // 1 April 2026
const NXT = NEXT.from; // 1 April 2027
const D = (n: number) => dateL(isoOf(n));
const ageIn = (def = 25): MiniInput => ({ id: 'age', label: 'Age', def, unit: 'years', max: 99 });
const APPR = [{ value: '0', label: 'Not an apprentice' }, { value: '1', label: 'Apprentice, first year' }, { value: '2', label: 'Apprentice, after the first year' }];
const apprIn = (def = 0): MiniInput => ({ id: 'appr', label: 'Apprenticeship', def, options: APPR });
const YEARS = PERIODS.map((p, i) => ({ value: String(i), label: p.label }));
const yearIn = (def = 2026, label = 'Rates of'): MiniInput => ({ id: 'yr', label, def: PERIODS.findIndex((p) => p.from.startsWith(String(def))), options: YEARS });
const periodAtIndex = (i: number | undefined) => PERIODS[clamp(i ?? 0, 0, PERIODS.length - 1)];
const hoursIn = (def = 37.5, label = 'Hours a week'): MiniInput => ({ id: 'h', label, def, unit: 'h', max: 100, decimals: 1 });
const rateOf = (date: string, v: Record<string, number>) => rateFor({ date, age: v.age ?? 25, apprentice: (v.appr ?? 0) > 0, firstYear: (v.appr ?? 0) === 1 });
const verdict = (short: number) => (short > 0 ? `${money(short)} short` : 'At or above the minimum');
const NATIONS = [{ value: '0', label: 'England' }, { value: '1', label: 'Wales' }, { value: '2', label: 'Scotland' }, { value: '3', label: 'Northern Ireland' }];
const NATION_IDS: Nation[] = ['england', 'wales', 'scotland', 'ni'];
const EX_DOB = dayNum('2008-11-15');

const SPECS: Record<string, () => MiniSpec> = {
  /** Hourly minimum → weekly, monthly and annual pay. */
  convert: () => ({
    title: 'Minimum wage per week, month and year', cta: 'Check a payslip', ctaPage: 'home',
    inputs: [yearIn(), ageIn(), apprIn(), hoursIn()],
    run: (v) => {
      const p = periodAtIndex(v.yr); const r = rateOf(p.from, v); const c = convert(r.rate, v.h ?? 0);
      return { head: ['Legal minimum per hour', gbp2(r.rate)], rows: [['Rate that applies', r.label], ['Per week', money(c.weekly)], ['Per month', money(c.monthly)], ['Per year (52 weeks)', money(c.annual)]], note: p.status === 'announced' ? 'April 2027 rates announced by the government on 28 October 2026.' : undefined };
    },
  }),
  /** What changes on 1 April 2027. */
  april2027: () => ({
    title: 'Your rise on 1 April 2027', cta: 'All April 2027 rates', ctaPage: 'minimum-wage-april-2027',
    inputs: [ageIn(22), apprIn(), hoursIn(30)],
    run: (v) => {
      const a = rateOf(NOW, v); const age2 = (v.age ?? 0); const b = rateFor({ date: NXT, age: age2, apprentice: (v.appr ?? 0) > 0, firstYear: (v.appr ?? 0) === 1 });
      const h = v.h ?? 0; const wk = round2((b.rate - a.rate) * h);
      return { head: ['More per week from 1 April 2027', money(wk)], rows: [['Today', `${gbp2(a.rate)} an hour`], ['From 1 April 2027', `${gbp2(b.rate)} an hour`], ['Rise', a.rate ? pc1(b.rate / a.rate - 1) : '-'], ['More per year', money(round2(wk * 52))]], note: 'Same age and apprenticeship on both dates. A birthday before April moves you into the next band sooner.' };
    },
  }),
  /** Birthday → new rate from the next pay period. */
  birthday: () => ({
    title: 'When a birthday raises your minimum', cta: 'Rates by age', ctaPage: 'birthday-pay-rise',
    inputs: [{ id: 'dob', label: 'Date of birth', def: EX_DOB, date: true }, { id: 'f', label: 'Paid', def: 0, options: FREQS.map((f, i) => ({ value: String(i), label: f.label })) }, { id: 'p', label: 'Start of one pay period', def: dayNum('2026-10-05'), date: true }],
    run: (v) => {
      const dob = isoOf(v.dob ?? EX_DOB); const steps = ageSteps(dob, isoOf(v.p ?? 0));
      const f = FREQS[clamp(v.f ?? 0, 0, 3)].value; const anchor = isoOf(v.p ?? 0);
      if (!steps.length) return { head: ['Next change by age', 'none'], rows: [['Age today', n0(ageOn(dob, anchor))], ['Rate on that date', gbp2(rateFor({ date: anchor, age: ageOn(dob, anchor) }).rate)]], note: 'At 21 and over the National Living Wage applies: only the yearly April rise changes it.' };
      const s = steps[0]; const start = firstPeriodOnOrAfter(s.date, anchor, f);
      return { head: [`Higher rate from (age ${s.age})`, dateL(start)], rows: [[`Turns ${s.age} on`, dateL(s.date)], ['Rate from that pay period', gbp2(rateFor({ date: start, age: s.age }).rate)], ...(steps[1] ? [[`Turns ${steps[1].age} on`, dateL(steps[1].date)] as [string, string]] : [])], note: 'The new band starts with the first pay reference period that begins on or after the birthday.' };
    },
  }),
  /** Apprentice: first year, then the rate for the age. */
  apprentice: () => ({
    title: 'Apprentice minimum: first year and after', cta: 'Apprentice pay explained', ctaPage: 'apprentice-minimum-wage',
    inputs: [ageIn(19), { id: 's', label: 'Apprenticeship started', def: dayNum('2026-09-01'), date: true }, hoursIn(30)],
    run: (v) => {
      const start = isoOf(v.s ?? 0); const end = firstYearEnds(start); const after = isoOf(dayNum(end) + 1);
      const age = v.age ?? 0; const now = rateFor({ date: start, age, apprentice: true, firstYear: true });
      const later = rateFor({ date: after, age: age + (age < 19 ? 0 : 1), apprentice: true, firstYear: false });
      const h = v.h ?? 0;
      return { head: ['Minimum at the start', gbp2(now.rate)], rows: [['First year ends', dateL(end)], [`From ${dateL(after)}`, `${gbp2(later.rate)} (${later.label})`], ['Weekly pay at the start', money(round2(now.rate * h))], ['Weekly pay after year one', money(round2(later.rate * h))]], note: 'After year one, an apprentice aged 19 or over moves to the rate for their age; under 19 stays on the apprentice rate. Age a year on is assumed one year older.' };
    },
  }),
  /** Accommodation offset. */
  offset: () => ({
    title: 'Accommodation offset against your pay', cta: 'Accommodation and the minimum wage', ctaPage: 'accommodation-offset',
    inputs: [ageIn(30), { id: 'r', label: 'Hourly pay', def: 12.9, unit: '£', max: 100, decimals: 2 }, hoursIn(40, 'Hours in the week'), { id: 'n', label: 'Nights provided in the week', def: 7, max: 7 }, { id: 'c', label: 'Charge per night (0 = free)', def: 15, unit: '£', max: 200, decimals: 2 }],
    run: (v) => {
      const h = v.h ?? 0; const r = payCheck({ date: NOW, age: v.age ?? 25, hours: h, gross: round2((v.r ?? 0) * h), accomDays: v.n ?? 0, accomCharge: v.c ?? 0 });
      return { head: ['Pay that counts per hour', gbp2(r.hourly)], rows: [['Offset per day', gbp2(r.offsetDay)], ['Effect of the room', r.accomEffect === 0 ? 'none' : `${r.accomEffect > 0 ? '+' : '−'}${money(Math.abs(r.accomEffect))}`], ['Minimum for your age', gbp2(r.rate.rate)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** Uniform or equipment deduction. */
  uniform: () => ({
    title: 'Uniform deduction against the minimum wage', cta: 'Check a whole payslip', ctaPage: 'home',
    inputs: [ageIn(24), { id: 'r', label: 'Hourly pay', def: 12.9, unit: '£', max: 100, decimals: 2 }, hoursIn(35, 'Hours in the pay period'), { id: 'u', label: 'Uniform or kit deducted or paid', def: 25, unit: '£', max: 2000, decimals: 2 }],
    run: (v) => {
      const h = v.h ?? 0; const r = payCheck({ date: NOW, age: v.age ?? 25, hours: h, gross: round2((v.r ?? 0) * h), deductions: v.u ?? 0 });
      return { head: ['Pay per hour after the deduction', gbp2(r.hourly)], rows: [['Minimum for your age', gbp2(r.rate.rate)], ['Room before you fall under', money(Math.max(0, round2(r.nmwPay + (v.u ?? 0) - r.required)))], ['Result', verdict(r.shortfall)]], note: 'A charge for a uniform the job requires counts against minimum wage pay, whether deducted or paid by you.' };
    },
  }),
  /** Overtime and shift premiums. */
  premium: () => ({
    title: 'Premium pay left out of the check', cta: 'Check a whole payslip', ctaPage: 'home',
    inputs: [ageIn(30), { id: 'b', label: 'Basic hourly rate', def: 12.5, unit: '£', max: 100, decimals: 2 }, hoursIn(30, 'Basic hours'), { id: 'o', label: 'Overtime hours', def: 10, unit: 'h', max: 100, decimals: 1 }, { id: 'x', label: 'Overtime rate per hour', def: 18.75, unit: '£', max: 200, decimals: 2 }],
    run: (v) => {
      const b = v.b ?? 0, h = v.h ?? 0, o = v.o ?? 0, x = v.x ?? 0;
      const gross = round2(b * h + x * o); const prem = round2(Math.max(0, x - b) * o);
      const r = payCheck({ date: NOW, age: v.age ?? 25, hours: h + o, gross, premium: prem });
      return { head: ['Pay per hour that counts', gbp2(r.hourly)], rows: [['Gross for the period', money(gross)], ['Premium left out', money(prem)], ['Minimum for your age', gbp2(r.rate.rate)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** Tips and service charges. */
  tips: () => ({
    title: 'Tips do not count towards the minimum', cta: 'Check a whole payslip', ctaPage: 'home',
    inputs: [ageIn(19), { id: 'r', label: 'Hourly pay before tips', def: 10.5, unit: '£', max: 100, decimals: 2 }, hoursIn(25, 'Hours in the week'), { id: 't', label: 'Tips paid through payroll', def: 60, unit: '£', max: 5000, decimals: 2 }],
    run: (v) => {
      const h = v.h ?? 0; const base = round2((v.r ?? 0) * h);
      const r = payCheck({ date: NOW, age: v.age ?? 25, hours: h, gross: base + (v.t ?? 0), tips: v.t ?? 0 });
      return { head: ['Pay per hour that counts', gbp2(r.hourly)], rows: [['Minimum for your age', gbp2(r.rate.rate)], ['Tips (kept, but not counted)', money(v.t ?? 0)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** Salary sacrifice. */
  sacrifice: () => ({
    title: 'Salary sacrifice and the minimum wage', cta: 'Check a whole payslip', ctaPage: 'home',
    inputs: [ageIn(30), { id: 'r', label: 'Hourly pay before the sacrifice', def: 13, unit: '£', max: 100, decimals: 2 }, hoursIn(37.5), { id: 's', label: 'Sacrificed each month', def: 60, unit: '£', max: 5000, decimals: 2 }],
    run: (v) => {
      const hm = round2((v.h ?? 0) * 52 / 12); const gross = round2((v.r ?? 0) * hm);
      const r = payCheck({ date: NOW, age: v.age ?? 25, hours: hm, gross, sacrifice: v.s ?? 0 });
      const most = Math.max(0, round2(gross - r.required));
      return { head: ['Pay per hour after the sacrifice', gbp2(r.hourly)], rows: [['Hours in an average month', n1(hm)], ['Largest sacrifice that stays legal', money(most)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** Net pay at the minimum wage. */
  net: () => ({
    title: 'Take-home pay at the minimum wage', cta: 'Weekly, monthly and yearly pay', ctaPage: 'minimum-wage-annual-salary',
    inputs: [yearIn(2026, 'Year'), ageIn(25), hoursIn(37.5), { id: 'n', label: 'Where you pay tax', def: 0, options: [{ value: '0', label: 'England, Wales or Northern Ireland' }, { value: '1', label: 'Scotland' }] }],
    run: (v) => {
      const p = periodAtIndex(v.yr); const yr = p.from >= NXT ? '2027' : '2026'; const r = rateOf(p.from, v);
      const c = convert(r.rate, v.h ?? 0); const t = netPay(c.annual, yr, (v.n ?? 0) === 1);
      return { head: ['Take-home per month', money(round2(t.net / 12))], rows: [['Gross per year', money(c.annual)], ['Income Tax', money(t.tax)], ['National Insurance', money(t.ni)], ['Take-home per week', money(round2(t.net / 52))]], note: `Tax year ${t.yearLabel}, tax code 1257L, no pension, student loan or other income.${t.scotlandBandsFrom ? ' Scottish bands for 2027 to 2028 not yet published: 2026 to 2027 bands used.' : ''}${p.from < NOW ? ' Older years use 2026 to 2027 tax rules.' : ''}` };
    },
  }),
  /** Cost to the employer. */
  employer: () => ({
    title: 'What a minimum wage worker costs', cta: 'Employer cost explained', ctaPage: 'employer-cost-minimum-wage',
    inputs: [ageIn(25), apprIn(), hoursIn(30)],
    run: (v) => {
      const r = rateOf(NOW, v); const c = convert(r.rate, v.h ?? 0);
      const relief = (v.age ?? 0) < 21 || ((v.appr ?? 0) > 0 && (v.age ?? 0) < 25);
      const ni = employerNi(c.annual, '2026', relief);
      return { head: ['Cost per year before pension', money(round2(c.annual + ni))], rows: [['Wages', money(c.annual)], ['Employer National Insurance', money(ni)], ['Cost per paid hour', gbp2(round2((c.annual + ni) / Math.max(1, (v.h ?? 0) * 52)))]], note: relief ? 'Under 21, or apprentice under 25: employer rate 0% up to £50,270 a year.' : 'Employer rate 15% above £5,000 a year (2026 to 2027). Employment Allowance and pension not included.' };
    },
  }),
  /** Arrears at today's rate. */
  arrears: () => ({
    title: 'Back pay owed for an underpayment', cta: 'How arrears are worked out', ctaPage: 'minimum-wage-arrears',
    inputs: [{ id: 'u', label: 'Amount underpaid', def: 80.4, unit: '£', max: 100000, decimals: 2 }, yearIn(2024, 'Underpaid during'), ageIn(45)],
    run: (v) => {
      const p = periodAtIndex(v.yr); const then = rateFor({ date: p.from, age: v.age ?? 25 });
      const bandAge = v.age ?? 25; const now = rateFor({ date: NOW, age: bandAge }); const nxt = rateFor({ date: NXT, age: bandAge });
      return { head: ['Owed if repaid now', money(arrears(v.u ?? 0, then.rate, now.rate))], rows: [['Rate at the time', gbp2(then.rate)], ['Rate today for that band', gbp2(now.rate)], ['Owed if repaid from 1 April 2027', money(arrears(v.u ?? 0, then.rate, nxt.rate))]], note: 'Underpayment ÷ rate at the time × current rate of the band you were in. Enter the age you were then.' };
    },
  }),
  /** Penalty for the employer. */
  penalty: () => ({
    title: 'Penalty on a notice of underpayment', cta: 'Employer penalties', ctaPage: 'employer-penalties',
    inputs: [{ id: 'a', label: 'Arrears per worker', def: 1200, unit: '£', max: 100000, decimals: 2 }, { id: 'w', label: 'Workers underpaid', def: 3, max: 10000 }],
    run: (v) => {
      const p = penalty(v.a ?? 0, v.w ?? 0);
      return { head: ['Penalty, up to', money(p.full)], rows: [['Per worker (200%, capped)', money(p.per)], ['If paid within 14 days', money(p.early)], ['Arrears to the workers too', money(round2((v.a ?? 0) * (v.w ?? 0)))]] };
    },
  }),
  /** Rate in a past year against today. */
  history: () => ({
    title: 'Minimum wage then and now', cta: 'Every rate since 2019', ctaPage: 'minimum-wage-history',
    inputs: [yearIn(2019, 'Year'), ageIn(25)],
    run: (v) => {
      const p = periodAtIndex(v.yr); const a = rateFor({ date: p.from, age: v.age ?? 25 }); const b = rateFor({ date: NOW, age: v.age ?? 25 }); const c = rateFor({ date: NXT, age: v.age ?? 25 });
      return { head: [`Rate in ${p.label}`, gbp2(a.rate)], rows: [['Band then', a.label], ['Rate in April 2026', gbp2(b.rate)], ['Rate from April 2027', gbp2(c.rate)], ['Rise to April 2027', a.rate ? pc1(c.rate / a.rate - 1) : '-']] };
    },
  }),
  /** Real Living Wage against the National Living Wage. */
  rlw: () => ({
    title: 'Real Living Wage against the legal minimum', cta: 'Real Living Wage explained', ctaPage: 'real-living-wage',
    inputs: [hoursIn(37.5), { id: 'l', label: 'Where you work', def: 0, options: [{ value: '0', label: 'Outside London' }, { value: '1', label: 'London' }] }],
    run: (v) => {
      const h = v.h ?? 0; const rl = (v.l ?? 0) === 1 ? P.rlw['2026'].london : P.rlw['2026'].uk; const nlw = NEXT.bands[0].rate;
      return { head: ['Real Living Wage per year', money(round2(rl * h * 52))], rows: [['Real Living Wage per hour', gbp2(rl)], ['National Living Wage from April 2027', gbp2(nlw)], ['Difference per year', money(round2((rl - nlw) * h * 52))]], note: 'The real Living Wage is voluntary; the National Living Wage is the legal minimum for workers aged 21 and over.' };
    },
  }),
  /** Salaried hours. */
  salaried: () => ({
    title: 'Salary against the minimum per hour', cta: 'Salaried workers', ctaPage: 'salaried-hours-minimum-wage',
    inputs: [ageIn(28), { id: 's', label: 'Annual salary', def: 24000, unit: '£', max: 500000 }, hoursIn(40, 'Basic hours a week')],
    run: (v) => {
      const hours = round2((v.h ?? 0) * 52); const hr = salariedHourly(v.s ?? 0, hours); const r = rateFor({ date: NOW, age: v.age ?? 25 }); const r2 = rateFor({ date: NXT, age: v.age ?? 25 });
      return { head: ['Your pay per hour', gbp2(hr)], rows: [['Basic hours a year', n0(hours)], ['Minimum today', gbp2(r.rate)], ['Salary needed today', money(round2(r.rate * hours))], ['Salary needed from April 2027', money(round2(r2.rate * hours))]] };
    },
  }),
  /** Fair piece rate. */
  piece: () => ({
    title: 'Fair piece rate for output work', cta: 'Piece work explained', ctaPage: 'piece-work-minimum-wage',
    inputs: [ageIn(30), { id: 'm', label: 'Average items per hour (all workers)', def: 10, max: 10000, decimals: 1 }, { id: 'p', label: 'Rate paid per item', def: 1.4, unit: '£', max: 1000, decimals: 2 }],
    run: (v) => {
      const r = rateFor({ date: NOW, age: v.age ?? 25 }); const fp = fairPieceRate(r.rate, v.m ?? 0); const fp2 = fairPieceRate(rateFor({ date: NXT, age: v.age ?? 25 }).rate, v.m ?? 0);
      return { head: ['Fair piece rate, at least', gbp2(fp)], rows: [['Minimum per hour', gbp2(r.rate)], ['Items per assessed hour', n1(round2((v.m ?? 0) / P.rules.pieceUplift))], ['Your rate', (v.p ?? 0) >= fp ? 'enough' : `${gbp2(round2(fp - (v.p ?? 0)))} too low per item`], ['From 1 April 2027', gbp2(fp2)]] };
    },
  }),
  /** Unpaid working time. */
  worktime: () => ({
    title: 'Unpaid working time and your hourly pay', cta: 'Which hours count', ctaPage: 'training-travel-waiting-time',
    inputs: [ageIn(30), { id: 'g', label: 'Pay for the week', def: 500, unit: '£', max: 10000, decimals: 2 }, hoursIn(38, 'Paid hours'), { id: 'x', label: 'Unpaid training, travel or waiting', def: 3, unit: 'h', max: 100, decimals: 1 }],
    run: (v) => {
      const r = payCheck({ date: NOW, age: v.age ?? 25, hours: (v.h ?? 0) + (v.x ?? 0), gross: v.g ?? 0 });
      return { head: ['Real pay per hour worked', gbp2(r.hourly)], rows: [['Hours that count', n1((v.h ?? 0) + (v.x ?? 0))], ['Minimum for your age', gbp2(r.rate.rate)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** Unpaid trial shift. */
  trial: () => ({
    title: 'What an unpaid trial shift is worth', cta: 'Trial shifts and the law', ctaPage: 'unpaid-trial-shifts',
    inputs: [ageIn(19), { id: 't', label: 'Hours of trial work', def: 6, unit: 'h', max: 200, decimals: 1 }],
    run: (v) => {
      const r = rateFor({ date: NOW, age: v.age ?? 25 });
      return { head: ['Minimum due for the trial', money(round2(r.rate * (v.t ?? 0)))], rows: [['Rate', `${gbp2(r.rate)} (${r.label})`], ['From 1 April 2027', money(round2(rateFor({ date: NXT, age: v.age ?? 25 }).rate * (v.t ?? 0)))]], note: 'Due when the trial goes beyond a genuine short test of skills and you do real work for the business.' };
    },
  }),
  /** Pay reference period. */
  prp: () => ({
    title: 'Minimum pay for one pay period', cta: 'Check a whole payslip', ctaPage: 'home',
    inputs: [ageIn(25), { id: 'f', label: 'Paid', def: 3, options: FREQS.map((f, i) => ({ value: String(i), label: f.label })) }, { id: 'h', label: 'Hours worked in the period', def: 160, unit: 'h', max: 400, decimals: 1 }, { id: 'g', label: 'Gross pay for the period', def: 2000, unit: '£', max: 50000, decimals: 2 }],
    run: (v) => {
      const r = payCheck({ date: NOW, age: v.age ?? 25, hours: v.h ?? 0, gross: v.g ?? 0 });
      const maxH = r.rate.rate ? Math.floor(((v.g ?? 0) / r.rate.rate) * 10) / 10 : 0;
      return { head: ['Minimum for this period', money(r.required)], rows: [['Pay period', FREQS[clamp(v.f ?? 0, 0, 3)].label], ['Hours this pay covers at the minimum', n1(maxH)], ['Result', verdict(r.shortfall)]] };
    },
  }),
  /** School leaving date. */
  school: () => ({
    title: 'From when the minimum wage applies', cta: 'Under 16s and the minimum wage', ctaPage: 'minimum-wage-under-16',
    inputs: [{ id: 'dob', label: 'Date of birth', def: dayNum('2011-05-10'), date: true }, { id: 'n', label: 'Where you go to school', def: 0, options: NATIONS }],
    run: (v) => {
      const dob = isoOf(v.dob ?? 0); const nat = NATION_IDS[clamp(v.n ?? 0, 0, 3)]; const s = schoolLeaving(dob, nat);
      const day = s.date ? `${s.after ? 'after ' : ''}${dateL(s.date)}` : `start of Christmas holidays ${s.year}`;
      const at = s.date ?? `${s.year}-12-31`;
      return { head: ['Can leave school', day], rows: [['Turns 16 on', dateL(birthdayAt(dob, 16))], ['Minimum wage then', `${gbp2(rateFor({ date: at, age: 16 }).rate)} an hour`], ['Turns 18 on', dateL(birthdayAt(dob, 18))]], note: 'Below school leaving age there is no minimum wage; above it the 16 to 17 rate applies.' };
    },
  }),
  /** Sleep-in shift. */
  sleepin: () => ({
    title: 'Sleep-in shift: hours that must be paid', cta: 'Sleep-ins and on-call time', ctaPage: 'sleep-in-and-on-call',
    inputs: [ageIn(35), { id: 'a', label: 'Hours awake to work during the night', def: 1.5, unit: 'h', max: 24, decimals: 1 }, { id: 'p', label: 'Flat payment for the sleep-in', def: 50, unit: '£', max: 2000, decimals: 2 }],
    run: (v) => {
      const r = rateFor({ date: NOW, age: v.age ?? 25 }); const due = round2(r.rate * (v.a ?? 0));
      return { head: ['Minimum for the awake hours', money(due)], rows: [['Rate', gbp2(r.rate)], ['Flat payment', money(v.p ?? 0)], ['Result', (v.p ?? 0) >= due ? 'covers the awake hours' : `${money(round2(due - (v.p ?? 0)))} short`]], note: 'Time asleep with a suitable place to sleep does not count; time awake for the purpose of working does.' };
    },
  }),
  /** Young workers' week. */
  young: () => ({
    title: 'Pay and hours for a 16 or 17 year old', cta: 'Minimum wage at 16 and 17', ctaPage: 'minimum-wage-16-year-old',
    inputs: [hoursIn(20, 'Hours a week'), apprIn()],
    run: (v) => {
      const h = Math.min(v.h ?? 0, 100); const a = rateOf(NOW, { age: 17, appr: v.appr ?? 0 }); const b = rateOf(NXT, { age: 17, appr: v.appr ?? 0 });
      return { head: ['Minimum per week', money(round2(a.rate * h))], rows: [['Per hour', gbp2(a.rate)], ['Per week from 1 April 2027', money(round2(b.rate * h))], ['Legal weekly limit under 18', `${n0(P.young.under18MaxWeek)} hours`], ['Your hours', h > P.young.under18MaxWeek ? 'over the limit' : 'within the limit']] };
    },
  }),
  /** Two-thirds reference point. */
  target: () => ({
    title: 'April 2027 rate against the LPC reference point', cta: 'How the rates are set', ctaPage: 'low-pay-commission',
    inputs: [hoursIn(37.5)],
    run: (v) => {
      const A = P.announcement2027; const h = v.h ?? 0; const nlw = NEXT.bands[0].rate;
      return { head: ['National Living Wage from April 2027', gbp2(nlw)], rows: [['Two-thirds of median (LPC estimate)', gbp2(A.referenceRate)], ['Gap per hour', gbp2(round2(A.referenceRate - nlw))], ['Gap per year at your hours', money(round2((A.referenceRate - nlw) * h * 52))]] };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export const MINI_KINDS = Object.keys(SPECS);
export { periodOfYear, D };
