function circleMarker({ element, position, length }) {
  const strokeWidth = element.attr("stroke-width")
  const outerSize = (length * 2 + strokeWidth)
  const markerSize = 2 * outerSize
  const middle = markerSize / 2
  element.marker(position, markerSize, markerSize, function(add) {
    let cx, cy = markerSize / 2
    if (position === "start") {
      cx = middle + outerSize / 2 - 1
    } else {
      cx = middle - outerSize / 2 + 1
    }
    this.attr("markerUnits", "userSpaceOnUse")
    add
      .circle()
      .radius(length)
      .attr({ cx, cy })
      .fill("white") // FIXME: global bg color
      .stroke({ width: strokeWidth, color: "black" }) // FIXME: element color & pattern
  })
}

module.exports = circleMarker
