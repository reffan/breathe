import type { Container } from 'pixi.js'
import type { StaggerOptions, DirectionOptions, EasingOptions } from 'animejs'

export type Store = {
  isPlaying: boolean
  isMuted: boolean
  settings: Settings
  progress: Progress

  togglePlaying: () => void
  toggleMuted: () => void
  updateSettings: (newSettings: Settings) => void
  updateProgress: (newProgress: Progress) => void
}
export type Settings = {
  speed: number
  cycles: number
  pattern: Pattern
  scene: Scenes
  background: Background
}

export type Progress = {
  countdown: number
  cycle: number
  step: number
  count: number
}

export type Pattern = [number, number, number, number]
export type Background = [number, number, number]

export type LoopEvents = 'startLoop' | 'resetLoop'
export type SceneEvents = 'enterScene' | 'exitScene' | 'startScene' | 'stopScene' | 'idleScene' | 'loopScene'

export type Scene = {
  container: () => Container
  durationFractions: DurationFractions

  resizeScene: (width: number, height: number) => void
  drawScene: () => void

  stages: {
    enterScene: { sound?: Sounds; animation: Animation }
    exitScene: { sound?: Sounds; animation: Animation }
    startScene: { sound?: Sounds; animation: Animation }
    stopScene: { sound?: Sounds; animation: Animation }
    idleScene: { sound?: Sounds; animation: Animation }
    loopScene: {
      cycle?: { sound?: Sounds; animation: Animation }
      step?: { sound?: Sounds; animation: Animation }
      count?: { sound?: Sounds; animation: Animation }
    }
  }
}

export type Durations = {
  cycle: number
  step: number
  count: number
  stagger: number
}

export type DurationFractions = Durations

// TODO: figure out the type for 'any' targets
// TODO: figure out the type for 'any' transformations
export type Animation = {
  targets: any[]
  transformations: any

  identifier?: string

  duration?: number
  stagger?: number | StaggerOptions
  loop?: boolean
  direction?: DirectionOptions
  easing?: EasingOptions
}

export type Scenes = 'DEBUG' | 'aqua'

export type Sounds =
  | 'kalimba-b3'
  | 'kalimba-a4'
  | 'kalimba-b4'
  | 'kalimba-d4'
  | 'kalimba-e4'
  | 'kalimba-f4'
  | 'kalimba-c5'
  | 'kalimba-e5'
