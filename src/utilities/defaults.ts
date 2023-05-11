import { Settings, Progress, Animation } from '@/types'

const defaultSettings: Settings = {
  speed: 1,
  cycles: 4,
  pattern: [4, 0, 8, 0],

  scene: 'aqua',
  background: [264, 60, 60],
}

const defaultProgress: Progress = {
  countdown: -1,

  cycle: 0,
  step: 0,
  count: -1,
}

const defaultAnimation: Partial<Animation> = {
  duration: 1000,
  stagger: 0,
  loop: false,
  direction: 'normal',
  easing: 'easeInOutQuad',
}

export { defaultSettings, defaultProgress, defaultAnimation }
