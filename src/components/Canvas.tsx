import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '@/types'

import { AppContext } from '@/AppContext'
import { useScene } from '@/libraries/scene'

const Canvas = () => {
  const appContext = useContext<Context>(AppContext)
  const { setupCanvas } = useScene()

  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      setupCanvas(canvas.current, window.innerWidth, window.innerHeight)
    }

    return () => {
      // TODO: destroy canvas?
    }
  }, [setupCanvas])

  // TODO: tween the colors?
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
      <canvas ref={canvas} />
    </div>
  )
}

export default Canvas
