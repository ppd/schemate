const { arrow, circle, diamond } = require("./markers")
const { attrsFromQETStyle } =  require("../parse")

function addMarker(element, style, position, length) {
  switch (style) {
    case "simple":
    case "triangle":
      return arrow({ element, position, length, style })
    case "circle":
      return circle({ element, position, length })
    case "diamond":
      return diamond({ element, position, length })
    default:
      return undefined
  }
}

class Line {
  constructor({ x1, y1, x2, y2, style, end1, end2, length1, length2 }) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.style = style
    this.end1 = end1
    this.end2 = end2
    this.length1 = length1
    this.length2 = length2
  }

  render(group) {
    const element = group
      .line(this.x1, this.y1, this.x2, this.y2)
      .attr(attrsFromQETStyle(this.style))
    addMarker(element, this.end1, "start", this.length1)
    addMarker(element, this.end2, "end", this.length2)
    return element
  }
}

module.exports = Line
