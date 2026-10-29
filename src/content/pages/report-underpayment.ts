import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'report-underpayment',
  group: 'rules',
  order: 11,
  demarche: true,
  tool: { kind: 'check', props: { age: 21, hours: 37.5, open: true } },
  mini: { kind: 'mini:arrears', props: { u: 250, yr: 6, age: 22 } },
  related: ['minimum-wage-arrears', 'employer-penalties', 'unpaid-trial-shifts', 'who-gets-minimum-wage', 'home'],
  sources: ['gov_complaint', 'acas_contact', 'hmrc_enforce', 'tribunals', 'gov_disputes', 'fwa'],
  en: {
    slug: 'report-underpayment',
    nav: 'Report underpayment',
    card: 'Seven steps if you are paid below the minimum wage: evidence, a written request, your pay records, Acas, the official complaint form and a tribunal.',
    title: 'Report Minimum Wage Underpayment: Seven Steps to Take',
    description: 'Report minimum wage underpayment in seven steps: gather evidence, write to your employer, see your records, call Acas, then the complaint form or a tribunal.',
    h1: 'Report minimum wage underpayment: the steps in order',
    intro: 'Start by putting one pay period through the checker: it shows the pay that counts, the rate for your age and the exact shortfall to quote.',
    resume: (h) => `If you are paid less than the minimum wage, you can recover the money even after you have left the job. Start by checking one pay period: the pay that counts, divided by the hours worked, must reach ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over, ${h.gbp2(h.rate(2026, 18))} at 18 to 20 or ${h.gbp2(h.rate(2026, 16))} at 16 and 17 and on the apprentice rate from 1 April 2026. Then gather payslips and a record of your hours and raise the shortfall with your employer in writing. If you think you were underpaid, you can ask in writing to see your pay records; the employer has 14 days, and a refusal can lead a tribunal to award you ${h.num(h.E.recordsAwardHours)} times the hourly minimum, ${h.gbp2(h.round2(h.E.recordsAwardHours * h.rate(2026, 21)))} at the National Living Wage. The free Acas helpline on ${h.E.acasPhone} gives confidential advice. The official route is the pay and work rights complaint form: HMRC investigates, and you can ask it not to tell the employer who complained. You can also bring an employment tribunal claim yourself, but then HMRC can no longer act for you. Dismissing you for asserting the right is unlawful.`,
    faqs: (h) => [
      { q: 'Can I complain about minimum wage after I have left the job?', a: 'Yes. The official complaint form states that you can report an employer you no longer work for, and the arrears remain a debt owed to you. Gather what you kept from the job, such as payslips, messages about shifts and your own record of hours. Arrears are recalculated at the current rate for the band you were in, so leaving does not reduce what you are owed.' },
      { q: 'Will my employer find out that I reported them?', a: 'You can ask on the complaint form that HMRC does not give the employer information about who made the complaint, and HMRC can open investigations for its own reasons, so a visit need not point to you. If an employer does identify you and dismisses you or treats you worse because you complained, that is unlawful and you can take it to an employment tribunal.' },
      { q: 'What happens if my employer will not show me my pay records?', a: `If you have reasonable grounds to think you were underpaid and asked in writing, the employer must produce your records within 14 days or an agreed time. If it refuses or fails to, you can complain to an employment tribunal, which awards ${h.num(h.E.recordsAwardHours)} times the hourly minimum wage if it upholds your claim, ${h.gbp2(h.round2(h.E.recordsAwardHours * h.rate(2026, 21)))} at the April 2026 rate for 21 and over.` },
      { q: 'Can a friend or relative report underpayment for me?', a: 'Yes. Someone else can complain on your behalf using the same form, but HMRC will need to ask for your permission before taking it forward. Third party information can also reach HMRC through Acas. If you have difficulty with the form yourself, the Acas helpline can help and offers a free translation service, and a Welsh version of the form is available by asking HMRC.' },
      { q: 'Should I go to a tribunal or complain to HMRC first?', a: `They are alternatives, and the choice matters. HMRC cannot take your complaint forward once you have started tribunal action over the same minimum wage issue. A tribunal claim usually has a time limit of ${h.num(h.E.tribunalMonths)} months for problems from ${h.date(h.E.tribunalChange)}, after notifying Acas, while HMRC can recover arrears for others as well. A civil court claim can reach back ${h.num(h.E.civilYears)} years.` },
    ],
    body: (h) => {
      const award = h.round2(h.E.recordsAwardHours * h.rate(2026, 21));
      return `
<p>This site is an independent calculator. It does not take complaints, contact employers or act for you: each step below is carried out by you, with the public bodies named.</p>

<h2>Step 1: work out the shortfall</h2>
<p>Use the checker at the top for each pay period you think was short. Enter the gross pay, all the hours that count, including briefings, training and travel between jobs, and any uniform costs, tips or premiums. The result gives the pay that counts per hour and the exact amount missing. A precise figure, period by period, makes every later step easier. The tool under the summary turns an old shortfall into what is owed today.</p>

<h2>Step 2: gather your evidence</h2>
<ul>
<li>Payslips, or bank statements showing what was paid and when.</li>
<li>Your contract, offer letter or any message setting out your pay and hours.</li>
<li>Rotas, clocking records, messages asking you to come in early or stay late.</li>
<li>Your own diary of start and finish times, breaks, journeys and training.</li>
<li>Receipts for uniform, tools or training you paid for.</li>
</ul>

<h2>Step 3: raise it with your employer in writing</h2>
<p>Some shortfalls are plain mistakes; HMRC names the apprentice rate kept after a worker aged 19 or over finishes the first year as a common one, and a rate rise or birthday can be missed in the same way. Write a short, factual message stating the pay periods, the hours, the rate you should have received and the amount you calculate is owed, and keep a copy. Asking for the minimum wage is protected: an employer that dismisses you or treats you badly for trying to get it paid can be taken to a tribunal.</p>

<h2>Step 4: ask to see your pay records</h2>
<p>Employers must keep records showing that each worker received at least the minimum wage in every pay period, and keep them for ${h.num(h.E.recordsYears)} years. If you have reasonable grounds to believe you were underpaid, you can ask in writing to see your records. The employer must produce them within 14 days or a time you agree, at your workplace or a place you can reasonably reach. You may copy them and bring someone with you if you say so in your request. If the employer refuses or fails to produce them, a tribunal that upholds your complaint awards you ${h.num(h.E.recordsAwardHours)} times the hourly minimum, which is ${h.gbp2(award)} at the April 2026 National Living Wage.</p>

<h2>Step 5: call the Acas helpline</h2>
<p>Acas gives free, impartial and confidential advice on ${h.E.acasPhone}, ${h.E.acasHours}, with a free translation service. You can also report a suspected underpayment through it; complex cases are passed to HMRC's minimum wage team. Contact details are on the ${h.src('acas_contact', 'Acas helpline page')}.</p>

<h2>Step 6: use the official complaint form</h2>
<p>The ${h.src('gov_complaint', 'pay and work rights complaint form')} on GOV.UK goes to HMRC, which enforces the minimum wage on behalf of the ${h.src('fwa', 'Fair Work Agency')}. Points to know before you send it:</p>
${h.table(['Question', 'Answer'], [
  ['Can I use it after leaving the job?', 'Yes'],
  ['Can I stay anonymous towards the employer?', 'You can ask HMRC not to give the employer information about who complained'],
  ['Can someone complain for me?', 'Yes, with your permission'],
  ['Can I use it if I already went to a tribunal?', 'No, not for the same minimum wage issue'],
  ['Is it available in Welsh?', 'Yes, on request to HMRC'],
], 'Taken from the GOV.UK form page.', ['l', 'l'])}
<p>If HMRC finds an underpayment, it can serve a notice requiring the employer to pay arrears to each worker named and a penalty, as the ${h.a('employer-penalties', 'penalties page')} explains.</p>

<h2>Step 7: an employment tribunal or a civil claim</h2>
<p>You can instead claim the money yourself at an employment tribunal, or in a civil court. In both, the employer has to prove it paid the minimum wage. For a tribunal you must notify Acas first for early conciliation, which is free; the time limit is paused during conciliation and you have at least ${h.num(h.E.acasCertificateMonths)} month left after the certificate. The limit is usually ${h.num(h.E.tribunalMonths)} months if the problem happened on or after ${h.date(h.E.tribunalChange)} and ${h.num(h.E.tribunalMonthsBefore)} months if before; for deductions from pay it runs from the date you were not paid correctly. A civil court claim can go back up to ${h.num(h.E.civilYears)} years. The ${h.src('tribunals', 'GOV.UK tribunal page')} has the claim process, and the ${h.a('minimum-wage-arrears', 'arrears page')} shows how the amount is uplifted.</p>`;
    },
  },
});
