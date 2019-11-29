class Terminal {
  static get length() {
    return 4
  }

  constructor({ x, y, orientation }) {
    this.x = x
    this.y = y
    this.orientation = orientation
  }

  renderSVG(group) {
    const terminalGroup = group.group()
    const [dX, dY] = {
      n: [0, 1],
      e: [-1, 0],
      s: [0, -1],
      w: [1, 0]
    }[this.orientation]
    terminalGroup
      .line(0, 0, dX * this.constructor.length, dY * this.constructor.length)
      .stroke({ width: 1, color: "red" })
    terminalGroup.line(0, 0, dX, dY).stroke({ width: 1, color: "blue" })
    terminalGroup.translate(this.x, this.y)
    return terminalGroup
  }
}

module.exports = Terminal
