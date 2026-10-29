import { definePage } from '../../lib/guide-types';

const HOURS = [10, 20, 30, 40, 48];

export default definePage({
  id: 'minimum-wage-weekly',
  group: 'pay',
  order: 1,
  tool: { kind: 'mini:convert' },
  mini: { kind: 'mini:prp' },
  related: ['minimum-wage-monthly', 'part-time-minimum-wage', 'pay-reference-period', 'minimum-wage-2026', 'minimum-wage-after-tax'],
  sources: ['gov_rates', 'hmrc_calc', 'rates_thresholds', 'working_hours'],
  en: {
    slug: 'minimum-wage-weekly',
    nav: 'Weekly pay',
    card: 'Minimum weekly pay at each legal rate and number of hours, how a weekly pay period is checked and the £242 weekly threshold.',
    title: 'Minimum Wage Weekly Pay: Every Rate From 10 to 48 Hours',
    description: 'Minimum wage per week at every rate: £476.63 for 37.5 hours at 21 and over, £406.88 at 18 to 20, £300 under 18. Weekly pay periods and the £242 threshold.',
    h1: 'Minimum wage per week: pay at every rate and number of hours',
    intro: 'Choose the year, your age, apprenticeship and hours: the tool gives the weekly minimum, with the monthly and yearly figures beside it.',
    resume: (h) => `The weekly minimum wage is the hourly rate multiplied by the hours worked in the week. From 1 April 2026 to 31 March 2027, a 37.5-hour week must pay at least ${h.gbp(h.conv(h.rate(2026, 21), 37.5).weekly)} at 21 and over (${h.gbp2(h.rate(2026, 21))} an hour), ${h.gbp(h.conv(h.rate(2026, 18), 37.5).weekly)} at 18 to 20 (${h.gbp2(h.rate(2026, 18))}) and ${h.gbp(h.conv(h.rate(2026, 16), 37.5).weekly)} for workers aged 16 or 17 and apprentices on the apprentice rate (${h.gbp2(h.rate(2026, 16))}). For a worker paid weekly, each week is a separate pay reference period: the pay that counts for that week, divided by the hours worked in it, must reach the rate, and a short week cannot be balanced by a generous one later, except to correct the period just before. One weekly threshold sits close to minimum wage pay: no employee National Insurance is due on pay up to ${h.gbp(h.TAX['2026'].weekly.pt)} a week, the same figure as the weekly share of the personal allowance, which a worker on the National Living Wage passes after about ${h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 21), 1)} hours. From 1 April 2027 the announced rates would lift a 37.5-hour week at 21 and over to ${h.gbp(h.conv(h.rate(2027, 21), 37.5).weekly)}, once the regulations are made.`,
    faqs: (h) => [
      { q: 'Can my employer pay less one week and make it up the next?', a: 'Only in a narrow case. HMRC requires each pay reference period to meet the minimum on its own. An employer may pay more in one period to make up for paying too little in the period immediately before, if the extra pay relates directly to that shortfall, for example overtime worked after the payroll cut-off. A general promise to even things out over a month does not meet the rule for weekly paid workers.' },
      { q: 'How many hours a week can I work at the minimum before National Insurance starts?', a: `Employee National Insurance starts above ${h.gbp(h.TAX['2026'].weekly.pt)} a week in 2026 to 2027. At the National Living Wage that is about ${h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 21), 1)} hours a week; at the 18 to 20 rate about ${h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 18), 1)} hours; and at the 16 to 17 or apprentice rate about ${h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 16), 1)} hours. Above it, 8% is taken from the part of pay over the threshold.` },
      { q: 'What is the weekly minimum wage for 37.5 hours from April 2027?', a: `Under the rates announced on ${h.date(h.A.date)}, a 37.5-hour week would pay at least ${h.gbp(h.conv(h.rate(2027, 21), 37.5).weekly)} at 21 and over, ${h.gbp(h.conv(h.rate(2027, 18), 37.5).weekly)} at 18 to 20 and ${h.gbp(h.conv(h.rate(2027, 16), 37.5).weekly)} for 16 and 17 year olds and apprentices. These figures apply from the first pay week starting on or after 1 April 2027, once the regulations are made.` },
      { q: 'Which pay week first gets the new rate in April 2027?', a: `The first weekly pay reference period that starts on or after 1 April 2027. For a week running Saturday to Friday, that is the week beginning Saturday ${h.date('2027-04-03')}. For a week running Monday to Sunday, it is the week beginning Monday ${h.date('2027-04-05')}. Hours worked in a week that began on 31 March or earlier are still checked against the April 2026 rates.` },
    ],
    body: (h) => `
<h2>Weekly pay at each rate</h2>
<p>Each row is a legal rate in force from 1 April 2026; each column a number of hours in the week. The figures are gross, before Income Tax and National Insurance.</p>
${h.table(['Rate', ...HOURS.map((n) => `${n} hours`)], [
  [`21 and over, ${h.gbp2(h.rate(2026, 21))}`, ...HOURS.map((n) => h.gbp(h.conv(h.rate(2026, 21), n).weekly))],
  [`18 to 20, ${h.gbp2(h.rate(2026, 18))}`, ...HOURS.map((n) => h.gbp(h.conv(h.rate(2026, 18), n).weekly))],
  [`16 to 17 and apprentices, ${h.gbp2(h.rate(2026, 16))}`, ...HOURS.map((n) => h.gbp(h.conv(h.rate(2026, 16), n).weekly))],
], `Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Forty-eight hours is the average weekly limit for adults under the ${h.src('working_hours', 'working time rules')}, unless the worker opts out; a worker under 18 may not go beyond ${h.YNG.under18MaxWeek} hours in any week, which is why the last column does not apply to them.</p>

<h2>How a weekly pay period is checked</h2>
<p>${h.src('hmrc_calc', "HMRC's guidance")} sets the method in four steps: identify the pay reference period, work out the pay that counts for it, add up the hours that count, and divide one by the other. For someone paid weekly, the period is the week, whatever day the money arrives.</p>
<p>Take a worker aged 30 paid ${h.gbp(480)} for a week of 36 hours. That is ${h.gbp2(h.pay({ date: h.C.from, age: 30, hours: 36, gross: 480 }).hourly)} an hour, above the ${h.gbp2(h.rate(2026, 30))} minimum. If the same worker stays two extra hours unpaid at the end of the week for stocktaking, the hours become 38 and the pay that counts per hour drops to ${h.gbp2(h.pay({ date: h.C.from, age: 30, hours: 38, gross: 480 }).hourly)}, leaving the week ${h.gbp2(h.pay({ date: h.C.from, age: 30, hours: 38, gross: 480 }).shortfall)} short. Weeks are not pooled: a week with fewer hours the following month does not repair that one.</p>
<!--tool:mini:prp|{"age":30,"f":0,"h":38,"g":480}-->

<h2>The £242 weekly line</h2>
<p>The ${h.src('rates_thresholds', 'thresholds for 2026 to 2027')} put the weekly primary threshold for National Insurance at ${h.gbp(h.TAX['2026'].weekly.pt)}, the same as the personal allowance spread over 52 weeks. Pay up to it is free of employee National Insurance, and over a full year it stays within the personal allowance, so no Income Tax is due with a standard tax code and no other income.</p>
${h.table(['Rate', 'Hours to reach the line', 'Pay on 16 hours', 'Above the line on 16 hours?'], [
  ['21 and over', h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 21), 1), h.gbp(h.conv(h.rate(2026, 21), 16).weekly), h.conv(h.rate(2026, 21), 16).weekly > h.TAX['2026'].weekly.pt ? 'yes' : 'no'],
  ['18 to 20', h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 18), 1), h.gbp(h.conv(h.rate(2026, 18), 16).weekly), h.conv(h.rate(2026, 18), 16).weekly > h.TAX['2026'].weekly.pt ? 'yes' : 'no'],
  ['16 to 17 and apprentices', h.num(h.TAX['2026'].weekly.pt / h.rate(2026, 16), 1), h.gbp(h.conv(h.rate(2026, 16), 16).weekly), h.conv(h.rate(2026, 16), 16).weekly > h.TAX['2026'].weekly.pt ? 'yes' : 'no'],
], 'Weekly primary threshold of 2026 to 2027.', ['l', 'r', 'r', 'l'])}
<p>A worker with one job of under 19 hours at the National Living Wage has nothing taken for tax or National Insurance. The ${h.a('minimum-wage-after-tax', 'after tax page')} works out deductions for longer hours, and the ${h.a('part-time-minimum-wage', 'part-time page')} looks at common short contracts.</p>

<h2>Weekly pay after the April 2027 rise</h2>
<p>On ${h.date(h.A.date)} the government announced a rise of ${h.pc(h.A.increasePct, 1)} in every band from 1 April 2027, still to be set in regulations. For a 37.5-hour week that would mean:</p>
${h.table(['Rate', 'Now, 37.5 hours', 'From April 2027, 37.5 hours', 'More per week'], [[21, '21 and over'], [18, '18 to 20'], [16, '16 to 17 and apprentices']].map(([a, l]) => [String(l), h.gbp(h.conv(h.rate(2026, Number(a)), 37.5).weekly), h.gbp(h.conv(h.rate(2027, Number(a)), 37.5).weekly), h.gbp(h.round2(h.conv(h.rate(2027, Number(a)), 37.5).weekly - h.conv(h.rate(2026, Number(a)), 37.5).weekly))]), 'Announced rates, not yet in force.', ['l', 'r', 'r', 'r'])}
<p>A month of weekly figures does not add up to a calendar month's pay, because a month holds a little more than four weeks. The ${h.a('minimum-wage-monthly', 'monthly page')} uses the yearly figure divided by twelve instead.</p>`,
  },
});
