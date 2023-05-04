import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Canvas = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <div
      id='canvas'
      style={{
        backgroundColor: `hsl(${appContext.settings.background[0]}, ${appContext.settings.background[1]}%, ${appContext.settings.background[2]}%)`,
      }}
    >
      --- CANVAS ---
    </div>
  )
}

export default Canvas
