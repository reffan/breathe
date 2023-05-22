import React, { ChangeEvent } from 'react'
import { Store, Settings } from '@/types'

import { useStore } from '@/libraries/store'

const SpeedTab = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    const newSettings: Settings = { ...settings }
    newSettings.speed = +event.target.value
    updateSettings(newSettings)
  }

  const changeCycles = (event: ChangeEvent<HTMLInputElement>) => {
    const newSettings: Settings = { ...settings }
    newSettings.cycles = +event.target.value
    updateSettings(newSettings)
  }

  const durationText = () => {
    const countsInCycle = settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const countDuration = 1 / settings.speed
    const totalDuration = Math.round((settings.cycles * countsInCycle * countDuration) / 60)

    return `${totalDuration} min${totalDuration != 1 ? 's' : ''}.`
  }

  return (
    <>
      <h2>Speed & Duration</h2>
      <span className='subtitle'>Current Duration: {durationText()}</span>
      <section>
        <div className='controls'>
          <div className='controls-range'>
            <div className='layout-row'>
              <div className='layout-column'>
                <label htmlFor='speed'>Speed</label>
              </div>
              <div className='layout-column align-end'>
                <span>
                  {settings.speed}
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
              defaultValue={settings.speed}
            />
          </div>
          <div className='controls-range'>
            <div className='layout-row'>
              <div className='layout-column'>
                <label htmlFor='cycles'>Cycles</label>
              </div>
              <div className='layout-column align-end'>
                <span>
                  {settings.cycles}
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
              defaultValue={settings.cycles}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default SpeedTab
