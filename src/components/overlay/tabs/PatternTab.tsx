import React, { useState } from 'react'
import { Store } from '@/types'

import { useStore } from '@/libraries/store'

import { PatternSection, PresetSection } from './sections/PatternTabSections'

const sections = [
  {
    name: 'Breathing Pattern',
    button: 'Select A Preset Pattern',
    component: PatternSection,
  },
  {
    name: 'Pattern Presets',
    button: 'Set A Custom Pattern',
    component: PresetSection,
  },
]

const PatternTab = () => {
  const settings = useStore((state: Store) => state.settings)
  const [currentSection, setCurrentSection] = useState(0)

  const toggleSection = () => {
    setCurrentSection(() => {
      return 1 - currentSection
    })
  }

  return (
    <>
      <h2>{sections[currentSection].name}</h2>
      <span className='subtitle'>Current Pattern: {settings.pattern.join(' / ')}</span>
      <ul className='sections-viewer'>
        {sections.map((section, index) => {
          return (
            <li
              key={`sections-view-${index}`}
              // prettier-ignore
              className={['sections-view', currentSection === index ? 'open' : 'closed'].join(' ')}
            >
              <section.component />
            </li>
          )
        })}
      </ul>
      <button type='button' onClick={toggleSection} className='link'>
        {sections[currentSection].button}
      </button>
    </>
  )
}

export default PatternTab
