import React, { useState } from 'react'

// import Debug from './tabs/DebugTab'
import SpeedTab from './tabs/SpeedTab'
import PatternTab from './tabs/PatternTab'
import SceneTab from './tabs/SceneTab'
import AboutTab from './tabs/AboutTab'

// TODO: extract this?
const tabs = [
  // DEBUG:
  // { name: 'DEBUG', component: DebugTab },
  {
    name: 'Speed',
    class: 'tab-speed',
    component: SpeedTab,
  },
  {
    name: 'Pattern',
    class: 'tab-pattern',
    component: PatternTab,
  },
  {
    name: 'Scene',
    class: 'tab-scene',
    component: SceneTab,
  },
  {
    name: 'About',
    class: 'tab-about',
    component: AboutTab,
  },
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
              className={['tabs-view', tab.class, currentTab === index ? 'open' : 'closed'].join(' ')}
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
