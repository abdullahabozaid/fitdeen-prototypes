import { useState } from 'react'
import './b.css'
import Home from './screens/Home'
import Train from './screens/Train'
import Nutrition from './screens/Nutrition'
import Coach from './screens/Coach'
import Profile from './screens/Profile'
import Onboarding from './screens/Onboarding'
import { IconHome, IconDumbbell, IconApple, IconUser, IconPlus, IconSparkle } from '../a/icons'

export default function AppB() {
  const [tab, setTab] = useState('home')
  const [onboarding, setOnboarding] = useState(false)
  const [sheet, setSheet] = useState(false)
  const go = (t: string) => { setTab(t); setSheet(false) }

  return (
    <div className="phone">
      <div className="dB">
        {onboarding ? (
          <Onboarding onDone={() => setOnboarding(false)} />
        ) : (
          <>
            <div className="dB-scroll" key={tab}>
              {tab === 'home' && <Home go={go} />}
              {tab === 'train' && <Train go={go} />}
              {tab === 'nutrition' && <Nutrition go={go} />}
              {tab === 'coach' && <Coach />}
              {tab === 'profile' && <Profile go={go} onReplayOnboarding={() => setOnboarding(true)} />}
            </div>

            <nav className="tabbar">
              <button className={'tab' + (tab === 'home' ? ' active' : '')} onClick={() => go('home')}><IconHome /><span>Today</span></button>
              <button className={'tab' + (tab === 'train' ? ' active' : '')} onClick={() => go('train')}><IconDumbbell /><span>Train</span></button>
              <button className="fab" onClick={() => setSheet(true)}><IconPlus size={24} /></button>
              <button className={'tab' + (tab === 'nutrition' ? ' active' : '')} onClick={() => go('nutrition')}><IconApple /><span>Nutrition</span></button>
              <button className={'tab' + (tab === 'profile' ? ' active' : '')} onClick={() => go('profile')}><IconUser /><span>Profile</span></button>
            </nav>
            <div className="home-ind" />

            {sheet && (
              <div className="sheet-back" onClick={() => setSheet(false)}>
                <div className="sheet" onClick={(e) => e.stopPropagation()}>
                  <h4>Quick actions</h4>
                  <button className="qopt" onClick={() => go('nutrition')}><IconApple size={20} /> Log a meal</button>
                  <button className="qopt" onClick={() => go('train')}><IconDumbbell size={20} /> Start a workout</button>
                  <button className="qopt" onClick={() => go('coach')}><IconSparkle size={20} /> Ask the coach</button>
                  <button className="qopt" onClick={() => setSheet(false)}><IconPlus size={20} /> Log water</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
