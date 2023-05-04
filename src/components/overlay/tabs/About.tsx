import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const About = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <h2>About This App</h2>
    </>
  )
}

export default About
