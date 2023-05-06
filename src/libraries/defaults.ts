import { Settings, Progress } from '@/types'

const defaultSettings: Settings = {
  speed: 1,
  cycles: 4,
  pattern: [4, 0, 8, 0],
  scene: 'DEBUG',
  background: [264, 60, 60],
}

const defaultProgress: Progress = {
  countdown: 3 + 1 + 1,
  cycle: 0,
  step: 0,
  count: 0,
}

export { defaultSettings, defaultProgress }
