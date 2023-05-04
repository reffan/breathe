import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Pattern = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>Breathing Pattern</h2>
    </>
  )
}

export default Pattern
