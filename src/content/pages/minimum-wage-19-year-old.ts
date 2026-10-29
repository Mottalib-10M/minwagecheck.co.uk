import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-19-year-old',
  group: 'ages',
  order: 5,
  tool: { kind: 'mini:apprentice', props: { age: 19 } },
  mini: { kind: 'mini:convert', props: { age: 19 } },
  related: ['apprentice-minimum-wage', 'apprentice-pay-after-first-year', 'minimum-wage-18-year-old', 'minimum-wage-20-year-old'],
  sources: ['gov_rates', 'hmrc_elig', 'gov_apprentice', 'si_2026'],
  en: {
    slug: 'minimum-wage-19-year-old',
    nav: 'Aged 19',
    card: 'At 19 the minimum depends on apprenticeship: the 18 to 20 rate, or the apprentice rate during a first year, and when it changes.',
    title: 'Minimum Wage at 19: Apprentice Rate or £10.85 an Hour',
    description: 'At 19 you are owed £10.85 an hour, or £8.00 in the first year of an apprenticeship. When a 19 year old apprentice moves up, with weekly pay and 2027 rates.',
    h1: 'Minimum wage at 19: the 18 to 20 rate or the apprentice rate',
    intro: 'Enter your age, the date your apprenticeship started and your weekly hours: the tool shows the minimum now and after the first year.',
    resume: (h) => `At 19 the legal minimum depends on one question: are you an apprentice in the first year of your apprenticeship? If not, you are owed the 18 to 20 rate, ${h.gbp2(h.rate(2026, 19))} an hour from 1 April 2026 to 31 March 2027. If you are an apprentice aged 19 in the first year with your current employer, the apprentice rate applies, ${h.gbp2(h.rate(2026, 19, 'first'))} an hour, ${h.gbp2(h.round2(h.rate(2026, 19) - h.rate(2026, 19, 'first')))} less. Once a 19 year old apprentice has completed that first year, the rate for their age applies from the first pay reference period that begins on or after the 19th birthday or the end of the first year. On 30 hours a week the difference between the two rates is ${h.gbp(h.round2((h.rate(2026, 19) - h.rate(2026, 19, 'first')) * 30))} a week. Under the rates announced on ${h.date(h.A.date)} for April 2027, still to be set in regulations, the figures become ${h.gbp2(h.rate(2027, 19))} and ${h.gbp2(h.rate(2027, 19, 'first'))}. Being 19 rather than 18 brings no rise for other workers: both ages share one band until the National Living Wage starts at 21.`,
    faqs: (h) => [
      { q: 'I was an apprentice at 18 and turned 19 in my second year: when does my pay go up?', a: `From the first pay reference period that begins on or after your 19th birthday. Your first year is already over, so the apprentice rate stops applying once you are 19, and the 18 to 20 rate of ${h.gbp2(h.rate(2026, 19))} takes over. If you are paid monthly from the 1st and turn 19 on the 10th, the higher rate starts on the 1st of the next month.` },
      { q: 'Can a 19 year old starting an apprenticeship be paid less than in their old job?', a: `Yes, for the first year. A 19 year old in a normal job is owed ${h.gbp2(h.rate(2026, 19))}, but the apprentice rate of ${h.gbp2(h.C.apprentice)} covers anyone aged 19 or over during the first year of an apprenticeship with their current employer. It only applies to a genuine apprenticeship under an apprenticeship agreement or a contract of apprenticeship. After twelve months the rate for their age applies again.` },
      { q: 'What happens to a 19 year old apprentice\'s pay when the apprenticeship ends?', a: `The apprentice rate ends with the apprenticeship. A 19 year old who stays with the employer is owed the rate for their age, ${h.gbp2(h.rate(2026, 19))} under the April 2026 rates. HMRC lists paying the apprentice rate after an apprenticeship has ended, or before it has begun, among the common causes of underpayment it finds.` },
      { q: 'Is a 19 year old owed more per hour than an 18 year old?', a: `No. The 18 to 20 band covers both, so an 18 year old and a 19 year old in the same job are each owed at least ${h.gbp2(h.rate(2026, 18))} an hour. The 19th birthday only changes things for apprentices, because the apprentice rate after the first year depends on being 19 or over. The next step for everyone else comes at 21.` },
    ],
    body: (h) => `
<h2>Three situations at 19</h2>
<p>The ${h.src('gov_rates', 'GOV.UK rates page')} and ${h.src('hmrc_elig', "HMRC's eligibility guidance")} give the rule in two lines: the apprentice rate applies to apprentices under 19, and to apprentices aged 19 or over in the first year of their apprenticeship. Everyone else is owed the rate for their age.</p>
${h.table(['At 19, you are', 'Until 31 March 2027', 'From 1 April 2027 (announced)', 'Rate that applies'], [
  ['Not an apprentice', h.gbp2(h.rate(2026, 19)), h.gbp2(h.rate(2027, 19)), '18 to 20'],
  ['An apprentice in the first year', h.gbp2(h.rate(2026, 19, 'first')), h.gbp2(h.rate(2027, 19, 'first')), 'Apprentice'],
  ['An apprentice past the first year', h.gbp2(h.rate(2026, 19, 'after')), h.gbp2(h.rate(2027, 19, 'after')), '18 to 20'],
], 'Hourly minimum. April 2027 figures announced on 28 October 2026, regulations still to be made.', ['l', 'r', 'r', 'l'])}
<p>The first year is counted with the current employer. Twelve months after the start date it is over, and a 19 year old moves to the age rate from the next pay reference period that begins after that point.</p>

<h2>Two apprentices, two different dates</h2>
<p>Mia began an apprenticeship at 17, in September 2025. Her first year ended in August 2026, while she was still 18, so she stayed on ${h.gbp2(h.C.apprentice)}, as every apprentice under 19 does. She turns 19 on ${h.date('2027-03-10')}. Paid monthly from the 1st, she moves to ${h.gbp2(h.rate(2026, 19))} from ${h.date('2027-04-01')}, the same day the April 2027 rates are due to start, which would take her straight to ${h.gbp2(h.rate(2027, 19))} once those rates are in force.</p>
<p>Leo is the opposite case. He turned 19 in May 2026 while working in a shop on ${h.gbp2(h.rate(2026, 19))}, then started an apprenticeship with a new employer on ${h.date('2026-09-01')}. As a first-year apprentice he can lawfully be paid ${h.gbp2(h.C.apprentice)} until ${h.date('2027-08-31')}. From the first pay period starting on or after ${h.date('2027-09-01')} he is owed the 18 to 20 rate in force then, ${h.gbp2(h.rate(2027, 19))} under the announced figures.</p>
<!--tool:mini:april2027|{"age":19,"appr":1,"h":30}-->

<h2>What a week is worth at 19</h2>
<p>The table sets the two rates side by side for common patterns of hours under the April 2026 figures. The gap is what a first year of apprenticeship costs a 19 year old compared with an ordinary job, before any pay the employer chooses to add above the minimum.</p>
${h.table(['Hours a week', 'Not an apprentice', 'First-year apprentice', 'Gap over 52 weeks'], [20, 30, 37.5, 40].map((n) => [h.num(n, n % 1 ? 1 : 0), h.gbp(h.conv(h.rate(2026, 19), n).weekly), h.gbp(h.conv(h.C.apprentice, n).weekly), h.gbp(h.round2(h.conv(h.rate(2026, 19), n).annual - h.conv(h.C.apprentice, n).annual))]), 'Gross weekly pay at the April 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>Apprentices are paid for their training as well as their work: time spent on off-the-job training that is part of the apprenticeship counts as working time and must be paid at least the rate that applies, as the ${h.src('gov_apprentice', 'GOV.UK page for apprentices')} confirms.</p>

<h2>Mistakes HMRC finds with apprentices of this age</h2>
<p>HMRC says that the wrong use of the apprentice rate is a common reason for underpayment. The cases it lists fit the age of 19 closely:</p>
<ul>
<li>keeping an apprentice aged 19 or over on the apprentice rate after the first year is complete;</li>
<li>paying the apprentice rate to a worker who is not an apprentice, when calling someone an apprentice is not enough;</li>
<li>not paying for time spent in training, on or off the job, including English and maths;</li>
<li>paying the apprentice rate before the apprenticeship starts or after it ends.</li>
</ul>
<p>Each of these leaves arrears, owed at the rate in force when they are repaid. A 19 year old who spots one can raise it with the employer, call Acas on ${h.E.acasPhone} or use the ${h.src('gov_complaint', 'official complaint form')}. The ${h.a('apprentice-pay-after-first-year', 'page on pay after the first year')} goes through the move in more detail.</p>`,
  },
});
