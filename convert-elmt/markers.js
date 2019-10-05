function addCircleMarker({ element, position, length }) {
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
    // add.rect(markerSize, markerSize).fill("none").stroke({ width: 1, color: "red" })
    add
      .circle()
      .radius(length)
      .attr({ cx, cy })
      .fill("white")
      .stroke({ width: strokeWidth, color: "black" })
  })
}

function addDiamondMarker({ element, position, length }) {
  const strokeWidth = element.attr("stroke-width")
  const outerSize = 4 * length + strokeWidth
  const markerSize = 1.1 * outerSize
  const middle = markerSize / 2
  element.marker(position, markerSize, markerSize, function(add) {
    this.attr("markerUnits", "userSpaceOnUse")
    let points
    if (position === "start") {
      points = [
        [middle, middle], [middle + length, middle - length], [middle + length * 2, middle],
        [middle + length, middle + length]
      ]
    } else {
      points = [
        [middle, middle], [middle - length, middle - length], [middle - length * 2, middle],
        [middle - length, middle + length]
      ]
    }
    // add.rect(markerSize, markerSize).fill("none").stroke({ width: 1, color: "red"})
    add.polygon(points).fill("white").stroke({ width: strokeWidth, color: "black" })
  })
}

function addArrowMarker({ element, position, length, style = "simple" }) {
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

function addMarker(element, style, position, length) {
  switch (style) {
    case "simple":
    case "triangle":
      return addArrowMarker({ element, position, length, style })
    case "circle":
      return addCircleMarker({ element, position, length })
    case "diamond":
      return addDiamondMarker({ element, position, length })
    default:
      return undefined
  }
}

module.exports = addMarker
