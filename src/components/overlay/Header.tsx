import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import { TOTAL_COUNTDOWN_COUNTS } from '@/utilities/constants'
import { countdown as countdownLabel, steps as stepsLabel } from '@/utilities/labels'

const Header = () => {
  const appContext = useContext<Context>(AppContext)

  // TODO: double check this logic
  const progressPercentage = () => {
    if (!appContext.isPlaying) {
      return 0
    }

    if (appContext.progress.countdown !== 0) {
      return 0
    }

    const countsInCycle = appContext.settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const totalCountsInCycles = appContext.settings.cycles * countsInCycle

    let totalProgressCounts = 0
    totalProgressCounts += appContext.progress.cycle * countsInCycle

    if (appContext.progress.step > 0) {
      for (let i = 0; i <= appContext.progress.step - 1; i++) {
        totalProgressCounts += appContext.settings.pattern[i]
      }
    }

    totalProgressCounts += appContext.progress.count

    const progressPercentage = (totalProgressCounts / totalCountsInCycles) * 100
    return progressPercentage
  }

  const countdownText = () => {
    if (!appContext.isPlaying) {
      return null
    }

    if (appContext.progress.countdown >= TOTAL_COUNTDOWN_COUNTS) {
      return null
    }

    return countdownLabel[appContext.progress.countdown]
  }

  const progressText = () => {
    if (!appContext.isPlaying) {
      return null
    }

    if (appContext.progress.count === -1) {
      return null
    }

    if (appContext.progress.cycle === appContext.settings.cycles) {
      return null
    }

    return `${stepsLabel[appContext.progress.step]}... ${
      appContext.settings.pattern[appContext.progress.step] - appContext.progress.count
    }`
  }

  return (
    <>
      <div className='overlay-branding'>
        <h1>B R E A T H E</h1>
      </div>
      <div className='overlay-progress'>
        <div className='progress-bar'>
          <div className='progress-indicator' style={{ width: `${progressPercentage()}%` }}></div>
        </div>
        <div className='progress-text'>
          {countdownText()}
          {progressText()}
        </div>
      </div>
    </>
  )
}

export default Header
