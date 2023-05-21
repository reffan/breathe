import { LoopEvents, SceneEvents } from '@/types'

const event = {
  subscribe: (name: LoopEvents | SceneEvents, listener: EventListenerOrEventListenerObject) => {
    document.addEventListener(name, listener)
  },
  unsubscribe: (name: LoopEvents | SceneEvents, listener: EventListenerOrEventListenerObject) => {
    document.removeEventListener(name, listener)
  },
  dispatch: (name: LoopEvents | SceneEvents) => {
    // DEBUG:
    // console.debug(`Event: ${name}`)
    document.dispatchEvent(new CustomEvent(name))
  },
}

export { event }
export default { event }
