import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'zero-hours-and-agency-workers',
  group: 'rules',
  order: 14,
  tool: { kind: 'check', props: { age: 22, hours: 34, gross: 409.6, open: true } },
  mini: { kind: 'mini:prp', props: { age: 22, f: 0, h: 34, g: 401.6 } },
  related: ['training-travel-waiting-time', 'pay-reference-period', 'who-gets-minimum-wage', 'part-time-minimum-wage', 'home'],
  sources: ['hmrc_elig', 'hmrc_calc', 'hmrc_hours', 'nmw_act'],
  en: {
    slug: 'zero-hours-and-agency-workers',
    nav: 'Zero hours and agency work',
    card: 'Zero hours, casual and agency workers get the same minimum wage per hour: who pays, which hours count, timesheets and umbrella company charges.',
    title: 'Zero Hours and Agency Workers: Same Minimum Wage, Every Hour',
    description: 'Zero hours and agency workers are owed the same minimum wage for every hour worked. Who is responsible, which hours count, timesheets and umbrella charges.',
    h1: 'Zero hours and agency workers: the same minimum, every hour',
    intro: 'Enter one pay period: hours including briefings and travel between assignments, gross pay and any charge taken off. The checker shows whether you reached the rate.',
    resume: (h) => {
      const w = h.pay({ date: h.C.from, age: 22, hours: 34, gross: 409.6, deductions: 8 });
      return `A zero hours contract, casual work or a job through an agency does not lower the minimum wage. Every hour worked in a pay reference period must be paid at least the rate for your age: ${h.gbp2(h.rate(2026, 21))} at 21 and over, ${h.gbp2(h.rate(2026, 18))} at 18 to 20 and ${h.gbp2(h.rate(2026, 16))} at 16 and 17 from 1 April 2026. Because hours change from one period to the next, the check is made period by period on the hours you actually worked, which include time you are required to be at work and available, briefings, and travel from one assignment to the next. For agency work, the law treats you as having a worker's contract with whoever pays you, the agency or the client business, so one of them is always responsible. Take an agency worker aged 22 paid ${h.gbp2(12.8)} for 32 shift hours, who must also attend 2 hours of unpaid briefings and has an ${h.gbp(8)} umbrella company fee passed on. The pay that counts is ${h.gbp2(w.nmwPay)} for 34 hours, ${h.gbp2(w.hourly)} an hour, and the week is ${h.gbp2(w.shortfall)} short.`;
    },
    faqs: (h) => [
      { q: 'Does a zero hours contract change my minimum hourly rate?', a: `No. The rate depends only on your age and whether you are an apprentice, not on the type of contract. From April 2026 a zero hours worker aged 21 or over is owed at least ${h.gbp2(h.rate(2026, 21))} for every hour worked. The difference is practical: with hours changing each week or month, each pay period has to be checked on its own hours.` },
      { q: 'Who pays the minimum wage when I work through an agency?', a: 'Whoever is responsible for paying you, the agency or the business you are placed with. The National Minimum Wage Act treats you as having a worker\'s contract with that party, unless you are genuinely self-employed. Raise a shortfall with the party that pays you, and keep evidence of the hours the client asked you to work, including any time beyond the booked shift.' },
      { q: 'Can an umbrella company take its fee from my minimum wage pay?', a: 'Not without lowering the pay that counts. HMRC states that an administrative charge imposed on the business by an agency or umbrella company is that business\'s own cost; passing it on to the worker reduces minimum wage pay. If the fee takes your hourly pay below the rate for your age, the period is underpaid and the shortfall must be made up.' },
      { q: 'Is the agency allowed to hold my pay because the client has not paid?', a: 'No. Under the separate rules on employment businesses, an agency must pay you for the hours you worked even if the client has not yet paid it. Those rules are enforced by the Employment Agency Standards Inspectorate. For the minimum wage itself, hours on a timesheet must normally be paid in the period worked or the next one.' },
    ],
    body: (h) => {
      const w = h.pay({ date: h.C.from, age: 22, hours: 34, gross: 409.6, deductions: 8 });
      return `
<h2>Same rate, checked one period at a time</h2>
<p>The ${h.src('hmrc_elig', 'HMRC eligibility guidance')} includes part-time, short-term and casual workers in the definition of a worker, and the ${h.src('nmw_act', 'National Minimum Wage Act 1998')} adds a specific rule for agency staff. None of these arrangements has a lower rate. What changes is the way hours move: a zero hours worker may do 40 hours one week and 6 the next, so the employer has to check the pay for each ${h.a('pay-reference-period', 'pay reference period')} against the hours actually worked in it. A strong week does not cover a weak one when you are paid weekly.</p>

<h2>Hours that are easy to lose</h2>
<p>Variable hours workers are more likely to have unrecorded time. These periods count as working time for those paid by the hour:</p>
<ul>
<li>time at the workplace waiting to be given work, when you are required to be there;</li>
<li>briefings, inductions and preparation you are told to attend;</li>
<li>travel from one assignment to another during the day, as in home care or cleaning rounds;</li>
<li>waiting for transport on a work journey, or to start a job or collect goods.</li>
</ul>
<p>Waiting at home for a call, and the journey from home to the first job and back from the last, generally do not count. The ${h.a('training-travel-waiting-time', 'working time page')} goes through each case, and the ${h.a('sleep-in-and-on-call', 'on-call page')} covers standby.</p>

<h2>The agency worker's week, broken down</h2>
${h.table(['Item', 'Hours', 'Amount'], [
  ['Shift hours paid at ' + h.gbp2(12.8), '32', h.gbp2(409.6)],
  ['Unpaid briefings the client requires', '2', h.gbp(0)],
  ['Umbrella company fee passed on', '', `−${h.gbp(8)}`],
  ['Pay that counts and hours that count', '34', h.gbp2(w.nmwPay)],
  ['Minimum at 22, from April 2026', '', h.gbp2(w.required)],
  ['Shortfall', '', h.gbp2(w.shortfall)],
], 'Illustration at the April 2026 rate. Without the briefings and the fee, the same pay would have passed.', ['l', 'r', 'r'])}
<p>The hourly rate on the assignment, ${h.gbp2(12.8)}, is above the ${h.gbp2(h.rate(2026, 22))} minimum, and without the extras the week would have been compliant. It is the unpaid time and the passed-on fee together that create the underpayment. From 1 April 2027 the announced rate of ${h.gbp2(h.rate(2027, 22))} would put even the basic assignment rate below the floor, once regulations bring it into force.</p>

<h2>Agency, client or umbrella: who is responsible</h2>
<p>Under section 34 of the Act, an agency worker is deemed to have a worker's contract with whichever party pays them. That closes the gap that could otherwise open between an agency and the business using the worker. Two further points protect agency staff:</p>
<ul>
<li>separate rules on employment businesses require the agency to pay for hours worked even when the client has not paid the agency, enforced by the Employment Agency Standards Inspectorate;</li>
<li>a charge an agency or umbrella company imposes on the business that pays you cannot be passed on to you without lowering your minimum wage pay, as the ${h.src('hmrc_calc', 'HMRC calculation guidance')} explains.</li>
</ul>
<p>HMRC officers can also enter the premises of businesses that supply and employ agency workers to inspect records.</p>

<h2>Timesheets and late pay</h2>
<p>Where you must submit a timesheet before being paid, the hours count for the pay period in which you worked them, and must be paid in that period or the next. If the timesheet arrives late, meaning fewer than 4 working days before the end of the period after the one in which you worked, the employer has until the end of the following period to pay. Keep a copy of every timesheet you submit.</p>

<h2>Gig work through an app</h2>
<p>Platform workers are entitled only if they are workers rather than genuinely self-employed. Where they are, HMRC lists as likely working time the hours the platform requires you to be logged in, time you must spend in a set area, travel to a pickup point after accepting a job, and waiting for an order or a customer. Each app is assessed separately. The ${h.a('who-gets-minimum-wage', 'eligibility page')} explains how status is decided.</p>`;
    },
  },
});
