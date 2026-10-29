import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'overtime-and-shift-premiums',
  group: 'rules',
  order: 3,
  tool: { kind: 'mini:premium', props: { age: 30, b: 12.5, h: 30, o: 10, x: 18.75 } },
  mini: { kind: 'mini:prp', props: { age: 30, f: 0, h: 40, g: 562.5 } },
  related: ['salaried-hours-minimum-wage', 'pay-reference-period', 'tips-and-service-charges', 'part-time-minimum-wage', 'home'],
  sources: ['hmrc_calc', 'hmrc_hours', 'nmw_regs'],
  en: {
    slug: 'overtime-and-shift-premiums',
    nav: 'Overtime and shift premiums',
    card: 'Only your basic rate counts: the extra paid for overtime, nights, weekends or bank holidays is left out of the minimum wage check.',
    title: 'Overtime and Shift Premiums: Why the Extra Does Not Count',
    description: 'Overtime and shift premiums are left out of the minimum wage check: only the basic rate counts for each hour. HMRC examples and a 2026 week that falls short.',
    h1: 'Overtime and shift premiums: only the basic rate counts',
    intro: 'Enter your basic rate and hours, then the overtime hours and the rate paid for them: the tool removes the premium and compares what is left with the minimum.',
    resume: (h) => {
      const w = h.pay({ date: h.C.from, age: 30, hours: 40, gross: 562.5, premium: 62.5 });
      return `When some hours are paid at a higher rate, for overtime, nights, weekends, bank holidays or hours beyond a set number, only the basic rate counts towards the minimum wage. The premium, which is the gap between the higher rate and the basic rate multiplied by the hours paid at it, is taken out of gross pay before the check. The remaining pay is divided by all the hours worked, premium hours included, and must reach the legal rate, which is ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over from 1 April 2026. Take a worker aged 30 on a basic ${h.gbp2(12.5)} for 30 hours, plus 10 hours of overtime at time and a half, ${h.gbp2(18.75)}. Gross pay is ${h.gbp2(562.5)}, an average of ${h.gbp2(562.5 / 40)} an hour, which looks comfortable. But ${h.gbp2(62.5)} of it is premium, so only ${h.gbp2(w.nmwPay)} counts, exactly ${h.gbp2(w.hourly)} an hour, and the week is ${h.gbp2(w.shortfall)} short. The rule exists so that generous overtime cannot hide a basic rate below the floor.`;
    },
    faqs: (h) => [
      { q: 'Does a night shift allowance count towards the minimum wage?', a: `Usually not. Allowances for unsocial hours, night work, dangerous conditions or being on call are left out unless they have been merged into your standard pay, and even then the part that is a premium for particular hours stays out. Your basic pay alone must reach ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over for every hour, including the night hours.` },
      { q: 'Is double time on a bank holiday counted in full for the minimum wage?', a: `No. If your basic rate is ${h.gbp2(12.8)} and you get double time, ${h.gbp2(25.6)}, on a bank holiday, only ${h.gbp2(12.8)} of each of those hours counts. The other ${h.gbp2(12.8)} is premium. That is fine as long as the basic rate on its own is at or above the legal minimum for your age.` },
      { q: 'Can London Weighting bring my pay up to the minimum?', a: `Not as a separate allowance. HMRC lists London Weighting among the allowances that do not count unless they are consolidated into standard pay. Signs of consolidation include the allowance rising with annual pay awards, being pensionable, or being used to work out your overtime rate. If it is a separate line paid for working in an area, your basic pay must clear ${h.gbp2(h.rate(2026, 21))} without it.` },
      { q: 'What if I am paid a higher rate for a different job, not overtime?', a: 'Different basic rates for genuinely different duties are not premiums, so each counts in full. HMRC gives the example of someone paid one rate for machine work and a higher rate for cleaning the factory: the two are simply added and divided by all the hours. Only a higher rate for doing the same job at particular times is treated as premium.' },
    ],
    body: (h) => {
      const y = h.Y(2025).from;
      const a = h.pay({ date: y, age: 25, hours: 20, gross: 252, premium: 9 });
      const b = h.pay({ date: y, age: 30, hours: 40, gross: 493, premium: 9 });
      const n = h.pay({ date: h.C.from, age: 30, hours: 40, gross: 562.5, premium: 62.5 });
      const fix = h.round2(h.rate(2026, 30) * 30 + 18.75 * 10);
      return `
<h2>How the premium is taken out</h2>
<p>The ${h.src('hmrc_calc', 'HMRC guidance on calculating the minimum wage')} sets out three steps when one basic rate applies to all the hours in a pay period. First, work out how much was paid above the basic rate: the extra per hour times the hours paid at the higher rate. Second, take that premium away from gross pay. Third, divide what is left by every hour worked in the period. The result is your hourly pay for minimum wage purposes. The premium is not lost to you: you keep it, it just cannot be used to prove the employer has paid the minimum.</p>
<p>This rule applies to time work, paid by the hour, and to output work, paid by the piece. For salaried hours work there is a parallel rule: a salary premium for working at night, on a bank holiday, in a particular place, in a freezer, on a forklift or with extra responsibility does not count either, while the underlying salary does. The ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} covers that case.</p>

<h2>HMRC's two examples, at the 2025 rate</h2>
<p>HMRC illustrates the rule with figures from the year to 31 March 2026, when the National Living Wage was ${h.gbp2(h.rate(2025, 21))}.</p>
${h.table(['', 'Weekend shift premium', 'Overtime at a higher rate'], [
  ['Worker', 'Aged 25, 20 hours', 'Aged 30, 40 hours'],
  ['Pay structure', `10 hours basic, 10 weekend hours with ${h.gbp2(0.9)} extra`, `30 hours at ${h.gbp2(12.1)}, 10 hours at ${h.gbp2(13)}`],
  ['Gross pay', h.gbp(252), h.gbp(493)],
  ['Premium removed', h.gbp(9), h.gbp(9)],
  ['Pay that counts', h.gbp(a.nmwPay), h.gbp(b.nmwPay)],
  ['Per hour', h.gbp2(a.hourly), h.gbp2(b.hourly)],
  ['Against the 2025 rate', `Short by ${h.gbp2(a.shortfall)}`, `Short by ${h.gbp2(b.shortfall)}`],
], `Examples from ${h.src('hmrc_calc', 'HMRC')}, recomputed with the site's engine.`, ['l', 'r', 'r'])}
<p>In both cases the gross average looked above the legal rate, and in both the worker was underpaid. The second case shows the most common pattern: a basic rate set a few pence below the minimum, with overtime paid just high enough to lift the weekly average. The law looks through it.</p>

<h2>The same trap at the April 2026 rate</h2>
<p>Back to the worker in the summary: ${h.gbp2(12.5)} basic for 30 hours, then 10 hours at ${h.gbp2(18.75)}. Gross pay of ${h.gbp2(562.5)} averages ${h.gbp2(562.5 / 40)} an hour. Once the ${h.gbp2(62.5)} premium comes out, ${h.gbp2(n.nmwPay)} is left for 40 hours, ${h.gbp2(n.hourly)} an hour against ${h.gbp2(h.rate(2026, 30))}. The employer owes ${h.gbp2(n.shortfall)} for the week. Raising the basic rate to ${h.gbp2(h.rate(2026, 30))} with the same overtime rate would give a gross of ${h.gbp2(fix)} and clear the check. From 1 April 2027 the announced rate of ${h.gbp2(h.rate(2027, 30))} would require the basic rate to rise again, once regulations set it.</p>
<p>A tool further down checks a whole pay period: put the gross for the week and all the hours in it. If your payslip mixes basic and premium hours, take the premium out of the gross first.</p>

<h2>Allowances: when an extra payment can count</h2>
<p>Allowances paid on top of standard pay are left out in the same way. HMRC's list includes payments for dangerous conditions, unsocial hours, working in a particular area such as London Weighting, special duties beyond normal ones, good timekeeping and being on call. They count only when they have become part of standard pay, or when they reward the worker's own performance. There is no fixed test for consolidation; HMRC looks at whether the allowance moves with general pay rises, is pensionable, or feeds into the overtime rate.</p>
<p>Performance pay is treated differently. Commission, merit pay and incentive payments that depend only on the worker's performance count in full, and so do bonuses, allocated to the right pay period as the ${h.a('pay-reference-period', 'pay reference period page')} explains.</p>

<h2>Reading your payslip</h2>
<p>Look for the basic hourly rate rather than the total. If it is at or above the rate for your age, premiums cannot cause a problem. If it is below, add up the hours paid at the higher rate, multiply them by the extra per hour, and subtract that from the gross before dividing by all the hours. Remember that ${h.a('tips-and-service-charges', 'tips and service charges')} are also left out, and that uniform or kit costs reduce what is left. Part-time workers on short weeks face the same rule; the ${h.a('part-time-minimum-wage', 'part-time page')} has examples at lower hours.</p>`;
    },
  },
});
