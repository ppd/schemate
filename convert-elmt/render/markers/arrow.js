function arrowMarker({ element, position, length, style = "simple" }) {
  const color = element.attr("stroke")
  const strokeWidth = element.attr("stroke-width")
  const markerSize = (length * 2) * 1.1
  const middle = markerSize / 2
  
  element.marker(position, markerSize, markerSize, function(add) {
    let points
    this.attr("markerUnits", "userSpaceOnUse")
    if (position === "start") {
      // this.ref(1, length)
      // add.rect(markerSize, markerSize).fill("none").stroke({ width: 1, color: "red" })
      points = [
        [middle + length, middle - length],
        [middle, middle],
        [middle + length, middle + length]
      ]
    } else {
      // this.ref(length - 1, length)
      // add
      //   .rect(markerSize, markerSize)
      //   .fill("none")
      //   .stroke({ width: 1, color: "red" })
      points = [
        [middle - length, middle - length],
        [middle, middle],
        [middle - length, middle + length]
      ]
    }
    if (style === "triangle") {
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

module.exports = arrowMarker
