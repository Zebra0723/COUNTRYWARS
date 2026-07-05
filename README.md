# 🎾 Deuce

**A personal ATP / WTA tour tracker with a live ranking projection lab.**

Following the top 100 is chaotic: multiple tournaments a week, matches in every
timezone, and you can never tell what a given result *actually means* for the
rankings. Deuce answers the one question every tennis fan asks during a big
event — **"if my player wins this, where do they end up?"**

It doesn't predict winners. It shows what's genuinely at stake.

## What it does

- **Follow the field.** Star any player from the ATP or WTA top of the rankings.
  Follows are saved in your browser.
- **The Ranking Lab.** For each followed player, tap through every still-possible
  outcome at the live tournament and watch their **projected ranking** move in
  real time — including **career-high** alerts.
- **Fragility ("House of cards").** A ranking is a rolling 52-week points sum, so
  players *defend* the points they earned here last year. Deuce flags who is
  most exposed — a former champion defending 2000 points who loses early can
  crater from #11 to #24.

### How projections work

```
projected points = current points
                 − points defended (last year at this event, dropping off)
                 + points earned    (this year's result at this event)
```

The projected total is then re-ranked against the rest of the field held at
their current points — the same simplification every live-ranking tracker uses
mid-event.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy to Vercel

This is a stock Next.js (App Router) app — zero config needed.

1. Push this repo to GitHub.
2. In Vercel, **New Project → import the repo → Deploy.** Framework preset
   "Next.js" is detected automatically.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Wiring a live data feed

All tour data lives in [`lib/data.js`](lib/data.js) and is shaped exactly like a
live feed would be. To go live, replace the seeded `PLAYERS` and `TOURNAMENT`
values with data from an ATP/WTA source (official rankings, a live-scores API,
or your own scraper), keeping the same fields:

| field       | meaning                                              |
| ----------- | ---------------------------------------------------- |
| `rank`      | current live ranking                                 |
| `points`    | current total ranking points                         |
| `defending` | points earned at *this* event last year              |
| `reached`   | round reached in this year's draw (`"OUT"` if lost)  |
| `careerHigh`| best ranking ever                                    |

The projection engine in [`lib/ranking.js`](lib/ranking.js) needs no changes.

## Project structure

```
app/
  layout.jsx        root layout + metadata
  page.jsx          main screen: field list + Ranking Lab
  globals.css       styling (grass-court theme)
components/
  PlayerRow.jsx     a follow-able player row
  RankingLab.jsx    interactive projection card
lib/
  data.js           tour + tournament data (swap for a live feed)
  ranking.js        projection & fragility engine
```

## Notes

The bundled numbers are **illustrative** — a self-contained snapshot around a
Grand Slam so the app is fully functional on first run. Swap in real data as
described above.
