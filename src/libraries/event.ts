import { AppContextEvent, LoopEvent, SceneEvent } from '@/types'

const subscribe = (name: AppContextEvent | LoopEvent | SceneEvent, listener: EventListenerOrEventListenerObject) => {
  document.addEventListener(name, listener)
}

const unsubscribe = (name: AppContextEvent | LoopEvent | SceneEvent, listener: EventListenerOrEventListenerObject) => {
  document.removeEventListener(name, listener)
}

const dispatch = (name: AppContextEvent | LoopEvent | SceneEvent, data = {}) => {
  // DEBUG:
  // console.debug(`Event: ${name}`, { data })

  document.dispatchEvent(new CustomEvent(name, { detail: data }))
}

export { subscribe, unsubscribe, dispatch }
export default { subscribe, unsubscribe, dispatch }
