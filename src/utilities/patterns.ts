import { Pattern } from '@/types'

const patterns: { name: string; pattern: Pattern }[] = [
  {
    name: 'Water',
    pattern: [4, 0, 4, 0],
  },
  // MARK: Default pattern
  {
    name: 'Whiskey',
    pattern: [4, 0, 8, 0],
  },
  {
    name: 'Square',
    pattern: [4, 4, 4, 4],
  },
  {
    name: 'Triangle',
    pattern: [5, 0, 5, 5],
  },
]

export { patterns }
