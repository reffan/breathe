import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Debug = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>DEBUG</h2>
      <h3>Settings</h3>
      <pre>{JSON.stringify(appContext.settings, null, 2)}</pre>
      <h3>Progress</h3>
      <pre>{JSON.stringify(appContext.progress, null, 2)}</pre>)
    </>
  )
}

export default Debug
