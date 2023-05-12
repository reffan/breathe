import React, { useState } from 'react'

// import Debug from './tabs/Debug'
import Speed from './tabs/Speed'
import Pattern from './tabs/Pattern'
import Scene from './tabs/Scene'
import About from './tabs/About'

// TODO: extract this?
const tabs = [
  // DEBUG:
  // { name: 'DEBUG', component: Debug },
  { name: 'Speed', component: Speed },
  { name: 'Pattern', component: Pattern },
  { name: 'Scene', component: Scene },
  { name: 'About', component: About },
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
            <li
              key={`tabs-view-${index}`}
              // prettier-ignore
              className={['tabs-view', currentTab === index ? 'open' : 'closed'].join(' ')}
            >
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
                type='button'
                onClick={() => {
                  switchTab(index)
                }}
                // prettier-ignore
                className={['tabs-switch', currentTab === index ? 'active' : 'inactive'].join(' ')}
              >
                {tab.name}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Tabs
