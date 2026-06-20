import { useState } from 'react'
import { todaySession, muscleColors } from '../../../mock/data'
import { IconCheck } from '../../a/icons'
import './train.css'

// per-exercise set completion: exercise index -> array of completed set flags
type SetState = Record<number, boolean[]>

export default function Train({ go }: { go: (t: string) => void }) {
  const [open, setOpen] = useState<number | null>(0)
  const [sets, setSets] = useState<SetState>(() =>
    Object.fromEntries(todaySession.exercises.map((ex, i) => [i, ex.sets.map(() => false)]))
  )

  const exDone = (i: number) => sets[i] && sets[i].every(Boolean)
  const setsDone = (i: number) => (sets[i] ? sets[i].filter(Boolean).length : 0)
  const doneCount = todaySession.exercises.filter((_, i) => exDone(i)).length
  const total = todaySession.exercises.length
  const pct = Math.round((doneCount / total) * 100)

  const toggleSet = (ei: number, si: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map((v, k) => (k === si ? !v : v)) }))

  // round quick-complete: fill all sets, or clear them if already done
  const toggleExercise = (ei: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map(() => !exDone(ei)) }))

  return (
    <div className="pad">
      <div className="cover trn-cover">
        <div className="ctop">
          <div className="ce">Push day · 6 lifts</div>
          <div className="trn-clock mono">12:34</div>
        </div>
        <div className="ce clabel">{doneCount} of {total} done</div>
        <h1>{todaySession.title}.</h1>
        <div className="cmuscles">
          {todaySession.muscles.map((m) => <div className="m" key={m} style={{ background: muscleColors[m] }} />)}
        </div>
        <div className="cm">about {todaySession.minutes} min · {pct}% logged</div>
        <div className="trn-coverbar"><span style={{ width: pct + '%' }} /></div>
      </div>

      <div className="trn-list">
        {todaySession.exercises.map((ex, i) => {
          const done = exDone(i)
          const isOpen = open === i
          const sd = setsDone(i)
          return (
            <div className={'trn-item' + (done ? ' done' : '') + (isOpen ? ' open' : '')} key={ex.name}>
              <span className="trn-bar" style={{ '--mc': muscleColors[ex.muscle] } as React.CSSProperties} />
              <div className="trn-top">
                <button className="trn-head" onClick={() => setOpen((o) => (o === i ? null : i))}>
                  <div className="trn-name">{ex.name}</div>
                  <div className="trn-meta">
                    <span className="trn-mdot" style={{ background: muscleColors[ex.muscle] }} />
                    <span className="trn-mname">{ex.muscle}</span>
                    <span className="trn-prog mono">{sd}/{ex.sets.length}</span>
                    <span className="trn-prev">last: {ex.prev}</span>
                  </div>
                </button>
                <button
                  className={'trn-round' + (done ? ' on' : '')}
                  onClick={() => toggleExercise(i)}
                  aria-label="complete exercise"
                >
                  <IconCheck size={18} />
                </button>
              </div>

              {isOpen && (
                <div className="trn-sets">
                  <div className="trn-shead mono">
                    <span>SET</span><span>KG</span><span>REPS</span><span />
                  </div>
                  {ex.sets.map((st, si) => {
                    const ck = sets[i][si]
                    return (
                      <div className={'trn-srow' + (ck ? ' set-done' : '')} key={si}>
                        <span className="trn-sn mono">{si + 1}</span>
                        <span className="mono">{st.kg}</span>
                        <span className="mono">{st.reps}</span>
                        <button
                          className={'trn-scheck' + (ck ? ' on' : '')}
                          onClick={() => toggleSet(i, si)}
                          aria-label="log set"
                        >
                          <IconCheck size={13} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="trn-footer">
        <button className="trn-finish" disabled={doneCount === 0} onClick={() => go('home')}>
          <IconCheck size={18} /> Finish workout
        </button>
        <div className="trn-fnote mono">{doneCount} / {total} exercises logged</div>
      </div>
    </div>
  )
}
