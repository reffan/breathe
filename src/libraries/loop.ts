import { Settings, Progress, Durations, DurationFractions } from '@/types'

import store from '@/store'
import event from '@/libraries/event'
import { TOTAL_COUNTDOWN_COUNTS, TOTAL_PATTERN_STEPS } from '@/utilities/constants'
import { defaultSettings, defaultProgress } from '@/utilities/defaults'

type State = {
  settings: Settings
  loopIntervalFn?: ReturnType<typeof setInterval>
}

const state: State = {
  settings: defaultSettings,
  loopIntervalFn: undefined,
}

const loop = {
  start: (currentSettings: Settings) => {
    state.settings = currentSettings
    loop.update()

    const countDuration = 1000 / state.settings.speed

    state.loopIntervalFn = setInterval(() => {
      loop.update()
    }, countDuration)
  },
  update: () => {
    if (store.getProgress().countdown < TOTAL_COUNTDOWN_COUNTS) {
      advance.countdown()
    }

    if (store.getProgress().countdown >= TOTAL_COUNTDOWN_COUNTS) {
      if (store.getProgress().cycle < state.settings.cycles) {
        advance.count()
      } else {
        const countDuration = 1000 / state.settings.speed

        // TODO: implement this
        // TODO: why does all of this happen so late?
        // TODO: how does this one get cleared?
        setTimeout(() => {
          // TODO: implement
          // context.setIsPlaying((): boolean => {
          //   return false
          // })

          event.dispatch('stopScene')
          loop.reset()
        }, countDuration * 2)
      }
    }
  },
  reset: () => {
    clearInterval(state.loopIntervalFn)
    store.setProgress(defaultProgress)
  },
}

const advance = {
  countdown: () => {
    const newProgress: Progress = {
      ...store.getProgress(),
    }

    // MARK: Advance the countdown
    newProgress.countdown++

    store.setProgress(newProgress)
  },
  count: () => {
    const newProgress: Progress = {
      ...store.getProgress(),
    }

    // MARK: Advance the count
    newProgress.count++

    // MARK: Advance the step
    if (newProgress.count > state.settings.pattern[newProgress.step] - 1) {
      newProgress.step++

      // MARK: Skip to next step if step has no counts in it
      while (state.settings.pattern[newProgress.step] == 0 && newProgress.step < TOTAL_PATTERN_STEPS) {
        newProgress.step++
      }

      newProgress.count = 0
    }

    // MARK: Advance the cycle
    if (newProgress.step >= TOTAL_PATTERN_STEPS) {
      newProgress.cycle++
      newProgress.step = 0
    }

    store.setProgress(newProgress)
    event.dispatch('loopScene')
  },
}

// TODO: refactor the name
const loopDurations = (durationFractions: DurationFractions, safetyFraction = 0.96): Durations => {
  const countDuration = 1000 / state.settings.speed
  const countsInStep = state.settings.pattern[store.getProgress().step]
  const countsInCycle = state.settings.pattern.reduce((totalCounts, stepCounts) => {
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
  // TODO: figure out the type for 'any' event
  event.subscribe('startLoop', (event: any) => {
    loop.start(event.detail.currentSettings)
  })

  event.subscribe('resetLoop', () => {
    loop.reset()
  })
}

init()

export { loopDurations }
export default { loopDurations }
