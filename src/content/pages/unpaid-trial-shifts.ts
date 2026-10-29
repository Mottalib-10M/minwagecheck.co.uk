import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'unpaid-trial-shifts',
  group: 'rules',
  order: 8,
  tool: { kind: 'mini:trial', props: { age: 19, t: 8 } },
  mini: { kind: 'mini:worktime', props: { age: 19, g: 300, h: 25, x: 5 } },
  related: ['who-gets-minimum-wage', 'internships-minimum-wage', 'minimum-wage-18-year-old', 'report-underpayment', 'home'],
  sources: ['hmrc_elig', 'gov_who', 'gov_complaint'],
  en: {
    slug: 'unpaid-trial-shifts',
    nav: 'Unpaid trial shifts',
    card: 'A short, observed test of skills can be unpaid; a full shift of real work usually cannot. HMRC\'s six example trials and what each would be worth.',
    title: 'Unpaid Trial Shifts: When a Work Trial Must Be Paid',
    description: 'Unpaid trial shifts are lawful only as a short, genuine test of skills. A full shift of real work usually earns the minimum wage: 8 hours at 19 is worth £86.80.',
    h1: 'Unpaid trial shifts: test of skills or unpaid work?',
    intro: 'Enter your age and the hours of the trial: the tool shows what the trial is worth at the minimum wage if it went beyond a genuine short test.',
    resume: (h) => `An unpaid trial is lawful when it is a short, genuine part of recruitment, used to see whether you have the skills for the job. It becomes paid work, at the minimum wage, when it goes on longer than the employer reasonably needs to judge you, when you are left to get on with real tasks that help the business, or when trials are a way of covering staff shortages. No statute defines a trial shift, so HMRC weighs the facts: in the government's view, a trial of more than one day is likely to require the minimum wage in all but very exceptional cases, while a few observed hours may be reasonable. An 8 hour trial in a real workplace at age 19 is worth at least ${h.gbp2(h.round2(h.rate(2026, 19) * 8))} at the April 2026 rate of ${h.gbp2(h.rate(2026, 19))}; at 21 and over, ${h.gbp2(h.round2(h.rate(2026, 21) * 8))}. One scheme is a clear exception: a Jobcentre Plus Work Trial of ${h.num(h.RULES.trialWeeksJobcentre)} weeks or less, arranged through the government programme, is unpaid by design and comes with the prospect of a job.`,
    faqs: (h) => [
      { q: 'Is a two hour unpaid trial in a café legal?', a: 'It can be. HMRC\'s guidance describes a candidate asked to work two hours on a Saturday while the owner watches how she deals with customers and fits in with the team, guiding her as needed. That is treated as proportionate and mainly a test, so it is likely to be unpaid lawfully, provided the job advert is real and the trial is part of genuine recruitment.' },
      { q: 'Can a trial shift last a whole week without pay?', a: `Very unlikely. HMRC gives the example of new bar staff asked to work shifts across a week while managers decide how many to keep. A week is far more than needed to test the skills, and the work is indistinguishable from paid staff. At ${h.gbp2(h.rate(2026, 21))} an hour, 30 hours of such a trial would be worth ${h.gbp2(h.round2(h.rate(2026, 21) * 30))} at 21 and over.` },
      { q: 'Does a Jobcentre Plus Work Trial have to be paid?', a: `No. The law makes an exception for the government's Work Trial scheme, aimed at helping people claiming benefits try a job without risk. A trial under that scheme of ${h.num(h.RULES.trialWeeksJobcentre)} weeks or less does not attract the minimum wage, and a job is offered if both sides are happy at the end. A trial an employer arranges on its own is not covered by this exception.` },
      { q: 'How do I claim pay for a trial shift I already did?', a: 'Write down the date, start and finish times, what you were asked to do and whether anyone watched you. Then ask the business in writing to pay for the hours. If it refuses, you can call the free Acas helpline or use the official pay and work rights complaint form, which HMRC handles. The checker on this site shows what the hours were worth.' },
    ],
    body: (h) => {
      const r19 = h.rate(2026, 19);
      const r21 = h.rate(2026, 21);
      return `
<h2>The six factors HMRC weighs</h2>
<p>The ${h.src('hmrc_elig', 'HMRC eligibility guidance')} admits that the law does not define a trial work period or say exactly when the minimum wage starts. It lists the points a court or tribunal is likely to consider, in the government's view:</p>
<ul>
<li>whether the trial is really part of recruitment; if not, it is generally work;</li>
<li>whether it lasts longer than the employer reasonably needs to test your ability for the job on offer;</li>
<li>how far you are watched while you do the tasks;</li>
<li>how closely the tasks match the job: unrelated chores suggest the employer wants the tasks done rather than a test;</li>
<li>whether the tasks have value for the business beyond the test, which a simulated setting usually rules out;</li>
<li>whether trials matter to how the business runs, for instance as a way to keep labour costs down.</li>
</ul>
<p>The longer a trial goes on, the more likely it is to be work. Several unpaid days, or more than one full shift in a real workplace, will almost always create a right to the minimum wage, especially in sectors where pay is near the legal floor.</p>

<h2>HMRC's six example trials</h2>
${h.table(['Trial', 'Length', 'Likely outcome', 'Value at 21 and over'], [
  ['New bar, staff on trial across shifts while managers decide numbers', 'One week', 'Paid', `${h.gbp2(h.round2(r21 * 30))} for 30 hours`],
  ['Café candidate watched serving customers', '2 hours', 'Unpaid can be lawful', '-'],
  ['Warehouse candidate moving stock alone before any interview', '8 hours', 'Paid', h.gbp2(h.round2(r21 * 8))],
  ['Teacher candidate teaching two observed classes on an assessment day', 'An afternoon', 'Unpaid can be lawful', '-'],
  ['Trainee chef chopping vegetables then loading dishwashers on a busy Saturday', '12 hours', 'Paid', h.gbp2(h.round2(r21 * 12))],
  ['Head chef candidates cooking dishes for a tasting panel only', 'Assessment day', 'Unpaid can be lawful', '-'],
], 'Outcomes as HMRC describes them; value at the April 2026 rate where the minimum wage is likely due. The week assumes 30 hours, an illustration.', ['l', 'l', 'l', 'r'])}
<p>The patterns are clear. Watching the candidate, a length that fits the job and a simulated or genuinely assessed task point towards a lawful unpaid test. Being left alone, doing work unrelated to the job, working before even being interviewed, or a trial set on the busiest day to cover a gap point towards paid work. In the teacher's case, the regular teacher stayed in the room to assess, so the school gained little; in the warehouse case, nobody watched and the stock got moved.</p>

<h2>What a trial is worth</h2>
<p>If your trial crossed the line, the minimum wage is owed for every hour of it, at the rate for your age on that day. At the rates in force from 1 April 2026, an 8 hour trial is worth ${h.gbp2(h.round2(r19 * 8))} at 18 to 20 and ${h.gbp2(h.round2(h.rate(2026, 17) * 8))} at 16 or 17. From 1 April 2027, if the announced rates are confirmed in regulations, the same day would be worth ${h.gbp2(h.round2(h.rate(2027, 19) * 8))} at 18 to 20 and ${h.gbp2(h.round2(h.rate(2027, 21) * 8))} at 21 and over. Briefings before the trial and time kept waiting on site count as hours too, as the ${h.a('training-travel-waiting-time', 'page on working time')} explains.</p>
<p>A trial that is paid below the minimum, rather than unpaid, is checked the same way. The tool below shows how unpaid trial or induction hours added to a first paid week pull the real hourly rate down.</p>

<h2>The Work Trial exception and other schemes</h2>
<p>Minimum wage law allows a handful of unpaid trials linked to government programmes. The main one is the Jobcentre Plus Work Trial, up to ${h.num(h.RULES.trialWeeksJobcentre)} weeks, designed to let people on benefits try a job and backed by a job offer if it works out. Work experience done as part of other government training or job-seeking schemes is also outside the rules. A trial set up privately by an employer, however it is described, is judged by the six factors above. Internships follow their own logic, covered on the ${h.a('internships-minimum-wage', 'internship page')}.</p>

<h2>If you were not paid</h2>
<p>You do not need to have got the job to be owed the money. Keep your own record of the hours and tasks, ask the employer in writing, and if that fails, use the ${h.src('gov_complaint', 'pay and work rights complaint form')} or the Acas helpline on ${h.E.acasPhone}. HMRC says its officers look at every complaint and act where they think workers are being exploited under the cover of recruitment. The ${h.a('report-underpayment', 'step by step complaint page')} gives the full route.</p>`;
    },
  },
});
