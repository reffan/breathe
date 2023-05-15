import anime from 'animejs'
import { SceneComponent, Animation, SceneAnimation } from '@/types'
import { defaultAnimation } from '@/utilities/defaults'

// TODO: refactor the name
const transition = async (identifier: SceneAnimation, scene?: () => SceneComponent) => {
  if (!scene) {
    return
  }

  // TODO: uhh?
  const transition = (scene() as any)[identifier]()

  // TODO: figure out the type for 'any' target
  transition.targets.forEach((target: any[]) => {
    anime.remove(target)
  })

  await animate([
    {
      ...transition,
      identifier,
    },
  ])
}

// TODO: refactor the name
const animate = async (animations: Animation[]) => {
  // DEBUG:
  // console.debug({ animations })
  // console.debug({ running: anime.running })

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

export { transition, animate }
export default { transition, animate }
