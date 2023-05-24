import { sound as Sound } from '@pixi/sound'
import type { Sounds } from '@src/types'

Sound.add('kalimba-b3', { url: './assets/audio/kalimba-b3.aac', volume: 0.25, preload: true })

Sound.add('kalimba-a4', { url: './assets/audio/kalimba-a4.aac', volume: 0.5, preload: false })
Sound.add('kalimba-b4', { url: './assets/audio/kalimba-b4.aac', volume: 0.5, preload: false })
Sound.add('kalimba-d4', { url: './assets/audio/kalimba-d4.aac', volume: 0.5, preload: false })
Sound.add('kalimba-e4', { url: './assets/audio/kalimba-e4.aac', volume: 0.5, preload: true })
Sound.add('kalimba-f4', { url: './assets/audio/kalimba-f4.aac', volume: 0.5, preload: true })

Sound.add('kalimba-c5', { url: './assets/audio/kalimba-c5.aac', volume: 0.5, preload: false })
Sound.add('kalimba-e5', { url: './assets/audio/kalimba-e5.aac', volume: 0.25, preload: true })

const sound = {
  play: (identifiers: Sounds[], isMuted: boolean) => {
    if (isMuted) {
      return
    }

    identifiers.forEach((identifier: Sounds) => {
      Sound.play(identifier)
    })
  },
}

export { sound }
export default { sound }
