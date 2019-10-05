const { attrsFromQETStyle } =  require("../parse")

function rectangle(group, rect) {
  return group
    .rect(rect.width, rect.height)
    .move(rect.x, rect.y)
    .radius(rect.rx, rect.ry)
    .attr(attrsFromQETStyle(rect.style))
}

module.exports = rectangle
