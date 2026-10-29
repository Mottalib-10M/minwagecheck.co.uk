import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sleep-in-and-on-call',
  group: 'rules',
  order: 6,
  tool: { kind: 'mini:sleepin', props: { age: 35, a: 1.5, p: 50 } },
  mini: { kind: 'mini:worktime', props: { age: 35, g: 480, h: 36, x: 4 } },
  related: ['training-travel-waiting-time', 'zero-hours-and-agency-workers', 'salaried-hours-minimum-wage', 'report-underpayment', 'home'],
  sources: ['hmrc_hours', 'nmw_regs'],
  en: {
    slug: 'sleep-in-and-on-call',
    nav: 'Sleep-ins and on-call',
    card: 'Since the Supreme Court ruling of March 2021, only time awake for work counts on a sleep-in; on-call time counts at or near the workplace, not at home.',
    title: 'Sleep-In Shifts and On-Call Time: What the Minimum Covers',
    description: 'Sleep-in shifts: only hours awake for work must be paid at the minimum wage, if a suitable bed is provided. On-call time counts at or near work, not at home.',
    h1: 'Sleep-in shifts and on-call time: what must be paid',
    intro: 'Enter your age, the hours you were awake to work during the night and the flat payment for the sleep-in: the tool checks the payment covers those hours.',
    resume: (h) => `On a sleep-in shift, where you must stay at or near the workplace overnight and are expected to sleep for all or most of it, the minimum wage is only owed for the time you are awake for the purpose of working. The Supreme Court settled this in a unanimous judgment on ${h.date('2021-03-19')}, in Royal Mencap Society v Tomlinson-Blake and Shannon v Rampersad. Two conditions protect the worker. First, for workers paid by the hour or on a salary, the employer must provide suitable sleeping facilities, or the whole shift counts. Second, where you are expected to work for most of the shift and only nap between tasks, the whole shift counts too. A care worker aged 35 woken for one and a half hours of care in a night must receive at least ${h.gbp2(h.round2(h.rate(2026, 35) * 1.5))} for that time at the April 2026 rate of ${h.gbp2(h.rate(2026, 35))}. On-call time follows a separate rule: being required to stay available at or near the workplace counts, while being on call from home does not.`,
    faqs: (h) => [
      { q: 'Is a sleep-in shift paid at the minimum wage for every hour?', a: `Not when you are given a suitable place to sleep and are expected to sleep most of the night. Only time awake for work counts, such as answering a call or helping a resident. A flat sleep-in payment is lawful if it covers those awake hours at the rate for your age, ${h.gbp2(h.rate(2026, 21))} at 21 and over from April 2026. Without suitable facilities the whole shift must be paid.` },
      { q: 'Do I get paid while on call from home?', a: 'Not for the minimum wage. Time on call or on standby counts only when you are required to stay at or near the workplace. Waiting at home for a call, even if you must answer quickly, is not working time, and the minimum wage starts again when you arrive and start work or are required to be available there. An on-call allowance, if paid, does not count towards the minimum either.' },
      { q: 'What if I am woken so often on sleep-ins that I barely sleep?', a: 'Then the shift may no longer be a sleep-in at all. HMRC describes a care worker first woken only now and then, later woken so often that little sleep is possible. Once you can no longer be said to be expected to sleep for most of the shift, the minimum wage is likely to be due for the entire shift, not only the awake periods.' },
      { q: 'Does napping in a chair on a night shift stop the pay?', a: 'No. A security guard who is allowed to nap in a chair between regular rounds is expected to be awake and working for most of the shift, so the whole shift is working time. A chair is not a suitable sleeping facility either, which on its own means the whole shift counts for a worker paid by the hour. Short rests between tasks do not turn a working night into a sleep-in.' },
    ],
    body: (h) => {
      const r = h.rate(2026, 35);
      const full = h.round2(r * 9);
      return `
<h2>What makes a shift a sleep-in</h2>
<p>The ${h.src('hmrc_hours', 'HMRC guidance on working hours')} describes a sleep-in by three features: the contract obliges the worker to spend the shift at or near the workplace, usually at night; the worker is expected to sleep for all or most of it; and they are woken only when a particular task needs doing. The care sector is the classic case, but the rule is not limited to it.</p>
<p>The Supreme Court decided that a sleep-in worker is working, for minimum wage purposes, only while awake for the purpose of working. Asleep, or awake for their own reasons, they are not. That ruling, in Royal Mencap Society v Tomlinson-Blake and Shannon v Rampersad, is the reference point HMRC applies today.</p>

<h2>Five situations from HMRC's guidance</h2>
${h.table(['Situation', 'Hours that count'], [
  ['Care worker in bed reading for pleasure while keeping a listening ear', 'None while reading or asleep'],
  ['Night worker in a suitable bed, answering occasional phone calls', 'Only the time spent on the calls and other duties'],
  ['Security guard allowed to nap in a chair between rounds', 'The whole shift'],
  ['Care worker woken for an emergency, then not needed and reading a paper for an hour', 'That hour counts: awake for work'],
  ['Care worker woken so often that little sleep is possible', 'Likely the whole shift'],
], `Summarised from ${h.src('hmrc_hours', 'HMRC')}. Each case turns on the contract and on what happens in practice.`, ['l', 'l'])}
<p>The fourth case is easy to miss. Once woken to stand by for an emergency, the worker remains awake for the purpose of working even if they end up doing nothing, so the hour must be paid.</p>

<h2>Suitable sleeping facilities</h2>
<p>For time work and salaried hours work, the ${h.src('nmw_regs', 'National Minimum Wage Regulations 2015')} make the exception depend on the employer providing suitable facilities for sleep. If they do not, the entire shift is working time. Take a 9 hour night at the rate of ${h.gbp2(r)} for a worker aged 35: with a proper bed, a ${h.gbp(50)} flat payment covers up to ${h.num(Math.floor((50 / r) * 10) / 10, 1)} awake hours; without one, the night must be paid at least ${h.gbp2(full)}, leaving ${h.gbp2(h.round2(full - 50))} owed. From 1 April 2027 the announced rate of ${h.gbp2(h.rate(2027, 35))} would raise that night's minimum to ${h.gbp2(h.round2(h.rate(2027, 35) * 9))}, subject to the regulations being made.</p>

<h2>On call: at work or at home</h2>
<p>Standby and on-call time count as working time when you are required to be available at or near your workplace. They do not count when you are at home, even if you must stay reachable. HMRC's example is a factory worker called in for an urgent order: while at the factory and waiting for a late delivery, the worker is paid at least the minimum; while at home waiting for the call, they are not. Where you are on call at or near work and allowed to sleep, with suitable facilities, the sleep-in rule above applies instead.</p>
<p>This is different from the ${h.a('training-travel-waiting-time', 'waiting time at work')} that arises in the middle of a normal shift, which always counts.</p>

<h2>Live-in and 24 hour care</h2>
<p>Some live-in carers are paid a fixed sum for a 24 hour period, with tasks done as and when needed and breaks taken when the client does not need them. HMRC treats that as unmeasured work. The employer then either records every hour worked, or makes a daily average agreement with the worker: in writing, before the pay period starts, setting a realistic estimate of the hours likely to be worked each day. If the agreed average is 5 hours on a day the carer must be available for 12, and they are available for only 6 hours one day, that day counts as 2.5 hours. At ${h.gbp2(h.rate(2026, 21))} an hour, five full days at 5 hours must bring at least ${h.gbp2(h.round2(h.rate(2026, 21) * 25))}.</p>
<p>Use the tool at the top for a single night and the one below to see how unpaid hours in a week drag down your hourly pay. If the payment falls short, the ${h.a('report-underpayment', 'page on reporting underpayment')} sets out the next steps.</p>`;
    },
  },
});
