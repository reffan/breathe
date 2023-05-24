import React from 'react'
import type { Store, Settings } from '@src/types'

import { useStore } from '@libraries/store'
import { patterns } from '@utilities/patterns'
import { steps } from '@utilities/labels'

export const PatternSection = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changePattern = (value: number, index: number) => {
    const newSettings: Settings = { ...settings }
    newSettings.pattern[index] = value
    updateSettings(newSettings)
  }

  return (
    <section>
      <div className='controls'>
        {steps.map((stepLabel, index) => {
          return (
            <div key={`pattern-controls-${index}`} className='controls-range'>
              <div className='layout-row'>
                <div className='layout-column'>
                  <label htmlFor={`pattern-${index}`}>{stepLabel}</label>
                </div>
                <div className='layout-column align-end'>
                  <span>{settings.pattern[index]}</span>
                </div>
              </div>
              <input
                id={`pattern-${index}`}
                name={`pattern-${index}`}
                type='range'
                step='1'
                min='0'
                max='16'
                value={settings.pattern[index]}
                onChange={(e) => {
                  changePattern(+e.target.value, index)
                }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export const PresetSection = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changePattern = (preset: number) => {
    const newSettings: Settings = { ...settings }
    newSettings.pattern = patterns[preset].pattern
    updateSettings(newSettings)
  }

  return (
    <section>
      <div className='controls'>
        <ul className='patterns-switcher'>
          {patterns.map((pattern, index) => {
            return (
              <li key={`preset-controls-${index}`}>
                <button
                  type='button'
                  onClick={() => {
                    changePattern(index)
                  }}
                  className='patterns-switch'
                >
                  {pattern.name}
                  <br />
                  {pattern.pattern.join(' / ')}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
