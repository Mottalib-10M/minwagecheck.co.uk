import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'piece-work-minimum-wage',
  group: 'rules',
  order: 15,
  tool: { kind: 'mini:piece', props: { age: 26, m: 10, p: 1.4 } },
  mini: { kind: 'mini:salaried', props: { age: 28, s: 24000, h: 40 } },
  related: ['overtime-and-shift-premiums', 'salaried-hours-minimum-wage', 'training-travel-waiting-time', 'zero-hours-and-agency-workers', 'home'],
  sources: ['hmrc_hours', 'nmw_regs', 'gov_rates'],
  en: {
    slug: 'piece-work-minimum-wage',
    nav: 'Piece work',
    card: 'Paid per item with no set hours? The fair piece rate (regulation 43) divides the average output by 1.2; without a written notice, every hour must be paid instead.',
    title: 'Piece Work and the Minimum Wage: The Fair Piece Rate Rule',
    description: 'Piece work must pay at least a fair piece rate: the minimum wage divided by average hourly output ÷ 1.2. At 10 items an hour, £1.53 an item from April 2026.',
    h1: 'Piece work and the minimum wage: the fair piece rate',
    intro: 'Enter your age, the average number of items all workers make in an hour and the rate you are paid per item: the tool gives the fair piece rate and checks yours.',
    resume: (h) => {
      const r = h.rate(2026, 26);
      return `Workers paid only by the number of items they make or tasks they complete, with no set hours and free to start and stop when they like, do what the law calls output work. Their employer has two lawful options: pay at least the minimum wage for every hour worked, or pay a fair piece rate for each item and give the worker a written notice before the pay period starts. The fair piece rate comes from regulation 43 of the National Minimum Wage Regulations 2015. Take the average number of items the workforce produces in an hour, divide it by 1.2 to protect slower workers, then divide the minimum hourly rate by the result. At an average of 10 items an hour, the 1.2 divisor gives ${h.num(h.round2(10 / h.RULES.pieceUplift), 2)} items, so a worker aged 21 or over must get at least ${h.gbp2(h.piece(r, 10))} an item at the April 2026 rate of ${h.gbp2(r)}. The figure must be recalculated every 1 April: at the rate announced for 2027, it would be ${h.gbp2(h.piece(h.rate(2027, 26), 10))}. If the hours are fixed, piece pay is treated as time work and every hour must reach the minimum.`;
    },
    faqs: (h) => [
      { q: 'What is a fair piece rate under the minimum wage rules?', a: `It is the lowest rate per item that meets the law for output work. Divide the average hourly output of the workforce by 1.2, then divide the minimum wage by that figure. With an average of 12 items an hour, the rate for a worker aged 18 to 20 is ${h.gbp2(h.piece(h.rate(2026, 19), 12))} an item from April 2026, and for 21 and over ${h.gbp2(h.piece(h.rate(2026, 21), 12))}.` },
      { q: 'Does my employer have to give me a written notice for piece rates?', a: 'Yes. Without a written notice, issued before the pay period starts, the employer cannot rely on a fair piece rate and must pay at least the minimum wage for every hour you work. The notice must explain that you are treated as working a set time per item, give the average hourly output and how it was found, state your rate per item and include the Acas helpline number.' },
      { q: 'Are piece workers paid for travelling between jobs?', a: 'Yes. Time spent travelling in connection with output work must be paid at least at the minimum wage, on top of the piece rate, for example a salesperson on commission driving from one appointment to the next. The journey between home and the usual workplace does not count, but a home worker travelling from home to separate premises where they report does count.' },
      { q: 'If my hours are fixed but I am paid per item, which rule applies?', a: `The time work rule. When the employer sets your hours, pay per item is checked like hourly pay: the total for the period divided by the hours must reach the rate for your age. HMRC's example is a garment worker on a set 40 hour week: on a slow day of 2 items an hour at ${h.gbp2(4.5)} each, the minimum of ${h.gbp2(h.rate(2026, 27))} an hour still applies.` },
    ],
    body: (h) => {
      const r25 = h.rate(2025, 26);
      const rows = [2025, 2026, 2027].map((y) => [y === 2027 ? 'From 1 April 2027 (announced)' : `From 1 April ${y}`, h.gbp2(h.rate(y, 26)), h.gbp2(h.piece(h.rate(y, 26), 10)), h.gbp2(h.piece(h.rate(y, 19), 10))]);
      return `
<h2>Output work or time work</h2>
<p>The ${h.src('hmrc_hours', 'HMRC guidance on working hours')} separates four types of work, and the piece rate rules apply only to one of them. Output work means pay that depends solely on the number of items made or tasks done, where the employer sets no hours or the worker is free to choose when to work. A home worker paid per garment and working whenever they like is the typical case.</p>
<p>If the employer pays per item but fixes the hours, the work is time work. HMRC gives the example of a factory worker aged 27 on a set 40 hour week, paid ${h.gbp2(4.5)} per garment, who usually makes 3 an hour and so earns ${h.gbp2(13.5)}. On a slow week of 2 garments an hour the piece pay would be ${h.gbp2(9)} an hour, but because the hours are set, every hour must be paid at least ${h.gbp2(h.rate(2026, 27))} from April 2026, and the employer tops up the difference.</p>

<h2>Calculating the fair piece rate</h2>
<ol>
<li><strong>Find the mean hourly output.</strong> Test all the workers doing the task, or a representative sample such as one in ten, in conditions like those they normally work in, and take the average per worker per hour. A sample of the fastest workers is not acceptable.</li>
<li><strong>Divide by 1.2.</strong> This gives the number of items per assessed hour. The divisor in regulation 43 of the ${h.src('nmw_regs', 'National Minimum Wage Regulations 2015')} gives slower than average workers a margin.</li>
<li><strong>Divide the minimum hourly rate by that number.</strong> The result is the lowest lawful rate per item; this site rounds it up to the next penny so it never falls short.</li>
</ol>
<p>HMRC's own example used 10 items an hour and the 2025 rate of ${h.gbp2(r25)}: 10 ÷ 1.2 is ${h.num(h.round2(10 / 1.2), 2)}, and ${h.gbp2(r25)} ÷ ${h.num(h.round2(10 / 1.2), 2)} gives ${h.gbp2(h.piece(r25, 10))} per item. The rate moves every April with the minimum wage.</p>
${h.table(['Rates in force', 'Minimum at 21 and over', 'Fair piece rate at 21 and over', 'Fair piece rate at 18 to 20'], rows, `Mean output of 10 items an hour. The April 2027 rates were announced on ${h.date(h.A.date)} and still have to be set in regulations.`, ['l', 'r', 'r', 'r'])}

<h2>The written notice</h2>
<p>The employer can only use a fair piece rate if it gives each worker a written notice before the start of the pay period; one notice covers later periods as long as its terms stay the same. The notice must:</p>
<ul>
<li>say that, for minimum wage purposes, the worker is treated as working a set time to make each item or do each task;</li>
<li>state that the employer has tested, or estimated, the average speed of the work, and give that mean hourly output;</li>
<li>state the rate paid per item or task;</li>
<li>give the Acas helpline number, ${h.E.acasPhone}.</li>
</ul>
<p>Employers must keep copies of the notices and the test data behind the mean hourly output. Without a valid notice, the fallback is the minimum wage for every hour actually worked.</p>
<!--tool:mini:piece|{"age":19,"m":12,"p":1.1}-->

<h2>Estimates, travel and deductions</h2>
<p>An employer may estimate the mean output instead of testing in two cases: where a similar item has already been tested in similar conditions, or where the same item was tested in different conditions, such as in a factory rather than at home, with a fair adjustment for the extra or reduced time needed. Tests should be repeated when the work changes.</p>
<p>Time spent travelling for the job is paid on top of piece pay at least at the minimum wage. Premium rates for overtime are left out, as for hourly workers; the ${h.a('overtime-and-shift-premiums', 'premiums page')} explains why. A fair piece rate is exactly the minimum, so any deduction for meals, kit or uniform takes the worker below it, which is why HMRC notes that employers may prefer to set rates higher. Paid absences that are identifiable on the payslip are removed from the check, and the hours of absence do not count.</p>
<p>Workers on an annual salary follow a different method again; the tool under the summary converts a salary into an hourly rate, and the ${h.a('salaried-hours-minimum-wage', 'salaried hours page')} explains it.</p>`;
    },
  },
});
