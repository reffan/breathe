import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { Context, Settings, Progress } from '@/types'

import { defaultSettings, defaultProgress } from '@/libraries/defaults'

// TODO: figure out the proper type for default context
const AppContext = createContext({} as Context | any)

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [progress, setProgress] = useState<Progress>(defaultProgress)

  // useEffect(() => {
  //   if (isPlaying) {
  //     console.log('isPlaying YAY')
  //   } else {
  //     console.log('isPlaying NAY')
  //   }

  //   return
  // }, [isPlaying])

  // useEffect(() => {
  //   if (isMuted) {
  //     console.log('isMuted YAY')
  //   } else {
  //     console.log('isMuted NAY')
  //   }

  //   return
  // }, [isMuted])

  const provided: Context = {
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,

    settings,
    setSettings,
    progress,
    setProgress,
  }

  return <AppContext.Provider value={provided}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
