const SVG = require("@svgdotjs/svg.js")
const window = require("svgdom")
const document = window.document
SVG.registerWindow(window, document)

const fillPatterns = require("./fillPatterns")

function parseQETStyle(qetStyleString) {
  const style = qetStyleString.split(";").map(pair => pair.split(":"))
  const map = {}
  for (const [key, value] of style) {
    map[key] = value
  }
  return map
}

SVG.extend(SVG.Shape, {
  fillPattern: function(pattern) {
    const draw = this.root()
    const _pattern = draw.findOne(`#fill-${pattern}`)
    if (_pattern) {
      return _pattern
    } else {
      return fillPatterns[pattern](draw)
    }
  },

  attrsFromQETStyle: function(qetStyleString) {
    const lineStyleToDasharray = {
      dashed: "5 1",
      dotted: "2 1",
      dashdotted: "5 1 2 1"
    }
    const style = parseQETStyle(qetStyleString)
    const strokeWidth = {
      thin: 0.5,
      normal: 1,
      hight: 2,
      eleve: 6
    }[style["line-weight"]]

    const attrs = {
      fill: ["ver", "hor", "bdiag", "fdiag"].includes(style.filling)
        ? this.fillPattern(style.filling)
        : style.filling,
      "stroke-width": strokeWidth,
      stroke: style.color
    }

    if (style["line-style"] !== "normal") {
      attrs["stroke-dasharray"] = lineStyleToDasharray[style["line-style"]]
    }
    return this.attr(attrs)
  }
})

function svg() {
  return SVG.SVG(document.documentElement)
}

module.exports = svg
