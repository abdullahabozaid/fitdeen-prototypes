import { useState, useRef, useEffect } from 'react'
import { coachSeed, coachPrompts } from '../../../mock/data'
import { IconSparkle, IconSend } from '../../a/icons'
import './coach.css'

type Msg = { role: 'coach' | 'user'; text: string }

// ponytail: tiny canned-reply matcher, no backend. Same feature set as Design A Coach.
function reply(prompt: string): string {
  const q = prompt.toLowerCase()
  if (q.includes('creatine'))
    return 'Yes. Creatine monohydrate is permissible. It is synthesised, not animal-derived, and carries no intoxicant. Take 5g a day. The default ruling on food and supplements is permission unless proven otherwise. Reference: al-Baqarah 2:29.'
  if (q.includes('iftar') || q.includes('protein'))
    return 'Two solid options. Grilled chicken thighs over rice with yoghurt, about 50g protein. Or lentil and beef kofta with flatbread, about 40g. Break your fast on dates and water first, then eat. Sunnah: Sahih Muslim 1099.'
  if (q.includes('push') || q.includes('plan'))
    return 'Your Push day is set. Bench, overhead press, incline, lateral raise, two triceps moves. Lead with bench while you are fresh. Add 2.5kg where you hit all reps last time. Rest 90 seconds between sets.'
  return 'Noted. Tell me your goal and I will build the next step. Train hard, eat clean, guard your prayers.'
}

export default function Coach() {
  const [msgs, setMsgs] = useState<Msg[]>(coachSeed as Msg[])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const feed = useRef<HTMLDivElement>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => { feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: 'smooth' }) }, [msgs, typing])

  function send(text: string) {
    const t = text.trim()
    if (!t || typing) return
    setMsgs((m) => [...m, { role: 'user', text: t }])
    setDraft('')
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { role: 'coach', text: reply(t) }])
    }, 600)
  }

  return (
    <div className="pad bcoach-pad">
      <div className="top">
        <div className="greet"><small>AI coach · always on</small>Coach</div>
        <div className="bcoach-mark"><IconSparkle size={20} /></div>
      </div>

      <div className="bcoach-feed" ref={feed}>
        {msgs.map((m, i) =>
          m.role === 'coach' ? (
            <div className="bcoach-line bcoach-from" key={i}>
              <span className="bcoach-bmark"><IconSparkle size={13} /></span>
              <div className="bcoach-bubble bcoach-cb">{m.text}</div>
            </div>
          ) : (
            <div className="bcoach-line bcoach-mine" key={i}>
              <div className="bcoach-bubble bcoach-ub">{m.text}</div>
            </div>
          )
        )}
        {typing && (
          <div className="bcoach-line bcoach-from">
            <span className="bcoach-bmark"><IconSparkle size={13} /></span>
            <div className="bcoach-bubble bcoach-cb bcoach-typing"><i /><i /><i /></div>
          </div>
        )}
      </div>

      {msgs.length <= coachSeed.length && (
        <div className="bcoach-chips">
          <div className="eyebrow bcoach-chips-lbl">Quick start</div>
          {coachPrompts.map((p) => (
            <button className="bcoach-chip" key={p} onClick={() => send(p)}>
              <span className="bcoach-chip-spark"><IconSparkle size={12} /></span>
              <span className="bcoach-chip-txt">{p}</span>
            </button>
          ))}
        </div>
      )}

      <div className="bcoach-input">
        <input
          className="bcoach-field mono"
          value={draft}
          placeholder="Ask your coach"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(draft) }}
        />
        <button className="bcoach-send" onClick={() => send(draft)} aria-label="Send"><IconSend /></button>
      </div>
    </div>
  )
}
