import React, { useEffect, useRef } from 'react'
import type { Store } from '@src/types'

import { useStore } from '@libraries/store'
import { event } from '@libraries/event'
import { view } from '@libraries/scene'

const Canvas = () => {
  const settings = useStore((state: Store) => state.settings)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      view.setup(canvas.current)
    }

    return () => {
      // TODO: destroy canvas?
    }
  }, [])

  useEffect(() => {
    event.dispatch('exitScene')
  }, [settings.scene])

  // TODO: tween the colors?
  const backgroundColors = [
    `hsl(
      ${settings.background[0] - 12}, 
      ${settings.background[1]}%, 
      ${settings.background[2]}%
    )`,
    `hsl(
      ${settings.background[0]}, 
      ${settings.background[1]}%, 
      ${settings.background[2]}%
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
