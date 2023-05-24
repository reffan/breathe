import { autoDetectRenderer } from 'pixi.js'
import type { ICanvas, IRenderer, IRendererOptionsAuto } from 'pixi.js'
import type { SceneEvents, Scene, Animation, Sounds } from '@src/types'

import { store } from '@libraries/store'
import { event } from '@libraries/event'
import { animation } from '@libraries/animation'
import { sound } from '@libraries/sound'
import { loopDurations } from '@libraries/loop'
import { ENTER_SCENE_DELAY } from '@utilities/constants'

type State = {
  renderer?: IRenderer<ICanvas>
  scene?: Scene
  enterTimeoutFn?: ReturnType<typeof setTimeout>
}

const state: State = {
  renderer: undefined,
  scene: undefined,
  enterTimeoutFn: undefined,
}

const view = {
  setup: (canvas: HTMLCanvasElement) => {
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
    requestAnimationFrame(view.render)

    window.addEventListener('resize', view.resize)
  },
  resize: () => {
    const width = window.innerWidth
    const height = window.innerHeight

    if (state.renderer) {
      state.renderer.resize(width, height)
    }

    if (state.scene) {
      state.scene.resizeScene(width, height)
    }
  },
  render: () => {
    requestAnimationFrame(view.render)

    if (!state.renderer) {
      return
    }

    if (!state.scene) {
      return
    }

    state.scene.drawScene()
    state.renderer.render(state.scene.container())
  },
}

const sceneEvents = {
  enterScene: async () => {
    clearTimeout(state.enterTimeoutFn)

    if (!state.scene) {
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight

    state.scene.resizeScene(width, height)

    state.enterTimeoutFn = setTimeout(async () => {
      await sceneTransition('enterScene')
      event.dispatch('idleScene')
    }, ENTER_SCENE_DELAY)
  },
  exitScene: async () => {
    await sceneTransition('exitScene')

    const sceneComponent = await import(`../scenes/${store.getState().settings.scene}.ts`)
    state.scene = sceneComponent.default

    event.dispatch('enterScene')
  },
  startScene: async () => {
    await sceneTransition('startScene')
  },

  stopScene: async () => {
    await sceneTransition('stopScene')
    event.dispatch('idleScene')
  },
  idleScene: async () => {
    await sceneTransition('idleScene')
  },
  loopScene: async () => {
    if (!state.scene) {
      return
    }

    const stage = state.scene.stages['loopScene']
    const durations = loopDurations(state.scene.durationFractions)

    const animations: Animation[] = []
    const sounds: Sounds[] = []

    // prettier-ignore
    const shouldTriggerCycle = store.getState().progress.step === 0 && store.getState().progress.count === 0
    if (stage.cycle && shouldTriggerCycle) {
      if (stage.cycle.sound) {
        sounds.push(stage.cycle.sound)
      }

      animations.push({
        ...stage.cycle.animation,
        identifier: 'cycle',
        duration: durations.cycle,
        transformations: stage.cycle.animation.transformations[store.getState().progress.step],
      })
    }

    // prettier-ignore
    const shouldTriggerStep = store.getState().progress.count === 0 ? true : false
    if (stage.step && shouldTriggerStep) {
      if (stage.step.sound) {
        sounds.push(stage.step.sound)
      }

      animations.push({
        ...stage.step.animation,
        identifier: 'step',
        duration: durations.step,
        // TODO: check if stagger?
        stagger: durations.stagger,
        transformations: stage.step.animation.transformations[store.getState().progress.step],
      })
    }

    // prettier-ignore
    const shouldTriggerCount = true
    if (stage.count && shouldTriggerCount) {
      if (stage.count.sound) {
        sounds.push(stage.count.sound)
      }

      animations.push({
        ...stage.count.animation,
        identifier: 'count',
        duration: durations.count,
        transformations: stage.count.animation.transformations[store.getState().progress.step],
      })
    }

    sound.play(sounds, store.getState().isMuted)
    animation.animate(animations)
  },
}

const sceneTransition = async (identifier: SceneEvents) => {
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
    sound.play([stage.sound], store.getState().isMuted)
  }

  await animation.animate([
    {
      ...stage.animation,
      identifier: identifier,
    },
  ])
}

const init = async () => {
  const events: SceneEvents[] = ['enterScene', 'exitScene', 'startScene', 'stopScene', 'idleScene', 'loopScene']

  events.forEach((sceneEvent) => {
    event.subscribe(sceneEvent, () => {
      sceneEvents[sceneEvent]()
    })
  })

  if (!state.scene) {
    const sceneComponent = await import(`../scenes/${store.getState().settings.scene}.ts`)
    state.scene = sceneComponent.default
  }

  view.resize()
}

init()

export { view }
export default { view }
