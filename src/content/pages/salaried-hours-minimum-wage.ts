import { definePage } from '../../lib/guide-types';

const FREQ: Array<[string, number]> = [['Weekly', 52], ['Every two weeks', 26], ['Every four weeks', 13], ['Monthly', 12]];

export default definePage({
  id: 'salaried-hours-minimum-wage',
  group: 'pay',
  order: 6,
  tool: { kind: 'mini:salaried' },
  mini: { kind: 'mini:prp' },
  related: ['minimum-wage-annual-salary', 'minimum-wage-monthly', 'pay-reference-period', 'overtime-and-shift-premiums'],
  sources: ['hmrc_hours', 'hmrc_calc', 'gov_rates', 'lpc_2027_news'],
  en: {
    slug: 'salaried-hours-minimum-wage',
    nav: 'Salaried hours',
    card: 'How a salary is tested against the minimum wage: basic annual hours, notional hours per pay period, term-time staff and extra hours.',
    title: 'Salaried Hours and the Minimum Wage: The Annual Hours Test',
    description: 'A salary is checked against the minimum wage by dividing it by the basic annual hours. The HMRC method, its £24,000 example, term-time staff and extra hours.',
    h1: 'Salaried hours and the minimum wage',
    intro: 'Enter your age, annual salary and basic weekly hours: the tool gives your pay per hour and the salary needed now and from April 2027.',
    resume: (h) => `A worker on an annual salary for a set number of basic hours a year is doing what HMRC calls salaried hours work, and the minimum wage test is simple: the annual salary divided by the basic annual hours must reach the rate for the worker's age. Each pay period is checked on notional hours, the basic annual hours divided by 52 for weekly pay, 26 for fortnightly, 13 for four-weekly or 12 for monthly, assumed to be worked even in months with more or fewer working days. HMRC's own example, written with the 2025 to 2026 rates, is a 23 year old paid ${h.gbp(24000)} a year for 1,920 hours: ${h.gbp(2000)} a month for 160 notional hours, or ${h.gbp2(12.5)} an hour, then above the ${h.gbp2(h.rate(2025, 23))} minimum. Since 1 April 2026 the rate for that worker is ${h.gbp2(h.rate(2026, 23))}, so the same contract now falls ${h.gbp2(h.round2((h.rate(2026, 23) - 12.5) * 160))} a month short; the salary needed is ${h.gbp(h.round2(h.rate(2026, 23) * 1920))}, and ${h.gbp(h.round2(h.rate(2027, 23) * 1920))} under the rate announced for April 2027. Paid absences that the contract covers count as hours, and hours beyond the basic annual hours must also be paid at least the minimum.`,
    faqs: (h) => [
      { q: 'Does HMRC\'s £24,000 salary example still pass the minimum wage?', a: `Not at today's rates. The example, written with the 2025 to 2026 rates, gives ${h.gbp(2000)} a month for 160 notional hours, or ${h.gbp2(12.5)} an hour, which was above the ${h.gbp2(h.rate(2025, 23))} minimum then. From 1 April 2026 a 23 year old is owed ${h.gbp2(h.rate(2026, 23))}, so the same contract would need at least ${h.gbp(h.round2(h.rate(2026, 23) * 1920))} a year.` },
      { q: 'How are term-time staff paid a salary all year round checked?', a: `As salaried workers. HMRC's example works 40 hours for 35 weeks, 1,400 hours a year, paid ${h.gbp2(346.15)} every week. The notional hours are 1,400 ÷ 52 = 26.92 a week, in term and holidays alike, which gives ${h.gbp2(12.86)} an hour: above the ${h.gbp2(h.rate(2026, 23))} in force since April 2026, but below the ${h.gbp2(h.rate(2027, 23))} announced for April 2027.` },
      { q: 'What happens when a salaried worker goes beyond the basic annual hours?', a: 'The extra hours must be added to the check. Once the basic annual hours for the calculation year have been worked, any further hours count in the remaining pay periods on top of the notional hours. HMRC\'s example is a worker who reaches the yearly total in February: for February and March the salary continues, and the employer must also pay at least the minimum for every extra hour.' },
      { q: 'Do paid holidays count as working hours for a salaried worker?', a: 'Yes, when the contract pays the normal salary for them. HMRC counts absences paid at the full rate under the contract, such as holidays, lunch breaks or sick leave on full pay, as part of the basic hours. Absences paid at less than normal pay, for example on half pay or Statutory Sick Pay only, do not count as working time, and the pay for them is ignored.' },
    ],
    body: (h) => `
<h2>When a worker counts as salaried</h2>
<p>${h.src('hmrc_hours', "HMRC's guidance on working hours")} treats work as salaried hours work only when all of these apply:</p>
<ul>
<li>the contract entitles the worker to be paid for a set basic number of hours in a year;</li>
<li>the contract entitles them to an annual salary for those hours;</li>
<li>they have no right to any other payment for the basic hours, apart from a performance bonus or a salary premium;</li>
<li>they are paid in equal instalments, not more often than weekly and not less often than monthly, or in monthly amounts that vary but add up to the same each quarter.</li>
</ul>
<p>The contract does not have to state the yearly hours, but it must be possible to work them out exactly. HMRC accepts that an employer may turn weekly hours into a yearly figure with 52, 52.14, 52.18 or another multiplier, provided it can show how it arrived at the total. A worker who does not meet the conditions is checked as time work, on the hours actually worked in each period.</p>

<h2>The calculation step by step</h2>
<p>First, find the basic annual hours. Then divide them by the number of payments in the year to get the notional hours for each pay period. Finally divide the pay for the period by those hours. The table runs the steps for a contract of 1,950 hours a year, which is 37.5 hours over 52 weeks, at the National Living Wage.</p>
${h.table(['Paid', 'Divide the annual hours by', 'Notional hours per period', 'Minimum per period, 21 and over'], FREQ.map(([l, d]) => [l, String(d), h.num(1950 / d, 1), h.gbp(h.round2(h.rate(2026, 21) * 1950 / d))]), `April 2026 rate from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r'])}

<h2>HMRC's two examples under the April 2026 rates</h2>
<p>HMRC's worked examples were written with the 2025 to 2026 rates. Running them again shows what the rise of April 2026 changed for workers whose salary stood still.</p>
${h.table(['HMRC example', 'Pay per period', 'Notional hours', 'Pay per hour', 'Minimum at 23, then', 'Minimum at 23, now', 'April 2027 (announced)'], [
  ['Monthly, 1,920 hours a year', h.gbp(2000), '160', h.gbp2(12.5), h.gbp2(h.rate(2025, 23)), h.gbp2(h.rate(2026, 23)), h.gbp2(h.rate(2027, 23))],
  ['Weekly, term time, 1,400 hours a year', h.gbp2(346.15), '26.92', h.gbp2(12.86), h.gbp2(h.rate(2025, 23)), h.gbp2(h.rate(2026, 23)), h.gbp2(h.rate(2027, 23))],
], 'Examples from HMRC guidance, compared with the rates in force before and after 1 April 2026.', ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>The monthly example now falls below the minimum and needs ${h.gbp2(h.round2((h.rate(2026, 23) - 12.5) * 160))} more each month. The term-time example still passes today, but would need a raise to stay legal once the announced April 2027 rate is in force. In both cases the check stays the same every month, because the notional hours do not change with the calendar.</p>
<!--tool:mini:salaried|{"age":23,"s":24000,"h":37.5}-->

<h2>Hours beyond the contract</h2>
<p>A salaried worker who works only the basic hours needs no further calculation. One who goes beyond them, without separate pay for the extra time, needs careful tracking. Once the basic annual hours have been worked in the calculation year, every further hour has to be covered. HMRC's example is a 19 year old on 2,040 basic hours a year, paid ${h.gbp(20400)}, who reaches the total in February. For March, the pay must cover the 170 notional hours of the contract plus the 170 hours actually worked that month, 340 hours in all.</p>
<p>A salary premium, extra pay for nights, bank holidays, a location or a particular task, is allowed in a salaried contract but does not count towards minimum wage pay. Only the basic salary is compared with the hours. The ${h.src('hmrc_calc', "HMRC guidance on calculating pay")} applies the same exclusion to overtime premiums for workers on time work.</p>

<h2>Absences and the notional hours</h2>
<p>Paid absences count as working time when the contract pays the normal salary for them: holidays, lunch breaks or sick leave on full pay are part of the basic hours. Absences paid at less than normal pay, unpaid leave and strike days are not counted, and neither is the pay for them. Training the employer does not require, taken outside the time the worker would otherwise be working, is also left out. The ${h.a('minimum-wage-annual-salary', 'annual salary page')} gives the lowest legal salary for common contracts.</p>`,
  },
});
