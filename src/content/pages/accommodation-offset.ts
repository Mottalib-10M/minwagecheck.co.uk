import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'accommodation-offset',
  group: 'rates',
  order: 8,
  tool: { kind: 'mini:offset', props: { age: 35, r: 12.9, h: 40, n: 7, c: 12.5 } },
  mini: { kind: 'check', props: { age: 24, hours: 30, gross: 318, accom: 1, open: true } },
  related: ['uniform-deductions', 'minimum-wage-2026', 'pay-reference-period', 'home'],
  sources: ['gov_accom', 'hmrc_calc', 'lpc_2027', 'si_2026'],
  en: {
    slug: 'accommodation-offset',
    nav: 'Accommodation offset',
    card: 'How a room from your employer counts in the minimum wage: £11.10 a day, free or charged, with the official worked examples.',
    title: 'Accommodation Offset 2026: £11.10 a Day and Your Pay',
    description: 'Accommodation offset for the minimum wage: £11.10 a day (£77.70 a week) from April 2026, £11.53 from April 2027. See how a free or charged room changes pay.',
    h1: 'Accommodation offset: how a room changes your minimum wage',
    intro: 'Enter your hourly pay, hours, nights and the charge per night: the tool shows the pay that counts once the room is taken into account.',
    resume: (h) => `The accommodation offset is the most an employer can count towards the minimum wage for accommodation it provides: ${h.gbp2(h.C.offsetDay)} a day, or ${h.gbp2(h.round2(h.C.offsetDay * 7))} a week, since 1 April 2026, and ${h.gbp2(h.N.offsetDay)} a day from 1 April 2027 as announced on ${h.date(h.A.date)}. Accommodation is the only benefit in kind that counts: meals, a car or childcare vouchers never do. The rule works three ways in each pay period. If the room is free, the offset for each day it is provided is added to your pay for the check. If you are charged more than the offset, the excess is taken off the pay that counts, whether the charge is deducted from wages or paid afterwards. If the charge is at or below the offset, it has no effect. In the official example, a worker paid ${h.gbp2(12.9)} an hour for 120 hours and charged ${h.gbp2(12.5)} a night for 21 nights ends up at ${h.gbp2(h.pay({ date: '2026-05-01', age: 35, hours: 120, gross: 1548, accomDays: 21, accomCharge: 12.5 }).hourly)} an hour for the minimum wage, below the ${h.gbp2(h.rate(2026, 35))} rate.`,
    faqs: (h) => [
      { q: 'Do bills for gas and electricity count as part of the accommodation charge?', a: `Yes. GOV.UK lists rent, charges for gas, electricity and furniture, and laundry as parts of the overall accommodation charge. They are added together and compared with the offset of ${h.gbp2(h.C.offsetDay)} a day. A low rent with high charges for bills can therefore still take the total above the offset and reduce your minimum wage pay.` },
      { q: 'My landlord is not my employer: does the offset apply?', a: 'It can. Accommodation counts as provided by the employer when it comes with the job, when the employer or a connected person or company owns or rents the property, or when the employer or its owners get a payment or benefit from your landlord. If none of these applies, the rent you pay a separate landlord has no effect on the minimum wage check.' },
      { q: 'Why does the offset only rise in line with the National Living Wage?', a: `In its review of 2022 the Low Pay Commission said the offset would not rise significantly as a share of the National Living Wage until there was assurance that minimum standards for accommodation quality are in place and enforced. For April 2027 it recommended the same ${h.pc(h.A.increasePct, 1)} rise as the wage, to ${h.gbp2(h.N.offsetDay)} a day.` },
      { q: 'Does accommodation from a university count when I work there?', a: 'Not if you are enrolled on a full-time course at that higher or further education institution and it provides the accommodation. For people working for a local housing authority or a social housing provider, the accommodation only counts when it is linked to the job, such as a warden who must live on site.' },
    ],
    body: (h) => `
<h2>The three cases with the official figures</h2>
<p>GOV.UK gives one worked example for each case. The figures below use the April 2026 offset.</p>
${h.table(['Case', 'Worker', 'Pay and hours', 'Accommodation', 'Pay that counts per hour'], [
  ['Free room', 'John, 24', `${h.gbp2(10.6)} × 30 hours a week`, '7 nights, free', h.gbp2(h.pay({ date: '2026-05-01', age: 24, hours: 30, gross: 318, accomDays: 7, accomCharge: 0 }).hourly)],
  ['Charge under the offset', 'Lisa, 20', `${h.gbp2(11)} an hour`, `${h.gbp2(6.5)} a day`, `${h.gbp2(11)}, no effect`],
  ['Charge above the offset', 'Sam, 35', `${h.gbp2(12.9)} × 120 hours in 3 weeks`, `${h.gbp2(12.5)} a day for 21 days`, h.gbp2(h.pay({ date: '2026-05-01', age: 35, hours: 120, gross: 1548, accomDays: 21, accomCharge: 12.5 }).hourly)],
], `Worked examples from ${h.src('gov_accom', 'GOV.UK, accommodation: effect on the minimum wage')}.`, ['l', 'l', 'l', 'l', 'r'])}
<p>John's hourly rate of ${h.gbp2(10.6)} alone is below the National Living Wage he is owed at 24. The free room adds ${h.gbp2(h.round2(h.C.offsetDay * 7))} to his weekly pay for the check, which brings him above ${h.gbp2(h.rate(2026, 24))}. Sam's case runs the other way: his hourly rate is above the minimum, but the ${h.gbp2(h.round2(12.5 - h.C.offsetDay))} a day his rent exceeds the offset, over 21 days, comes off his pay, and the period falls ${h.gbp(h.pay({ date: '2026-05-01', age: 35, hours: 120, gross: 1548, accomDays: 21, accomCharge: 12.5 }).shortfall)} short.</p>

<h2>The calculation step by step</h2>
<ol>
<li>Take the pay that counts for the pay reference period, before the accommodation charge.</li>
<li>Count the days in the period for which accommodation was provided to you.</li>
<li>If the room is free, add the offset times those days.</li>
<li>If there is a charge, total it for the period (rent, gas, electricity, furniture, laundry). If it is more than the offset times the days, take the difference off the pay. If it is less or equal, change nothing.</li>
<li>Divide by the hours of working time and compare with the rate for your age.</li>
</ol>
<p>The checker below the summary has an accommodation setting that applies these steps with your other pay items: a uniform deduction, tips or a salary sacrifice in the same period are all taken into account together.</p>

<h2>Offsets by year</h2>
${h.table(['Rates from', 'Per day', 'Per week'], [['April 2017', h.gbp2(6.4), h.gbp2(44.8)], ['April 2018', h.gbp2(7), h.gbp2(49)], ...h.PERIODS.map((p) => [p.label.replace(' to March ' + (Number(p.from.slice(0, 4)) + 1), ''), h.gbp2(p.offsetDay), h.gbp2(h.round2(p.offsetDay * 7))])], `Source: ${h.src('gov_accom', 'GOV.UK accommodation rates')}; 2027 as announced by the government.`, ['l', 'r', 'r'])}
<p>For a past pay period, use the offset of the year in which that period started. The offset moves on the same day as the wage rates, 1 April, and applies from the first pay period that begins on or after that date.</p>

<h2>When a room is linked to the job</h2>
<p>The offset matters most in jobs where staff live in, for example in hotels, on farms or in seasonal work. Accommodation counts even if you do not need it to do the job, as long as the employer provides it in one of the ways set out above. If living there is optional and you choose not to, nothing is counted.</p>
<!--tool:mini:convert|{"yr":7,"age":30,"h":40}-->
<p>Charges for gas, electricity, furniture and laundry belong to the accommodation charge, whatever name they carry on the payslip. If the numbers do not add up, the ${h.a('report-underpayment', 'underpayment page')} explains how to raise it, and the ${h.a('pay-reference-period', 'pay reference period page')} how to pick the period to check.</p>`,
  },
});
