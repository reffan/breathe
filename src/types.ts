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

export type AppContextEvents = 'updateSettings' | 'updateProgress'
export type LoopEvents = 'startLoop' | 'resetLoop'

// prettier-ignore
export type SceneEvents = 'enterScene' | 'exitScene' | 'startScene' | 'stopScene' | 'idleScene' | 'loopScene'

export type Events = AppContextEvents | LoopEvents | SceneEvents

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
