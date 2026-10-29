import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'training-travel-waiting-time',
  group: 'rules',
  order: 5,
  tool: { kind: 'mini:worktime', props: { age: 30, g: 520, h: 37.5, x: 3.5 } },
  mini: { kind: 'mini:trial', props: { age: 21, t: 4 } },
  related: ['sleep-in-and-on-call', 'zero-hours-and-agency-workers', 'apprentice-off-the-job-training', 'salaried-hours-minimum-wage', 'home'],
  sources: ['hmrc_hours', 'hmrc_elig', 'nmw_regs'],
  en: {
    slug: 'training-travel-waiting-time',
    nav: 'Training, travel and waiting',
    card: 'Which hours the minimum wage must cover: training, travel between jobs, waiting at work, briefings and security checks, but not the commute.',
    title: 'Training, Travel and Waiting Time: Hours the Minimum Covers',
    description: 'Training, travel between jobs and waiting at work all count as hours for the minimum wage; the commute and breaks do not. A £520 week of 41 hours falls short.',
    h1: 'Training, travel and waiting time: which hours count',
    intro: 'Enter your pay for the week, the hours you are paid for and any unpaid time spent training, travelling for work or waiting: the tool gives your real hourly pay.',
    resume: (h) => {
      const w = h.pay({ date: h.C.from, age: 30, hours: 41, gross: 520 });
      return `The minimum wage has to be paid for every hour that counts as working time, not only the hours on the rota. For a worker paid by the hour, that includes time spent working at the workplace, time kept there and available for work even when there is nothing to do, travel during the working day for the job or between assignments, waiting for transport on a work trip, and training. It does not include the journey between home and work, rest breaks, or paid or unpaid absences such as holidays and sick leave. HMRC gives the case of a shop worker aged 30 who works 7.5 hours a day for five days, but is also asked to arrive half an hour early each day and to attend a one hour team meeting each week. That is 41 hours, not 37.5. At ${h.gbp(520)} a week the pay was enough at the 2025 rate. At the April 2026 rate of ${h.gbp2(h.rate(2026, 30))} the same week comes to ${h.gbp2(w.hourly)} an hour and is ${h.gbp2(w.shortfall)} short, because the minimum for 41 hours is now ${h.gbp2(w.required)}.`;
    },
    faqs: (h) => [
      { q: 'Is my commute paid at the minimum wage if I have no fixed workplace?', a: 'Generally not. Travel between home and work is left out for minimum wage purposes, whether or not you have a fixed place of work, unless you actually work while travelling, for instance on a laptop on the train. A European court ruling treats the first and last journeys of mobile workers as working time for the Working Time Directive, but HMRC notes that pay for that time is a separate question.' },
      { q: 'Do security checks before a shift count as working time?', a: `HMRC names extra time added to a shift, such as passing through security on the way in and out or attending a handover meeting between shifts, as working time that apprentices are at risk of not being paid for. Where you are required to be at work for it, it counts. At ${h.gbp2(h.rate(2026, 21))} an hour, ten minutes a day over a five-day week is worth about ${h.gbp2(h.round2(h.rate(2026, 21) * 50 / 60))}.` },
      { q: 'Is time waiting for a train on a work trip counted?', a: 'Yes. Waiting for a train, changing trains or waiting for any other transport as part of travel for work counts towards your hours, and so does waiting to collect goods, meet someone for work or start a job. Rest breaks you take during the journey are treated like any other rest break and are left out, so a lunch stop on a long drive does not count.' },
      { q: 'Does a compulsory team meeting before opening count?', a: 'Yes. Any time you are required to spend at work, including briefings, preparation before a shift opens and meetings, counts as working time for the minimum wage. HMRC\'s own worked example adds a weekly one hour meeting and half an hour of daily preparation to a shop worker\'s rota hours. Unpaid, those extra hours lower your real hourly pay and can take it under the legal rate.' },
    ],
    body: (h) => {
      const w = h.pay({ date: h.C.from, age: 30, hours: 41, gross: 520 });
      const old = h.pay({ date: h.Y(2025).from, age: 30, hours: 41, gross: 520 });
      const care = h.pay({ date: h.C.from, age: 26, hours: 34, gross: h.round2(13.1 * 28) });
      return `
<h2>Hours that count and hours that do not</h2>
<p>The ${h.src('hmrc_hours', 'HMRC guidance on working hours')} sorts work into four types: time work paid by the hour, salaried hours work, output work paid by the piece, and unmeasured work. Most hourly paid staff do time work, and for them the line falls as follows.</p>
${h.table(['Counts as working time', 'Does not count'], [
  ['Working at the workplace', 'Travel between home and work'],
  ['Kept at work and available, even with nothing to do', 'Waiting at home to be called in'],
  ['Briefings, preparation, handovers, security checks you must attend', 'Rest breaks'],
  ['Travel for work during the day and between assignments', 'Holidays, sick leave and other absences, even if paid'],
  ['Waiting for transport on a work journey', 'Industrial action'],
  ['Training, including travel from work to the training venue', 'Travel from home to a training venue, in general'],
], `Time work rules from ${h.src('hmrc_hours', 'HMRC')}. Salaried, output and unmeasured work follow close variants.`, ['l', 'l'])}

<h2>The shop worker's week, then and now</h2>
<p>HMRC's example was built on the 2025 rate of ${h.gbp2(h.rate(2025, 30))}. Paid ${h.gbp(520)} for 41 hours, the worker received ${h.gbp2(old.hourly)} an hour and was compliant. Nothing about the job changed, but from 1 April 2026 the rate is ${h.gbp2(h.rate(2026, 30))}, and the same pay now gives ${h.gbp2(w.hourly)} an hour: ${h.gbp2(w.shortfall)} short each week. Had the employer counted only the 37.5 rota hours, it would have believed it was paying ${h.gbp2(h.round2(520 / 37.5))} an hour. From 1 April 2027 the announced rate of ${h.gbp2(h.rate(2027, 30))} would need ${h.gbp2(h.round2(h.rate(2027, 30) * 41))} for those 41 hours, once regulations confirm it.</p>

<h2>Waiting at work and travel between jobs</h2>
<p>If an employer calls a worker in for an urgent order and the delivery is late, the time spent at the factory waiting is paid at least at the minimum, because the worker is there and required to be available. The same worker waiting at home for the call is not working. The ${h.a('sleep-in-and-on-call', 'page on sleep-ins and on-call time')} covers standby at or near the workplace in more detail.</p>
<p>Travel between assignments is where many care and cleaning workers lose out. Picture a home care worker aged 26 paid ${h.gbp2(13.1)} for each of 28 hours of visits in a week, who also spends 6 hours driving from one client to the next. The visits pay ${h.gbp2(h.round2(13.1 * 28))}, but the hours that count are 34, so the real rate is ${h.gbp2(care.hourly)} an hour and the week is ${h.gbp2(care.shortfall)} short of the ${h.gbp2(h.rate(2026, 26))} minimum. The journey from home to the first client and back from the last generally does not count for pay. The ${h.a('zero-hours-and-agency-workers', 'zero hours and agency page')} looks at the same problem for workers on variable hours.</p>
<!--tool:mini:worktime|{"age":26,"g":366.8,"h":28,"x":6}-->

<h2>Training time</h2>
<p>Training counts as working time for every type of work, and for apprentices that includes the off-the-job training that forms part of the apprenticeship, along with English and maths where they apply. Travel from the workplace to a training venue counts too; travel from home to the venue generally does not. For salaried staff, training only drops out when the employer does not require it and it takes place outside their normal working time. If an employer also charges you for training it requires, that charge lowers your pay as well, as the ${h.a('uniform-deductions', 'page on deductions')} explains. The ${h.a('apprentice-off-the-job-training', 'off-the-job training page')} covers the apprentice rules.</p>

<h2>Keeping your own record</h2>
<p>Employers must keep enough records to show the minimum wage was paid for every pay period, and HMRC advises that they break down time spent travelling between appointments and waiting. Your own note of start and finish times, journeys and training sessions is useful evidence if the figures disagree. Add the unpaid hours to the tool at the top of this page to see your true hourly pay.</p>`;
    },
  },
});
