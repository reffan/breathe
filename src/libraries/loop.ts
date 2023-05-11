import { useContext, useEffect } from 'react'
import { TOTAL_COUNTDOWN, TOTAL_STEPS } from '@/libraries/constants'
import { Context, Settings, Progress, Fractions } from '@/types'

import { AppContext } from '@/AppContext'
import { subscribeEvent, unsubscribeEvent, dispatchEvent } from '@/libraries/events'
import { defaultProgress, defaultSettings } from '@/libraries/defaults'

// MARK: Because the context doesn't stay reactive...
let settings: Settings = defaultSettings
let progress: Progress = defaultProgress
let countDuration = 1000

// TODO: look up proper type for setTimeout
let loopTimeout: any

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
      subscribeEvent('runLoop', () => {
        runLoop()
      })

      subscribeEvent('resetLoop', () => {
        resetLoop()
      })
    }

    isSingleton = true

    return () => {
      unsubscribeEvent('runLoop', () => {
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

  const advanceCount = () => {
    // TODO: double check this logic
    if (progress.cycle < settings.cycles) {
      progress = advanceCountLogic()

      appContext.setProgress((currentProgress: Progress): Progress => {
        return advanceCountLogic(currentProgress)
      })

      // TODO: don't like how Scene is tightly coupled?
      dispatchEvent('runScene')
      return
    }

    // TODO: don't like how Scene is tightly coupled?
    dispatchEvent('stopScene')

    // TODO: why does all of this happen so late?
    // TODO: how does this one get cleared?
    setTimeout(() => {
      appContext.setIsPlaying((): boolean => {
        return false
      })

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
      while (settings.pattern[updateProgress.step] == 0 && updateProgress.step < TOTAL_STEPS) {
        updateProgress.step++
      }

      updateProgress.count = 0
    }

    // MARK: Advance the cycle
    if (updateProgress.step >= TOTAL_STEPS) {
      updateProgress.cycle++

      updateProgress.step = 0
    }

    return updateProgress
  }

  const runLoop = () => {
    if (progress.countdown < TOTAL_COUNTDOWN) {
      advanceCountdown()
    }

    if (progress.countdown >= TOTAL_COUNTDOWN - 1) {
      advanceCount()
    }

    loopTimeout = setTimeout(() => {
      runLoop()
    }, countDuration)
  }

  const clearLoop = () => {
    clearTimeout(loopTimeout)
  }

  const resetLoop = () => {
    clearLoop()

    appContext.setProgress((): Progress => {
      return defaultProgress
    })
  }

  const loopDurations = (fractions: Fractions, safetyFraction = 0.96) => {
    const countDuration = 1000 / settings.speed
    const countsInStep = settings.pattern[progress.step]
    const countsInCycle = settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    return {
      cycle: countsInCycle * countDuration * fractions.cycle * safetyFraction,
      step: countsInStep * countDuration * fractions.step * safetyFraction,
      count: countDuration * fractions.count * safetyFraction,
      stagger: countDuration * fractions.stagger * safetyFraction,
    }
  }

  const loopProgress = () => {
    return progress
  }

  return {
    runLoop,
    resetLoop,
    loopDurations,
    loopProgress,
  }
}

export { useLoop }
