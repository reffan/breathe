import React from 'react'
import type { Store } from '@src/types'

import { useStore } from '@libraries/store'
import { TOTAL_COUNTDOWN_COUNTS } from '@utilities/constants'
import { countdown as countdownLabel, steps as stepsLabel } from '@utilities/labels'

const Header = () => {
  const isPlaying = useStore((state: Store) => state.isPlaying)
  const settings = useStore((state: Store) => state.settings)
  const progress = useStore((state: Store) => state.progress)

  const progressPercentage = () => {
    if (!isPlaying) {
      return 0
    }

    if (progress.countdown < TOTAL_COUNTDOWN_COUNTS) {
      return 0
    }

    const countsInCycle = settings.pattern.reduce((totalCounts, stepCounts) => {
      return totalCounts + stepCounts
    }, 0)

    const totalCountsInCycles = settings.cycles * countsInCycle

    let totalProgressCounts = 0
    totalProgressCounts += progress.cycle * countsInCycle

    if (progress.step > 0) {
      for (let i = 0; i <= progress.step - 1; i++) {
        totalProgressCounts += settings.pattern[i]
      }
    }

    totalProgressCounts += progress.count

    // MARK: Add 1 for immediate display
    totalProgressCounts += 1

    // MARK: Cap at max 100% progress
    const progressPercentage = Math.min(totalProgressCounts / totalCountsInCycles, 1) * 100
    return progressPercentage
  }

  const countdownText = () => {
    if (!isPlaying) {
      return null
    }

    if (progress.countdown >= TOTAL_COUNTDOWN_COUNTS) {
      return null
    }

    return countdownLabel[progress.countdown]
  }

  const progressText = () => {
    if (!isPlaying) {
      return null
    }

    if (progress.count === -1) {
      return null
    }

    if (progress.cycle === settings.cycles) {
      return null
    }

    return `${stepsLabel[progress.step]}... ${settings.pattern[progress.step] - progress.count}`
  }

  return (
    <>
      <div className='overlay-branding'>
        <h1 className='branding-logo'>B R E A T H E</h1>
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
