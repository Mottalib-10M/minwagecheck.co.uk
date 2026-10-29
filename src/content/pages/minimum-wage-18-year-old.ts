import { definePage } from '../../lib/guide-types';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default definePage({
  id: 'minimum-wage-18-year-old',
  group: 'ages',
  order: 4,
  tool: { kind: 'mini:convert', props: { age: 18 } },
  mini: { kind: 'mini:net', props: { age: 18 } },
  related: ['minimum-wage-20-year-old', 'national-living-wage-age-18', 'minimum-wage-after-tax', 'minimum-wage-17-year-old', 'minimum-wage-history'],
  sources: ['gov_rates', 'si_2026', 'lpc_2027', 'lpc_remit', 'rates_thresholds', 'hmrc_elig'],
  en: {
    slug: 'minimum-wage-18-year-old',
    nav: 'Aged 18',
    card: 'The 18 to 20 rate at 18, what a full-time week leaves after tax, how the band has moved since 2019 and the plan for one adult rate.',
    title: 'Minimum Wage at 18: £10.85 an Hour and What You Take Home',
    description: 'At 18 the legal minimum is £10.85 an hour, with £11.27 announced for April 2027. Take-home pay after tax, the 18 to 20 band since 2019 and the plan to end it.',
    h1: 'Minimum wage at 18: the 18 to 20 rate and your take-home pay',
    intro: 'The age is set to 18: enter your weekly hours to see the minimum per week, month and year at the rates of the year you choose.',
    resume: (h) => `From the first pay reference period that starts on or after the 18th birthday, a worker is owed the 18 to 20 rate: ${h.gbp2(h.rate(2026, 18))} an hour from 1 April 2026 to 31 March 2027, up ${h.pc(h.rise(2025, 2026, 18), 1)} on the ${h.gbp2(h.rate(2025, 18))} of April 2025, the largest rise of any band that year. A full-time week of 37.5 hours comes to ${h.gbp(h.conv(h.rate(2026, 18), 37.5).weekly)} gross, or ${h.gbp(h.conv(h.rate(2026, 18), 37.5).annual)} over 52 weeks. After Income Tax and National Insurance, with a standard tax code in England, Wales or Northern Ireland, about ${h.gbp(h.round2(h.net(h.conv(h.rate(2026, 18), 37.5).annual, '2026').net / 12))} a month is left. On ${h.date(h.A.date)} the government announced ${h.gbp2(h.rate(2027, 18))} from 1 April 2027, a rise of ${h.pc(h.rise(2026, 2027, 18), 1)} still to be set in regulations. The band has existed throughout: it paid ${h.gbp2(h.rate(2019, 18))} in April 2019. The government's stated aim is to extend the National Living Wage to everyone from 18, but no law or date has been set, and for April 2027 the Low Pay Commission paused the narrowing of the gap.`,
    faqs: (h) => [
      { q: 'Do 18 year olds on the minimum wage pay less tax in Scotland?', a: `Slightly less. On ${h.gbp(h.conv(h.rate(2026, 18), 37.5).annual)} a year, Scottish Income Tax for 2026 to 2027 comes to ${h.gbp(h.net(h.conv(h.rate(2026, 18), 37.5).annual, '2026', true).tax)}, against ${h.gbp(h.net(h.conv(h.rate(2026, 18), 37.5).annual, '2026').tax)} in the rest of the UK, because the first slice above the personal allowance is taxed at 19% rather than 20%. National Insurance is the same everywhere: ${h.gbp(h.net(h.conv(h.rate(2026, 18), 37.5).annual, '2026').ni)} a year at this pay.` },
      { q: 'Will the 18 to 20 rate be replaced by the National Living Wage?', a: `The government has said it wants one adult rate from age 18, and its remit to the Low Pay Commission, published on ${h.date(h.REMIT.published)}, keeps that aim. It is not law and has no date. For April 2027 the commission paused the narrowing of the gap, so the separate 18 to 20 rate continues at ${h.gbp2(h.rate(2027, 18))} from that date, as announced.` },
      { q: 'Does an 18 year old apprentice get the 18 to 20 rate?', a: `No, not while the apprenticeship lasts and they are under 19. Apprentices under 19 are owed the apprentice rate, ${h.gbp2(h.C.apprentice)} an hour, whatever year of the course they are in. HMRC's own example is an 18 year old in a hair salon: paid the 18 to 20 rate before the apprenticeship, the apprentice rate during its first year, and the rate for her age again afterwards.` },
      { q: 'How much is the 18 to 20 rate per month for full-time work?', a: `At ${h.gbp2(h.rate(2026, 18))} an hour, 37.5 hours a week comes to ${h.gbp(h.conv(h.rate(2026, 18), 37.5).monthly)} a month gross, counting a month as a twelfth of 52 weeks. At 40 hours it is ${h.gbp(h.conv(h.rate(2026, 18), 40).monthly)}. Each pay period is still checked on its own hours, so a month with more working days must pay for those extra hours.` },
    ],
    body: (h) => `
<h2>The 18 to 20 band since 2019</h2>
<p>The 18 to 20 rate has always sat below the top rate. What has changed is the distance: the share of the top rate paid to an 18 year old drifted down until 2023, then climbed fast from April 2024.</p>
${h.table(['From April', '18 to 20 rate', 'National Living Wage', '18 to 20 as a share'], YEARS.map((y) => [y === 2027 ? `${y} (announced)` : String(y), h.gbp2(h.rate(y, 18)), h.gbp2(h.rate(y, 25)), h.pc(h.rate(y, 18) / h.rate(y, 25), 1)]), `Source: ${h.src('gov_rates', 'GOV.UK rates page')}. The National Living Wage started at 25 until March 2021, then at 23, and at 21 since April 2024.`, ['l', 'r', 'r', 'r'])}
<p>In April 2019 an 18 year old was owed ${h.pc(h.rate(2019, 18) / h.rate(2019, 25), 1)} of the top rate; by April 2026 the figure was ${h.pc(h.rate(2026, 18) / h.rate(2026, 21), 1)}. The ${h.pc(h.rise(2025, 2026, 18), 1)} rise of April 2026, set by ${h.src('si_2026', 'SI 2026/357')}, followed larger rises in April 2024 and April 2025, which together closed much of the gap. The rates announced for April 2027 rise by the same ${h.pc(h.A.increasePct, 1)} in every band, so the share stays almost where it is.</p>

<h2>From gross pay to take-home at 18</h2>
<p>The minimum wage is a gross figure. What reaches the bank account depends on Income Tax and employee National Insurance, both worked out with the ${h.src('rates_thresholds', '2026 to 2027 thresholds')}: no tax on the first ${h.gbp(h.TAX['2026'].personalAllowance)} of the year, and National Insurance at 8% above the same amount.</p>
${h.table(['Hours a week', 'Gross a year', 'Income Tax', 'National Insurance', 'Left each month'], [16, 20, 30, 37.5, 40].map((n) => { const g = h.conv(h.rate(2026, 18), n).annual; const t = h.net(g, '2026'); return [h.num(n, n % 1 ? 1 : 0), h.gbp(g), h.gbp(t.tax), h.gbp(t.ni), h.gbp(h.round2(t.net / 12))]; }), 'At the 18 to 20 rate of April 2026, England, Wales or Northern Ireland, tax code 1257L, no student loan or pension.', ['l', 'r', 'r', 'r', 'r'])}
<p>An 18 year old on 16 hours a week earns less than the personal allowance over a year, so nothing is deducted. Above about 22 hours a week, both Income Tax and National Insurance start to apply. Pension contributions, if the worker is enrolled in a scheme, come off on top. The ${h.a('minimum-wage-after-tax', 'after tax page')} compares every age band and the Scottish bands.</p>
<!--tool:mini:april2027|{"age":18,"h":37.5}-->

<h2>One adult rate from 18: where it stands</h2>
<p>The ${h.src('lpc_remit', 'remit given to the Low Pay Commission')} on ${h.date(h.REMIT.published)} kept two aims: holding the National Living Wage at two thirds of median hourly earnings, and lowering the age at which it applies to 18. The second aim has no deadline. In its ${h.src('lpc_2027', 'recommendations for April 2027')}, dated ${h.date(h.A.lpcLetter)}, the commission held off narrowing the gap further, weighing a weak jobs market, with vacancies at their lowest outside the pandemic since 2014, against the cost of living. The ${h.a('national-living-wage-age-18', 'page on the age 18 plan')} follows the next steps.</p>

<h2>Who is on the 18 to 20 rate, and who is not</h2>
<p>Every worker aged 18, 19 or 20 who is not on the apprentice rate. Apprentices are the main exception: under 19, they are owed ${h.gbp2(h.C.apprentice)} for the whole apprenticeship, as ${h.src('hmrc_elig', "HMRC's eligibility guidance")} sets out. Calling someone an apprentice is not enough, though. A worker without a real apprenticeship agreement or contract of apprenticeship is owed the rate for their age.</p>
<p>The rate also matters to employers in a way that does not touch the worker's pay: no employer National Insurance is due on the earnings of a worker under 21 up to ${h.gbp(h.TAX['2026'].niUnder21Upper)} a year. At 21 the National Living Wage of ${h.gbp2(h.rate(2026, 21))} takes over, a step covered on the ${h.a('minimum-wage-20-year-old', 'page for 20 year olds')}.</p>`,
  },
});
