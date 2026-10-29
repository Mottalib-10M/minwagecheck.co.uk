import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'national-living-wage',
  group: 'rates',
  order: 3,
  tool: { kind: 'mini:convert', props: { yr: 7, age: 30, h: 40 } },
  mini: { kind: 'mini:target', props: { h: 40 } },
  related: ['national-minimum-wage', 'real-living-wage', 'minimum-wage-21-year-old', 'low-pay-commission', 'home'],
  sources: ['gov_rates', 'lpc_remit', 'lpc_2027', 'nmw_regs'],
  en: {
    slug: 'national-living-wage',
    nav: 'National Living Wage',
    card: 'The legal minimum at 21 and over: £12.71 today and £13.21 from April 2027, the age it starts at and the two-thirds target behind it.',
    title: 'National Living Wage: £12.71 Now, £13.21 From April 2027',
    description: 'National Living Wage for workers aged 21 and over: £12.71 an hour since April 2026 and £13.21 from April 2027, with full-time pay, the age rule and its target.',
    h1: 'National Living Wage: the legal minimum at 21 and over',
    intro: 'Pick the year, your age and your weekly hours: the tool shows the hourly floor and what it comes to per week, month and year.',
    resume: (h) => `The National Living Wage is the legal minimum hourly pay for workers aged 21 and over in the United Kingdom. Since 1 April 2026 it is ${h.gbp2(h.rate(2026, 21))} an hour, and the government announced on ${h.date(h.A.date)} that it will rise to ${h.gbp2(h.rate(2027, 21))} on 1 April 2027. It is not a separate law: it is the top band of the National Minimum Wage, set each year by regulations on the advice of the Low Pay Commission. The age it starts at has come down twice: it applied from age 25 until March 2021, from 23 between April 2021 and March 2024, and from 21 since 1 April 2024. The government's remit asks the Commission to aim for two thirds of median hourly earnings; the Commission estimates that would take ${h.gbp2(h.A.referenceRate)} by October 2027, more than the rate announced. A full-time week of 40 hours at the current rate pays ${h.gbp(h.conv(h.rate(2026, 21), 40).weekly)} before tax, or ${h.gbp(h.conv(h.rate(2026, 21), 40).annual)} over a year.`,
    faqs: (h) => [
      { q: 'Is the National Living Wage the same as the National Minimum Wage?', a: `Legally it is the highest band of the National Minimum Wage, reserved for workers aged 21 and over. The other bands, ${h.gbp2(h.rate(2026, 18))} at 18 to 20 and ${h.gbp2(h.rate(2026, 16))} at 16 to 17 and for apprentices, are what people usually call the minimum wage. The same regulations, the same pay reference period rules and the same enforcement apply to all of them.` },
      { q: 'Does the National Living Wage depend on where I live?', a: `No. The rate is the same in every part of the United Kingdom: ${h.gbp2(h.rate(2026, 21))} in London, Manchester, Swansea, Aberdeen or Derry. A separate London figure exists only for the real Living Wage, which is a voluntary rate published by a charity and paid by employers who choose to. Your employer must pay at least the legal rate wherever you work.` },
      { q: 'How far is the National Living Wage from two thirds of median pay?', a: `The Low Pay Commission estimates that reaching two thirds of median hourly earnings by October 2027 would need ${h.gbp2(h.A.referenceRate)}, a rise of ${h.pc(h.A.referencePct, 1)}. It recommended ${h.gbp2(h.rate(2027, 21))}, so the gap is about ${h.gbp2(h.round2(h.A.referenceRate - h.rate(2027, 21)))} an hour. It said it remains committed to reaching the reference point when economic conditions allow.` },
    ],
    body: (h) => `
<h2>From 25 to 21: who has been covered</h2>
<p>The age at which the top rate starts has fallen twice in six years. Each step moved a group of young adults onto the higher rate at once.</p>
${h.table(['Period', 'Starts at age', 'National Living Wage', 'Band just below'], h.PERIODS.map((p) => [p.label, h.num(p.nlwAge), h.gbp2(p.bands[0].rate), `${h.bandLabel(p, p.bands[1])}: ${h.gbp2(p.bands[1].rate)}`]), `Source: ${h.src('gov_rates', 'GOV.UK rates since April 2019')}; April 2027 as announced.`, ['l', 'r', 'r', 'l'])}
<p>A worker aged 22 in 2023 was paid at least ${h.gbp2(h.rate(2023, 22))}, the 21 to 22 band, while a colleague of 23 had ${h.gbp2(h.rate(2023, 23))}. From April 2024 both got the same ${h.gbp2(h.rate(2024, 22))}. When arrears from before a change are worked out, the band you were in at the time is used, at its current value, as the ${h.a('minimum-wage-arrears', 'arrears page')} explains.</p>

<h2>The target behind the rate</h2>
<p>Each year the government sends the Low Pay Commission a remit. The one published on ${h.date(h.REMIT.published)} keeps ${h.REMIT.target} as the key reference point for the National Living Wage, to be weighed against the state of the labour market, the cost of living, the effect on businesses and the wider economy. The Commission estimates where median pay will be and works back to a rate.</p>
<p>In 2026 it did not follow the reference point all the way. It recommended a rise of ${h.pc(h.A.increasePct, 1)} where ${h.pc(h.A.referencePct, 1)} would have been needed, judging that weak hiring, especially in retail and hospitality, justified caution. The tool under the summary shows what the gap between the two rates means over a year at your hours.</p>

<h2>Full-time and part-time pay at the National Living Wage</h2>
${h.table(['Hours a week', 'Per week now', 'Per year now', 'Per year from April 2027'], [20, 30, 35, 37.5, 40, 45].map((n) => [h.num(n, n % 1 ? 1 : 0), h.gbp(h.conv(h.rate(2026, 21), n).weekly), h.gbp(h.conv(h.rate(2026, 21), n).annual), h.gbp(h.conv(h.rate(2027, 21), n).annual)]), 'Gross pay, 52 weeks a year.', ['r', 'r', 'r', 'r'])}
<p>Above 48 hours a week on average, the working time limit applies unless you have signed an opt-out; the minimum wage itself is owed for every hour of working time whatever the total. Hours that count include training and travel between jobs during the day, as the ${h.a('training-travel-waiting-time', 'working time page')} explains.</p>
<!--tool:mini:april2027|{"age":30,"h":40}-->

<h2>National Living Wage, real Living Wage and London</h2>
<p>The names are close but the nature is different. The National Living Wage is the law, enforced by HMRC, with arrears and penalties when it is not paid. The real Living Wage is a voluntary rate calculated by the Living Wage Foundation from living costs, ${h.gbp2(h.RLW['2026'].uk)} across the United Kingdom and ${h.gbp2(h.RLW['2026'].london)} in London for 2026 to 2027, paid by accredited employers. An employer that pays the legal rate but not the voluntary one breaks no law. The ${h.a('real-living-wage', 'real Living Wage page')} compares the two.</p>

<h2>Checking that you get it</h2>
<p>The legal test is over each pay reference period, on the pay that counts. A contract at ${h.gbp2(h.rate(2026, 21))} an hour can still fall short if you buy a uniform the job requires, if unpaid training is added to your hours, or if a salary sacrifice takes your pay below the rate. Enter one pay period in the ${h.a('home', 'checker')} to see the pay that counts. Workers who turn 21 move onto the National Living Wage from the first pay period that starts on or after the birthday: the ${h.a('minimum-wage-21-year-old', 'page for 21 year olds')} gives the date.</p>`,
  },
});
