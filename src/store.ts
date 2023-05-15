import { Progress } from '@/types'

import event from '@/libraries/event'
import { defaultProgress } from '@/utilities/defaults'

// MARK: Source of truth for progress state!
let progress: Progress = defaultProgress

const getProgress = () => {
  return progress
}

const setProgress = (newProgress: Progress) => {
  progress = newProgress
  event.dispatch('updateProgress', { newProgress: newProgress })
}

export { getProgress, setProgress }
export default { getProgress, setProgress }
