import React from 'react'
import { Store } from '@/types'

import { useStore } from '@/libraries/store'

const DebugTab = () => {
  const isPlaying = useStore((state: Store) => state.isPlaying)
  const isMuted = useStore((state: Store) => state.isMuted)
  const settings = useStore((state: Store) => state.settings)
  const progress = useStore((state: Store) => state.progress)

  return (
    <>
      <h2>DEBUG</h2>
      <section>
        <pre>isPlaying: {JSON.stringify(isPlaying, null, 2)}</pre>
        <pre>isMuted: {JSON.stringify(isMuted, null, 2)}</pre>
        <h3>Settings</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
        <h3>Progress</h3>
        <pre>{JSON.stringify(progress, null, 2)}</pre>
      </section>
    </>
  )
}

export default DebugTab
