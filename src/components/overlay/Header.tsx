import React, { useContext } from 'react'

import { AppContext } from '@/AppContext'
import { Context } from '@/types'

const Header = () => {
  const appContext = useContext<Context>(AppContext)

  return (
    <>
      <div className='overlay-branding'>
        <h1>B R E A T H E</h1>
      </div>
      <div className='overlay-progress'>--- PROGRESS ---</div>
    </>
  )
}

export default Header
