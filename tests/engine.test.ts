/** Engine checked against the worked examples of HMRC and GOV.UK, and against the rates tables. */
import { describe, expect, it } from 'vitest';
import { rateFor, payCheck, arrears, penalty, fairPieceRate, convert, ageOn, birthdayAt, firstPeriodOnOrAfter, schoolLeaving, netPay, employerNi, periodAt, ageSteps, firstYearEnds, salariedHourly } from '../src/lib/engine/wage';

describe('rates by date, age and apprenticeship', () => {
  it('April 2026 rates (SI 2026/357)', () => {
    expect(rateFor({ date: '2026-10-29', age: 30 }).rate).toBe(12.71);
    expect(rateFor({ date: '2026-10-29', age: 21 }).rate).toBe(12.71);
    expect(rateFor({ date: '2026-10-29', age: 20 }).rate).toBe(10.85);
    expect(rateFor({ date: '2026-10-29', age: 18 }).rate).toBe(10.85);
    expect(rateFor({ date: '2026-10-29', age: 17 }).rate).toBe(8);
    expect(rateFor({ date: '2026-10-29', age: 15 }).rate).toBe(0);
  });
  it('April 2027 rates announced on 28 October 2026', () => {
    expect(rateFor({ date: '2027-04-01', age: 21 }).rate).toBe(13.21);
    expect(rateFor({ date: '2027-04-01', age: 19 }).rate).toBe(11.27);
    expect(rateFor({ date: '2027-04-01', age: 16 }).rate).toBe(8.31);
    expect(rateFor({ date: '2027-04-01', age: 30, apprentice: true, firstYear: true }).rate).toBe(8.31);
    expect(periodAt('2027-03-31').from).toBe('2026-04-01');
  });
  it('apprentice rate: under 19, or 19 and over in the first year (GOV.UK examples)', () => {
    expect(rateFor({ date: '2026-10-29', age: 21, apprentice: true, firstYear: true }).rate).toBe(8);
    expect(rateFor({ date: '2026-10-29', age: 21, apprentice: true, firstYear: false }).rate).toBe(12.71);
    expect(rateFor({ date: '2026-10-29', age: 18, apprentice: true, firstYear: false }).rate).toBe(8);
    expect(rateFor({ date: '2026-10-29', age: 19, apprentice: true, firstYear: false }).rate).toBe(10.85);
  });
  it('old age bands: 23 and over from 2021, 25 and over before', () => {
    expect(rateFor({ date: '2023-06-01', age: 22 }).rate).toBe(10.18);
    expect(rateFor({ date: '2023-06-01', age: 23 }).rate).toBe(10.42);
    expect(rateFor({ date: '2020-06-01', age: 24 }).rate).toBe(8.2);
    expect(rateFor({ date: '2020-06-01', age: 25 }).rate).toBe(8.72);
    expect(rateFor({ date: '2024-06-01', age: 21 }).kind).toBe('nlw');
  });
});

describe('pay check (HMRC and GOV.UK worked examples)', () => {
  it('free accommodation adds the offset: John, 24, £10.60 for 30 hours with 7 nights (2026 offset)', () => {
    const r = payCheck({ date: '2026-05-01', age: 24, hours: 30, gross: 318, accomDays: 7, accomCharge: 0 });
    expect(r.accomEffect).toBe(77.7);
    expect(r.hourly).toBe(13.19);
    expect(r.ok).toBe(true);
  });
  it('a charge above the offset reduces pay by the excess: Sam, 35, £12.90 × 120 hours, £12.50 a day for 21 days', () => {
    const r = payCheck({ date: '2026-05-01', age: 35, hours: 120, gross: 1548, accomDays: 21, accomCharge: 12.5 });
    expect(r.nmwPay).toBe(1518.6);
    expect(r.hourly).toBe(12.65);
    expect(r.ok).toBe(false);
    expect(r.shortfall).toBe(6.6);
  });
  it('a charge at or under the offset has no effect', () => {
    const r = payCheck({ date: '2026-05-01', age: 35, hours: 40, gross: 520, accomDays: 7, accomCharge: 11 });
    expect(r.accomEffect).toBe(0);
  });
  it('shift premium excluded: £252 with £9 premium for 20 hours = £12.15 an hour (2025 example)', () => {
    const r = payCheck({ date: '2025-06-01', age: 30, hours: 20, gross: 252, premium: 9 });
    expect(r.hourly).toBe(12.15);
    expect(r.ok).toBe(false);
  });
  it('overtime premium excluded: £493 with £9 premium for 40 hours = £12.10 an hour', () => {
    expect(payCheck({ date: '2025-06-01', age: 30, hours: 40, gross: 493, premium: 9 }).hourly).toBe(12.1);
  });
  it('uniform deduction reduces pay: £505 for 40 hours less £10 for a uniform', () => {
    const r = payCheck({ date: '2026-06-01', age: 30, hours: 40, gross: 515, deductions: 10 });
    expect(r.nmwPay).toBe(505);
    expect(r.hourly).toBe(12.62);
    expect(r.ok).toBe(false);
    expect(r.shortfall).toBe(3.4);
  });
  it('tips and salary sacrifice', () => {
    const r = payCheck({ date: '2026-06-01', age: 22, hours: 30, gross: 420, tips: 30, sacrifice: 20 });
    expect(r.nmwPay).toBe(370);
    expect(r.required).toBe(381.3);
  });
});

