import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-april-2027',
  group: 'rates',
  order: 2,
  tool: { kind: 'mini:april2027', props: { age: 22, h: 30 } },
  mini: { kind: 'mini:convert', props: { yr: 8, age: 21, h: 37.5 } },
  related: ['minimum-wage-2026', 'low-pay-commission', 'national-living-wage-age-18', 'birthday-pay-rise', 'home'],
  sources: ['lpc_2027_news', 'lpc_2027', 'gov_rates', 'lpc_remit'],
  en: {
    slug: 'minimum-wage-april-2027',
    nav: 'April 2027 rise',
    card: 'The rates announced for 1 April 2027 (£13.21 at 21 and over), what you gain per week, and why every band rises by 3.9%.',
    title: 'Minimum Wage April 2027: £13.21 and What Changes for You',
    description: 'Minimum wage from 1 April 2027: £13.21 at 21 and over, £11.27 at 18 to 20, £8.31 for under 18s and apprentices, announced 28 October 2026. See your weekly rise.',
    h1: 'Minimum wage from April 2027: what changes for you',
    intro: 'Enter your age, apprenticeship and usual weekly hours: the tool compares your legal minimum today with the rate from 1 April 2027.',
    resume: (h) => `From 1 April 2027 the minimum wage rises to ${h.gbp2(h.rate(2027, 21))} an hour for workers aged 21 and over, ${h.gbp2(h.rate(2027, 18))} for 18 to 20 year olds, and ${h.gbp2(h.rate(2027, 16))} for 16 and 17 year olds and for apprentices under 19 or in their first year. The government announced these figures on ${h.date(h.A.date)}, the day of the Autumn Budget, after accepting in full the Low Pay Commission's advice submitted on ${h.date(h.A.lpcLetter)}. Every band rises by ${h.pc(h.A.increasePct, 1)}: ${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2026, 21)))} an hour at 21 and over, ${h.gbp2(h.round2(h.rate(2027, 18) - h.rate(2026, 18)))} at 18 to 20 and ${h.gbp2(h.round2(h.rate(2027, 16) - h.rate(2026, 16)))} for the youngest workers and apprentices. The accommodation offset goes from ${h.gbp2(h.C.offsetDay)} to ${h.gbp2(h.N.offsetDay)} a day. For a full-time worker on 37.5 hours a week at the National Living Wage, the rise is worth ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2026, 21)) * 37.5))} a week before tax. The figures still have to be written into amending regulations, which the government makes each year before 1 April.`,
    faqs: (h) => [
      { q: 'Is the £13.21 rate already law?', a: `Not yet. The government announced it on ${h.date(h.A.date)} and accepted the Low Pay Commission's figures in full, but the legal rate only changes when amending regulations are made and come into force. For the 2026 rates they were made on ${h.date('2026-03-19')}. Until then the April 2026 rate of ${h.gbp2(h.rate(2026, 21))} remains the legal minimum.` },
      { q: 'Why is the 2027 rise smaller than in 2026?', a: `The Low Pay Commission said the job market had weakened, with vacancies at their lowest outside the pandemic since 2014 and hiring in retail and hospitality particularly weak. It chose a rise above forecast inflation but below the ${h.gbp2(h.A.referenceRate)} it estimates would reach two thirds of median hourly earnings by October 2027. In 2026 the adult rate had risen by ${h.pc(h.rise(2025, 2026, 21), 1)}.` },
      { q: 'I turn 21 in May 2027: which rate do I get in April?', a: `In April 2027 you are 20, so the 18 to 20 rate of ${h.gbp2(h.rate(2027, 20))} applies from the first pay period starting on or after 1 April. From the first pay period that starts on or after your 21st birthday in May, you move to ${h.gbp2(h.rate(2027, 21))}. The two changes are separate and both are owed.` },
      { q: 'Does my employer have to tell me about the April 2027 rise?', a: 'No law requires a letter, but from the first pay period starting on or after 1 April 2027 your pay must reach the new rate for every hour. Check your first April payslip: divide the pay that counts by the hours worked. If it falls short, the gap is arrears your employer must pay, at the rate in force when it repays them.' },
    ],
    body: (h) => `
<h2>The April 2027 rates beside today's</h2>
${h.table(['Band', 'Today (from April 2026)', 'From 1 April 2027', 'Per hour', 'Per 37.5-hour week'], [
  ['21 and over', h.gbp2(h.rate(2026, 21)), h.gbp2(h.rate(2027, 21)), `+${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2026, 21)))}`, `+${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2026, 21)) * 37.5))}`],
  ['18 to 20', h.gbp2(h.rate(2026, 18)), h.gbp2(h.rate(2027, 18)), `+${h.gbp2(h.round2(h.rate(2027, 18) - h.rate(2026, 18)))}`, `+${h.gbp(h.round2((h.rate(2027, 18) - h.rate(2026, 18)) * 37.5))}`],
  ['16 to 17', h.gbp2(h.rate(2026, 16)), h.gbp2(h.rate(2027, 16)), `+${h.gbp2(h.round2(h.rate(2027, 16) - h.rate(2026, 16)))}`, `+${h.gbp(h.round2((h.rate(2027, 16) - h.rate(2026, 16)) * 37.5))}`],
  ['Apprentice', h.gbp2(h.C.apprentice), h.gbp2(h.N.apprentice), `+${h.gbp2(h.round2(h.N.apprentice - h.C.apprentice))}`, `+${h.gbp(h.round2((h.N.apprentice - h.C.apprentice) * 37.5))}`],
], `Announced on ${h.date(h.A.date)}: ${h.src('lpc_2027_news', 'GOV.UK news')} and ${h.src('lpc_2027', 'Low Pay Commission letter and report')}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>For the first time in several years, all four bands rise by the same percentage. Between 2022 and 2026 the 18 to 20 rate had grown much faster than the adult rate, from ${h.gbp2(h.rate(2022, 18))} to ${h.gbp2(h.rate(2026, 18))}, a rise of ${h.pc(h.rate(2026, 18) / h.rate(2022, 18) - 1)}, to prepare for a single adult rate from 18. The Commission decided to pause that alignment in 2027, saying demand for young workers had slowed and that youth unemployment was at rates last seen in 2015.</p>

