const { SVG, registerWindow } = require("@svgdotjs/svg.js")
const window = require("svgdom")
const document = window.document
registerWindow(window, document)

function svg() {
  const draw = SVG(document.documentElement)
  return draw.group()
}

module.exports = svg
