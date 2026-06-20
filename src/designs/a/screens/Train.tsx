import { useState } from 'react'
import { todaySession, muscleColors } from '../../../mock/data'
import { IconCheck } from '../icons'
import './train.css'

type Tab = 'today' | 'program' | 'history'
// per-exercise set completion: exercise index -> set of completed set indexes
type SetState = Record<number, boolean[]>

export default function Train({ go }: { go: (t: string) => void }) {
  const [tab, setTab] = useState<Tab>('today')
  const [running, setRunning] = useState(true)
  const [open, setOpen] = useState<number | null>(0)
  const [sets, setSets] = useState<SetState>(() =>
    Object.fromEntries(todaySession.exercises.map((ex, i) => [i, ex.sets.map(() => false)]))
  )

  const exDone = (i: number) => sets[i] && sets[i].every(Boolean)
  const doneCount = todaySession.exercises.filter((_, i) => exDone(i)).length
  const total = todaySession.exercises.length

  const toggleSet = (ei: number, si: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map((v, k) => (k === si ? !v : v)) }))

  // round quick-complete: fill all sets, or clear them if already done
  const toggleExercise = (ei: number) =>
    setSets((s) => ({ ...s, [ei]: s[ei].map(() => !exDone(ei)) }))

  return (
    <div className="pad">
      <div className="train-head">
        <div>
          <div className="eyebrow">Train</div>
          <div className="greet">Today's session.</div>
        </div>
        <button className={'train-timer' + (running ? ' run' : '')} onClick={() => setRunning((v) => !v)}>
          <span className="train-pulse" />
          <b>12:34</b>
        </button>
      </div>

      <div className="train-segs">
        <button className={'train-seg' + (tab === 'today' ? ' on' : '')} onClick={() => setTab('today')}>TODAY</button>
        <button className={'train-seg' + (tab === 'program' ? ' on' : '')} onClick={() => setTab('program')}>PROGRAM</button>
        <button className={'train-seg' + (tab === 'history' ? ' on' : '')} onClick={() => setTab('history')}>HISTORY</button>
      </div>

      {tab === 'today' && (
        <>
          <div className="train-sess">
            <div className="eyebrow ey" style={{ color: 'var(--ebright)' }}>{todaySession.focus}</div>
            <div className="muscles">
              {todaySession.muscles.map((m) => <div className="m" key={m} style={{ background: muscleColors[m] }} />)}
            </div>
            <h2>{todaySession.title}</h2>
            <div className="train-count">{doneCount} / {total} done · about {todaySession.minutes} min</div>
          </div>

          <div className="train-list">
            {todaySession.exercises.map((ex, i) => {
              const done = exDone(i)
              return (
                <div key={ex.name}>
                  <div className={'train-row' + (done ? ' done' : '')}>
                    <span className="train-bar" />
                    <button className="train-body" onClick={() => setOpen((o) => (o === i ? null : i))}>
                      <div className="train-name">{ex.name}</div>
                      <div className="train-sub">
                        <span className="train-mdot" style={{ background: muscleColors[ex.muscle] }} />
                        <span className="train-mname">{ex.muscle}</span>
                        <span className="train-prev">last: {ex.prev}</span>
                      </div>
                    </button>
                    <button
                      className={'train-check' + (done ? ' on' : '')}
                      onClick={() => toggleExercise(i)}
                      aria-label="complete exercise"
                    >
                      <IconCheck size={15} />
                    </button>
                  </div>

                  {open === i && (
                    <div className="train-sets">
                      <div className="train-shead">
                        <span>SET</span><span>KG</span><span>REPS</span><span />
                      </div>
                      {ex.sets.map((st, si) => {
                        const sd = sets[i][si]
                        return (
                          <div className={'train-srow' + (sd ? ' set-done' : '')} key={si}>
                            <span className="train-sn">{si + 1}</span>
                            <span>{st.kg}</span>
                            <span>{st.reps}</span>
                            <span className="train-scell">
                              <button
                                className={'train-scheck' + (sd ? ' on' : '')}
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

          <button className="train-finish" disabled={doneCount === 0} onClick={() => go('home')}>
            <IconCheck size={17} /> Finish workout
          </button>
          <div className="train-fnote">{doneCount} of {total} exercises logged</div>
        </>
      )}

      {tab === 'program' && (
        <div className="train-ph">
          <h3>Push · Pull · Legs</h3>
          <p>Your six-day split lives here. Open it to swap a day or edit a lift.</p>
        </div>
      )}

      {tab === 'history' && (
        <div className="train-ph">
          <h3>Five sessions this week</h3>
          <p>Past workouts and volume trends land here. Train today to add the next one.</p>
        </div>
      )}
    </div>
  )
}
