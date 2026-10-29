import { definePage } from '../../lib/guide-types';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default definePage({
  id: 'minimum-wage-16-year-old',
  group: 'ages',
  order: 2,
  tool: { kind: 'mini:young' },
  mini: { kind: 'mini:school' },
  related: ['minimum-wage-under-16', 'minimum-wage-17-year-old', 'apprentice-minimum-wage', 'uniform-deductions', 'part-time-minimum-wage'],
  sources: ['gov_rates', 'si_2026', 'leave_school', 'lpc_2027_news', 'hmrc_calc'],
  en: {
    slug: 'minimum-wage-16-year-old',
    nav: 'Aged 16',
    card: 'The 16 to 17 rate for a first job after school, weekly pay now and from April 2027, and how the rate has grown since 2019.',
    title: 'Minimum Wage for 16 Year Olds: £8 an Hour and Weekly Pay',
    description: 'A 16 year old who has left school is owed £8.00 an hour from April 2026, with £8.31 announced for April 2027. Weekly pay for a first job and rates since 2019.',
    h1: 'Minimum wage at 16: pay for a first job after school',
    intro: 'Enter the hours you work in a week and whether you are an apprentice: the tool gives the minimum weekly pay now and from April 2027.',
    resume: (h) => `A 16 year old who has passed school leaving age is owed at least the 16 to 17 rate: ${h.gbp2(h.rate(2026, 16))} an hour from 1 April 2026 to 31 March 2027, under the National Minimum Wage (Amendment) Regulations 2026. The figure is the same for a 16 year old apprentice, because the apprentice rate and the under 18 rate have been equal since April 2022. A first job of 20 hours a week must pay at least ${h.gbp(h.conv(h.rate(2026, 16), 20).weekly)}, and a 40-hour week, the most the law allows under 18, at least ${h.gbp(h.conv(h.rate(2026, 16), 40).weekly)}. On ${h.date(h.A.date)} the government announced ${h.gbp2(h.rate(2027, 16))} from 1 April 2027, a rise of ${h.pc(h.rise(2026, 2027, 16), 1)}, which still has to be set in regulations. In April 2019 the same band paid ${h.gbp2(h.rate(2019, 16))}. In England, a school leaver must stay in education or training until 18, which can mean a job of 20 hours a week or more next to part-time study; that duty has no effect on the hourly minimum. There is no step up at 17: the next legal rise by age comes at 18.`,
    faqs: (h) => [
      { q: 'Is a 16 year old on a Saturday job owed the same rate as a 17 year old?', a: `Yes. One band covers both ages, so a 16 year old and a 17 year old above school leaving age are each owed at least ${h.gbp2(h.rate(2026, 16))} an hour until 31 March 2027. The 17th birthday changes nothing on the payslip. The next rise by age comes at 18, when the 18 to 20 rate of ${h.gbp2(h.rate(2026, 18))} applies from the first pay period that starts on or after the birthday.` },
      { q: 'Does the duty to stay in learning until 18 in England lower my pay?', a: 'No. The duty asks a young person in England to be in full-time education, on an apprenticeship, or working or volunteering for 20 hours or more a week alongside part-time education. It sets no pay rate of its own. Every hour of paid work is owed at least the 16 to 17 rate, and the apprentice rate applies only to a genuine apprenticeship, not to any job combined with a college course.' },
      { q: 'How much more will a 16 year old earn per week from April 2027?', a: `The announced rate is ${h.gbp2(h.rate(2027, 16))}, ${h.gbp2(h.round2(h.rate(2027, 16) - h.rate(2026, 16)))} more per hour than today. At 20 hours a week that adds ${h.gbp2(h.round2((h.rate(2027, 16) - h.rate(2026, 16)) * 20))}, and at 40 hours ${h.gbp2(h.round2((h.rate(2027, 16) - h.rate(2026, 16)) * 40))}. The government announced these figures on ${h.date(h.A.date)}, accepting the Low Pay Commission's advice; they take effect on 1 April 2027 once the regulations are made.` },
      { q: 'What did a 16 year old earn per hour in 2019 compared with today?', a: `In April 2019 the under 18 rate was ${h.gbp2(h.rate(2019, 16))} an hour. It reached ${h.gbp2(h.rate(2022, 16))} in April 2022, ${h.gbp2(h.rate(2024, 16))} in April 2024 and ${h.gbp2(h.rate(2026, 16))} in April 2026, a rise of ${h.pc(h.rate(2026, 16) / h.rate(2019, 16) - 1)} over seven years. The biggest single jumps came in April 2024 and April 2025.` },
    ],
    body: (h) => `
<h2>The rate at 16, year by year</h2>
<p>The 16 to 17 band has risen faster than the adult rate in recent years. The table gives the hourly figure each April and what a regular 20-hour week came to.</p>
${h.table(['From April', 'Rate at 16 and 17', 'Rise on the year before', '20 hours a week'], YEARS.map((y, i) => [y === 2027 ? `${y} (announced)` : String(y), h.gbp2(h.rate(y, 16)), i === 0 ? '-' : h.pc(h.rise(YEARS[i - 1], y, 16), 1), h.gbp(h.conv(h.rate(y, 16), 20).weekly)]), `Source: ${h.src('gov_rates', 'GOV.UK rates page')}; April 2027 per the ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}.`, ['l', 'r', 'r', 'r'])}
<p>Rates change on 1 April each year, on the recommendation of the Low Pay Commission. For April 2027 the commission recommended the same rise for every band, ${h.pc(h.A.increasePct, 1)}, so a 16 year old gains in proportion what an adult gains.</p>

<h2>A first job after leaving school</h2>
<p>Take a school leaver in England whose last day was ${h.date('2026-06-26')}, the last Friday of June. From the day they pass school leaving age, any job pays at least ${h.gbp2(h.rate(2026, 16))} an hour. If they start in a café on 25 hours a week, the minimum is ${h.gbp(h.conv(h.rate(2026, 16), 25).weekly)} a week before any deduction.</p>
<p>What counts is the pay the employer leaves in their hands. If the café takes ${h.gbp(20)} a week for a uniform the job requires, ${h.src('hmrc_calc', "HMRC's rules")} count that against the minimum: the pay that counts drops to ${h.gbp(180)}, or ${h.gbp2(h.pay({ date: h.C.from, age: 16, hours: 25, gross: 200, deductions: 20 }).hourly)} an hour, which is below the legal rate even though the payslip shows ${h.gbp2(h.rate(2026, 16))}. Training the employer requires is working time too, and must be paid. The ${h.a('uniform-deductions', 'page on uniform deductions')} goes through this in more detail.</p>

<h2>England: learning until 18 alongside work</h2>
<p>GOV.UK sets out that in England a young person who has left school must, until 18, do one of three things: stay in full-time education, start an apprenticeship, or spend 20 hours or more a week working or volunteering while in part-time education. Many 16 year olds therefore hold a job of around 20 hours next to a college course. Their pay follows the ordinary rule: the 16 to 17 rate for each hour, whatever the course.</p>
<p>An apprenticeship is different, because it is a job built around training. At 16 the apprentice rate and the age rate are the same figure, so the choice between a job and an apprenticeship does not change the hourly minimum at this age. It matters later: an apprentice who turns 19 can stay on the apprentice rate during the first year, as the ${h.a('apprentice-minimum-wage', 'apprentice pay page')} explains.</p>

<h2>Weekly pay at 16 now and from April 2027</h2>
<p>The legal minimum is per hour, averaged over the pay period. These are the weekly floors at the current rate and at the rate announced for April 2027.</p>
${h.table(['Hours in the week', 'Until 31 March 2027', 'From 1 April 2027 (announced)', 'Extra per week'], [8, 15, 20, 30, 40].map((n) => [`${n} hours`, h.gbp(h.conv(h.rate(2026, 16), n).weekly), h.gbp(h.conv(h.rate(2027, 16), n).weekly), h.gbp(h.round2(h.conv(h.rate(2027, 16), n).weekly - h.conv(h.rate(2026, 16), n).weekly))]), 'Gross pay, before any deduction, for a worker aged 16 or 17.', ['l', 'r', 'r', 'r'])}
<p>Forty hours is the ceiling: a worker under 18 may not work more than ${h.YNG.under18MaxWeek} hours a week or ${h.YNG.under18MaxDay} hours a day, and cannot sign away that limit. The ${h.a('minimum-wage-17-year-old', 'page on pay at 17')} goes through the breaks and rest periods that come with it.</p>
<!--tool:mini:convert|{"age":16,"h":25}-->

<h2>What comes next by age</h2>
<p>The rate stays at the 16 to 17 figure until the 18th birthday, then moves to ${h.gbp2(h.rate(2026, 18))} under the April 2026 rates, a jump of ${h.gbp2(h.round2(h.rate(2026, 18) - h.rate(2026, 16)))} an hour. The higher rate starts with the first pay reference period that begins on or after the birthday, not on payday. Anyone younger than school leaving age is in a different position altogether, covered on the ${h.a('minimum-wage-under-16', 'under 16 page')}.</p>`,
  },
});
