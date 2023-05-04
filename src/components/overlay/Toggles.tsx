import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context, Settings } from '@/types'

const Toggles = () => {
  const appContext = useContext<Context>(AppContext)

  const togglePlay = () => {
    appContext.setSettings((previousSettings: Settings) => {
      return {
        ...previousSettings,
        isPlaying: !previousSettings.isPlaying,
      }
    })
  }

  const toggleMute = () => {
    appContext.setSettings((previousSettings: Settings) => {
      return {
        ...previousSettings,
        isMuted: !previousSettings.isMuted,
      }
    })
  }

  return (
    <>
      <button onClick={togglePlay}>{!appContext.settings.isPlaying ? 'Play' : 'Stop'}</button>
      <button onClick={toggleMute}>{!appContext.settings.isMuted ? 'Mute' : 'Unmute'}</button>
    </>
  )
}

export default Toggles
