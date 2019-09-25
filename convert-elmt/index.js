const { parseStringPromise: parseXML } = require("xml2js")
const fs = require("fs-extra")

const { SVG, registerWindow } = require("@svgdotjs/svg.js")
const window = require("svgdom")
const document = window.document
registerWindow(window, document)

function parseStyle(qetStyleString) {
  const style = qetStyleString.split(";").map(pair => pair.split(":"))
  const map = {}
  for (const [key, value] of style) {
    map[key] = value
  }
  return map
}

function fontFromQETString(qetFontString) {
  const [family, size] = qetFontString.split(",")
  return {
    family,
    size: `${size}pt`
  }
}

function toArray(v) {
  if (v === undefined) {
    return []
  }
  return Array.isArray(v) ? v : [v]
}

async function main() {
  const elmtXML = await fs.readFile("./cctv.elmt", "utf-8")
  const elmt = await parseXML(elmtXML, {
    mergeAttrs: true,
    explicitArray: false,
    attrValueProcessors: [require("xml2js/lib/processors").parseNumbers]
  })

  const definition = elmt.definition

  const { hotspot_x, hotspot_y, width, height } = definition

  const draw = SVG(document.documentElement) //.size(width, height)
  const group = draw.group()

  const elements = {
    texts: toArray(definition.description.text),
    rects: toArray(definition.description.rect),
    terminals: toArray(definition.description.terminal),
    lines: toArray(definition.description.line)
  }

  // filling patterns

  const horPattern = draw
    .pattern(6, 6, add => {
      add.line(0, 1, 6, 1).stroke({ width: 1, color: "black" })
    })
    .attr({ y: 4 })

  const verPattern = draw
    .pattern(8, 8, add => {
      add.line(1, 0, 1, 8).stroke({ width: 1, color: "black" })
    })
    .attr({ x: 4.5 })

  const bdiagPattern = draw.pattern(8, 8, add => {
    add.line(0, 8, 8, 0).stroke({ width: 1, color: "black" })
    add.line(-1, 1, 1, -1).stroke({ width: 1, color: "black" })
    add.line(7, 9, 9, 7).stroke({ width: 1, color: "black" })
  })

  const fdiagPattern = draw.pattern(8, 8, add => {
    add.line(0, 0, 8, 8).stroke({ width: 1, color: "black" })
    add.line(7, -1, 9, 1).stroke({ width: 1, color: "black" })
    add.line(-1, 7, 1, 9).stroke({ width: 1, color: "black" })
  })

  const patterns = {
    hor: horPattern,
    ver: verPattern,
    bdiag: bdiagPattern,
    fdiag: fdiagPattern
  }

  // linestyles: dashed, dotted, dashdotted

  const lineStyleToDasharray = {
    dashed: "5 1",
    dotted: "2 1",
    dashdotted: "5 1 2 1"
  }

  function attrsFromQETStyle(qetStyleString) {
    const style = parseStyle(qetStyleString)
    const strokeWidth = {
      thin: 0.5,
      normal: 1,
      hight: 2,
      eleve: 6
    }[style["line-weight"]]

    const attrs = {
      fill: patterns[style.filling] || style.filling,
      "stroke-width": strokeWidth,
      stroke: style.color
    }

    if (style["line-style"] !== "normal") {
      attrs["stroke-dasharray"] = lineStyleToDasharray[style["line-style"]]
    }
    return attrs
  }

  for (const rect of elements.rects) {
    group
      .rect(rect.width, rect.height)
      .move(rect.x, rect.y)
      .radius(rect.rx, rect.ry)
      .attr(attrsFromQETStyle(rect.style))
  }

  // lines

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

  for (const line of elements.lines) {
    // { x1, y1, x2, y2, length1, length2, end1, end2 }
    const attrs = attrsFromQETStyle(line.style)
    const element = group.line(line.x1, line.y1, line.x2, line.y2).attr(attrs)
    const strokeWidth = attrs["stroke-width"]
    // if (line.end1 === "circle") {
    //   group
    //     .circle()
    //     .radius(line.length1)
    //     .attr({ cx: line.x1, cy: line.y1 })
    //     .fill("white")
    //     .stroke({ width: strokeWidth, color: attrs["stroke"] })
    // }
    addMarker(element, line.end1, "start", line.length1)
    addMarker(element, line.end2, "end", line.length2)
  }

  // texts

  for (const { text, x, y, font, rotation, color } of elements.texts) {
    const textElement = group
      .plain(text)
      .attr({ x, y })
      .font(fontFromQETString(font))
    if (rotation !== 0) {
      textElement.rotate(rotation)
    }
  }

  // terminals
  for (const { orientation, x, y } of elements.terminals) {
    const terminalGroup = group.group()
    const length = 4
    const [dX, dY] = {
      n: [0, 1],
      e: [-1, 0],
      s: [0, -1],
      w: [1, 0]
    }[orientation]
    terminalGroup
      .line(0, 0, dX * length, dY * length)
      .stroke({ width: 1, color: "red" })
    terminalGroup.line(0, 0, dX, dY).stroke({ width: 1, color: "blue" })
    terminalGroup.translate(x, y)
  }

  group.translate(hotspot_x, hotspot_y)

  await fs.writeFile("./output.svg", draw.svg(), { encoding: "utf-8" })
  // console.log(draw.svg())
}

main().catch(e => console.error(e))
