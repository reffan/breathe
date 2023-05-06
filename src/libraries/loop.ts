import { useContext, useEffect } from 'react'
import { Context, Progress } from '@/types'

import { AppContext } from '@/AppContext'
import { TOTAL_STEPS } from '@/libraries/constants'
import { defaultProgress } from '@/libraries/defaults'

// TODO: look up proper typing for a setTimeout
let timeoutFn: any
let progress: Progress = defaultProgress

const useLoop = () => {
  const appContext = useContext<Context>(AppContext)
  progress = { ...appContext.progress }

  const countDuration = 1000 / appContext.settings.speed

  useEffect(() => {
    progress = { ...appContext.progress }
  }, [appContext.progress])

  const advanceCountdown = () => {
    // TODO: remember to double check this logic
    appContext.setProgress((previousProgress: Progress): Progress => {
      return {
        ...previousProgress,
        countdown: previousProgress.countdown - 1,
      }
    })
  }

  const advanceCount = () => {
    // TODO: remember to double check this logic
    if (progress.cycle < appContext.settings.cycles) {
      appContext.setProgress((previousProgress: Progress): Progress => {
        const newProgress = { ...previousProgress }

        // MARK: Advance the count
        if (newProgress.count + 1 > appContext.settings.pattern[newProgress.step] - 1) {
          newProgress.step++
          newProgress.count = 0
        } else {
          newProgress.count++
        }

        // MARK: Advance to a non empty step
        while (appContext.settings.pattern[newProgress.step] == 0 && newProgress.step < TOTAL_STEPS) {
          newProgress.step++
        }

        // MARK: Advance the cycle
        if (newProgress.step >= TOTAL_STEPS) {
          newProgress.cycle++
          newProgress.step = 0
        }

        return newProgress
      })
    } else {
      // TODO: how does this one get cleared?
      setTimeout(() => {
        appContext.setIsPlaying((): boolean => {
          return false
        })

        resetLoop()
      }, countDuration * 2)
    }
  }

  const clearLoop = () => {
    clearTimeout(timeoutFn)
  }

  const runLoop = () => {
    if (progress.countdown > 0) {
      advanceCountdown()
    } else {
      advanceCount()
    }

    timeoutFn = setTimeout(() => {
      runLoop()
    }, countDuration)
  }

  const resetLoop = () => {
    clearLoop()

    appContext.setProgress((): Progress => {
      return defaultProgress
    })

    // TODO: advance to non empty step?
    // TODO: remember to double check this logic
    /*
    appContext.setProgress((previousProgress: Progress): Progress => {
      const newProgress = { ...previousProgress }

      // MARK: Advance to a non empty step
      while (appContext.settings.pattern[newProgress.step] == 0 && newProgress.step < TOTAL_STEPS) {
        newProgress.step++
      }

      return newProgress
    })
    */
  }

  return {
    runLoop,
    resetLoop,
  }
}

export { useLoop }
