// MARK: For testing purposes
import { Container, Graphics } from 'pixi.js'
import { SceneAnimation, ProgressAnimations, Scene } from '@/types'

const container = new Container()
container.eventMode = 'none'
container.interactiveChildren = false

const ripples = [new Graphics(), new Graphics(), new Graphics()]

const initialState = {
  radius: 60,
  scale: 1,
  opacity: 0.84,
}

const sceneState = {
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
}

ripples.forEach((ripple, index) => {
  ripple.clear()
  ripple.lineStyle(3 / (index + 1), '#FF0000')
  ripple.drawCircle(0, 0, initialState.radius * initialState.scale)
  ripple.closePath()

  container.addChild(ripple)
})

const debug = (): Scene => {
  const enterScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        scale: [0, initialState.scale],
        opacity: [0, initialState.opacity],
      },
      duration: 1800,
    }
  }

  const exitScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        scale: 0,
        opacity: 0,
      },
      duration: 900,
    }
  }

  const startScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        scale: 0.48,
      },
    }
  }

  const stopScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
      transformations: {
        scale: 0.48,
      },
    }
  }

  const idleScene = (): SceneAnimation => {
    return {
      targets: sceneState.ripples,
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

  const runScene = (): ProgressAnimations => {
    return {
      // cycle: {
      //   targets: [],
      //   transformations: [],
      //   //
      // },
      step: {
        targets: sceneState.ripples,
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
        targets: sceneState.ripples,
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

  const fractions = {
    cycle: 1,
    step: 1,
    count: 0.72,
    stagger: 0.18,
  }

  const resize = (width: number, height: number) => {
    container.position.x = width / 2
    container.position.y = height / 2
  }

  const draw = () => {
    ripples.forEach((ripple, index) => {
      ripple.scale.set(sceneState.ripples[index].scale, sceneState.ripples[index].scale)
      ripple.alpha = sceneState.ripples[index].opacity / index
    })
  }

  return {
    container,
    resize,
    draw,

    enterScene,
    exitScene,
    startScene,
    stopScene,
    idleScene,
    runScene,

    fractions,
  }
}

export default debug
