import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'apprentice-pay-after-first-year',
  group: 'ages',
  order: 10,
  tool: { kind: 'mini:apprentice', props: { age: 21 } },
  mini: { kind: 'mini:worktime' },
  related: ['apprentice-minimum-wage', 'minimum-wage-19-year-old', 'minimum-wage-arrears', 'birthday-pay-rise', 'report-underpayment'],
  sources: ['gov_rates', 'hmrc_elig', 'hmrc_enforce', 'gov_apprentice', 'gov_complaint'],
  en: {
    slug: 'apprentice-pay-after-first-year',
    nav: 'Apprentice pay after year one',
    card: 'How an apprentice aged 19 or over moves from the apprentice rate to the rate for their age once the first year is complete.',
    title: 'Apprentice Pay After the First Year: Moving to Your Age Rate',
    description: 'After year one, an apprentice aged 19 or over moves from £8.00 to the rate for their age: £10.85 at 19 to 20, £12.71 from 21. When it starts and what is owed.',
    h1: 'Apprentice pay after the first year',
    intro: 'The age is set to 21, as in the GOV.UK example: enter your start date and hours to see the date and size of your rise.',
    resume: (h) => `Once the first year of an apprenticeship is complete, an apprentice aged 19 or over is no longer on the apprentice rate of ${h.gbp2(h.C.apprentice)}. They are owed the National Minimum Wage or National Living Wage for their age: ${h.gbp2(h.rate(2026, 20, 'after'))} at 19 or 20 and ${h.gbp2(h.rate(2026, 21, 'after'))} from 21, under the rates in force from 1 April 2026. The GOV.UK rates page gives the example of a 21 year old: ${h.gbp2(h.rate(2026, 21, 'first'))} an hour in the first year, ${h.gbp2(h.rate(2026, 21, 'after'))} once it is over. HMRC's guidance sets the date: the new rate applies from the first day of the pay reference period that begins on or after the completion of the first year, or the 19th birthday if that comes later. An apprentice under 19 stays on the apprentice rate even after year one. For a 21 year old on 37.5 hours a week the step is worth ${h.gbp(h.round2((h.rate(2026, 21) - h.C.apprentice) * 37.5))} a week. HMRC says the wrong use of the apprentice rate is a common reason for underpayment, and keeping an apprentice aged 19 or over on it after the first year heads its list of examples.`,
    faqs: (h) => [
      { q: 'I am 18 and finished my first year: why has my apprentice pay not gone up?', a: `Because the apprentice rate covers every apprentice under 19, whatever year they are in. Your pay can stay at ${h.gbp2(h.C.apprentice)} until you turn 19. From the first pay reference period that begins on or after your 19th birthday, the 18 to 20 rate of ${h.gbp2(h.rate(2026, 19))} applies, since your first year is already behind you. An employer can always choose to pay more earlier.` },
      { q: 'Does the rise come on the anniversary or at the next pay period?', a: `At the next pay period that begins on or after the first year is complete. An apprentice who started on ${h.date('2026-03-15')} completes the first year on ${h.date('2027-03-14')}. Paid monthly from the 1st, they move to the rate for their age on ${h.date('2027-04-01')}, the same day the April 2027 rates are due, so a 21 year old would go straight to the announced ${h.gbp2(h.rate(2027, 21))}.` },
      { q: 'My employer kept me on the apprentice rate after my first year: can I claim it back?', a: 'Yes. The missing pay is arrears, and the employer must pay it at the rate in force on the day it is repaid. You can raise it with the employer, call Acas, or use the official pay and work rights complaint form, even after leaving the job. HMRC can order the employer to pay the arrears with a penalty, and you can ask that your name is not passed to the employer.' },
      { q: 'What does the GOV.UK example of a 21 year old apprentice show?', a: `That age stops mattering in the first year and starts mattering straight after it. The 21 year old is owed ${h.gbp2(h.C.apprentice)} an hour during year one, then ${h.gbp2(h.rate(2026, 21))}, a rise of ${h.gbp2(h.round2(h.rate(2026, 21) - h.C.apprentice))} an hour, or ${h.pc(h.rate(2026, 21) / h.C.apprentice - 1)}. Under the rates announced for April 2027 the figures would be ${h.gbp2(h.N.apprentice)} and ${h.gbp2(h.rate(2027, 21))}.` },
    ],
    body: (h) => `
<h2>The rule in HMRC's words</h2>
<p>${h.src('hmrc_elig', "HMRC's eligibility guidance")} says that once an apprentice aged 19 or over has completed the first year of their apprenticeship, they must be paid the minimum wage rate for their age group from the first day of the pay reference period that begins on or after their 19th birthday or the completion of the first year. Two conditions must both be met: being 19 or over, and having completed the first year. The rise starts with the pay period that begins once both are true.</p>
<p>The first year is twelve months from the start of the apprenticeship with the current employer. An apprenticeship that began on ${h.date('2025-09-01')} completed its first year on ${h.date('2026-08-31')}.</p>

<h2>One start date, four apprentices</h2>
<p>Four apprentices began on ${h.date('2025-09-01')}, each paid monthly from the 1st and working 30 hours a week. Their ages when the first year ended decide what happens on ${h.date('2026-09-01')}.</p>
${h.table(['Age when year one ends', 'Rate from 1 September 2026', 'Weekly pay before', 'Weekly pay after'], [
  ['18', `${h.gbp2(h.rate(2026, 18, 'after'))}, until the 19th birthday`, h.gbp(h.conv(h.C.apprentice, 30).weekly), h.gbp(h.conv(h.rate(2026, 18, 'after'), 30).weekly)],
  ['19', h.gbp2(h.rate(2026, 19, 'after')), h.gbp(h.conv(h.C.apprentice, 30).weekly), h.gbp(h.conv(h.rate(2026, 19, 'after'), 30).weekly)],
  ['20', h.gbp2(h.rate(2026, 20, 'after')), h.gbp(h.conv(h.C.apprentice, 30).weekly), h.gbp(h.conv(h.rate(2026, 20, 'after'), 30).weekly)],
  ['24', h.gbp2(h.rate(2026, 24, 'after')), h.gbp(h.conv(h.C.apprentice, 30).weekly), h.gbp(h.conv(h.rate(2026, 24, 'after'), 30).weekly)],
], `Rates in force from 1 April 2026, from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'l', 'r', 'r'])}
<p>The 24 year old gains the most, ${h.gbp(h.round2((h.rate(2026, 24) - h.C.apprentice) * 30))} a week. The 18 year old gains nothing yet and moves to ${h.gbp2(h.rate(2026, 19))} with the first pay period that begins on or after their 19th birthday. An apprentice who started a year later, in September 2026, completes the first year in August 2027, after the April 2027 rise, and would move to the rates announced for that year: ${h.gbp2(h.rate(2027, 19))} at 19 or 20, ${h.gbp2(h.rate(2027, 21))} from 21.</p>
<!--tool:mini:apprentice|{"age":24}-->

