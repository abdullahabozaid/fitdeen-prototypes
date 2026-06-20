import { useState } from 'react'
import './profile.css'
import { user, profile, achievements } from '../../../mock/data'
import { IconChevron, IconCheck } from '../../a/icons'

const settings = [
  { id: 'account', label: 'Account' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'adhan', label: 'Prayer & Adhan' },
  { id: 'replay', label: 'Replay onboarding' },
  { id: 'signout', label: 'Sign out' },
]

const stars = ['First Rep', '7-Day Streak', 'Fajr Flow', 'Century', 'Ramadan', 'PR Machine']
const hint: Record<string, string> = {
  'First Rep': 'Logged', '7-Day Streak': 'Held', 'Fajr Flow': 'Prayed',
  Century: '100 sessions', Ramadan: 'Train through', 'PR Machine': '10 PRs',
}

const C = 2 * Math.PI * 30
const lvlPct = 64 // progress to next level

export default function Profile({ go, onReplayOnboarding }: { go: (t: string) => void; onReplayOnboarding: () => void }) {
  void go
  const [tapped, setTapped] = useState<string | null>(null)

  const onRow = (id: string) => {
    if (id === 'replay') { onReplayOnboarding(); return }
    setTapped((v) => (v === id ? null : id))
  }

  const unlocked = achievements.filter((a) => a.unlocked).length

  return (
    <div className="pad">
      <div className="top">
        <div className="greet"><small>Account</small>Profile</div>
      </div>

      {/* identity card with level ring */}
      <div className="b-prof-head">
        <div className="b-prof-ring">
          <svg width="76" height="76" viewBox="0 0 76 76">
            <circle cx="38" cy="38" r="30" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
            <circle cx="38" cy="38" r="30" fill="none" stroke="url(#bprof1)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - lvlPct / 100)} transform="rotate(-90 38 38)" />
            <defs><linearGradient id="bprof1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34d399" /><stop offset="1" stopColor="#10b981" /></linearGradient></defs>
          </svg>
          <div className="b-prof-init">{user.initials}</div>
        </div>
        <div className="b-prof-id">
          <div className="b-prof-name">{user.name}</div>
          <div className="b-prof-handle">@abdullah</div>
          <div className="b-prof-lvl"><span className="mono">L{user.level}</span> · {lvlPct}% to L{user.level + 1}</div>
        </div>
      </div>

      {/* data tiles — Sessions / Streak / Days */}
      <div className="tiles">
        <div className="tile"><div className="tn">{profile.sessions}</div><div className="tl">Sessions</div></div>
        <div className="tile"><div className="tn">{profile.streak}<span className="tu">d</span></div><div className="tl">Streak</div></div>
        <div className="tile"><div className="tn">{profile.days}</div><div className="tl">Days</div></div>
      </div>

      {/* achievements */}
      <div className="b-prof-sec">
        <div className="eyebrow">Achievements</div>
        <span className="b-prof-count mono">{unlocked} / {achievements.length}</span>
      </div>
      <div className="b-prof-grid">
        {stars.map((name) => {
          const a = achievements.find((x) => x.name === name)
          const on = !!a?.unlocked
          return (
            <div className={'b-prof-badge' + (on ? ' on' : '')} key={name}>
              <div className="b-prof-girih" aria-hidden />
              <div className="b-prof-bname">{name}</div>
              <div className="b-prof-bhint">{on ? hint[name] : 'Locked'}</div>
            </div>
          )
        })}
      </div>

      {/* premium banner — the single emerald pop */}
      <div className="b-prof-banner">
        <div className="eyebrow ban-ey">Fitdeen Plus</div>
        <h3>Train with intention.</h3>
        <p>Unlock full programs, adhan timing, and the coach.</p>
        <button className="b-prof-cta">Go Plus</button>
      </div>

      {/* settings */}
      <div className="b-prof-sec">
        <div className="eyebrow">Settings</div>
      </div>
      <div className="b-prof-list">
        {settings.map((row) => (
          <button
            key={row.id}
            className={'b-prof-row' + (row.id === 'signout' ? ' danger' : '') + (tapped === row.id ? ' active' : '')}
            onClick={() => onRow(row.id)}
          >
            <span className="b-prof-rlabel">{row.label}</span>
            {tapped === row.id ? <span className="b-prof-tick"><IconCheck /></span> : <span className="b-prof-chev"><IconChevron /></span>}
          </button>
        ))}
      </div>
    </div>
  )
}
