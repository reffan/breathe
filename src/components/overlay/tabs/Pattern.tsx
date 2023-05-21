import React, { ChangeEvent } from 'react'
import { Store, Settings } from '@/types'

import { useStore } from '@/libraries/store'
import { steps } from '@/utilities/labels'

const Pattern = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changePattern = (event: ChangeEvent<HTMLInputElement>, step: number) => {
    const newSettings: Settings = { ...settings }
    newSettings.pattern[step] = +event.target.value
    updateSettings(newSettings)
  }

  return (
    <>
      <h2>Breathing Pattern</h2>
      <span className='subtitle'>Current Pattern: {settings.pattern.join(' : ')}</span>
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
                onChange={(e) => {
                  changePattern(e, index)
                }}
                defaultValue={settings.pattern[index]}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Pattern
