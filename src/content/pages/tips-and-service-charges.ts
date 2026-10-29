import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'tips-and-service-charges',
  group: 'rules',
  order: 4,
  tool: { kind: 'mini:tips', props: { age: 19, r: 10.5, h: 25, t: 60 } },
  mini: { kind: 'check', props: { tips: 40, open: true } },
  related: ['overtime-and-shift-premiums', 'uniform-deductions', 'minimum-wage-19-year-old', 'report-underpayment', 'home'],
  sources: ['hmrc_calc', 'hmrc_enforce', 'gov_employers'],
  en: {
    slug: 'tips-and-service-charges',
    nav: 'Tips and service charges',
    card: 'Tips, service charges and cover charges never count towards the minimum wage, even when they go through payroll or a tronc.',
    title: 'Tips and Service Charges Never Count Towards Minimum Wage',
    description: 'Tips, gratuities, service charges and cover charges never count towards the minimum wage, whether paid in cash, through payroll or by a tronc. Check your wage.',
    h1: 'Tips and service charges: why they never count',
    intro: 'Enter your hourly pay before tips, your hours and the tips paid to you: the tool shows the pay that counts once tips are set aside.',
    resume: (h) => {
      const w = h.pay({ date: h.C.from, age: 19, hours: 25, gross: h.round2(10.5 * 25) + 60, tips: 60 });
      return `Tips, gratuities, service charges and cover charges do not count towards the minimum wage, however they reach you: in cash from a customer, added to a card payment and passed on through payroll, or shared out by a tronc master. Your employer must pay the legal rate out of its own pocket for every hour, and anything customers add is on top. From 1 April 2026 that means at least ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over, ${h.gbp2(h.rate(2026, 18))} at 18 to 20, and ${h.gbp2(h.rate(2026, 16))} for 16 and 17 year olds and apprentices on the apprentice rate. Take a waiter aged 19 paid ${h.gbp2(10.5)} an hour for 25 hours, who also receives ${h.gbp(60)} of tips through the payslip. The payslip shows ${h.gbp2(w.nmwPay + 60)}, but only ${h.gbp2(w.nmwPay)} counts, which is ${h.gbp2(w.hourly)} an hour against a minimum of ${h.gbp2(h.rate(2026, 19))}. The employer owes ${h.gbp2(w.shortfall)} for that week, and the tips stay the waiter's. HMRC lists tips used to top up pay among the common causes of underpayment for apprentices.`;
    },
    faqs: (h) => [
      { q: 'Can tips paid through the payroll count towards my hourly rate?', a: `No. Paying tips through payroll is only a way of handing them over; it does not turn them into wages for the minimum wage. The ${h.gbp2(h.rate(2026, 21))} rate at 21 and over, or the rate for your age, must be reached by the wage your employer pays. Tips on the same payslip are set aside before your hourly pay is worked out, even when they appear on the same line as your wages.` },
      { q: 'Does a restaurant cover charge count as part of my wage?', a: 'No. Cover charges sit on the same list as tips, gratuities and service charges: none of them can be used to meet the minimum wage. That holds whether the charge is optional or added automatically to every bill, and whoever passes it on to you. The basic pay for your hours must reach the legal rate before any of it is added.' },
      { q: 'My employer says the tronc tops me up to the legal rate: is that allowed?', a: 'No. A tronc is a way of sharing tips and service charges among staff, and money from it never counts towards minimum wage pay. If your wage before the tronc share is below the rate for your age, you are underpaid for that pay period, whatever the tronc adds. The shortfall is arrears the employer must pay at the rate in force when it repays them.' },
      { q: 'Should tips appear in my employer\'s minimum wage records?', a: 'HMRC advises employers to record amounts paid to workers as tips, service charges, gratuities or cover charges, alongside hours, pay rates and deductions. Those records let an inspector separate tips from wages. If you ask in writing to see your own records because you think you were underpaid, the employer has 14 days to produce them, unless you agree a different time.' },
    ],
    body: (h) => {
      const w = h.pay({ date: h.C.from, age: 19, hours: 25, gross: h.round2(10.5 * 25) + 60, tips: 60 });
      const bar = h.pay({ date: h.C.from, age: 34, hours: 32, gross: h.round2(12.2 * 32) + 95, tips: 95 });
      const needRate = h.rate(2026, 19);
      return `
<h2>The rule in one line</h2>
<p>The ${h.src('hmrc_calc', 'HMRC guidance on calculating the minimum wage')} lists tips, gratuities, service charges and cover charges among the payments that never count as pay for the minimum wage, and it states that the route they take makes no difference. Paid by the customer in cash, through the employer's payroll or by a tronc master, they are left out every time. HMRC also points employers to a code of best practice on how such money should be handled, but that code does not change the basic rule.</p>
<p>In practice the check works like this: take the gross pay for the period, remove any tips, service charge or cover charge share it contains, then divide by the hours worked. The result must be at least the rate for your age.</p>

<h2>Two weeks on the floor, worked through</h2>
${h.table(['', 'Waiter, aged 19', 'Bartender, aged 34'], [
  ['Hours in the week', '25', '32'],
  ['Hourly wage before tips', h.gbp2(10.5), h.gbp2(12.2)],
  ['Tips or service charge share on the payslip', h.gbp(60), h.gbp(95)],
  ['Total on the payslip', h.gbp2(w.nmwPay + 60), h.gbp2(bar.nmwPay + 95)],
  ['Pay that counts', h.gbp2(w.nmwPay), h.gbp2(bar.nmwPay)],
  ['Minimum for the week', h.gbp2(w.required), h.gbp2(bar.required)],
  ['Shortfall owed', h.gbp2(w.shortfall), h.gbp2(bar.shortfall)],
], 'Rates from 1 April 2026. Tips stay with the worker in both cases; they simply do not count.', ['l', 'r', 'r'])}
<p>Both workers took home more than the legal minimum once tips are included, and both were underpaid. The waiter needed at least ${h.gbp2(needRate)} an hour from the employer; the bartender needed ${h.gbp2(h.rate(2026, 34))}. From 1 April 2027 the gap grows, since the announced rates are ${h.gbp2(h.rate(2027, 19))} and ${h.gbp2(h.rate(2027, 34))}, to be confirmed in regulations.</p>

<h2>What keeping tips out achieves</h2>
<p>A customer's tip comes from the customer, not from the employer paying for the work. If tips could be counted, a busy Saturday would quietly cut what the employer owed, and staff in quieter venues would carry the cost. Keeping them out means the employer's wage alone must reach the floor, and anything customers give is on top. The same logic applies to ${h.a('overtime-and-shift-premiums', 'overtime and shift premiums')}, which are also set aside, though for a different reason.</p>
<p>Hospitality workers often face several of these rules at once. A uniform you pay for lowers the pay that counts, as the ${h.a('uniform-deductions', 'uniform page')} shows; meals deducted from wages can do the same, while meals you pay for at the till after payday do not. Add each item to the checker under the summary to see the combined effect on a single pay period.</p>

<h2>Apprentices and young staff</h2>
<p>In its eligibility guidance HMRC names, among the risks apprentices face, the use of customer tips to meet minimum wage pay. Young workers are exposed for the same reason: on ${h.gbp2(h.rate(2026, 16))} or ${h.gbp2(h.rate(2026, 18))} an hour, a modest tip line can make an underpaid wage look normal. The ${h.a('minimum-wage-19-year-old', 'page for 19 year olds')} sets out the rate at that age and how an apprentice moves off the apprentice rate.</p>

<h2>Checking and raising it</h2>
<p>Ask for your payslip to show tips separately from wages if it does not already. Keep a note of the hours you work, including set-up and closing time, which count as working time. If the wage part divided by your hours falls below the rate, the gap is owed for each pay period affected and is recalculated at the current rate when it is repaid. The ${h.a('report-underpayment', 'page on reporting underpayment')} covers asking to see your records, the free Acas helpline on ${h.E.acasPhone} and the complaint form, which you can still use after leaving the job. HMRC's ${h.src('hmrc_enforce', 'enforcement guidance')} explains what an inspector can require from the employer.</p>`;
    },
  },
});
