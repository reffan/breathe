import { Events } from '@/types'

const subscribe = (name: Events, listener: EventListenerOrEventListenerObject) => {
  document.addEventListener(name, listener)
}

const unsubscribe = (name: Events, listener: EventListenerOrEventListenerObject) => {
  document.removeEventListener(name, listener)
}

const dispatch = (name: Events, data = {}) => {
  // DEBUG:
  // console.debug(`Event: ${name}`, { data })
  document.dispatchEvent(new CustomEvent(name, { detail: data }))
}

export { subscribe, unsubscribe, dispatch }
export default { subscribe, unsubscribe, dispatch }
