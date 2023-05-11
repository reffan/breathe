import { Container } from 'pixi.js'
import { StaggerOptions, DirectionOptions, EasingOptions } from 'animejs'

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

  scene: Scenes
  background: [number, number, number]
}

export type ProgressEvent = 'runLoop' | 'resetLoop'

export type Progress = {
  countdown: number

  cycle: number
  step: number
  count: number
}

export type Fractions = {
  cycle: number
  step: number
  count: number
  stagger: number
}

export type Scenes = 'debug' | 'aqua'

export type SceneEvent = 'enterScene' | 'exitScene' | 'startScene' | 'stopScene' | 'idleScene' | 'runScene'

export type Scene = {
  container: Container
  resize: (width: number, height: number) => void
  draw: () => void

  enterScene: () => SceneAnimation
  exitScene: () => SceneAnimation
  startScene: () => SceneAnimation
  stopScene: () => SceneAnimation
  idleScene: () => SceneAnimation
  runScene: () => ProgressAnimations

  fractions: Fractions
}

// TODO: figure out true types for 'any'
export type SceneAnimation = {
  targets: any[]
  transformations: any

  identifier?: string

  duration?: number
  stagger?: number | StaggerOptions
  loop?: boolean
  direction?: DirectionOptions
  easing?: EasingOptions
}

export type ProgressAnimations = {
  cycle?: SceneAnimation
  step?: SceneAnimation
  count?: SceneAnimation
}
