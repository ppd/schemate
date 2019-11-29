const { ArrowMarker, CircleMarker, DiamondMarker } = require("./markers")

function getMarker(type, position, length) {
  switch (type) {
    case "simple":
    case "triangle":
      return new ArrowMarker(position, length, type)
    case "circle":
      return new CircleMarker(position, length)
    case "diamond":
      return new DiamondMarker(position, length)
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

    this.startMarker = getMarker(end1, "start", length1)
    this.endMarker = getMarker(end2, "end", length2)
  }

  renderSVG(group) {
    const element = group
      .line(this.x1, this.y1, this.x2, this.y2)
      .attrsFromQETStyle(this.style)
    if (this.startMarker) {
      this.startMarker.renderSVG(element)
    }
    if (this.endMarker) {
      this.endMarker.renderSVG(element)
    }
    return element
  }
}

module.exports = Line
