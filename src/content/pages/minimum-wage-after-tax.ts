import { definePage } from '../../lib/guide-types';

const BANDS: Array<[number, string]> = [[21, '21 and over'], [18, '18 to 20'], [16, '16 to 17 and apprentices']];

export default definePage({
  id: 'minimum-wage-after-tax',
  group: 'pay',
  order: 4,
  tool: { kind: 'mini:net' },
  mini: { kind: 'mini:convert' },
  related: ['minimum-wage-annual-salary', 'minimum-wage-monthly', 'part-time-minimum-wage', 'salary-sacrifice-minimum-wage'],
  sources: ['rates_thresholds', 'budget_annex', 'gov_rates', 'hmrc_calc'],
  en: {
    slug: 'minimum-wage-after-tax',
    nav: 'After tax',
    card: 'Take-home pay at each minimum wage rate after Income Tax and National Insurance, in Scotland and the rest of the UK, for 2026 and 2027.',
    title: 'Minimum Wage After Tax: Take-Home Pay in 2026 and 2027',
    description: 'Take-home pay at the minimum wage after Income Tax and National Insurance: about £1,780 a month for 37.5 hours at 21 and over. Scotland and April 2027 compared.',
    h1: 'Minimum wage after tax: what you take home',
    intro: 'Choose the year, your age, weekly hours and where you pay tax: the tool gives the take-home pay per month and per week.',
    resume: (h) => `A worker on the National Living Wage of ${h.gbp2(h.rate(2026, 21))} for 37.5 hours a week earns ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} a year before deductions. In the 2026 to 2027 tax year, with tax code 1257L and no other income, student loan or pension, ${h.gbp(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').tax)} goes in Income Tax and ${h.gbp(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').ni)} in National Insurance in England, Wales and Northern Ireland, leaving ${h.gbp(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net)}, or about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net / 12))} a month. In Scotland the starter rate of 19% makes the Income Tax ${h.gbp(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026', true).tax)}, slightly less. At the 18 to 20 rate the same hours leave about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 18), 37.5).annual, '2026').net / 12))} a month. For 2027 to 2028, the Budget of ${h.date(h.A.date)} kept the personal allowance at ${h.gbp(h.TAX['2027'].personalAllowance)} and the National Insurance thresholds unchanged, so the National Living Wage announced at ${h.gbp2(h.rate(2027, 21))} would leave about ${h.gbp(h.round2(h.net(h.conv(h.rate(2027, 21), 37.5).annual, '2027').net / 12))} a month outside Scotland. The Scottish bands for 2027 to 2028 had not been published. The minimum wage itself is always checked on pay before tax.`,
    faqs: (h) => [
      { q: 'How much is the National Living Wage after tax per month?', a: `For 37.5 hours a week in 2026 to 2027, about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net / 12))} a month outside Scotland, with a standard tax code and no student loan or pension. For 40 hours, about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 21), 40).annual, '2026').net / 12))}. In both cases roughly 28 pence of every pound earned above ${h.gbp(h.TAX['2026'].personalAllowance)} a year goes in Income Tax and National Insurance together.` },
      { q: 'Why is Scottish take-home pay for 2027 to 2028 not known yet?', a: 'Scottish Income Tax has its own bands and rates, and they had not been published for 2027 to 2028 when this page was checked. The UK Budget confirmed the personal allowance and the National Insurance thresholds for that year, which apply in Scotland too. Until the Scottish figures appear, the tool on this page uses the 2026 to 2027 Scottish bands and says so under the result.' },
      { q: 'Does the minimum wage check use pay before or after tax?', a: 'Before tax. HMRC lists Income Tax, National Insurance and student loan repayments among deductions that do not reduce pay for minimum wage purposes. A payslip showing take-home pay below the hourly rate times the hours is therefore normal. What matters is the gross pay that counts, after removing items such as overtime premiums and tips and taking off charges such as a required uniform.' },
      { q: 'How much of the April 2027 rise would a full-time worker keep?', a: `On 37.5 hours a week, the announced rise from ${h.gbp2(h.rate(2026, 21))} to ${h.gbp2(h.rate(2027, 21))} adds ${h.gbp(h.round2(h.conv(h.rate(2027, 21), 37.5).annual - h.conv(h.rate(2026, 21), 37.5).annual))} a year before tax. With thresholds frozen, ${h.gbp(h.round2(h.net(h.conv(h.rate(2027, 21), 37.5).annual, '2027').net - h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net))} of it would be left after Income Tax at 20% and National Insurance at 8%, outside Scotland. In Scotland the answer depends on bands that are not yet published.` },
    ],
    body: (h) => `
<h2>Take-home at 37.5 hours, by rate</h2>
<p>The table uses the ${h.src('rates_thresholds', '2026 to 2027 thresholds')}: a personal allowance of ${h.gbp(h.TAX['2026'].personalAllowance)}, Income Tax at 20% on the next ${h.gbp(h.TAX['2026'].ruk[0].upTo as number)} outside Scotland, and employee National Insurance at 8% between ${h.gbp(h.TAX['2026'].niPrimary)} and ${h.gbp(h.TAX['2026'].niUpper)}.</p>
${h.table(['Rate', 'Gross a year', 'Income Tax', 'National Insurance', 'Per month, outside Scotland', 'Per month, Scotland'], BANDS.map(([a, l]) => { const g = h.conv(h.rate(2026, a), 37.5).annual; const r = h.net(g, '2026'); const s = h.net(g, '2026', true); return [l, h.gbp(g), h.gbp(r.tax), h.gbp(r.ni), h.gbp(h.round2(r.net / 12)), h.gbp(h.round2(s.net / 12))]; }), 'Tax year 2026 to 2027, tax code 1257L, no student loan, pension or other income. Income Tax column: outside Scotland.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>At the 16 to 17 and apprentice rate, a full-time year of ${h.gbp(h.conv(h.rate(2026, 16), 37.5).annual)} sits only a little above the personal allowance, so the deductions are small. At the National Living Wage they come to about ${h.pc((h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').tax + h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').ni) / h.conv(h.rate(2026, 21), 37.5).annual)} of gross pay.</p>

<h2>Scotland against the rest of the UK</h2>
<p>Taxpayers in Scotland pay Income Tax on earnings at Scottish rates, with bands of their own. For 2026 to 2027 the bands above the personal allowance are 19% on the first ${h.gbp(h.TAX['2026'].scotland[0].upTo as number)}, 20% up to ${h.gbp(h.TAX['2026'].scotland[1].upTo as number)} and 21% up to ${h.gbp(h.TAX['2026'].scotland[2].upTo as number)}, before the higher rates. At minimum wage pay only the first two or three bands are reached. National Insurance does not change.</p>
${h.table(['Hours a week at 21 and over', 'Income Tax outside Scotland', 'Income Tax in Scotland', 'Difference a year'], [20, 30, 37.5, 40, 45].map((n) => { const g = h.conv(h.rate(2026, 21), n).annual; const a = h.net(g, '2026').tax; const b = h.net(g, '2026', true).tax; return [h.num(n, n % 1 ? 1 : 0), h.gbp(a), h.gbp(b), h.gbp(h.round2(a - b))]; }), 'National Living Wage of April 2026, tax year 2026 to 2027.', ['l', 'r', 'r', 'r'])}
<p>The starter rate is one point below the basic rate on the first ${h.gbp(h.TAX['2026'].scotland[0].upTo as number)} above the allowance, so it saves at most ${h.gbp2(h.round2((h.TAX['2026'].scotland[0].upTo as number) * 0.01))} a year. Above total earnings of ${h.gbp(h.TAX['2026'].personalAllowance + (h.TAX['2026'].scotland[1].upTo as number))}, the 21% band starts to take back part of that saving, which is why the gap narrows at 45 hours.</p>

<h2>Take-home from April 2027</h2>
<p>The ${h.src('budget_annex', "Budget's table of rates and allowances")} kept the personal allowance, the basic rate limit and the National Insurance thresholds for 2027 to 2028 where they were. Combined with the rates announced for April 2027, which still have to be set in regulations, a 37.5-hour week outside Scotland would leave:</p>
${h.table(['Rate', 'Gross a year', 'Take-home a year', 'Take-home a month', 'More a month than in 2026 to 2027'], BANDS.map(([a, l]) => { const g = h.conv(h.rate(2027, a), 37.5).annual; const r = h.net(g, '2027'); const o = h.net(h.conv(h.rate(2026, a), 37.5).annual, '2026'); return [l, h.gbp(g), h.gbp(r.net), h.gbp(h.round2(r.net / 12)), h.gbp(h.round2((r.net - o.net) / 12))]; }), 'Announced April 2027 rates, 2027 to 2028 thresholds, England, Wales and Northern Ireland.', ['l', 'r', 'r', 'r', 'r'])}
<p>For Scotland no 2027 to 2028 figure is given here: the Scottish bands for that year had not been published. The tool above keeps the 2026 to 2027 Scottish bands as a stand-in and flags it.</p>
<!--tool:mini:net|{"yr":8,"age":21,"h":37.5}-->

<h2>Tax does not count against the minimum</h2>
<p>${h.src('hmrc_calc', "HMRC's guidance")} lists Income Tax, National Insurance and student loan repayments among the deductions that leave minimum wage pay untouched. So does a worker's own pension contribution paid to a scheme, unless it is made by salary sacrifice, which lowers the pay that counts. The ${h.a('salary-sacrifice-minimum-wage', 'salary sacrifice page')} explains that difference, and the ${h.a('minimum-wage-annual-salary', 'annual salary page')} gives the gross figures this page starts from.</p>`,
  },
});
