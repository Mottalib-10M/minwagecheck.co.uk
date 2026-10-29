import { definePage } from '../../lib/guide-types';

const CONTRACTS = [16, 20, 25];

export default definePage({
  id: 'part-time-minimum-wage',
  group: 'pay',
  order: 5,
  tool: { kind: 'mini:convert', props: { h: 16 } },
  mini: { kind: 'mini:net', props: { h: 20 } },
  related: ['minimum-wage-weekly', 'zero-hours-and-agency-workers', 'minimum-wage-after-tax', 'who-gets-minimum-wage', 'overtime-and-shift-premiums'],
  sources: ['gov_who', 'gov_rates', 'hmrc_calc', 'pensions', 'rates_thresholds'],
  en: {
    slug: 'part-time-minimum-wage',
    nav: 'Part-time',
    card: 'Part-time workers have the same hourly minimum as full-time staff: pay for 16, 20 and 25 hours, tax, pension and unpaid extra time.',
    title: 'Part-Time Minimum Wage: Pay for 16, 20 and 25 Hours a Week',
    description: 'Part-time workers are owed the same hourly minimum as full-time staff: £12.71 at 21 and over. Pay for 16, 20 and 25 hours, and when tax and pension start.',
    h1: 'Part-time minimum wage: the same rate for fewer hours',
    intro: 'The hours are set to 16 a week: change them, your age or the year to see the part-time minimum per week, month and year.',
    resume: (h) => `A part-time worker is owed exactly the same hourly minimum as a full-time colleague of the same age: ${h.gbp2(h.rate(2026, 21))} at 21 and over, ${h.gbp2(h.rate(2026, 18))} at 18 to 20 and ${h.gbp2(h.rate(2026, 16))} at 16 and 17 or on the apprentice rate, from 1 April 2026. GOV.UK lists part-time, casual and zero hours workers among those entitled. At the National Living Wage, 16 hours a week comes to ${h.gbp(h.conv(h.rate(2026, 21), 16).weekly)} a week and ${h.gbp(h.conv(h.rate(2026, 21), 16).annual)} a year, 20 hours to ${h.gbp(h.conv(h.rate(2026, 21), 20).weekly)} and ${h.gbp(h.conv(h.rate(2026, 21), 20).annual)}, and 25 hours to ${h.gbp(h.conv(h.rate(2026, 21), 25).weekly)} and ${h.gbp(h.conv(h.rate(2026, 21), 25).annual)}. A 16-hour job at that rate stays under the personal allowance of ${h.gbp(h.TAX['2026'].personalAllowance)}, so with a standard tax code and no other income no Income Tax is due, yet it passes the ${h.gbp(h.PENSION.trigger)} a year at which a worker aged 22 or over is enrolled in a workplace pension. Part-time staff often work extra hours beyond the contract: each of those hours counts, and unpaid ones pull the average below the rate. The announced April 2027 rate of ${h.gbp2(h.rate(2027, 21))}, still to be set in regulations, would lift a 20-hour week to ${h.gbp(h.conv(h.rate(2027, 21), 20).weekly)}.`,
    faqs: (h) => [
      { q: 'Is a part-time worker owed a lower hourly minimum than full-time staff?', a: `No. The minimum wage depends on age and apprenticeship, never on the number of hours. A 21 year old on 12 hours a week is owed ${h.gbp2(h.rate(2026, 21))} an hour, exactly as a colleague on 40 hours. Casual, zero hours and agency workers are covered in the same way. An employer may pay part-time staff more, but not less.` },
      { q: 'Do I pay tax on 16 hours a week at the National Living Wage?', a: `Not if it is your only income and you have the standard tax code. A year of 16-hour weeks at ${h.gbp2(h.rate(2026, 21))} is ${h.gbp(h.conv(h.rate(2026, 21), 16).annual)}, below the personal allowance of ${h.gbp(h.TAX['2026'].personalAllowance)}. The weekly pay of ${h.gbp(h.conv(h.rate(2026, 21), 16).weekly)} is also below the ${h.gbp(h.TAX['2026'].weekly.pt)} weekly threshold for National Insurance, so nothing is taken from it.` },
      { q: 'Will a 16-hour job put me into a workplace pension?', a: `Yes, if you are aged 22 or over. Automatic enrolment applies to workers from 22 up to State Pension age earning at least ${h.gbp(h.PENSION.trigger)} a year, and 16 hours at the National Living Wage comes to ${h.gbp(h.conv(h.rate(2026, 21), 16).annual)}. The minimum contributions are ${h.pc(h.PENSION.employerMinPct)} from the employer and ${h.pc(h.PENSION.employeeMinPct)} from you, on qualifying earnings.` },
      { q: 'Are extra hours on top of a part-time contract paid at the minimum?', a: `Yes. Every hour worked in the pay period counts. A worker paid ${h.gbp(h.conv(h.rate(2026, 21), 20).weekly)} for 20 contracted hours who stays 4 more hours unpaid has worked 24 hours, which averages ${h.gbp2(h.pay({ date: h.C.from, age: 30, hours: 24, gross: h.conv(h.rate(2026, 21), 20).weekly }).hourly)} an hour, below the National Living Wage. If extra hours are paid at a higher rate, only the premium part is left out of the check.` },
    ],
    body: (h) => `
<h2>Same rate per hour, fewer hours</h2>
<p>The ${h.src('gov_who', 'GOV.UK list of who gets the minimum wage')} names part-time, casual and zero hours workers, agency workers and homeworkers among those entitled. The hours on the contract change the total, not the rate. The table converts short weeks at the National Living Wage.</p>
${h.table(['Hours a week', 'Per week now', 'Per year now', 'Per week from April 2027 (announced)'], [8, 12, 16, 20, 25, 30].map((n) => [`${n} hours`, h.gbp(h.conv(h.rate(2026, 21), n).weekly), h.gbp(h.conv(h.rate(2026, 21), n).annual), h.gbp(h.conv(h.rate(2027, 21), n).weekly)]), `Workers aged 21 and over. Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r'])}

<h2>Three common part-time contracts</h2>
<p>Here is what contracts of 16, 20 and 25 hours mean at the National Living Wage over the 2026 to 2027 tax year, for a worker with one job, the standard tax code and no student loan.</p>
${h.table(['', ...CONTRACTS.map((n) => `${n} hours`)], [
  ['Gross a year', ...CONTRACTS.map((n) => h.gbp(h.conv(h.rate(2026, 21), n).annual))],
  ['Income Tax', ...CONTRACTS.map((n) => h.gbp(h.net(h.conv(h.rate(2026, 21), n).annual, '2026').tax))],
  ['National Insurance', ...CONTRACTS.map((n) => h.gbp(h.net(h.conv(h.rate(2026, 21), n).annual, '2026').ni))],
  ['Take-home a month', ...CONTRACTS.map((n) => h.gbp(h.round2(h.net(h.conv(h.rate(2026, 21), n).annual, '2026').net / 12)))],
  [`Pension enrolment at 22 or over (from ${h.gbp(h.PENSION.trigger)})`, ...CONTRACTS.map((n) => (h.conv(h.rate(2026, 21), n).annual >= h.PENSION.trigger ? 'yes' : 'no'))],
], `Outside Scotland. Thresholds from ${h.src('rates_thresholds', "HMRC's 2026 to 2027 tables")}; pension rule from ${h.src('pensions', 'GOV.UK')}.`, ['l', 'r', 'r', 'r'])}
<p>The 16-hour contract is the only one of the three with no deductions for tax or National Insurance. Pension contributions, when the worker is enrolled, come on top of the figures above; the contribution a worker pays into the scheme does not reduce the pay counted for the minimum wage.</p>

<h2>Extra hours and unpaid time</h2>
<p>Part-time workers are often asked to cover a late delivery, a colleague's shift or an hour of closing. ${h.src('hmrc_calc', "HMRC's method")} divides all the pay that counts for the pay period by all the hours worked in it, so extra hours cannot be left out. Take a worker on 20 contracted hours at exactly the National Living Wage who stays an unpaid hour after four shifts in the week: the pay stays at ${h.gbp(h.conv(h.rate(2026, 21), 20).weekly)}, the hours become 24, and the week falls ${h.gbp2(h.pay({ date: h.C.from, age: 30, hours: 24, gross: h.conv(h.rate(2026, 21), 20).weekly }).shortfall)} short.</p>
<!--tool:mini:worktime|{"age":30,"g":254.2,"h":20,"x":4}-->
<p>When extra hours are paid at a higher rate, the premium part does not count towards the minimum, but the basic part does. The ${h.a('overtime-and-shift-premiums', 'overtime and premiums page')} has worked examples.</p>

<h2>Hours that change from week to week</h2>
<p>Not every part-time job has fixed hours. For casual and zero hours work, each pay reference period is checked on the hours actually worked in it, so a busy week needs more pay than a quiet one, at the same hourly rate. Time the worker is required to spend at or near the workplace, available for work, counts even if no work comes. Time on call at home, waiting to be asked in, does not count until the worker arrives and starts working or is available at work.</p>

<h2>Part-time work under 21</h2>
<p>Many part-time workers are students or young people, on the lower age rates. At 16 hours a week, the 18 to 20 rate gives ${h.gbp(h.conv(h.rate(2026, 18), 16).weekly)} a week and the 16 to 17 rate ${h.gbp(h.conv(h.rate(2026, 16), 16).weekly)}. Neither is taxed on its own over a year. A student on a placement that their UK higher or further education course requires, for up to one year, is outside the minimum wage; a student in an ordinary part-time job is not. The ${h.a('zero-hours-and-agency-workers', 'page on zero hours and agency work')} covers jobs without fixed hours.</p>`,
  },
});
