import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context, Settings } from '@/types'

const Speed = () => {
  const appContext = useContext<Context>(AppContext)

  const changeSpeed = (e: any) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      return {
        ...previousSettings,
        speed: +e.target.value,
      }
    })
  }

  const changeCycles = (e: any) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      return {
        ...previousSettings,
        cycles: +e.target.value,
      }
    })
  }

  return (
    <>
      <h2>Speed & Duration</h2>
      Current Duration: {0}
      <div className='controls'>
        <div className='controls-range'>
          <div className='layout-row'>
            <div className='layout-column'>
              <label htmlFor='speed'>Speed</label>
            </div>
            <div className='layout-column--align-end'>
              <span>{appContext.settings.speed}x</span>
            </div>
          </div>
          <input
            id='speed'
            name='speed'
            type='range'
            step='0.1'
            min='0.5'
            max='2.0'
            onChange={changeSpeed}
            defaultValue={appContext.settings.speed}
          />
        </div>
        <div className='controls-range'>
          <div className='layout-row'>
            <div className='layout-column'>
              <label htmlFor='cycles'>Cycles</label>
            </div>
            <div className='layout-column--align-end'>
              <span>{appContext.settings.cycles}x</span>
            </div>
          </div>
          <input
            id='cycles'
            name='cycles'
            type='range'
            step='4'
            min='4'
            max='240'
            onChange={changeCycles}
            defaultValue={appContext.settings.cycles}
          />
        </div>
      </div>
    </>
  )
}

export default Speed
