import React, { useContext } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'

const Canvas = () => {
  const appContext = useContext<Context>(AppContext)

  const backgroundColors = [
    `hsl(
      ${appContext.settings.background[0] + 6}, 
      ${appContext.settings.background[1]}%, 
      ${appContext.settings.background[2] + 6}%
    )`,
    `hsl(
      ${appContext.settings.background[0]}, 
      ${appContext.settings.background[1]}%, 
      ${appContext.settings.background[2]}%
    )`,
  ]

  return (
    <div
      id='canvas'
      style={{
        backgroundColor: backgroundColors[1],
        backgroundImage: `url('./assets/png/texture.png'), linear-gradient(${backgroundColors[0]}, ${backgroundColors[1]})`,
      }}
    >
      --- CANVAS ---
    </div>
  )
}

export default Canvas
