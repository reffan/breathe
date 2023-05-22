import React, { useState } from 'react'
import { Store } from '@/types'

import { useStore } from '@/libraries/store'
import { scenes } from '@/utilities/scenes'

import { SceneSection, BackgroundSection } from './sections/SceneTabSections'

const sections = [
  {
    name: 'Scene',
    button: 'Set A Background Color',
    component: SceneSection,
  },
  {
    name: 'Background',
    button: 'Select A Scene',
    component: BackgroundSection,
  },
]

const SceneTab = () => {
  const settings = useStore((state: Store) => state.settings)
  const [currentSection, setCurrentSection] = useState(0)

  const toggleSection = () => {
    setCurrentSection(() => {
      return 1 - currentSection
    })
  }

  const sceneName = () => {
    return (
      scenes.find((scene) => {
        return settings.scene === scene.scene
      })?.name || settings.scene
    )
  }

  return (
    <>
      <h2>{sections[currentSection].name}</h2>
      <span className='subtitle'>Current Scene: {sceneName()}</span>
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

export default SceneTab
