import React from 'react'
import { Store } from '@/types'

import { useStore } from '@/libraries/store'

import Header from '@/components/overlay/Header'
import Tabs from '@/components/overlay/Tabs'
import Toggles from '@/components/overlay/Toggles'

const Overlay = () => {
  const isPlaying = useStore((state: Store) => state.isPlaying)

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
