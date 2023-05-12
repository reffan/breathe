import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import { dispatchEvent } from '@/libraries/event'
import { play as playLabel, mute as muteLabel } from '@/utilities/labels'

const Toggles = () => {
  const appContext = useContext<Context>(AppContext)

  const togglePlay = () => {
    if (!appContext.isPlaying) {
      dispatchEvent('startScene')
      dispatchEvent('startLoop')
    } else {
      dispatchEvent('stopScene')
      dispatchEvent('resetLoop')
    }

    appContext.setIsPlaying((currentState: boolean): boolean => {
      return !currentState
    })
  }

  const toggleMute = () => {
    appContext.setIsMuted((currentState: boolean): boolean => {
      return !currentState
    })
  }

  return (
    <>
      <button type='button' onClick={togglePlay} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !appContext.isPlaying ? 'start' : 'stop'].join(' ')} />
        </div>
        <span className='toggles-text'>{playLabel[+appContext.isPlaying]}</span>
      </button>
      <button type='button' onClick={toggleMute} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !appContext.isMuted ? 'mute' : 'unmute'].join(' ')} />
        </div>
        <span className='toggles-text'>{muteLabel[+appContext.isMuted]}</span>
      </button>
    </>
  )
}

export default Toggles
