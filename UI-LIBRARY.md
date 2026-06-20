# FitDeen — UI Reference Library (mix-and-match menu)

Curated from the 18-agent research (full detail: `fitdeen-mobile/docs/superpowers/specs/2026-06-20-research-dossiers.md`
+ `…-research-synthesis.md`). This is the **mix-and-match menu**: pick the best pattern per area and
adapt it into Design A / B / C. Each item says *who does it best* and *how to adapt for FitDeen*.

---

## Part 1 — By feature area (the menu)

### Onboarding
- **Value-before-ask** (Strava, Cal AI, Runna): 2-3 full-bleed aspirational screens before any form. → FitDeen: open on the "why" (halal, prayer-aware, premium training).
- **One multi-select goal grid as the spine** (Strava "what sports?"): one screen reconfigures the whole app. → FitDeen: Build muscle / Lose fat / Stay consistent / Ramadan-ready.
- **Decoupled, morally-framed permissions** (Strava): a branded "why" screen before each OS prompt. → "Allow location so prayer times are accurate."
- **Mirror-back payoff** (Cal AI, Runna): end on a personalized plan card ("2,150 kcal / 165g protein / Fajr-aware"). Earns the value.
- **Keep it SHORT** (4-screen rule camp): Cal AI runs 28 screens for sunk-cost; FitDeen's enemy is "overwhelming", so ~8-10 max with a progress bar.

### Home / Today
- **A true "Today", not a dashboard** (Oura "one big thing", Gentler "For You"): time-aware module stack, one hero action. → the single biggest fix for "overwhelming".
- **One hero number/element** (Whoop recovery, Oura readiness, Apple rings): collapses complexity into one glanceable thing.
- **Elevated single center action** (Strava record tab): the daily habit is always one obvious tap.
- **Quiet glanceable rows** for everything secondary (prayer, hadith, intake) — tap to expand.

### Workout logging (Train)
- **One-tap set logging** (Hevy): a round check = log + green-fill + haptic + auto rest-timer. The most-loved ease feature in the whole corpus.
- **Previous-set memory** (Hevy, Strong): a faint "last: 60kg × 8" per row; daily job is *confirm*, not author.
- **Auto-built session** (Fitbod): reduce decisions — open with today's workout pre-loaded.
- **Composed finish artifact** (Hevy, Strava): a styled summary card (duration, volume, PRs, muscle heatmap) = a reward + a share moment.
- **Live + stats on one screen** (Strava 2025): no MAP/DATA toggle; rest-timer + set numbers on one calm surface.

### Nutrition logging
- **Logging "right where you need it"** (MyFitnessPal 2024-25 redesign, ~40% faster): all input methods in one row at the top (Scan / Voice / Search).
- **Oversized "+" FAB** (Cal AI): the add action *is* the product; snap-to-log feels effortless.
- **De-rainbowed macros** (MacroFactor): single-accent bars, clean info design — not three-color macro bars.
- **Remaining-calories hero** (MFP): one big number answers "what's left?".
- **Recents quick-relog strip**: one tap to log a frequent food.

### Coach / AI
- **Plain-language insight over data dump** (Oura, Whoop's #1 criticism was jargon): one warm sentence beats a chart.
- **Woven-in, not siloed** (corpus): "Ask about this meal" on food cards, a one-line post-workout insight.
- **Seeded prompts + chips**: lower the blank-page cost.

### Profile / achievements / social
- **Collectible achievements** (done tastefully): emerald + girih engraving, NOT gold/silver/bronze medals (FitDeen anti-ref).
- **Slow-horizon trend graphs** (Oura): calm long-range trends over busy daily charts.
- **Single-tap positive reaction** (Strava kudos): a "MashaAllah" tap on streaks/PRs = the social loop without a heavy feed.

### Navigation / IA
- **5 tabs, refuse a 6th / a "Menu" junk drawer** (Muslim Pro's overflow tab = the overwhelm trap).
- **Active workout = a mode, not a place**: a persistent "Workout in progress 12:34" mini-banner.
- **Push deep config into Profile** so the tabs stay calm.

### Premium feel (material, not decoration)
- **Elevated tinted surfaces, never flat black** (Whoop, Oura, Pillars): depth from luminance, not shadows. *(FitDeen: emerald-tinted ladder + the rub el hizb star texture instead of generic grain.)*
- **One hero number, oversized, mono** (Strava, Whoop, MFP).
- **Restrained single accent** (Strava orange, Apple): the accent carries meaning, used sparingly.
- **Editorial photography / type as voice** (Strava Boathouse + Inter): two-typeface intent. *(FitDeen: Outfit + Amiri + DM Sans + JetBrains Mono.)*

### Motion
- **Tier by frequency** (Emil-grade): instant for 100×/day actions, standard for sheets, 3-4 *earned* moment-animations only. Over-animation = the cheap/overwhelm feeling.
- **Bounce ≈ 0 for informational motion**; springs only for things you touch.

### Islamic layer (premium, not kitsch)
- **Restraint = premium** (Pillars, the benchmark): one crescent + the sky, no mosque clipart / gold filigree.
- **Time-of-day ambient theming** (Pillars, Athan): the background tracks the sun. The tasteful "alive" nod.
- **Authentic Arabic type** (every Islamic app): system-font Arabic instantly reads cheap. Amiri/Uthmanic, reverent whitespace.
- **Fiqh-awareness signals care**: menstruation/rest pause, Ramadan fasting status, never guilt/streak-shaming.
- **Never paywall** prayer times, hadith, or basic logging.

---

## Part 2 — App scorecard (who to study for what)

| App | Study it for | One thing to steal |
|---|---|---|
| **MyFitnessPal** | nutrition logging speed | input-methods row at top → ~40% faster logging |
| **Strava** | onboarding, social loop, record core loop | value-before-ask onboarding; kudos reaction |
| **Hevy** | workout logging | one-tap set check (log+fill+haptic+rest-timer) + previous column |
| **Whoop** | dark data-dense luxury | one hero recovery score; (avoid its jargon) |
| **Oura** | calm premium, reducing complexity | single "readiness" number; slow trend graphs |
| **Apple Fitness** | clarity device, clean-with-life | rings as a glance; how little it asks |
| **Cal AI** | effortless logging + onboarding | oversized "+" FAB; mirror-back paywall/plan |
| **MacroFactor** | clean info design for power users | de-rainbowed, consistent type/icons |
| **Runna** | guided plan onboarding, "Today" | "Not feeling 100%?" off-ramp tray |
| **Fitbod** | reduce decisions | auto-built session; recovery heatmap |
| **Gentler Streak** | calm, guilt-free | rest/sick statuses; warm tone |
| **Pillars** | premium Islamic design | restraint + time-of-day theming (the benchmark) |
| **Muslim Pro** | what NOT to do | overflow "Menu" tab + ad clutter = overwhelm trap |

---

_Use this to brief Design B (energetic/data-rich) and Design C (bold/expressive): each can lean on
different rows above. The mockups live in `src/designs/`._
