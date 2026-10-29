import { definePage } from '../../lib/guide-types';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

export default definePage({
  id: 'minimum-wage-annual-salary',
  group: 'pay',
  order: 3,
  tool: { kind: 'mini:convert', props: { h: 37.5 } },
  mini: { kind: 'mini:net' },
  related: ['minimum-wage-monthly', 'minimum-wage-after-tax', 'salaried-hours-minimum-wage', 'employer-cost-minimum-wage'],
  sources: ['gov_rates', 'hmrc_hours', 'pensions', 'lpc_2027_news'],
  en: {
    slug: 'minimum-wage-annual-salary',
    nav: 'Annual salary',
    card: 'What the minimum wage comes to over a year at each rate, the salary a contract needs to stay legal and how the full-time year has grown.',
    title: 'Minimum Wage Annual Salary: Yearly Pay and Salary Needed',
    description: 'A year at the National Living Wage is £24,784.50 for 37.5 hours a week and £26,436.80 for 40. The salary needed at each rate, and the figures for April 2027.',
    h1: 'Minimum wage as an annual salary',
    intro: 'The hours are set to 37.5 a week: change your age, apprenticeship, year or hours to see the yearly minimum, with the weekly and monthly figures.',
    resume: (h) => `Over a year of 52 weeks, the minimum wage from 1 April 2026 comes to ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} for 37.5 hours a week at the National Living Wage of ${h.gbp2(h.rate(2026, 21))}, ${h.gbp(h.conv(h.rate(2026, 21), 40).annual)} for 40 hours and ${h.gbp(h.conv(h.rate(2026, 21), 35).annual)} for 35 hours. At the 18 to 20 rate a 37.5-hour year is ${h.gbp(h.conv(h.rate(2026, 18), 37.5).annual)}, and at the 16 to 17 and apprentice rate ${h.gbp(h.conv(h.rate(2026, 16), 37.5).annual)}. For a salaried job, the salary needed is the hourly rate times the basic annual hours in the contract. HMRC accepts that an employer may turn weekly hours into annual hours with a multiplier of 52, 52.14 or 52.18, provided it can show how the figure was reached; the higher the multiplier, the higher the salary needed. Under the rates announced on ${h.date(h.A.date)} for April 2027, still to be set in regulations, a 37.5-hour year at 21 and over would come to ${h.gbp(h.conv(h.rate(2027, 21), 37.5).annual)}. In April 2019 the same full-time year at the top rate paid ${h.gbp(h.conv(h.rate(2019, 25), 37.5).annual)}. Workers aged 22 or over earning at least ${h.gbp(h.PENSION.trigger)} a year are also enrolled in a workplace pension.`,
    faqs: (h) => [
      { q: 'What salary keeps a 37.5-hour contract above the National Living Wage?', a: `Counting 52 weeks, 37.5 hours a week makes 1,950 basic hours a year, so the salary needs to be at least ${h.gbp(h.round2(h.rate(2026, 21) * 1950))} under the April 2026 rates. An employer using a multiplier of 52.14 counts 1,955.25 hours and needs ${h.gbp(h.round2(h.rate(2026, 21) * 1955.25))}. With the rate announced for April 2027, 1,950 hours would need ${h.gbp(h.round2(h.rate(2027, 21) * 1950))}.` },
      { q: 'Why is a minimum wage year counted as 52 weeks rather than 52.14?', a: 'A year of 365 days holds 52 weeks and one day, which is about 52.14 weeks. For pay converted from an hourly rate, 52 weeks is the common basis, and it is the one used across this site. For salaried contracts, HMRC accepts 52, 52.14, 52.18 or another formula, as long as the employer can show how the basic annual hours were worked out.' },
      { q: 'At what yearly pay does a minimum wage worker join a workplace pension?', a: `A worker aged 22 or over and under State Pension age who earns at least ${h.gbp(h.PENSION.trigger)} a year must be enrolled automatically. At the National Living Wage that point is reached at about ${h.num(h.PENSION.trigger / (h.rate(2026, 21) * 52), 1)} hours a week across the year. The minimum contributions are ${h.pc(h.PENSION.employerMinPct)} from the employer and ${h.pc(h.PENSION.employeeMinPct)} from the worker, on qualifying earnings.` },
      { q: 'How much has a full-time minimum wage year grown since 2019?', a: `At the top rate and 37.5 hours a week, the year has gone from ${h.gbp(h.conv(h.rate(2019, 25), 37.5).annual)} in April 2019 to ${h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)} in April 2026, a rise of ${h.pc(h.rate(2026, 21) / h.rate(2019, 25) - 1)}. For a 21 year old the change is larger, because the top rate now starts at 21 instead of 25.` },
    ],
    body: (h) => `
<h2>A year at each rate</h2>
<p>The figures below multiply the hourly rate by the weekly hours and by 52. They are gross, before Income Tax, National Insurance and any pension contribution.</p>
${h.table(['Hours a week', '21 and over, now', '21 and over, April 2027 (announced)', '18 to 20, now', '16 to 17 and apprentices, now'], [16, 20, 30, 35, 37.5, 40].map((n) => [h.num(n, n % 1 ? 1 : 0), h.gbp(h.conv(h.rate(2026, 21), n).annual), h.gbp(h.conv(h.rate(2027, 21), n).annual), h.gbp(h.conv(h.rate(2026, 18), n).annual), h.gbp(h.conv(h.rate(2026, 16), n).annual)]), `Rates from the ${h.src('gov_rates', 'GOV.UK rates page')}; April 2027 per the ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}.`, ['l', 'r', 'r', 'r', 'r'])}

<h2>The salary needed for a salaried contract</h2>
<p>For a worker on an annual salary, ${h.src('hmrc_hours', "HMRC's guidance on working hours")} compares the salary with the basic hours the contract sets for the year. The salary divided by those hours must reach the rate for the worker's age. The table gives the lowest legal salary at 21 and over for common contracts, counted on 52 weeks.</p>
${h.table(['Weekly hours', 'Basic hours a year', 'Lowest salary now', 'Lowest salary from April 2027 (announced)'], [35, 37.5, 39, 40].map((n) => [h.num(n, n % 1 ? 1 : 0), h.num(n * 52, 0), h.gbp(h.round2(h.rate(2026, 21) * n * 52)), h.gbp(h.round2(h.rate(2027, 21) * n * 52))]), 'Workers aged 21 and over. Hours beyond the basic hours must also be paid at least the minimum.', ['l', 'r', 'r', 'r'])}
<p>A job advertised at ${h.gbp(25000)} for 37.5 hours a week is legal today with ${h.gbp(h.round2(25000 - h.rate(2026, 21) * 1950))} to spare, but would fall ${h.gbp(h.round2(h.rate(2027, 21) * 1950 - 25000))} short of the rate announced for April 2027 unless the salary rises. Workers who regularly go beyond their basic hours without extra pay can fall below the minimum later in the year, a case the ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} works through.</p>
<!--tool:mini:salaried|{"age":30,"s":25000,"h":37.5}-->

<h2>A full-time year since 2019</h2>
<p>The yearly value of the top rate at 37.5 hours a week, with the age it started at each year.</p>
${h.table(['From April', 'Top rate from age', 'Year at 37.5 hours', 'Change on the year before'], YEARS.map((y, i) => [y === 2027 ? `${y} (announced)` : String(y), String(h.Y(y).nlwAge), h.gbp(h.conv(h.rate(y, 25), 37.5).annual), i === 0 ? '-' : `+${h.gbp(h.round2(h.conv(h.rate(y, 25), 37.5).annual - h.conv(h.rate(YEARS[i - 1], 25), 37.5).annual))}`]), 'Gross pay over 52 weeks at the National Living Wage.', ['l', 'r', 'r', 'r'])}
<p>The biggest single step came in April 2024, when the full-time year at the top rate grew by almost ${h.gbp(2000)} and the starting age dropped to 21.</p>

<h2>Pension and the yearly figure</h2>
<p>Workplace pensions use the yearly figure too. Under the ${h.src('pensions', 'GOV.UK rules')}, an employer must automatically enrol a worker aged 22 up to State Pension age who earns at least ${h.gbp(h.PENSION.trigger)} a year. Minimum contributions are ${h.pc(h.PENSION.employerMinPct)} from the employer and ${h.pc(h.PENSION.employeeMinPct)} from the worker, on qualifying earnings rather than on the whole salary. A worker's own contribution comes out of their pay but does not lower the pay that counts for the minimum wage when it is paid to the pension scheme; salary sacrifice is different and does reduce it. The ${h.a('minimum-wage-after-tax', 'after tax page')} shows what a year at the minimum leaves after Income Tax and National Insurance.</p>`,
  },
});
