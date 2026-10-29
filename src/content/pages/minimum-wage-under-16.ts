import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'minimum-wage-under-16',
  group: 'ages',
  order: 1,
  tool: { kind: 'mini:school' },
  mini: { kind: 'mini:young' },
  related: ['minimum-wage-16-year-old', 'who-gets-minimum-wage', 'minimum-wage-17-year-old', 'unpaid-trial-shifts'],
  sources: ['hmrc_elig', 'leave_school', 'child_emp', 'gov_rates'],
  en: {
    slug: 'minimum-wage-under-16',
    nav: 'Under 16',
    card: 'Why pupils below school leaving age have no legal hourly minimum, the leaving date in each nation and the hours children may work.',
    title: 'Minimum Wage Under 16: No Legal Rate Until School Leaving',
    description: 'Pupils below school leaving age have no legal minimum wage. Find the leaving date in each nation, the hours children may work and the £8 rate that comes after.',
    h1: 'Minimum wage under 16: no legal rate before school leaving age',
    intro: 'Enter a date of birth and the nation of the school: the tool gives the earliest leaving date, from which the 16 to 17 rate applies.',
    resume: (h) => `Workers below compulsory school leaving age, which is usually 16, are not entitled to the National Minimum Wage, so a 13, 14 or 15 year old with a paper round or a Saturday job has no legal hourly minimum. HMRC's ${h.src('hmrc_elig', 'eligibility guidance')} lists them among the people the law leaves out. The right starts once a young person is above school leaving age, and that day depends on the nation: in England and Wales it is the last Friday in June of the school year in which they turn 16; in Scotland it is 31 May or the start of the Christmas holidays, depending on the birthday; in Northern Ireland it is 30 June. From then the 16 to 17 rate applies, ${h.gbp2(h.rate(2026, 16))} an hour since 1 April 2026, and ${h.gbp2(h.rate(2027, 16))} was announced on ${h.date(h.A.date)} for April 2027. Before that day, the child employment rules limit term-time work to ${h.YNG.termMaxWeek} hours a week, ban work before 7am or after 7pm and keep pupils out of work during school hours.`,
    faqs: (h) => [
      { q: 'Can a 15 year old legally be paid any hourly rate at all?', a: `Yes. Below school leaving age there is no legal minimum, so the pay is whatever the employer and the family agree, even a low figure. The child employment rules still apply: limited hours, no work in school hours, nothing before 7am or after 7pm, and often a permit from the local council. Once the young person passes school leaving age, the 16 to 17 rate of ${h.gbp2(h.rate(2026, 16))} an hour applies.` },
      { q: 'I turned 16 in October but I am still at school: am I owed the minimum wage?', a: 'Not yet in England, Wales or Northern Ireland. The right depends on passing school leaving age, not on the birthday itself. A pupil in England who turns 16 in October can leave on the last Friday of June in that school year, and only from then does the 16 to 17 rate apply. In Scotland a pupil turning 16 between October and February can leave at the start of the Christmas holidays, so the right comes sooner.' },
      { q: 'How many hours can a 14 year old work in the school holidays?', a: `Up to ${h.YNG.holidayMaxWeek14} hours a week at 14, and up to ${h.YNG.holidayMaxWeek15} hours at 15 or 16 while still of school age, under the child employment rules published on GOV.UK. In term time the limit is ${h.YNG.termMaxWeek} hours a week, with no more than 2 hours on a school day or a Sunday. Some councils allow part-time work from 13, and many ask the employer to hold a permit for each child.` },
      { q: 'Is unpaid work experience arranged by my school legal at 15?', a: 'Yes. Work experience for pupils of compulsory school age is one of the situations HMRC lists where the minimum wage does not apply, so a placement organised through school is not paid work. The answer changes once someone has left school and does real work for a business: a trial that goes beyond a genuine short test of skills then has to be paid at least the hourly minimum.' },
    ],
    body: (h) => `
<h2>Why there is no minimum wage before school leaving age</h2>
<p>The ${h.src('nmw_act', 'National Minimum Wage Act 1998')} gives the right to workers who are above compulsory school age. HMRC's guidance names workers younger than compulsory school leaving age, usually 16, in its list of people who are not entitled. An employer paying a 14 year old ${h.gbp2(5)} an hour for delivering leaflets is therefore not breaking minimum wage law, however low that looks next to the adult rates.</p>
<p>The age that decides is not simply 16. A pupil can be 16 for several months and still be of compulsory school age, because the leaving date is fixed by the school calendar. Until that date passes, there is no hourly floor, whatever the job. The same goes for work experience organised by a school, which HMRC also places outside the minimum wage.</p>

<h2>School leaving dates in each nation</h2>
<p>The four nations set the leaving date differently. Two birthdays show how far apart the results can be for pupils of the same school year.</p>
${h.table(['Nation', 'Rule on GOV.UK', 'Born 20 November 2010', 'Born 10 May 2011'], [
  ['England', h.SCHOOL.england, h.date('2027-06-25'), h.date('2027-06-25')],
  ['Wales', h.SCHOOL.wales, h.date('2027-06-25'), h.date('2027-06-25')],
  ['Scotland', h.SCHOOL.scotland, 'start of the Christmas holidays 2026', `after ${h.date('2027-05-31')}`],
  ['Northern Ireland', h.SCHOOL.ni, `after ${h.date('2027-06-30')}`, `after ${h.date('2027-06-30')}`],
], `Earliest leaving date. Source: ${h.src('leave_school', 'GOV.UK, School leaving age')}.`, ['l', 'l', 'l', 'l'])}
<p>A pupil in Scotland born in November can leave school, and so gains the right to the minimum wage, about six months before a classmate in England born on the same day. In England the end of compulsory school does not end learning: until 18 a young person must stay in full-time education, start an apprenticeship, or spend 20 hours or more a week working or volunteering alongside part-time education. That duty does not lower the pay. A 16 year old who works 20 hours a week next to a college course is owed the 16 to 17 rate for every hour.</p>

<h2>Limits on work for children of school age</h2>
<p>With no pay floor, the protection for pupils is a cap on time. The ${h.src('child_emp', 'child employment rules')} allow part-time work from 14, or from 13 in some council areas, and the employer often needs a permit from the local council.</p>
${h.table(['Limit', 'Aged 14', 'Aged 15, or 16 and still at school'], [
  ['Hours in a term-time week', `${h.YNG.termMaxWeek} hours`, `${h.YNG.termMaxWeek} hours`],
  ['On a school day', '2 hours', '2 hours'],
  ['On a Sunday', '2 hours', '2 hours'],
  ['On a Saturday in term time', '5 hours', '8 hours'],
  ['In a school holiday week', `${h.YNG.holidayMaxWeek14} hours`, `${h.YNG.holidayMaxWeek15} hours`],
  ['Time of day', 'Not before 7am or after 7pm', 'Not before 7am or after 7pm'],
], 'Child employment limits on GOV.UK. Work in school hours is never allowed.', ['l', 'r', 'r'])}
<p>These limits concern safety and schooling rather than money, and they stop applying once the pupil has passed the leaving date.</p>

<h2>What changes on the leaving date</h2>
<p>From the leaving date, the young person is a worker above school age and the 16 to 17 rate applies: ${h.gbp2(h.rate(2026, 16))} an hour until 31 March 2027. A weekend job of 12 hours then has to pay at least ${h.gbp(h.conv(h.rate(2026, 16), 12).weekly)} a week. The child limits fall away and the young worker rules take over: at most ${h.YNG.under18MaxDay} hours a day and ${h.YNG.under18MaxWeek} hours a week, with a ${h.YNG.under18BreakMinutes} minute break after ${h.num(h.YNG.under18BreakAfterHours, 1)} hours.</p>
<!--tool:mini:convert|{"age":16,"h":12}-->
<p>For the summer job that follows the last day of school, the ${h.a('minimum-wage-16-year-old', 'page on pay at 16')} sets out the weekly figures, and the rate due from April 2027, ${h.gbp2(h.rate(2027, 16))}, announced but still to be set in regulations. A 16 year old taken on as an apprentice is paid the apprentice rate, which is the same figure.</p>

<h2>When an older teenager is paid nothing</h2>
<p>Once school is over, unpaid work is the exception. HMRC treats a short, genuine test of skills as unpaid, but trial work that is real work for the business must be paid. A school leaver who thinks a job has paid less than the minimum can raise it with the employer, call Acas on ${h.E.acasPhone} (${h.E.acasHours}) or use the ${h.src('gov_complaint', 'pay and work rights complaint form')}, which a parent can fill in on their behalf with their permission.</p>`,
  },
});
