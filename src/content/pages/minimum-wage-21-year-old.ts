import { definePage } from '../../lib/guide-types';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default definePage({
  id: 'minimum-wage-21-year-old',
  group: 'ages',
  order: 7,
  tool: { kind: 'mini:convert', props: { age: 21 } },
  mini: { kind: 'mini:april2027', props: { age: 21 } },
  related: ['national-living-wage', 'minimum-wage-20-year-old', 'minimum-wage-history', 'real-living-wage', 'accommodation-offset'],
  sources: ['gov_rates', 'si_2026', 'lpc_2027_news', 'lpc_2027', 'rlw', 'gov_accom'],
  en: {
    slug: 'minimum-wage-21-year-old',
    nav: 'Aged 21',
    card: 'The National Living Wage at 21 since April 2024, full-time pay at £12.71, the rate announced for April 2027 and how the age came down.',
    title: 'Minimum Wage at 21: National Living Wage of £12.71 an Hour',
    description: 'At 21 you are owed the National Living Wage, £12.71 an hour, with £13.21 announced for April 2027. Full-time pay, and how its age fell from 25 to 23 to 21.',
    h1: 'Minimum wage at 21: the National Living Wage',
    intro: 'The age is set to 21: enter your weekly hours to see the National Living Wage per week, month and year for the year you choose.',
    resume: (h) => `At 21 a worker is owed the National Living Wage, the top legal rate: ${h.gbp2(h.rate(2026, 21))} an hour from 1 April 2026 to 31 March 2027, the same as a worker of 30 or 60. That has only been true since 1 April 2024. From April 2021 to March 2024 the National Living Wage started at 23, and before April 2021 at 25, so a 21 year old was on a lower band: ${h.gbp2(h.rate(2023, 21))} an hour in 2023, against ${h.gbp2(h.rate(2023, 25))} for older workers. A full-time week of 37.5 hours at the current rate is ${h.gbp(h.conv(h.rate(2026, 21), 37.5).weekly)}, or ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} over 52 weeks; at 40 hours, ${h.gbp(h.conv(h.rate(2026, 21), 40).annual)}. On ${h.date(h.A.date)} the government announced ${h.gbp2(h.rate(2027, 21))} from 1 April 2027, ${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2026, 21)))} more per hour, to be set in regulations. The main exception at 21 is an apprentice in the first year of the apprenticeship, who is owed the apprentice rate of ${h.gbp2(h.C.apprentice)}.`,
    faqs: (h) => [
      { q: 'Is a 21 year old owed the same minimum as a 40 year old?', a: `Yes. Since 1 April 2024 the National Living Wage has applied from 21, and there is no higher legal band above it. A 21 year old and a 40 year old doing the same job are each owed at least ${h.gbp2(h.rate(2026, 21))} an hour under the April 2026 rates. Any difference in pay between them is the employer's choice, not the law.` },
      { q: 'What was the minimum wage for a 21 year old before the age came down?', a: `From April 2021 to March 2024 a 21 year old was in the 21 to 22 band: ${h.gbp2(h.rate(2021, 21))} in 2021, ${h.gbp2(h.rate(2022, 21))} in 2022 and ${h.gbp2(h.rate(2023, 21))} in 2023. Before that, the band ran from 21 to 24, at ${h.gbp2(h.rate(2019, 21))} in April 2019. In April 2024 a 21 year old moved straight to ${h.gbp2(h.rate(2024, 21))}, a rise of ${h.pc(h.rate(2024, 21) / h.rate(2023, 21) - 1, 1)}.` },
      { q: 'How much is the National Living Wage for a 40-hour week?', a: `At ${h.gbp2(h.rate(2026, 21))} an hour, 40 hours comes to ${h.gbp(h.conv(h.rate(2026, 21), 40).weekly)} a week, ${h.gbp(h.conv(h.rate(2026, 21), 40).monthly)} a month counting a month as a twelfth of 52 weeks, and ${h.gbp(h.conv(h.rate(2026, 21), 40).annual)} a year, all before tax. With the rate announced for April 2027 the year would come to ${h.gbp(h.conv(h.rate(2027, 21), 40).annual)}.` },
      { q: 'Is the real Living Wage the legal minimum at 21?', a: `No. The real Living Wage is a voluntary rate set by the Living Wage Foundation: ${h.gbp2(h.RLW['2026'].uk)} an hour across the UK and ${h.gbp2(h.RLW['2026'].london)} in London, announced on ${h.date(h.RLW['2026'].announced)}. Accredited employers are asked to pay it by ${h.date(h.RLW['2026'].implementBy)}. The legal minimum at 21 remains the National Living Wage.` },
    ],
    body: (h) => `
<h2>The age of the National Living Wage: 25, 23, 21</h2>
<p>Until March 2021 the National Living Wage applied from 25. The age dropped to 23 in April 2021 and to 21 in April 2024. The table shows what that meant for someone aged exactly 21.</p>
${h.table(['From April', 'National Living Wage from age', 'Legal rate at 21', 'National Living Wage'], YEARS.map((y) => [y === 2027 ? `${y} (announced)` : String(y), String(h.Y(y).nlwAge), h.gbp2(h.rate(y, 21)), h.gbp2(h.rate(y, 25))]), `Source: ${h.src('gov_rates', 'GOV.UK rates page')}, previous rates since April 2019.`, ['l', 'r', 'r', 'r'])}
<p>Between April 2019 and April 2026 the legal rate at 21 rose from ${h.gbp2(h.rate(2019, 21))} to ${h.gbp2(h.rate(2026, 21))}, a rise of ${h.pc(h.rate(2026, 21) / h.rate(2019, 21) - 1)}. Over the same years the National Living Wage itself rose by ${h.pc(h.rate(2026, 25) / h.rate(2019, 25) - 1)}. The difference comes from the two age changes: a 21 year old caught up with the top rate in April 2024 instead of waiting until 23 or 25.</p>

<h2>Full-time pay at 21</h2>
<p>Most full-time contracts fall between 35 and 40 hours. Converted at the April 2026 rate, these are the minimum gross amounts.</p>
${h.table(['Hours a week', 'Per week', 'Per month', 'Per year'], [30, 35, 37.5, 40, 45].map((n) => [h.num(n, n % 1 ? 1 : 0), h.gbp(h.conv(h.rate(2026, 21), n).weekly), h.gbp(h.conv(h.rate(2026, 21), n).monthly), h.gbp(h.conv(h.rate(2026, 21), n).annual)]), 'National Living Wage of April 2026. A month is a twelfth of 52 weeks.', ['l', 'r', 'r', 'r'])}
<p>Above 48 hours a week on average, the working time limit applies unless the worker has opted out. For pay, each hour still has to be covered: the check divides the pay for each pay period by all the hours worked in it, and premiums paid for overtime are left out of the pay side.</p>
<p>After Income Tax and National Insurance for 2026 to 2027, with a standard tax code outside Scotland, a year of 37.5-hour weeks at 21 leaves ${h.gbp(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net)}, about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 21), 37.5).annual, '2026').net / 12))} a month. The 21st birthday also changes the cost for the employer, though not the worker's pay: the relief that sets employer National Insurance at 0% for workers under 21 stops, as the ${h.a('employer-cost-minimum-wage', 'employer cost page')} shows.</p>

<h2>What April 2027 brings at 21</h2>
<p>The ${h.src('lpc_2027', 'Low Pay Commission')} recommended ${h.gbp2(h.rate(2027, 21))} for April 2027, a rise of ${h.pc(h.rise(2026, 2027, 21), 1)}, and the government accepted it in full on ${h.date(h.A.date)}. The regulations had not been made on the day this page was checked. The commission estimated that reaching its reference point, two thirds of median hourly earnings, by October 2027 would need ${h.gbp2(h.A.referenceRate)}; the recommended rate stops short of that, as it weighed a weak labour market against the cost of living.</p>
<p>For a 21 year old on 37.5 hours a week, the announced rise is worth ${h.gbp2(h.round2((h.rate(2027, 21) - h.rate(2026, 21)) * 37.5))} a week, or ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2026, 21)) * 37.5 * 52))} a year before tax.</p>
<!--tool:mini:net|{"age":21,"h":37.5}-->

<h2>When a 21 year old can be paid less</h2>
<p>Two situations lower the figure lawfully. The first is an apprenticeship: GOV.UK's own example is a 21 year old apprentice owed ${h.gbp2(h.C.apprentice)} during the first year and ${h.gbp2(h.rate(2026, 21))} after it. The second is accommodation provided by the employer, which can count towards the minimum up to ${h.gbp2(h.C.offsetDay)} a day under the ${h.src('gov_accom', 'accommodation offset')}. Charges for a uniform the job requires work the other way and can push pay below the rate. The ${h.a('accommodation-offset', 'accommodation offset page')} works through room charges, and the ${h.a('national-living-wage', 'National Living Wage page')} covers the rate for every age from 21.</p>`,
  },
});