<h2>What the rise is worth over a year</h2>
<p>A worker aged 21 or over on 37.5 hours a week earns ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} a year at today's rate and ${h.gbp(h.conv(h.rate(2027, 21), 37.5).annual)} at the April 2027 rate, before tax. On 20 hours a week the yearly gain is ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2026, 21)) * 20 * 52))}. Because the personal allowance and the National Insurance thresholds stay frozen for 2027 to 2028, part of the rise goes in tax and National Insurance once your pay is above them.</p>
<!--tool:mini:net|{"yr":8,"h":37.5}-->
<p>The second tool above, under the summary, turns the 2027 rate for any age into weekly, monthly and yearly pay; the ${h.a('minimum-wage-after-tax', 'take-home pay page')} explains the tax side.</p>

<h2>When the new rate starts on your payslip</h2>
<p>The new rates apply to pay reference periods that begin on or after 1 April 2027, which is a Thursday. A weekly paid worker whose week runs Monday to Sunday gets the new rate from Monday 5 April 2027; the days from 1 to 4 April still belong to a week that began in March. A monthly paid worker whose month starts on the 1st gets it for all of April. The ${h.a('pay-reference-period', 'pay reference period page')} explains how the period is set.</p>
<p>A birthday in the same weeks adds a second step. Someone who turns 18 on 10 April 2027 moves first to the new 16 to 17 rate, then to the new 18 to 20 rate from the first pay period that starts on or after the birthday. The ${h.a('birthday-pay-rise', 'birthday checker')} gives the exact date.</p>

<h2>Why these figures</h2>
<p>The government's remit asks the Low Pay Commission to aim for a National Living Wage equal to two thirds of median hourly earnings. In the spring of 2026 the Commission estimated that ${h.gbp2(h.A.springEstimate)} would reach it, within a range of ${h.gbp2(h.A.springLow)} to ${h.gbp2(h.A.springHigh)}. Wages then grew faster than expected and the estimate rose to ${h.gbp2(h.A.referenceRate)}, or ${h.pc(h.A.referencePct, 1)} more. The Commission recommended less, ${h.gbp2(h.rate(2027, 21))}, citing weak hiring, employers' rising costs and the risk to jobs, while keeping the rate above forecast inflation for April 2027 to March 2028. The ${h.a('low-pay-commission', 'Low Pay Commission page')} explains how the yearly cycle works.</p>

<h2>What does not change in April 2027</h2>
<ul>
<li>The age bands: the National Living Wage still starts at 21, and the apprentice rule (under 19, or 19 and over in the first year) is the same.</li>
<li>The way pay is checked: premiums and tips left out, deductions for the employer's purposes taken off, the ${h.a('accommodation-offset', 'accommodation offset')} at its new value.</li>
<li>The enforcement rules: arrears at the current rate, penalties of ${h.pc(h.E.penaltyPct)} of the arrears and complaints through the official form.</li>
</ul>
<p>The aim of a single adult rate from 18 stays in the remit but has no date: the ${h.a('national-living-wage-age-18', 'page on lowering the age')} follows it.</p>`,
  },
});
