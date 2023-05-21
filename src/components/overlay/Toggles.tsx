import React from 'react'
import { Store } from '@/types'

import { useStore } from '@/libraries/store'
import { event } from '@/libraries/event'
import { play as playLabel, mute as muteLabel } from '@/utilities/labels'

const Toggles = () => {
  const isPlaying = useStore((state: Store) => state.isPlaying)
  const isMuted = useStore((state: Store) => state.isMuted)
  const [togglePlaying, toggleMuted] = useStore((state: Store) => [state.togglePlaying, state.toggleMuted])

  const togglePlay = () => {
    if (!isPlaying) {
      event.dispatch('startScene')
      event.dispatch('startLoop')
    } else {
      event.dispatch('stopScene')
      event.dispatch('resetLoop')
    }

    togglePlaying()
  }

  const toggleMute = () => {
    toggleMuted()
  }

  return (
    <>
      <button type='button' onClick={togglePlay} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !isPlaying ? 'start' : 'stop'].join(' ')} />
        </div>
        <span className='toggles-text'>{playLabel[+isPlaying]}</span>
      </button>
      <button type='button' onClick={toggleMute} className='toggles-button'>
        <div className='toggles-indicator'>
          <span className={['icon', !isMuted ? 'mute' : 'unmute'].join(' ')} />
        </div>
        <span className='toggles-text'>{muteLabel[+isMuted]}</span>
      </button>
    </>
  )
}

export default Toggles
