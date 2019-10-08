const { parseStringPromise: parseXML } = require("xml2js")

function toArray(v) {
  if (v === undefined) {
    return []
  }
  return Array.isArray(v) ? v : [v]
}

function parseStyle(qetStyleString) {
  const style = qetStyleString.split(";").map(pair => pair.split(":"))
  const map = {}
  for (const [key, value] of style) {
    map[key] = value
  }
  return map
}

function attrsFromQETStyle(qetStyleString) {
  const lineStyleToDasharray = {
    dashed: "5 1",
    dotted: "2 1",
    dashdotted: "5 1 2 1"
  }
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

async function parseElmt(xml) {
  const elmt = await parseXML(xml, {
    mergeAttrs: true,
    explicitArray: false,
    attrValueProcessors: [require("xml2js/lib/processors").parseNumbers]
  })

  const definition = elmt.definition

  const { hotspot_x, hotspot_y } = definition

  const elements = {
    texts: toArray(definition.description.text),
    rects: toArray(definition.description.rect),
    terminals: toArray(definition.description.terminal),
    lines: toArray(definition.description.line)
  }

  return { elements, hotspot_x, hotspot_y }
}

module.exports = { parseElmt, parseStyle, parseFont, attrsFromQETStyle }
