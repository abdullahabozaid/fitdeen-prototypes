import { useState } from 'react'
import { IconChevron, IconCheck } from '../icons'
import './onboarding.css'

const goals = ['Build muscle', 'Lose fat', 'Stay consistent', 'Ramadan-ready']
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const methods = ['Muslim World League', 'Egyptian Authority', 'Umm al-Qura', 'ISNA']

const STEPS = 5

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string[]>(['Build muscle', 'Stay consistent'])
  const [days, setDays] = useState<number[]>([0, 2, 4])
  const [kcal, setKcal] = useState(2150)
  const [method, setMethod] = useState(0)
  const [ramadan, setRamadan] = useState(true)

  const toggleGoal = (g: string) =>
    setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]))
  const toggleDay = (i: number) =>
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i].sort((a, b) => a - b)))

  const back = () => setStep((s) => Math.max(0, s - 1))
  const next = () => setStep((s) => Math.min(STEPS - 1, s + 1))

  const protein = Math.round((kcal * 0.31) / 4)

  return (
    <div className="dA-onb">
      <div className="onb-progress">
        {Array.from({ length: STEPS }).map((_, i) => (
          <span key={i} className={'onb-seg ' + (i <= step ? 'on' : '')} />
        ))}
      </div>

      <div className="onb-bar">
        <button
          className="onb-back"
          onClick={back}
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          aria-label="Back"
        >
          <span className="onb-chev-left">
            <IconChevron size={16} />
          </span>
        </button>
        <button className="onb-skip" onClick={onDone}>
          Skip
        </button>
      </div>

      <div className="onb-body">
        {step === 0 && (
          <div className="onb-step onb-welcome">
            <div className="eyebrow onb-eye">Assalamu alaikum</div>
            <h1 className="onb-h1">
              Train with <span className="onb-pop">intention</span>. Stay on your deen.
            </h1>
            <p className="onb-lead">
              Strength, nutrition and prayer in one place. Built around your day, not against it.
            </p>
            <div className="onb-cite">Your body has a right over you. Sahih al-Bukhari</div>
          </div>
        )}

        {step === 1 && (
          <div className="onb-step">
            <div className="eyebrow onb-eye">Step 2 of 5</div>
            <h1 className="onb-h1">What are you here for?</h1>
            <p className="onb-lead">Pick all that apply. Change them anytime.</p>
            <div className="onb-chips">
              {goals.map((g) => {
                const on = picked.includes(g)
                return (
                  <button
                    key={g}
                    className={'onb-chip ' + (on ? 'on' : '')}
                    onClick={() => toggleGoal(g)}
                  >
                    {on && (
                      <span className="onb-chip-check">
                        <IconCheck size={13} />
                      </span>
                    )}
                    {g}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onb-step">
            <div className="eyebrow onb-eye">Step 3 of 5</div>
            <h1 className="onb-h1">Set your week.</h1>
            <p className="onb-lead">Choose training days and a daily calorie target.</p>

            <div className="onb-label">Training days</div>
            <div className="onb-days">
              {dayLabels.map((d, i) => (
                <button
                  key={i}
                  className={'onb-day ' + (days.includes(i) ? 'on' : '')}
                  onClick={() => toggleDay(i)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="onb-label">Daily calories</div>
            <div className="onb-stepper">
              <button
                className="onb-step-btn"
                onClick={() => setKcal((k) => Math.max(1200, k - 50))}
                aria-label="Lower target"
              >
                −
              </button>
              <div className="onb-kcal">
                <b>{kcal.toLocaleString()}</b>
                <span>kcal</span>
              </div>
              <button
                className="onb-step-btn"
                onClick={() => setKcal((k) => Math.min(4000, k + 50))}
                aria-label="Raise target"
              >
                +
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onb-step">
            <div className="eyebrow onb-eye">Step 4 of 5</div>
            <h1 className="onb-h1">Your deen, your way.</h1>
            <p className="onb-lead">
              We schedule around prayer times. Set how they are calculated.
            </p>

            <div className="onb-label">Calculation method</div>
            <div className="onb-select">
              {methods.map((m, i) => (
                <button
                  key={m}
                  className={'onb-opt ' + (method === i ? 'on' : '')}
                  onClick={() => setMethod(i)}
                >
                  {m}
                  {method === i && (
                    <span className="onb-opt-check">
                      <IconCheck size={13} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              className={'onb-toggle ' + (ramadan ? 'on' : '')}
              onClick={() => setRamadan((v) => !v)}
            >
              <div className="onb-toggle-text">
                <span className="onb-toggle-title">Observe Ramadan</span>
                <span className="onb-toggle-hint">Shift workouts and meals around the fast.</span>
              </div>
              <span className="onb-switch">
                <span className="onb-knob" />
              </span>
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="onb-step">
            <div className="eyebrow onb-eye">Step 5 of 5</div>
            <h1 className="onb-h1">Your plan.</h1>
            <p className="onb-lead">Here is what we set up. Adjust it later in profile.</p>

            <div className="onb-plan">
              <div className="onb-plan-row">
                <span className="onb-plan-k">Daily target</span>
                <span className="onb-plan-v">
                  <b>{kcal.toLocaleString()}</b> kcal
                </span>
              </div>
              <div className="onb-plan-row">
                <span className="onb-plan-k">Protein</span>
                <span className="onb-plan-v">
                  <b>{protein}</b> g
                </span>
              </div>
              <div className="onb-plan-row">
                <span className="onb-plan-k">Training</span>
                <span className="onb-plan-v">
                  <b>{days.length}</b> days / week
                </span>
              </div>
              <div className="onb-plan-row">
                <span className="onb-plan-k">Schedule</span>
                <span className="onb-plan-v onb-plan-tag">Fajr-aware</span>
              </div>
              <div className="onb-plan-row">
                <span className="onb-plan-k">Focus</span>
                <span className="onb-plan-v onb-plan-tag">
                  {picked.length ? picked[0] : 'Stay consistent'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="onb-foot">
        {step < STEPS - 1 ? (
          <button className="onb-next" onClick={next}>
            Continue
          </button>
        ) : (
          <button className="onb-next onb-enter" onClick={onDone}>
            Enter app
          </button>
        )}
      </div>
    </div>
  )
}
