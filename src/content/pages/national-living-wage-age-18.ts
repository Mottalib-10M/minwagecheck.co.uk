import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'national-living-wage-age-18',
  group: 'rates',
  order: 10,
  tool: { kind: 'mini:april2027', props: { age: 19, h: 30 } },
  mini: { kind: 'mini:convert', props: { yr: 8, age: 18, h: 30 } },
  related: ['minimum-wage-18-year-old', 'low-pay-commission', 'minimum-wage-20-year-old', 'minimum-wage-history'],
  sources: ['lpc_remit', 'lpc_2027', 'gov_rates'],
  en: {
    slug: 'national-living-wage-age-18',
    nav: 'Living Wage at 18?',
    card: 'Where the plan to pay the National Living Wage from 18 stands: no law and no date yet, the 2027 pause and the gap per hour.',
    title: 'National Living Wage at 18: Plan, Pause and the Gap Today',
    description: 'National Living Wage from 18: the aim is in the 2026 remit but not in law, and the 2027 rates pause it, with £11.27 at 18 to 20 against £13.21 at 21 and over.',
    h1: 'National Living Wage from 18: where the plan stands',
    intro: 'Enter an age between 18 and 20 and your weekly hours: the tool shows the rise you get in April 2027 on the 18 to 20 rate.',
    resume: (h) => `The government's aim is to pay the National Living Wage from age 18 instead of 21, but no law has made that change and no date has been set. The aim is written in the remit the government gave the Low Pay Commission, published on ${h.date(h.REMIT.published)}; this year the remit gave the Commission full flexibility on the pace and timing, and asked it to give priority to youth employment. In its advice of ${h.date(h.A.lpcLetter)}, accepted by the government on ${h.date(h.A.date)}, the Commission recommended pausing the alignment: the 18 to 20 rate rises by the same ${h.pc(h.A.increasePct, 1)} as the adult rate, to ${h.gbp2(h.rate(2027, 18))} from 1 April 2027, against ${h.gbp2(h.rate(2027, 21))} at 21 and over. The gap therefore stays at about ${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2027, 18)))} an hour, or ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2027, 18)) * 37.5 * 52))} a year on 37.5 hours a week. The Commission said there is still potential to lower the age, especially for 20 year olds, once demand for young workers recovers.`,
    faqs: (h) => [
      { q: 'Will 18 year olds get £13.21 in April 2027?', a: `No. The rates announced for 1 April 2027 keep three age bands besides the apprentice rate: ${h.gbp2(h.rate(2027, 21))} at 21 and over, ${h.gbp2(h.rate(2027, 18))} at 18 to 20 and ${h.gbp2(h.rate(2027, 16))} at 16 and 17. An 18 year old is owed ${h.gbp2(h.rate(2027, 18))} an hour from the first pay period starting on or after that date, unless the employer chooses to pay more.` },
      { q: 'How much has the 18 to 20 rate caught up with the adult rate?', a: `Over the four years to April 2026 it grew by ${h.pc(h.rate(2026, 18) / h.rate(2022, 18) - 1)}, from ${h.gbp2(h.rate(2022, 18))} to ${h.gbp2(h.rate(2026, 18))}, much faster than the top rate. It was ${h.pc(h.rate(2022, 18) / h.rate(2022, 25))} of the National Living Wage in 2022 and ${h.pc(h.rate(2026, 18) / h.rate(2026, 21))} in 2026. In 2027 it stays at ${h.pc(h.rate(2027, 18) / h.rate(2027, 21))}, because both rates rise by the same percentage.` },
      { q: 'Would lowering the age need a new law?', a: 'The age bands are written in the National Minimum Wage Regulations 2015, so the government would change them by regulations, as it did when the National Living Wage age fell to 23 in April 2021 and to 21 in April 2024. No such change has been announced for 18, and the rates announced for April 2027 keep the 18 to 20 band.' },
    ],
    body: (h) => `
<h2>Two steps already taken</h2>
<p>The age at which the top rate starts has come down twice. Each time, a whole group of young workers moved up a band on 1 April.</p>
${h.table(['From', 'National Living Wage starts at', 'Rate that year', 'Band below, for the next ages down'], [
  ['April 2019', h.num(h.Y(2019).nlwAge), h.gbp2(h.rate(2019, 25)), `21 to 24: ${h.gbp2(h.rate(2019, 21))}`],
  ['April 2021', h.num(h.Y(2021).nlwAge), h.gbp2(h.rate(2021, 23)), `21 to 22: ${h.gbp2(h.rate(2021, 21))}`],
  ['April 2024', h.num(h.Y(2024).nlwAge), h.gbp2(h.rate(2024, 21)), `18 to 20: ${h.gbp2(h.rate(2024, 18))}`],
  ['April 2027 (announced)', h.num(h.N.nlwAge), h.gbp2(h.rate(2027, 21)), `18 to 20: ${h.gbp2(h.rate(2027, 18))}`],
], `Source: ${h.src('gov_rates', 'GOV.UK rates')}; April 2027 from the ${h.src('lpc_2027', 'Low Pay Commission advice')} accepted on ${h.date(h.A.date)}.`, ['l', 'r', 'r', 'l'])}
<p>A third step, to 18, would be the largest. The Commission pointed out that the rises needed are bigger than when the age came down to 21, and that more workers would be affected.</p>

<h2>Why 2027 is a pause</h2>
<p>The Commission's letter gives its reasons. Youth unemployment remains above its covid peak and at rates last seen in 2015; vacancies are lower still in retail and hospitality, which hire many young people; and while it found little evidence that past rises in youth rates reduced employment, it said future rises are not risk free. It therefore recommended the same percentage rise for 18 to 20 year olds as for adults, which keeps the ratio between the two rates steady.</p>
<p>The pause is not a reversal. The remit still states the aim, and the Commission wrote that there is still potential to lower the age limit, especially for 20 year olds. It also expects a review of youth labour market policy to shape its future advice.</p>
<!--tool:mini:birthday-->

<h2>What it means for a worker aged 18 to 20 now</h2>
<p>Until the law changes, the date that matters is your 21st birthday: from the first pay period that starts on or after it, the National Living Wage applies. The birthday tool above gives that date for your pay cycle. Meanwhile, at 30 hours a week the 18 to 20 rate is worth ${h.gbp(h.conv(h.rate(2026, 18), 30).weekly)} a week today and ${h.gbp(h.conv(h.rate(2027, 18), 30).weekly)} from April 2027, against ${h.gbp(h.conv(h.rate(2027, 21), 30).weekly)} for a colleague aged 21 doing the same hours.</p>
<p>An employer may pay an 18 year old the adult rate, but it is not obliged to. If you are on an apprenticeship, other rules apply: the apprentice rate in your first year at any age, then the rate for your age, as the ${h.a('apprentice-minimum-wage', 'apprentice page')} explains.</p>

<h2>How you will know if it changes</h2>
<p>A change would appear first in the government's remit to the Commission or in its response to the Commission's advice, then in amending regulations with a date. This page is updated when that happens, and the ${h.a('low-pay-commission', 'page on how the rates are set')} explains the yearly cycle. Until then, the ${h.a('minimum-wage-18-year-old', 'page for 18 year olds')} and the ${h.a('minimum-wage-20-year-old', 'page for 20 year olds')} show the rates that apply.</p>

<h2>Who would gain from a single adult rate</h2>
<p>On the April 2027 figures, a worker aged 18 to 20 on the minimum would gain ${h.gbp2(h.round2(h.rate(2027, 21) - h.rate(2027, 18)))} an hour from a single adult rate. For a part-time student on 15 hours a week, that is ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2027, 18)) * 15 * 52))} a year; for a full-time worker on 40 hours, ${h.gbp(h.round2((h.rate(2027, 21) - h.rate(2027, 18)) * 40 * 52))}. Apprentices in their first year would not be affected by the age change on its own, since the apprentice rate applies to them at any age.</p>`,
  },
});
