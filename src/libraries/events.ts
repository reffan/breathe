import { ProgressEvent, SceneEvent } from '@/types'

const subscribeEvent = (name: ProgressEvent | SceneEvent, listener: EventListenerOrEventListenerObject) => {
  document.addEventListener(name, listener)
}

const unsubscribeEvent = (name: ProgressEvent | SceneEvent, listener: EventListenerOrEventListenerObject) => {
  document.removeEventListener(name, listener)
}

const dispatchEvent = (name: ProgressEvent | SceneEvent) => {
  // DEBUG:
  console.debug(`Event: ${name}`)
  document.dispatchEvent(new CustomEvent(name))
}

export { subscribeEvent, unsubscribeEvent, dispatchEvent }
