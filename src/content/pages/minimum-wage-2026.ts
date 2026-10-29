import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-2026',
  group: 'rates',
  order: 1,
  tool: { kind: 'mini:convert', props: { yr: 7, age: 25, h: 37.5 } },
  mini: { kind: 'mini:history', props: { yr: 6, age: 21 } },
  related: ['minimum-wage-april-2027', 'national-living-wage', 'minimum-wage-2025', 'home'],
  sources: ['si_2026', 'gov_rates', 'lpc_report', 'gov_accom'],
  en: {
    slug: 'minimum-wage-2026',
    nav: 'Rates from April 2026',
    card: 'The four legal hourly rates in force from 1 April 2026 to 31 March 2027, the rise on 2025 and the accommodation offset.',
    title: 'Minimum Wage 2026: UK Rates by Age From 1 April 2026',
    description: 'Minimum wage 2026 rates in force until 31 March 2027: £12.71 at 21 and over, £10.85 at 18 to 20, £8 for under 18s and apprentices, with weekly and yearly pay.',
    h1: 'Minimum wage 2026: the rates from 1 April 2026',
    intro: 'Choose the year, your age, apprenticeship and weekly hours: the tool gives the hourly minimum and what it comes to per week, month and year.',
    resume: (h) => `From 1 April 2026 to 31 March 2027 the legal minimum per hour in the United Kingdom is ${h.gbp2(h.rate(2026, 21))} for workers aged 21 and over (the National Living Wage), ${h.gbp2(h.rate(2026, 18))} for workers aged 18 to 20, and ${h.gbp2(h.rate(2026, 16))} for workers aged 16 and 17 and for apprentices under 19 or in the first year of their apprenticeship. The rates were set by the National Minimum Wage (Amendment) Regulations 2026, made on ${h.date('2026-03-19')} on the recommendation of the Low Pay Commission. Against April 2025 the rise is ${h.pc(h.rise(2025, 2026, 21), 1)} at 21 and over, ${h.pc(h.rise(2025, 2026, 18), 1)} at 18 to 20 and ${h.pc(h.rise(2025, 2026, 16), 1)} for under 18s and apprentices. A full-time week of 37.5 hours at the National Living Wage pays ${h.gbp(h.conv(h.rate(2026, 21), 37.5).weekly)}, or ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} over 52 weeks. The accommodation offset, the most an employer can count for a room it provides, is ${h.gbp2(h.C.offsetDay)} a day. These rates stay in force until the April 2027 rates replace them.`,
    faqs: (h) => [
      { q: 'Do the 2026 rates apply in Scotland, Wales and Northern Ireland?', a: `Yes. The minimum wage is set for the whole of the United Kingdom by one set of regulations, so ${h.gbp2(h.rate(2026, 21))} at 21 and over applies in Glasgow, Cardiff and Belfast as it does in London. There is no regional legal rate. Some employers pay a voluntary higher rate, such as the real Living Wage with its separate London figure, but that is a choice, not the law.` },
      { q: 'My employer still paid the 2025 rate in April 2026: what do I lose?', a: `The new rate applies from the first pay reference period that starts on or after 1 April 2026. Each hour paid at the old ${h.gbp2(h.rate(2025, 21))} instead of ${h.gbp2(h.rate(2026, 21))} leaves ${h.gbp2(h.round2(h.rate(2026, 21) - h.rate(2025, 21)))} unpaid for a worker aged 21 and over. The shortfall is arrears: the employer must pay it, recalculated at the rate in force when it is repaid.` },
      { q: 'Is the £8 rate the same for a 17 year old and a first year apprentice?', a: `Yes, from April 2026 both are ${h.gbp2(h.rate(2026, 17))}. The two rates have been equal since April 2022. They differ in who they cover: the 16 to 17 rate follows age alone, while the apprentice rate covers anyone under 19 on an apprenticeship and anyone aged 19 or over in its first year, whatever their age.` },
      { q: 'Are the April 2026 rates still in force today?', a: `They apply to every pay reference period starting from 1 April 2026 to 31 March 2027. On ${h.date(h.A.date)} the government announced the rates that replace them from 1 April 2027: ${h.gbp2(h.rate(2027, 21))} at 21 and over. Until that date, the 2026 figures are the legal minimum.` },
    ],
    body: (h) => `
<h2>The four rates in one table</h2>
<p>Each band covers an age on the first day of the pay reference period. The apprentice rate covers apprentices under 19, and those aged 19 or over during the first twelve months of their apprenticeship; after that, the rate for their age applies.</p>
${h.table(['Band', 'From 1 April 2026', 'Until 31 March 2026', 'Rise'], [[`21 and over (National Living Wage)`, h.gbp2(h.rate(2026, 21)), h.gbp2(h.rate(2025, 21)), h.pc(h.rise(2025, 2026, 21), 1)], ['18 to 20', h.gbp2(h.rate(2026, 18)), h.gbp2(h.rate(2025, 18)), h.pc(h.rise(2025, 2026, 18), 1)], ['16 to 17', h.gbp2(h.rate(2026, 16)), h.gbp2(h.rate(2025, 16)), h.pc(h.rise(2025, 2026, 16), 1)], ['Apprentice', h.gbp2(h.C.apprentice), h.gbp2(h.Y(2025).apprentice), h.pc(h.C.apprentice / h.Y(2025).apprentice - 1, 1)]], `Source: ${h.src('si_2026', 'SI 2026/357')} and ${h.src('gov_rates', 'GOV.UK rates page')}.`, ['l', 'r', 'r', 'r'])}
<p>The biggest rise went to workers aged 18 to 20, which narrowed the gap with the National Living Wage. The government's remit to the Low Pay Commission keeps the aim of a single adult rate from age 18; the ${h.a('national-living-wage-age-18', 'page on that change')} follows where it stands.</p>

<h2>What the rates mean per week and per year</h2>
<p>The legal minimum is hourly. Weekly pay is the rate times the hours, a year is 52 weeks, and a month is a twelfth of the year. The figures below are gross, before tax and National Insurance.</p>
${h.table(['Hours a week', '21 and over', '18 to 20', '16 to 17 and apprentices'], [16, 20, 30, 37.5, 40].map((n) => [h.num(n, n % 1 ? 1 : 0), `${h.gbp(h.conv(h.rate(2026, 21), n).weekly)} a week`, `${h.gbp(h.conv(h.rate(2026, 18), n).weekly)} a week`, `${h.gbp(h.conv(h.rate(2026, 16), n).weekly)} a week`]), 'Gross weekly pay at the April 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>At 37.5 hours a week, a year at the National Living Wage comes to ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)}; at 40 hours, ${h.gbp(h.conv(h.rate(2026, 21), 40).annual)}. The ${h.a('minimum-wage-annual-salary', 'annual salary page')} turns any number of hours into a yearly figure and the ${h.a('minimum-wage-after-tax', 'after tax page')} shows what is left once Income Tax and National Insurance are taken.</p>
<!--tool:mini:net|{"yr":7,"h":37.5}-->

<h2>When the 2026 rate starts for you</h2>
<p>The rise does not wait for a payday. It applies to each pay reference period that begins on or after 1 April 2026: the week, fortnight, four weeks or month your pay is calculated over. A worker paid monthly from the 15th to the 14th got the new rate from 15 April, while a weekly paid worker whose week starts on Monday got it from Monday 6 April. Hours in a period that began before 1 April are still checked against the April 2025 rate.</p>
<p>Birthdays follow the same logic. Someone turning 21 in June 2026 moves from ${h.gbp2(h.rate(2026, 20))} to ${h.gbp2(h.rate(2026, 21))} from the first pay period starting on or after the birthday. The ${h.a('birthday-pay-rise', 'birthday page')} gives the exact date for any pay cycle.</p>

<h2>The accommodation offset in 2026</h2>
<p>If your employer gives you somewhere to live, it may count up to ${h.gbp2(h.C.offsetDay)} for each day of accommodation towards your minimum wage pay, which is ${h.gbp2(h.round2(h.C.offsetDay * 7))} a week. When the room is free, that value is added to your pay for the check. When you are charged more than the offset, the excess is taken off your pay. A charge at or below the offset has no effect. The ${h.a('accommodation-offset', 'accommodation offset page')} works through each case with its own checker.</p>

<h2>Checking a payslip against the 2026 rate</h2>
<p>The rate is a floor for the pay that counts, which is not always the gross on the payslip. Overtime premiums and tips are left out, while uniforms you pay for and salary sacrifice reduce it. Enter one pay period in the ${h.a('home', 'minimum wage checker')} to see the pay that counts and any shortfall. Where you think you have been underpaid, the ${h.a('report-underpayment', 'underpayment page')} sets out how to raise it with the employer and how to complain to the official service. The rates for older years, for arrears that go back further, are on the ${h.a('minimum-wage-history', 'history page')}.</p>`,
  },
});
