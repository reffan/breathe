import React, { ReactNode, createContext, useState } from 'react'
import { AppContext, Settings, Progress } from '@/types'

import { defaultSettings, defaultProgress } from '@/utilities/defaults'

// TODO: figure out the type for default context
const Context = createContext({} as AppContext | any)

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [progress, setProgress] = useState<Progress>(defaultProgress)

  const provided: AppContext = {
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,

    settings,
    setSettings,
    progress,
    setProgress,
  }

  return <Context.Provider value={provided}>{children}</Context.Provider>
}

export { Context, ContextProvider }
