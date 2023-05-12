import React, { useContext } from 'react'
import { AppContext } from '@/types'

import { Context } from '@/Context'
import { TOTAL_COUNTDOWN_COUNTS } from '@/utilities/constants'
import { countdown as countdownLabel, steps as stepsLabel } from '@/utilities/labels'

const Header = () => {
  const context = useContext<AppContext>(Context)

  const progressPercentage = () => {
    if (!context.isPlaying) {
      return 0
    }

    if (context.progress.countdown < TOTAL_COUNTDOWN_COUNTS) {
      return 0
    }

    const countsInCycle = context.settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const totalCountsInCycles = context.settings.cycles * countsInCycle

    let totalProgressCounts = 0
    totalProgressCounts += context.progress.cycle * countsInCycle

    if (context.progress.step > 0) {
      for (let i = 0; i <= context.progress.step - 1; i++) {
        totalProgressCounts += context.settings.pattern[i]
      }
    }

    totalProgressCounts += context.progress.count

    // MARK: Add 1 for immediate display
    totalProgressCounts += 1

    // MARK: Cap at max 100% progress
    const progressPercentage = Math.min(totalProgressCounts / totalCountsInCycles, 1) * 100
    return progressPercentage
  }

  const countdownText = () => {
    if (!context.isPlaying) {
      return null
    }

    if (context.progress.countdown >= TOTAL_COUNTDOWN_COUNTS) {
      return null
    }

    return countdownLabel[context.progress.countdown]
  }

  const progressText = () => {
    if (!context.isPlaying) {
      return null
    }

    if (context.progress.count === -1) {
      return null
    }

    if (context.progress.cycle === context.settings.cycles) {
      return null
    }

    return `${stepsLabel[context.progress.step]}... ${
      context.settings.pattern[context.progress.step] - context.progress.count
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
