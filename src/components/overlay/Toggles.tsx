import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import { dispatchEvent } from '@/libraries/events'
import { play as playLabel, mute as muteLabel } from '@/utilities/labels'

const Toggles = () => {
  const appContext = useContext<Context>(AppContext)

  const togglePlay = () => {
    if (!appContext.isPlaying) {
      dispatchEvent('startScene')
      dispatchEvent('updateLoop')
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
      <button type='button' onClick={togglePlay}>
        {playLabel[+appContext.isPlaying]}
      </button>
      <button type='button' onClick={toggleMute}>
        {muteLabel[+appContext.isMuted]}
      </button>
    </>
  )
}

export default Toggles
