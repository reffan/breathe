import React, { ChangeEvent } from 'react'
import { Store, Settings, Scenes } from '@/types'

import { useStore } from '@/libraries/store'
import { scenes } from '@/utilities/scenes'
import { background } from '@/utilities/labels'

const Scene = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changeScene = (scene: Scenes) => {
    const newSettings: Settings = { ...settings }
    newSettings.scene = scene
    updateSettings(newSettings)
  }

  const changeBackground = (event: ChangeEvent<HTMLInputElement>, value: number) => {
    const newSettings: Settings = { ...settings }
    newSettings.background[value] = +event.target.value
    updateSettings(newSettings)
  }

  return (
    <>
      <h2>Scene</h2>
      <span className='subtitle'>Current Scene: {settings.scene}</span>
      <div className='controls'>
        <ul className='scenes-switcher'>
          {scenes.map((scene, index) => {
            return (
              <li key={`scenes-switch-${index}`}>
                <button
                  type='button'
                  onClick={() => {
                    changeScene(scene.scene)
                  }}
                  // prettier-ignore
                  className={['scenes-switch', settings.scene === scene.scene ? 'active' : 'inactive'].join(' ')}
                >
                  {scene.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='controls'>
        {background.map((valueLabel, index) => {
          return (
            <div key={`scene-controls-${index}`} className='controls-range'>
              <div className='layout-row'>
                <div className='layout-column'>
                  <label htmlFor={`background-${index}`}>{valueLabel}</label>
                </div>
                <div className='layout-column align-end'>
                  <span>
                    {settings.background[index]}
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
                defaultValue={settings.background[index]}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Scene
