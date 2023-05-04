import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Scene = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>Scene</h2>
    </>
  )
}

export default Scene
