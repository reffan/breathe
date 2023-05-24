// MARK: For testing purposes
import { Container, Graphics } from 'pixi.js'
import type { Scene } from '@src/types'

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

const DEBUG: Scene = {
  stages: {
    enterScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          scale: [0, state.initial.scale],
          opacity: [0, state.initial.opacity],
        },
        duration: 1800,
      },
    },
    exitScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          scale: 0,
          opacity: 0,
        },
        duration: 900,
      },
    },
    startScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          scale: 0.48,
        },
      },
    },
    stopScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          scale: 0.48,
        },
      },
    },
    idleScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          opacity: [0.84, 1],
          scale: [0.84, 1],
        },
        duration: 3600,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
      },
    },
    loopScene: {
      // cycle: {
      //   // sound: '',
      //   animation: {
      //     targets: [],
      //     transformations: [],
      //   },
      // },
      step: {
        // sound: '',
        animation: {
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
      },
      count: {
        // sound: '',
        animation: {
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
      },
    },
  },

  durationFractions: {
    cycle: 1,
    step: 1,
    count: 0.72,
    stagger: 0.18,
  },

  container: () => {
    return container
  },

  resizeScene: (width: number, height: number) => {
    container.position.x = width / 2
    container.position.y = height / 2
  },

  drawScene: () => {
    ripples.forEach((ripple, index) => {
      ripple.scale.set(state.scene.ripples[index].scale, state.scene.ripples[index].scale)
      ripple.alpha = state.scene.ripples[index].opacity / index
    })
  },
}

export default DEBUG
