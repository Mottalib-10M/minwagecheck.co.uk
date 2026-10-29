import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'internships-minimum-wage',
  group: 'rules',
  order: 13,
  tool: { kind: 'mini:trial', props: { age: 21, t: 35 } },
  mini: { kind: 'mini:worktime', props: { age: 21, g: 250, h: 35, x: 0 } },
  related: ['who-gets-minimum-wage', 'unpaid-trial-shifts', 'apprentice-minimum-wage', 'minimum-wage-21-year-old', 'home'],
  sources: ['hmrc_elig', 'gov_who', 'worker_status'],
  en: {
    slug: 'internships-minimum-wage',
    nav: 'Internships',
    card: 'An intern who is in fact a worker must get the minimum wage, whatever the advert says. The exemptions: required course placements, school pupils, Erasmus+, shadowing.',
    title: 'Internships and the Minimum Wage: Paid, Unpaid or Exempt',
    description: 'Internships pay the minimum wage when the intern is a worker, whatever the label. Required UK course placements up to a year, Erasmus+ and shadowing are exempt.',
    h1: 'Internships and the minimum wage: who must be paid',
    intro: 'Enter your age and the hours you work in a week of the internship: the tool shows what that week is worth at the minimum wage.',
    resume: (h) => `The word intern has no meaning in minimum wage law. What decides is whether the intern is a worker: someone with an agreement, even an oral one, to do work personally in return for something of value. If an intern receives any payment for the work beyond genuine expenses, or is promised a paid job or future pay at the end, they are likely to be a worker and must be paid at least ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over, or ${h.gbp2(h.rate(2026, 18))} at 18 to 20, from 1 April 2026. Calling the role unpaid or expenses only changes nothing. A 35 hour week at 21 and over is worth ${h.gbp2(h.round2(h.rate(2026, 21) * 35))}; a six week summer internship of that kind is worth ${h.gbp2(h.round2(h.rate(2026, 21) * 35 * 6))}. The exemptions are specific: students on a placement that their UK further or higher education course requires, lasting no more than ${h.num(h.RULES.placementMaxYears)} year; pupils below school leaving age; participants in Erasmus+ and some government schemes; genuine volunteers and voluntary workers for charities; and people who only shadow staff without doing any work.`,
    faqs: (h) => [
      { q: 'Does an internship described as expenses only have to pay the minimum wage?', a: `It can. The label does not decide. If the expenses are a round sum larger than your real costs, the excess is pay for your work. HMRC describes an intern offered ${h.gbp(50)} a week of travel expenses who walks to work: the payment points to a worker relationship. A promise of a paid job at the end has the same effect for the whole internship.` },
      { q: 'Is a year-long placement in my degree paid the minimum wage?', a: `Not if the placement is a required part of a UK further or higher education course, takes place before the course ends and lasts no more than ${h.num(h.RULES.placementMaxYears)} year. Employers may still choose to pay or cover expenses. Work you do for the same employer outside the placement, or a placement your course does not require, follows the normal rules and is paid at least the rate for your age.` },
      { q: 'Do I get the minimum wage for work shadowing?', a: 'No, as long as you are genuinely only observing. Shadowing means watching staff do their jobs without doing actual work yourself, and it falls outside the minimum wage. Once you are given real tasks that the business uses, such as research, writing content or dealing with clients, you are no longer shadowing and may well be a worker entitled to the minimum wage.' },
      { q: 'Is an intern at a charity a volunteer?', a: 'Possibly. Someone who organises events for a charity under an agreement, unpaid apart from reasonable travel and lunch expenses, is treated as a voluntary worker, and voluntary workers for charities are not entitled to the minimum wage. The exemption is lost if the charity pays more than expenses or provides benefits such as training beyond what the role needs.' },
    ],
    body: (h) => {
      const w = h.round2(h.rate(2026, 21) * 35);
      return `
<h2>The test: worker or not</h2>
<p>The ${h.src('hmrc_elig', 'HMRC eligibility guidance')} treats work experience, placements and internships alike. Entitlement does not depend on the title, the sector, the profession or how the role is advertised. What matters is whether there is a contract, written, oral or implied, under which the person must turn up and work personally in return for something of value, such as money, benefits or a promise of future work. The ${h.src('worker_status', 'GOV.UK worker status page')} explains the general idea.</p>
<p>Two features make a worker relationship likely. The first is any payment for the work: if anything is paid beyond the real cost of expenses, it counts as reward. The second is a promise of a contract or pay in the future, which turns the whole unpaid period into work.</p>

<h2>Three internships HMRC describes</h2>
${h.table(['Internship', 'Key fact', 'Likely result'], [
  ['Summer research and writing at a newspaper, 4 days a week for 6 weeks, with daily journalism training', 'Oral agreement to work set days on real deadlines', 'Minimum wage due'],
  ['Three months at a record company, called an unpaid intern, expenses only', 'Promised a paid job at the end', 'Minimum wage due for the whole period'],
  ['Two weeks preparing pitch presentations at a design firm', `${h.gbp(50)} a week of travel expenses, but walks to work`, 'Likely a worker'],
], `Summarised from ${h.src('hmrc_elig', 'HMRC')}.`, ['l', 'l', 'l'])}
<p>In the newspaper case, the training offered in return does not cancel the work: the intern produced content the business used, on its timetable. Working out the value is straightforward. If the newspaper intern's days come to 28 hours a week, at the rate for 21 and over that week is worth ${h.gbp2(h.round2(h.rate(2026, 21) * 28))}, or ${h.gbp2(h.round2(h.rate(2026, 21) * 28 * 6))} over six weeks; at 18 to 20, ${h.gbp2(h.round2(h.rate(2026, 19) * 28 * 6))}. The hours here are an illustration; the real figure depends on the hours worked, which include training time.</p>

<h2>When an intern does not have to be paid</h2>
<ul>
<li><strong>Required course placements.</strong> A placement that a UK further or higher education course requires, done before the course ends and lasting up to ${h.num(h.RULES.placementMaxYears)} year. HMRC's example is a trainee teacher on two eight-week school placements: unpaid lawfully, while her evening job in a restaurant must pay the minimum wage.</li>
<li><strong>School pupils.</strong> Work experience by pupils below compulsory school leaving age, generally 16.</li>
<li><strong>Government schemes.</strong> Training, work experience or temporary work under defined government programmes, and a genuine traineeship programme in England.</li>
<li><strong>Erasmus+.</strong> Work done as part of the programme.</li>
<li><strong>Volunteers and voluntary workers.</strong> Unpaid helpers who receive no more than limited expenses and benefits, notably for charities.</li>
<li><strong>Shadowing.</strong> Observing without doing actual work.</li>
</ul>

<h2>Trainees and apprentices are different</h2>
<p>The word trainee has no legal weight either. Someone learning on the job while doing real work for the employer is a worker and must be paid the rate for their age for all hours, training included. A genuine apprentice can be paid the apprentice rate of ${h.gbp2(h.C.apprentice)} while under 19 or in the first year, but only under a real apprenticeship agreement or contract of apprenticeship; calling an intern an apprentice does not unlock the lower rate. The ${h.a('apprentice-minimum-wage', 'apprentice page')} covers the conditions.</p>

<h2>Checking your own internship</h2>
<p>Ask three questions: do you have to attend set days and do set tasks, does the business use what you produce, and are you paid anything beyond real expenses or promised a job? If the answers point towards work, each week is owed at the minimum wage, ${h.gbp2(w)} for 35 hours at 21 and over from April 2026. From 1 April 2027 the announced rate would make that ${h.gbp2(h.round2(h.rate(2027, 21) * 35))}, once regulations confirm it. The ${h.a('unpaid-trial-shifts', 'trial shift page')} deals with short pre-hire tests, and the ${h.a('who-gets-minimum-wage', 'eligibility page')} lists every exemption.</p>`;
    },
  },
});
