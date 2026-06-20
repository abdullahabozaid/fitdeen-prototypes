import { useState } from 'react'
import { IconChevron, IconCheck, IconPlay } from '../../a/icons'
import './onboarding.css'

const goals = ['Build muscle', 'Lose fat', 'Stay consistent', 'Ramadan-ready']
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const methods = ['Muslim World League', 'Egyptian Authority', 'Umm al-Qura', 'ISNA']

const STEPS = 5
const C = 2 * Math.PI * 46

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
  const pct = Math.round((step / (STEPS - 1)) * 100)

  return (
    <div className="onbB">
      <div className="onbB-progress">
        <span className="onbB-fill" style={{ width: `${(step / (STEPS - 1)) * 100}%` }} />
      </div>

      <div className="onbB-bar">
        <button
          className="onbB-back"
          onClick={back}
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          aria-label="Back"
        >
          <span className="onbB-chev-left"><IconChevron size={16} /></span>
        </button>
        <span className="onbB-count mono">{step + 1} / {STEPS}</span>
        <button className="onbB-skip" onClick={onDone}>Skip</button>
      </div>

      <div className="onbB-body">
        {step === 0 && (
          <div className="onbB-step">
            <div className="eyebrow onbB-eye">Assalamu alaikum</div>
            <h1 className="onbB-h1">
              Train with <span className="onbB-pop">intention</span>. Stay on your deen.
            </h1>
            <p className="onbB-lead">
              Strength, nutrition and prayer in one place. Built around your day, not against it.
            </p>
            <div className="onbB-welcome-tiles">
              <div className="onbB-wtile">
                <div className="onbB-wn mono">5×</div>
                <div className="onbB-wl">Prayer-aware schedule</div>
              </div>
              <div className="onbB-wtile">
                <div className="onbB-wn mono">1</div>
                <div className="onbB-wl">Log lifts and meals</div>
              </div>
              <div className="onbB-wtile">
                <div className="onbB-wn mono">∞</div>
                <div className="onbB-wl">Halal coach on call</div>
              </div>
            </div>
            <div className="onbB-cite">Your body has a right over you. Sahih al-Bukhari</div>
          </div>
        )}

        {step === 1 && (
          <div className="onbB-step">
            <div className="eyebrow onbB-eye">Goals</div>
            <h1 className="onbB-h1">What are you here for?</h1>
            <p className="onbB-lead">Pick all that apply. Change them anytime.</p>
            <div className="onbB-chips">
              {goals.map((g) => {
                const on = picked.includes(g)
                return (
                  <button
                    key={g}
                    className={'onbB-chip ' + (on ? 'on' : '')}
                    onClick={() => toggleGoal(g)}
                  >
                    {on && (
                      <span className="onbB-chip-check"><IconCheck size={13} /></span>
                    )}
                    {g}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onbB-step">
            <div className="eyebrow onbB-eye">Your week</div>
            <h1 className="onbB-h1">Set your week.</h1>
            <p className="onbB-lead">Choose training days and a daily calorie target.</p>

            <div className="onbB-label">Training days</div>
            <div className="onbB-days">
              {dayLabels.map((d, i) => (
                <button
                  key={i}
                  className={'onbB-day ' + (days.includes(i) ? 'on' : '')}
                  onClick={() => toggleDay(i)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="onbB-label">Daily calories</div>
            <div className="onbB-stepper">
              <button
                className="onbB-step-btn"
                onClick={() => setKcal((k) => Math.max(1200, k - 50))}
                aria-label="Lower target"
              >
                −
              </button>
              <div className="onbB-kcal">
                <b className="mono">{kcal.toLocaleString()}</b>
                <span className="mono">kcal</span>
              </div>
              <button
                className="onbB-step-btn"
                onClick={() => setKcal((k) => Math.min(4000, k + 50))}
                aria-label="Raise target"
              >
                +
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onbB-step">
            <div className="eyebrow onbB-eye">Your deen</div>
            <h1 className="onbB-h1">Your deen, your way.</h1>
            <p className="onbB-lead">
              We schedule around prayer times. Set how they are calculated.
            </p>

            <div className="onbB-label">Calculation method</div>
            <div className="onbB-select">
              {methods.map((m, i) => (
                <button
                  key={m}
                  className={'onbB-opt ' + (method === i ? 'on' : '')}
                  onClick={() => setMethod(i)}
                >
                  {m}
                  {method === i && (
                    <span className="onbB-opt-check"><IconCheck size={13} /></span>
                  )}
                </button>
              ))}
            </div>

            <button
              className={'onbB-toggle ' + (ramadan ? 'on' : '')}
              onClick={() => setRamadan((v) => !v)}
            >
              <div className="onbB-toggle-text">
                <span className="onbB-toggle-title">Observe Ramadan</span>
                <span className="onbB-toggle-hint">Shift workouts and meals around the fast.</span>
              </div>
              <span className="onbB-switch"><span className="onbB-knob" /></span>
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="onbB-step">
            <div className="eyebrow onbB-eye">Your plan</div>
            <h1 className="onbB-h1">Ready when you are.</h1>
            <p className="onbB-lead">Here is what we set up. Adjust it later in profile.</p>

            <div className="onbB-plan">
              <div className="onbB-plan-hero">
                <div className="onbB-ring-wrap">
                  <svg width="104" height="104" viewBox="0 0 104 104">
                    <circle cx="52" cy="52" r="46" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
                    <circle
                      cx="52" cy="52" r="46" fill="none" stroke="url(#onbBg)" strokeWidth="9" strokeLinecap="round"
                      strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 52 52)"
                    />
                    <defs>
                      <linearGradient id="onbBg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#34d399" />
                        <stop offset="1" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="onbB-ring-num">
                    <b className="mono">100</b>
                    <span className="mono">READY</span>
                  </div>
                </div>
                <div className="onbB-plan-focus">
                  <div className="onbB-focus-eye mono">FOCUS</div>
                  <div className="onbB-focus-v">{picked.length ? picked[0] : 'Stay consistent'}</div>
                  <div className="onbB-focus-tag mono">Fajr-aware schedule</div>
                </div>
              </div>

              <div className="onbB-plan-tiles">
                <div className="onbB-ptile">
                  <div className="onbB-pn mono">{kcal.toLocaleString()}</div>
                  <div className="onbB-pl mono">KCAL / DAY</div>
                </div>
                <div className="onbB-ptile">
                  <div className="onbB-pn mono">{protein}<span className="onbB-pu">g</span></div>
                  <div className="onbB-pl mono">PROTEIN</div>
                </div>
                <div className="onbB-ptile">
                  <div className="onbB-pn mono">{days.length}</div>
                  <div className="onbB-pl mono">DAYS / WK</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="onbB-foot">
        {step < STEPS - 1 ? (
          <button className="onbB-next" onClick={next}>Continue</button>
        ) : (
          <button className="onbB-next onbB-enter" onClick={onDone}>
            Enter app
            <span className="onbB-enter-go"><IconPlay size={16} /></span>
          </button>
        )}
      </div>
    </div>
  )
}
