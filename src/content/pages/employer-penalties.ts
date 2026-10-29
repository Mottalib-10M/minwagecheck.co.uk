import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'employer-penalties',
  group: 'rules',
  order: 12,
  tool: { kind: 'mini:penalty', props: { a: 1200, w: 3 } },
  mini: { kind: 'mini:arrears', props: { u: 600, yr: 6, age: 30 } },
  related: ['minimum-wage-arrears', 'report-underpayment', 'employer-cost-minimum-wage', 'pay-reference-period', 'home'],
  sources: ['hmrc_enforce', 'gov_employers', 'nmw_act'],
  en: {
    slug: 'employer-penalties',
    nav: 'Employer penalties',
    card: 'A notice of underpayment means arrears plus a penalty of 200%, capped at £20,000 per worker and halved if paid within 14 days; deliberate cases can be prosecuted.',
    title: 'Employer Penalties for Minimum Wage Underpayment in 2026',
    description: 'Employer penalties for underpaying: arrears plus up to 200% of them, capped at £20,000 per worker, halved if paid in 14 days. Appeals, offences and naming.',
    h1: 'Employer penalties for minimum wage underpayment',
    intro: 'Enter the arrears owed to each worker and the number of workers underpaid: the tool gives the penalty on a notice of underpayment and the reduced amount for early payment.',
    resume: (h) => {
      const p = h.penalty(1200, 3);
      return `When an HMRC compliance officer finds that a worker was paid below the minimum wage, the officer can serve a notice of underpayment. It requires the employer to pay the arrears to every worker named, recalculated at today's rate, and a financial penalty of up to ${h.pc(h.E.penaltyPct)} of those arrears, with a ceiling of ${h.gbp(h.E.penaltyMaxPerWorker)} per worker. If the employer complies in full within ${h.num(h.E.earlyPaymentDays)} days of the notice being served, the penalty is cut by ${h.pc(h.E.earlyPaymentReduction)}. An appeal goes to an employment tribunal within ${h.num(h.E.appealDays)} days. Three workers each owed ${h.gbp(1200)} would mean ${h.gbp(3600)} in arrears and a penalty of up to ${h.gbp(p.full)}, or ${h.gbp(p.early)} if paid on time. Beyond the notice, refusing or wilfully neglecting to pay the minimum wage is one of six criminal offences, punishable by an unlimited fine, and serious or repeat offenders can be bound by labour market enforcement undertakings or orders. Employers found to underpay might also be named by the government, while those who correct errors through a voluntary declaration are, except in exceptional cases, neither named nor penalised.`;
    },
    faqs: (h) => [
      { q: 'How much can HMRC fine an employer per underpaid worker?', a: `The penalty on a notice of underpayment is up to ${h.pc(h.E.penaltyPct)} of the arrears owed to each worker, with a ceiling of ${h.gbp(h.E.penaltyMaxPerWorker)} per worker. On arrears of ${h.gbp(5000)} for one worker the penalty can reach ${h.gbp(h.penalty(5000).full)}; on ${h.gbp(15000)} it stops at the cap. Paying everything within ${h.num(h.E.earlyPaymentDays)} days halves it. Criminal fines are separate and have no upper limit.` },
      { q: 'Can an employer appeal a notice of underpayment?', a: `Yes, within ${h.num(h.E.appealDays)} days of the notice being served, to an employment tribunal, or an industrial tribunal in Northern Ireland. An employer that neither appeals nor complies faces further action: HMRC can take a case to a tribunal or the County Court, or the Sheriff Court in Scotland, on behalf of the worker, and can seek a criminal prosecution.` },
      { q: 'Is underpaying the minimum wage a crime?', a: 'It can be. Refusing or wilfully neglecting to pay the minimum wage is a criminal offence, and so are failing to keep records, falsifying them, giving false information, obstructing a compliance officer and refusing to answer an officer\'s questions. Deliberate non-payment can lead to an unlimited fine, and HMRC may use police search and seizure powers when it investigates these offences.' },
      { q: 'What does an employer gain from a voluntary declaration?', a: 'An employer that finds and repays arrears through its own review can tell HMRC and ask it to confirm the calculation was right. Other than in exceptional cases, arrears declared and accepted through this process carry no penalty and no public naming. It gives a business a way to correct a mistake without the 200% penalty that a notice of underpayment can bring.' },
    ],
    body: (h) => {
      const cases = [[85.81, 1], [1200, 3], [8000, 2], [15000, 1]] as const;
      return `
<h2>How HMRC finds underpayment</h2>
<p>HMRC enforces the minimum wage and can open an investigation after a worker complains, directly or through Acas, or on its own initiative using risk models and information from third parties. Its officers do not have to give reasons for an inspection. Under the ${h.src('hmrc_enforce', 'HMRC enforcement guidance')} they can require records and explanations, enter business premises at any reasonable time to interview and inspect, summon an employer to an interview with reasonable written notice, and take records away for copying. Obstructing an officer, or refusing to provide information, is itself an offence.</p>

<h2>The notice of underpayment</h2>
<p>A notice of underpayment does two things: it orders arrears to be paid to each worker named, worked out with the ${h.a('minimum-wage-arrears', 'arrears formula')}, and it sets a penalty payable by the employer.</p>
${h.table(['Arrears per worker', 'Workers', 'Penalty', 'If paid within 14 days'], cases.map(([a, w]) => {
  const p = h.penalty(a, w);
  return [h.gbp(a), String(w), h.gbp(p.full), h.gbp(p.early)];
}), `Penalty of ${h.pc(h.E.penaltyPct)} of arrears, capped at ${h.gbp(h.E.penaltyMaxPerWorker)} per worker, reduced by ${h.pc(h.E.earlyPaymentReduction)} for full compliance within ${h.num(h.E.earlyPaymentDays)} days. The first row uses the arrears in HMRC's own worked example.`, ['r', 'r', 'r', 'r'])}
<p>The cap bites only on large arrears: at ${h.gbp(15000)} owed to one worker the penalty would be ${h.gbp(30000)} without it, but stops at ${h.gbp(h.E.penaltyMaxPerWorker)}. The arrears themselves are never capped and are always owed in full to the workers.</p>
<p>Within ${h.num(h.E.appealDays)} days the employer may appeal to an employment tribunal. If it neither appeals nor pays, HMRC can bring proceedings on the worker's behalf in a tribunal or a civil court, or move to prosecution.</p>

<h2>The six criminal offences</h2>
<ol>
<li>Refusing or wilfully neglecting to pay the minimum wage.</li>
<li>Failing to keep or preserve minimum wage records.</li>
<li>Causing or allowing a materially false entry in those records.</li>
<li>Producing records or information known to be materially false.</li>
<li>Intentionally delaying or obstructing a compliance officer.</li>
<li>Refusing or neglecting to answer questions, give information or produce documents.</li>
</ol>
<p>Three of the six concern records, which shows how central they are. Employers must keep enough records to prove the minimum wage was paid in every pay reference period and produce them in a single document for a given worker and period; records created from April 2021 must be kept for ${h.num(h.E.recordsYears)} years. Deliberate non-payment can bring an unlimited fine.</p>

<h2>Undertakings, orders and naming</h2>
<p>For more serious or persistent offenders, HMRC can seek a labour market enforcement undertaking: a written commitment setting out what the business must do and by when, for example keeping accurate records, lasting no more than 2 years. An employer that refuses one, or breaks it, can be taken to court for an order, and breaching an order can lead to up to 2 years in custody, an unlimited fine, or both. Separately, the government may publish the names of employers that underpaid.</p>

<h2>Correcting mistakes before HMRC does</h2>
<p>An employer that spots its own error, such as a missed ${h.a('pay-reference-period', 'pay period')} after the April rise or an unrefunded uniform charge, can repay the arrears and make a voluntary declaration. HMRC then checks the calculation and, except in exceptional cases, neither names the business nor charges a penalty. With the rate due to rise to ${h.gbp2(h.rate(2027, 21))} at 21 and over from 1 April 2027, as announced on ${h.date(h.A.date)} and still to be set in regulations, payroll settings are worth checking against the first pay period that starts on or after that date.</p>
<p>The ${h.src('gov_employers', 'GOV.UK guidance for employers')} summarises these duties. Workers who want to trigger an investigation will find the steps on the ${h.a('report-underpayment', 'reporting page')}.</p>`;
    },
  },
});
