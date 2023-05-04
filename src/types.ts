// TODO: figure out the proper types for setState functions
export type Context = {
  settings: Settings
  setSettings: any
  progress: Progress
  setProgress: any
}

export type Settings = {
  isPlaying: boolean
  isMuted: boolean
  speed: number
  cycles: number
  steps: [number, number, number, number]
  background: [number, number, number]
}

export type Progress = {
  countdown: number
  count: number
  step: number
  cycle: number
  timeoutFn: () => void
}
