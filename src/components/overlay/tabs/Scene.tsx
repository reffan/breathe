import React, { ChangeEvent, useContext } from 'react'
import { AppContext, Settings, Scenes } from '@/types'

import { Context } from '@/Context'
import { scenes } from '@/utilities/scenes'
import { background } from '@/utilities/labels'

const Scene = () => {
  const context = useContext<AppContext>(Context)

  const changeScene = (scene: Scenes) => {
    context.setSettings((currentSettings: Settings): Settings => {
      return {
        ...currentSettings,
        scene: scene,
      }
    })
  }

  const changeBackground = (event: ChangeEvent<HTMLInputElement>, step: number) => {
    context.setSettings((currentSettings: Settings): Settings => {
      const background = currentSettings.background
      background[step] = +event.target.value

      return {
        ...currentSettings,
        background,
      }
    })
  }

  return (
    <>
      <h2>Scene</h2>
      <span className='subtitle'>Current Scene: {context.settings.scene}</span>
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
                  className={['scenes-switch', context.settings.scene === scene.scene ? 'active' : 'inactive'].join(' ')}
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
                    {context.settings.background[index]}
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
                defaultValue={context.settings.background[index]}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Scene
