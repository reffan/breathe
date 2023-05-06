// TODO: figure out the proper types for setState functions
export type Context = {
  isPlaying: boolean
  setIsPlaying: any
  isMuted: boolean
  setIsMuted: any

  settings: Settings
  setSettings: any
  progress: Progress
  setProgress: any
}

export type Settings = {
  speed: number
  cycles: number
  pattern: [number, number, number, number]

  scene: 'DEBUG'
  background: [number, number, number]
}

export type Progress = {
  countdown: number

  cycle: number
  step: number
  count: number
}
