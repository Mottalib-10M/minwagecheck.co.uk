import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-17-year-old',
  group: 'ages',
  order: 3,
  tool: { kind: 'mini:convert', props: { age: 17, h: 20 } },
  mini: { kind: 'mini:birthday' },
  related: ['minimum-wage-18-year-old', 'birthday-pay-rise', 'minimum-wage-16-year-old', 'pay-reference-period', 'minimum-wage-arrears'],
  sources: ['gov_rates', 'hmrc_calc', 'working_hours', 'rest_breaks', 'hmrc_hours'],
  en: {
    slug: 'minimum-wage-17-year-old',
    nav: 'Aged 17',
    card: 'Pay at 17, the jump to the 18 to 20 rate after the 18th birthday, and the hour and break limits for workers under 18.',
    title: 'Minimum Wage at 17: £8 Now, £10.85 From Your 18th Birthday',
    description: 'At 17 the legal minimum is £8.00 an hour, rising to £10.85 from the first pay period after the 18th birthday. Weekly pay, the 40-hour cap and the breaks due.',
    h1: 'Minimum wage at 17: pay now and the step up at 18',
    intro: 'Your age and hours are filled in for a 17 year old on 20 hours a week: change them to see the minimum per week, month and year.',
    resume: (h) => `At 17 the legal minimum is the 16 to 17 rate, ${h.gbp2(h.rate(2026, 17))} an hour from 1 April 2026 to 31 March 2027. The biggest pay rise a young worker gets from the law comes a year later: from the first pay reference period that starts on or after the 18th birthday, the 18 to 20 rate of ${h.gbp2(h.rate(2026, 18))} applies, ${h.gbp2(h.round2(h.rate(2026, 18) - h.rate(2026, 17)))} more per hour, or ${h.pc(h.rate(2026, 18) / h.rate(2026, 17) - 1, 1)}. On 20 hours a week that lifts the minimum from ${h.gbp(h.conv(h.rate(2026, 17), 20).weekly)} to ${h.gbp(h.conv(h.rate(2026, 18), 20).weekly)}. For a birthday on or after 1 April 2027, the rates announced on ${h.date(h.A.date)} would apply instead: ${h.gbp2(h.rate(2027, 17))} before and ${h.gbp2(h.rate(2027, 18))} after. Until 18, the working time rules are tighter than for adults: no more than ${h.YNG.under18MaxDay} hours a day or ${h.YNG.under18MaxWeek} hours a week, with no averaging and no opt-out, a ${h.YNG.under18BreakMinutes} minute break on any shift of more than ${h.num(h.YNG.under18BreakAfterHours, 1)} hours, 12 hours' rest between working days and 48 hours' rest each week.`,
    faqs: (h) => [
      { q: 'My 18th birthday is midweek: which days are paid at the higher rate?', a: `None of that pay week, if the week began before the birthday. The 18 to 20 rate starts with the first pay reference period that begins on or after the birthday. A worker paid weekly from Monday who turns 18 on Wednesday ${h.date('2026-10-14')} moves to ${h.gbp2(h.rate(2026, 18))} from Monday ${h.date('2026-10-19')}. The same rule moves everyone to the new April rates each year.` },
      { q: 'Can a 17 year old agree to work more than 40 hours in a week?', a: `No. Workers above school leaving age and under 18 may work at most ${h.YNG.under18MaxDay} hours a day and ${h.YNG.under18MaxWeek} hours a week. Unlike the adult limit, these hours cannot be averaged over several weeks, and there is no opt-out to sign. Extra pay does not make longer hours lawful, even when the hourly rate is well above the minimum.` },
      { q: 'Is the 30 minute break counted in a 17 year old\'s paid hours?', a: `Not for the minimum wage, unless the contract pays for it. HMRC counts time spent working at the workplace, and rest breaks are left out. An eight-hour shift with a ${h.YNG.under18BreakMinutes} minute break is 7.5 hours of working time, so the minimum for that day is ${h.gbp2(h.round2(h.rate(2026, 17) * 7.5))} at ${h.gbp2(h.rate(2026, 17))} an hour.` },
      { q: 'What will a 17 year old earn after turning 18 in summer 2027?', a: `If the announced rates are set in regulations as planned, a worker turning 18 after 1 April 2027 moves from ${h.gbp2(h.rate(2027, 17))} to ${h.gbp2(h.rate(2027, 18))} an hour, ${h.gbp2(h.round2(h.rate(2027, 18) - h.rate(2027, 17)))} more. On 20 hours a week that is ${h.gbp2(h.round2((h.rate(2027, 18) - h.rate(2027, 17)) * 20))} extra each week, from the first pay period that starts on or after the birthday.` },
    ],
    body: (h) => `
<h2>The step up at 18</h2>
<p>The law groups 16 and 17 year olds in one band and 18 to 20 year olds in the next, so the 18th birthday brings the largest age-based rise on the scale. Which rates apply depends on whether the birthday falls before or after the April change.</p>
${h.table(['18th birthday falls', 'Rate at 17', 'Rate at 18', 'Extra on a 20-hour week'], [
  ['1 April 2026 to 31 March 2027', h.gbp2(h.rate(2026, 17)), h.gbp2(h.rate(2026, 18)), h.gbp2(h.round2((h.rate(2026, 18) - h.rate(2026, 17)) * 20))],
  ['From 1 April 2027 (announced)', h.gbp2(h.rate(2027, 17)), h.gbp2(h.rate(2027, 18)), h.gbp2(h.round2((h.rate(2027, 18) - h.rate(2027, 17)) * 20))],
], `Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}; April 2027 figures announced on ${h.date(h.A.date)}, regulations still to be made.`, ['l', 'r', 'r', 'r'])}
<p>The rise does not follow the calendar day. ${h.src('hmrc_calc', "HMRC's guidance")} applies the same approach to birthdays as to the April rise: the higher rate covers each pay reference period that starts on or after the date.</p>

<h2>Finding the first pay period at 18</h2>
<p>A pay reference period is the stretch of time a payment covers: a week, two weeks, four weeks or a month, never longer. Two examples show how far the start of the new rate can fall from the birthday itself.</p>
<p>Jade is paid weekly for Monday to Sunday and turns 18 on Wednesday ${h.date('2026-10-14')}. The week that began on Monday 12 October stays at ${h.gbp2(h.rate(2026, 17))}; the 18 to 20 rate applies from Monday ${h.date('2026-10-19')}, five days after the birthday.</p>
<p>Owen is paid monthly for the period running from the 16th of one month to the 15th of the next, and turns 18 on ${h.date('2026-11-21')}. His period from 16 November started before the birthday, so the higher rate begins on ${h.date('2026-12-16')}, almost four weeks later. A worker paid for calendar months whose birthday falls on the 2nd waits close to a whole month in the same way. The ${h.a('birthday-pay-rise', 'birthday rise page')} has more cases, including a birthday close to 1 April.</p>

<h2>Hours and breaks while you are 17</h2>
<p>The ${h.src('working_hours', 'working time rules')} protect young workers more than adults, and the difference ends on the 18th birthday.</p>
${h.table(['Rule', 'Under 18', '18 and over'], [
  ['Weekly hours', `${h.YNG.under18MaxWeek} at most, never averaged, no opt-out`, '48 on average, opt-out possible'],
  ['Break during the shift', `${h.YNG.under18BreakMinutes} minutes if working more than ${h.num(h.YNG.under18BreakAfterHours, 1)} hours`, `${h.YNG.adultBreakMinutes} minutes if working more than ${h.YNG.adultBreakAfterHours} hours`],
], `Sources: ${h.src('working_hours', 'GOV.UK maximum weekly working hours')} and ${h.src('rest_breaks', 'rest breaks at work')}.`, ['l', 'l', 'l'])}
<p>On top of the weekly cap, a 17 year old may not work more than ${h.YNG.under18MaxDay} hours in a day, must have 12 hours' rest between working days and 48 hours' rest each week. For pay, rest breaks are not working time under ${h.src('hmrc_hours', "HMRC's rules on hours")} unless the contract pays for them, so a long shift with a half-hour break counts half an hour less.</p>
<!--tool:mini:young|{"h":30}-->

<h2>Weekly pay just before and just after 18</h2>
<p>For a 17 year old on regular hours, this is what the same week is worth on either side of the birthday under the April 2026 rates.</p>
${h.table(['Hours in the week', 'At 17', 'At 18', 'Extra over a year'], [12, 20, 30, 40].map((n) => [`${n} hours`, h.gbp(h.conv(h.rate(2026, 17), n).weekly), h.gbp(h.conv(h.rate(2026, 18), n).weekly), h.gbp(h.round2(h.conv(h.rate(2026, 18), n).annual - h.conv(h.rate(2026, 17), n).annual))]), 'Gross pay. A year is 52 weeks.', ['l', 'r', 'r', 'r'])}
<p>At 40 hours the gap is worth more than ${h.gbp(5000)} a year. Once 18, the 40-hour cap falls away, though the adult limit of 48 hours on average still applies unless the worker opts out.</p>

<h2>If the payslip stays at the old rate</h2>
<p>An employer that keeps paying ${h.gbp2(h.rate(2026, 17))} after the first full pay period at 18 owes the difference as arrears, and arrears are repaid at the rate in force when they are paid, not the old one. Keep payslips and a note of the birthday. The first step is to raise it with the employer; after that, Acas answers on ${h.E.acasPhone}, and the ${h.src('gov_complaint', 'pay and work rights complaint form')} reaches HMRC, which enforces the minimum wage. The ${h.a('minimum-wage-arrears', 'arrears page')} shows the calculation.</p>`,
  },
});
