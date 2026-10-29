import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'apprentice-off-the-job-training',
  group: 'ages',
  order: 11,
  tool: { kind: 'mini:worktime' },
  mini: { kind: 'mini:apprentice' },
  related: ['apprentice-minimum-wage', 'training-travel-waiting-time', 'apprentice-pay-after-first-year', 'minimum-wage-19-year-old'],
  sources: ['hmrc_elig', 'hmrc_hours', 'gov_apprentice', 'gov_rates'],
  en: {
    slug: 'apprentice-off-the-job-training',
    nav: 'Off-the-job training',
    card: 'Why college days and other off-the-job training are paid working time for apprentices, the 20% rule and what an unpaid day costs.',
    title: 'Apprentice Off-the-Job Training: Paid Time at the Minimum',
    description: 'Off-the-job training is working time: apprentices must be paid at least £8.00 an hour for college days and training. The 20% rule, travel and a worked example.',
    h1: 'Apprentice off-the-job training: paid working time',
    intro: 'Enter the pay for a week, the hours paid and the training hours left unpaid: the tool shows the real hourly rate against your minimum.',
    resume: (h) => `Off-the-job training that is part of an apprenticeship is working time, and an apprentice must be paid at least the minimum wage for it: ${h.gbp2(h.C.apprentice)} an hour on the apprentice rate from 1 April 2026, or the rate for their age once they are 19 or over and past the first year. HMRC counts time spent training among the hours that must be paid, and its guidance on apprentices names unpaid training, on or off the job, as a common cause of underpayment. Apprenticeship agreements must include off-the-job training and record the planned hours: at least 20% of normal working hours for apprenticeships that started before 1 August 2025, and the minimum set in the apprenticeship standard for those that began on or after that date; in Wales the employer or sector decides. Leaving a college day unpaid pulls the whole pay period below the minimum. An apprentice paid ${h.gbp(240)} for 30 hours at work who also spends a 7-hour day at college has worked 37 hours, which comes to ${h.gbp2(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: 240 }).hourly)} an hour, ${h.gbp(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: 240 }).shortfall)} short for the week. Travel from the workplace to the training venue counts too.`,
    faqs: (h) => [
      { q: 'Is my college day counted as working time on an apprenticeship?', a: 'Yes, when the college day is part of your apprenticeship. HMRC counts time spent training as working time for minimum wage purposes, and its apprentice guidance covers training both on and off the job. Your employer must pay at least the rate that applies to you for those hours, just as for hours at the workplace. HMRC also lists unpaid training time, including English and maths, among the usual causes of apprentice underpayment.' },
      { q: 'Is travel to a training centre paid for apprentices?', a: 'It depends where the journey starts. HMRC counts travel from work to a training venue as working time, so a trip from the workplace to college during the day must be paid. Travel between home and the training venue does not generally count, in the same way as the daily commute to work. Waiting for transport on a work journey can count as well.' },
      { q: 'How much off-the-job training must an apprenticeship include?', a: 'For apprenticeships that began before 1 August 2025, at least 20% of the apprentice\'s normal working hours must be paid off-the-job training. For those that began on or after that date, the minimum number of hours is set in the relevant apprenticeship standard. Either way, the apprenticeship agreement records the planned hours. In Wales the decision on off-the-job training rests with the employer or the sector.' },
      { q: 'Are training hours paid at the higher rate after my first year?', a: `Yes. Once an apprentice aged 19 or over has finished the first year, every hour counts at the rate for their age, training included. HMRC's example is a 25 year old in the second year of a nursery apprenticeship: his off-the-job training must fit within his contracted hours and be paid at least at the National Living Wage, ${h.gbp2(h.rate(2026, 25))} under the April 2026 rates.` },
    ],
    body: (h) => `
<h2>Training counts as working time</h2>
<p>${h.src('hmrc_hours', "HMRC's guidance on working hours")} sets out the hours that must be paid at least the minimum wage. For time work, the usual basis for an apprentice paid by the hour, the list includes time spent at the workplace working, time required to be available for work there, travel on business and time spent training. Its eligibility guidance adds that apprentices must be paid for time spent in training during normal working hours, on or off the job, as part of the apprenticeship. The same applies to salaried apprentices: the only training HMRC leaves out for them is training the employer does not require that takes place outside the time the worker would otherwise be working.</p>
<p>The ${h.src('gov_apprentice', 'GOV.UK page for apprentices')} puts it simply: apprentices are paid for their normal working hours and for training that is part of their apprenticeship. A college day or a session at a training provider that forms part of the apprenticeship is paid time.</p>

<h2>The 20% rule and the apprenticeship agreement</h2>
<p>${h.src('hmrc_elig', "HMRC's eligibility guidance")} sets out the off-the-job training an apprenticeship agreement must contain.</p>
${h.table(['Apprenticeship', 'Minimum off-the-job training', 'Where it is set'], [
  ['Began before 1 August 2025', 'At least 20% of normal working hours, paid', 'The apprenticeship agreement'],
  ['Began on or after 1 August 2025', 'The minimum number of hours in the standard', 'The relevant apprenticeship standard'],
  ['In Wales', 'Decided by the employer or the sector', 'The Apprenticeship Frameworks'],
], 'The agreement must record the planned number of off-the-job training hours.', ['l', 'l', 'l'])}
<p>On a 30-hour contract that began before August 2025, 20% means at least 6 hours a week of training on average. Those hours sit inside the paid hours: they are not an unpaid extra on top of a full working week.</p>

<h2>A college day left unpaid: worked example</h2>
<p>Ella is 17, in the first year of an apprenticeship, on ${h.gbp2(h.C.apprentice)} an hour. She works 30 hours at the salon and spends one 7-hour day a week at college. Her employer pays only the salon hours.</p>
${h.table(['', 'College day paid', 'College day unpaid'], [
  ['Hours that count', '37', '37'],
  ['Pay for the week', h.gbp(h.round2(h.C.apprentice * 37)), h.gbp(240)],
  ['Pay per hour that counts', h.gbp2(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: h.round2(h.C.apprentice * 37) }).hourly), h.gbp2(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: 240 }).hourly)],
  ['Short for the week', h.gbp(0), h.gbp(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: 240 }).shortfall)],
], 'Weekly pay reference period, April 2026 apprentice rate.', ['l', 'r', 'r'])}
<p>Over ten weeks the unpaid college days add up to ${h.gbp(h.round2(h.pay({ date: h.C.from, age: 17, apprentice: true, firstYear: true, hours: 37, gross: 240 }).shortfall * 10))}. For a 21 year old past the first year, each unpaid 7-hour day would leave ${h.gbp(h.round2(h.rate(2026, 21) * 7))} missing at the National Living Wage.</p>
<!--tool:mini:convert|{"appr":1,"age":17,"h":37}-->

<h2>Travel, handovers and time around the training</h2>
<p>A trip from the workplace to college in the middle of the day is travel for work and counts. The journey from home to the college does not generally count, any more than the usual commute. HMRC also warns that apprentices lose pay through time added to their shifts: handover meetings between shifts and queues at security checks are working time.</p>
<p>Waiting for a train or a bus on a journey from work to the training venue counts in the same way as other work travel. Rest breaks during a training day do not count, as at work, unless the contract pays for them.</p>

<h2>Keeping track and raising it</h2>
<p>A college timetable next to the payslips is usually enough to show which hours were left out. The planned training hours in the apprenticeship agreement are a second check. HMRC lists the incorrect recording of hours and off-the-job training time as a cause of underpayment. An apprentice who finds a gap can ask the employer to correct it, call Acas on ${h.E.acasPhone}, or use the ${h.src('gov_complaint', 'official complaint form')}. The ${h.a('training-travel-waiting-time', 'page on training, travel and waiting time')} covers the same rules for workers who are not apprentices.</p>`,
  },
});
