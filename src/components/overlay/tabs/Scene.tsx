import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context, Settings } from '@/types'

const background = ['Hue', 'Saturation', 'Lightness']

const Scene = () => {
  const appContext = useContext<Context>(AppContext)

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
        {background.map((value, index) => {
          return (
            <div key={`scene-controls-${index}`} className='controls-range'>
              <div className='layout-row'>
                <div className='layout-column'>
                  <label htmlFor={`background-${index}`}>{value}</label>
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
