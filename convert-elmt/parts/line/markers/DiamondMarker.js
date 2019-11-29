class DiamondMarker {
  constructor(position, length) {
    this.position = position
    this.length = length
  }

  renderSVG(line) {
    const strokeWidth = line.attr("stroke-width")
    const length = this.length
    const position = this.position
    const outerSize = 4 * length + strokeWidth
    const markerSize = 1.1 * outerSize
    const middle = markerSize / 2

    line.marker(this.position, markerSize, markerSize, function(add) {
      this.attr("markerUnits", "userSpaceOnUse")
      let points
      if (position === "start") {
        points = [
          [middle, middle],
          [middle + length, middle - length],
          [middle + length * 2, middle],
          [middle + length, middle + length]
        ]
      } else {
        points = [
          [middle, middle],
          [middle - length, middle - length],
          [middle - length * 2, middle],
          [middle - length, middle + length]
        ]
      }
      add
        .polygon(points)
        .fill("white")
        .stroke({ width: strokeWidth, color: "black" }) // FIXME: Derive color etc. from element
    })
  }
}

module.exports = DiamondMarker
