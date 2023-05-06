import React, { useContext } from 'react'
import { Context, Settings } from '@/types'

import { AppContext } from '@/AppContext'
import { steps } from '@/libraries/labels'

const Pattern = () => {
  const appContext = useContext<Context>(AppContext)

  // TODO: figure out the proper type for events
  const changePattern = (e: any, step: number) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      const pattern = previousSettings.pattern
      pattern[step] = +e.target.value

      return {
        ...previousSettings,
        pattern,
      }
    })
  }

  return (
    <>
      <h2>Breathing Pattern</h2>
      Current Pattern: {appContext.settings.pattern.join(' / ')}
      <div className='controls'>
        {steps.map((stepLabel, index) => {
          return (
            <div key={`pattern-controls-${index}`} className='controls-range'>
              <div className='layout-row'>
                <div className='layout-column'>
                  <label htmlFor={`pattern-${index}`}>{stepLabel}</label>
                </div>
                <div className='layout-column--align-end'>
                  <span>{appContext.settings.pattern[index]}</span>
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
                defaultValue={appContext.settings.pattern[index]}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Pattern
