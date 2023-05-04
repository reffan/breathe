import React from 'react'

import Header from '@/components/overlay/Header'
import Tabs from '@/components/overlay/Tabs'
import Toggles from '@/components/overlay/Toggles'

const Overlay = () => {
  return (
    <div id='overlay'>
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
