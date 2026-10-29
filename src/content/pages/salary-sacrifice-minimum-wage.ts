import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'salary-sacrifice-minimum-wage',
  group: 'rules',
  order: 7,
  tool: { kind: 'mini:sacrifice', props: { age: 30, r: 13, h: 37.5, s: 60 } },
  mini: { kind: 'mini:net', props: { yr: 7, age: 30, h: 37.5 } },
  related: ['uniform-deductions', 'salaried-hours-minimum-wage', 'minimum-wage-after-tax', 'minimum-wage-monthly', 'home'],
  sources: ['hmrc_calc', 'nmw_regs', 'pensions'],
  en: {
    slug: 'salary-sacrifice-minimum-wage',
    nav: 'Salary sacrifice',
    card: 'A salary sacrifice for a car, bike, childcare or extra pension lowers the pay that counts: how much you can give up and stay at the legal rate.',
    title: 'Salary Sacrifice and the Minimum Wage: The Legal Limit',
    description: 'Salary sacrifice lowers the pay that counts for the minimum wage. On £13 an hour for 37.5 hours, under £50 a month can go before pay drops below £12.71.',
    h1: 'Salary sacrifice and the minimum wage: how much can go',
    intro: 'Enter your hourly pay before the sacrifice, your weekly hours and the amount given up each month: the tool shows the largest sacrifice that keeps you at the legal rate.',
    resume: (h) => {
      const hm = h.round2(37.5 * 52 / 12);
      const g = h.round2(13 * hm);
      const p = h.pay({ date: h.C.from, age: 30, hours: hm, gross: g, sacrifice: 60 });
      return `A salary sacrifice is an agreement to give up part of your contractual pay in return for a benefit that is not cash, such as a company car, a bike through a cycle to work scheme, childcare vouchers, parking near work, work-related training or extra pension contributions. Because you no longer have a right to the money given up, it is not pay for the minimum wage, and the employer must make sure what remains still reaches the legal rate for every hour. From 1 April 2026 that is ${h.gbp2(h.rate(2026, 30))} an hour at 21 and over. A worker aged 30 on ${h.gbp2(13)} an hour for 37.5 hours a week works ${h.num(hm, 1)} hours in an average month and earns ${h.gbp2(g)}. The minimum for those hours is ${h.gbp2(p.required)}, so the largest sacrifice that stays legal is ${h.gbp2(h.round2(g - p.required))} a month. A sacrifice of ${h.gbp(60)} leaves ${h.gbp2(p.hourly)} an hour and an underpayment of ${h.gbp2(p.shortfall)} each month. Each extra scheme reduces the pay that counts again, and the label on an arrangement does not decide how it is treated.`;
    },
    faqs: (h) => [
      { q: 'Can a cycle to work scheme take me below the minimum wage?', a: `It must not. A cycle to work scheme run as a salary sacrifice reduces the pay that counts, and HMRC tells employers to make sure no sacrifice takes a worker under the legal rate. If your hourly pay after the sacrifice falls below ${h.gbp2(h.rate(2026, 21))} at 21 and over, or the rate for your age, the scheme cannot lawfully run at that level for you.` },
      { q: 'Do pension contributions deducted from my pay reduce minimum wage pay?', a: 'It depends on the arrangement. A pension contribution deducted from your pay and passed to a third party at your request does not reduce the pay that counts. Extra pension contributions made through a salary sacrifice do, because you have given up the right to that pay. The employer\'s own contribution into your pension is a benefit, so it does not count as pay either.' },
      { q: 'Does the April 2027 rise affect an existing salary sacrifice?', a: `It can. A sacrifice that was legal in 2026 may not be in 2027. On the example of ${h.gbp2(13)} an hour for 37.5 hours a week, the announced National Living Wage of ${h.gbp2(h.rate(2027, 21))} from 1 April 2027 would itself be above the hourly pay, so the pay would need to rise before any sacrifice at all could stay lawful. The new rate still has to be set in regulations.` },
      { q: 'Are childcare vouchers counted as part of my pay for the minimum wage?', a: 'No. Vouchers received through a salary sacrifice are a benefit in kind, and benefits in kind other than accommodation never count as pay, whatever their value. The sacrificed salary is gone from the calculation too. HMRC\'s example is a worker on £16,800 a year who gives up £1,200 for childcare vouchers: the pay checked against the minimum wage is the remaining £15,600.' },
    ],
    body: (h) => {
      const hm = h.round2(37.5 * 52 / 12);
      const g = h.round2(13 * hm);
      const req26 = h.round2(h.rate(2026, 30) * hm);
      const req27 = h.round2(h.rate(2027, 30) * hm);
      const pt = h.round2(20 * 52 / 12);
      const gpt = h.round2(14.2 * pt);
      const reqpt = h.round2(h.rate(2026, 24) * pt);
      return `
<h2>A reduction in pay, not a deduction</h2>
<p>The ${h.src('hmrc_calc', 'HMRC guidance on calculating the minimum wage')} draws a clear line. Under a salary sacrifice your contract changes, so the part given up is no longer pay you are owed; your pay is lower. A deduction, by contrast, is taken from pay you are still entitled to. The difference matters because some deductions do not reduce minimum wage pay, for example a pension contribution passed to a pension scheme at your request, while a sacrifice always does.</p>
<p>The benefit you receive in return does not help either. A car, a bike, vouchers or medical cover are benefits in kind, and benefits in kind never count towards the minimum wage. The single exception is living accommodation, which counts only up to the ${h.a('accommodation-offset', 'accommodation offset')}.</p>
<p>HMRC also warns that employers attach the word sacrifice to several arrangements that are really deductions from pay. What counts is the substance: if money is in fact being deducted from pay you are entitled to, the deduction rules apply instead.</p>

<h2>The largest sacrifice that stays legal</h2>
<p>For a salaried or regular worker, the room for a sacrifice is the monthly pay minus the minimum for the hours in an average month. The table works through two cases at the April 2026 rates.</p>
${h.table(['', 'Full time, aged 30', 'Part time, aged 24'], [
  ['Hourly pay before the sacrifice', h.gbp2(13), h.gbp2(14.2)],
  ['Weekly hours', '37.5', '20'],
  ['Hours in an average month (weekly × 52 ÷ 12)', h.num(hm, 1), h.num(pt, 2)],
  ['Monthly pay', h.gbp2(g), h.gbp2(gpt)],
  ['Minimum for those hours', h.gbp2(req26), h.gbp2(reqpt)],
  ['Largest legal sacrifice a month', h.gbp2(h.round2(g - req26)), h.gbp2(h.round2(gpt - reqpt))],
], 'Rate for both workers: the National Living Wage from 1 April 2026. Figures before tax.', ['l', 'r', 'r'])}
<p>A higher hourly rate leaves far more room: the part-time worker on ${h.gbp2(14.2)} can give up more each month than the full-time worker on ${h.gbp2(13)}, despite working fewer hours. Workers close to the floor have almost nothing to spare.</p>

<h2>Two schemes at once</h2>
<p>Each arrangement reduces minimum wage pay on its own, so they add up. The full-time worker above could keep a ${h.gbp(25)} cycle scheme, but adding ${h.gbp(40)} of extra pension through sacrifice would take the total to ${h.gbp(65)}, beyond the ${h.gbp2(h.round2(g - req26))} limit, and leave the month underpaid. The tool at the top accepts the combined monthly figure.</p>

<h2>When the rate rises in April</h2>
<p>A sacrifice is usually agreed for a year or more, while the minimum wage changes every April. For the full-time worker, the minimum for an average month would rise from ${h.gbp2(req26)} to ${h.gbp2(req27)} if the announced April 2027 rate of ${h.gbp2(h.rate(2027, 30))} is confirmed in regulations, which is above the current monthly pay of ${h.gbp2(g)}. The pay itself would have to rise, and no sacrifice could run until it did. A worker in a scheme can check each April whether the new rate still leaves room.</p>

<h2>Tax, pension and take-home pay</h2>
<p>In HMRC's own example, the sacrificed amount comes off the annual salary before monthly pay, tax and National Insurance are worked out. The second tool below shows take-home pay at the minimum wage before any sacrifice. Workplace pension rules also interact: if you are aged ${h.num(h.PENSION.ageFrom)} or over and earn at least ${h.gbp(h.PENSION.trigger)} a year you are normally enrolled, with minimum contributions of ${h.pc(h.PENSION.employerMinPct)} from the employer and ${h.pc(h.PENSION.employeeMinPct)} from you, as set out on the ${h.src('pensions', 'GOV.UK workplace pensions page')}. The ${h.a('minimum-wage-after-tax', 'after tax page')} and the ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} go further on each point.</p>`;
    },
  },
});
