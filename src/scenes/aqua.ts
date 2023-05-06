import { Scene } from '@/types'
import { Container, Graphics } from 'pixi.js'

const render = new Container()
const graphic = new Graphics()
render.addChild(graphic)

let radius = 60

const aqua = (): Scene => {
  const update = () => {
    // draw
    graphic.clear()
    graphic.lineStyle(3, '#FFFFFF', 1)
    graphic.drawCircle(300, 300, radius)
    graphic.closePath()

    // update
    radius += 0.1
  }

  return {
    update,
    render,
  }
}

export { aqua }
