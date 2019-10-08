const fs = require("fs-extra")

const { parseElmt, parseFont, attrsFromQETStyle } = require("./parse")
const addMarker = require("./render/markers")
const svg = require("./render/svg")

const renderRectangle = require("./render/Rect")
const renderLine = require("./render/Line")
const renderText = require("./render/Text")
const renderTerminal = require("./render/Terminal")

async function main() {
  const elmtXML = await fs.readFile("./cctv.elmt", "utf-8")
  const { hotspot_x, hotspot_y, elements } = await parseElmt(elmtXML)

  const group = svg()

  // rectangles
  for (const rect of elements.rects) {
    renderRectangle(group, rect)
  }

  // lines with markers
  for (const line of elements.lines) {
    renderLine(group, line)
  }

  // texts
  for (const text of elements.texts) {
    renderText(group, text)
  }

  // terminals
  for (const terminal of elements.terminals) {
    renderTerminal(group, terminal)
  }

  group.translate(hotspot_x, hotspot_y)

  await fs.writeFile("./output.svg", draw.svg(), { encoding: "utf-8" })
  // console.log(draw.svg())
}

main().catch(e => console.error(e))
