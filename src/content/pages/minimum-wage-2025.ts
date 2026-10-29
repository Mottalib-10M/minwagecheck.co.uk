import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-2025',
  group: 'rates',
  order: 6,
  tool: { kind: 'mini:convert', props: { yr: 6, age: 21, h: 30 } },
  mini: { kind: 'mini:arrears', props: { yr: 6, age: 20, u: 150 } },
  related: ['minimum-wage-2026', 'minimum-wage-history', 'minimum-wage-arrears', 'report-underpayment'],
  sources: ['gov_rates', 'hmrc_enforce', 'gov_disputes'],
  en: {
    slug: 'minimum-wage-2025',
    nav: 'Rates April 2025 to March 2026',
    card: 'The rates of the 2025 to 2026 year (£12.21 at 21 and over), for checking last year’s payslips and working out back pay at today’s rate.',
    title: 'Minimum Wage 2025: UK Rates in Force Until March 2026',
    description: 'Minimum wage 2025 rates, in force from 1 April 2025 to 31 March 2026: £12.21 at 21 and over, £10 at 18 to 20, £7.55 for under 18s and apprentices, and back pay.',
    h1: 'Minimum wage 2025: the rates until 31 March 2026',
    intro: 'Set the year, age and hours: the tool gives the 2025 hourly rate and the weekly, monthly and yearly pay it meant.',
    resume: (h) => `From 1 April 2025 to 31 March 2026 the minimum wage was ${h.gbp2(h.rate(2025, 21))} an hour at 21 and over, ${h.gbp2(h.rate(2025, 18))} at 18 to 20, and ${h.gbp2(h.rate(2025, 16))} for 16 and 17 year olds and for apprentices under 19 or in their first year. The accommodation offset was ${h.gbp2(h.Y(2025).offsetDay)} a day. These rates no longer apply to new pay periods, but they are the yardstick for any pay period that started in that year, which is why they matter when you look back at last year's payslips. The rises in April 2025 were large for young workers: ${h.pc(h.rise(2024, 2025, 18), 1)} for 18 to 20 year olds and ${h.pc(h.rise(2024, 2025, 16), 1)} for under 18s and apprentices, against ${h.pc(h.rise(2024, 2025, 21), 1)} at 21 and over. An underpayment from that year is not repaid at the 2025 rate: it is converted at the rate for the same band when the employer repays it, ${h.gbp2(h.rate(2026, 21))} today at 21 and over.`,
    faqs: (h) => [
      { q: 'I was paid £11 an hour at 22 in 2025: how much am I owed?', a: `For each hour of working time, ${h.gbp2(h.round2(h.rate(2025, 22) - 11))} was missing against the ${h.gbp2(h.rate(2025, 22))} rate. Over 100 hours that is ${h.gbp(h.round2((h.rate(2025, 22) - 11) * 100))}. Repaid today, HMRC's formula raises it to ${h.gbp(h.arrears(h.round2((h.rate(2025, 22) - 11) * 100), h.rate(2025, 22), h.rate(2026, 22)))}, because the shortfall is converted at the current ${h.gbp2(h.rate(2026, 22))} rate. Count every hour of working time in those periods, not only the hours on your rota.` },
      { q: 'Which rate applies to a pay period that started on 28 March 2026?', a: `The 2025 rate. The test uses the rate in force on the first day of the pay reference period, so a week or a month that began before 1 April 2026 is checked against ${h.gbp2(h.rate(2025, 21))} at 21 and over, even if part of it fell in April. The next period, starting on or after 1 April, uses ${h.gbp2(h.rate(2026, 21))}.` },
      { q: 'How long can I wait to raise underpaid 2025 wages?', a: `You can complain to HMRC through the official form at any time, including after leaving the job, and employers must keep minimum wage records for ${h.num(h.E.recordsYears)} years. A civil court claim can reach back up to ${h.num(h.E.civilYears)} years. An employment tribunal claim for pay underpaid before ${h.date(h.E.tribunalChange)} had to start within ${h.num(h.E.tribunalMonthsBefore)} months, after telling Acas, so for 2025 the other routes usually remain.` },
    ],
    body: (h) => `
<h2>The 2025 to 2026 rates and how they compare</h2>
${h.table(['Band', 'April 2024 to March 2025', 'April 2025 to March 2026', 'Rise in 2025', 'From April 2026'], [
  ['21 and over', h.gbp2(h.rate(2024, 21)), h.gbp2(h.rate(2025, 21)), h.pc(h.rise(2024, 2025, 21), 1), h.gbp2(h.rate(2026, 21))],
  ['18 to 20', h.gbp2(h.rate(2024, 18)), h.gbp2(h.rate(2025, 18)), h.pc(h.rise(2024, 2025, 18), 1), h.gbp2(h.rate(2026, 18))],
  ['16 to 17', h.gbp2(h.rate(2024, 16)), h.gbp2(h.rate(2025, 16)), h.pc(h.rise(2024, 2025, 16), 1), h.gbp2(h.rate(2026, 16))],
  ['Apprentice', h.gbp2(h.Y(2024).apprentice), h.gbp2(h.Y(2025).apprentice), h.pc(h.Y(2025).apprentice / h.Y(2024).apprentice - 1, 1), h.gbp2(h.C.apprentice)],
], `Source: ${h.src('gov_rates', 'GOV.UK, rates between 1 April 2024 and 31 March 2026')}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>The 18 to 20 rate reached ${h.gbp2(h.rate(2025, 18))}, the first time that band reached ten pounds. Apprentices and under 18s gained ${h.gbp2(h.round2(h.rate(2025, 16) - h.rate(2024, 16)))} an hour in one step.</p>

<h2>Checking last year's payslips</h2>
<p>Take each payslip with a pay period that started between 1 April 2025 and 31 March 2026. For each one, write down the gross pay, any overtime or shift premium, tips paid through the payroll, any deduction for a uniform, tools or required training, and the hours you actually worked, including training and travel between jobs. Then:</p>
<ol>
<li>remove premiums and tips from the gross, and take off the deductions made for the employer's purposes;</li>
<li>divide what is left by the hours;</li>
<li>compare with the 2025 rate for the age you had on the first day of that period.</li>
</ol>
<p>The ${h.a('home', 'checker')} does this for one period: set the "pay period starts on" date in 2025 and it uses the rates of that year. Where your age changed during the year, remember that the new band only starts with the first pay period beginning on or after the birthday.</p>
<!--tool:mini:convert|{"yr":6,"age":19,"h":25}-->

<h2>From an underpayment to what is owed</h2>
<p>HMRC's ${h.src('hmrc_enforce', 'enforcement guidance')} turns a past shortfall into arrears with today's rate. Divide the shortfall by the rate in force at the time, then multiply by the current rate for the same band. A 20 year old who was ${h.gbp(150)} short in a 2025 pay period is owed ${h.gbp(h.arrears(150, h.rate(2025, 20), h.rate(2026, 20)))} if repaid now, because the 18 to 20 rate has gone from ${h.gbp2(h.rate(2025, 20))} to ${h.gbp2(h.rate(2026, 20))}. If the employer pays after 1 April 2027, the announced ${h.gbp2(h.rate(2027, 20))} applies and the sum becomes ${h.gbp(h.arrears(150, h.rate(2025, 20), h.rate(2027, 20)))}. The band used is the one you were in at the time, even if you have since had a birthday.</p>
<p>The tool under the summary does this calculation for any amount. The ${h.a('minimum-wage-arrears', 'arrears page')} covers the special case of age bands that changed in 2021.</p>

<h2>What to do with a shortfall from 2025</h2>
<p>Write to the employer with the periods, the hours and your calculation, and ask for the arrears. You are entitled to see the employer's minimum wage records for those periods. If the employer does not pay, the official ${h.src('gov_disputes', 'GOV.UK guidance on problems getting the minimum wage')} describes the routes: a complaint that HMRC investigates, Acas early conciliation, or a claim to an employment tribunal. The ${h.a('report-underpayment', 'underpayment page')} goes through each step and its conditions.</p>

<h2>Common gaps found in 2025 pay</h2>
<p>Three situations come up again and again when people look back at that year. A worker who turned 21 during the year and stayed on ${h.gbp2(h.rate(2025, 20))} instead of moving to ${h.gbp2(h.rate(2025, 21))} from the next pay period. An apprentice aged 19 or over who passed the first anniversary of the apprenticeship and was kept on ${h.gbp2(h.Y(2025).apprentice)}. And a worker whose pay was fine on paper but fell below the rate once a deduction for a required uniform or unpaid training time was taken into account. Each of these is an underpayment for every pay period it lasted.</p>`,
  },
});
