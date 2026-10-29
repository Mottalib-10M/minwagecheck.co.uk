import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-history',
  group: 'rates',
  order: 5,
  tool: { kind: 'mini:history', props: { yr: 0, age: 25 } },
  mini: { kind: 'mini:arrears', props: { yr: 3, age: 24, u: 120 } },
  related: ['minimum-wage-2025', 'minimum-wage-arrears', 'national-living-wage', 'minimum-wage-2026'],
  sources: ['gov_rates', 'si_2026', 'lpc_2027_news', 'hmrc_enforce'],
  en: {
    slug: 'minimum-wage-history',
    nav: 'Rates since 2019',
    card: 'Every minimum wage rate and accommodation offset from April 2019 to April 2027, with the age bands of each period.',
    title: 'Minimum Wage History: Every UK Rate From 2019 to 2027',
    description: 'Minimum wage history: every rate by age band from April 2019 to April 2027, the age of the National Living Wage at 25, 23 then 21, and accommodation offsets.',
    h1: 'Minimum wage history: every rate since April 2019',
    intro: 'Pick a year and an age: the tool gives the legal rate then, today and from April 2027, and the rise in between.',
    resume: (h) => `Since April 2019 the top rate of the minimum wage has risen from ${h.gbp2(h.rate(2019, 25))} to ${h.gbp2(h.rate(2026, 21))}, and it will reach ${h.gbp2(h.rate(2027, 21))} on 1 April 2027, a rise of ${h.pc(h.rate(2027, 25) / h.rate(2019, 25) - 1)} over eight years. Three structures followed one another. Until March 2021 the National Living Wage applied from age 25, with a 21 to 24 band below it; from April 2021 to March 2024 it applied from 23, with a 21 to 22 band; since April 2024 it applies from 21, leaving three bands under it: 18 to 20, 16 to 17 and apprentices. The youngest bands rose fastest: the 18 to 20 rate went from ${h.gbp2(h.rate(2019, 18))} to ${h.gbp2(h.rate(2026, 18))}, and the apprentice rate from ${h.gbp2(h.Y(2019).apprentice)} to ${h.gbp2(h.C.apprentice)}, more than doubling. The accommodation offset went from ${h.gbp2(h.Y(2019).offsetDay)} to ${h.gbp2(h.C.offsetDay)} a day. Old rates still matter: an underpayment from a past year is repaid at today's rate for the same band.`,
    faqs: (h) => [
      { q: 'Why do I need old minimum wage rates?', a: `To check pay from a past year. If you were underpaid in 2024, the shortfall is worked out against the ${h.gbp2(h.rate(2024, 25))} rate in force then, and then repaid at today's rate for the same band. HMRC and tribunals can look back many years: employers must keep records for ${h.num(h.E.recordsYears)} years and civil claims can go back ${h.num(h.E.civilYears)} years.` },
      { q: 'What was the minimum wage for a 24 year old in 2020?', a: `In April 2020 the National Living Wage started at 25, so a 24 year old fell in the 21 to 24 band at ${h.gbp2(h.rate(2020, 24))} an hour, against ${h.gbp2(h.rate(2020, 25))} at 25. From April 2021 a 24 year old was on the National Living Wage of ${h.gbp2(h.rate(2021, 24))}, because the age had come down to 23.` },
      { q: 'Has the minimum wage ever gone down?', a: 'Not in the period covered here. Every band has risen on 1 April of every year from 2019 to 2026, and the announced April 2027 rates are higher again. What changed for some workers were the age bands: lowering the National Living Wage age moved people into a higher band, never a lower one.' },
    ],
    body: (h) => `
<h2>All rates by period</h2>
${h.table(['Period', 'Top band', 'Second band', '18 to 20', '16 to 17', 'Apprentice'], h.PERIODS.map((p) => {
  const b = p.bands; const has21 = b.length === 4;
  return [p.label, `${h.bandLabel(p, b[0])}: ${h.gbp2(b[0].rate)}`, has21 ? `${h.bandLabel(p, b[1])}: ${h.gbp2(b[1].rate)}` : '-', h.gbp2(b[b.length - 2].rate), h.gbp2(b[b.length - 1].rate), h.gbp2(p.apprentice)];
}), `Source: ${h.src('gov_rates', 'GOV.UK, rates from April 2019')}; 2026 by ${h.src('si_2026', 'SI 2026/357')}; 2027 as ${h.src('lpc_2027_news', 'announced on 28 October 2026')}.`, ['l', 'l', 'l', 'r', 'r', 'r'])}

<h2>Three structures of age bands</h2>
<p><strong>April 2019 to March 2021: National Living Wage from 25.</strong> Workers aged 21 to 24 had their own band, ${h.gbp2(h.rate(2019, 21))} then ${h.gbp2(h.rate(2020, 21))}. The gap with the top rate was ${h.gbp2(h.round2(h.rate(2020, 25) - h.rate(2020, 21)))} an hour in 2020.</p>
<p><strong>April 2021 to March 2024: from 23.</strong> Workers aged 23 and 24 moved up to the top band in April 2021. A smaller 21 to 22 band remained: ${h.gbp2(h.rate(2021, 21))}, ${h.gbp2(h.rate(2022, 21))}, then ${h.gbp2(h.rate(2023, 21))}, only ${h.gbp2(h.round2(h.rate(2023, 23) - h.rate(2023, 21)))} below the top rate by 2023.</p>
<p><strong>Since April 2024: from 21.</strong> The 21 to 22 band disappeared and the National Living Wage of ${h.gbp2(h.rate(2024, 21))} applied from 21, a jump of ${h.pc(h.rate(2024, 21) / h.rate(2023, 21) - 1, 1)} for workers aged 21 and 22. The government's remit keeps the aim of taking the age down to 18; the ${h.a('national-living-wage-age-18', 'page on that aim')} follows where it stands.</p>

<h2>Accommodation offset by year</h2>
${h.table(['Period', 'Per day', 'Per week'], h.PERIODS.map((p) => [p.label, h.gbp2(p.offsetDay), h.gbp2(h.round2(p.offsetDay * 7))]), `The most an employer can count for accommodation it provides: ${h.src('gov_rates', 'GOV.UK')} and the yearly regulations.`, ['l', 'r', 'r'])}

<h2>Using an old rate for back pay</h2>
<p>When an employer underpaid you in a past period, the law does not simply return the missing pounds. HMRC's ${h.src('hmrc_enforce', 'guidance on enforcement')} sets a formula: divide the underpayment by the rate in force at the time, then multiply by today's rate for the band you were in then. If today's rate is lower, which has not happened since 2019, the original underpayment is repaid. One rule needs care: for pay periods starting on or after 1 April 2021, a worker who was then 23 or over is repaid at the current National Living Wage; for earlier periods, workers who were 23 or 24 count in the band below.</p>
<!--tool:mini:history|{"yr":5,"age":21}-->
<p>Take ${h.gbp(120)} underpaid to a 24 year old in 2022, when the top rate of ${h.gbp2(h.rate(2022, 24))} applied to them. Repaid at today's ${h.gbp2(h.rate(2026, 24))}, it is worth ${h.gbp(h.arrears(120, h.rate(2022, 24), h.rate(2026, 24)))}, and ${h.gbp(h.arrears(120, h.rate(2022, 24), h.rate(2027, 24)))} if repaid after 1 April 2027. The ${h.a('minimum-wage-arrears', 'arrears page')} explains the steps and the tool under the summary does the sum for any year.</p>

<h2>Rises year by year at the top rate</h2>
<ul>
${h.PERIODS.slice(1).map((p, i) => `<li>${p.label}: ${h.gbp2(p.bands[0].rate)}, up ${h.pc(p.bands[0].rate / h.PERIODS[i].bands[0].rate - 1, 1)} on the year before.</li>`).join('\n')}
</ul>
<p>The largest rises came in April 2023 and April 2024, when the top rate went up by more than ${h.pc(0.09)} in each year, while the smallest, ${h.pc(h.rate(2021, 25) / h.rate(2020, 25) - 1, 1)}, came in April 2021, the year the age threshold fell to 23. The April 2027 rise of ${h.pc(h.A.increasePct, 1)} is the second smallest of the period. Each rise follows the advice of the Low Pay Commission, as the ${h.a('low-pay-commission', 'page on how rates are set')} explains.</p>`,
  },
});
