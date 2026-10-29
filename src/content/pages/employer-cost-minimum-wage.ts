import { definePage } from '../../lib/guide-types';

type Row = { label: string; rate: number; relief: boolean };

export default definePage({
  id: 'employer-cost-minimum-wage',
  group: 'pay',
  order: 7,
  tool: { kind: 'mini:employer' },
  mini: { kind: 'mini:convert' },
  related: ['minimum-wage-annual-salary', 'employer-penalties', 'apprentice-minimum-wage', 'minimum-wage-april-2027'],
  sources: ['rates_thresholds', 'budget_annex', 'pensions', 'gov_rates', 'hmrc_calc', 'hmrc_enforce'],
  en: {
    slug: 'employer-cost-minimum-wage',
    nav: 'Cost to the employer',
    card: 'What a minimum wage worker costs: wages plus employer National Insurance, the 0% rate for under 21s and young apprentices, and pensions.',
    title: 'Employer Cost of the Minimum Wage: Wages Plus Employer NI',
    description: 'What a minimum wage worker costs an employer: wages plus 15% employer National Insurance above £5,000 a year, or 0% for under 21s and apprentices under 25.',
    h1: 'Employer cost of the minimum wage',
    intro: 'Enter the worker\'s age, apprenticeship and weekly hours: the tool gives the yearly wages, employer National Insurance and cost per paid hour.',
    resume: (h) => `The cost of a minimum wage worker to an employer is the wage plus employer National Insurance, before any pension contribution. In 2026 to 2027 employer National Insurance is ${h.pc(h.TAX['2026'].niEmployer)} of earnings above ${h.gbp(h.TAX['2026'].niSecondary)} a year. A worker aged 25 on 37.5 hours a week at the National Living Wage of ${h.gbp2(h.rate(2026, 25))} earns ${h.gbp(h.conv(h.rate(2026, 25), 37.5).annual)}, which brings ${h.gbp(h.empNi(h.conv(h.rate(2026, 25), 37.5).annual, '2026'))} of employer National Insurance, for a total of ${h.gbp(h.round2(h.conv(h.rate(2026, 25), 37.5).annual + h.empNi(h.conv(h.rate(2026, 25), 37.5).annual, '2026')))} a year. For workers under 21, and for apprentices under 25, the employer rate is 0% on earnings up to ${h.gbp(h.TAX['2026'].niUnder21Upper)}, so at minimum wage pay the cost is the wage alone: ${h.gbp(h.conv(h.rate(2026, 18), 37.5).annual)} for a full-time worker aged 18 to 20. Workers aged 22 or over earning at least ${h.gbp(h.PENSION.trigger)} a year must also be enrolled in a workplace pension, with a minimum employer contribution of ${h.pc(h.PENSION.employerMinPct)} of qualifying earnings. The Budget of ${h.date(h.A.date)} kept the National Insurance thresholds for 2027 to 2028, so with the rates announced for April 2027 the 37.5-hour worker aged 25 would cost ${h.gbp(h.round2(h.conv(h.rate(2027, 25), 37.5).annual + h.empNi(h.conv(h.rate(2027, 25), 37.5).annual, '2027')))} before pension.`,
    faqs: (h) => [
      { q: 'Do employers pay National Insurance on a 20 year old earning the minimum wage?', a: `Not on minimum wage pay. For employees under 21, the employer rate is 0% on earnings up to ${h.gbp(h.TAX['2026'].niUnder21Upper)} a year in 2026 to 2027. A full-time 20 year old at ${h.gbp2(h.rate(2026, 20))} an hour earns ${h.gbp(h.conv(h.rate(2026, 20), 37.5).annual)} over 37.5-hour weeks, far below that point, so the cost is the wage plus any pension contribution.` },
      { q: 'Is employer National Insurance due on an apprentice aged 24?', a: `No, up to ${h.gbp(h.TAX['2026'].niUnder21Upper)} a year. The 0% employer rate covers apprentices under 25 as well as all workers under 21. A first-year apprentice on ${h.gbp2(h.C.apprentice)} for 30 hours a week earns ${h.gbp(h.conv(h.C.apprentice, 30).annual)}. Even after moving to the National Living Wage at the end of the first year, a 24 year old apprentice stays under that line and brings no employer National Insurance.` },
      { q: 'How much does the April 2027 rise add to the cost of a full-time worker?', a: `For a worker aged 25 on 37.5 hours a week, the announced rise adds ${h.gbp(h.round2(h.conv(h.rate(2027, 25), 37.5).annual - h.conv(h.rate(2026, 25), 37.5).annual))} of wages a year and ${h.gbp(h.round2(h.empNi(h.conv(h.rate(2027, 25), 37.5).annual, '2027') - h.empNi(h.conv(h.rate(2026, 25), 37.5).annual, '2026')))} of employer National Insurance, with thresholds unchanged. The rise applies from the first pay period starting on or after 1 April 2027, once the regulations are made.` },
      { q: 'Does an employer pension contribution count towards the minimum wage?', a: 'No. HMRC lists the employer\'s contribution to a worker\'s pension fund among the benefits in kind that do not count towards minimum wage pay. An employer cannot pay a lower hourly wage on the grounds that it also pays into the pension. The wage on its own, after any reductions such as a required uniform, has to reach the rate for the worker\'s age.' },
    ],
    body: (h) => `
<h2>Wages and National Insurance by type of worker</h2>
<p>The ${h.src('rates_thresholds', 'rates and thresholds for employers in 2026 to 2027')} set employer National Insurance at ${h.pc(h.TAX['2026'].niEmployer)} above the secondary threshold of ${h.gbp(h.TAX['2026'].niSecondary)} a year, or ${h.gbp(h.TAX['2026'].weekly.st)} a week. Two groups have a higher threshold of ${h.gbp(h.TAX['2026'].niUnder21Upper)}: employees under 21 and apprentices under 25.</p>
${(() => { const rows: Row[] = [
  { label: 'Aged 25, National Living Wage', rate: h.rate(2026, 25), relief: false },
  { label: 'Aged 21, National Living Wage', rate: h.rate(2026, 21), relief: false },
  { label: 'Aged 19, 18 to 20 rate', rate: h.rate(2026, 19), relief: true },
  { label: 'Aged 17, 16 to 17 rate', rate: h.rate(2026, 17), relief: true },
  { label: 'Apprentice aged 23, first year', rate: h.C.apprentice, relief: true },
]; return h.table(['Worker, 37.5 hours a week', 'Wages a year', 'Employer National Insurance', 'Cost before pension', 'Cost per paid hour'], rows.map((r) => { const w = h.conv(r.rate, 37.5).annual; const ni = h.empNi(w, '2026', r.relief); return [r.label, h.gbp(w), h.gbp(ni), h.gbp(h.round2(w + ni)), h.gbp2(h.round2((w + ni) / 1950))]; }), 'April 2026 rates and 2026 to 2027 thresholds. A 17 year old may work at most 40 hours a week.', ['l', 'r', 'r', 'r', 'r']); })()}
<p>The 21st birthday is a double step for the employer: the hourly rate rises to the National Living Wage and the 0% National Insurance rate ends. An apprentice keeps the relief until 25, which is why a first-year apprentice of 23 costs no more than the wage. Eligible employers can also reduce their yearly National Insurance bill through the Employment Allowance, which is left out of these figures.</p>

<h2>Part-time staff and the secondary threshold</h2>
<p>Employer National Insurance only starts above ${h.gbp(h.TAX['2026'].niSecondary)} a year, so on short contracts it is a small share of the cost.</p>
${h.table(['Hours a week, aged 25', 'Wages a year', 'Employer National Insurance', 'Share of wages'], [8, 16, 25, 37.5].map((n) => { const w = h.conv(h.rate(2026, 25), n).annual; const ni = h.empNi(w, '2026'); return [h.num(n, n % 1 ? 1 : 0), h.gbp(w), h.gbp(ni), h.pc(ni / w, 1)]; }), 'National Living Wage of April 2026.', ['l', 'r', 'r', 'r'])}
<!--tool:mini:employer|{"age":19,"h":30}-->

<h2>Pensions on top</h2>
<p>Under the ${h.src('pensions', 'workplace pension rules')}, a worker aged 22 up to State Pension age who earns at least ${h.gbp(h.PENSION.trigger)} a year must be enrolled automatically. The minimum is ${h.pc(h.PENSION.employerMinPct)} from the employer and ${h.pc(h.PENSION.employeeMinPct)} from the worker, on qualifying earnings rather than on the whole wage, so the figures in the tables above do not include it. A full-time worker of 25 on the National Living Wage is above the trigger; a 21 year old on the same pay is not yet of enrolment age. The employer's contribution does not count towards minimum wage pay, as ${h.src('hmrc_calc', "HMRC's guidance")} lists it among benefits in kind.</p>

<h2>April 2027 and the cost of getting it wrong</h2>
<p>The ${h.src('budget_annex', "Budget's annex of rates")} keeps the 2027 to 2028 National Insurance thresholds at their current levels, so the cost rises only with the wages. With the rates announced on ${h.date(h.A.date)}, a full-time worker of 25 would cost ${h.gbp(h.round2(h.conv(h.rate(2027, 25), 37.5).annual + h.empNi(h.conv(h.rate(2027, 25), 37.5).annual, '2027')))} a year before pension, against ${h.gbp(h.round2(h.conv(h.rate(2026, 25), 37.5).annual + h.empNi(h.conv(h.rate(2026, 25), 37.5).annual, '2026')))} now.</p>
<p>Underpaying costs more than paying. Under ${h.src('hmrc_enforce', "HMRC's enforcement rules")}, a notice of underpayment requires the arrears, recalculated at the current rate, plus a penalty of ${h.pc(h.E.penaltyPct)} of the arrears, up to ${h.gbp(h.E.penaltyMaxPerWorker)} per worker, halved if paid within ${h.E.earlyPaymentDays} days. Records must be kept for ${h.E.recordsYears} years, and in a tribunal or civil claim it is for the employer to prove the minimum was paid. The ${h.a('employer-penalties', 'employer penalties page')} sets out the sanctions in full.</p>`,
  },
});
