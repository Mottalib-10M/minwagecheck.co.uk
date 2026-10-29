import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-monthly',
  group: 'pay',
  order: 2,
  tool: { kind: 'mini:convert', props: { h: 40 } },
  mini: { kind: 'mini:salaried' },
  related: ['minimum-wage-weekly', 'minimum-wage-annual-salary', 'salaried-hours-minimum-wage', 'pay-reference-period'],
  sources: ['gov_rates', 'hmrc_calc', 'hmrc_hours', 'rates_thresholds'],
  en: {
    slug: 'minimum-wage-monthly',
    nav: 'Monthly pay',
    card: 'Minimum monthly pay at each rate, why a month is a twelfth of 52 weeks and how a monthly pay period is checked for hourly and salaried workers.',
    title: 'Minimum Wage Monthly Pay: Gross Amounts at Every Legal Rate',
    description: 'Minimum wage per month: £2,203.07 for 40 hours at 21 and over, £1,880.67 at 18 to 20. Why a month is a twelfth of 52 weeks, and how monthly periods are checked.',
    h1: 'Minimum wage per month: what each rate comes to',
    intro: 'The hours are set to 40 a week: change your age, apprenticeship, year or hours to see the monthly minimum with the weekly and yearly figures.',
    resume: (h) => `The monthly minimum wage is worked out from the year: hourly rate × weekly hours × 52 weeks, divided by 12. From 1 April 2026, a 40-hour week comes to ${h.gbp(h.conv(h.rate(2026, 21), 40).monthly)} a month at the National Living Wage of ${h.gbp2(h.rate(2026, 21))}, ${h.gbp(h.conv(h.rate(2026, 18), 40).monthly)} at the 18 to 20 rate and ${h.gbp(h.conv(h.rate(2026, 16), 40).monthly)} at the 16 to 17 and apprentice rate; at 37.5 hours the National Living Wage gives ${h.gbp(h.conv(h.rate(2026, 21), 37.5).monthly)}. Those are averages. A worker paid by the hour for a calendar month must receive the rate for every hour actually worked in that month, so a month with 23 working days of 8 hours needs ${h.gbp(h.round2(h.rate(2026, 21) * 184))} at 21 and over, against ${h.gbp(h.round2(h.rate(2026, 21) * 160))} in a month of 20 days. A month is the longest pay reference period the law allows. For salaried workers, HMRC divides the basic annual hours by 12 and treats each month as holding the same number of hours. With the rates announced on ${h.date(h.A.date)} for April 2027, still to be set in regulations, 40 hours a week at 21 and over would come to ${h.gbp(h.conv(h.rate(2027, 21), 40).monthly)} a month.`,
    faqs: (h) => [
      { q: 'Why does my monthly minimum change from one month to the next?', a: `Because you are paid by the hour and months hold different numbers of working days. The law checks each monthly pay period against the hours worked in it. At ${h.gbp2(h.rate(2026, 21))} an hour, 160 hours in a short month need ${h.gbp(h.round2(h.rate(2026, 21) * 160))}, while 184 hours in a long month need ${h.gbp(h.round2(h.rate(2026, 21) * 184))}. A salaried worker on a fixed monthly amount is checked differently.` },
      { q: 'Can a pay reference period be longer than one month?', a: 'No. HMRC defines the pay reference period as the time a payment covers, which can be any length up to one calendar month and never more. A worker paid quarterly is still checked month by month. An annual bonus mostly counts in the month it is paid, though HMRC allows one twelfth of it to count towards the month before, as its worked example shows.' },
      { q: 'What is the monthly minimum for 37.5 hours a week?', a: `Under the April 2026 rates: ${h.gbp(h.conv(h.rate(2026, 21), 37.5).monthly)} at 21 and over, ${h.gbp(h.conv(h.rate(2026, 18), 37.5).monthly)} at 18 to 20 and ${h.gbp(h.conv(h.rate(2026, 16), 37.5).monthly)} for 16 and 17 year olds and apprentices on the apprentice rate. With the rates announced for April 2027, the top figure would become ${h.gbp(h.conv(h.rate(2027, 21), 37.5).monthly)}. All are gross amounts before tax.` },
      { q: 'Does overtime paid a month late still count for the month I worked it?', a: 'Yes, if it is paid in the next pay period. HMRC counts pay earned in one period but received in the following one towards the period in which it was earned, which covers overtime worked after the payroll cut-off. If payment is delayed by more than one period, it usually counts towards the period in which it is paid instead, and the same pay can never count twice.' },
    ],
    body: (h) => `
<h2>Monthly pay at each rate</h2>
<p>A year has 52 weeks, so an average month holds 52 ÷ 12 weeks, a little over four and a third. The table gives the average hours that makes per month for common contracts, and the minimum monthly pay at each rate in force from 1 April 2026.</p>
${h.table(['Hours a week', 'Average hours a month', '21 and over', '18 to 20', '16 to 17 and apprentices'], [16, 20, 25, 30, 37.5, 40].map((n) => [h.num(n, n % 1 ? 1 : 0), h.num(n * 52 / 12, 1), h.gbp(h.conv(h.rate(2026, 21), n).monthly), h.gbp(h.conv(h.rate(2026, 18), n).monthly), h.gbp(h.conv(h.rate(2026, 16), n).monthly)]), `Gross monthly pay. Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r', 'r'])}

<h2>Why the average month is not four weeks</h2>
<p>Multiplying a weekly wage by four leaves out about four weeks a year. A 40-hour week at ${h.gbp2(h.rate(2026, 21))} is ${h.gbp(h.conv(h.rate(2026, 21), 40).weekly)}; four of them make ${h.gbp(h.round2(h.conv(h.rate(2026, 21), 40).weekly * 4))}, but the true average month is ${h.gbp(h.conv(h.rate(2026, 21), 40).monthly)}, a difference of ${h.gbp(h.round2(h.conv(h.rate(2026, 21), 40).monthly - h.conv(h.rate(2026, 21), 40).weekly * 4))}. Workers paid every four weeks receive 13 payments a year rather than 12, and each four-week period is checked on its own hours.</p>

<h2>Monthly pay periods for hourly paid workers</h2>
<p>${h.src('hmrc_calc', "HMRC's guidance")} allows a pay reference period of up to one calendar month. For a worker paid by the hour and paid monthly, the check is the pay that counts for the month against the hours actually worked in it. The minimum therefore moves with the calendar.</p>
${h.table(['Working days in the month', 'Hours at 8 a day', 'Minimum at 21 and over', 'Minimum at 18 to 20'], [20, 21, 22, 23].map((d) => [String(d), String(d * 8), h.gbp(h.round2(h.rate(2026, 21) * d * 8)), h.gbp(h.round2(h.rate(2026, 18) * d * 8))]), 'April 2026 rates. Hours that count include training and required waiting time.', ['l', 'r', 'r', 'r'])}
<p>A payment that arrives late can still count for the right month if it is paid in the next period, as with overtime after the cut-off. And the April rise applies from the first monthly period starting on or after 1 April: a worker whose month runs from the 16th to the 15th moved to the new rate on 16 April 2026.</p>
<!--tool:mini:prp|{"age":21,"f":3,"h":184,"g":2300}-->

<h2>Monthly salaries: notional hours</h2>
<p>A salaried worker paid the same amount each month is checked on notional hours, not the hours of the month. ${h.src('hmrc_hours', "HMRC's guidance on working hours")} divides the basic annual hours by 12 and says to assume those hours are worked even in months with more or fewer working days. On a contract of 1,920 hours a year, that is 160 hours every month.</p>
<p>A salary of ${h.gbp(2100)} a month on that contract works out at ${h.gbp2(h.round2(Math.floor((2100 / 160) * 100) / 100))} an hour: above the ${h.gbp2(h.rate(2026, 25))} in force since April 2026, but below the ${h.gbp2(h.rate(2027, 25))} announced for April 2027. Unless the salary is raised by then, the employer would have to pay more from the first monthly period starting on or after 1 April 2027, once the new rates are in force. The ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} covers extra hours beyond the contract.</p>

<h2>Monthly figures and tax</h2>
<p>The personal allowance for 2026 to 2027 is ${h.gbp(h.TAX['2026'].personalAllowance)} a year, about ${h.gbp(Math.round(h.TAX['2026'].personalAllowance / 12))} a month in the ${h.src('rates_thresholds', "HMRC's employer tables")}. A National Living Wage job of 20 hours a week pays ${h.gbp(h.conv(h.rate(2026, 21), 20).monthly)} a month, so a small part of it is taxed; at 16 hours, the monthly pay stays under the allowance. The ${h.a('minimum-wage-annual-salary', 'annual salary page')} turns any pattern of hours into a yearly figure.</p>`,
  },
});
