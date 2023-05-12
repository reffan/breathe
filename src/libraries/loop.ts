import { useContext, useEffect } from 'react'
import { Context, Settings, Progress, DurationFractions } from '@/types'

import { AppContext } from '@/AppContext'
import { subscribeEvent, unsubscribeEvent, dispatchEvent } from '@/libraries/event'
import { TOTAL_COUNTDOWN_COUNTS, TOTAL_PATTERN_STEPS } from '@/utilities/constants'
import { defaultProgress, defaultSettings } from '@/utilities/defaults'

// MARK: Because the context doesn't stay reactive...
let settings: Settings = defaultSettings
let progress: Progress = defaultProgress
let countDuration = 1000

let loopInterval: ReturnType<typeof setInterval>

let isSingleton = false

const useLoop = () => {
  const appContext = useContext<Context>(AppContext)
  settings = { ...appContext.settings }
  progress = { ...appContext.progress }

  useEffect(() => {
    settings = { ...appContext.settings }
    countDuration = 1000 / settings.speed

    return () => {
      return
    }
  }, [appContext.settings])

  useEffect(() => {
    progress = { ...appContext.progress }

    return () => {
      return
    }
  }, [appContext.progress])

  useEffect(() => {
    if (!isSingleton) {
      subscribeEvent('startLoop', () => {
        startLoop()
      })

      subscribeEvent('resetLoop', () => {
        resetLoop()
      })
    }

    isSingleton = true

    return () => {
      unsubscribeEvent('startLoop', () => {
        return
      })

      unsubscribeEvent('resetLoop', () => {
        return
      })
    }
  }, [])

  const advanceCountdown = () => {
    appContext.setProgress((currentProgress: Progress): Progress => {
      return {
        ...currentProgress,
        countdown: currentProgress.countdown + 1,
      }
    })
  }

  // TODO: double check this logic
  const advanceCount = () => {
    if (progress.cycle < settings.cycles) {
      progress = advanceCountLogic()

      appContext.setProgress((currentProgress: Progress): Progress => {
        return advanceCountLogic(currentProgress)
      })

      // TODO: don't like how Scene is tightly coupled?
      dispatchEvent('loopScene')
      return
    }

    // TODO: don't like how Scene is tightly coupled?

    // TODO: why does all of this happen so late?
    // TODO: how does this one get cleared?
    setTimeout(() => {
      appContext.setIsPlaying((): boolean => {
        return false
      })

      dispatchEvent('stopScene')

      resetLoop()
    }, countDuration * 2)
  }

  // TODO: this is quite ugly, but happens because of late re-render
  const advanceCountLogic = (currentProgress: Progress = progress): Progress => {
    const updateProgress = { ...currentProgress }

    // MARK: Advance the count
    updateProgress.count++

    // MARK: Advance the step
    if (updateProgress.count > settings.pattern[updateProgress.step] - 1) {
      updateProgress.step++

      // MARK: Skip to next step if step has no counts in it
      while (settings.pattern[updateProgress.step] == 0 && updateProgress.step < TOTAL_PATTERN_STEPS) {
        updateProgress.step++
      }

      updateProgress.count = 0
    }

    // MARK: Advance the cycle
    if (updateProgress.step >= TOTAL_PATTERN_STEPS) {
      updateProgress.cycle++

      updateProgress.step = 0
    }

    return updateProgress
  }

  const startLoop = () => {
    updateLoop()

    loopInterval = setInterval(() => {
      updateLoop()
    }, countDuration)
  }

  const updateLoop = () => {
    if (progress.countdown < TOTAL_COUNTDOWN_COUNTS) {
      advanceCountdown()
    }

    if (progress.countdown >= TOTAL_COUNTDOWN_COUNTS - 1) {
      advanceCount()
    }
  }

  const resetLoop = () => {
    clearInterval(loopInterval)

    appContext.setProgress((): Progress => {
      return defaultProgress
    })
  }

  const loopDurations = (durationFractions: DurationFractions, safetyFraction = 0.96) => {
    const countDuration = 1000 / settings.speed
    const countsInStep = settings.pattern[progress.step]
    const countsInCycle = settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    return {
      cycle: countsInCycle * countDuration * durationFractions.cycle * safetyFraction,
      step: countsInStep * countDuration * durationFractions.step * safetyFraction,
      count: countDuration * durationFractions.count * safetyFraction,
      stagger: countDuration * durationFractions.stagger * safetyFraction,
    }
  }

  const loopProgress = () => {
    return progress
  }

  return {
    loopDurations,
    loopProgress,
  }
}

export { useLoop }
