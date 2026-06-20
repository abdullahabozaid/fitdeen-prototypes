import { useState } from 'react'
import { nutrition } from '../../../mock/data'
import { IconPlus, IconSparkle } from '../icons'
import './nutrition.css'

type Meal = { name: string; time: string; kcal: number; p: number }

// ponytail: estimate macros for a quick-logged item from its kcal so the bars move sensibly.
function quickMeal(name: string): Meal {
  const kcal = 110 + (name.length % 6) * 30
  return { name, time: 'now', kcal, p: Math.round(kcal * 0.18 / 4) }
}

export default function Nutrition({ go }: { go: (t: string) => void }) {
  const [mode, setMode] = useState<'remaining' | 'eaten'>('remaining')
  const [seg, setSeg] = useState<'today' | 'plans' | 'basket'>('today')
  const [added, setAdded] = useState<Meal[]>([])

  const meals: Meal[] = [...nutrition.meals, ...added]
  const kcal = meals.reduce((s, m) => s + m.kcal, 0)
  const protein = nutrition.protein + added.reduce((s, m) => s + m.p, 0)
  const remaining = Math.max(0, nutrition.kcalGoal - kcal)
  const heroNum = mode === 'remaining' ? remaining : kcal

  const macros = [
    { name: 'Protein', val: protein, goal: nutrition.proteinGoal },
    { name: 'Carbs', val: nutrition.carbs, goal: nutrition.carbsGoal },
    { name: 'Fat', val: nutrition.fat, goal: nutrition.fatGoal },
  ]

  // ring geometry
  const R = 42, C = 2 * Math.PI * R
  const eatenPct = Math.min(1, kcal / nutrition.kcalGoal)

  const log = (name: string) => setAdded((a) => [...a, quickMeal(name)])

  return (
    <div className="pad">
      <div className="nut-head">
        <div className="nut-title">Nutrition</div>
        <div className="nut-toggle">
          <button className={mode === 'remaining' ? 'on' : ''} onClick={() => setMode('remaining')}>Remaining</button>
          <button className={mode === 'eaten' ? 'on' : ''} onClick={() => setMode('eaten')}>Eaten</button>
        </div>
      </div>

      <div className="nut-seg">
        <button className={seg === 'today' ? 'on' : ''} onClick={() => setSeg('today')}>Today</button>
        <button className={seg === 'plans' ? 'on' : ''} onClick={() => setSeg('plans')}>Plans</button>
        <button className={seg === 'basket' ? 'on' : ''} onClick={() => setSeg('basket')}>Basket</button>
      </div>

      {seg === 'today' ? (
        <>
          <div className="nut-hero">
            <div className="nut-ring">
              <svg width="96" height="96">
                <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
                <circle cx="48" cy="48" r={R} fill="none" stroke="var(--emerald)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - eatenPct)} />
              </svg>
              <div className="nut-pct">{Math.round(eatenPct * 100)}%</div>
            </div>
            <div>
              <div className="nut-num">{heroNum.toLocaleString()}</div>
              <div className="nut-numlabel">kcal {mode === 'remaining' ? 'left' : 'eaten'}</div>
              <div className="nut-numsub">of <b>{nutrition.kcalGoal.toLocaleString()}</b> goal</div>
            </div>
          </div>

          <div className="nut-macros">
            {macros.map((m) => (
              <div className="nut-macro" key={m.name}>
                <span className="nut-mname">{m.name}</span>
                <div className="nut-bar"><i style={{ width: Math.min(100, Math.round((m.val / m.goal) * 100)) + '%' }} /></div>
                <span className="nut-mval"><b>{m.val}</b> / {m.goal} g</span>
              </div>
            ))}
          </div>

          <div className="nut-sec">Today's meals</div>
          {meals.map((m, i) => (
            <div className="nut-meal" key={i}>
              <span className="nut-mtime">{m.time}</span>
              <span className="nut-mtitle">{m.name}</span>
              <span className="nut-mmeta"><b>{m.kcal}</b> kcal · {m.p}p</span>
            </div>
          ))}

          <div className="nut-sec">Quick log</div>
          <div className="nut-chips">
            {nutrition.recents.map((r) => (
              <button className="nut-chip" key={r} onClick={() => log(r)}>
                <IconPlus size={14} />{r}
              </button>
            ))}
          </div>

          <div className="nut-add">
            <button className="nut-addmain" onClick={() => log('Logged meal')}>
              <IconPlus /> Add meal
            </button>
            <button className="nut-ai" onClick={() => go('coach')} aria-label="Ask AI">
              <IconSparkle size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="ph">
          <h2>{seg === 'plans' ? 'Meal plans' : 'Smart basket'}</h2>
          <p>{seg === 'plans' ? 'Saved plans land here. Build one from Today.' : 'Halal budget groceries. Coming to this build.'}</p>
        </div>
      )}
    </div>
  )
}
