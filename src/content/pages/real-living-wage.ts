import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'real-living-wage',
  group: 'rates',
  order: 7,
  tool: { kind: 'mini:rlw', props: { h: 37.5, l: 0 } },
  mini: { kind: 'mini:convert', props: { yr: 8, age: 21, h: 37.5 } },
  related: ['national-living-wage', 'minimum-wage-april-2027', 'minimum-wage-annual-salary', 'low-pay-commission'],
  sources: ['rlw', 'gov_rates', 'lpc_2027_news'],
  en: {
    slug: 'real-living-wage',
    nav: 'Real Living Wage',
    card: 'The voluntary real Living Wage (£14.10, £15.45 in London) set against the legal National Living Wage, per hour and per year.',
    title: 'Real Living Wage 2026: £14.10 Against the Legal Minimum',
    description: 'Real Living Wage 2026 to 2027: £14.10 an hour, £15.45 in London, a voluntary rate, set against the legal National Living Wage: £12.71, then £13.21 in 2027.',
    h1: 'Real Living Wage against the legal minimum wage',
    intro: 'Enter your weekly hours and whether you work in London: the tool compares the voluntary rate with the legal floor from April 2027.',
    resume: (h) => `The real Living Wage is a voluntary hourly rate published by the Living Wage Foundation, an independent organisation, and paid by employers who choose to commit to it. For 2026 to 2027 it is ${h.gbp2(h.RLW['2026'].uk)} an hour across the United Kingdom and ${h.gbp2(h.RLW['2026'].london)} in London, announced on ${h.date(h.RLW['2026'].announced)}, up from ${h.gbp2(h.RLW['2025'].uk)} and ${h.gbp2(h.RLW['2025'].london)}; accredited employers are asked to apply it by ${h.date(h.RLW['2026'].implementBy)}. It is not the law. The legal floor is the National Living Wage, ${h.gbp2(h.rate(2026, 21))} for workers aged 21 and over since 1 April 2026 and ${h.gbp2(h.rate(2027, 21))} from 1 April 2027 as announced on ${h.date(h.A.date)}. The voluntary rate is therefore ${h.gbp2(h.round2(h.RLW['2026'].uk - h.rate(2027, 21)))} an hour above the April 2027 legal rate outside London, and ${h.gbp2(h.round2(h.RLW['2026'].london - h.rate(2027, 21)))} above it in London. Unlike the legal rates, its published figures have no bands by age. An employer that pays only the legal minimum breaks no rule, and no one can be ordered to pay the voluntary rate.`,
    faqs: (h) => [
      { q: 'Can I complain to HMRC if I am not paid the real Living Wage?', a: `No. HMRC enforces the legal minimum wage only: ${h.gbp2(h.rate(2026, 21))} at 21 and over from April 2026. The real Living Wage is a voluntary commitment, so the question is between you and your employer. If your contract or an accreditation promise says you will be paid it, that is a contractual matter, which Acas can explain.` },
      { q: 'Why is there a separate real Living Wage for London?', a: `Because the Living Wage Foundation publishes two voluntary rates, one for London and one for the rest of the United Kingdom, to reflect higher costs in the capital: ${h.gbp2(h.RLW['2026'].london)} and ${h.gbp2(h.RLW['2026'].uk)} for 2026 to 2027. The legal minimum wage has no London rate. A worker in London aged 21 or over is legally owed the same as anywhere else.` },
      { q: 'Does the real Living Wage apply to under 21s and apprentices?', a: `The Living Wage Foundation publishes only two figures, a United Kingdom rate and a London rate, with no age bands and no apprentice rate; what a committed employer pays its youngest staff depends on its commitment. In law, an 18 year old is owed ${h.gbp2(h.rate(2026, 18))} and a first year apprentice ${h.gbp2(h.C.apprentice)} from April 2026, so an employer paying them the voluntary rate pays well above the legal minimum.` },
    ],
    body: (h) => `
<h2>Legal and voluntary rates side by side</h2>
${h.table(['Rate', 'Who sets it', 'Binding?', 'Per hour', 'Per year at 37.5 hours'], [
  ['National Living Wage (21 and over), from April 2026', 'Government, by regulations', 'Yes', h.gbp2(h.rate(2026, 21)), h.gbp(h.conv(h.rate(2026, 21), 37.5).annual)],
  ['National Living Wage, from April 2027 (announced)', 'Government, by regulations', 'Yes, once in force', h.gbp2(h.rate(2027, 21)), h.gbp(h.conv(h.rate(2027, 21), 37.5).annual)],
  ['Real Living Wage, United Kingdom', 'Living Wage Foundation', 'No', h.gbp2(h.RLW['2026'].uk), h.gbp(h.round2(h.RLW['2026'].uk * 37.5 * 52))],
  ['Real Living Wage, London', 'Living Wage Foundation', 'No', h.gbp2(h.RLW['2026'].london), h.gbp(h.round2(h.RLW['2026'].london * 37.5 * 52))],
], `Sources: ${h.src('gov_rates', 'GOV.UK rates')}, ${h.src('lpc_2027_news', 'announcement of 28 October 2026')}, ${h.src('rlw', 'Living Wage Foundation')}.`, ['l', 'l', 'l', 'r', 'r'])}
<p>The difference over a year is far from small. On 37.5 hours a week, the real Living Wage outside London pays ${h.gbp(h.round2((h.RLW['2026'].uk - h.rate(2027, 21)) * 37.5 * 52))} more than the National Living Wage of April 2027, and ${h.gbp(h.round2((h.RLW['2026'].uk - h.rate(2026, 21)) * 37.5 * 52))} more than today's legal rate.</p>

<h2>Why two "living wages" exist</h2>
<p>The name National Living Wage was given to the top band of the legal minimum wage. Its level is set by the government after advice from the Low Pay Commission, whose remit points to two thirds of median hourly earnings, weighed against jobs and business costs. The real Living Wage is set outside government by the Living Wage Foundation, on its own method, and announced each autumn. Employers that sign up commit to pay it and to move to each new figure by the date the Foundation sets.</p>
<p>The two numbers follow different calendars too. The legal rate changes on 1 April, from regulations made a few weeks before. The voluntary rate is announced in the autumn, ${h.date(h.RLW['2026'].announced)} this year, with time given to employers until ${h.date(h.RLW['2026'].implementBy)}.</p>
<!--tool:mini:april2027|{"age":25,"h":37.5}-->

<h2>What you can rely on</h2>
<ul>
<li>The legal rate is owed by every employer to every worker of the right age, whatever the contract says, and HMRC can enforce it.</li>
<li>The real Living Wage is owed only if your employer has agreed to pay it, for example in your contract or through accreditation. A dispute about it is a contract dispute, not a minimum wage complaint.</li>
<li>The legal test of minimum wage pay, with deductions for uniforms and the accommodation offset, does not apply to the voluntary rate; employers that commit to it follow the Foundation's own rules.</li>
</ul>

<h2>Checking your pay against the legal floor first</h2>
<p>Before comparing with a voluntary rate, make sure the legal one is met. A contract above ${h.gbp2(h.rate(2026, 21))} can still fall under it in a given pay period when unpaid training time is added or when a required uniform is deducted. The ${h.a('home', 'checker')} does the legal test for one pay period; the ${h.a('national-living-wage', 'National Living Wage page')} explains the target behind the legal figure, and the ${h.a('minimum-wage-annual-salary', 'annual salary page')} turns any hourly rate into a yearly sum.</p>

<h2>Reading a job advert</h2>
<p>Adverts often say "living wage" without saying which one. If the hourly figure is ${h.gbp2(h.rate(2026, 21))}, it is the legal National Living Wage for workers aged 21 and over, which every employer must pay anyway. If it is ${h.gbp2(h.RLW['2026'].uk)}, or ${h.gbp2(h.RLW['2026'].london)} in London, it is the voluntary rate. Ask whether the rate will follow the next increase: the legal one must rise on 1 April 2027, while a voluntary one rises only if the employer keeps its commitment. For workers under 21, an advert at the voluntary rate is worth comparing with the legal band for their age, ${h.gbp2(h.rate(2026, 18))} at 18 to 20.</p>`,
  },
});
