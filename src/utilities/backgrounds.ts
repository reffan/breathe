import type { Background } from '@src/types'

const backgrounds: { name: string; background: Background }[] = [
  {
    name: 'Sunrise',
    background: [24, 100, 66],
  },
  {
    name: 'Grass',
    background: [132, 100, 66],
  },
  // MARK: Default background color
  {
    name: 'Water',
    background: [228, 100, 66],
  },
  {
    name: 'Lavender',
    background: [264, 100, 66],
  },
  {
    name: 'Sunset',
    background: [360, 100, 66],
  },
]

export { backgrounds }
