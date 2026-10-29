import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Minimum wage checker', method: 'Method', about: 'About', widget: 'Embed a calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
/** Menu labels: one or two words (RECETTE §10.3, one line at every width). */
const GROUP_LABEL: Record<Group, string> = { rates: 'Rates', ages: 'By age', pay: 'Your pay', rules: 'Check pay' };
const GROUP_FULL: Record<Group, string> = { rates: 'Minimum wage rates', ages: 'Rates by age and apprentices', pay: 'Weekly, monthly and yearly pay', rules: 'Deductions, hours and complaints' };
export const GROUPS_ORDER: Group[] = ['rates', 'ages', 'pay', 'rules'];
export const groupLabel = (g: Group, _lang: Locale = 'en', short = false) => (short ? GROUP_LABEL[g] : GROUP_FULL[g]);
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale, short = true): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: short ? GROUP_LABEL[g] : GROUP_FULL[g], links: g === 'rules' ? [link('home', lang), ...inGroup(g, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang, false),
  { label: 'This site', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
