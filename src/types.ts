import { Dispatch, SetStateAction } from 'react'
import { Container } from 'pixi.js'
import { StaggerOptions, DirectionOptions, EasingOptions } from 'animejs'

export type AppContext = {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  isMuted: boolean
  setIsMuted: Dispatch<SetStateAction<boolean>>

  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  progress: Progress
  setProgress: Dispatch<SetStateAction<Progress>>
}

export type AppContextEvent = 'updateSettings' | 'updateProgress'

export type Settings = {
  speed: number
  cycles: number
  pattern: [number, number, number, number]

  scene: Scenes
  background: [number, number, number]
}

export type Progress = {
  countdown: number

  cycle: number
  step: number
  count: number
}

// prettier-ignore
export type LoopEvent = 'startLoop' | 'resetLoop'

// prettier-ignore
export type SceneEvent = 'enterScene' | 'exitScene' | 'startScene' | 'stopScene' | 'idleScene' | 'loopScene'

// prettier-ignore
export type SceneAnimation = 'enterAnimation' | 'exitAnimation' | 'startAnimation' | 'stopAnimation' | 'idleAnimation' | 'loopAnimation'

export type SceneComponent = {
  container: Container
  resizeScene: (width: number, height: number) => void
  drawScene: () => void

  enterAnimation: () => Animation
  exitAnimation: () => Animation
  startAnimation: () => Animation
  stopAnimation: () => Animation
  idleAnimation: () => Animation
  loopAnimation: () => LoopAnimations

  durationFractions: DurationFractions
}

// prettier-ignore
export type Scenes = 'DEBUG' | 'aqua'

export type Durations = {
  cycle: number
  step: number
  count: number
  stagger: number
}

export type DurationFractions = Durations

// TODO: figure out the type for 'any' targets and transformations
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

export type LoopAnimations = {
  cycle?: Animation
  step?: Animation
  count?: Animation
}
