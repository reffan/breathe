import { sound } from '@pixi/sound'
import { Sounds } from '@/types'

sound.add('kalimba-b3', { url: './assets/audio/kalimba-b3.aac', volume: 0.5, preload: false })

sound.add('kalimba-a4', { url: './assets/audio/kalimba-a4.aac', volume: 0.5, preload: false })
sound.add('kalimba-b4', { url: './assets/audio/kalimba-b4.aac', volume: 0.5, preload: false })
sound.add('kalimba-d4', { url: './assets/audio/kalimba-d4.aac', volume: 0.5, preload: false })
sound.add('kalimba-e4', { url: './assets/audio/kalimba-e4.aac', volume: 0.5, preload: false })
sound.add('kalimba-f4', { url: './assets/audio/kalimba-f4.aac', volume: 0.5, preload: false })

sound.add('kalimba-c5', { url: './assets/audio/kalimba-c5.aac', volume: 0.5, preload: false })
sound.add('kalimba-e5', { url: './assets/audio/kalimba-e5.aac', volume: 0.25, preload: false })

const play = (identifiers: Sounds[], isMuted: boolean) => {
  if (isMuted) {
    return
  }

  identifiers.forEach((identifier: Sounds) => {
    sound.play(identifier)
  })
}

export { play }
export default { play }
