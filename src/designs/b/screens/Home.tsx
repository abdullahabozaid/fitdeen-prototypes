import { user, todaySession, prayers, hadith, nutrition, streak } from '../../../mock/data'
import { IconPlay, IconChevron, IconSparkle } from '../../a/icons'

const score = 72
const C = 2 * Math.PI * 48

export default function HomeB({ go }: { go: (t: string) => void }) {
  return (
    <div className="pad">
      <div className="top">
        <div className="greet"><small>Saturday · 20 June</small>Salam, {user.name}</div>
        <button className="hbtn" onClick={() => go('coach')}><IconSparkle size={20} /></button>
      </div>

      <div className="score">
        <div className="score-row">
          <div className="ring-wrap">
            <svg width="108" height="108" viewBox="0 0 108 108">
              <circle cx="54" cy="54" r="48" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="9" />
              <circle cx="54" cy="54" r="48" fill="none" stroke="url(#bg1)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} transform="rotate(-90 54 54)" />
              <defs><linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34d399" /><stop offset="1" stopColor="#10b981" /></linearGradient></defs>
            </svg>
            <div className="ring-num"><b>{score}</b><span>DAY SCORE</span></div>
          </div>
          <div className="score-side">
            <div className="ssline"><span className="k">Prayers</span><span className="v">3 / 5</span></div>
            <div className="ssline"><span className="k">Workout</span><span className="v off">Not done</span></div>
            <div className="ssline"><span className="k">Nutrition</span><span className="v">58%</span></div>
          </div>
        </div>
      </div>

      <button className="today" onClick={() => go('train')}>
        <div className="tinfo"><div className="ttl">{todaySession.title}</div><div className="sub">Push day · {todaySession.exerciseCount} exercises · {todaySession.minutes} min</div></div>
        <div className="tgo"><IconPlay size={18} /></div>
      </button>

      <div className="tiles">
        <div className="tile"><div className="tn">{streak}</div><div className="tl">Day streak</div></div>
        <div className="tile"><div className="tn">12.4<span className="tu">k</span></div><div className="tl">Wk volume</div></div>
        <div className="tile"><div className="tn">{nutrition.protein}<span className="tu">g</span></div><div className="tl">Protein</div></div>
      </div>

      <button className="pstrip" onClick={() => go('home')}>
        <div className="pdots">{prayers.map((p) => <div key={p.name} className={'pd ' + (p.state === 'done' ? 'done' : p.state === 'next' ? 'next' : '')} />)}</div>
        <div className="pt">Asr <b>15:42</b> · in 23 min</div>
        <IconChevron />
      </button>

      <div className="hadith">
        <div className="glyph">۞</div>
        <div className="htxt"><div className="en">{hadith.en}</div><div className="cite">{hadith.cite}</div></div>
      </div>
    </div>
  )
}
