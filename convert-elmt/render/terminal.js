function renderTerminal(group, terminal) {
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
  return terminalGroup
}

module.exports = renderTerminal
