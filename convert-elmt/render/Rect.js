const { attrsFromQETStyle } = require("../parse")

class Rect {
  constructor({ x, y, width, height, rx, ry, style }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.rx = rx
    this.ry = ry
    this.style = style
  }

  render(group) {
    return group
      .rect(this.width, this.height)
      .move(this.x, this.y)
      .radius(this.rx, this.ry)
      .attr(attrsFromQETStyle(this.style))
  }
}

module.exports = Rect
