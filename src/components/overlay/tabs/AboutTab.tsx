import React from 'react'

const AboutTab = () => {
  return (
    <>
      <h2>About This App</h2>
      <span className='subtitle'>Created By...</span>
      <section>
        <ul className='created-by'>
          <li>
            <a href='https://karmic.works' target='_blank' className='link'>
              Reffan Liefde{/*  at Karmic Works */}
            </a>
          </li>
          <li>
            <a href='https://wholy-practices.nl' target='_blank' className='link'>
              Wholy Practices by VGN
            </a>
          </li>
        </ul>
        <span className='subtitle'>Share The Love...</span>
        <ul className='buy-me-a-coffee'>
          <li>
            <a href='https://www.buymeacoffee.com/reffan' target='_blank' className='link'>
              Buy Us A Coffee
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

export default AboutTab
