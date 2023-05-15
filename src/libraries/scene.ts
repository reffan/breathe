import { ICanvas, IRenderer, IRendererOptionsAuto, autoDetectRenderer } from 'pixi.js'
import { Animation, SceneComponent, Scenes } from '@/types'

import store from '@/store'
import event from '@/libraries/event'
import animation from '@/libraries/animation'
import sound from '@/libraries/sound'
import { loopDurations } from '@/libraries/loop'
import { defaultSettings } from '@/utilities/defaults'
import { ENTER_SCENE_DELAY } from '@/utilities/constants'

type State = {
  renderer?: IRenderer<ICanvas>
  scene?: () => SceneComponent
  currentScene: Scenes
  enterTimeoutFn?: ReturnType<typeof setTimeout>
}

const state: State = {
  renderer: undefined,
  scene: undefined,
  currentScene: defaultSettings.scene,
  enterTimeoutFn: undefined,
}

const setupCanvas = (canvas: HTMLCanvasElement) => {
  if (state.renderer) {
    return
  }

  const width = window.innerWidth
  const height = window.innerHeight

  const options: Partial<IRendererOptionsAuto> = {
    view: canvas,
    width: width,
    height: height,
    autoDensity: true,
    antialias: true,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
  }

  state.renderer = autoDetectRenderer(options)
  requestAnimationFrame(renderScene)

  window.addEventListener('resize', resizeCanvas)
}

const resizeCanvas = () => {
  const width = window.innerWidth
  const height = window.innerHeight

  if (state.renderer) {
    state.renderer.resize(width, height)
  }

  if (state.scene) {
    state.scene().resizeScene(width, height)
  }
}

const setScene = async (newScene: Scenes) => {
  const sceneComponent = await import(`../scenes/${newScene}.ts`)

  state.scene = sceneComponent.default
  state.currentScene = newScene
}

const renderScene = () => {
  requestAnimationFrame(renderScene)

  if (!state.renderer) {
    return
  }

  if (!state.scene) {
    return
  }

  state.scene().drawScene()
  state.renderer.render(state.scene().container)
}

const sceneEvents = {
  enter: async () => {
    clearTimeout(state.enterTimeoutFn)

    if (!state.scene) {
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight

    state.scene().resizeScene(width, height)

    state.enterTimeoutFn = setTimeout(async () => {
      await animation.transition('enterAnimation', state.scene)
      event.dispatch('idleScene')
    }, ENTER_SCENE_DELAY)
  },
  exit: async (newScene: Scenes) => {
    await animation.transition('exitAnimation', state.scene)
    await setScene(newScene)
    event.dispatch('enterScene')
  },
  start: async () => {
    sound.play('kalimba-f4')
    await animation.transition('startAnimation', state.scene)
  },

  stop: async () => {
    // sound.play('kalimba-b3')
    await animation.transition('stopAnimation', state.scene)
    event.dispatch('idleScene')
  },
  idle: async () => {
    await animation.transition('idleAnimation', state.scene)
  },
  loop: async () => {
    if (!state.scene) {
      return
    }

    const animations: Animation[] = []
    const loops = state.scene()['loopAnimation']()

    const durations = loopDurations(state.scene().durationFractions)

    // MARK: Cycle
    if (loops.cycle && store.getProgress().step === 0 && store.getProgress().count === 0) {
      animations.push({
        ...loops.cycle,
        identifier: 'cycle',
        duration: durations.cycle,
        transformations: loops.cycle.transformations[store.getProgress().step],
      })
    }

    // MARK: Step
    if (loops.step && store.getProgress().count === 0) {
      // sound.play('kalimba-e4')

      animations.push({
        ...loops.step,
        identifier: 'step',
        duration: durations.step,
        // TODO: check if stagger?
        stagger: durations.stagger,
        transformations: loops.step.transformations[store.getProgress().step],
      })
    }

    // MARK: Count
    if (loops.count) {
      // sound.play('kalimba-e5')

      animations.push({
        ...loops.count,
        identifier: 'count',
        duration: durations.count,
        transformations: loops.count.transformations[store.getProgress().step],
      })
    }

    animation.animate(animations)
  },
}

const init = async () => {
  event.subscribe('enterScene', () => {
    sceneEvents.enter()
  })

  // TODO: figure out the type for 'any' event
  event.subscribe('exitScene', (event: any) => {
    sceneEvents.exit(event.detail.newScene)
  })

  event.subscribe('startScene', () => {
    sceneEvents.start()
  })

  event.subscribe('stopScene', () => {
    sceneEvents.stop()
  })

  event.subscribe('idleScene', () => {
    sceneEvents.idle()
  })

  event.subscribe('loopScene', () => {
    sceneEvents.loop()
  })

  if (!state.scene) {
    await setScene(state.currentScene)
  }

  resizeCanvas()
}

init()

export { setupCanvas }
export default { setupCanvas }