describe('arrears and penalties (HMRC, Enforcing the minimum wage)', () => {
  it('£80.40 underpaid at £11.44, repaid when the rate is £12.21 = £85.81', () => expect(arrears(80.4, 11.44, 12.21)).toBe(85.81));
  it('never less than the underpayment', () => expect(arrears(50, 12.71, 12.21)).toBe(50));
  it('penalty 200% capped at £20,000 a worker, halved within 14 days', () => {
    expect(penalty(1000).full).toBe(2000);
    expect(penalty(1000).early).toBe(1000);
    expect(penalty(15000).per).toBe(20000);
    expect(penalty(500, 3).full).toBe(3000);
  });
});

describe('other rules', () => {
  it('fair piece rate: 10 items an hour, £12.21 → £1.47 (HMRC example)', () => expect(fairPieceRate(12.21, 10)).toBe(1.47));
  it('fair piece rate: 10 items an hour, £10 → £1.20', () => expect(fairPieceRate(10, 10)).toBe(1.2));
  it('conversions: £12.71 × 37.5 hours', () => {
    const c = convert(12.71, 37.5);
    expect(c.weekly).toBe(476.63);
    expect(c.annual).toBe(24784.5);
    expect(c.monthly).toBe(2065.38);
  });
  it('salaried hours', () => expect(salariedHourly(24000, 1950)).toBe(12.3));
});

describe('dates', () => {
  it('age and birthdays', () => {
    expect(ageOn('2008-11-15', '2026-11-14')).toBe(17);
    expect(ageOn('2008-11-15', '2026-11-15')).toBe(18);
    expect(birthdayAt('2008-02-29', 18)).toBe('2026-03-01');
  });
  it('new rate from the first pay period starting on or after the birthday', () => {
    expect(firstPeriodOnOrAfter('2026-11-15', '2026-10-05', 'weekly')).toBe('2026-11-16');
    expect(firstPeriodOnOrAfter('2026-11-16', '2026-10-05', 'weekly')).toBe('2026-11-16');
    expect(firstPeriodOnOrAfter('2026-11-15', '2026-10-01', 'monthly')).toBe('2026-12-01');
    expect(firstPeriodOnOrAfter('2026-11-01', '2026-10-01', 'monthly')).toBe('2026-11-01');
  });
  it('rate steps at 18 and 21', () => {
    const s = ageSteps('2008-11-15', '2026-10-29');
    expect(s[0]).toMatchObject({ age: 18, date: '2026-11-15', rate: 10.85 });
    expect(s[1]).toMatchObject({ age: 21, date: '2029-11-15', rate: 13.21 });
  });
  it('first year of an apprenticeship', () => expect(firstYearEnds('2026-09-01')).toBe('2027-08-31'));
  it('school leaving dates (GOV.UK, School leaving age)', () => {
    expect(schoolLeaving('2011-05-10', 'england')).toEqual({ date: '2027-06-25', after: false, year: 2027 });
    expect(schoolLeaving('2011-08-31', 'england').date).toBe('2027-06-25');
    expect(schoolLeaving('2011-09-01', 'england').date).toBe('2028-06-30');
    expect(schoolLeaving('2011-04-10', 'scotland')).toEqual({ date: '2027-05-31', after: true, year: 2027 });
    expect(schoolLeaving('2011-11-10', 'scotland').date).toBeNull();
    expect(schoolLeaving('2011-07-20', 'ni').date).toBe('2028-06-30');
    expect(schoolLeaving('2011-03-20', 'ni').date).toBe('2027-06-30');
  });
});

describe('tax and National Insurance 2026 to 2027 (HMRC rates and thresholds)', () => {
  it('full-time National Living Wage', () => {
    const r = netPay(24784.5);
    expect(r.tax).toBe(2442.9);
    expect(r.ni).toBe(977.16);
  });
  it('Scotland bands', () => {
    const r = netPay(24784.5, '2026', true);
    expect(r.tax).toBe(Math.round((3967 * 0.19 + (12214.5 - 3967) * 0.2) * 100) / 100);
  });
  it('employer National Insurance, with the under 21 relief', () => {
    expect(employerNi(24784.5)).toBe(2967.68);
    expect(employerNi(20000, '2026', true)).toBe(0);
  });
});
