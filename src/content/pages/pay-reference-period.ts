import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pay-reference-period',
  group: 'rules',
  order: 9,
  tool: { kind: 'mini:prp', props: { age: 25, f: 3, h: 160, g: 2000 } },
  mini: { kind: 'mini:birthday' },
  related: ['birthday-pay-rise', 'minimum-wage-april-2027', 'overtime-and-shift-premiums', 'minimum-wage-arrears', 'home'],
  sources: ['hmrc_calc', 'hmrc_hours', 'nmw_regs'],
  en: {
    slug: 'pay-reference-period',
    nav: 'Pay reference period',
    card: 'The minimum wage is checked one pay period at a time, never over more than a month: averaging, bonuses, late timesheets and when a new rate starts.',
    title: 'Pay Reference Period: How Each Pay Period Is Checked',
    description: 'A pay reference period is the week, fortnight, four weeks or month your pay covers, never over a month. The minimum wage is checked on its average hourly pay.',
    h1: 'Pay reference period: the unit of the minimum wage check',
    intro: 'Choose how often you are paid, then enter the hours worked and the gross pay for one period: the tool gives the minimum for that period and any shortfall.',
    resume: (h) => {
      const m = h.pay({ date: h.C.from, age: 25, hours: 160, gross: 2000 });
      return `The pay reference period is the stretch of time that one payment covers: a week for weekly pay, two weeks for fortnightly pay, four weeks, or a calendar month, and never longer than a month. The minimum wage is checked separately in each one. The employer adds up the pay that counts for the period, divides it by the hours worked in it, and the average must reach the rate for your age, which is ${h.gbp2(h.rate(2026, 25))} an hour at 21 and over from 1 April 2026. The day the money arrives does not matter; what matters is the period the payment is for. Inside a period, long and short days balance out, but a good month cannot cover a bad one, except where pay earned in one period is paid in the next. A monthly paid worker aged 25 who works 160 hours for ${h.gbp(2000)} is paid ${h.gbp2(m.hourly)} an hour and is owed ${h.gbp2(m.shortfall)} for that month. A new April rate, or a birthday that moves you into a higher band, starts with the first pay reference period that begins on or after that date.`;
    },
    faqs: (h) => [
      { q: 'Does it matter which day I am paid for the minimum wage check?', a: 'No. The pay date has no effect on the pay reference period, which is simply the time the payment covers. A worker paid on the 28th for the calendar month has a monthly period from the 1st to the last day, whatever the payday. What matters is that the pay for that period, divided by the hours worked in it, reaches the legal rate.' },
      { q: 'Can a big week make up for a short week in the same month?', a: `If you are paid monthly, yes: everything in the month is averaged, so a long week at a low rate can be balanced by better paid days, as long as the month's total divided by the month's hours reaches ${h.gbp2(h.rate(2026, 21))} at 21 and over. If you are paid weekly, each week stands alone and must reach the rate on its own.` },
      { q: 'Is a commission paid a month late counted in the month I earned it?', a: 'Yes, if it is paid in the very next pay period. Pay earned towards the end of one period that cannot be worked out in time counts towards the period in which it was earned. If the payment is delayed by more than one period, it usually counts only in the period when it is actually paid, which can leave the earlier period underpaid.' },
      { q: 'When does a December bonus count towards the minimum wage?', a: 'An annual bonus mostly counts in the pay period in which it is paid. For a monthly paid worker, one twelfth of it can be allocated to the month before. So a bonus paid in December helps November and December, and none of it can repair a shortfall in January to October. A bonus is therefore no remedy for a basic rate set below the legal minimum.' },
    ],
    body: (h) => {
      const r = h.rate(2026, 30);
      const base = h.pay({ date: h.C.from, age: 30, hours: 150, gross: 1900 });
      const nov = h.pay({ date: h.C.from, age: 30, hours: 150, gross: 1950 });
      const dec = h.pay({ date: h.C.from, age: 30, hours: 150, gross: 2450 });
      return `
<h2>One period, one average</h2>
<p>The ${h.src('hmrc_calc', 'HMRC guidance on calculating the minimum wage')} sets out the check in a fixed order: identify the pay reference period, work out the pay that counts for it, work out the hours that count in it, divide one by the other, and compare the result with the rate that applies. If the average falls short, the employer must pay the difference for that period.</p>
${h.table(['How you are paid', 'Pay reference period', 'Minimum for 37.5 hours a week at 21 and over'], [
  ['Weekly', '1 week', h.gbp2(h.round2(r * 37.5))],
  ['Every two weeks', '2 weeks', h.gbp2(h.round2(r * 75))],
  ['Every four weeks', '4 weeks', h.gbp2(h.round2(r * 150))],
  ['Monthly', '1 calendar month', `${h.gbp2(h.round2(r * 162.5))} for 162.5 hours`],
], 'April 2026 rate. A month averages 162.5 hours at 37.5 hours a week (× 52 ÷ 12); an actual month uses its actual hours.', ['l', 'l', 'r'])}
<p>Averaging inside a period cuts both ways. A worker doing two different duties for the same employer at different basic rates, one below and one above the legal floor, is compliant if the total pay for all the hours in the period clears it. A worker paid weekly gets no credit for a better week before or after.</p>

<h2>Pay that crosses from one period to the next</h2>
<p>Real payrolls do not always close on time, and the rules allow for it in a few defined cases.</p>
<ul>
<li><strong>Pay earned but paid next period.</strong> Overtime or commission earned near the end of a period and paid in the following one counts for the period in which it was earned. Delay it by more than one period and it usually counts only when paid.</li>
<li><strong>Making up a shortfall.</strong> An employer may pay more in one period to cover an underpayment in the period immediately before, provided the extra relates directly to that shortfall.</li>
<li><strong>Timesheets.</strong> Hours on a timesheet count for the period in which they were worked, and must be paid in that period or the next. If the worker hands the timesheet in late, meaning fewer than 4 working days before the end of the following period, the employer gets one more period to pay.</li>
<li><strong>No double counting.</strong> The same money cannot count in two periods.</li>
</ul>
<p>Deductions follow their own timing: a deduction lowers the pay that counts in the period in which it is made, even when it relates to another one.</p>

<h2>A bonus does not rescue the year</h2>
<p>Suppose a worker aged 30 is paid ${h.gbp(1900)} a month for 150 hours, which is ${h.gbp2(base.hourly)} an hour, below the ${h.gbp2(r)} floor, and receives a ${h.gbp(600)} annual bonus in December. One twelfth of the bonus, ${h.gbp(50)}, can go to November; the rest counts in December.</p>
${h.table(['Month', 'Pay that counts', 'Per hour', 'Result'], [
  ['January to October, each', h.gbp(1900), h.gbp2(base.hourly), `${h.gbp2(base.shortfall)} short`],
  ['November (with one twelfth of the bonus)', h.gbp(1950), h.gbp2(nov.hourly), nov.shortfall ? `${h.gbp2(nov.shortfall)} short` : 'Compliant'],
  ['December (rest of the bonus)', h.gbp(2450), h.gbp2(dec.hourly), dec.shortfall ? `${h.gbp2(dec.shortfall)} short` : 'Compliant'],
], 'Illustration at the April 2026 rate, built on the allocation method HMRC describes.', ['l', 'r', 'r', 'l'])}
<p>Ten months stay underpaid, by ${h.gbp2(h.round2(base.shortfall * 10))} in total, however generous the bonus.</p>

<h2>When a new rate starts</h2>
<p>A rate rise applies from the first pay reference period that starts on or after the date of the change. A worker whose monthly period runs from the 16th to the 15th kept the old rate until 15 April 2026 and moved to ${h.gbp2(h.rate(2026, 21))} at 21 and over from 16 April. If the announced April 2027 rate of ${h.gbp2(h.rate(2027, 21))} is set in regulations as planned, that worker would move to it from 16 April 2027. The same rule governs birthdays that move you into a higher band: the birthday tool under the summary gives the date for any birth date and pay cycle, and the ${h.a('birthday-pay-rise', 'birthday page')} explains each band. The tool below shows what the announced April 2027 rate would mean per period.</p>
<!--tool:mini:convert|{"yr":8,"age":25,"h":37.5}-->

<h2>Salaried workers</h2>
<p>For salaried hours work, the hours in each period are a fixed share of the basic annual hours: divide by 52 for weekly pay, 26 for fortnightly, 13 for four-weekly and 12 for monthly. HMRC's example of ${h.gbp(24000)} for 1,920 hours a year gives 160 hours a month and ${h.gbp2(2000 / 160)} an hour, whatever the number of working days in that month. That passed at the 2025 rate but would fall short of ${h.gbp2(h.rate(2026, 23))} from April 2026. Extra hours beyond the annual total change the picture, as the ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} explains. If a period was underpaid, the ${h.a('minimum-wage-arrears', 'arrears page')} shows how much is owed now.</p>`;
    },
  },
});
