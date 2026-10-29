import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'uniform-deductions',
  group: 'rules',
  order: 2,
  tool: { kind: 'mini:uniform', props: { age: 27, r: 13, h: 40, u: 15 } },
  mini: { kind: 'check', props: { uniform: 15, age: 27, hours: 40, gross: 520, open: true } },
  related: ['salary-sacrifice-minimum-wage', 'tips-and-service-charges', 'accommodation-offset', 'report-underpayment', 'home'],
  sources: ['hmrc_calc', 'gov_employers', 'nmw_regs'],
  en: {
    slug: 'uniform-deductions',
    nav: 'Uniform and kit deductions',
    card: 'Why a uniform, tools, safety kit or compulsory training you pay for lowers the pay that counts, with the worked example of a £15 uniform rental.',
    title: 'Uniform Deductions and Minimum Wage: Kit, Tools and Training',
    description: 'Uniform deductions lower your minimum wage pay: a £15 weekly uniform rental takes a £13 an hour worker below £12.71. Tools, safety kit and training count too.',
    h1: 'Uniform, tools and training deductions: when they break the minimum wage',
    intro: 'Enter your hourly pay, the hours in the pay period and what you paid or had deducted for uniform or kit: the tool shows the pay per hour that is left.',
    resume: (h) => {
      const j = h.pay({ date: h.C.from, age: 27, hours: 40, gross: 520, deductions: 15 });
      return `Money you hand back to your employer for something the job requires, such as a uniform, tools, safety equipment or compulsory training, is taken off your pay before it is compared with the minimum wage. It does not matter whether the cost is deducted from your wages or paid by you, whether you agreed to it, or whether you bought the item from the employer or from a shop it named, unless the employer refunds you. GOV.UK gives the example of a worker aged 27 who works 40 hours a week at £13 an hour, so ${h.gbp(520)} a week, and pays ${h.gbp(15)} a week to rent his uniform. For the minimum wage only ${h.gbp(j.nmwPay)} counts, which is £${h.num(j.nmwPay / 40, 3)} an hour, below the ${h.gbp2(h.rate(2026, 27))} National Living Wage in force from April 2026. On paper he earns ${h.gbp2(h.round2(13 - h.rate(2026, 27)))} an hour above the minimum; in reality the uniform leaves him ${h.gbp2(j.shortfall)} short for the week, a gap the employer must pay. Tax, National Insurance and student loan deductions, by contrast, never reduce minimum wage pay.`;
    },
    faqs: (h) => [
      { q: 'Can my employer take the cost of a lost uniform from my wages?', a: 'Yes, without breaking the minimum wage, if your contract makes you liable and the loss comes from your own conduct: losing it, damaging it through carelessness or not handing it back when you leave. A reasonable charge in those cases does not lower minimum wage pay. Charges for normal wear and tear, cleaning or repairs, or for a uniform stolen from the place the employer gave you to store it, do lower it.' },
      { q: 'Do I have to be repaid for black trousers the job asks me to wear?', a: `If the employer requires a dress code and you buy the clothes yourself, the cost reduces your minimum wage pay unless it is refunded. For plain clothing that is not from a named shop, HMRC suggests employers set a reasonable spending limit and reimburse up to it. On a ${h.gbp2(h.rate(2026, 21))} wage, an unrefunded purchase can push that pay period below the legal rate.` },
      { q: 'Does a deduction for a safety helmet or gloves count against minimum wage pay?', a: 'Yes. Protective equipment the employer is legally bound to provide, such as safety helmets, gloves or eye protection, cannot be charged to you without lowering the pay that counts. It makes no difference that you keep the item afterwards. The value of equipment you are given is not pay either, so it cannot be used to top up a low hourly rate.' },
      { q: 'Can training costs be taken from my final pay when I leave?', a: 'For training the job required, a deduction from your last pay is treated like any other: it lowers minimum wage pay in that final period and can leave you underpaid. The answer differs for a course you chose for your own development and agreed to repay if you left early. HMRC treats the repayment of that voluntary course as not reducing minimum wage pay.' },
    ],
    body: (h) => {
      const j = h.pay({ date: h.C.from, age: 27, hours: 40, gross: 520, deductions: 15 });
      const k = h.pay({ date: h.C.from, age: 19, hours: 24, gross: h.round2(11.2 * 24), deductions: 30 });
      const nextJ = h.round2(h.rate(2027, 27) * 40);
      return `
<h2>The uniform example, step by step</h2>
${h.table(['Step', 'Amount'], [
  ['Gross pay: 40 hours at £13', h.gbp(520)],
  ['Uniform rental paid to the employer', `−${h.gbp(15)}`],
  ['Pay that counts for the minimum wage', h.gbp(j.nmwPay)],
  ['Pay that counts per hour', `£${h.num(j.nmwPay / 40, 3)}`],
  ['Minimum for 40 hours at 27, from April 2026', h.gbp2(j.required)],
  ['Shortfall the employer must make up', h.gbp2(j.shortfall)],
], `Worked example from ${h.src('gov_employers', 'GOV.UK, Employers and the minimum wage')}, checked against the April 2026 rate.`, ['l', 'r'])}
<p>A pay rate that looks safe can still fail once kit is paid for. From 1 April 2027 the gap widens: the announced rate of ${h.gbp2(h.rate(2027, 27))} means 40 hours must come to ${h.gbp2(nextJ)}, so unless the hourly rate rises the same uniform charge would leave the worker ${h.gbp2(h.round2(nextJ - j.nmwPay))} short each week. That rate is announced, and still has to be set in regulations.</p>

<h2>Which costs reduce the pay that counts</h2>
<p>The test in the ${h.src('hmrc_calc', 'HMRC guidance on calculating the minimum wage')} is whether the money goes to the employer's own use and benefit, or meets a cost that comes with the job. Whether the employer makes a profit, whether the worker signed up to it and whether it comes from gross or net pay are all irrelevant.</p>
${h.table(['Charge or payment', 'Reduces minimum wage pay?'], [
  ['Uniform or work wear the job requires, not refunded', 'Yes'],
  ['Cleaning, laundry or repair of a uniform worn out in normal use', 'Yes'],
  ['Tools, protective equipment and other kit the job needs', 'Yes'],
  ['Training or exams the employer requires, even from the final pay', 'Yes'],
  ['Admin fees for handling a deduction or for a payslip', 'Yes'],
  ['Transport the employer arranges and deducts for', 'Yes'],
  ['Savings club money the employer holds', 'Yes'],
  ['Lost, unreturned or carelessly damaged kit, under the contract', 'No'],
  ['Repaying a loan, an advance or an overpayment of wages', 'No'],
  ['Income Tax, National Insurance, student loan', 'No'],
  ['Pension or union payments passed to a third party at your request', 'No'],
  ['Meals you choose to buy and pay for after payday', 'No'],
], 'Summary of the HMRC deduction rules. A meal paid by deduction from wages does reduce the pay that counts.', ['l', 'l'])}
<p>A charge lowers minimum wage pay in the pay reference period in which it is made, not the one it relates to. That is why a deduction from a final payslip, for training spread over a whole job, can create an underpayment in that last period on its own. The ${h.a('pay-reference-period', 'pay reference period page')} explains how each period is checked.</p>

<h2>Fees, licences and medical checks</h2>
<p>Work-related fees need a closer look. Where a registration is a personal condition for entering the trade before any job starts, such as a nurse's professional registration or a criminal records check, the worker paying for it does not lower minimum wage pay. Where the employer imposes the cost for this particular role, it does. HMRC gives the case of a meat processing firm that requires a medical certificate from every member of staff: any charge to workers for that check is a job expense and counts against their pay.</p>

<h2>A smaller example: kit on a part-time wage</h2>
<p>Take a worker aged 19 on ${h.gbp2(11.2)} an hour for 24 hours in a week, above the ${h.gbp2(h.rate(2026, 19))} rate for 18 to 20 year olds. In the week she starts, she pays ${h.gbp(30)} for the black jacket and non-slip shoes the employer names. Her gross pay of ${h.gbp2(h.round2(11.2 * 24))} falls to ${h.gbp2(k.nmwPay)} for minimum wage purposes, or ${h.gbp2(k.hourly)} an hour, and she is ${h.gbp2(k.shortfall)} below the floor that week. If the employer refunds the ${h.gbp(30)} within a reasonable time, the shortfall disappears. Try your own figures in the tool at the top of the page, or put a whole payslip through the checker under the summary.</p>
<p>Uniform costs combine with the other items that lower or leave out pay: a ${h.a('salary-sacrifice-minimum-wage', 'salary sacrifice')} reduces it further, and ${h.a('tips-and-service-charges', 'tips')} never make up for it. Where the result is below the rate, the ${h.a('report-underpayment', 'underpayment page')} sets out how to raise it.</p>`;
    },
  },
});
