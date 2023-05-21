import { create } from 'zustand'
import { Settings, Progress, Store } from '@/types'

import { defaultSettings, defaultProgress } from '@/utilities/defaults'

const useStore = create<Store>()((set) => ({
  isPlaying: false,
  isMuted: false,
  settings: { ...defaultSettings },
  progress: { ...defaultProgress },

  togglePlaying: () => {
    set((state: Store) => ({ isPlaying: !state.isPlaying }))
  },
  toggleMuted: () => {
    set((state: Store) => ({ isMuted: !state.isMuted }))
  },
  updateSettings: (newSettings: Settings) => {
    set(() => ({ settings: { ...newSettings } }))
  },
  updateProgress: (newProgress: Progress) => {
    set(() => ({ progress: { ...newProgress } }))
  },
}))

export { useStore as store, useStore }
export default { store: useStore, useStore }
