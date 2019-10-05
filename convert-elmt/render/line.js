const addMarker = require("../markers")

function lien(group, line) {
  const element = group
    .line(line.x1, line.y1, line.x2, line.y2)
    .attr(attrsFromQETStyle(line.style))
  addMarker(element, line.end1, "start", line.length1)
  addMarker(element, line.end2, "end", line.length2)
  return element
}

module.exports = line
