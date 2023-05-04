import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Speed = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>Speed & Duration</h2>
    </>
  )
}

export default Speed
