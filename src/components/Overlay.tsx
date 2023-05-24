import React, { useEffect } from 'react'
import NoSleep from 'nosleep.js'
import type { Store } from '@src/types'

import { useStore } from '@libraries/store'

import Header from '@components/overlay/Header'
import Tabs from '@components/overlay/Tabs'
import Toggles from '@components/overlay/Toggles'

const noSleep = new NoSleep()

const Overlay = () => {
  const isPlaying = useStore((state: Store) => state.isPlaying)

  useEffect(() => {
    if (isPlaying) {
      noSleep.enable()
    } else {
      noSleep.disable()
    }
  }, [isPlaying])

  return (
    <div id='overlay' className={isPlaying ? 'is-playing' : undefined}>
      <div className='overlay-header'>
        <Header />
      </div>
      <div className='overlay-spacer' />
      <div className='overlay-footer'>
        <div className='overlay-tabs'>
          <Tabs />
        </div>
        <div className='overlay-toggles'>
          <Toggles />
        </div>
      </div>
    </div>
  )
}

export default Overlay
