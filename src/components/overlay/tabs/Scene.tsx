import React, { useContext } from 'react'
import { Context, Settings } from '@/types'

import { AppContext } from '@/AppContext'
import { background } from '@/libraries/labels'

const Scene = () => {
  const appContext = useContext<Context>(AppContext)

  // TODO: figure out the proper type for events
  const changeBackground = (e: any, step: number) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      const background = previousSettings.background
      background[step] = +e.target.value

      return {
        ...previousSettings,
        background,
      }
    })
  }

  return (
    <>
      <h2>Scene</h2>
      Current Scene: {appContext.settings.scene}
      <div className='controls'>
        {background.map((valueLabel, index) => {
          return (
            <div key={`scene-controls-${index}`} className='controls-range'>
              <div className='layout-row'>
                <div className='layout-column'>
                  <label htmlFor={`background-${index}`}>{valueLabel}</label>
                </div>
                <div className='layout-column--align-end'>
                  <span>
                    {appContext.settings.background[index]}
                    {/* {index === 0 ? '°' : '%'} */}
                  </span>
                </div>
              </div>
              <input
                id={`background-${index}`}
                name={`background-${index}`}
                type='range'
                step='1'
                min='0'
                max={index === 0 ? 360 : 100}
                onChange={(e) => {
                  changeBackground(e, index)
                }}
                defaultValue={appContext.settings.background[index]}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Scene
