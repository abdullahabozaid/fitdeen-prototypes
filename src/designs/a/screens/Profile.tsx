import { useState } from 'react'
import './profile.css'
import { user, profile, achievements } from '../../../mock/data'
import { IconChevron, IconCheck } from '../icons'

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
        <div className="eyebrow">Profile</div>
      </div>

      <div className="prof-head">
        <div className="prof-av">
          {user.initials}
          <span className="prof-lvl">L{user.level}</span>
        </div>
        <div className="prof-id">
          <div className="prof-name">{user.name}</div>
          <div className="prof-handle">@abdullah · Level {user.level}</div>
        </div>
      </div>

      <div className="prof-stats">
        <div className="prof-stat">
          <b>{profile.sessions}</b>
          <span>Sessions</span>
        </div>
        <div className="prof-stat">
          <b>{profile.streak}</b>
          <span>Streak</span>
        </div>
        <div className="prof-stat">
          <b>{profile.days}</b>
          <span>Days</span>
        </div>
      </div>

      <div className="sec">
        <div className="eyebrow">Achievements</div>
        <span className="prof-count">{unlocked} / {achievements.length}</span>
      </div>
      <div className="prof-grid">
        {stars.map((name) => {
          const a = achievements.find((x) => x.name === name)
          const on = !!a?.unlocked
          return (
            <div className={'prof-badge' + (on ? ' on' : '')} key={name}>
              <div className="prof-girih" aria-hidden />
              <div className="prof-bname">{name}</div>
              <div className="prof-bhint">{on ? hint[name] : 'Locked'}</div>
            </div>
          )
        })}
      </div>

      <div className="prof-banner">
        <div className="eyebrow ban-ey">Fitdeen Plus</div>
        <h3>Train with intention.</h3>
        <p>Unlock full programs, adhan timing, and the coach.</p>
        <button className="prof-cta">Go Plus</button>
      </div>

      <div className="sec">
        <div className="eyebrow">Settings</div>
      </div>
      <div className="prof-list">
        {settings.map((row) => (
          <button
            key={row.id}
            className={'prof-row' + (row.id === 'signout' ? ' danger' : '') + (tapped === row.id ? ' active' : '')}
            onClick={() => onRow(row.id)}
          >
            <span className="prof-rlabel">{row.label}</span>
            {tapped === row.id ? <span className="prof-tick"><IconCheck /></span> : <span className="chev"><IconChevron /></span>}
          </button>
        ))}
      </div>
    </div>
  )
}
