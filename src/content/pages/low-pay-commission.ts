import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'low-pay-commission',
  group: 'rates',
  order: 9,
  tool: { kind: 'mini:target', props: { h: 37.5 } },
  mini: { kind: 'mini:history', props: { yr: 4, age: 30 } },
  related: ['minimum-wage-april-2027', 'national-living-wage', 'national-living-wage-age-18', 'minimum-wage-history'],
  sources: ['lpc', 'lpc_remit', 'lpc_2027', 'lpc_report', 'lpc_2027_news'],
  en: {
    slug: 'low-pay-commission',
    nav: 'How rates are set',
    card: 'The yearly cycle from the government’s remit to the Low Pay Commission’s advice, the announcement and the 1 April rise, with the 2026 dates.',
    title: 'Low Pay Commission: How the Minimum Wage Is Set Each Year',
    description: 'Low Pay Commission and the minimum wage: the remit, the two-thirds of median pay target, the October advice and the April rise, with the 2026 to 2027 timetable.',
    h1: 'Low Pay Commission: how the minimum wage is set each year',
    intro: 'Set your weekly hours: the tool compares the announced April 2027 rate with the Commission’s estimate of two thirds of median pay.',
    resume: (h) => `The Low Pay Commission is the independent body that advises the government on the minimum wage rates each year. It brings together worker representatives, employer representatives and independent experts, and its recommendations are the agreed view of all of them. The cycle starts with a remit from the government: the one for 2026, published on ${h.date(h.REMIT.published)}, asked the Commission to recommend a National Living Wage guided by ${h.REMIT.target}, weighed against the labour market, the cost of living, businesses and the economy. The Commission consults in the spring, gathers evidence over the summer, meets in October and writes to the government: this year on ${h.date(h.A.lpcLetter)}. The government announced on ${h.date(h.A.date)}, at the Autumn Budget, that it accepted the advice in full: ${h.gbp2(h.rate(2027, 21))} for the National Living Wage from 1 April 2027. The figures then go into amending regulations before 1 April. The Commission estimated that two thirds of median pay would need ${h.gbp2(h.A.referenceRate)}, so this year's rate stays below the reference point.`,
    faqs: (h) => [
      { q: 'Can the government ignore the Low Pay Commission?', a: `The Commission advises and the government decides, by regulations. For 2027 the government accepted every recommendation in full on ${h.date(h.A.date)}. The remit also tells the Commission what to aim for, so the government shapes the outcome before the advice is written, for example by keeping the reference point of ${h.REMIT.target}.` },
      { q: 'When will the April 2028 rates be known?', a: 'The usual cycle points to the autumn of 2027. The government sends a new remit in the spring, the Commission consults and gathers evidence, then submits its advice in October or November, and the government announces the rates soon after. Until that announcement, any figure for April 2028 is a guess and is not shown on this site.' },
      { q: 'Why did the Commission recommend less than the two-thirds target?', a: `Its letter says the labour market had become fragile: vacancies at their lowest outside the pandemic since 2014, weak hiring in retail and hospitality, and employers facing higher costs. It chose ${h.pc(h.A.increasePct, 1)}, above forecast inflation for April 2027 to March 2028, instead of the ${h.pc(h.A.referencePct, 1)} it estimated the reference point needed, and said it remains committed to reaching it when conditions allow.` },
    ],
    body: (h) => `
<h2>The 2026 to 2027 timetable</h2>
${h.table(['Date', 'Step'], [
  [h.date(h.REMIT.published), 'Government publishes the remit for 2026'],
  [h.date(h.REMIT.lpcReport2026), 'Commission publishes its report "The National Minimum Wage in 2026" as the April 2026 rates take effect'],
  ['Spring 2026', `Consultation; central estimate for the reference point ${h.gbp2(h.A.springEstimate)} (range ${h.gbp2(h.A.springLow)} to ${h.gbp2(h.A.springHigh)})`],
  [h.date(h.REMIT.criteriaPaper), 'Commission publishes a paper on criteria for a higher National Living Wage target'],
  [h.date(h.A.lpcLetter), 'Commission submits its advice for April 2027'],
  [h.date(h.A.date), 'Government accepts it in full and announces the rates at the Autumn Budget'],
  ['Before 1 April 2027', 'Amending regulations to be made'],
  ['1 April 2027', 'New rates apply from the first pay period starting on or after that day'],
], `Sources: ${h.src('lpc_remit', 'remit 2026')}, ${h.src('lpc_report', 'LPC report 2026')}, ${h.src('lpc_2027', 'LPC advice for 2027')}.`, ['l', 'l'])}

<h2>What the remit asks for</h2>
<p>For the National Living Wage, the remit sets ${h.REMIT.target} as the key reference point, to be reached while taking account of four things: the condition of the labour market, the cost of living (including inflation forecasts between April 2027 and March 2028), the impact on businesses and competitiveness, and wider economic conditions. For workers aged 18 to 20, it keeps the government's aim of lowering the National Living Wage age to ${h.REMIT.ageAim}, but this year gave the Commission full flexibility on pace and timing and asked it to give priority to youth employment. For 16 and 17 year olds, it asks for a rate that supports their employment.</p>
<p>The reference point moves with pay across the economy. Because median hourly earnings grew faster than forecast in 2026, the Commission's estimate of the rate needed rose from ${h.gbp2(h.A.springEstimate)} in the spring to ${h.gbp2(h.A.referenceRate)} by the autumn.</p>
<!--tool:mini:april2027|{"age":30,"h":37.5}-->

<h2>The choices made for 2027</h2>
<ul>
<li><strong>National Living Wage:</strong> ${h.gbp2(h.rate(2027, 21))}, ${h.pc(h.A.increasePct, 1)}, below the reference point but above inflation forecasts, given weak hiring and employers' rising costs.</li>
<li><strong>18 to 20:</strong> ${h.gbp2(h.rate(2027, 18))}, the same ${h.pc(h.A.increasePct, 1)}, pausing the move towards the adult rate because demand for young workers has slowed and youth unemployment is at rates last seen in 2015.</li>
<li><strong>16 to 17 and apprentices:</strong> ${h.gbp2(h.rate(2027, 16))}, a much smaller rise than in recent years, as employment of that age group and apprentice vacancies had fallen.</li>
<li><strong>Accommodation offset:</strong> ${h.gbp2(h.N.offsetDay)} a day, in line with the National Living Wage.</li>
</ul>
<p>The letter records that workers' representatives asked for ambitious rises, citing members struggling to pay everyday bills, while several employer bodies asked for rises below inflation for the first time. The Commission said it had not found robust evidence that recent increases reduced employment, but judged caution justified.</p>

<h2>From announcement to payslip</h2>
<p>An announcement is not yet law. Each year the government makes amending regulations that change the figures in the National Minimum Wage Regulations 2015: for April 2026 they were made on ${h.date('2026-03-19')}. Employers must then apply the new rates from the first pay period that starts on or after 1 April. The ${h.a('minimum-wage-april-2027', 'April 2027 page')} shows what the rise means for each age, and the ${h.a('minimum-wage-history', 'history page')} how each year's advice turned into rates since 2019.</p>`,
  },
});
