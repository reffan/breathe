// MARK: For testing purposes
import { Container, Graphics } from 'pixi.js'
import { Animation, LoopAnimations, SceneComponent } from '@/types'

const container = new Container()
container.eventMode = 'none'
container.interactiveChildren = false

const ripples = [new Graphics(), new Graphics(), new Graphics()]

const state = {
  initial: {
    radius: 60,
    scale: 1,
    opacity: 0.84,
  },
  scene: {
    ripples: [
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: 0,
        opacity: 1,
      },
    ],
  },
}

ripples.forEach((ripple, index) => {
  ripple.clear()
  ripple.lineStyle(3 / (index + 1), '#FF0000')
  ripple.drawCircle(0, 0, state.initial.radius * state.initial.scale)
  ripple.closePath()

  container.addChild(ripple)
})

const debug = (): SceneComponent => {
  const enterAnimation = (): Animation => {
    return {
      targets: state.scene.ripples,
      transformations: {
        scale: [0, state.initial.scale],
        opacity: [0, state.initial.opacity],
      },
      duration: 1800,
    }
  }

  const exitAnimation = (): Animation => {
    return {
      targets: state.scene.ripples,
      transformations: {
        scale: 0,
        opacity: 0,
      },
      duration: 900,
    }
  }

  const startAnimation = (): Animation => {
    return {
      targets: state.scene.ripples,
      transformations: {
        scale: 0.48,
      },
    }
  }

  const stopAnimation = (): Animation => {
    return {
      targets: state.scene.ripples,
      transformations: {
        scale: 0.48,
      },
    }
  }

  const idleAnimation = (): Animation => {
    return {
      targets: state.scene.ripples,
      transformations: {
        opacity: [0.84, 1],
        scale: [0.84, 1],
      },
      duration: 3600,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    }
  }

  const loopAnimation = (): LoopAnimations => {
    return {
      // cycle: {
      //   targets: [],
      //   transformations: [],
      //   //
      // },
      step: {
        targets: state.scene.ripples,
        transformations: [
          {
            scale: 2.4,
          },
          {},
          {
            scale: 0.24,
          },
          {},
        ],
        easing: 'easeInOutSine',
      },
      count: {
        targets: state.scene.ripples,
        transformations: [
          {
            opacity: [0.84, 1],
          },
          {
            opacity: [0.72, 1],
          },
          {
            opacity: [0.84, 1],
          },
          {
            opacity: [0.72, 1],
          },
        ],
        easing: 'easeInOutSine',
      },
    }
  }

  const durationFractions = {
    cycle: 1,
    step: 1,
    count: 0.72,
    stagger: 0.18,
  }

  const resizeScene = (width: number, height: number) => {
    container.position.x = width / 2
    container.position.y = height / 2
  }

  const drawScene = () => {
    ripples.forEach((ripple, index) => {
      ripple.scale.set(state.scene.ripples[index].scale, state.scene.ripples[index].scale)
      ripple.alpha = state.scene.ripples[index].opacity / index
    })
  }

  return {
    container,
    resizeScene,
    drawScene,

    enterAnimation,
    exitAnimation,
    startAnimation,
    stopAnimation,
    idleAnimation,
    loopAnimation,

    durationFractions,
  }
}

export default debug