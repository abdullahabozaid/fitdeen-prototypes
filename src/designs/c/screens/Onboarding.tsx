import { useState } from 'react'
import { IconChevron, IconCheck, IconPlay } from '../../a/icons'
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
  const onCover = step === 0

  return (
    <div className={'cOnb' + (onCover ? ' cover-mode' : '')}>
      <div className="cOnb-top">
        <div className="cOnb-progress">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={'cOnb-seg ' + (i <= step ? 'on' : '')} />
          ))}
        </div>
        <div className="cOnb-bar">
          <button
            className="cOnb-back"
            onClick={back}
            style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
            aria-label="Back"
          >
            <span className="cOnb-chev-left">
              <IconChevron size={16} />
            </span>
          </button>
          <button className="cOnb-skip" onClick={onDone}>
            Skip
          </button>
        </div>
      </div>

      <div className="cOnb-body">
        {step === 0 && (
          <div className="cOnb-step cOnb-welcome">
            <div className="cOnb-eye">Assalamu alaikum</div>
            <h1 className="cOnb-disp">
              Train with intention.
              <br />
              Stay on your deen.
            </h1>
            <p className="cOnb-lead">
              Strength, nutrition and prayer in one place. Built around your day, not against it.
            </p>
            <div className="cOnb-cite">Your body has a right over you. Sahih al-Bukhari</div>
          </div>
        )}

        {step === 1 && (
          <div className="cOnb-step">
            <div className="cOnb-eye">Step 02 / 05</div>
            <h1 className="cOnb-h1">What are you here for?</h1>
            <p className="cOnb-lead">Pick all that apply. Change them anytime.</p>
            <div className="cOnb-chips">
              {goals.map((g) => {
                const on = picked.includes(g)
                return (
                  <button
                    key={g}
                    className={'cOnb-chip ' + (on ? 'on' : '')}
                    onClick={() => toggleGoal(g)}
                  >
                    {on && (
                      <span className="cOnb-chip-check">
                        <IconCheck size={15} />
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
          <div className="cOnb-step">
            <div className="cOnb-eye">Step 03 / 05</div>
            <h1 className="cOnb-h1">Set your week.</h1>
            <p className="cOnb-lead">Choose training days and a daily calorie target.</p>

            <div className="cOnb-label">Training days</div>
            <div className="cOnb-days">
              {dayLabels.map((d, i) => (
                <button
                  key={i}
                  className={'cOnb-day mono ' + (days.includes(i) ? 'on' : '')}
                  onClick={() => toggleDay(i)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="cOnb-label">Daily calories</div>
            <div className="cOnb-stepper">
              <button
                className="cOnb-step-btn"
                onClick={() => setKcal((k) => Math.max(1200, k - 50))}
                aria-label="Lower target"
              >
                −
              </button>
              <div className="cOnb-kcal">
                <b className="mono">{kcal.toLocaleString()}</b>
                <span className="mono">kcal</span>
              </div>
              <button
                className="cOnb-step-btn"
                onClick={() => setKcal((k) => Math.min(4000, k + 50))}
                aria-label="Raise target"
              >
                +
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cOnb-step">
            <div className="cOnb-eye">Step 04 / 05</div>
            <h1 className="cOnb-h1">Your deen, your way.</h1>
            <p className="cOnb-lead">We schedule around prayer times. Set how they are calculated.</p>

            <div className="cOnb-label">Calculation method</div>
            <div className="cOnb-select">
              {methods.map((m, i) => (
                <button
                  key={m}
                  className={'cOnb-opt ' + (method === i ? 'on' : '')}
                  onClick={() => setMethod(i)}
                >
                  {m}
                  {method === i && (
                    <span className="cOnb-opt-check">
                      <IconCheck size={15} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              className={'cOnb-toggle ' + (ramadan ? 'on' : '')}
              onClick={() => setRamadan((v) => !v)}
            >
              <div className="cOnb-toggle-text">
                <span className="cOnb-toggle-title">Observe Ramadan</span>
                <span className="cOnb-toggle-hint">Shift workouts and meals around the fast.</span>
              </div>
              <span className="cOnb-switch">
                <span className="cOnb-knob" />
              </span>
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="cOnb-step">
            <div className="cOnb-eye">Step 05 / 05</div>
            <h1 className="cOnb-h1">Your plan.</h1>
            <p className="cOnb-lead">Here is what we set up. Adjust it later in profile.</p>

            <div className="cOnb-plan">
              <div className="cOnb-plan-hero">
                <span className="cOnb-plan-hero-v mono">{kcal.toLocaleString()}</span>
                <span className="cOnb-plan-hero-k">kcal daily target</span>
              </div>
              <div className="cOnb-plan-rows">
                <div className="cOnb-plan-row">
                  <span className="cOnb-plan-k">Protein</span>
                  <span className="cOnb-plan-v">
                    <b className="mono">{protein}</b> g
                  </span>
                </div>
                <div className="cOnb-plan-row">
                  <span className="cOnb-plan-k">Training</span>
                  <span className="cOnb-plan-v">
                    <b className="mono">{days.length}</b> days / week
                  </span>
                </div>
                <div className="cOnb-plan-row">
                  <span className="cOnb-plan-k">Schedule</span>
                  <span className="cOnb-plan-tag">Fajr-aware</span>
                </div>
                <div className="cOnb-plan-row">
                  <span className="cOnb-plan-k">Focus</span>
                  <span className="cOnb-plan-tag">{picked.length ? picked[0] : 'Stay consistent'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cOnb-foot">
        {step < STEPS - 1 ? (
          <button className="cOnb-next" onClick={next}>
            Continue
          </button>
        ) : (
          <button className="cOnb-next cOnb-enter" onClick={onDone}>
            <IconPlay size={15} /> Enter app
          </button>
        )}
      </div>
    </div>
  )
}
