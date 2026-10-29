import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-arrears',
  group: 'rules',
  order: 10,
  tool: { kind: 'mini:arrears', props: { u: 80.4, yr: 5, age: 45 } },
  mini: { kind: 'mini:history', props: { yr: 5, age: 45 } },
  related: ['report-underpayment', 'employer-penalties', 'minimum-wage-history', 'pay-reference-period', 'home'],
  sources: ['hmrc_enforce', 'gov_disputes', 'tribunals', 'gov_rates'],
  en: {
    slug: 'minimum-wage-arrears',
    nav: 'Arrears and back pay',
    card: 'Back pay is recalculated at today\'s rate for the band you were in: HMRC\'s £80.40 example becomes more each April it stays unpaid.',
    title: 'Minimum Wage Arrears: Back Pay Worked Out at Today\'s Rate',
    description: 'Minimum wage arrears are recalculated at today\'s rate: an £80.40 shortfall from 2024 is now worth £89.33, and more after April 2027. See the formula and limits.',
    h1: 'Minimum wage arrears: how back pay is worked out',
    intro: 'Enter the amount you were underpaid, the year it happened and your age at the time: the tool gives what is owed if repaid now and from April 2027.',
    resume: (h) => {
      const r24 = h.rate(2024, 45);
      return `Underpaid minimum wage is not repaid at face value. The law uses a formula: divide the original shortfall by the rate that applied when you were underpaid, then multiply by the current rate for the same age band. If rates have risen since, you get more than you lost; if they had fallen, you would get the actual shortfall. HMRC's example is a worker aged 45 paid ${h.gbp(320)} for 35 hours in a pay period in December 2024, when the rate was ${h.gbp2(r24)}. The minimum was ${h.gbp2(h.round2(r24 * 35))}, so the shortfall was ${h.gbp2(80.4)}. Worked out in April 2025 at ${h.gbp2(h.rate(2025, 45))}, the arrears came to ${h.gbp2(h.arrears(80.4, r24, h.rate(2025, 45)))}. Repaid now, at the April 2026 rate of ${h.gbp2(h.rate(2026, 45))}, they are ${h.gbp2(h.arrears(80.4, r24, h.rate(2026, 45)))}. If the rate announced for 1 April 2027 is set in regulations, repayment after that date would be ${h.gbp2(h.arrears(80.4, r24, h.rate(2027, 45)))}. A rise between the calculation and the payment adds further arrears, so delay never helps the employer.`;
    },
    faqs: (h) => [
      { q: 'I was 17 when I was underpaid and I am now 19: which rate is used for arrears?', a: `The current rate for the band you were in at the time, so the 16 to 17 rate, now ${h.gbp2(h.rate(2026, 17))}, not the ${h.gbp2(h.rate(2026, 19))} you are entitled to today. The shortfall is divided by the 16 to 17 rate that applied then and multiplied by today's 16 to 17 rate. If that gave less than the actual shortfall, you would receive the shortfall instead.` },
      { q: 'Why is my back pay higher than the shortfall on my old payslips?', a: `Because the law converts the shortfall into the hours it represents at the old rate, then pays those hours at today's rate. HMRC's ${h.gbp2(80.4)} shortfall from 2024 equals about ${h.num(80.4 / h.rate(2024, 45), 2)} hours at ${h.gbp2(h.rate(2024, 45))}; at the April 2026 rate those hours are worth ${h.gbp2(h.arrears(80.4, h.rate(2024, 45), h.rate(2026, 45)))}. The uplift stops underpaid wages losing value while the employer holds on to them.` },
      { q: 'How far back can underpaid minimum wage be claimed?', a: `Through a civil court, a claim can reach back up to ${h.num(h.E.civilYears)} years, and employers must keep minimum wage records for ${h.num(h.E.recordsYears)} years for records created from April 2021. An employment tribunal claim has a much shorter limit, usually ${h.num(h.E.tribunalMonths)} months for problems from ${h.date(h.E.tribunalChange)} and ${h.num(h.E.tribunalMonthsBefore)} months before that, after notifying Acas first. A complaint to HMRC is a separate route.` },
      { q: 'Will arrears paid after April 2027 use the new rate?', a: `Yes, once the new rate is in force. The formula always uses the current rate for your band on the day the arrears are paid. The government announced ${h.gbp2(h.rate(2027, 21))} at 21 and over from 1 April 2027 on ${h.date(h.A.date)}; when regulations bring it into force, any arrears still unpaid on that date grow accordingly, even if they were calculated earlier.` },
    ],
    body: (h) => {
      const r24 = h.rate(2024, 45);
      const rows = [
        ['April 2025 (HMRC calculation)', h.rate(2025, 45)],
        ['Now, from 1 April 2026', h.rate(2026, 45)],
        ['From 1 April 2027, as announced', h.rate(2027, 45)],
      ].map(([l, r]) => [l as string, h.gbp2(r as number), h.gbp2(h.arrears(80.4, r24, r as number)), h.gbp2(h.round2(h.arrears(80.4, r24, r as number) - 80.4))]);
      const yr17 = h.rate(2023, 17);
      const young = h.arrears(150, yr17, h.rate(2026, 17));
      return `
<h2>The formula in three steps</h2>
<p>The ${h.src('hmrc_enforce', 'HMRC enforcement guidance')} sets out the method employers must follow.</p>
<ol>
<li>Find the shortfall in each pay reference period: what should have been paid at the rate then in force, minus what was paid.</li>
<li>Divide that shortfall by the rate that applied in that period.</li>
<li>Multiply the result by the current rate for the age band that applied to you then.</li>
</ol>
<p>The "current rate" means the rate for your old band today, not the rate for your present age. A worker who was 16 or 17 at the time is repaid at today's 16 to 17 rate even after turning 19. If rates had fallen, the arrears would be the original shortfall; they can never be less.</p>

<h2>HMRC's example, and what it is worth now</h2>
${h.table(['Repaid', 'Rate used (aged 45)', 'Arrears', 'Above the shortfall'], rows, `Shortfall of ${h.gbp2(80.4)} from a December 2024 pay period at ${h.gbp2(r24)}. Example from ${h.src('hmrc_enforce', 'HMRC')}; the 2027 rate is announced, not yet in regulations.`, ['l', 'r', 'r', 'r'])}
<p>The longer the money stays unpaid, the larger the uplift: each April rise is passed on to the worker, so the employer gains nothing by waiting.</p>
<h2>A younger worker's arrears</h2>
<p>Take someone who was 17 in a pay period starting in April 2023, when the 16 to 17 rate was ${h.gbp2(yr17)}, and was underpaid ${h.gbp(150)}. Today's 16 to 17 rate is ${h.gbp2(h.rate(2026, 17))}, so the arrears are ${h.gbp2(young)}, an uplift of ${h.pc(young / 150 - 1)} on the original amount. Rates for young workers have risen faster than the adult rate in recent years, so older shortfalls in the younger bands grow the most. The tool under the summary compares the rate of any year since 2019 with today's.</p>

<h2>The 2021 change of age bands</h2>
<p>On 1 April 2021 the National Living Wage age dropped from 25 to 23, and in April 2024 it dropped again to 21. For arrears from pay periods starting on or after 1 April 2021, HMRC says that a worker who was 23 or over at the time is repaid at the National Living Wage. For earlier periods, workers who were then 23 or 24 are repaid using the National Minimum Wage rate of their band. The ${h.a('minimum-wage-history', 'history page')} lists every band and rate since 2019.</p>

<h2>Time limits and routes</h2>
<p>There are three ways to recover arrears, each with its own clock.</p>
${h.table(['Route', 'Time limit or timing', 'Point to know'], [
  ['Complaint to HMRC', 'You can complain even after leaving the job', 'HMRC can order arrears for every underpaid worker, plus a penalty; it cannot act if you have started a tribunal claim'],
  ['Employment tribunal', `Usually ${h.num(h.E.tribunalMonths)} months (problems from ${h.date(h.E.tribunalChange)}), ${h.num(h.E.tribunalMonthsBefore)} months before`, 'Acas early conciliation first; the clock pauses during it and at least one month remains afterwards'],
  ['Civil court', `Up to ${h.num(h.E.civilYears)} years`, 'The employer must prove it paid the minimum wage'],
], `Sources: ${h.src('hmrc_enforce', 'HMRC')} and ${h.src('tribunals', 'GOV.UK employment tribunals')}. For unauthorised deductions, the tribunal clock starts from the date you were not paid correctly.`, ['l', 'l', 'l'])}
<p>In a tribunal or court the burden of proof is on the employer, which must show from its records that it paid at least the minimum. The ${h.a('report-underpayment', 'page on reporting underpayment')} walks through each step, and the ${h.a('employer-penalties', 'page on employer penalties')} explains the penalty HMRC adds on top of the arrears. The ${h.src('gov_disputes', 'GOV.UK page on problems getting the minimum wage')} sums up the same options.</p>`;
    },
  },
});
