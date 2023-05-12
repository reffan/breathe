import React, { useContext } from 'react'
import { AppContext } from '@/types'

import { Context } from '@/Context'

const Debug = () => {
  const context = useContext<AppContext>(Context)

  return (
    <>
      <h2>DEBUG</h2>
      <h3>isPlaying</h3>
      <pre>{JSON.stringify(context.isPlaying, null, 2)}</pre>
      <h3>isMuted</h3>
      <pre>{JSON.stringify(context.isMuted, null, 2)}</pre>
      <h3>Settings</h3>
      <pre>{JSON.stringify(context.settings, null, 2)}</pre>
      <h3>Progress</h3>
      <pre>{JSON.stringify(context.progress, null, 2)}</pre>
    </>
  )
}

export default Debug
