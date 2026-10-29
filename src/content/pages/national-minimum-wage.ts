import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'national-minimum-wage',
  group: 'rates',
  order: 4,
  tool: { kind: 'check', props: { age: 19, hours: 80, gross: 850 } },
  mini: { kind: 'mini:convert', props: { yr: 7, age: 19, h: 25 } },
  related: ['national-living-wage', 'who-gets-minimum-wage', 'minimum-wage-18-year-old', 'apprentice-minimum-wage', 'pay-reference-period'],
  sources: ['nmw_act', 'nmw_regs', 'gov_rates', 'hmrc_calc', 'gov_who'],
  en: {
    slug: 'national-minimum-wage',
    nav: 'National Minimum Wage',
    card: 'The bands below 21, the law that sets them, who must be paid them and how one pay period is checked against the rate.',
    title: 'National Minimum Wage: Bands, Rules and a Pay Check',
    description: 'National Minimum Wage bands from April 2026: £10.85 at 18 to 20, £8 at 16 to 17 and for apprentices, the law behind them and a checker for one pay period.',
    h1: 'National Minimum Wage: the bands and how pay is checked',
    intro: 'Enter your age, the hours and the gross pay of one pay period: the checker applies your band and shows the pay that counts.',
    resume: (h) => `The National Minimum Wage is the legal floor for hourly pay in the United Kingdom, created by the National Minimum Wage Act 1998 and applied through the National Minimum Wage Regulations 2015. It has four bands set by age and apprenticeship: since 1 April 2026, ${h.gbp2(h.rate(2026, 21))} at 21 and over (the band called the National Living Wage), ${h.gbp2(h.rate(2026, 18))} at 18 to 20, ${h.gbp2(h.rate(2026, 16))} at 16 and 17, and ${h.gbp2(h.C.apprentice)} for apprentices under 19 or in their first year. From 1 April 2027 the announced bands are ${h.gbp2(h.rate(2027, 21))}, ${h.gbp2(h.rate(2027, 18))}, ${h.gbp2(h.rate(2027, 16))} and ${h.gbp2(h.N.apprentice)}. It covers workers, not only employees: agency staff, casual and zero hours workers, part-timers and apprentices, once they are past compulsory school age. The test is made on each pay reference period of up to a month, comparing the pay that counts with the band rate times the hours of working time.`,
    faqs: (h) => [
      { q: 'Which band applies if I am 20 and an apprentice in my second year?', a: `The apprentice rate covers apprentices under 19 and those aged 19 or over during the first year. At 20 in your second year, you are owed the rate for your age, ${h.gbp2(h.rate(2026, 20))} from April 2026 and ${h.gbp2(h.rate(2027, 20))} from April 2027. Your employer must switch you from the pay period after the first anniversary of your start date.` },
      { q: 'Can an employer pay less to a worker on probation?', a: 'No. The regulations give no lower rate for probation, training periods or new starters. From the first hour a worker is owed the rate for their age, or the apprentice rate if they are on an apprenticeship. An employer may pay a lower contractual rate during probation only if it stays at or above the legal minimum for that worker.' },
      { q: 'Is the minimum wage checked per hour or per pay period?', a: `Per pay reference period, which is at most a month. Over that period the pay that counts, divided by the hours of working time, must reach the rate. A worker on a weekly period with 30 hours must receive at least the rate times 30, in pay that counts, for that week: ${h.gbp(h.round2(h.rate(2026, 25) * 30))} at 21 and over today.` },
    ],
    body: (h) => `
<h2>The bands since 2024</h2>
${h.table(['Band', '2024', '2025', '2026', 'From April 2027'], [
  ['21 and over', h.gbp2(h.rate(2024, 21)), h.gbp2(h.rate(2025, 21)), h.gbp2(h.rate(2026, 21)), h.gbp2(h.rate(2027, 21))],
  ['18 to 20', h.gbp2(h.rate(2024, 18)), h.gbp2(h.rate(2025, 18)), h.gbp2(h.rate(2026, 18)), h.gbp2(h.rate(2027, 18))],
  ['16 to 17', h.gbp2(h.rate(2024, 16)), h.gbp2(h.rate(2025, 16)), h.gbp2(h.rate(2026, 16)), h.gbp2(h.rate(2027, 16))],
  ['Apprentice', h.gbp2(h.Y(2024).apprentice), h.gbp2(h.Y(2025).apprentice), h.gbp2(h.C.apprentice), h.gbp2(h.N.apprentice)],
], `Each column applies from 1 April of its year. Source: ${h.src('gov_rates', 'GOV.UK')}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Older bands, with the National Living Wage at 23 and at 25, are on the ${h.a('minimum-wage-history', 'history page')}. The band is fixed by your age on the first day of the pay reference period, so a birthday in the middle of a period changes nothing until the next one starts.</p>

<h2>Who must be paid it</h2>
<p>The Act protects "workers": people who work under a contract to do the work personally, whether an employment contract or not. That includes agency workers, casual staff, people on zero hours contracts, homeworkers, part-timers and apprentices. It does not cover the genuinely self-employed, company directors without a contract of employment, volunteers, or children of compulsory school age. Some people are excluded by the regulations even when they work, such as students on a placement that their course requires for up to a year. The ${h.a('who-gets-minimum-wage', 'eligibility page')} lists each case and the ${h.a('internships-minimum-wage', 'internships page')} deals with interns.</p>
<p>A contract cannot switch the right off. Under section 49 of the ${h.src('nmw_act', 'Act')}, a clause where you agree to less than the minimum, or to be treated as self-employed when you work as a worker, has no effect on what you are owed.</p>

<h2>How a pay period is checked</h2>
<p>The method set out in HMRC's ${h.src('hmrc_calc', 'guidance on calculating the minimum wage')} has three steps.</p>
<ol>
<li><strong>Pay that counts.</strong> Start from gross pay for the period. Leave out the premium part of overtime and shift pay, tips and service charges, expenses refunded and allowances that are not part of pay. Take off what you paid or had deducted for the employer's purposes, such as a uniform the job requires, and salary sacrificed. Add the accommodation offset where a free room is provided.</li>
<li><strong>Hours that count.</strong> Count the hours of working time in the period, including required training, travel between assignments and time you must be available at the workplace.</li>
<li><strong>Compare.</strong> Pay that counts must be at least the rate for your band times those hours.</li>
</ol>
<p>Take a 19 year old paid ${h.gbp(850)} for 80 hours in a fortnight. Divided by the hours, that is ${h.gbp2(h.pay({ date: '2026-06-01', age: 19, hours: 80, gross: 850 }).hourly)} an hour, above the ${h.gbp2(h.rate(2026, 19))} band. If the employer then deducts ${h.gbp(30)} for a required uniform, the pay that counts drops to ${h.gbp(820)}, or ${h.gbp2(h.pay({ date: '2026-06-01', age: 19, hours: 80, gross: 850, deductions: 30 }).hourly)} an hour, and the period is ${h.gbp(h.pay({ date: '2026-06-01', age: 19, hours: 80, gross: 850, deductions: 30 }).shortfall)} short. The checker above lets you enter each of these items.</p>

<h2>What employers must keep and show</h2>
<p>Employers must keep records that show each worker was paid at least the minimum for every pay reference period, for at least ${h.num(h.E.recordsYears)} years. A worker who believes they were underpaid can ask to see them. If the employer refuses, an employment tribunal can award ${h.num(h.E.recordsAwardHours)} times the hourly minimum. In a claim, it is for the employer to prove the minimum was paid, not for the worker to prove it was not.</p>
<!--tool:mini:arrears|{"yr":7,"age":19,"u":40}-->
<p>Underpayments are repaid as arrears at the current rate of the band, and HMRC can add a penalty. The ${h.a('report-underpayment', 'underpayment page')} sets out how to raise a problem, from a written request to the employer to the official complaint form.</p>`,
  },
});
