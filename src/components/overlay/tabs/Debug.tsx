import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'

const Debug = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>DEBUG</h2>
      <h3>isPlaying</h3>
      <pre>{JSON.stringify(appContext.isPlaying, null, 2)}</pre>
      <h3>isMuted</h3>
      <pre>{JSON.stringify(appContext.isMuted, null, 2)}</pre>
      <h3>Settings</h3>
      <pre>{JSON.stringify(appContext.settings, null, 2)}</pre>
      <h3>Progress</h3>
      <pre>{JSON.stringify(appContext.progress, null, 2)}</pre>
    </>
  )
}

export default Debug
