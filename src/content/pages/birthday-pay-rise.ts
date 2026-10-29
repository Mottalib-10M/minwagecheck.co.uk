import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'birthday-pay-rise',
  group: 'ages',
  order: 8,
  tool: { kind: 'mini:birthday' },
  mini: { kind: 'mini:prp' },
  related: ['pay-reference-period', 'minimum-wage-17-year-old', 'minimum-wage-20-year-old', 'minimum-wage-arrears'],
  sources: ['hmrc_calc', 'gov_rates', 'si_2026', 'lpc_2027_news'],
  en: {
    slug: 'birthday-pay-rise',
    nav: 'Birthday pay rise',
    card: 'Why a higher rate at 18 or 21 starts with the next pay period rather than on the birthday, with weekly and monthly examples.',
    title: 'Birthday Pay Rise at 18 and 21: When the New Rate Starts',
    description: 'Turning 18 or 21 raises the minimum wage from the first pay period that starts on or after the birthday, not on the day itself. Weekly and monthly examples.',
    h1: 'Birthday pay rise: when a higher minimum wage starts',
    intro: 'Enter a date of birth, how often you are paid and the start date of any one pay period: the tool finds the first period at the higher rate.',
    resume: (h) => `A birthday that moves a worker into a higher band raises the legal minimum from the first pay reference period that starts on or after the birthday, not from the birthday itself. HMRC's ${h.src('hmrc_calc', 'guidance on calculating the minimum wage')} applies exactly the same approach as for the yearly rise on 1 April. Two birthdays matter for most workers: at 18 the rate goes from ${h.gbp2(h.rate(2026, 17))} to ${h.gbp2(h.rate(2026, 18))} an hour, and at 21 from ${h.gbp2(h.rate(2026, 18))} to ${h.gbp2(h.rate(2026, 21))}, under the rates in force from 1 April 2026. A worker paid weekly waits at most six days; a worker paid by the calendar month whose birthday falls on the 2nd waits until the 1st of the next month. When the pay period happens to begin on the birthday, the new rate applies at once. A birthday shortly before 1 April can bring both rises into the same pay period: under the rates announced on ${h.date(h.A.date)}, a worker turning 21 in March 2027 and paid monthly from the 1st could move from ${h.gbp2(h.rate(2026, 20))} straight to ${h.gbp2(h.rate(2027, 21))} on 1 April 2027, once the regulations are made.`,
    faqs: (h) => [
      { q: 'If my pay period starts on my birthday, do I get the new rate straight away?', a: `Yes. The rule covers pay periods that start on or after the birthday, and on includes the day itself. A worker paid weekly from Saturday who turns 21 on Saturday ${h.date('2026-11-21')} is owed ${h.gbp2(h.rate(2026, 21))} for the whole week that starts that day. Had the birthday been the Sunday, the higher rate would have waited six days.` },
      { q: 'My birthday is just before 1 April: can both rises land together?', a: `Yes, when the first pay period after the birthday is also the first one starting on or after 1 April. Paid by calendar month and turning 21 on ${h.date('2027-03-02')}, a worker stays at ${h.gbp2(h.rate(2026, 20))} for March and moves on 1 April 2027 to the National Living Wage for that year, announced at ${h.gbp2(h.rate(2027, 21))}, without ever being paid ${h.gbp2(h.rate(2026, 21))}.` },
      { q: 'Which birthdays change the legal minimum wage at all?', a: 'For most workers only two: 18 and 21. The 17th, 19th and 20th birthdays leave the rate where it is, and nothing changes after 21. Apprentices are the exception, because an apprentice who has finished the first year moves to the rate for their age at 19. Below that, the right to any minimum depends on passing school leaving age, which is a date in the school calendar rather than a birthday.' },
      { q: 'My employer moved me to the adult rate a month late: what am I owed?', a: `The difference for every hour in the periods that should have been paid at the higher rate. Someone moved to the National Living Wage one month late after working 150 hours is short by ${h.gbp2(h.round2((h.rate(2026, 21) - h.rate(2026, 20)) * 150))}. Arrears are repaid at the current rate for the band, so the employer pays more if the rate has risen since.` },
    ],
    body: (h) => `
<h2>The two steps on the age scale</h2>
<p>Each band covers an age on the first day of the pay reference period. Moving to a new band therefore waits for a new period to begin.</p>
${h.table(['Birthday', 'Rate before', 'Rate after, April 2026 rates', 'Rate after, April 2027 rates (announced)'], [
  ['18th', h.gbp2(h.rate(2026, 17)), h.gbp2(h.rate(2026, 18)), h.gbp2(h.rate(2027, 18))],
  ['21st', h.gbp2(h.rate(2026, 20)), h.gbp2(h.rate(2026, 21)), h.gbp2(h.rate(2027, 21))],
  ['19th, apprentice past the first year', h.gbp2(h.C.apprentice), h.gbp2(h.rate(2026, 19)), h.gbp2(h.rate(2027, 19))],
], `Hourly minimum. Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r'])}

<h2>Why the pay period decides</h2>
<p>The minimum wage is checked one pay reference period at a time: all the pay that counts for the period, divided by all the hours worked in it, must reach the rate that applies. HMRC's guidance gives the example of the April rise: when a worker's period runs from the 16th of each month, the old rate covers 16 March to 15 April and the new rate begins on 16 April. The guidance adds that the same approach applies when a worker reaches a birthday that makes them eligible for a higher rate.</p>
<p>So the start date depends on two things only: the birthday and the date the worker's pay periods begin. Payday makes no difference. A worker paid on the 28th for a calendar month still has periods that start on the 1st.</p>

<h2>Worked examples by pay cycle</h2>
${h.table(['Paid', 'Periods start', 'Birthday', 'Higher rate from', 'Wait'], [
  ['Weekly', 'Saturdays', `Saturday ${h.date('2026-11-21')}`, h.date('2026-11-21'), 'none'],
  ['Weekly', 'Saturdays', `Sunday ${h.date('2026-11-22')}`, h.date('2026-11-28'), '6 days'],
  ['Every two weeks', `Mondays, from ${h.date('2026-09-07')}`, h.date('2026-09-08'), h.date('2026-09-21'), '13 days'],
  ['Monthly', 'the 1st', h.date('2027-01-02'), h.date('2027-02-01'), '30 days'],
  ['Monthly', 'the 16th', h.date('2027-01-15'), h.date('2027-01-16'), '1 day'],
], 'The higher rate covers the first pay reference period that starts on or after the birthday.', ['l', 'l', 'l', 'l', 'r'])}
<p>The examples show that the wait has nothing to do with age. The same birthday can be followed by an almost immediate rise for one worker and a month's wait for a colleague on a different payroll, and both employers are within the law. What would break it is an employer that waits for the next April, or for the next pay review, before applying the new band.</p>
<!--tool:mini:april2027|{"age":20,"h":37.5}-->

<h2>Birthdays close to 1 April</h2>
<p>Two changes can stack. The yearly rise applies from the first period that starts on or after 1 April, and the birthday rule from the first period that starts on or after the birthday. For a worker turning 21 on ${h.date('2027-03-29')} and paid weekly from Monday, the birthday rise comes first, on ${h.date('2027-03-29')}, at ${h.gbp2(h.rate(2026, 21))}; the April rise follows on ${h.date('2027-04-05')}, at the ${h.gbp2(h.rate(2027, 21))} announced for 2027 under the ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}. For a worker paid monthly from the 1st with a birthday in March, both arrive together on 1 April. The April 2027 figures still depend on regulations being made; until then, the rates set by ${h.src('si_2026', 'SI 2026/357')} remain the law.</p>

<h2>Checking the first payslip at the new age</h2>
<p>Take the hours of the first period at the higher rate and multiply them by the new rate: the pay that counts must reach that figure. For a monthly paid worker on 160 hours who has just turned 21, that is ${h.gbp2(h.round2(h.rate(2026, 21) * 160))} under the April 2026 rates. Overtime premiums and tips are left out of the comparison, and a charge for a uniform the job requires is taken off. A shortfall is arrears, repaid at the rate in force when it is paid. The ${h.a('pay-reference-period', 'pay reference period page')} explains how periods are counted, and the ${h.a('minimum-wage-arrears', 'arrears page')} how back pay is worked out.</p>`,
  },
});
