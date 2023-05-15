import { ICanvas, IRenderer, IRendererOptionsAuto, autoDetectRenderer } from 'pixi.js'
import { SceneEvents, Scene, Scenes, Animation, Sounds } from '@/types'

import store from '@/store'
import event from '@/libraries/event'
import animation from '@/libraries/animation'
import sound from '@/libraries/sound'
import { loopDurations } from '@/libraries/loop'
import { defaultSettings } from '@/utilities/defaults'
import { ENTER_SCENE_DELAY } from '@/utilities/constants'

type State = {
  renderer?: IRenderer<ICanvas>
  scene?: Scene
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
    state.scene.resizeScene(width, height)
  }
}

const renderScene = () => {
  requestAnimationFrame(renderScene)

  if (!state.renderer) {
    return
  }

  if (!state.scene) {
    return
  }

  state.scene.drawScene()
  state.renderer.render(state.scene.container())
}

const setScene = async (newScene: Scenes) => {
  const sceneComponent = await import(`../scenes/${newScene}.ts`)

  state.scene = sceneComponent.default
  state.currentScene = newScene
}

// TODO: refactor the name
const triggerStage = async (identifier: SceneEvents) => {
  if (!state.scene) {
    return
  }

  if (identifier === 'loopScene') {
    return
  }

  const stage = state.scene.stages[identifier]

  // TODO: figure out the type for 'any' target
  stage.animation.targets.forEach((target: any[]) => {
    animation.remove(target)
  })

  if (stage.sound) {
    // TODO: implement isMuted
    sound.play([stage.sound], false)
  }

  await animation.animate([
    {
      ...stage.animation,
      identifier: identifier,
    },
  ])
}

const sceneEvents = {
  enter: async () => {
    clearTimeout(state.enterTimeoutFn)

    if (!state.scene) {
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight

    state.scene.resizeScene(width, height)

    state.enterTimeoutFn = setTimeout(async () => {
      await triggerStage('enterScene')
      event.dispatch('idleScene')
    }, ENTER_SCENE_DELAY)
  },
  exit: async (newScene: Scenes) => {
    await triggerStage('exitScene')
    await setScene(newScene)
    event.dispatch('enterScene')
  },
  start: async () => {
    await triggerStage('startScene')
  },

  stop: async () => {
    await triggerStage('stopScene')
    event.dispatch('idleScene')
  },
  idle: async () => {
    await triggerStage('idleScene')
  },
  loop: async () => {
    if (!state.scene) {
      return
    }

    const stage = state.scene.stages['loopScene']
    const durations = loopDurations(state.scene.durationFractions)

    const animations: Animation[] = []
    const sounds: Sounds[] = []

    // MARK: Cycle
    if (stage.cycle && store.getProgress().step === 0 && store.getProgress().count === 0) {
      if (stage.cycle.sound) {
        sounds.push(stage.cycle.sound)
      }

      animations.push({
        ...stage.cycle.animation,
        identifier: 'cycle',
        duration: durations.cycle,
        transformations: stage.cycle.animation.transformations[store.getProgress().step],
      })
    }

    // MARK: Step
    if (stage.step && store.getProgress().count === 0) {
      if (stage.step.sound) {
        sounds.push(stage.step.sound)
      }

      animations.push({
        ...stage.step.animation,
        identifier: 'step',
        duration: durations.step,
        // TODO: check if stagger?
        stagger: durations.stagger,
        transformations: stage.step.animation.transformations[store.getProgress().step],
      })
    }

    // MARK: Count
    if (stage.count) {
      if (stage.count.sound) {
        sounds.push(stage.count.sound)
      }

      animations.push({
        ...stage.count.animation,
        identifier: 'count',
        duration: durations.count,
        transformations: stage.count.animation.transformations[store.getProgress().step],
      })
    }

    // TODO: implement isMuted
    sound.play(sounds, false)
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
