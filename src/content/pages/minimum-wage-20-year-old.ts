import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-20-year-old',
  group: 'ages',
  order: 6,
  tool: { kind: 'mini:birthday' },
  mini: { kind: 'mini:april2027', props: { age: 20 } },
  related: ['minimum-wage-21-year-old', 'birthday-pay-rise', 'minimum-wage-18-year-old', 'national-living-wage', 'national-living-wage-age-18'],
  sources: ['gov_rates', 'hmrc_calc', 'lpc_2027', 'lpc_2027_news'],
  en: {
    slug: 'minimum-wage-20-year-old',
    nav: 'Aged 20',
    card: 'The last year on the 18 to 20 rate, the rise to the National Living Wage at 21, the pay period it starts with and the gap per year.',
    title: 'Minimum Wage at 20: £10.85 Until the Jump to £12.71 at 21',
    description: "At 20 the minimum is £10.85 an hour, rising to £12.71 from the first pay period after your 21st birthday. When it starts, the yearly gap and April 2027 rates.",
    h1: 'Minimum wage at 20: the last year before the National Living Wage',
    intro: 'Enter your date of birth, how often you are paid and the start of one pay period: the tool gives the date your higher rate begins.',
    resume: (h) => `At 20 a worker is in the last year of the 18 to 20 band, owed at least ${h.gbp2(h.rate(2026, 20))} an hour from 1 April 2026 to 31 March 2027. At 21 the National Living Wage of ${h.gbp2(h.rate(2026, 21))} applies, ${h.gbp2(h.round2(h.rate(2026, 21) - h.rate(2026, 20)))} more per hour, a rise of ${h.pc(h.rate(2026, 21) / h.rate(2026, 20) - 1, 1)}. It does not start on the birthday itself but with the first pay reference period that begins on or after it, so a worker paid monthly can wait up to a month. Over a year of 37.5-hour weeks, the step is worth ${h.gbp(h.round2(h.conv(h.rate(2026, 21), 37.5).annual - h.conv(h.rate(2026, 20), 37.5).annual))} before tax. The government announced on ${h.date(h.A.date)} that from 1 April 2027 the two rates are due to become ${h.gbp2(h.rate(2027, 20))} and ${h.gbp2(h.rate(2027, 21))}, once regulations are made, so the gap per hour widens slightly to ${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2027, 20)))}. In April 2026 the 18 to 20 rate was ${h.pc(h.rate(2026, 20) / h.rate(2026, 21), 1)} of the National Living Wage; the Low Pay Commission chose not to narrow that gap further for April 2027.`,
    faqs: (h) => [
      { q: 'I turn 21 in late March 2027: which rate do I get in April?', a: `Two changes arrive close together. Paid weekly from Monday and turning 21 on ${h.date('2027-03-25')}, you move to ${h.gbp2(h.rate(2026, 21))} from Monday ${h.date('2027-03-29')}, the first pay period after the birthday. Then the April 2027 rate, announced at ${h.gbp2(h.rate(2027, 21))}, applies from the first period starting on or after 1 April, Monday ${h.date('2027-04-05')}.` },
      { q: 'How much more does a 21 year old earn than a 20 year old in a year?', a: `Under the April 2026 rates, a 37.5-hour week over 52 weeks pays ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} at 21 against ${h.gbp(h.conv(h.rate(2026, 20), 37.5).annual)} at 20. On 20 hours a week the difference is ${h.gbp(h.round2(h.conv(h.rate(2026, 21), 20).annual - h.conv(h.rate(2026, 20), 20).annual))} a year. These are gross minimum figures; an employer can always pay more than the rate for the age.` },
      { q: 'Is the pay gap between 20 and 21 getting smaller?', a: `It shrank quickly until 2026 and then stopped. The 18 to 20 rate was ${h.pc(h.rate(2024, 20) / h.rate(2024, 21), 1)} of the National Living Wage in April 2024, ${h.pc(h.rate(2025, 20) / h.rate(2025, 21), 1)} in April 2025 and ${h.pc(h.rate(2026, 20) / h.rate(2026, 21), 1)} in April 2026. For April 2027 every band rises by the same ${h.pc(h.A.increasePct, 1)}, so the share stays almost unchanged.` },
      { q: 'Does an apprentice move to the National Living Wage at 21?', a: `Only after the first year of the apprenticeship. GOV.UK gives the example of a 21 year old apprentice: ${h.gbp2(h.C.apprentice)} an hour during the first year, then ${h.gbp2(h.rate(2026, 21))} once that year is complete. A 20 year old apprentice who turns 21 while still in the first year therefore stays on the apprentice rate until the year ends.` },
    ],
    body: (h) => `
<h2>The jump at 21 in figures</h2>
<p>The 21st birthday is the last step on the age scale: after it, only the yearly April rise changes the legal minimum. Here is the same job on either side of it under the April 2026 rates.</p>
${h.table(['Measure', 'At 20', 'At 21', 'Difference'], [
  ['Per hour', h.gbp2(h.rate(2026, 20)), h.gbp2(h.rate(2026, 21)), h.gbp2(h.round2(h.rate(2026, 21) - h.rate(2026, 20)))],
  ['Week of 20 hours', h.gbp(h.conv(h.rate(2026, 20), 20).weekly), h.gbp(h.conv(h.rate(2026, 21), 20).weekly), h.gbp(h.round2(h.conv(h.rate(2026, 21), 20).weekly - h.conv(h.rate(2026, 20), 20).weekly))],
  ['Week of 37.5 hours', h.gbp(h.conv(h.rate(2026, 20), 37.5).weekly), h.gbp(h.conv(h.rate(2026, 21), 37.5).weekly), h.gbp(h.round2(h.conv(h.rate(2026, 21), 37.5).weekly - h.conv(h.rate(2026, 20), 37.5).weekly))],
  ['Year of 37.5-hour weeks', h.gbp(h.conv(h.rate(2026, 20), 37.5).annual), h.gbp(h.conv(h.rate(2026, 21), 37.5).annual), h.gbp(h.round2(h.conv(h.rate(2026, 21), 37.5).annual - h.conv(h.rate(2026, 20), 37.5).annual))],
], `Gross pay. Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r'])}

<h2>When the higher rate starts</h2>
<p>${h.src('hmrc_calc', "HMRC's guidance")} treats a birthday the same way as the April rise: the new rate covers each pay reference period that starts on or after the date. Hours in a period that began the day before the birthday are still checked at the 18 to 20 rate.</p>
<p>Priya is paid every two weeks, in periods that start on Mondays, one of them on ${h.date('2026-11-02')}. She turns 21 on Thursday ${h.date('2026-11-05')}. That period stays at ${h.gbp2(h.rate(2026, 20))}, and the National Living Wage applies from ${h.date('2026-11-16')}.</p>
<p>Tom is paid every four weeks, in periods starting on ${h.date('2026-12-07')} and then ${h.date('2027-01-04')}. His birthday is ${h.date('2026-12-08')}, one day into a period, so he waits until ${h.date('2027-01-04')} for the higher rate, close to four weeks after turning 21. This is lawful: the law applies the rate period by period, and the first full period at 21 pays the full National Living Wage. The ${h.a('birthday-pay-rise', 'birthday page')} finds the date for any pay cycle.</p>

<h2>The gap between 18 to 20 and 21 and over</h2>
<p>The National Living Wage has started at 21 since April 2024. Since then the distance to the 18 to 20 rate has moved like this.</p>
${h.table(['From April', 'Gap per hour', '18 to 20 as a share of 21 and over', 'Gap on a year of 37.5-hour weeks'], [2024, 2025, 2026, 2027].map((y) => [y === 2027 ? `${y} (announced)` : String(y), h.gbp2(h.round2(h.rate(y, 21) - h.rate(y, 20))), h.pc(h.rate(y, 20) / h.rate(y, 21), 1), h.gbp(h.round2(h.conv(h.rate(y, 21), 37.5).annual - h.conv(h.rate(y, 20), 37.5).annual))]), `April 2027 per the ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}.`, ['l', 'r', 'r', 'r'])}
<p>The gap per hour fell from ${h.gbp2(h.round2(h.rate(2024, 21) - h.rate(2024, 20)))} to ${h.gbp2(h.round2(h.rate(2026, 21) - h.rate(2026, 20)))} in two years. For April 2027 the ${h.src('lpc_2027', 'Low Pay Commission')} paused that narrowing, weighing a labour market it described as low hire, low fire against living costs, so in pounds the gap grows a little while the share stays put. The government's aim of a single adult rate from 18 remains without a date; the ${h.a('national-living-wage-age-18', 'age 18 page')} keeps track of it.</p>

<h2>Planning the year before 21</h2>
<p>A 20 year old on regular hours can work out now what the first pay period at 21 should show. Multiply the hours of that period by ${h.gbp2(h.rate(2026, 21))}, or by ${h.gbp2(h.rate(2027, 21))} if the period starts on or after 1 April 2027 and the announced rates are in force. Overtime premiums and tips do not count towards that figure.</p>
<!--tool:mini:convert|{"age":21,"h":37.5}-->
<p>If the payslip for that period still shows the old rate, the shortfall is arrears that the employer must make up, recalculated at the rate in force when it is paid. The ${h.a('minimum-wage-21-year-old', 'page for 21 year olds')} covers what the National Living Wage brings at that age, and the history of the age at which it starts.</p>`,
  },
});
