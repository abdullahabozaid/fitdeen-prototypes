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

const hint: Record<string, string> = {
  'First Rep': 'Logged',
  '7-Day Streak': 'Held',
  'Fajr Flow': 'Prayed',
  Century: '100 sessions',
  Ramadan: 'Train through',
  'PR Machine': '10 PRs',
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
      <div className="cover prof-cover">
        <div className="ctop"><div className="ce">Profile</div></div>
        <div className="prof-avbig">
          {user.initials}
          <span className="prof-lvltag mono">L{user.level}</span>
        </div>
        <h1>{user.name}</h1>
        <div className="cm prof-handle">@abdullah · Level {user.level}</div>
      </div>

      <div className="bigstats dC-stagger">
        <div className="bstat"><b>{profile.sessions}</b><span>Sessions</span></div>
        <div className="bstat"><b>{profile.streak}</b><span>Streak</span></div>
        <div className="bstat"><b>{profile.days}</b><span>Days</span></div>
      </div>

      <div className="prof-secpad">
        <div className="prof-sechead">
          <h2 className="prof-h2">Achievements</h2>
          <span className="prof-count mono">{unlocked} / {achievements.length}</span>
        </div>
        <div className="prof-grid dC-stagger">
          {achievements.map((a) => {
            const on = a.unlocked
            return (
              <div className={'prof-badge' + (on ? ' on' : '')} key={a.name}>
                <span className="prof-girih" aria-hidden />
                <div className="prof-bname">{a.name}</div>
                <div className="prof-bhint">{on ? hint[a.name] : 'Locked'}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="prof-banner">
        <div className="ce prof-ban-ey">Fitdeen Plus</div>
        <h2 className="prof-ban-h">Train with intention.</h2>
        <p>Full programs, adhan timing, and the coach.</p>
        <button className="prof-cta">Go Plus</button>
      </div>

      <div className="prof-secpad">
        <h2 className="prof-h2 prof-set-h">Settings</h2>
        <div className="prof-list dC-stagger">
          {settings.map((row) => (
            <button
              key={row.id}
              className={'prof-row' + (row.id === 'signout' ? ' danger' : '') + (tapped === row.id ? ' active' : '')}
              onClick={() => onRow(row.id)}
            >
              <span className="prof-rlabel">{row.label}</span>
              {tapped === row.id ? <span className="prof-tick"><IconCheck /></span> : <span className="prof-chev"><IconChevron /></span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
