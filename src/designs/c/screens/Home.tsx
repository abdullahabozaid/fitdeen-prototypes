import { user, todaySession, prayers, hadith, streak, muscleColors } from '../../../mock/data'
import { IconPlay, IconChevron } from '../../a/icons'

export default function HomeC({ go }: { go: (t: string) => void }) {
  return (
    <div className="pad">
      <div className="cover">
        <div className="ctop"><div className="ce">Saturday · 20 June</div><div className="avatarC">{user.initials}</div></div>
        <div className="ce clabel">Today · Push day</div>
        <h1>Bench, press, push.</h1>
        <div className="cmuscles">{todaySession.muscles.map((m) => <div className="m" key={m} style={{ background: muscleColors[m] }} />)}</div>
        <div className="cm">6 exercises · about 48 min · last 60kg bench</div>
        <button className="cbtn" onClick={() => go('train')}><IconPlay size={15} /> Start workout</button>
      </div>

      <div className="bigstats">
        <div className="bstat"><b>{streak}</b><span>Day streak</span></div>
        <div className="bstat"><b>3/5</b><span>Prayers</span></div>
        <div className="bstat"><b>58%</b><span>Nutrition</span></div>
      </div>

      <button className="prayerC" onClick={() => go('home')}>
        <div className="pdots">{prayers.map((p) => <div key={p.name} className={'pd ' + (p.state === 'done' ? 'done' : p.state === 'next' ? 'next' : '')} />)}</div>
        <div className="pt">Asr <b>15:42</b> · in 23 min</div>
        <IconChevron />
      </button>

      <div className="hadithC">
        <div className="glyph">۞</div>
        <div className="ar">{hadith.ar}</div>
        <div className="en">{hadith.en}</div>
        <div className="cite">{hadith.cite}</div>
      </div>
    </div>
  )
}
