import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { AppContext, Settings, Progress } from '@/types'

import event from '@/libraries/event'
import '@/libraries/loop'
import { defaultSettings, defaultProgress } from '@/utilities/defaults'

const Context = createContext({
  isPlaying: false,
  isMuted: false,

  settings: defaultSettings,
  progress: defaultProgress,
} as AppContext)

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // MARK: Faux progress state! Only for UI update purposes!
  const [progress, setProgress] = useState<Progress>(defaultProgress)

  useEffect(() => {
    // TODO: figure out the type for 'any' event
    event.subscribe('updateSettings', (event: any) => {
      setSettings(event.detail.newSettings)
    })

    // TODO: figure out the type for 'any' event
    event.subscribe('updateProgress', (event: any) => {
      setProgress(event.detail.newProgress)
    })

    return () => {
      event.unsubscribe('updateSettings', () => {
        return
      })

      event.unsubscribe('updateProgress', () => {
        return
      })
    }
  }, [])

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
