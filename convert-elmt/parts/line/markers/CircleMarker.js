class CircleMarker {
  constructor(position, length) {
    this.position = position
    this.length = length
  }

  renderSVG(line) {
    const self = this
    const strokeWidth = line.attr("stroke-width")
    const outerSize = (this.length * 2 + strokeWidth)
    const markerSize = 2 * outerSize
    const middle = markerSize / 2

    return line.marker(this.position, markerSize, markerSize, function(add) {
      let cx, cy = markerSize / 2
      if (self.position === "start") {
        cx = middle + outerSize / 2 - 1
      } else {
        cx = middle - outerSize / 2 + 1
      }
      this.attr("markerUnits", "userSpaceOnUse")
      add
        .circle()
        .radius(self.length)
        .attr({ cx, cy })
        .fill("white") // FIXME: global bg color
        .stroke({ width: strokeWidth, color: "black" }) // FIXME: element color & pattern
    })
  }
}

module.exports = CircleMarker
