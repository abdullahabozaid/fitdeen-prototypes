import { useState, useRef, useEffect } from 'react'
import './sb.css'
import { smartBasket } from './mock/data'
import { IconPlay, IconCheck } from './designs/a/icons'

// ponytail: themed by whichever design root (.dA/.dB/.dC) hosts it via shared CSS vars.
type Item = (typeof smartBasket.build)[number]

function badge(h: string) { return h === 'certified' ? 'Halal certified' : 'Halal by nature' }

export default function SmartBasket() {
  const [phase, setPhase] = useState<'idle' | 'building' | 'done'>('idle')
  const [step, setStep] = useState(0)
  const [view, setView] = useState<'basket' | 'list'>('basket')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const timers = useRef<number[]>([])
  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  function build() {
    setPhase('building'); setStep(0)
    smartBasket.steps.forEach((_, i) => { timers.current.push(window.setTimeout(() => setStep(i), i * 360)) })
    timers.current.push(window.setTimeout(() => setPhase('done'), smartBasket.steps.length * 360 + 280))
  }

  if (phase === 'idle') return (
    <div className="sb">
      <div className="sb-eyebrow">Smart Basket</div>
      <h3 className="sb-h">A week of halal food, under budget.</h3>
      <p className="sb-sub">One basket for your budget and household. Halal only, optimised for protein per pound.</p>
      <div className="sb-params">
        <div className="sb-param"><span>Budget</span><b>£{smartBasket.budget}</b></div>
        <div className="sb-param"><span>Household</span><b>{smartBasket.people}</b></div>
        <div className="sb-param"><span>Days</span><b>{smartBasket.days}</b></div>
      </div>
      <button className="sb-build" onClick={build}><IconPlay size={16} /> Build my basket</button>
    </div>
  )

  if (phase === 'building') return (
    <div className="sb">
      <div className="sb-loading">
        <div className="sb-spinner" />
        <div className="sb-steps">
          {smartBasket.steps.map((s, i) => (
            <div key={s} className={'sb-step' + (i <= step ? ' on' : '')}>
              <span className="sb-stepmark">{i < step ? <IconCheck size={12} /> : <span className="sb-stepdot" />}</span>{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const pct = Math.round((smartBasket.total / smartBasket.budget) * 100)
  const groups: Record<string, Item[]> = {}
  smartBasket.build.forEach((it) => { (groups[it.aisle] ||= []).push(it) })

  return (
    <div className="sb">
      <div className="sb-toggle">
        <button className={view === 'basket' ? 'on' : ''} onClick={() => setView('basket')}>Basket</button>
        <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>Shopping list</button>
      </div>

      <div className="sb-hero">
        <div className="sb-hero-top">
          <div><div className="sb-htotal">£{smartBasket.total.toFixed(2)}</div><div className="sb-hgoal">of £{smartBasket.budget} budget</div></div>
          <div className="sb-hprot"><b>{(smartBasket.proteinWk / 1000).toFixed(1)}kg</b><span>protein / week</span></div>
        </div>
        <div className="sb-meter"><i style={{ width: pct + '%' }} /></div>
        <div className="sb-note">Includes halal-certified meat · {smartBasket.build.length} items across Tesco, Sainsbury's, Aldi</div>
      </div>

      {view === 'basket' ? (
        <div className="sb-items">
          {smartBasket.build.map((it) => (
            <div className="sb-item" key={it.name}>
              <div className="sb-iqty">×{it.qty}</div>
              <div className="sb-iinfo">
                <div className="sb-iname">{it.name}</div>
                <div className="sb-imeta">{it.shop}<span className={'sb-tag ' + it.halal}>{badge(it.halal)}</span></div>
              </div>
              <div className="sb-iprice">£{it.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sb-list">
          {Object.keys(groups).map((aisle) => (
            <div className="sb-aisle" key={aisle}>
              <div className="sb-aisle-h">{aisle}</div>
              {groups[aisle].map((it) => (
                <button key={it.name} className={'sb-check' + (checked[it.name] ? ' done' : '')} onClick={() => setChecked((c) => ({ ...c, [it.name]: !c[it.name] }))}>
                  <span className="sb-box">{checked[it.name] && <IconCheck size={12} />}</span>
                  <span className="sb-cname">{it.name}</span>
                  <span className="sb-cqty">×{it.qty}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="sb-actions">
        <button className="sb-secondary" onClick={() => { setPhase('idle'); setChecked({}) }}>New basket</button>
        <button className="sb-secondary">Share list</button>
      </div>
    </div>
  )
}
