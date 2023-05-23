import { Container, Graphics } from 'pixi.js'
import { Scene } from '@/types'

const container = new Container()
container.eventMode = 'none'
container.interactiveChildren = false

const ripples = new Graphics()
container.addChild(ripples)

const state = {
  initial: {
    radius: 60,
    opacity: 1,
  },
  scene: {
    ripples: [
      {
        radius: 0,
        opacity: 0,
      },
      {
        radius: 0,
        opacity: 0,
      },
      {
        radius: 0,
        opacity: 0,
      },
    ],
  },
}

const aqua: Scene = {
  stages: {
    enterScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          radius: [0, state.initial.radius],
          opacity: [0, state.initial.opacity],
        },
        duration: 1200,
        stagger: 1200 * 0.18,
      },
    },
    exitScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          radius: 0,
          opacity: 0,
        },
        duration: 960,
        stagger: 960 * 0.09,
      },
    },
    startScene: {
      sound: 'kalimba-f4',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          radius: 12,
          opacity: state.initial.opacity,
        },
        easing: 'easeInOutBack',
      },
    },
    stopScene: {
      sound: 'kalimba-b3',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          radius: state.initial.radius,
          opacity: state.initial.opacity,
        },
        easing: 'easeInOutBack',
      },
    },
    idleScene: {
      // sound: '',
      animation: {
        targets: state.scene.ripples,
        transformations: {
          // opacity: [0.84, 1],
          // radius: [20, 24],
          radius: state.initial.radius,
          opacity: state.initial.opacity,
        },
        // duration: 3600,
        // loop: true,
        // direction: 'alternate',
        // easing: 'easeInOutSine',
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
        sound: 'kalimba-e4',
        animation: {
          targets: state.scene.ripples,
          transformations: [
            {
              radius: 144,
            },
            {},
            {
              radius: 12,
            },
            {},
          ],
          easing: 'easeInOutSine',
        },
      },
      count: {
        sound: 'kalimba-e5',
        animation: {
          targets: state.scene.ripples,
          transformations: [
            {},
            {
              radius: [145, 144],
            },
            {},
            {
              radius: [13, 12],
            },
          ],
          easing: 'easeInOutBack',
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
    ripples.clear()

    state.scene.ripples.forEach((ripple, index) => {
      ripples.lineStyle(3 / (index + 1), '#FFFFFF', ripple.opacity / (index + 1))
      ripples.drawCircle(0, 0, ripple.radius)
      ripples.closePath()
    })
  },
}

export default aqua
