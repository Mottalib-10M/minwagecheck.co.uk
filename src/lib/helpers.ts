/** Writing helpers handed to every page: links, figures read from params-2026.json through the engine, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import {
  PERIODS, CURRENT, NEXT, periodOfYear, rateFor, convert, payCheck, netPay, employerNi, arrears, penalty, fairPieceRate, bandLabel,
  round2, type Period,
} from './engine/wage';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/** Every page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED: string[] = [
  'minimum-wage-2026', 'minimum-wage-april-2027', 'national-living-wage', 'national-minimum-wage', 'minimum-wage-history', 'minimum-wage-2025',
  'real-living-wage', 'accommodation-offset', 'low-pay-commission', 'national-living-wage-age-18',
  'minimum-wage-under-16', 'minimum-wage-16-year-old', 'minimum-wage-17-year-old', 'minimum-wage-18-year-old', 'minimum-wage-19-year-old',
  'minimum-wage-20-year-old', 'minimum-wage-21-year-old', 'birthday-pay-rise', 'apprentice-minimum-wage', 'apprentice-pay-after-first-year', 'apprentice-off-the-job-training',
  'minimum-wage-weekly', 'minimum-wage-monthly', 'minimum-wage-annual-salary', 'minimum-wage-after-tax', 'part-time-minimum-wage', 'salaried-hours-minimum-wage', 'employer-cost-minimum-wage',
  'uniform-deductions', 'overtime-and-shift-premiums', 'tips-and-service-charges', 'training-travel-waiting-time', 'sleep-in-and-on-call', 'salary-sacrifice-minimum-wage',
  'unpaid-trial-shifts', 'pay-reference-period', 'minimum-wage-arrears', 'report-underpayment', 'employer-penalties', 'who-gets-minimum-wage', 'internships-minimum-wage',
  'zero-hours-and-agency-workers', 'piece-work-minimum-wage',
];
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const gbp = (n: number) => money(n);
  /** Always two decimals: £8.00, £12.71. */
  const gbp2 = (n: number) => `£${formatNumberL(n, 'en', 2)}`;
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  const Y = (year: number) => periodOfYear(year);
  /** Legal hourly rate on 1 April of a year for an age (apprentice: 'first' or 'after'). */
  const rate = (year: number, age: number, appr?: 'first' | 'after') => rateFor({ date: Y(year).from, age, apprentice: !!appr, firstYear: appr === 'first' }).rate;
  /** Rows of a rates table for one period: band, rate. */
  const bandRows = (p: Period) => [...p.bands.map((b) => [bandLabel(p, b), gbp2(b.rate)]), ['Apprentice', gbp2(p.apprentice)]];
  /** Rise between two years for an age, as a share (0.039). */
  const rise = (from: number, to: number, age: number) => rate(to, age) / rate(from, age) - 1;
  return {
    lang, a, ext, src, gbp, gbp2, num, pc, P, round2,
    C: CURRENT, N: NEXT, Y, PERIODS, rate, rise, bandRows, bandLabel,
    A: P.announcement2027, E: P.enforcement, YNG: P.young, RLW: P.rlw, RULES: P.rules, TAX: P.tax, REMIT: P.remit, SCHOOL: P.schoolLeaving, PENSION: P.pension,
    conv: convert, pay: payCheck, net: netPay, empNi: employerNi, arrears, penalty, piece: fairPieceRate,
    date: (iso: string) => dateL(iso),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
