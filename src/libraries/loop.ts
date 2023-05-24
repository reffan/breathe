import type { Progress, LoopEvents, Durations, DurationFractions } from '@src/types'

import { store } from '@libraries/store'
import { event } from '@libraries/event'
import { TOTAL_COUNTDOWN_COUNTS, TOTAL_PATTERN_STEPS } from '@utilities/constants'
import { defaultProgress } from '@utilities/defaults'

type State = {
  loopIntervalFn?: ReturnType<typeof setInterval>
}

const state: State = {
  loopIntervalFn: undefined,
}

const advance = {
  countdown: () => {
    const newProgress: Progress = { ...store.getState().progress }

    newProgress.countdown++
    store.getState().updateProgress(newProgress)
  },
  count: () => {
    const newProgress: Progress = { ...store.getState().progress }

    // prettier-ignore
    const shouldAdvanceCount = true
    if (shouldAdvanceCount) {
      newProgress.count++
    }

    // prettier-ignore
    const shouldAdvanceStep = newProgress.count > store.getState().settings.pattern[newProgress.step] - 1
    if (shouldAdvanceStep) {
      newProgress.step++

      // MARK: Skip to next step if step has no counts in it
      // TODO: check this logic

      // prettier-ignore
      const shouldSkipStep = store.getState().settings.pattern[newProgress.step] == 0 && newProgress.step < TOTAL_PATTERN_STEPS
      while (shouldSkipStep) {
        newProgress.step++
      }

      newProgress.count = 0
    }

    // prettier-ignore
    const shouldAdvanceCycle = newProgress.step >= TOTAL_PATTERN_STEPS
    if (shouldAdvanceCycle) {
      newProgress.cycle++
      newProgress.step = 0
    }

    store.getState().updateProgress(newProgress)

    if (store.getState().progress.cycle < store.getState().settings.cycles) {
      event.dispatch('loopScene')
    }
  },
}

const loopEvents = {
  startLoop: () => {
    clearInterval(state.loopIntervalFn)
    loopEvents.updateLoop()

    const countDuration = 1000 / store.getState().settings.speed

    state.loopIntervalFn = setInterval(() => {
      loopEvents.updateLoop()
    }, countDuration)
  },
  updateLoop: () => {
    if (store.getState().progress.countdown < TOTAL_COUNTDOWN_COUNTS) {
      advance.countdown()
    }

    if (store.getState().progress.countdown >= TOTAL_COUNTDOWN_COUNTS) {
      if (store.getState().progress.cycle < store.getState().settings.cycles) {
        advance.count()
      } else {
        clearInterval(state.loopIntervalFn)
        loopEvents.resetLoop()

        const countDuration = 1000 / store.getState().settings.speed

        setTimeout(() => {
          event.dispatch('stopScene')
          store.getState().togglePlaying()
        }, countDuration)
      }
    }
  },
  resetLoop: () => {
    clearInterval(state.loopIntervalFn)
    store.getState().updateProgress(defaultProgress)
  },
}

// TODO: refactor the name
const loopDurations = (durationFractions: DurationFractions, safetyFraction = 0.96): Durations => {
  const countDuration = 1000 / store.getState().settings.speed
  const countsInStep = store.getState().settings.pattern[store.getState().progress.step]
  const countsInCycle = store.getState().settings.pattern.reduce((totalCounts, stepCounts) => {
    return totalCounts + stepCounts
  }, 0)

  return {
    cycle: countsInCycle * countDuration * durationFractions.cycle * safetyFraction,
    step: countsInStep * countDuration * durationFractions.step * safetyFraction,
    count: countDuration * durationFractions.count * safetyFraction,
    stagger: countDuration * durationFractions.stagger * safetyFraction,
  }
}

const init = async () => {
  const events: LoopEvents[] = ['startLoop', 'resetLoop']

  events.forEach((loopEvent) => {
    event.subscribe(loopEvent, () => {
      loopEvents[loopEvent]()
    })
  })
}

init()

export { loopDurations }
export default { loopDurations }
