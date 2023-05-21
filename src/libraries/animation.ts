import anime from 'animejs'
import { Animation } from '@/types'

import { defaultAnimation } from '@/utilities/defaults'

const animation = {
  animate: async (animations: Animation[]) => {
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
  },
  // TODO: replace 'any' with AnimeTarget?
  remove: (target: any) => {
    anime.remove(target)
  },
}

export { animation }
export default { animation }
