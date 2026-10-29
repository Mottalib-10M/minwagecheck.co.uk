import { definePage } from '../../lib/guide-types';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default definePage({
  id: 'apprentice-minimum-wage',
  group: 'ages',
  order: 9,
  tool: { kind: 'mini:apprentice' },
  mini: { kind: 'mini:convert', props: { appr: 1, age: 17 } },
  related: ['apprentice-pay-after-first-year', 'apprentice-off-the-job-training', 'minimum-wage-19-year-old', 'minimum-wage-16-year-old'],
  sources: ['gov_rates', 'hmrc_elig', 'gov_apprentice', 'si_2026', 'lpc_2027_news'],
  en: {
    slug: 'apprentice-minimum-wage',
    nav: 'Apprentice rate',
    card: 'The apprentice rate, who qualifies as an apprentice, when the lower rate applies and why training hours must be paid.',
    title: 'Apprentice Minimum Wage: £8.00 an Hour and Who It Covers',
    description: 'The apprentice minimum wage is £8.00 an hour from April 2026, with £8.31 announced for April 2027. Who qualifies, how long it lasts and why training is paid.',
    h1: 'Apprentice minimum wage: the rate and who it covers',
    intro: 'Enter your age, the start date of the apprenticeship and your weekly hours: the tool gives the minimum now and once the first year is over.',
    resume: (h) => `The apprentice rate of the minimum wage is ${h.gbp2(h.C.apprentice)} an hour from 1 April 2026 to 31 March 2027, up ${h.pc(h.C.apprentice / h.Y(2025).apprentice - 1, 1)} on April 2025. It applies to apprentices under 19, and to apprentices aged 19 or over during the first year of their apprenticeship with their current employer. After that first year, an apprentice aged 19 or over is owed the rate for their age: ${h.gbp2(h.rate(2026, 19))} at 19 or 20, ${h.gbp2(h.rate(2026, 21))} from 21. The apprentice rate has matched the 16 to 17 rate since April 2022. On ${h.date(h.A.date)} the government announced ${h.gbp2(h.N.apprentice)} from 1 April 2027, still to be set in regulations. The lower rate needs a genuine apprenticeship, under a statutory apprenticeship agreement, a contract of apprenticeship or a recognised government programme; giving a worker the title is not enough. Apprentices are paid for their normal working hours and for the off-the-job training that is part of the apprenticeship. On 30 hours a week the apprentice rate comes to at least ${h.gbp(h.conv(h.C.apprentice, 30).weekly)} a week; in April 2019 it was ${h.gbp2(h.Y(2019).apprentice)} an hour.`,
    faqs: (h) => [
      { q: 'Does a 25 year old apprentice get the apprentice rate?', a: `During the first year, yes. Age does not matter in that year: anyone aged 19 or over can be paid ${h.gbp2(h.C.apprentice)} an hour for the first twelve months of an apprenticeship with their current employer. Once that year is complete, a 25 year old is owed the National Living Wage, ${h.gbp2(h.rate(2026, 25))} under the April 2026 rates, from the start of the next pay period.` },
      { q: 'Can my employer call me an apprentice just to pay the lower rate?', a: 'No. HMRC is clear that simply calling somebody an apprentice is not enough. The worker needs a statutory apprenticeship agreement, a contract of apprenticeship or a place on a recognised government programme. A worker whose training only teaches one specific job is unlikely to count: an apprenticeship should lead to skills that can be used with other employers. In a dispute, a court or tribunal decides.' },
      { q: 'How long must an apprenticeship last in England and Wales?', a: 'In England, a standards apprenticeship that began on or after 1 August 2025 must last at least 8 months, according to HMRC guidance. In Wales, apprenticeships are due to have a minimum length of 12 months from August 2027. The length does not change the rule on pay: the apprentice rate covers the first twelve months for those aged 19 or over, and the whole apprenticeship for those under 19.' },
      { q: 'How has the apprentice rate changed since 2019?', a: `It was ${h.gbp2(h.Y(2019).apprentice)} an hour in April 2019, below the under 18 rate of ${h.gbp2(h.rate(2019, 16))}. The two were brought together in April 2022 at ${h.gbp2(h.Y(2022).apprentice)} and have moved as one since, reaching ${h.gbp2(h.C.apprentice)} in April 2026. Over seven years the apprentice rate has more than doubled, a rise of ${h.pc(h.C.apprentice / h.Y(2019).apprentice - 1)}.` },
    ],
    body: (h) => `
<h2>Who counts as an apprentice</h2>
<p>${h.src('hmrc_elig', "HMRC's eligibility guidance")} recognises three routes to the apprentice rate. The first is a statutory apprenticeship agreement, which in England comes with a contract of employment, an apprenticeship agreement and a commitment statement signed with the training provider. The second is a contract of apprenticeship, which can even be agreed orally, though a written one is good practice. The third covers workers treated as apprentices because they are on a qualifying government programme.</p>
${h.table(['Nation', 'Programmes treated as apprenticeships'], [
  ['England', 'Apprenticeships, Advanced Apprenticeships, Intermediate Level and Advanced Level Apprenticeships, Trailblazer Apprenticeships'],
  ['Scotland', 'Modern Apprenticeships'],
  ['Wales', 'Foundation Apprenticeships, Apprenticeships, Higher Apprenticeships'],
  ['Northern Ireland', 'ApprenticeshipsNI'],
], 'Government arrangements listed by HMRC for minimum wage purposes.', ['l', 'l'])}
<p>A trainee is not the same thing. HMRC notes that the word has no legal meaning: a trainee who does work for the business is a worker and is owed the rate for their age, unless they are a genuine apprentice. Workers on government pre-apprenticeship schemes are outside the minimum wage altogether.</p>

<h2>When the apprentice rate applies</h2>
<p>The rate depends on age and on how far into the apprenticeship the worker is. Under 19, the year makes no difference.</p>
${h.table(['Age of the apprentice', 'In the first year', 'After the first year'], [
  ['16 to 18', h.gbp2(h.rate(2026, 17, 'first')), h.gbp2(h.rate(2026, 17, 'after'))],
  ['19 to 20', h.gbp2(h.rate(2026, 19, 'first')), h.gbp2(h.rate(2026, 19, 'after'))],
  ['21 and over', h.gbp2(h.rate(2026, 21, 'first')), h.gbp2(h.rate(2026, 21, 'after'))],
], `Hourly minimum under the April 2026 rates. Source: ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r'])}
<p>The first year is counted with the current employer. An apprentice who reaches 19 after the first year is over moves to the age rate from the first pay period that begins on or after the 19th birthday. The ${h.a('apprentice-pay-after-first-year', 'page on pay after the first year')} works through the dates.</p>

<h2>The apprentice rate since 2019</h2>
${h.table(['From April', 'Apprentice rate', 'Under 18 rate', 'Week of 30 hours, apprentice'], YEARS.map((y) => [y === 2027 ? `${y} (announced)` : String(y), h.gbp2(h.Y(y).apprentice), h.gbp2(h.rate(y, 16)), h.gbp(h.conv(h.Y(y).apprentice, 30).weekly)]), `April 2026 rates set by ${h.src('si_2026', 'SI 2026/357')}; April 2027 per the ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}.`, ['l', 'r', 'r', 'r'])}
<p>Until March 2022 apprentices could be paid less than any other worker. Since then the apprentice rate and the under 18 rate have been one figure, which is why a 17 year old apprentice and a 17 year old shop worker are owed the same.</p>
<!--tool:mini:april2027|{"age":17,"appr":1,"h":30}-->

<h2>What an apprentice must be paid for</h2>
<p>The ${h.src('gov_apprentice', 'GOV.UK page for apprentices')} says apprentices are paid for their normal working hours and for training that is part of the apprenticeship. HMRC warns that apprentices are exposed to underpayment in four ways in particular:</p>
<ul>
<li>time added to a shift that goes unpaid, such as handover meetings or passing through security checks;</li>
<li>deductions for items connected with the job, such as uniforms and tools;</li>
<li>being overcharged for accommodation the employer provides;</li>
<li>tips from customers being used to make up minimum wage pay.</li>
</ul>
<p>Training time is the biggest of these for many apprentices: a college day left unpaid lowers the real hourly rate for the whole pay period. The ${h.a('apprentice-off-the-job-training', 'page on off-the-job training')} shows the calculation. An apprentice who thinks they have been paid too little can call Acas on ${h.E.acasPhone}, ${h.E.acasHours}, or use the ${h.src('gov_complaint', 'pay and work rights complaint form')}.</p>`,
  },
});
