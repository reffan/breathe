import React, { useContext } from 'react'
import { AppContext } from '@/types'

import { Context } from '@/Context'
import { dispatchEvent } from '@/libraries/event'
import { play as playLabel, mute as muteLabel } from '@/utilities/labels'

const Toggles = () => {
  const context = useContext<AppContext>(Context)

  const togglePlay = () => {
    if (!context.isPlaying) {
      dispatchEvent('startScene')
      dispatchEvent('startLoop')
    } else {
      dispatchEvent('stopScene')
      dispatchEvent('resetLoop')
    }

    context.setIsPlaying((currentState: boolean): boolean => {
      return !currentState
    })
  }

  const toggleMute = () => {
    context.setIsMuted((currentState: boolean): boolean => {
      return !currentState
    })
  }

  return (
    <>
      <button type='button' onClick={togglePlay} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !context.isPlaying ? 'start' : 'stop'].join(' ')} />
        </div>
        <span className='toggles-text'>{playLabel[+context.isPlaying]}</span>
      </button>
      <button type='button' onClick={toggleMute} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !context.isMuted ? 'mute' : 'unmute'].join(' ')} />
        </div>
        <span className='toggles-text'>{muteLabel[+context.isMuted]}</span>
      </button>
    </>
  )
}

export default Toggles