<h2>The same move when the apprenticeship ends</h2>
<p>The apprentice rate also stops when the apprenticeship itself stops. HMRC's example is an 18 year old in a hair salon: before the apprenticeship she is owed the 18 to 20 rate, during the first year the apprentice rate, after the first year the rate for her age, and if she stays on once the apprenticeship ends, still the rate for her age. Paying the apprentice rate before an apprenticeship starts, or after it ends, is on HMRC's list of common mistakes.</p>
<p>Training time stays paid throughout. After the first year, the hours spent on off-the-job training are paid at the new, higher rate, not the apprentice rate. HMRC's second example is a 25 year old in the second year of a nursery apprenticeship, whose off-the-job training must sit within contracted hours and be paid at least at the National Living Wage.</p>

<h2>When the rise is missed</h2>
<p>Take a 22 year old whose employer forgot the move for 13 weeks of 30 hours. The shortfall is ${h.gbp(h.round2((h.rate(2026, 22) - h.C.apprentice) * 30 * 13))}. Arrears are recalculated at the rate in force when they are paid: settled after 1 April 2027 with the announced rate in force, the same shortfall becomes ${h.gbp(h.arrears(h.round2((h.rate(2026, 22) - h.C.apprentice) * 30 * 13), h.rate(2026, 22), h.rate(2027, 22)))}. Under ${h.src('hmrc_enforce', "HMRC's enforcement rules")}, an employer who receives a notice of underpayment also faces a penalty of up to ${h.pc(h.E.penaltyPct)} of the arrears, capped at ${h.gbp(h.E.penaltyMaxPerWorker)} per worker.</p>
<p>The ${h.src('gov_complaint', 'pay and work rights complaint form')} is the official route to HMRC; Acas answers questions on ${h.E.acasPhone}. The ${h.a('minimum-wage-arrears', 'arrears page')} explains the back pay formula and the ${h.a('report-underpayment', 'underpayment page')} the steps in order.</p>`,
  },
});
