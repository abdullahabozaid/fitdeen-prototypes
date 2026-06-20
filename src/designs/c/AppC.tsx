import { useState } from 'react'
import './c.css'
import Home from './screens/Home'
import Train from './screens/Train'
import Nutrition from './screens/Nutrition'
import Coach from './screens/Coach'
import Profile from './screens/Profile'
import Onboarding from './screens/Onboarding'
import { IconHome, IconDumbbell, IconApple, IconSparkle, IconUser } from '../a/icons'

const tabs = [
  { id: 'home', label: 'Today', Icon: IconHome },
  { id: 'train', label: 'Train', Icon: IconDumbbell },
  { id: 'nutrition', label: 'Food', Icon: IconApple },
  { id: 'coach', label: 'Coach', Icon: IconSparkle },
  { id: 'profile', label: 'You', Icon: IconUser },
]

export default function AppC() {
  const [tab, setTab] = useState('home')
  const [onboarding, setOnboarding] = useState(false)
  const go = (t: string) => setTab(t)

  return (
    <div className="phone">
      <div className="dC">
        {onboarding ? (
          <Onboarding onDone={() => setOnboarding(false)} />
        ) : (
          <>
            <div className="dC-scroll" key={tab}>
              {tab === 'home' && <Home go={go} />}
              {tab === 'train' && <Train go={go} />}
              {tab === 'nutrition' && <Nutrition go={go} />}
              {tab === 'coach' && <Coach />}
              {tab === 'profile' && <Profile go={go} onReplayOnboarding={() => setOnboarding(true)} />}
            </div>
            <nav className="tabbar">
              {tabs.map((t) => (
                <button key={t.id} className={'tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
                  <t.Icon /><span>{t.label}</span>
                </button>
              ))}
            </nav>
          </>
        )}
      </div>
    </div>
  )
}
