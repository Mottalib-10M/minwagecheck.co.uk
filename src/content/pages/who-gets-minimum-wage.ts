import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'who-gets-minimum-wage',
  group: 'rules',
  order: 1,
  tool: { kind: 'check', props: { age: 23, hours: 30 } },
  mini: { kind: 'mini:trial', props: { age: 18, t: 8 } },
  related: ['internships-minimum-wage', 'zero-hours-and-agency-workers', 'unpaid-trial-shifts', 'minimum-wage-under-16', 'home'],
  sources: ['hmrc_elig', 'gov_who', 'worker_status', 'nmw_act'],
  en: {
    slug: 'who-gets-minimum-wage',
    nav: 'Who is entitled',
    card: 'Worker or self-employed, who is left out (volunteers, directors, placements, prisoners) and why a contract can never waive the legal rate.',
    title: 'Who Gets the Minimum Wage: Workers, Exemptions and Limits',
    description: 'Who gets the minimum wage: every worker above school leaving age, including casual, agency and home workers, and the short list of people the law leaves out.',
    h1: 'Who gets the minimum wage, and who is left out',
    intro: 'If you think you are a worker, enter one pay period: the checker shows the rate for your age and whether the pay that counts reaches it.',
    resume: (h) => `The minimum wage is owed to every worker who is above compulsory school leaving age, which is usually 16, unless one of a short list of exemptions applies. A worker is anyone who works under a contract of employment or under any other contract to do work personally, whether that contract is written, spoken or simply implied by turning up and doing the job. Part-time, casual, short-term, zero hours, agency and home workers are all covered. From 1 April 2026 the legal floor is ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over, ${h.gbp2(h.rate(2026, 18))} at 18 to 20 and ${h.gbp2(h.rate(2026, 16))} at 16 and 17 or on the apprentice rate. The people left out are mainly the genuinely self-employed, volunteers, company directors with no work contract, family members living in the employer's home, the armed forces, prisoners working under prison rules, share fishermen, students on a placement their course requires for up to ${h.num(h.RULES.placementMaxYears)} year, and people on a Jobcentre Plus work trial of ${h.num(h.RULES.trialWeeksJobcentre)} weeks or less. No agreement can switch the right off: a worker cannot sign it away.`,
    faqs: (h) => [
      { q: 'Can I agree with my employer to work for less than the minimum wage?', a: `No. The right cannot be waived by any contract, letter or verbal deal, even one you suggested yourself. If you are a worker and no exemption applies, the employer must pay at least ${h.gbp2(h.rate(2026, 21))} an hour at 21 and over from April 2026, and anything below that is a debt it still owes you, recalculated at the rate in force when it is repaid.` },
      { q: 'Are company directors entitled to the minimum wage?', a: 'A director is an office holder, and office holders are not workers for minimum wage purposes. The position changes when the director also has an employment contract, or a contract to personally do work, with the same company: in that case the minimum wage can be owed for the work done under that contract. Partners who are genuinely self-employed in a partnership or limited liability partnership are not covered either.' },
      { q: 'Does a gig economy courier get the minimum wage?', a: 'Only if the courier is a worker rather than genuinely self-employed, so status comes first. Where they are a worker, HMRC guidance treats several periods as likely working time: time the platform requires them to be logged in, time they must spend in a set area, travel to a pickup point once a job is accepted, and waiting for an order. Each app is looked at separately.' },
      { q: 'Is an au pair paid the minimum wage?', a: 'Sometimes not. The law leaves out people who are not family but live in the employer\'s home, share in its work and leisure, are treated as one of the family and are not charged for meals or a room. Some au pair arrangements fit that description. Where the person is charged for board, or is treated as staff rather than family, the exemption does not fit and the minimum wage applies.' },
    ],
    body: (h) => `
<h2>Worker or self-employed: the question that decides</h2>
<p>The rate tables only matter once you know you are a worker. The ${h.src('nmw_act', 'National Minimum Wage Act 1998')} uses a wide meaning: an employee, or anyone who has agreed to do work or provide a service personally for someone else who is not their own client or customer. The label in the paperwork is not decisive. HMRC looks at what really happens day to day, and the meaning of worker here can differ from the one used for income tax.</p>
<p>Several signs point towards self-employment, and none settles the matter alone. Someone who bears the risk of a loss and can increase their profit, brings their own tools and materials, may send a substitute instead of turning up, is free to work for other people, and decides how, when and how long they work, looks like a business. Someone whose tax and National Insurance are taken before payment, who must attend in person and faces discipline for not turning up, and who is promised a flow of work, looks like a worker. The ${h.src('worker_status', 'GOV.UK page on worker status')} describes the same tests in general terms.</p>

<h2>Who is in, who is out</h2>
${h.table(['Situation', 'Minimum wage?', 'What decides it'], [
  ['Part-time, casual, short contract, zero hours', 'Yes', 'They work under a contract like any other worker'],
  ['Agency worker', 'Yes', 'Treated as having a contract with whoever pays them, agency or hirer'],
  ['Home worker', 'Yes', 'The need to do the work in person is lifted for home workers'],
  ['Offshore and in UK waters', 'Yes, in most cases', 'Special orders extend the law to rigs, ports and UK waters'],
  ['Genuinely self-employed', 'No', 'Runs a business for clients'],
  ['Volunteer, or voluntary worker for a charity', 'No', 'No contract, or only expenses and limited benefits'],
  ['Company director without a work contract', 'No', 'Office holder, not a worker'],
  ['Family member living in the employer\'s home', 'No', 'Lives there and shares family tasks'],
  ['Student on a required course placement', 'No', `UK further or higher education, up to ${h.num(h.RULES.placementMaxYears)} year`],
  ['Pupil below school leaving age', 'No', 'Usually under 16'],
  ['Erasmus+ participant', 'No', 'Work done as part of the programme'],
  ['Jobcentre Plus work trial', 'No', `${h.num(h.RULES.trialWeeksJobcentre)} weeks or less`],
  ['Armed forces, prisoners, share fishermen', 'No', 'Excluded by name'],
], `Based on the ${h.src('hmrc_elig', 'HMRC eligibility guidance')} and ${h.src('gov_who', 'GOV.UK, Who gets the minimum wage')}.`, ['l', 'l', 'l'])}
<p>Government pre-apprenticeship schemes and other defined training or job-seeking programmes are also outside the rules. Once someone does qualify, the rate depends on age and apprenticeship, from ${h.gbp2(h.rate(2026, 16))} to ${h.gbp2(h.rate(2026, 21))} an hour in 2026; the ${h.a('national-minimum-wage', 'rates by age page')} sets out each band.</p>

<h2>Agency, home and offshore workers</h2>
<p>When an agency places you with a client business, the Act deems you to have a worker's contract with whichever of the two pays you. The minimum wage cannot fall into a gap between them. Separate rules on employment businesses also require an agency to pay you for the hours you worked even if the client has not yet paid the agency. The ${h.a('zero-hours-and-agency-workers', 'page on zero hours and agency work')} covers timesheets, umbrella company charges and travel between assignments.</p>
<p>Home workers who assemble, pack or produce items at home are covered even where the work does not have to be done by them personally, which would otherwise rule them out. The law also reaches workers on oil rigs and platforms in the UK sector of the continental shelf, and workers on ships in UK ports and internal waters, whatever their nationality or the ship's flag.</p>

<h2>Age: the one limit that is not about status</h2>
<p>Nobody below compulsory school leaving age is entitled, even if they do real work. The leaving date depends on the nation where the child is at school: in England and Wales it is the last Friday in June for those who are 16 by the end of the summer holidays, while Scotland and Northern Ireland use other dates. From that date the 16 to 17 rate applies in full. The ${h.a('minimum-wage-under-16', 'under 16 page')} gives the date for any birthday.</p>

<h2>Trials, internships and volunteering</h2>
<p>Three situations cause most disputes, because the person is often told they are not working. An unpaid trial shift is lawful only while it remains a short, genuine test of skills. An internship is paid at the minimum wage whenever the intern is in fact a worker, whatever the advert says. A volunteer must really be free to come and go, with no reward beyond expenses; someone who is paid, or trained beyond what the role needs, in return for set duties may be a worker. The tool below shows what a trial would be worth at the legal rate; the ${h.a('unpaid-trial-shifts', 'trial shift page')} and the ${h.a('internships-minimum-wage', 'internship page')} explain where the line falls.</p>
<!--tool:mini:trial|{"age":22,"t":12}-->
<p>If you are a worker and think you were paid too little, the gap is owed whether or not you still work there. The ${h.a('report-underpayment', 'page on reporting underpayment')} sets out the steps.</p>`,
  },
});
