# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. The page is built at `/en/<en.slug>/`; menus,
footer, home lists, llms.txt and sitemap follow by themselves. English only (en-GB). The list of planned
ids is `PLANNED` in `src/lib/helpers.ts`: a link to a planned page not yet written renders as plain text.

## Fields

- `group`: `rates`, `ages`, `pay` or `rules`; `order`: position in its group.
- `tool`: the main tool, right under the H1 (first screen):
  - `{ kind: 'check', props?: { age, appr (0 no, 1 first year, 2 after), hours, gross, uniform, tips, premium, sacrifice, accom (0 none, 1 free, 2 charged), open } }`
  - `{ kind: 'mini:<spec>', props?: {...} }`, specs in `src/lib/mini-specs.ts` (`MINI_KINDS`), always computed
    by `src/lib/engine/wage.ts`. Numeric props override input defaults (`age`, `h`, `appr`, `yr` = index in
    `PERIODS`: 0 = 2019 … 7 = 2026, 8 = 2027).
- `mini`: a second tool under the citable block. In a body, `<!--tool:mini:convert-->` or
  `<!--tool:mini:convert|{"age":19,"h":20}-->` places a tool between paragraphs.
- `related`: 3–5 page ids. `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on complaint pages: adds the "independent site, not HMRC" line under the H1.

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50–60 characters, key term first, never "How…", "What…", "UK…", a nation or London first.
- `description` 150–160 characters.
- `resume(h)`: ONE paragraph (no tags but links) of at least 120 words answering the page's query with figures.
- `faqs(h)`: 3–5 questions unique across the site, each answer 42–88 words, plain text.
- `body(h)`: HTML with at least three `<h2>` sections; resume + body at least 650 words. No `<h1>`.
- No em dash; British spelling; dates in words; coming changes written as coming, with their date.
- Pages must read differently (check-unique): no shared boilerplate paragraph.
- Links only to primary sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a union, a law
  firm, a payroll vendor or a forum; never mention a search engine or another site.

## Figures

Never type a rate, an offset or a threshold: read them through `h` (`src/lib/helpers.ts`):
`h.rate(year, age, 'first' | 'after')`, `h.C` / `h.N` (periods from April 2026 / April 2027: `bands[i].rate`,
`apprentice`, `offsetDay`), `h.Y(year)`, `h.bandRows(period)`, `h.rise(fromYear, toYear, age)`, `h.A`
(announcement of the 2027 rates), `h.E` (enforcement), `h.YNG` (young workers), `h.RLW`, `h.TAX`, `h.conv(rate, hours)`,
`h.pay({...})`, `h.net(annual, '2026' | '2027', scotland)`, `h.empNi`, `h.arrears`, `h.penalty`, `h.piece`,
`h.gbp`, `h.gbp2` (always pence), `h.pc`, `h.num`, `h.date(iso)`, `h.table(headers, rows, caption, align)`.
Example amounts (`h.gbp(400)`) are fine. A fact that is not in a primary text is not written.

## Data

- `src/data/params-2026.json`: every rate period since April 2019, offsets, the 2027 announcement, enforcement,
  tax and National Insurance, sources (url and label). Each value read by hand on the source named, on
  `retrieved_at`. When the April 2027 regulations are made, add their key to `sources` and set `law` of the
  2027 period to it.
- Engine and tests: `src/lib/engine/wage.ts`, `tests/engine.test.ts` (HMRC and GOV.UK worked examples).
