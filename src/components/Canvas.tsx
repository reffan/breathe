import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '@/types'

import { Context } from '@/Context'
import event from '@/libraries/event'
import { setupCanvas } from '@/libraries/scene'

const Canvas = () => {
  const context = useContext<AppContext>(Context)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      setupCanvas(canvas.current)
    }

    return () => {
      // TODO: destroy canvas?
    }
  }, [])

  useEffect(() => {
    event.dispatch('exitScene', { newScene: context.settings.scene })
  }, [context.settings.scene])

  // TODO: tween the colors?
  const backgroundColors = [
    `hsl(
      ${context.settings.background[0] + 6}, 
      ${context.settings.background[1]}%, 
      ${context.settings.background[2] + 6}%
    )`,
    `hsl(
      ${context.settings.background[0]}, 
      ${context.settings.background[1]}%, 
      ${context.settings.background[2]}%
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
