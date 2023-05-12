import React, { ChangeEvent, useContext } from 'react'
import { AppContext, Settings } from '@/types'

import { Context } from '@/Context'

const Speed = () => {
  const context = useContext<AppContext>(Context)

  const changeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    context.setSettings((currentSettings: Settings): Settings => {
      return {
        ...currentSettings,
        speed: +event.target.value,
      }
    })
  }

  const changeCycles = (event: ChangeEvent<HTMLInputElement>) => {
    context.setSettings((currentSettings: Settings): Settings => {
      return {
        ...currentSettings,
        cycles: +event.target.value,
      }
    })
  }

  const durationText = () => {
    const countsInCycle = context.settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const countDuration = 1 / context.settings.speed
    const totalDuration = Math.round((context.settings.cycles * countsInCycle * countDuration) / 60)

    return `${totalDuration} min${totalDuration != 1 ? 's' : ''}.`
  }

  return (
    <>
      <h2>Speed & Duration</h2>
      <span className='subtitle'>Current Duration: {durationText()}</span>
      <div className='controls'>
        <div className='controls-range'>
          <div className='layout-row'>
            <div className='layout-column'>
              <label htmlFor='speed'>Speed</label>
            </div>
            <div className='layout-column align-end'>
              <span>
                {context.settings.speed}
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
            defaultValue={context.settings.speed}
          />
        </div>
        <div className='controls-range'>
          <div className='layout-row'>
            <div className='layout-column'>
              <label htmlFor='cycles'>Cycles</label>
            </div>
            <div className='layout-column align-end'>
              <span>
                {context.settings.cycles}
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
            defaultValue={context.settings.cycles}
          />
        </div>
      </div>
    </>
  )
}

export default Speed
