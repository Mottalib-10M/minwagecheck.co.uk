import type { Locale } from './routes';
const en = {
  updatedOn: 'Rates and rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Rates and rules read by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Next steps', sourcesTitle: 'Where these rules were read', writtenBy: 'Written by',
  asOf: 'Minimum wage rules', lastUpdated: 'read on GOV.UK, legislation.gov.uk and the Low Pay Commission, last checked on',
  footerValidated: 'Every rate, offset and rule links to the regulation or official page it was read on',
  footerBrowser: 'Checkers run in your browser · nothing you type is sent or stored · free, no account',
  footerDisclaimer: 'UK Minimum Wage is an independent site published by Radif Partners. It is not HMRC, the Fair Work Agency, the Low Pay Commission, Acas, GOV.UK, a union, a law firm or a payroll provider. Each result is an estimate from what you enter and does not replace a decision by HMRC, a tribunal or a court.',
  footerPopular: 'Checkers',
  notFound: 'There is no page at this address. The minimum wage checker is on the home page.',
  readMore: 'Read more', back: 'Home',
  independent: 'Independent site, not HMRC or the Fair Work Agency. Complaints go to the official services named on this page.',
};
export function t(_lang: Locale = 'en') { return en; }
