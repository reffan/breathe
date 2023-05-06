import React, { useContext } from 'react'
import { Context, Settings } from '@/types'

import { AppContext } from '@/AppContext'

const Speed = () => {
  const appContext = useContext<Context>(AppContext)

  // TODO: figure out the proper type for events
  const changeSpeed = (e: any) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      return {
        ...previousSettings,
        speed: +e.target.value,
      }
    })
  }

  // TODO: figure out the proper type for events
  const changeCycles = (e: any) => {
    appContext.setSettings((previousSettings: Settings): Settings => {
      return {
        ...previousSettings,
        cycles: +e.target.value,
      }
    })
  }

  const durationText = () => {
    const countsInCycle = appContext.settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const countDuration = 1 / appContext.settings.speed
    const totalDuration = Math.round((appContext.settings.cycles * countsInCycle * countDuration) / 60)

    return `${totalDuration} min${totalDuration != 1 ? 's' : ''}`
  }

  return (
    <>
      <h2>Speed & Duration</h2>
      Current Duration: {durationText()}
      <div className='controls'>
        <div className='controls-range'>
          <div className='layout-row'>
            <div className='layout-column'>
              <label htmlFor='speed'>Speed</label>
            </div>
            <div className='layout-column--align-end'>
              <span>
                {appContext.settings.speed}
                {/* {'x'} */}
              </span>
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
              <span>
                {appContext.settings.cycles}
                {/* {'x'} */}
              </span>
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
