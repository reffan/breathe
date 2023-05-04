import React, { useState } from 'react'

import Debug from './tabs/Debug'
import Speed from './tabs/Speed'
import Pattern from './tabs/Pattern'
import Scene from './tabs/Scene'
import About from './tabs/About'

const tabs = [
  { label: 'DEBUG', component: Debug },
  { label: 'Speed', component: Speed },
  { label: 'Pattern', component: Pattern },
  { label: 'Scene', component: Scene },
  { label: 'About', component: About },
]

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const switchTab = (index: number) => {
    setCurrentTab(() => {
      return index
    })
  }

  return (
    <>
      <ul className='tabs-viewer'>
        {tabs.map((tab, index) => {
          return (
            <li key={`tabs-view-${index}`} className={currentTab === index ? 'tabs-view--open' : 'tabs-view--closed'}>
              <tab.component />
            </li>
          )
        })}
      </ul>
      <ul className='tabs-switcher'>
        {tabs.map((tab, index) => {
          return (
            <li key={`tabs-switch-${index}`}>
              <button
                className={currentTab === index ? 'tabs-switch--active' : 'tabs-switch--inactive'}
                onClick={() => {
                  switchTab(index)
                }}
              >
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Tabs
