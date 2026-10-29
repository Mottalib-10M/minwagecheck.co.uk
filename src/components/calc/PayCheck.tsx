/**
 * "Am I paid the minimum wage?" for one pay reference period: date, age, apprenticeship, hours and
 * gross pay, then what HMRC leaves out (premiums, tips) or takes off (deductions for the employer's
 * purposes, salary sacrifice) and the accommodation offset → pay that counts per hour, the legal
 * rate, the gap for the period and what changes on 1 April 2027. Every rule comes from
 * `lib/engine/wage.ts`. First render = build defaults and build day (RECETTE §17.5); the shared link
 * and today are applied after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { DateField, PRIVACY } from './fields';
import { payCheck, NEXT } from '../../lib/engine/wage';
import { money, dateL, formatNumberL } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { age?: number; appr?: number; hours?: number; gross?: number; uniform?: number; tips?: number; premium?: number; sacrifice?: number; accom?: number; idPrefix?: string; primary?: boolean; methodHref?: string; reportHref?: string; open?: boolean }

const APPR = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes, in the first year' }, { value: '2', label: 'Yes, after the first year' }];
const ACCOM = [{ value: '0', label: 'No accommodation' }, { value: '1', label: 'Free accommodation' }, { value: '2', label: 'Accommodation I pay for' }];
const gbp2 = (v: number) => `£${formatNumberL(v, 'en', 2)}`;

export default function PayCheck({ age: a0 = 22, appr: ap0 = 0, hours: h0 = 160, gross: g0 = 1950, uniform: u0 = 0, tips: t0 = 0, premium: p0 = 0, sacrifice: s0 = 0, accom: ac0 = 0, idPrefix = 'pc', primary = true, methodHref, reportHref, open = false }: Props) {
  const [date, setDate] = useState(__BUILD_DAY__);
  const [age, setAge] = useState(a0);
  const [appr, setAppr] = useState(ap0);
  const [hours, setHours] = useState(h0);
  const [gross, setGross] = useState(g0);
  const [premium, setPremium] = useState(p0);
  const [tips, setTips] = useState(t0);
  const [uniform, setUniform] = useState(u0);
  const [sacrifice, setSacrifice] = useState(s0);
  const [accom, setAccom] = useState(ac0);
  const [nights, setNights] = useState(ac0 ? 30 : 0);
  const [charge, setCharge] = useState(ac0 === 2 ? 15 : 0);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const t = new Date().toISOString().slice(0, 10);
    if (!primary) { setDate(t); return; }
    const u = readParams(window.location.search);
    setDate(/^\d{4}-\d{2}-\d{2}$/.test(str(u, 'd', '')) ? str(u, 'd', t) : t);
    setAge(num(u, 'age', a0)); setAppr(num(u, 'ap', ap0)); setHours(num(u, 'h', h0)); setGross(num(u, 'g', g0));
    setPremium(num(u, 'pr', p0)); setTips(num(u, 'tp', t0)); setUniform(num(u, 'u', u0)); setSacrifice(num(u, 'ss', s0));
    setAccom(num(u, 'ac', ac0)); setNights(num(u, 'n', ac0 ? 30 : 0)); setCharge(num(u, 'c', ac0 === 2 ? 15 : 0));
  }, []);
  useEffect(() => {
    if (primary && touched) updateURL({ d: date, age, ap: appr || undefined, h: hours, g: gross, pr: premium || undefined, tp: tips || undefined, u: uniform || undefined, ss: sacrifice || undefined, ac: accom || undefined, n: accom ? nights : undefined, c: accom === 2 ? charge : undefined });
  }, [date, age, appr, hours, gross, premium, tips, uniform, sacrifice, accom, nights, charge, touched]);
  const touch = <T,>(f: (v: T) => void) => (v: T) => { setTouched(true); f(v); };
  const id = (s: string) => `${idPrefix}-${s}`;

  const input = { date, age, apprentice: appr > 0, firstYear: appr === 1, hours, gross, premium, tips, deductions: uniform, sacrifice, accomDays: accom ? nights : 0, accomCharge: accom === 2 ? charge : 0 };
  const r = useMemo(() => payCheck(input), [date, age, appr, hours, gross, premium, tips, uniform, sacrifice, accom, nights, charge]);
  const nextDate = NEXT.from;
  const future = date < nextDate ? payCheck({ ...input, date: nextDate }) : null;
  const under = r.rate.kind === 'none';
  const adjustments = premium + tips + uniform + sacrifice + (accom ? 1 : 0) > 0;

  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-paycheck>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <NumberField id={id('age')} label="Your age at the start of the period" value={age} onChange={touch(setAge)} unit="years" max={99} />
          <SelectField id={id('appr')} label="Apprentice?" value={String(appr)} onChange={touch((x: string) => setAppr(Number(x)))} options={APPR} />
          <NumberField id={id('hours')} label="Hours worked in the pay period" value={hours} onChange={touch(setHours)} unit="h" max={744} decimals={2} />
          <NumberField id={id('gross')} label="Gross pay for the period" value={gross} onChange={touch(setGross)} unit="£" max={100000} decimals={2} />
          <DateField id={id('date')} label="Pay period starts on" value={date} onChange={touch(setDate)} />
          <details className="sm:col-span-2 rounded-lg border border-navy-200 px-3 py-2" open={open || adjustments}>
            <summary className="cursor-pointer text-sm font-medium text-navy-800">Premiums, tips, deductions, accommodation</summary>
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <NumberField id={id('premium')} label="Overtime or shift premium in that pay" value={premium} onChange={touch(setPremium)} unit="£" max={100000} decimals={2} help="Only the part above your basic rate" />
              <NumberField id={id('tips')} label="Tips or service charge in that pay" value={tips} onChange={touch(setTips)} unit="£" max={100000} decimals={2} />
              <NumberField id={id('uniform')} label="Uniform, tools or work costs you paid" value={uniform} onChange={touch(setUniform)} unit="£" max={100000} decimals={2} help="Deducted or paid to the employer" />
              <NumberField id={id('sacrifice')} label="Salary sacrifice in the period" value={sacrifice} onChange={touch(setSacrifice)} unit="£" max={100000} decimals={2} />
              <SelectField id={id('accom')} label="Accommodation from the employer" value={String(accom)} onChange={touch((x: string) => { const v = Number(x); setAccom(v); if (v && !nights) setNights(30); })} options={ACCOM} className="sm:col-span-2" />
              {accom > 0 && <NumberField id={id('nights')} label="Nights provided in the period" value={nights} onChange={touch(setNights)} max={31} />}
              {accom === 2 && <NumberField id={id('charge')} label="Charge per night" value={charge} onChange={touch(setCharge)} unit="£" max={500} decimals={2} />}
            </div>
          </details>
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className={`rounded-lg p-4 ${r.ok || under ? 'bg-accent-50' : 'bg-amber-50'}`}>
          <p className="text-sm font-medium text-navy-700">{under ? 'No minimum wage below school leaving age' : r.ok ? 'Paid at least the minimum wage' : 'Underpaid for this period by'}</p>
          <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{under ? '£0' : r.ok ? gbp2(r.hourly) : money(r.shortfall)}</p>
          <p className="text-sm text-navy-700">{under ? 'The 16 to 17 rate applies once you are over compulsory school age.' : r.ok ? `an hour counted, against a minimum of ${gbp2(r.rate.rate)}` : `${gbp2(r.hourly)} an hour counted, against a minimum of ${gbp2(r.rate.rate)}`}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-accent-200">
            <tr><td className="py-1.5 pr-2 text-navy-700">Rate that applies</td><td className="py-1.5 text-right font-medium">{r.rate.label}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">Rates in force</td><td className="py-1.5 text-right font-medium">{r.rate.period.label}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">Minimum for {formatNumberL(hours, 'en', Number.isInteger(hours) ? 0 : 2)} hours</td><td className="py-1.5 text-right font-medium">{money(r.required)}</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">Pay that counts</td><td className="py-1.5 text-right font-medium">{money(r.nmwPay)}</td></tr>
            {r.exclusions > 0 && <tr><td className="py-1.5 pr-2 text-navy-700">Left out (premiums, tips)</td><td className="py-1.5 text-right font-medium">−{money(r.exclusions)}</td></tr>}
            {r.reductions > 0 && <tr><td className="py-1.5 pr-2 text-navy-700">Taken off (work costs, sacrifice)</td><td className="py-1.5 text-right font-medium">−{money(r.reductions)}</td></tr>}
            {r.accomEffect !== 0 && <tr><td className="py-1.5 pr-2 text-navy-700">Accommodation offset ({gbp2(r.offsetDay)} a day)</td><td className="py-1.5 text-right font-medium">{r.accomEffect > 0 ? '+' : '−'}{money(Math.abs(r.accomEffect))}</td></tr>}
            {future && !under && <tr><td className="py-1.5 pr-2 text-navy-700">Same pay from {dateL(nextDate)}</td><td className="py-1.5 text-right font-medium">{future.ok ? 'still enough' : `${money(future.shortfall)} short (${gbp2(future.rate.rate)} an hour)`}</td></tr>}
          </tbody></table>
          <div className="mt-3 flex flex-wrap items-center gap-3 print:hidden">
            {!r.ok && !under && reportHref && <a href={reportHref} className="inline-flex h-10 items-center rounded-lg bg-accent-700 px-4 text-sm font-medium text-white hover:bg-accent-800">What to do if you are underpaid</a>}
            {methodHref && <a href={methodHref} className="text-sm text-navy-700 underline">How this is worked out</a>}
          </div>
          <p className="mt-2 text-xs text-navy-600">Rule applied: National Minimum Wage Regulations 2015, as HMRC explains them in its guidance on calculating the minimum wage. An estimate from what you enter, not a decision by HMRC or a tribunal.</p>
        </div>
      </div>
    </div>
  );
}
