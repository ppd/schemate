class ArrowMarker {
  constructor(position, length, style = "simple") {
    this.position = position
    this.length = length
    this.style = style
  }

  renderSVG(line) {
    const self = this
    const color = line.attr("stroke")
    const strokeWidth = line.attr("stroke-width")
    const markerSize = (this.length * 2) * 1.1
    const middle = markerSize / 2
    let points
    if (this.position === "start") {
      points = [
        [middle + this.length, middle - this.length],
        [middle, middle],
        [middle + this.length, middle + this.length]
      ]
    } else {
      points = [
        [middle - this.length, middle - this.length],
        [middle, middle],
        [middle - this.length, middle + this.length]
      ]
    }
    return line.marker(this.position, markerSize, markerSize, function(add) {
      this.attr("markerUnits", "userSpaceOnUse")
      if (self.style === "triangle") {
        add
          .polygon(points)
          .fill("white")
          .stroke({ width: strokeWidth, color })
      } else {
        add
          .polyline(points)
          .fill("none")
          .stroke({ width: strokeWidth, color })
      }
    })

  }
}

module.exports = ArrowMarker
