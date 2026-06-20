import { useState } from 'react'
import { user, week, streak, todaySession, prayers, hadith, nutrition, muscleColors } from '../../../mock/data'
import { IconChevron, IconFlame, IconPlay } from '../icons'

export default function Home({ go }: { go: (t: string) => void }) {
  const [openPrayers, setOpenPrayers] = useState(false)
  return (
    <div className="pad">
      <div className="top">
        <div className="eyebrow">Saturday · 20 June</div>
        <div className="avatar">{user.initials}</div>
      </div>
      <div className="greet">Assalamu alaikum, {user.name}.</div>

      <div className="weekrow">
        <div className="week">
          {week.map((d, i) => (
            <div className="day" key={i}>
              <span className="dl">{d.d}</span>
              <div className={'dot ' + d.state} />
            </div>
          ))}
        </div>
        <div className="streak"><IconFlame /><b>{streak}</b><span>DAYS</span></div>
      </div>

      <button className="hero" onClick={() => go('train')}>
        <div className="eyebrow ey">Today · {todaySession.focus}</div>
        <div className="muscles">{todaySession.muscles.map((m) => <div className="m" key={m} style={{ background: muscleColors[m] }} />)}</div>
        <h2>{todaySession.title}</h2>
        <div className="meta">{todaySession.exerciseCount} exercises · about {todaySession.minutes} min · last: {todaySession.exercises[0].prev}</div>
        <div className="cta"><IconPlay /> Start workout</div>
      </button>

      <button className="prayer" onClick={() => setOpenPrayers((v) => !v)}>
        <div className="pdots">{prayers.map((p) => <div key={p.name} className={'pd ' + (p.state === 'done' ? 'done' : p.state === 'next' ? 'next' : '')} />)}</div>
        <div className="ptext">Asr <b>15:42</b> · in 23 min</div>
        <span className="chev"><IconChevron /></span>
      </button>
      {openPrayers && (
        <div className="ptable">
          {prayers.map((p) => (
            <div className="prow" key={p.name}>
              <span className={'pn ' + p.state}>{p.name}</span>
              <span className="pt">{p.time}</span>
            </div>
          ))}
        </div>
      )}

      <div className="hadith">
        <div className="glyph">۞</div>
        <div className="ar">{hadith.ar}</div>
        <div className="en">{hadith.en}</div>
        <div className="cite">{hadith.cite}</div>
      </div>

      <div className="sec" style={{ cursor: 'pointer' }} onClick={() => go('nutrition')}>
        <div className="eyebrow">Today's intake</div>
        <span className="chev"><IconChevron /></span>
      </div>
      <div className="intake" style={{ cursor: 'pointer' }} onClick={() => go('nutrition')}>
        <div className="bar"><i style={{ width: Math.round((nutrition.kcal / nutrition.kcalGoal) * 100) + '%' }} /></div>
        <div className="ik"><b>{nutrition.kcal.toLocaleString()}</b> / {nutrition.kcalGoal.toLocaleString()} kcal · P <b>{nutrition.protein}</b>g</div>
      </div>
    </div>
  )
}
