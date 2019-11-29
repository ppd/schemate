const { parseStringPromise: parseXML } = require("xml2js")
const svg = require("./svg")
const { Rect, Line, Text, Terminal } = require("./entities")

function toArray(v) {
  if (v === undefined) {
    return []
  }
  return Array.isArray(v) ? v : [v]
}

function asType(Type) {
  return data => new Type(data)
}

class Element {
  constructor({
    texts = [],
    rects = [],
    terminals = [],
    lines = [],
    hotspot = [0, 0]
  } = {}) {
    this.texts = texts
    this.rects = rects
    this.terminals = terminals
    this.lines = lines
    this.hotspot = hotspot
  }

  static async fromFile(filepath) {
    const fs = require("fs-extra")
    const elmtXML = await fs.readFile(filepath, "utf-8")
    return this.fromXML(elmtXML)
  }

  static async fromXML(xml) {
    const elmt = await parseXML(xml, {
      mergeAttrs: true,
      explicitArray: false,
      attrValueProcessors: [require("xml2js/lib/processors").parseNumbers]
    })

    const definition = elmt.definition

    const { hotspot_x, hotspot_y } = definition
    const hotspot = [hotspot_x, hotspot_y]

    const texts = toArray(definition.description.text).map(asType(Text))
    const rects = toArray(definition.description.rect).map(asType(Rect))
    const terminals = toArray(definition.description.terminal).map(asType(Terminal))
    const lines = toArray(definition.description.line).map(asType(Line))

    return new this({ texts, rects, terminals, lines, hotspot })
  }

  renderSVG() {
    const draw = svg()
    const group = draw.group()
    const entities = [this.rects, this.lines, this.texts, this.terminals]
    for (const entityGroup of entities) {
      for (const entity of entityGroup) {
        entity.renderSVG(group)
      }
    }
    group.translate(...this.hotspot)
    return draw
  }
}

module.exports = Element
