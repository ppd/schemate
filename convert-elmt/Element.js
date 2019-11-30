const { parseStringPromise: parseXML } = require("xml2js")
const svg = require("./svg")
const { Rect, Line, Text, Terminal, Dummy } = require("./parts")

function makePart(data) {
  switch (data["#name"]) {
    case "text":
      return new Text(data.$)
    case "rect":
      return new Rect(data.$)
    case "line":
      return new Line(data.$)
    case "terminal":
      return new Terminal(data.$)
    case "dynamic_text":
    case "polygon":
    case "arc":
      return new Dummy(data)
    default:
      throw new Error(`Unknown part ${data["#name"]}`, data)
  }
}

class Element {
  constructor({
    parts = [],
    hotspot = [0, 0],
    height,
    width
  } = {}) {
    this.parts = parts
    this.hotspot = hotspot
    this.height = height
    this.width = width
  }

  static async fromFile(filepath) {
    const fs = require("fs-extra")
    const elmtXML = await fs.readFile(filepath, "utf-8")
    return this.fromXML(elmtXML)
  }

  static async fromXML(xml) {
    const elmt = await parseXML(xml, {
      explicitArray: false,
      attrValueProcessors: [require("xml2js/lib/processors").parseNumbers],
      preserveChildrenOrder: true,
      explicitChildren: true
    })

    const definition = elmt.definition

    const { hotspot_x, hotspot_y, height, width } = definition.$
    const hotspot = [hotspot_x, hotspot_y]

    const parts = definition.description.$$.map(makePart)

    return new this({ parts, hotspot, height, width })
  }

  renderSVG() {
    const draw = svg()
    draw.viewbox(0, 0, this.width, this.height)
    const group = draw.group()
    for (const part of this.parts) {
      part.renderSVG(group)
    }
    group.translate(...this.hotspot)
    return draw
  }
}

module.exports = Element
