import { useState } from 'react'
import { nutrition } from '../../../mock/data'
import { IconPlus, IconSparkle } from '../../a/icons'
import './nutrition.css'

type Meal = { name: string; time: string; kcal: number; p: number }

// ponytail: estimate macros for a quick-logged item from its kcal so the bars move sensibly.
function quickMeal(name: string): Meal {
  const kcal = 110 + (name.length % 6) * 30
  return { name, time: 'now', kcal, p: Math.round((kcal * 0.18) / 4) }
}

export default function Nutrition({ go }: { go: (t: string) => void }) {
  const [mode, setMode] = useState<'remaining' | 'eaten'>('remaining')
  const [added, setAdded] = useState<Meal[]>([])

  const meals: Meal[] = [...nutrition.meals, ...added]
  const kcal = meals.reduce((s, m) => s + m.kcal, 0)
  const protein = nutrition.protein + added.reduce((s, m) => s + m.p, 0)
  const remaining = Math.max(0, nutrition.kcalGoal - kcal)
  const heroNum = mode === 'remaining' ? remaining : kcal
  const eatenPct = Math.min(100, Math.round((kcal / nutrition.kcalGoal) * 100))

  const macros = [
    { name: 'Protein', val: protein, goal: nutrition.proteinGoal },
    { name: 'Carbs', val: nutrition.carbs, goal: nutrition.carbsGoal },
    { name: 'Fat', val: nutrition.fat, goal: nutrition.fatGoal },
  ]

  const log = (name: string) => setAdded((a) => [...a, quickMeal(name)])

  return (
    <div className="pad">
      {/* full-bleed emerald cover: the remaining-calorie hero lives here, BIG */}
      <div className="cover nutc-cover">
        <div className="ctop">
          <div className="ce">Today · {meals.length} meals</div>
          <div className="nutc-modeswitch">
            <button className={'mono ' + (mode === 'remaining' ? 'on' : '')} onClick={() => setMode('remaining')}>LEFT</button>
            <button className={'mono ' + (mode === 'eaten' ? 'on' : '')} onClick={() => setMode('eaten')}>EATEN</button>
          </div>
        </div>

        <div className="ce clabel">Calories {mode === 'remaining' ? 'remaining' : 'eaten'}</div>
        <div className="nutc-hero mono">{heroNum.toLocaleString()}</div>
        <div className="nutc-herometa">
          <span className="mono">{eatenPct}%</span> of <b className="mono">{nutrition.kcalGoal.toLocaleString()}</b> kcal goal
        </div>
        <div className="nutc-track"><i style={{ width: eatenPct + '%' }} /></div>
      </div>

      {/* single-emerald macros, big numerals */}
      <div className="nutc-macros">
        {macros.map((m) => {
          const pct = Math.min(100, Math.round((m.val / m.goal) * 100))
          return (
            <div className="nutc-macro" key={m.name}>
              <div className="nutc-mval mono">{m.val}<small>/{m.goal}g</small></div>
              <div className="nutc-mname">{m.name}</div>
              <div className="nutc-mbar"><i style={{ width: pct + '%' }} /></div>
            </div>
          )
        })}
      </div>

      <div className="secpad">
        <div className="nutc-sec">Today's meals</div>
        <div className="nutc-meals">
          {meals.map((m, i) => (
            <div className="nutc-meal" key={i}>
              <span className="nutc-mtime mono">{m.time}</span>
              <span className="nutc-mtitle">{m.name}</span>
              <span className="nutc-mmeta mono">{m.kcal} kcal · {m.p}p</span>
            </div>
          ))}
        </div>

        <div className="nutc-sec">Quick log</div>
        <div className="nutc-chips">
          {nutrition.recents.map((r) => (
            <button className="nutc-chip" key={r} onClick={() => log(r)}>
              <IconPlus size={13} />{r}
            </button>
          ))}
        </div>

        <div className="nutc-add">
          <button className="nutc-addmain" onClick={() => log('Logged meal')}>
            <IconPlus /> Add a meal
          </button>
          <button className="nutc-ai" onClick={() => go('coach')} aria-label="Ask AI">
            <IconSparkle size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
