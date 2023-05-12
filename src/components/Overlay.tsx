import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import Header from '@/components/overlay/Header'
import Tabs from '@/components/overlay/Tabs'
import Toggles from '@/components/overlay/Toggles'

const Overlay = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <div id='overlay' className={appContext.isPlaying ? 'is-playing' : undefined}>
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
