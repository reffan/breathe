import React, { ReactNode, createContext, useState } from 'react'
import { Context, Settings, Progress } from '@/types'

// TODO: figure out the proper type for default context
export const AppContext = createContext({} as Context | any)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({
    isPlaying: false,
    isMuted: false,
    speed: 1,
    cycles: 4,
    steps: [4, 0, 8, 0],
    background: [248, 100, 84],
  })

  const [progress, setProgress] = useState<Progress>({
    countdown: 1 + 3 + 1,
    count: 0,
    step: 0,
    cycle: 0,
    timeoutFn: () => {
      return
    },
  })

  const provided: Context = {
    settings,
    setSettings,

    progress,
    setProgress,
  }

  return <AppContext.Provider value={provided}>{children}</AppContext.Provider>
}
