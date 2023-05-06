import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import { useLoop } from '@/libraries/loop'
import { play as playLabel, mute as muteLabel } from '@/libraries/labels'

const Toggles = () => {
  const appContext = useContext<Context>(AppContext)
  const { runLoop, resetLoop } = useLoop()

  const togglePlay = () => {
    resetLoop()

    if (!appContext.isPlaying) {
      runLoop()
    }

    appContext.setIsPlaying((previousState: boolean): boolean => {
      return !previousState
    })
  }

  const toggleMute = () => {
    appContext.setIsMuted((previousState: boolean): boolean => {
      return !previousState
    })
  }

  return (
    <>
      <button onClick={togglePlay}>{playLabel[+appContext.isPlaying]}</button>
      <button onClick={toggleMute}>{muteLabel[+appContext.isMuted]}</button>
    </>
  )
}

export default Toggles
