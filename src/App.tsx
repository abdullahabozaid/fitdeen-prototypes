import { useState } from 'react'
import AppA from './designs/a/AppA'
import AppB from './designs/b/AppB'
import AppC from './designs/c/AppC'

const designs = [
  { id: 'A', tag: 'Direction A', name: 'Calm · Editorial', live: true, desc: 'Restrained luxury. One clear action per screen, generous space, the premium dark FitDeen.' },
  { id: 'B', tag: 'Direction B', name: 'Energetic · Data-rich', live: true, desc: 'Same brand, more alive. A Day-Score ring, data tiles, and a center quick-log button.' },
  { id: 'C', tag: 'Direction C', name: 'Bold · Expressive', live: true, desc: 'Same brand, bigger moments. A full-bleed gradient cover, big display type, a floating nav.' },
]

export default function App() {
  const [open, setOpen] = useState<string | null>(null)

  if (open) {
    const Cmp = open === 'A' ? AppA : open === 'B' ? AppB : AppC
    return (
      <div className="stage">
        <button className="back" onClick={() => setOpen(null)}>← All designs</button>
        <Cmp />
      </div>
    )
  }

  return (
    <div className="hub">
      <div className="hub-head">
        <div className="hub-eyebrow">FitDeen · Design Explorations</div>
        <h1>Three directions, one app.</h1>
        <p className="hub-sub">Each is a fully clickable prototype with mock data. Pick a direction and walk through it like the real app.</p>
      </div>
      <div className="hub-grid">
        {designs.map((d) => (
          <button key={d.id} className="dcard" disabled={!d.live} onClick={() => d.live && setOpen(d.id)}>
            <div className="tag">{d.tag}</div>
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
            {d.live ? <div className="enter">Enter prototype →</div> : <div className="soon">In progress</div>}
          </button>
        ))}
      </div>
    </div>
  )
}
