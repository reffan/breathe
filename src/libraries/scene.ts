import { useContext, useEffect } from 'react'
import { ICanvas, IRenderer, IRendererOptionsAuto, autoDetectRenderer } from 'pixi.js'
import { Context, Progress, Scene } from '@/types'

import { AppContext } from '@/AppContext'
import { scenes } from './scenes'
import { defaultSettings } from './defaults'

let renderer: IRenderer<ICanvas>
let scene: () => Scene

let canvasWidth: number
let canvasHeight: number

const useScene = () => {
  const appContext = useContext<Context>(AppContext)

  useEffect(() => {
    if (!scene) {
      scene = scenes[defaultSettings.scene].scene
    }
  }, [])

  const setupCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    if (renderer) {
      return
    }

    canvasWidth = width
    canvasHeight = height

    const options: Partial<IRendererOptionsAuto> = {
      view: canvas,
      width: canvasWidth,
      height: canvasHeight,
      autoDensity: true,
      antialias: true,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
    }

    renderer = autoDetectRenderer(options)
    requestAnimationFrame(animationLoop)

    window.addEventListener('resize', resizeCanvas)
  }

  const resizeCanvas = () => {
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    renderer.resize(canvasWidth, canvasHeight)
  }

  const animationLoop = () => {
    requestAnimationFrame(animationLoop)

    if (!scene) {
      return
    }

    scene().update()
    renderer.render(scene().render)
  }

  return {
    setupCanvas,
  }
}

export { useScene }
