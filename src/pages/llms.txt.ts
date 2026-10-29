/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import { CURRENT, NEXT } from '../lib/engine/wage';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const r = (p: typeof CURRENT) => `£${p.bands[0].rate.toFixed(2)} (21 and over), £${p.bands[1].rate.toFixed(2)} (18 to 20), £${p.bands[2].rate.toFixed(2)} (16 to 17), £${p.apprentice.toFixed(2)} (apprentices)`;
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free minimum wage checker for the United Kingdom: the legal hourly rate for an age, an apprenticeship and a date, the pay of one pay reference period counted as HMRC does (premiums and tips left out, uniform costs and salary sacrifice taken off, accommodation offset), the gap per period, arrears and penalties, and weekly, monthly and yearly pay at the minimum. Rates from 1 April 2026: ${r(CURRENT)}. Rates from 1 April 2027, announced on ${words(params.announcement2027.date)}: ${r(NEXT)}. Independent site, not HMRC or GOV.UK. Checkers run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Rates since April 2019, accommodation offsets and HMRC guidance from GOV.UK, the National Minimum Wage Regulations 2015 and SI 2026/357 from legislation.gov.uk, Low Pay Commission publications (Open Government Licence v3.0), read on ${words(params.retrieved_at)}.`,
    '',
    `- [Minimum wage checker](${SITE_URL}${route('home', 'en')}): legal rate, pay that counts and shortfall for one pay period`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g, 'en', false)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
