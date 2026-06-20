import { useState } from 'react'
import { nutrition } from '../../../mock/data'
import { IconPlus, IconSparkle } from '../../a/icons'
import './nutrition.css'

type Meal = { name: string; time: string; kcal: number; p: number }

// ponytail: estimate macros for a quick-logged item from its name length so totals move sensibly.
function quickMeal(name: string): Meal {
  const kcal = 110 + (name.length % 6) * 30
  return { name, time: 'now', kcal, p: Math.round((kcal * 0.18) / 4) }
}

export default function Nutrition({ go }: { go: (t: string) => void }) {
  const [added, setAdded] = useState<Meal[]>([])

  const meals: Meal[] = [...nutrition.meals, ...added]
  const kcal = meals.reduce((s, m) => s + m.kcal, 0)
  const protein = nutrition.protein + added.reduce((s, m) => s + m.p, 0)
  const remaining = Math.max(0, nutrition.kcalGoal - kcal)
  const eatenPct = Math.min(1, kcal / nutrition.kcalGoal)

  const macros = [
    { name: 'Protein', val: protein, goal: nutrition.proteinGoal, unit: 'g' },
    { name: 'Carbs', val: nutrition.carbs, goal: nutrition.carbsGoal, unit: 'g' },
    { name: 'Fat', val: nutrition.fat, goal: nutrition.fatGoal, unit: 'g' },
  ]

  // ring geometry
  const R = 48
  const C = 2 * Math.PI * R

  const log = (name: string) => setAdded((a) => [...a, quickMeal(name)])

  return (
    <div className="pad">
      <div className="top">
        <div className="greet">
          <small>Saturday · 20 June</small>Nutrition
        </div>
        <button className="hbtn" onClick={() => go('coach')} aria-label="Ask coach">
          <IconSparkle size={20} />
        </button>
      </div>

      {/* calorie ring hero */}
      <div className="score nutb-hero">
        <div className="score-row">
          <div className="ring-wrap">
            <svg width="108" height="108" viewBox="0 0 108 108">
              <circle cx="54" cy="54" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
              <circle
                cx="54"
                cy="54"
                r={R}
                fill="none"
                stroke="url(#nutbGrad)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - eatenPct)}
                transform="rotate(-90 54 54)"
              />
              <defs>
                <linearGradient id="nutbGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#34d399" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-num">
              <b>{remaining.toLocaleString()}</b>
              <span>KCAL LEFT</span>
            </div>
          </div>
          <div className="score-side">
            <div className="ssline">
              <span className="k">Eaten</span>
              <span className="v mono">{kcal.toLocaleString()}</span>
            </div>
            <div className="ssline">
              <span className="k">Goal</span>
              <span className="v off mono">{nutrition.kcalGoal.toLocaleString()}</span>
            </div>
            <div className="ssline">
              <span className="k">Logged</span>
              <span className="v mono">{Math.round(eatenPct * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* macro tiles — single emerald, fill bars */}
      <div className="tiles nutb-macros">
        {macros.map((m) => {
          const pct = Math.min(100, Math.round((m.val / m.goal) * 100))
          return (
            <div className="tile nutb-mtile" key={m.name}>
              <div className="nutb-mtop">
                <span className="nutb-mname">{m.name}</span>
                <span className="nutb-mpct mono">{pct}%</span>
              </div>
              <div className="tn nutb-mval">
                {m.val}
                <span className="tu">/{m.goal}{m.unit}</span>
              </div>
              <div className="nutb-mbar">
                <i style={{ width: pct + '%' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* today meals */}
      <div className="nutb-sec">
        <span className="eyebrow">Today · {meals.length} meals</span>
      </div>
      <div className="nutb-meals">
        {meals.map((m, i) => (
          <div className="nutb-meal" key={i}>
            <span className="nutb-time mono">{m.time}</span>
            <span className="nutb-title">{m.name}</span>
            <span className="nutb-meta mono">
              {m.kcal}<i>kcal</i> · {m.p}<i>p</i>
            </span>
          </div>
        ))}
      </div>

      {/* quick-log recents chips */}
      <div className="nutb-sec">
        <span className="eyebrow">Quick log</span>
      </div>
      <div className="nutb-chips">
        {nutrition.recents.map((r) => (
          <button className="nutb-chip" key={r} onClick={() => log(r)}>
            <IconPlus size={13} />
            {r}
          </button>
        ))}
      </div>

      {/* single emerald primary action */}
      <button className="nutb-add" onClick={() => log('Logged meal')}>
        <IconPlus /> Add meal
      </button>
    </div>
  )
}
