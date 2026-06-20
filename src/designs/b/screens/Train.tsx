import { useState } from 'react'
import { todaySession, muscleColors, hadith } from '../../../mock/data'
import { IconCheck, IconChevron } from '../../a/icons'
import './train.css'

// per-exercise set completion: exercise index -> array of completed flags
type SetState = Record<number, boolean[]>

const R = 46
const C = 2 * Math.PI * R

export default function Train({ go }: { go: (t: string) => void }) {
  const [view, setView] = useState<'active' | 'rest'>('active')
  const [open, setOpen] = useState<number | null>(0)
  const [sets, setSets] = useState<SetState>(() =>
    Object.fromEntries(todaySession.exercises.map((ex, i) => [i, ex.sets.map(() => false)]))
  )

  const exDone = (i: number) => sets[i] && sets[i].every(Boolean)
  const total = todaySession.exercises.length
  const doneCount = todaySession.exercises.filter((_, i) => exDone(i)).length

  // total sets logged + working volume from logged sets
  const setsTotal = todaySession.exercises.reduce((n, ex) => n + ex.sets.length, 0)
  const setsDone = todaySession.exercises.reduce(
    (n, ex, i) => n + ex.sets.filter((_, si) => sets[i][si]).length, 0)
  const volume = todaySession.exercises.reduce(
    (v, ex, i) => v + ex.sets.reduce((s, st, si) => s + (sets[i][si] ? st.kg * st.reps : 0), 0), 0)

  const pct = Math.round((doneCount / total) * 100)

  const toggleSet = (ei: number, si: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map((v, k) => (k === si ? !v : v)) }))

  // round quick-complete: fill all sets, or clear them if already done
  const toggleExercise = (ei: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map(() => !exDone(ei)) }))

  return (
    <div className="pad">
      <div className="top">
        <div className="greet"><small>Push day · {todaySession.minutes} min</small>{todaySession.title}</div>
        <button className="hbtn" onClick={() => go('home')} aria-label="back"><IconChevron size={18} /></button>
      </div>

      <div className="trn-vtoggle">
        <button className={view === 'active' ? 'on' : ''} onClick={() => setView('active')}>Active day</button>
        <button className={view === 'rest' ? 'on' : ''} onClick={() => setView('rest')}>Rest day</button>
      </div>

      {view === 'rest' ? (
        <div className="trn-rest">
          <div className="trn-rest-glyph">۞</div>
          <div className="eyebrow trn-rest-eye">Recovery</div>
          <h2 className="trn-rest-h">Rest day.</h2>
          <p className="trn-rest-lead">No session today. Muscle is built between the lifts. Let it. Sleep well, hydrate, walk.</p>

          <div className="trn-rest-next">
            <span className="eyebrow">Next session</span>
            <div className="trn-rest-nrow">
              <span className="trn-rest-ntitle">{todaySession.title}</span>
              <span className="trn-rest-nmeta mono">{todaySession.exerciseCount} ex · {todaySession.minutes} min</span>
            </div>
          </div>

          <div className="trn-rest-hadith">
            <div className="en">{hadith.en}</div>
            <div className="cite mono">{hadith.cite} · rest is honoured, never owed back</div>
          </div>
        </div>
      ) : (<>
      {/* ring hero: session completion + live data tiles */}
      <div className="score trn-hero">
        <div className="score-row">
          <div className="ring-wrap">
            <svg width="108" height="108" viewBox="0 0 108 108">
              <circle cx="54" cy="54" r={R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
              <circle cx="54" cy="54" r={R} fill="none" stroke="url(#trnring)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 54 54)"
                style={{ transition: 'stroke-dashoffset .45s ease' }} />
              <defs><linearGradient id="trnring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34d399" /><stop offset="1" stopColor="#10b981" /></linearGradient></defs>
            </svg>
            <div className="ring-num"><b>{doneCount}<span className="trn-of">/{total}</span></b><span>EXERCISES</span></div>
          </div>
          <div className="score-side">
            <div className="trn-musc">
              {todaySession.muscles.map((m) => (
                <span className="trn-mchip" key={m}>
                  <i style={{ background: muscleColors[m] }} />{m}
                </span>
              ))}
            </div>
            <div className="tiles trn-tiles">
              <div className="tile"><div className="tn">{setsDone}<span className="tu">/{setsTotal}</span></div><div className="tl">Sets</div></div>
              <div className="tile"><div className="tn">{(volume / 1000).toFixed(1)}<span className="tu">k</span></div><div className="tl">Volume</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* exercise list */}
      <div className="trn-list">
        {todaySession.exercises.map((ex, i) => {
          const done = exDone(i)
          const loggedInEx = ex.sets.filter((_, si) => sets[i][si]).length
          const isOpen = open === i
          return (
            <div className={'trn-card' + (done ? ' done' : '') + (isOpen ? ' open' : '')} key={ex.name}>
              <div className="trn-row">
                <span className="trn-bar" />
                <button className="trn-body" onClick={() => setOpen((o) => (o === i ? null : i))}>
                  <div className="trn-name">{ex.name}</div>
                  <div className="trn-sub">
                    <span className="trn-mdot" style={{ background: muscleColors[ex.muscle] }} />
                    <span className="trn-mname">{ex.muscle}</span>
                    <span className="trn-prev">last {ex.prev}</span>
                  </div>
                </button>
                <span className="trn-tally">{loggedInEx}/{ex.sets.length}</span>
                <button
                  className={'trn-check' + (done ? ' on' : '')}
                  onClick={() => toggleExercise(i)}
                  aria-label="complete exercise"
                >
                  <IconCheck size={15} />
                </button>
              </div>

              {isOpen && (
                <div className="trn-sets">
                  <div className="trn-shead"><span>SET</span><span>KG</span><span>REPS</span><span /></div>
                  {ex.sets.map((st, si) => {
                    const sd = sets[i][si]
                    return (
                      <div className={'trn-srow' + (sd ? ' set-done' : '')} key={si}>
                        <span className="trn-sn">{si + 1}</span>
                        <span className="mono">{st.kg}</span>
                        <span className="mono">{st.reps}</span>
                        <span className="trn-scell">
                          <button
                            className={'trn-scheck' + (sd ? ' on' : '')}
                            onClick={() => toggleSet(i, si)}
                            aria-label="log set"
                          >
                            <IconCheck size={13} />
                          </button>
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <button className="trn-finish" disabled={doneCount === 0} onClick={() => go('home')}>
        <IconCheck size={17} /> Finish workout
      </button>
      <div className="trn-fnote">{doneCount} of {total} exercises logged · {setsDone} sets</div>
      </>)}
    </div>
  )
}
