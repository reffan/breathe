import { useContext, useEffect } from 'react'
import { ICanvas, IRenderer, IRendererOptionsAuto, autoDetectRenderer } from 'pixi.js'
import anime from 'animejs'
import { AppContext, Scenes, SceneComponent, Animation, SceneAnimation } from '@/types'

import { Context } from '@/Context'
import { useLoop } from '@/libraries/loop'
import { subscribeEvent, unsubscribeEvent, dispatchEvent } from '@/libraries/event'
import { playSound } from '@/libraries/sound'
import { ENTER_SCENE_DELAY } from '@/utilities/constants'
import { defaultAnimation, defaultSettings } from '@/utilities/defaults'

// MARK: Because the context doesn't stay reactive...
let currentScene: Scenes = defaultSettings.scene

let renderer: IRenderer<ICanvas>
let scene: () => SceneComponent

// TODO: not sure if necessary?
let canvasWidth: number
let canvasHeight: number

let enterTimeout: ReturnType<typeof setTimeout>

let isSingleton = false

const useScene = () => {
  const context = useContext<AppContext>(Context)
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

      subscribeEvent('loopScene', () => {
        loopScene()
      })
    }

    isSingleton = true

    if (!scene) {
      currentScene = defaultSettings.scene

      const setScene = async () => {
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

      unsubscribeEvent('loopScene', () => {
        return
      })
    }
  }, [])

  useEffect(() => {
    currentScene = context.settings.scene
    dispatchEvent('exitScene')

    return () => {
      return
    }
  }, [context.settings.scene])

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

    scene().resizeScene(canvasWidth, canvasHeight)
    renderer.resize(canvasWidth, canvasHeight)
  }

  const enterScene = async () => {
    clearTimeout(enterTimeout)
    scene().resizeScene(canvasWidth, canvasHeight)

    enterTimeout = setTimeout(async () => {
      await transitionAnimation('enterAnimation')
      dispatchEvent('idleScene')
    }, ENTER_SCENE_DELAY)
  }

  const exitScene = async () => {
    await transitionAnimation('exitAnimation')

    const sceneComponent = await import(`../scenes/${currentScene}.ts`)
    scene = sceneComponent.default

    dispatchEvent('enterScene')
  }

  const startScene = async () => {
    playSound.play('kalimba-f4')
    await transitionAnimation('startAnimation')
  }

  const stopScene = async () => {
    playSound.play('kalimba-b3')
    await transitionAnimation('stopAnimation')
    dispatchEvent('idleScene')
  }

  const idleScene = async () => {
    await transitionAnimation('idleAnimation')
  }

  const loopScene = async () => {
    const animations: Animation[] = []
    const loops = scene()['loopAnimation']()

    const progress = loopProgress()
    const durations = loopDurations(scene().durationFractions)

    // MARK: Cycle
    if (loops.cycle && progress.step === 0 && progress.count === 0) {
      animations.push({
        ...loops.cycle,
        identifier: 'cycle',
        duration: durations.cycle,
        transformations: loops.cycle.transformations[progress.step],
      })
    }

    // MARK: Step
    if (loops.step && progress.count === 0) {
      playSound.play('kalimba-e4')

      animations.push({
        ...loops.step,
        identifier: 'step',
        duration: durations.step,
        // TODO: check if stagger?
        stagger: durations.stagger,
        transformations: loops.step.transformations[progress.step],
      })
    }

    // MARK: Count
    if (loops.count) {
      playSound.play('kalimba-e5')

      animations.push({
        ...loops.count,
        identifier: 'count',
        duration: durations.count,
        transformations: loops.count.transformations[progress.step],
      })
    }

    animateScene(animations)
  }

  const transitionAnimation = async (identifier: SceneAnimation) => {
    try {
      // TODO: uhh?
      const transitionAnimation = (scene() as any)[identifier]()

      // TODO: figure out the type for 'any' target
      transitionAnimation.targets.forEach((target: any[]) => {
        anime.remove(target)
      })

      await animateScene([
        {
          ...transitionAnimation,
          identifier,
        },
      ])
    } catch (error) {
      // MARK: Scene has not been set yet
      // console.warn(error)
    }
  }

  const animateScene = async (animations: Animation[]) => {
    // DEBUG:
    console.debug({ animations })
    console.debug({ running: anime.running })

    const animationPromises: Promise<void>[] = []

    animations.forEach((animation: Animation) => {
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

    scene().drawScene()
    renderer.render(scene().container)
  }

  return {
    setupCanvas,
  }
}

export { useScene }
