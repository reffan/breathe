import React from 'react'
import type { Store, Settings, Scenes } from '@src/types'

import { useStore } from '@libraries/store'
import { scenes } from '@utilities/scenes'
// import { backgrounds } from '@utilities/backgrounds'
import { background } from '@utilities/labels'

export const SceneSection = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changeScene = (scene: Scenes) => {
    const newSettings: Settings = { ...settings }
    newSettings.scene = scene
    updateSettings(newSettings)
  }

  return (
    <section>
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
                  className='scenes-switch'
                >
                  {scene.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export const BackgroundSection = () => {
  const settings = useStore((state: Store) => state.settings)
  const updateSettings = useStore((state: Store) => state.updateSettings)

  const changeBackground = (value: number, index: number) => {
    const newSettings: Settings = { ...settings }
    newSettings.background[index] = value
    updateSettings(newSettings)
  }

  return (
    <section>
      <div className='controls'>
        {/* MARK: Keep it simple */}
        {/* <ul className='backgrounds-switcher'>
          {backgrounds.map((background, index) => {
            const hsl = `hsl(${backgrounds[index].background[0]}, ${backgrounds[index].background[1]}%, ${backgrounds[index].background[2]}%`
            return (
              <li key={`preset-controls-${index}`}>
                <button
                  type='button'
                  onClick={() => {
                    changeBackground(backgrounds[index].background[0], 0)
                  }}
                  className='backgrounds-switch'
                >
                  <div className='swatch' style={{ backgroundColor: hsl }} />
                </button>
              </li>
            )
          })}
        </ul> */}
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
                value={settings.background[index]}
                onChange={(e) => {
                  changeBackground(+e.target.value, index)
                }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
