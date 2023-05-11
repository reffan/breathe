import { useContext, useEffect } from 'react'
import { ICanvas, IRenderer, IRendererOptionsAuto, autoDetectRenderer } from 'pixi.js'
import anime from 'animejs'
import { ENTER_SCENE_TIMEOUT } from '@/libraries/constants'
import { Context, Scenes, Scene, SceneAnimation, SceneEvent } from '@/types'

import { AppContext } from '@/AppContext'
import { useLoop } from '@/libraries/loop'
import { subscribeEvent, unsubscribeEvent, dispatchEvent } from '@/libraries/events'
import { defaultAnimation, defaultSettings } from '@/libraries/defaults'

// MARK: Because the context doesn't stay reactive...
let currentScene: Scenes = defaultSettings.scene

let renderer: IRenderer<ICanvas>
let scene: () => Scene

// TODO: not sure if necessary?
let canvasWidth: number
let canvasHeight: number

let isSingleton = false

const useScene = () => {
  const appContext = useContext<Context>(AppContext)
  const { loopProgress, loopDurations } = useLoop()

  useEffect(() => {
    if (!isSingleton) {
      subscribeEvent('enterScene', () => {
        enterScene()
      })

      subscribeEvent('exitScene', () => {
        exitScene()
      })

      subscribeEvent('startScene', () => {
        startScene()
      })

      subscribeEvent('stopScene', () => {
        stopScene()
      })

      subscribeEvent('idleScene', () => {
        idleScene()
      })

      subscribeEvent('runScene', () => {
        runScene()
      })
    }

    isSingleton = true

    if (!scene) {
      currentScene = defaultSettings.scene

      const setScene = async () => {
        // TODO: get vite ignore working
        const sceneComponent = await import(`../scenes/${currentScene}.ts`)
        scene = sceneComponent.default
      }

      setScene()
    }

    return () => {
      unsubscribeEvent('enterScene', () => {
        return
      })

      unsubscribeEvent('exitScene', () => {
        return
      })

      unsubscribeEvent('startScene', () => {
        return
      })

      unsubscribeEvent('stopScene', () => {
        return
      })

      unsubscribeEvent('idleScene', () => {
        return
      })

      unsubscribeEvent('runScene', () => {
        return
      })
    }
  }, [])

  useEffect(() => {
    currentScene = appContext.settings.scene
    dispatchEvent('exitScene')

    return () => {
      return
    }
  }, [appContext.settings.scene])

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
    requestAnimationFrame(renderScene)

    window.addEventListener('resize', resizeCanvas)
  }

  const resizeCanvas = () => {
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight

    scene().resize(canvasWidth, canvasHeight)
    renderer.resize(canvasWidth, canvasHeight)
  }

  // TODO: rename this
  const transitionScene = async (identifier: string | SceneEvent) => {
    try {
      // TODO: uhh?
      const transitionScene = (scene() as any)[identifier]()

      transitionScene.targets.forEach((target: any[]) => {
        anime.remove(target)
      })

      await animateScene([
        {
          ...transitionScene,
          identifier,
        },
      ])
    } catch (error) {
      // MARK: Scene has not been set yet
      // console.warn(error)
    }
  }

  const enterScene = async () => {
    scene().resize(canvasWidth, canvasHeight)
    await transitionScene('enterScene')

    dispatchEvent('idleScene')
  }

  const exitScene = async () => {
    await transitionScene('exitScene')

    const sceneComponent = await import(`../scenes/${currentScene}`)
    scene = sceneComponent.default

    setTimeout(() => {
      dispatchEvent('enterScene')
    }, ENTER_SCENE_TIMEOUT)
  }

  const startScene = async () => {
    await transitionScene('startScene')
  }

  const stopScene = async () => {
    await transitionScene('stopScene')
    dispatchEvent('idleScene')
  }

  const idleScene = async () => {
    await transitionScene('idleScene')
  }

  const runScene = async () => {
    const animations: SceneAnimation[] = []
    const loops = scene()['runScene']()

    const progress = loopProgress()
    const durations = loopDurations(scene().fractions)

    if (loops.cycle && progress.step === 0 && progress.count === 0) {
      animations.push({
        ...loops.cycle,
        identifier: 'cycle',
        duration: durations.cycle,
        transformations: loops.cycle.transformations[progress.step],
      })
    }

    if (loops.step && progress.count === 0) {
      animations.push({
        ...loops.step,
        identifier: 'step',
        duration: durations.step,
        // TODO: check if stagger?
        stagger: durations.stagger,
        transformations: loops.step.transformations[progress.step],
      })
    }

    if (loops.count) {
      animations.push({
        ...loops.count,
        identifier: 'count',
        duration: durations.count,
        transformations: loops.count.transformations[progress.step],
      })
    }

    // await animateScene(animations)
    animateScene(animations)
  }

  const animateScene = async (animations: SceneAnimation[]) => {
    // DEBUG:
    console.debug({ animations })
    console.debug({ running: anime.running })

    const animationPromises: Promise<void>[] = []

    animations.forEach((animation: SceneAnimation) => {
      animationPromises.push(
        anime({
          targets: animation.targets,
          ...animation.transformations,

          duration: animation.duration ?? defaultAnimation.duration,
          delay: animation.stagger ? anime.stagger(animation.stagger as number) : defaultAnimation.stagger,
          easing: animation.easing ?? defaultAnimation.easing,
          loop: animation.loop ?? defaultAnimation.loop,
          direction: animation.direction ?? defaultAnimation.direction,
        }).finished
      )
    })

    await Promise.all(animationPromises)
  }

  const renderScene = () => {
    requestAnimationFrame(renderScene)

    if (!scene) {
      return
    }

    scene().draw()
    renderer.render(scene().container)
  }

  return {
    setupCanvas,
  }
}

export { useScene }
